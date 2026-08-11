document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  const gaCm = urlParams.get('ga_cm') || urlParams.get('ga_srvr') || '10.11.60.1';
  const loginForm = document.getElementById('loginForm');
  const connectBtn = document.getElementById('connectBtn');

  // 1. Isikan parameter ga_sr ke hidden input
  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }

  // 2. Set action URL POST ke AP Cambium
  if (loginForm) {
    loginForm.action = "http://" + gaCm + ":8805/cgi-bin/hotspot_login.cgi";

    // 3. Efek loading saat pengguna menekan tombol
    loginForm.addEventListener("submit", function() {
      if (connectBtn) {
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
      }
    });
  }
});