# Deployment Example

These files are redacted examples, not a record of the live host. Keep real hostnames, tunnel IDs, private server aliases, and database dumps out of the public repository.

## Shape

```text
https://your-domain.example
  -> HTTPS edge or tunnel
  -> Caddy on 127.0.0.1:8080
  -> Python API on 127.0.0.1:8090
  -> SQLite at /var/lib/electronic-genre-atlas/atlas.sqlite3
```

This keeps the Python app bound to localhost and lets Caddy handle static files, compression, security headers, and the `/api/*` reverse proxy.

## First-Time Host Setup

```sh
sudo useradd --system --home /srv/electronic-genre-atlas --shell /usr/sbin/nologin music-atlas
sudo mkdir -p /srv/electronic-genre-atlas /var/lib/electronic-genre-atlas /var/backups/electronic-genre-atlas
sudo chown -R music-atlas:music-atlas /var/lib/electronic-genre-atlas /var/backups/electronic-genre-atlas
```

Copy the app files to `/srv/electronic-genre-atlas`, install the systemd units, and adapt the Caddyfile for your domain or tunnel.

## Service Checks

```sh
systemctl status electronic-genre-atlas
systemctl status caddy
curl -fsS http://127.0.0.1:8090/api/health
curl -I https://your-domain.example
```

## Backups

The backup example uses SQLite's `.backup` command and keeps 30 days of daily database copies. Adjust retention and storage location for the actual host.

## Privacy Boundary

Username-only accounts are intentionally simple and are not private authentication. Anyone who knows a username can open that account. Do not market this deployment as secure personal storage without changing the auth model.
