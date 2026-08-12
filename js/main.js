document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  /*
   * Cambium External Hotspot
   *
   * The portal remains visually unchanged.
   * The important fix is that the captive-portal POST uses HTTPS :444
   * instead of HTTP :880, preventing the HTTPS -> HTTP browser warning
   * ("Send anyway") on modern browsers.
   *
   * ga_srvr and the complete query string are supplied by Cambium.
   */
  const query = window.location.search.substring(1);
  const params = new URLSearchParams(window.location.search);
  const gaSrvr = params.get("ga_srvr");

  if (!gaSrvr) {
    button.disabled = true;
    status.textContent =
      "Portal tidak menerima parameter ga_srvr dari Cambium. Pastikan External Hotspot dikonfigurasi pada WLAN.";
    status.classList.add("error-text");
    return;
  }

  // Cambium HTTPS captive portal endpoint.
  form.action =
    "https://" +
    gaSrvr +
    ":444/cgi-bin/hotspot_login.cgi?" +
    query;

  form.addEventListener("submit", function () {
    button.disabled = true;
    button.innerHTML = "<span class=\"spinner\"></span> CONNECTING...";
    status.textContent = "Menghubungkan ke jaringan BBPMP...";
  });
});
