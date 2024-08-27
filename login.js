function showEmailLogin() {
  document.querySelector("#email-login").classList.add("active");
  document.querySelector("#qr-login").classList.remove("active");
  document.querySelector("#email_btn").classList.add("active");
  document.querySelector("#qr_btn").classList.remove("active");
}

function showQRLogin() {
  document.querySelector("#email-login").classList.remove("active");
  document.querySelector("#qr-login").classList.add("active");
  document.querySelector("#email_btn").classList.remove("active");
  document.querySelector("#qr_btn").classList.add("active");
  generateQRNumber();
}
showEmailLogin();

// 모바일 사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width <= 430 && !window.location.href.includes("mobileLogin.html")) {
    window.location.href = "mobileLogin.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// qr 타이머
let timeLeft = 180;
let timerInterval;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.querySelector("#qr-timer").innerText = `${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.querySelector("#qr-timer").innerText = "00:00";
    alert("시간이 만료되었습니다.");
  } else {
    timeLeft--;
  }
}

function startQRTimer() {
  clearInterval(timerInterval);
  timeLeft = 180;
  timerInterval = setInterval(updateTimer, 1000);
}

// qr숫자 랜덤
function generateQRNumber() {
  let qrNumber = Math.floor(Math.random() * 99) + 1;

  qrNumber = qrNumber < 10 ? "0" + qrNumber : qrNumber;

  document.querySelector("#qr-number").innerText = qrNumber;
}

document.querySelector("#qr_btn").addEventListener("click", showQRLogin);

// 비밀번호 유도
document.addEventListener("DOMContentLoaded", function () {
  const registeredEmail = "alieexpress@naver.com";
  const registeredPhone = "01012345678";

  const form = document.querySelector(".login-form");
  const emailInput = document.querySelector("#email-phone");
  const passwordInput = document.querySelector("#email-pw");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredEmail = emailInput.value.trim();

    if (enteredEmail === registeredEmail || enteredEmail === registeredPhone) {
      passwordInput.style.display = "block";
      passwordInput.setAttribute("required", "true");
      emailInput.disabled = true;
    } else {
      const userConfirmed = confirm(
        "회원정보가 없습니다. 회원가입으로 넘어가시겠습니까?"
      );
      if (userConfirmed) {
        window.location.href = "./loginAgree.html";
      } else {
        emailInput.value = "";
      }
    }
  });
});
