# Deploying Electronic Genre Atlas

The live setup uses a Cloudflare Tunnel:

```text
https://music.193vbr.com -> Cloudflare Tunnel -> pve-berlin -> Caddy on 127.0.0.1:8080 -> Python API on 127.0.0.1:8090
```

This avoids router port forwarding and keeps the origin app local-only.

## Live Host

```text
Host: pve-berlin
App path: /srv/music.193vbr.com
Caddy config: /etc/caddy/Caddyfile
Tunnel config: /etc/cloudflared/config.yml
API DB: /var/lib/music-atlas/atlas.sqlite3
Tunnel name: genre-atlas
Tunnel ID: 95144cb3-b839-4421-9369-1ab241e74989
Public URL: https://music.193vbr.com
```

## Services

```sh
systemctl status caddy
systemctl status cloudflared
systemctl status music-atlas
```

Caddy serves the static app and proxies `/api/*` locally:

```text
http://127.0.0.1:8080
http://127.0.0.1:8090/api/health
```

Cloudflare serves the public HTTPS endpoint.

## Update The App

From this project folder:

```sh
scp index.html styles.css genres-data.js sync-app.js server.py pve-berlin:/srv/music.193vbr.com/
ssh pve-berlin 'systemctl restart music-atlas && systemctl reload caddy'
```

## Tunnel Checks

```sh
ssh pve-berlin 'cloudflared tunnel info genre-atlas'
ssh pve-berlin 'journalctl -u cloudflared -n 80 --no-pager'
curl -I https://music.193vbr.com
curl https://music.193vbr.com/api/health
```

Expected result:

```text
HTTP/2 200
server: cloudflare
content-security-policy: ...
x-content-type-options: nosniff
```

## Important Notes

The tunnel service is configured with `--region us` because the default Cloudflare edge SRV lookup failed from the Proxmox network, while the `us-region` tunnel endpoints passed connectivity checks.

Tailscale DNS was disabled on the Proxmox host with:

```sh
tailscale set --accept-dns=false
```

This keeps Tailscale networking available but returns host DNS to the LAN resolver.

The app now syncs notes and ratings by username into SQLite. Username-only accounts are intentionally simple, not private: anyone who knows a username can open that account.

The old browser local import flow has been removed from the UI after migration. Existing browser storage is left untouched, but new progress is saved through the online account rather than the legacy local save key.
