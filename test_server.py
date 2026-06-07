import http.client
import json
import os
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer

from server import AtlasStore, Handler, coerce_state, merge_states, normalize_username


class MergeTests(unittest.TestCase):
    def test_merge_keeps_highest_progress_and_appends_conflicting_notes(self):
        cloud = {
            "currentIndex": 1,
            "currentUnlockedOn": "2026-06-01",
            "entries": {
                "0": {
                    "notes": "Mac note",
                    "productionNotes": "Mac production note",
                    "djNotes": "Mac DJ note",
                    "listened": True,
                    "completedOn": "2026-06-01",
                    "playlistOpened": False,
                    "rating": 2,
                }
            },
        }
        phone = {
            "currentIndex": 3,
            "currentUnlockedOn": "2026-06-04",
            "entries": {
                "0": {
                    "notes": "Phone note",
                    "productionNotes": "Phone production note",
                    "djNotes": "Phone DJ note",
                    "listened": False,
                    "completedOn": "2026-06-02",
                    "playlistOpened": True,
                    "rating": 5,
                }
            },
        }
        merged, summary = merge_states(cloud, phone, "iPhone")
        self.assertEqual(merged["currentIndex"], 3)
        self.assertTrue(merged["entries"]["0"]["listened"])
        self.assertTrue(merged["entries"]["0"]["playlistOpened"])
        self.assertEqual(merged["entries"]["0"]["completedOn"], "2026-06-01")
        self.assertEqual(merged["entries"]["0"]["rating"], 5)
        self.assertIn("Mac note", merged["entries"]["0"]["notes"])
        self.assertIn("Imported from iPhone", merged["entries"]["0"]["notes"])
        self.assertIn("Phone note", merged["entries"]["0"]["notes"])
        self.assertIn("Mac production note", merged["entries"]["0"]["productionNotes"])
        self.assertIn("Phone production note", merged["entries"]["0"]["productionNotes"])
        self.assertIn("Mac DJ note", merged["entries"]["0"]["djNotes"])
        self.assertIn("Phone DJ note", merged["entries"]["0"]["djNotes"])
        self.assertEqual(summary["notesAppended"], 3)
        self.assertEqual(summary["ratingsRaised"], 1)

    def test_idempotent_import(self):
        with tempfile.NamedTemporaryFile() as db:
            store = AtlasStore(db.name)
            store.get_or_create_user("pierre")
            state = {"currentIndex": 2, "entries": {"1": {"notes": "Mac", "rating": 4}}}
            rev1, synced1, summary1 = store.import_local("pierre", "same-import", "Mac", state)
            rev2, synced2, summary2 = store.import_local("pierre", "same-import", "Mac", state)
            self.assertEqual(rev1, rev2)
            self.assertEqual(synced1, synced2)
            self.assertEqual(summary1, summary2)

    def test_open_explore_groups_persist_and_can_be_empty(self):
        with tempfile.NamedTemporaryFile() as db:
            store = AtlasStore(db.name)
            store.get_or_create_user("pierre")
            revision, state = store.get_state("pierre")
            state["openExploreGroups"] = ["House", "Techno"]
            revision, synced, _ = store.put_state("pierre", revision, state)
            self.assertEqual(synced["openExploreGroups"], ["House", "Techno"])

            synced["openExploreGroups"] = []
            revision, synced, _ = store.put_state("pierre", revision, synced)
            self.assertEqual(synced["openExploreGroups"], [])

            stale_revision = revision
            synced["openExploreGroups"] = ["House"]
            revision, _, _ = store.put_state("pierre", revision, synced)
            synced["openExploreGroups"] = ["UK Club & Bass", "Drum & Bass"]
            _, stale_synced, _ = store.put_state("pierre", stale_revision, synced)
            self.assertEqual(stale_synced["openExploreGroups"], ["UK Club & Bass", "Drum & Bass"])

    def test_stale_revision_merges_instead_of_overwriting_notes(self):
        with tempfile.NamedTemporaryFile() as db:
            store = AtlasStore(db.name)
            store.get_or_create_user("pierre")
            revision, state = store.get_state("pierre")
            state["entries"]["0"] = {"notes": "Cloud note", "rating": 2}
            revision, synced, _ = store.put_state("pierre", revision, state)

            stale_state = {
                **synced,
                "entries": {
                    "0": {
                        "notes": "Phone note",
                        "listened": True,
                        "playlistOpened": True,
                        "rating": 5,
                    }
                },
            }
            _, merged, summary = store.put_state("pierre", revision - 1, stale_state)

            self.assertIn("Cloud note", merged["entries"]["0"]["notes"])
            self.assertIn("Imported from stale device", merged["entries"]["0"]["notes"])
            self.assertIn("Phone note", merged["entries"]["0"]["notes"])
            self.assertTrue(merged["entries"]["0"]["listened"])
            self.assertTrue(merged["entries"]["0"]["playlistOpened"])
            self.assertEqual(merged["entries"]["0"]["rating"], 5)
            self.assertEqual(summary["ratingsRaised"], 1)


