document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  const rawQuery = window.location.search.substring(1);
  const params = new URLSearchParams(window.location.search);
  const gaSrvr = params.get("ga_srvr") || "";

  if (!gaSrvr) {
    button.disabled = true;
    status.textContent =
      "Parameter captive portal Cambium tidak ditemukan. Pastikan halaman dibuka melalui redirect Guest Access.";
    return;
  }

  /*
   * Tampilan tidak diubah.
   * Mekanisme submit memakai HTTPS endpoint Cambium :444.
   * Seluruh query string dari Cambium diteruskan.
   */
  form.action =
    "https://" + gaSrvr + ":444/cgi-bin/hotspot_login.cgi?" + rawQuery;

  form.addEventListener("submit", function () {
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';
    status.textContent = "Menghubungkan ke jaringan BBPMP...";
  });
});
