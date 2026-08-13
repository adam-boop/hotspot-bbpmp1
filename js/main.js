document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  if (!form || !button) return;

  /*
   * Cambium External Hotspot / Clickthrough
   *
   * The AP sends the client to this page with parameters such as:
   * ga_srvr, ga_ssid, ga_ap_mac, ga_nas_id, ga_cmac and ga_Qv.
   *
   * Cambium requires the ORIGINAL query string to be appended to:
   *   http://<ga_srvr>:880/cgi-bin/hotspot_login.cgi
   * or, for HTTPS AP Server Protocol:
   *   https://<ga_srvr>:444/cgi-bin/hotspot_login.cgi
   *
   * Do NOT rebuild the query string with URLSearchParams: ga_Qv must
   * remain exactly as received (including its percent-encoding).
   */

  const rawQuery = window.location.search.length > 1
    ? window.location.search.substring(1)
    : "";

  const params = new URLSearchParams(window.location.search);
  const gaSrvr = params.get("ga_srvr");

  if (!gaSrvr) {
    button.disabled = true;
    status.textContent =
      "Parameter captive portal Cambium (ga_srvr) tidak ditemukan. " +
      "Buka portal melalui redirect Guest Access Cambium.";
    return;
  }

  /*
   * Match the Cambium AP Server Protocol setting.
   * - If the portal is opened over HTTPS, use HTTPS :444 to avoid
   *   browser mixed-content blocking.
   * - If opened over HTTP, use HTTP :880.
   *
   * For your current cnMaestro configuration, use AP Server Protocol
   * = HTTPS so this page uses :444.
   */
  const useHttpsToAp = window.location.protocol === "https:";
  const scheme = useHttpsToAp ? "https" : "http";
  const port = useHttpsToAp ? "444" : "880";

  /*
   * If ga_srvr already contains a port, strip it because Cambium's
   * ga_srvr is normally an AP address/hostname. IPv6 is kept supported.
   */
  let apHost = gaSrvr.trim();

  if (apHost.startsWith("[") && apHost.includes("]")) {
    apHost = apHost.substring(1, apHost.indexOf("]"));
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(apHost)) {
    apHost = apHost.split(":")[0];
  }

  const postUrl =
    scheme + "://" + apHost + ":" + port +
    "/cgi-bin/hotspot_login.cgi?" + rawQuery;

  form.method = "POST";
  form.action = postUrl;
  form.target = "_self";
  form.enctype = "application/x-www-form-urlencoded";

  form.addEventListener("submit", function () {
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';

    status.textContent =
      "Menghubungkan ke jaringan BBPMP...";

    /*
     * IMPORTANT:
     * Do not window.location.href to Instagram here.
     * Cambium must receive the POST first and authorize the client.
     * The Success Action configured in cnMaestro will perform the
     * final redirect to Instagram after authorization.
     */
  });
});
