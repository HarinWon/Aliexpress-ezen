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
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width <= 510 && !window.location.href.includes("mobileLogin.html")) {
    window.location.href = "mobileLogin.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
