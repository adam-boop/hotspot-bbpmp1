document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  const gaCm = urlParams.get('ga_cm') || '10.11.60.1';
  
  const loginForm = document.getElementById('loginForm');
  const connectBtn = document.getElementById('connectBtn');

  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }

  if (loginForm) {
    // Tembakkan langsung ke port HTTPS 136443 AP Cambium
    loginForm.action = "https://" + gaCm + ":136443/cgi-bin/hotspot_login.cgi";

    loginForm.addEventListener("submit", function() {
      if (connectBtn) {
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
      }
    });
  }
});