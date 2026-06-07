PYTHON ?= python3
HOST ?= 127.0.0.1
PORT ?= 8090
DB ?= /tmp/electronic-genre-atlas.sqlite3
SMOKE_PORT ?= 8765

.PHONY: dev test smoke

dev:
	$(PYTHON) server.py --db $(DB) --host $(HOST) --port $(PORT) --static-dir . --insecure-cookie

test:
	$(PYTHON) -m unittest -v

smoke:
	@set -eu; \
	db="$$(mktemp /tmp/electronic-genre-atlas-smoke.XXXXXX.sqlite3)"; \
	$(PYTHON) server.py --db "$$db" --host $(HOST) --port $(SMOKE_PORT) --static-dir . --insecure-cookie >/tmp/electronic-genre-atlas-smoke.log 2>&1 & \
	pid="$$!"; \
	trap 'kill "$$pid" >/dev/null 2>&1 || true; wait "$$pid" 2>/dev/null || true; rm -f "$$db"' EXIT; \
	sleep 1; \
	curl -fsS "http://$(HOST):$(SMOKE_PORT)/api/health"; \
	printf "\n"; \
	curl -fsS -o /dev/null -w "GET / -> %{http_code}\n" "http://$(HOST):$(SMOKE_PORT)/"
