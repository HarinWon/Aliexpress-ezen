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

function redirectToMobileVersion() {
  if (window.innerWidth <= 400) {
    window.location.href = "mobileLogin.html"; // 모바일용 HTML 파일로 변경
  }
}

// 페이지 로드 시 체크
redirectToMobileVersion();

// 윈도우 리사이즈 시 체크
window.addEventListener("resize", function () {
  redirectToMobileVersion();
});
