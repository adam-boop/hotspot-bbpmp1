document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  if (!form || !button) return;

  // Cambium sends the AP address and the signed query string to the
  // external portal. Keep the original query string EXACTLY as received.
  const rawQuery = window.location.search.startsWith("?")
    ? window.location.search.slice(1)
    : "";

  const params = new URLSearchParams(rawQuery);
  const gaSrvr = params.get("ga_srvr");

  if (!gaSrvr) {
    button.disabled = true;
    status.textContent =
      "Parameter Cambium (ga_srvr) tidak ditemukan. Sambungkan ulang ke Wi-Fi BBPMP.";
    return;
  }

  // Basic safety check: ga_srvr must be a host/IP, not a URL or path.
  const validHost =
    /^[a-zA-Z0-9.-]+$/.test(gaSrvr) &&
    !gaSrvr.includes("..") &&
    gaSrvr.length <= 253;

  if (!validHost) {
    button.disabled = true;
    status.textContent =
      "Alamat AP Cambium tidak valid. Silakan sambungkan ulang ke Wi-Fi.";
    return;
  }

  /*
   * Cambium External Hotspot / Clickthrough:
   * The client browser must POST to the AP on TCP/880 and append the
   * ORIGINAL query string unchanged. This includes ga_Qv, so do not
   * rebuild or URL-decode/re-encode the query string.
   *
   * The AP will authorize the client. The final redirect (for example
   * Instagram) must be configured in Cambium > Guest Access > Success Action.
   */
  form.action =
    "http://" + gaSrvr + ":880/cgi-bin/hotspot_login.cgi?" + rawQuery;
  form.method = "POST";
  form.target = "_self";
  form.enctype = "application/x-www-form-urlencoded";

  form.addEventListener("submit", () => {
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';

    if (status) {
      status.textContent = "Menghubungkan ke jaringan BBPMP...";
    }
  });
});
