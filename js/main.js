document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const connectBtn = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  // PENTING:
  // Cambium mengirim ga_srvr + parameter lain pada URL redirect.
  // Untuk Clickthrough, SELURUH query string asli harus dikembalikan
  // ke hotspot_login.cgi. Jangan memakai ga_cm/ga_sr atau IP AP statis.
  const rawQuery = window.location.search.substring(1);
  const params = new URLSearchParams(window.location.search);

  const gaSrvr = params.get("ga_srvr") || "";
  const gaQv = params.get("ga_Qv") || "";

  if (!gaSrvr) {
    if (status) {
      status.textContent = "Parameter ga_srvr dari Cambium tidak ditemukan. Buka portal melalui redirect Captive Portal, bukan URL langsung.";
    }
    if (connectBtn) connectBtn.disabled = true;
    return;
  }

  if (!gaQv) {
    if (status) {
      status.textContent = "Parameter ga_Qv dari Cambium tidak ditemukan. Sesi captive portal tidak valid.";
    }
    if (connectBtn) connectBtn.disabled = true;
    return;
  }

  // Konfigurasi cnMaestro pada screenshot menggunakan HTTP.
  // HTTP POST Cambium = TCP/880.
  // Jika nanti AP Server Protocol diubah ke HTTPS, gunakan TCP/444.
  const postUrl =
    "http://" + gaSrvr + ":880/cgi-bin/hotspot_login.cgi?" + rawQuery;

  loginForm.action = postUrl;

  console.log("Cambium ga_srvr:", gaSrvr);
  console.log("Cambium ga_Qv:", gaQv);
  console.log("Cambium POST URL:", postUrl);

  loginForm.addEventListener("submit", function () {
    if (connectBtn) {
      connectBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Connecting...';
      connectBtn.disabled = true;
    }
  });
});
