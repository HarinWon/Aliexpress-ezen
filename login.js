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

// 원래 페이지의 URL 저장
const originalPage = window.location.href;

function checkScreenWidth() {
  const width = window.innerWidth;

  if (width <= 500 && !window.location.href.includes("mobileLogin.html")) {
    // 400px 이하로 줄어들고 현재 페이지가 mobileLogin.html이 아닌 경우
    window.location.href = "mobileLogin.html";
  } else if (width > 500 && window.location.href.includes("mobileLogin.html")) {
    // 400px 이상으로 커지고 현재 페이지가 mobileLogin.html인 경우
    window.location.href = originalPage;
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
