# Hotspot BBPMP - Cambium External Hotspot

Portal ini dipakai sebagai external captive portal untuk Cambium cnMaestro.

## Konfigurasi Cambium yang direkomendasikan

WLAN > Guest Access:

- Enable: ON
- Portal Mode: External Hotspot
- Access Policy: Clickthrough
- AP Server Protocol: **HTTPS**
- External Page URL: `https://hotspot-bbpmp.duckdns.org`
- External Portal Post Through cnMaestro: OFF
- External Portal Type: Standard
- Success Action: Redirect User to External URL
- Redirect URL: `https://www.instagram.com/bbpmpjatim/`

## Penting

`js/main.js` menggunakan:

`https://<ga_srvr>:444/cgi-bin/hotspot_login.cgi?<original-query-string>`

Karena portal BBPMP menggunakan HTTPS, AP Server Protocol di cnMaestro harus **HTTPS** agar browser tidak melakukan POST aktif dari HTTPS ke HTTP.

Jika AP Server Protocol diubah menjadi HTTP, port Cambium menjadi 880 dan `main.js` juga harus diubah menjadi:

```js
const CAMBIUM_AP_PROTOCOL = "http";
const CAMBIUM_AP_PORT = "880";
```

Namun untuk portal HTTPS, konfigurasi HTTPS/444 lebih sesuai.

## Clickthrough

Portal membaca `ga_srvr` dan `ga_Qv` dari URL yang dikirim Cambium. Seluruh query string asli dikembalikan ke AP tanpa dibangun ulang atau di-encode ulang. Ini penting karena `ga_Qv` tidak boleh berubah.

Portal tidak melakukan redirect ke Instagram dari JavaScript. Setelah POST diterima dan client di-authorize oleh Cambium, Success Action pada cnMaestro melakukan redirect ke Instagram.

## Pengujian

1. Pastikan AP sudah `In Sync`.
2. Forget SSID pada laptop/HP.
3. Sambungkan kembali ke SSID BBPMP.
4. Trigger captive portal dengan `http://neverssl.com`.
5. Pastikan URL portal memiliki `ga_srvr` dan `ga_Qv`.
6. Klik `ACCEPT & CONNECT`.
7. Browser melakukan POST ke `https://<ga_srvr>:444/cgi-bin/hotspot_login.cgi?...`.
8. Setelah Cambium meng-authorize client, Success Action mengarahkan ke `https://www.instagram.com/bbpmpjatim/`.
9. Setelah itu buka situs lain untuk memastikan Internet benar-benar aktif.

## Catatan sertifikat

HTTPS/444 berarti perangkat harus dapat menerima sertifikat layanan HTTPS pada AP. Jika muncul peringatan sertifikat pada saat proses authorization, masalahnya berada pada sertifikat/HTTPS service AP, bukan pada tampilan HTML atau CSS portal.
