# Agent Notes

This repo is a small public portfolio project. Keep changes modest, concrete, and easy for a human reviewer to understand.

## Repo Map

- `index.html`, `styles.css`, `sync-app.js`: browser UI and client sync.
- `genres-data.js`: curated atlas data.
- `server.py`: Python stdlib HTTP API, static dev server, SQLite storage, session cookies, and merge logic.
- `test_server.py`: unit/API tests.
- `deploy/`: redacted deployment examples only.
- `docs/assets/`: README screenshots and public documentation assets.

## Commands

```sh
make dev
make test
make smoke
```

`make dev` runs the app at `http://127.0.0.1:8090` with a temporary SQLite database in `/tmp`.

## Product Invariants

- Keep the product direction intact: daily genre prompt plus open atlas browsing.
- Preserve the lightweight stack unless there is a clear product reason to change it.
- Username-only sync is deliberately non-private. Do not present it as secure authentication.
- Do not add fake metrics, fake AI features, or exaggerated claims.
- Keep music/domain language specific and practical.

## Review Priorities

- Public first impression: README, screenshot, setup path, and file tree should stay clean.
- Privacy hygiene: no real hostnames, tunnel IDs, server aliases, database dumps, or personal notes in git.
- Reliability: state merge behavior, import idempotency, username validation, and API basics should stay covered by tests.
- Accessibility: maintain semantic headings, form labels, button labels, and keyboard-friendly controls.
