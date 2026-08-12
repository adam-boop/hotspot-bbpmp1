document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Ambil parameter bawaan dari cnMaestro
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  const gaCm = urlParams.get('ga_cm') || '10.11.60.1';
  const gaSurl = urlParams.get('ga_surl') || 'https://www.instagram.com/bbpmpjatim/';
  
  // Ambil URL target POST resmi dari cnMaestro (default ke port 80 AP Cambium)
  const gaPost = urlParams.get('ga_post') || ("http://" + gaCm + "/cgi-bin/hotspot_login.cgi");

  const loginForm = document.getElementById('loginForm');
  const connectBtn = document.getElementById('connectBtn');

  // Set nilai hidden input
  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }
  if (document.getElementById('ga_surl')) {
    document.getElementById('ga_surl').value = gaSurl;
  }

  if (loginForm) {
    // Arahkan form action ke endpoint POST Cambium
    loginForm.action = gaPost;

    loginForm.addEventListener("submit", function() {
      if (connectBtn) {
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        connectBtn.disabled = true;
      }
      // Form akan ter-submit secara alami (Standard POST)
    });
  }
});