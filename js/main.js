/*
 * BBPMP - Cambium External Hotspot / Clickthrough
 *
 * IMPORTANT:
 * 1. Cambium Guest Access must use External Hotspot + Clickthrough.
 * 2. The External Page URL should be HTTPS.
 * 3. AP Server Protocol in cnMaestro must match the values below.
 *
 * Recommended for an HTTPS portal:
 *   AP Server Protocol = HTTPS
 *   Cambium AP POST port = 444
 *
 * Cambium requires the ORIGINAL query string to be appended to
 * /cgi-bin/hotspot_login.cgi. Do not rebuild/re-encode ga_Qv.
 */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const button = document.getElementById("connectBtn");
  const status = document.getElementById("portalStatus");

  if (!form || !button) return;

  // ================================================================
  // CAMBIUM AP POST SETTINGS
  // ================================================================
  // Your portal is hosted on HTTPS, so HTTPS/444 is recommended.
  // This MUST match cnMaestro > WLAN > Guest Access > AP Server Protocol.
  const CAMBIUM_AP_PROTOCOL = "https";
  const CAMBIUM_AP_PORT = "444";

  // ================================================================
  // READ ORIGINAL CAMBIUM QUERY STRING
  // ================================================================
  // Do NOT use URLSearchParams.toString() here. ga_Qv must be sent
  // exactly as Cambium supplied it, including its existing encoding.
  const rawQuery = window.location.search.length > 1
    ? window.location.search.substring(1)
    : "";

  const params = new URLSearchParams(window.location.search);
  const gaSrvr = (params.get("ga_srvr") || "").trim();
  const gaQv = params.get("ga_Qv") || "";

  // ================================================================
  // VALIDATE CAMBIUM REDIRECT PARAMETERS
  // ================================================================
  if (!gaSrvr) {
    button.disabled = true;
    button.classList.add("disabled");

    if (status) {
      status.textContent =
        "Sesi captive portal Cambium tidak ditemukan. " +
        "Silakan putuskan Wi-Fi, pilih 'Lupakan jaringan', lalu sambungkan kembali.\n" +
        "Portal harus dibuka melalui Guest Access Cambium. ";
    }

    console.error("[BBPMP] ga_srvr tidak ditemukan.");
    return;
  }

  if (!gaQv) {
    button.disabled = true;
    button.classList.add("disabled");

    if (status) {
      status.textContent =
        "Sesi captive portal Cambium tidak lengkap (ga_Qv tidak ditemukan). " +
        "Silakan sambungkan ulang ke Wi-Fi BBPMP.";
    }

    console.error("[BBPMP] ga_Qv tidak ditemukan.");
    return;
  }

  // ================================================================
  // NORMALIZE AP HOST
  // ================================================================
  // Normally ga_srvr is an AP IP/hostname. Remove an accidental port
  // so that the configured Cambium port below is used exactly once.
  let apHost = gaSrvr;

  // IPv6 in [addr]:port form.
  if (apHost.startsWith("[") && apHost.includes("]")) {
    apHost = apHost.substring(1, apHost.indexOf("]"));
  }
  // IPv4/hostname with a numeric port.
  else if (/^\S+:\d+$/.test(apHost)) {
    apHost = apHost.replace(/:\d+$/, "");
  }

  // Prevent malformed host values from becoming a dangerous URL.
  if (!apHost || /[\s/?#]/.test(apHost)) {
    button.disabled = true;
    if (status) {
      status.textContent =
        "Alamat Access Point Cambium tidak valid. Silakan sambungkan ulang Wi-Fi.";
    }
    console.error("[BBPMP] ga_srvr tidak valid:", gaSrvr);
    return;
  }

  // ================================================================
  // CAMBIUM CLICKTHROUGH POST URL
  // ================================================================
  const postUrl =
    CAMBIUM_AP_PROTOCOL + "://" +
    apHost + ":" +
    CAMBIUM_AP_PORT +
    "/cgi-bin/hotspot_login.cgi?" +
    rawQuery;

  // Set the form to submit directly to the Cambium AP.
  // For Clickthrough there is no username/password POST body required;
  // the original query string is the important part.
  form.method = "POST";
  form.action = postUrl;
  form.target = "_self";
  form.enctype = "application/x-www-form-urlencoded";

  console.log("[BBPMP] Cambium External Hotspot ready");
  console.log("[BBPMP] ga_srvr:", gaSrvr);
  console.log("[BBPMP] ga_Qv present:", Boolean(gaQv));
  console.log("[BBPMP] POST URL:", postUrl);

  // ================================================================
  // SUBMIT
  // ================================================================
  form.addEventListener("submit", function () {
    // Cambium must receive the POST first. Do NOT redirect to Instagram
    // from JavaScript here. The Success Action in cnMaestro performs the
    // final redirect after the AP authorizes the client.
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';

    if (status) {
      status.textContent = "Menghubungkan ke jaringan BBPMP...";
    }
  });
});
