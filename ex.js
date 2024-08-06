function showEmailLogin() {
  document.getElementById("email-login").classList.add("active");
  document.getElementById("qr-login").classList.remove("active");
  document.getElementById("email-tab").classList.add("active");
  document.getElementById("qr-tab").classList.remove("active");
}

function showQRLogin() {
  document.getElementById("email-login").classList.remove("active");
  document.getElementById("qr-login").classList.add("active");
  document.getElementById("email-tab").classList.remove("active");
  document.getElementById("qr-tab").classList.add("active");
}

// Initialize with email login visible
showEmailLogin();
