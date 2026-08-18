/*
 * BBPMP - Cambium cnMaestro External Hotspot / Clickthrough
 * HTTP-ready version.
 *
 * IMPORTANT:
 * - Keep the original query string exactly as Cambium supplied it.
 * - Do not redirect to Instagram from JavaScript.
 * - Cambium must receive the POST first and authorize the client.
 * - Configure the final Instagram redirect in cnMaestro > Guest Access >
 *   Success Action > Redirect User to External URL.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("loginForm");
    var button = document.getElementById("connectBtn");
    var status = document.getElementById("portalStatus");

    if (!form || !button) return;

    var rawQuery = window.location.search.charAt(0) === "?"
      ? window.location.search.substring(1)
      : "";

    var params = new URLSearchParams(window.location.search);
    var gaSrvr = params.get("ga_srvr");

    if (!gaSrvr) {
      button.disabled = true;
      if (status) {
        status.textContent =
          "Portal belum menerima parameter Cambium (ga_srvr). " +
          "Sambungkan ulang ke Wi-Fi BBPMP dan buka portal dari captive portal.";
      }
      return;
    }

    /* Normalize common Cambium ga_srvr formats without changing the value
       sent back in the original query string. */
    var apHost = gaSrvr.trim();

    if (apHost.charAt(0) === "[") {
      var closeBracket = apHost.indexOf("]");
      if (closeBracket > 0) apHost = apHost.substring(1, closeBracket);
    } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(apHost)) {
      apHost = apHost.substring(0, apHost.lastIndexOf(":"));
    } else if (/^[a-zA-Z0-9.-]+:\d+$/.test(apHost)) {
      apHost = apHost.substring(0, apHost.lastIndexOf(":"));
    }

    /* Current cnMaestro configuration: AP Server Protocol = HTTP. */
    var postUrl =
      "https://" + apHost + ":444/cgi-bin/hotspot_login.cgi" +
      (rawQuery ? "?" + rawQuery : "");

    form.method = "POST";
    form.action = postUrl;
    form.target = "_self";
    form.enctype = "application/x-www-form-urlencoded";

    form.addEventListener("submit", function () {
      button.disabled = true;
      button.innerHTML = "<span class=\"btn-icon\">◌</span> CONNECTING...";
      if (status) status.textContent = "Menghubungkan ke jaringan BBPMP...";
    });
  });
})();
