#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
import secrets
import sqlite3
import time
import mimetypes
from http import cookies
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


USERNAME_RE = re.compile(r"^[a-z0-9_-]{1,32}$")
SESSION_COOKIE = "music_atlas_session"
DEFAULT_DB_PATH = "/var/lib/music-atlas/atlas.sqlite3"


def today_key():
    return time.strftime("%Y-%m-%d")


def default_state():
    return {
        "startedOn": today_key(),
        "currentIndex": 0,
        "currentUnlockedOn": today_key(),
        "entries": {},
        "activeExploreGroup": "House",
        "openExploreGroups": ["House"],
    }


def normalize_username(value):
    username = str(value or "").strip().lower()
    if not USERNAME_RE.match(username):
        raise ValueError("Use 1-32 lowercase letters, numbers, _ or -.")
    return username


def session_hash(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def now_ts():
    return int(time.time())


def ensure_parent(path):
    Path(path).parent.mkdir(parents=True, exist_ok=True)


def connect(db_path):
    ensure_parent(db_path)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db(conn):
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            state_json TEXT NOT NULL,
            revision INTEGER NOT NULL DEFAULT 1,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
            token_hash TEXT PRIMARY KEY,
            username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
            created_at INTEGER NOT NULL,
            last_seen_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS imports (
            import_id TEXT PRIMARY KEY,
            username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
            device_label TEXT NOT NULL,
            summary_json TEXT NOT NULL,
            created_at INTEGER NOT NULL
        );
        """
    )
    conn.commit()


def coerce_state(value):
    if not isinstance(value, dict):
        value = {}
    state = default_state()
    state.update({k: v for k, v in value.items() if k in state or k == "entries"})
    if not isinstance(state.get("entries"), dict):
        state["entries"] = {}
    if not isinstance(state.get("currentIndex"), int):
        state["currentIndex"] = 0
    state["currentIndex"] = max(0, min(49, state["currentIndex"]))
    if not state.get("startedOn"):
        state["startedOn"] = today_key()
    if not state.get("currentUnlockedOn"):
        state["currentUnlockedOn"] = today_key()
    if not isinstance(state.get("activeExploreGroup"), str):
        state["activeExploreGroup"] = "House"
    if not isinstance(state.get("openExploreGroups"), list):
        state["openExploreGroups"] = ["House"]
    state["openExploreGroups"] = [
        str(group)
        for group in state["openExploreGroups"]
        if isinstance(group, str) and group.strip()
    ]
    return state


def normalize_entry(entry):
    if not isinstance(entry, dict):
        entry = {}
    return {
        "notes": str(entry.get("notes") or ""),
        "productionNotes": str(entry.get("productionNotes") or ""),
        "djNotes": str(entry.get("djNotes") or ""),
        "listened": bool(entry.get("listened")),
        "completedOn": str(entry.get("completedOn") or ""),
        "playlistOpened": bool(entry.get("playlistOpened")),
        "rating": max(0, min(5, int(entry.get("rating") or 0))),
    }


def merge_notes(cloud_notes, local_notes, label):
    cloud_notes = str(cloud_notes or "").strip()
    local_notes = str(local_notes or "").strip()
    if not local_notes:
        return cloud_notes
    if not cloud_notes:
        return local_notes
    if cloud_notes == local_notes or local_notes in cloud_notes:
        return cloud_notes
    heading = f"Imported from {label} on {today_key()}"
    return f"{cloud_notes}\n\n---\n{heading}\n{local_notes}"


def earliest_date(a, b):
    values = [v for v in [str(a or ""), str(b or "")] if v]
    return min(values) if values else ""


def merge_states(cloud_state, local_state, device_label="device"):
    cloud = coerce_state(cloud_state)
    local = coerce_state(local_state)
    merged = dict(cloud)
    summary = {
        "currentIndexChanged": False,
        "entriesMerged": 0,
        "notesAppended": 0,
        "ratingsRaised": 0,
    }

    if local.get("currentIndex", 0) > cloud.get("currentIndex", 0):
        merged["currentIndex"] = local["currentIndex"]
        summary["currentIndexChanged"] = True

    if local.get("currentUnlockedOn", "") > cloud.get("currentUnlockedOn", ""):
        merged["currentUnlockedOn"] = local["currentUnlockedOn"]

    if local.get("startedOn", "") and local["startedOn"] < cloud.get("startedOn", local["startedOn"]):
        merged["startedOn"] = local["startedOn"]

    merged["openExploreGroups"] = list(local.get("openExploreGroups") or [])
    merged["activeExploreGroup"] = str(local.get("activeExploreGroup") or cloud.get("activeExploreGroup") or "House")

    merged_entries = dict(cloud.get("entries", {}))
    all_keys = set(cloud.get("entries", {}).keys()) | set(local.get("entries", {}).keys())
    for key in sorted(all_keys, key=lambda x: int(x) if str(x).isdigit() else 999):
        cloud_entry = normalize_entry(cloud.get("entries", {}).get(key))
        local_entry = normalize_entry(local.get("entries", {}).get(key))
        notes_before = cloud_entry["notes"]
        production_notes_before = cloud_entry["productionNotes"]
        dj_notes_before = cloud_entry["djNotes"]
        rating_before = cloud_entry["rating"]
        next_entry = {
            "notes": merge_notes(cloud_entry["notes"], local_entry["notes"], device_label),
            "productionNotes": merge_notes(cloud_entry["productionNotes"], local_entry["productionNotes"], device_label),
            "djNotes": merge_notes(cloud_entry["djNotes"], local_entry["djNotes"], device_label),
            "listened": cloud_entry["listened"] or local_entry["listened"],
            "completedOn": earliest_date(cloud_entry["completedOn"], local_entry["completedOn"]),
            "playlistOpened": cloud_entry["playlistOpened"] or local_entry["playlistOpened"],
            "rating": max(cloud_entry["rating"], local_entry["rating"]),
        }
        if next_entry != cloud_entry:
            summary["entriesMerged"] += 1
        if next_entry["notes"] != notes_before and notes_before and local_entry["notes"]:
            summary["notesAppended"] += 1
        if next_entry["productionNotes"] != production_notes_before and production_notes_before and local_entry["productionNotes"]:
            summary["notesAppended"] += 1
        if next_entry["djNotes"] != dj_notes_before and dj_notes_before and local_entry["djNotes"]:
            summary["notesAppended"] += 1
        if next_entry["rating"] > rating_before:
            summary["ratingsRaised"] += 1
        merged_entries[str(key)] = next_entry

    merged["entries"] = merged_entries
    return merged, summary


class AtlasStore:
    def __init__(self, db_path):
        self.db_path = db_path
        with connect(db_path) as conn:
            init_db(conn)

    def get_or_create_user(self, username):
        with connect(self.db_path) as conn:
            row = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
            if row:
                return row
            state_json = json.dumps(default_state(), separators=(",", ":"))
            ts = now_ts()
            conn.execute(
                "INSERT INTO users (username, state_json, revision, created_at, updated_at) VALUES (?, ?, 1, ?, ?)",
                (username, state_json, ts, ts),
            )
            conn.commit()
            return conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

    def create_session(self, username):
        token = secrets.token_urlsafe(32)
        ts = now_ts()
        with connect(self.db_path) as conn:
            conn.execute(
                "INSERT INTO sessions (token_hash, username, created_at, last_seen_at) VALUES (?, ?, ?, ?)",
                (session_hash(token), username, ts, ts),
            )
            conn.commit()
        return token

    def username_for_token(self, token):
        if not token:
            return None
        with connect(self.db_path) as conn:
            row = conn.execute("SELECT username FROM sessions WHERE token_hash = ?", (session_hash(token),)).fetchone()
            if not row:
                return None
            conn.execute("UPDATE sessions SET last_seen_at = ? WHERE token_hash = ?", (now_ts(), session_hash(token)))
            conn.commit()
            return row["username"]

    def delete_session(self, token):
        if token:
            with connect(self.db_path) as conn:
                conn.execute("DELETE FROM sessions WHERE token_hash = ?", (session_hash(token),))
                conn.commit()

    def get_state(self, username):
        self.get_or_create_user(username)
        with connect(self.db_path) as conn:
            row = conn.execute("SELECT state_json, revision FROM users WHERE username = ?", (username,)).fetchone()
            return row["revision"], json.loads(row["state_json"])

    def put_state(self, username, revision, incoming_state):
        with connect(self.db_path) as conn:
            row = conn.execute("SELECT state_json, revision FROM users WHERE username = ?", (username,)).fetchone()
            current_revision = row["revision"]
            current_state = json.loads(row["state_json"])
            if int(revision or 0) != current_revision:
                next_state, summary = merge_states(current_state, incoming_state, "stale device")
            else:
                next_state = coerce_state(incoming_state)
                summary = {"entriesMerged": 0, "notesAppended": 0, "ratingsRaised": 0, "currentIndexChanged": False}
            next_revision = current_revision + 1
            conn.execute(
                "UPDATE users SET state_json = ?, revision = ?, updated_at = ? WHERE username = ?",
                (json.dumps(next_state, separators=(",", ":")), next_revision, now_ts(), username),
            )
            conn.commit()
            return next_revision, next_state, summary

    def import_local(self, username, import_id, device_label, local_state):
        import_id = str(import_id or "").strip()
        if not import_id:
            raise ValueError("importId is required")
        device_label = str(device_label or "device").strip()[:48] or "device"
        with connect(self.db_path) as conn:
            existing = conn.execute(
                "SELECT summary_json FROM imports WHERE import_id = ? AND username = ?",
                (import_id, username),
            ).fetchone()
            if existing:
                revision, state = self.get_state(username)
                return revision, state, json.loads(existing["summary_json"])
            row = conn.execute("SELECT state_json, revision FROM users WHERE username = ?", (username,)).fetchone()
            if not row:
                self.get_or_create_user(username)
                row = conn.execute("SELECT state_json, revision FROM users WHERE username = ?", (username,)).fetchone()
            next_state, summary = merge_states(json.loads(row["state_json"]), local_state, device_label)
            next_revision = row["revision"] + 1
            conn.execute(
                "UPDATE users SET state_json = ?, revision = ?, updated_at = ? WHERE username = ?",
                (json.dumps(next_state, separators=(",", ":")), next_revision, now_ts(), username),
            )
            conn.execute(
                "INSERT INTO imports (import_id, username, device_label, summary_json, created_at) VALUES (?, ?, ?, ?, ?)",
                (import_id, username, device_label, json.dumps(summary, separators=(",", ":")), now_ts()),
            )
            conn.commit()
            return next_revision, next_state, summary


class Handler(BaseHTTPRequestHandler):
    store = None
    static_dir = None
    secure_cookie = True

    def log_message(self, fmt, *args):
        return

    def send_json(self, status, payload, headers=None):
        body = json.dumps(payload, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        for key, value in (headers or {}).items():
            self.send_header(key, value)
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length > 2_000_000:
            raise ValueError("Request is too large")
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        return json.loads(raw or "{}")

    def token(self):
        parsed = cookies.SimpleCookie(self.headers.get("Cookie", ""))
        morsel = parsed.get(SESSION_COOKIE)
        return morsel.value if morsel else ""

    def username(self):
        return self.store.username_for_token(self.token())

    def require_user(self):
        username = self.username()
        if not username:
            self.send_json(401, {"error": "Not logged in"})
            return None
        return username

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            self.send_json(200, {"ok": True})
            return
        if path == "/api/me":
            username = self.username()
            self.send_json(200, {"username": username} if username else {"username": None})
            return
        if path == "/api/state":
            username = self.require_user()
            if not username:
                return
            revision, state = self.store.get_state(username)
            self.send_json(200, {"revision": revision, "state": state})
            return
        if self.static_dir:
            self.serve_static(path)
            return
        self.send_json(404, {"error": "Not found"})

    def serve_static(self, path):
        if path == "/":
            path = "/index.html"
        safe = Path(path.lstrip("/"))
        if ".." in safe.parts:
            self.send_json(404, {"error": "Not found"})
            return
        target = Path(self.static_dir) / safe
        if not target.is_file():
            self.send_json(404, {"error": "Not found"})
            return
        body = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(str(target))[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        path = urlparse(self.path).path
        try:
            data = self.read_json()
            if path == "/api/login":
                username = normalize_username(data.get("username"))
                self.store.get_or_create_user(username)
                token = self.store.create_session(username)
                self.send_json(
                    200,
                    {"username": username},
                    {
                        "Set-Cookie": (
                            f"{SESSION_COOKIE}={token}; Path=/; Max-Age=31536000; "
                            f"HttpOnly; {'Secure; ' if self.secure_cookie else ''}SameSite=Lax"
                        )
                    },
                )
                return
            if path == "/api/logout":
                self.store.delete_session(self.token())
                self.send_json(
                    200,
                    {"ok": True},
                    {"Set-Cookie": f"{SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; {'Secure; ' if self.secure_cookie else ''}SameSite=Lax"},
                )
                return
            if path == "/api/import-local":
                username = self.require_user()
                if not username:
                    return
                revision, state, summary = self.store.import_local(
                    username,
                    data.get("importId"),
                    data.get("deviceLabel"),
                    data.get("localState"),
                )
                self.send_json(200, {"revision": revision, "state": state, "summary": summary})
                return
            self.send_json(404, {"error": "Not found"})
        except ValueError as exc:
            self.send_json(400, {"error": str(exc)})
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})

    def do_PUT(self):
        path = urlparse(self.path).path
        if path != "/api/state":
            self.send_json(404, {"error": "Not found"})
            return
        username = self.require_user()
        if not username:
            return
        try:
            data = self.read_json()
            revision, state, summary = self.store.put_state(username, data.get("revision"), data.get("state"))
            self.send_json(200, {"revision": revision, "state": state, "summary": summary})
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", default=DEFAULT_DB_PATH)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8090)
    parser.add_argument("--static-dir")
    parser.add_argument("--insecure-cookie", action="store_true")
    args = parser.parse_args()

    Handler.store = AtlasStore(args.db)
    Handler.static_dir = args.static_dir
    Handler.secure_cookie = not args.insecure_cookie
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"music-atlas-api listening on http://{args.host}:{args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
