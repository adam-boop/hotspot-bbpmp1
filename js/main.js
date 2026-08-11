document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  
  // Ambil IP dari parameter ga_cm. Jika tidak ada, gunakan default IP AP 10.11.60.1
  const gaCm = urlParams.get('ga_cm') || '10.11.60.1';
  
  const loginForm = document.getElementById('loginForm');
  const connectBtn = document.getElementById('connectBtn');

  // Isikan token/parameter ke input hidden
  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }

  // Tembakkan POST langsung ke IP AP Cambium (Port 8805 atau 880)
  if (loginForm) {
    loginForm.action = "http://" + gaCm + "/cgi-bin/hotspot_login.cgi";

    loginForm.addEventListener("submit", function() {
      if (connectBtn) {
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
      }
    });
  }
});