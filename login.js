function showEmailLogin() {
  document.getElementById("email-login").classList.add("active");
  document.getElementById("qr-login").classList.remove("active");
  document.getElementById("email_btn").classList.add("active");
  document.getElementById("qr_btn").classList.remove("active");
}

function showQRLogin() {
  document.getElementById("email-login").classList.remove("active");
  document.getElementById("qr-login").classList.add("active");
  document.getElementById("email_btn").classList.remove("active");
  document.getElementById("qr_btn").classList.add("active");
}

// Initialize with email login visible
showEmailLogin();
