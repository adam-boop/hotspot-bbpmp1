# Portal Hotspot BBPMP - Tampilan Original

Versi ini mengembalikan desain portal seperti versi sebelumnya:

- Background foto di sisi kiri menggunakan `images/background.jpg`
- Logo BBPMP menggunakan `images/logo-bbpmp.png`
- Panel putih modern di sisi kanan
- BBPMP / PROVINSI JAWA TIMUR
- 4 fitur ikon
- Tombol ACCEPT & CONNECT
- Footer BBPMP

Perubahan hanya pada mekanisme submit Cambium di `js/main.js`.

## File gambar wajib

Masukkan file yang sudah Anda gunakan sebelumnya:

```text
images/logo-bbpmp.png
images/background.jpg
images/favicon.ico
```

Jangan mengganti nama file.

## URL portal

Gunakan domain Anda:

```text
https://hotspot-bbpmp.duckdns.org
```

Bukan GitHub Pages sebagai External Page URL.

## Instagram

Redirect setelah berhasil tetap:

```text
https://www.instagram.com/bbpmpjatim/
```

## cnMaestro

External Page URL:

```text
https://hotspot-bbpmp.duckdns.org
```

Success Action:

```text
Redirect User to External URL
```

Redirect URL:

```text
https://www.instagram.com/bbpmpjatim/
```

Untuk mekanisme HTTPS POST pada script:

```text
https://<ga_srvr>:444/cgi-bin/hotspot_login.cgi
```

Jika port HTTPS pada AP Anda berbeda atau tidak tersedia, jangan mengganti port secara acak; kirim screenshot error dari browser/cnMaestro.


## Perbaikan tampilan
Background terbaru hanya menggunakan area visual kiri dari desain baru, sehingga tidak ada lagi kartu portal yang terduplikasi di dalam background. Panel portal HTML tetap dirender oleh `index.html`.
