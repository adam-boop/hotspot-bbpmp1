document.addEventListener("DOMContentLoaded", function() {
    const connectBtn = document.getElementById("connectBtn");
    if (connectBtn) {
        connectBtn.addEventListener("click", function() {
            connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            connectBtn.disabled = true;
            setTimeout(() => {
                alert("Anda berhasil terhubung ke Hotspot Resmi BBPMP Provinsi Jawa Timur.");
                connectBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
                connectBtn.style.backgroundColor = "#28a745";
            }, 2000);
        });
    }
});