class ValidationTests(unittest.TestCase):
    def test_username_normalization_accepts_simple_public_handles(self):
        self.assertEqual(normalize_username(" Pierre_1 "), "pierre_1")
        self.assertEqual(normalize_username("listener-23"), "listener-23")

    def test_username_normalization_rejects_unsafe_or_empty_values(self):
        for value in ["", "bad.name", "two words", "x" * 33, "../admin"]:
            with self.subTest(value=value):
                with self.assertRaises(ValueError):
                    normalize_username(value)

    def test_state_coercion_clamps_index_and_filters_groups(self):
        state = coerce_state(
            {
                "currentIndex": 999,
                "entries": [],
                "activeExploreGroup": 12,
                "openExploreGroups": ["House", "", 42, "Techno"],
            }
        )

        self.assertEqual(state["currentIndex"], 49)
        self.assertEqual(state["entries"], {})
        self.assertEqual(state["activeExploreGroup"], "House")
        self.assertEqual(state["openExploreGroups"], ["House", "Techno"])


class ApiTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_store = Handler.store
        self.old_static_dir = Handler.static_dir
        self.old_secure_cookie = Handler.secure_cookie
        Handler.store = AtlasStore(os.path.join(self.tmp.name, "atlas.sqlite3"))
        Handler.static_dir = None
        Handler.secure_cookie = False
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)
        Handler.store = self.old_store
        Handler.static_dir = self.old_static_dir
        Handler.secure_cookie = self.old_secure_cookie
        self.tmp.cleanup()

    def request(self, method, path, body=None, headers=None):
        payload = json.dumps(body).encode("utf-8") if body is not None else None
        request_headers = dict(headers or {})
        if body is not None:
            request_headers["Content-Type"] = "application/json"
        conn = http.client.HTTPConnection(*self.server.server_address)
        try:
            conn.request(method, path, payload, request_headers)
            response = conn.getresponse()
            response_body = response.read().decode("utf-8")
            return response.status, dict(response.getheaders()), json.loads(response_body or "{}")
        finally:
            conn.close()

    def test_health_login_and_state_flow(self):
        status, _, body = self.request("GET", "/api/health")
        self.assertEqual(status, 200)
        self.assertEqual(body, {"ok": True})

        status, headers, body = self.request("POST", "/api/login", {"username": "Pierre"})
        self.assertEqual(status, 200)
        self.assertEqual(body, {"username": "pierre"})
        cookie = headers["Set-Cookie"].split(";", 1)[0]

        status, _, body = self.request("GET", "/api/state", headers={"Cookie": cookie})
        self.assertEqual(status, 200)
        self.assertEqual(body["revision"], 1)
        self.assertEqual(body["state"]["entries"], {})

        next_state = body["state"]
        next_state["entries"]["0"] = {"notes": "Heard the kick pattern", "rating": 4}
        status, _, body = self.request(
            "PUT",
            "/api/state",
            {"revision": 1, "state": next_state},
            headers={"Cookie": cookie},
        )
        self.assertEqual(status, 200)
        self.assertEqual(body["revision"], 2)
        self.assertEqual(body["state"]["entries"]["0"]["notes"], "Heard the kick pattern")
        self.assertEqual(body["state"]["entries"]["0"]["rating"], 4)


if __name__ == "__main__":
    unittest.main()
