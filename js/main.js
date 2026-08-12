document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const gaSr = urlParams.get('ga_sr') || urlParams.get('ga_srvr') || '';
  const gaCm = urlParams.get('ga_cm') || '10.11.60.1';
  const gaSurl = encodeURIComponent(urlParams.get('ga_surl') || 'https://www.instagram.com/bbpmpjatim/');
  
  const loginForm = document.getElementById('loginForm');
  const connectBtn = document.getElementById('connectBtn');

  if (document.getElementById('ga_sr')) {
    document.getElementById('ga_sr').value = gaSr;
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Hentikan submit form bawaan browser agar tidak kena about:blank#blocked
      
      if (connectBtn) {
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        connectBtn.disabled = true;
      }

      // Susun URL login langsung ke AP Cambium
      const loginUrl = "http://" + gaCm + ":8805/cgi-bin/hotspot_login.cgi?ga_sr=" + encodeURIComponent(gaSr) + "&ga_surl=" + gaSurl;

      // Alihkan halaman secara langsung
      window.location.href = loginUrl;
    });
  }
});