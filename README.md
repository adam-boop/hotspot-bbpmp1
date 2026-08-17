# BBPMP External Captive Portal — Cambium Clickthrough

This package is prepared for Cambium External Hotspot + Clickthrough.

## Cambium configuration

- Portal Mode: External Hotspot
- Access Policy: Clickthrough
- AP Server Protocol: HTTP
- External Page URL: `https://hotspot-bbpmp.duckdns.org`
- External Portal Type: Standard
- Success Action: Redirect User to External URL
- Redirect URL: `https://www.instagram.com/bbpmpjatim/`

Do not implement the Instagram redirect inside `main.js`. Cambium must authorize the client first; then Cambium performs the configured Success Action.

## Important

The browser must be able to reach the AP address supplied in `ga_srvr` on TCP port 880. The script deliberately preserves the original query string byte-for-byte because `ga_Qv` is part of Cambium's clickthrough transaction.

## Files

- `index.html` — portal page
- `js/main.js` — Cambium clickthrough POST
- `css/style.css` and `images/*` should be present in the full portal deployment. The uploaded ZIP supplied for this revision did not contain those assets.
