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
showEmailLogin();

// 모바일 사이즈 진입

const originalPage = window.location.href;

function checkScreenWidth() {
  const width = window.innerWidth;

  if (width <= 500 && !window.location.href.includes("mobileLogin.html")) {
    window.location.href = "mobileLogin.html";
  } else if (width > 500 && window.location.href.includes("mobileLogin.html")) {
    window.location.href = originalPage;
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
