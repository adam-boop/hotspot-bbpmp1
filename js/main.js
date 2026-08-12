document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  const gaSurl = urlParams.get('ga_surl') || 'https://www.instagram.com/bbpmpjatim/';
  const loginForm = document.getElementById('loginForm');

  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }

  if (loginForm) {
    // Ambil target POST bawaan dari query parameter cnMaestro (ga_post/ga_cm)
    const postUrl = urlParams.get('ga_post') || 'http://10.11.60.1/cgi-bin/hotspot_login.cgi';
    loginForm.action = postUrl;
  }
});