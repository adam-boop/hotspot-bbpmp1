# Hotspot BBPMP - Cambium External Hotspot

Portal ini dipakai sebagai external captive portal untuk Cambium cnMaestro.

## Cambium configuration

WLAN > Guest Access:

- Enable: ON
- Portal Mode: External Hotspot
- Access Policy: Clickthrough
- External Page URL: `https://hotspot-bbpmp.duckdns.org`
- External Portal Type: Standard
- Success Action: Redirect User to External URL
- Redirect URL: `https://www.instagram.com/bbpmpjatim/`

### AP Server Protocol

Set **HTTPS** if the external portal is opened over HTTPS. `main.js` will then POST to:

`https://<ga_srvr>:444/cgi-bin/hotspot_login.cgi?<original-query-string>`

If you deliberately use HTTP for the AP Server Protocol and the portal itself is served over HTTP, the script will use:

`http://<ga_srvr>:880/cgi-bin/hotspot_login.cgi?<original-query-string>`

Do not change or re-encode `ga_Qv`.

Do not redirect to Instagram from JavaScript. The Cambium Success Action should perform the final redirect after the AP has authorized the client.

## Important

The external portal server must be reachable by the client before authentication. The client must also be able to reach the AP address contained in `ga_srvr` on the configured POST port.

For the HTTPS configuration, the AP's HTTPS service/certificate must be reachable from the client. If the captive portal assistant on a phone rejects the AP certificate, test by opening the portal in the normal browser after connecting to Wi-Fi.

## Test

1. Forget the SSID and reconnect.
2. Trigger captive portal with `http://neverssl.com`.
3. Confirm the portal URL contains `ga_srvr` and `ga_Qv`.
4. Click `ACCEPT & CONNECT`.
5. The browser should POST to the Cambium AP, not directly to Instagram.
6. After Cambium authorizes the client, the Success Action redirects to `https://www.instagram.com/bbpmpjatim/`.
7. Test another site after Instagram to confirm internet access.

