document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  const params = new URLSearchParams(window.location.search);
  const rawQuery = window.location.search.substring(1);
  const gaSrvr = params.get("ga_srvr");

  if (!gaSrvr) {
    button.disabled = true;
    status.textContent =
      "Portal tidak menerima parameter Cambium. Buka kembali Wi-Fi untuk memunculkan halaman login.";
    return;
  }

  /*
   * Cambium External Hotspot - HTTP mode.
   * AP menerima POST ke port 880. Semua parameter ga_* dari
   * redirect awal harus diteruskan kembali ke AP.
   */
  const apUrl =
    "http://" + gaSrvr + ":880/cgi-bin/hotspot_login.cgi?" + rawQuery;

  form.action = apUrl;
  form.method = "POST";
  form.target = "_self";

  form.addEventListener("submit", function () {
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';
    status.textContent = "Menghubungkan ke jaringan BBPMP...";
  });
});
