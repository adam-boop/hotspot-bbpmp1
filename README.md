# Hotspot BBPMP Provinsi Jawa Timur - FINAL

Portal captive hotspot untuk Cambium cnMaestro External Hotspot / Clickthrough.

## Struktur

```text
hotspot-bbpmp/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo-bbpmp.png
│   ├── background-bbpmp.jpg
│   └── favicon.ico
└── README.md
```

## Konfigurasi cnMaestro yang digunakan

WLAN > Guest Access:

- Enable: ON
- Portal Mode: **External Hotspot**
- Access Policy: **Clickthrough**
- AP Server Protocol: **HTTP**
- External Page URL: `http://hotspot-bbpmp.duckdns.org`
- External Portal Post Through cnMaestro: OFF
- External Portal Type: Standard
- Success Action: **Redirect User to External URL**
- Redirect URL: `https://www.instagram.com/bbpmpjatim/`
- HTTP-only: OFF
- Redirect User Page: kosong
- Redirect Port: kosong

### Pre-Login Allowed Domains

Minimal:

```text
hotspot-bbpmp.duckdns.org
```

Karena seluruh CSS, JavaScript, logo, background, dan favicon berada di domain portal yang sama, tidak diperlukan CDN eksternal.

## Sangat penting: HTTP vs HTTPS

Paket ini dibuat untuk konfigurasi **AP Server Protocol = HTTP** dan endpoint Cambium:

```text
http://<ga_srvr>:880/cgi-bin/hotspot_login.cgi
```

Karena itu, gunakan External Page URL HTTP:

```text
http://hotspot-bbpmp.duckdns.org
```

Jangan menggunakan External Page URL HTTPS ketika AP Server Protocol masih HTTP. Browser dapat memblokir POST HTTP dari halaman HTTPS sebagai mixed content.

Jika ingin memakai HTTPS pada External Page URL, ubah AP Server Protocol Cambium ke HTTPS dan gunakan endpoint HTTPS/port yang sesuai dengan versi perangkat. Jangan mencampur HTTP page + HTTPS AP atau HTTPS page + HTTP AP tanpa konfigurasi endpoint yang sesuai.

## Cara kerja tombol ACCEPT & CONNECT

```text
Client tersambung Wi-Fi
        ↓
Cambium redirect ke portal
        ↓
index.html
        ↓
main.js membaca ga_srvr
        ↓
POST ke http://<ga_srvr>:880/cgi-bin/hotspot_login.cgi
        ↓
Cambium authorize client
        ↓
Success Action cnMaestro
        ↓
https://www.instagram.com/bbpmpjatim/
```

`main.js` sengaja tidak melakukan redirect Instagram sendiri. Query string Cambium dipertahankan persis agar parameter seperti `ga_Qv` tidak rusak.

## Upload ke GitHub Pages

Upload seluruh isi folder ke repository GitHub Pages. Jangan hanya upload `index.html`.

Pastikan URL portal yang dipakai cnMaestro sesuai dengan alamat GitHub Pages/Cloudflare/hosting yang benar-benar melayani folder ini.

## Catatan kompatibilitas HP dan laptop

Layout sudah responsif untuk desktop, laptop, tablet, Android, dan iPhone. Namun keberhasilan captive portal tetap bergantung pada mekanisme captive-portal detection OS/browser dan konfigurasi jaringan Cambium. JavaScript tidak dapat mengatasi browser yang memblokir mixed content atau endpoint AP yang tidak dapat dijangkau.
