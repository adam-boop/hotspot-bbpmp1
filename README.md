# Hotspot BBPMP Provinsi Jawa Timur — FINAL-2

Portal captive portal untuk Cambium cnMaestro / External Hotspot.

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
│   ├── favicon.ico
│   └── icons/
│       ├── wifi.svg
│       ├── shield.svg
│       ├── balance.svg
│       ├── lock.svg
│       ├── education.svg
│       └── signal.svg
└── README.md
```

## Perbaikan FINAL-2

- Logo Kemdikdasmen dipangkas dari ruang transparan berlebih agar tampil proporsional.
- Semua ikon portal disimpan lokal sebagai SVG; tidak memakai Font Awesome, CDN, Google Fonts, atau resource eksternal.
- Favicon lokal.
- Tampilan desktop/laptop dan HP responsive.
- Background gedung BBPMP tetap digunakan.
- `main.js` tidak mengarahkan pengguna ke Instagram. JavaScript hanya mengirim POST authorization ke endpoint Cambium berdasarkan parameter `ga_srvr`.
- Redirect akhir ke Instagram dilakukan oleh cnMaestro setelah client berhasil di-authorize.

## Konfigurasi cnMaestro

Guest Access:

- Enable: ON
- Portal Mode: External Hotspot
- Access Policy: Clickthrough
- AP Server Protocol: HTTP
- External Page URL: `http://hotspot-bbpmp.duckdns.org`
- External Portal Post Through cnMaestro: OFF
- External Portal Type: Standard
- Success Action: Redirect User to External URL
- Redirect URL: `https://www.instagram.com/bbpmpjatim/`
- Prefix Query Strings in Redirect URL: OFF

Advanced Settings yang digunakan:

- Client IP: OFF
- RSSI: OFF
- AP Location: OFF
- HTTP-only: OFF
- Redirect User Page: kosong
- Redirect Port: kosong
- Session Timeout: 28800
- Inactivity Timeout: 1800
- MAC Authentication Fallback: OFF
- Extend Interface: kosong

Pre-Login Allowed Domains minimal:

```text
hotspot-bbpmp.duckdns.org
```

## Upload ke GitHub Pages

Upload isi folder `hotspot-bbpmp/` ke repository GitHub Pages. Pastikan URL yang dimasukkan di cnMaestro sama persis dengan URL publik yang aktif.

Contoh jika repository dipublikasikan di domain custom:

```text
http://hotspot-bbpmp.duckdns.org
```

## Catatan penting

Portal harus menerima query string Cambium seperti `ga_srvr`, `ga_ssid`, `ga_ap_mac`, `ga_nas_id`, dan parameter lain yang diberikan oleh AP. Jangan menghapus query string tersebut saat membuka portal.

Jika tombol tetap `CONNECTING...`, periksa URL portal dan pastikan `ga_srvr` ada pada address bar. Untuk konfigurasi AP Server Protocol HTTP, jangan mengganti External Page URL menjadi HTTPS tanpa menyesuaikan mekanisme POST Cambium.


### FINAL-3 HTTPS
- Captive portal POST uses HTTPS port 444.
- Existing background, design, logo, and other assets were preserved.
- Cambium Guest Access should use AP Server Protocol: HTTPS.
