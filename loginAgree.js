document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("h4 i.fa-angle-down");
  const agreeSection = document.querySelector(".agree");

  toggleButton.addEventListener("click", function () {
    agreeSection.classList.toggle("active");

    if (agreeSection.classList.contains("active")) {
      toggleButton.classList.add("fa-angle-up");
      toggleButton.style.paddingLeft = "4px";
      toggleButton.style.fontSize = "14px";
      toggleButton.classList.remove("fa-angle-down");
    } else {
      toggleButton.classList.add("fa-angle-down");
      toggleButton.classList.remove("fa-angle-up");
    }
  });
});

// 모두확인하였고 화살표 << 버튼이벤트
const toggleButton2 = document.querySelector("#agree_more_angle");
const agreeSection2 = document.querySelector(".agree_more");

toggleButton2.addEventListener("click", () => {
  agreeSection2.classList.toggle("active");

  if (agreeSection2.classList.contains("active")) {
    toggleButton2.classList.add("fa-angle-down");
    toggleButton2.style.fontSize = "18px";
    toggleButton2.classList.remove("fa-angle-up");
  } else {
    toggleButton2.classList.add("fa-angle-up");
    toggleButton2.classList.remove("fa-angle-down");
  }
});

// 아이디 유효성검사
function isValidEmail(email) {
  return email.includes("@");
}

function isValidPhone(phone) {
  return /^\d{11}$/.test(phone);
}

function isValidPassword(password) {
  if (password.length < 8 || password.length > 16) {
    return false;
  }

  let hasLower = /[a-z]/.test(password);
  let hasUpper = /[A-Z]/.test(password);
  let hasDigit = /\d/.test(password);
  let hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let charTypes = [hasLower, hasUpper, hasDigit, hasSpecial].filter(
    Boolean
  ).length;
  if (charTypes < 2) {
    return false;
  }

  if (/(\w)\1\1/.test(password)) {
    return false;
  }

  return true;
}

function validateEmailOrPhone() {
  let emailOrPhoneField = document.getElementById("email");
  let value = emailOrPhoneField.value;

  if (!isValidEmail(value) && !isValidPhone(value)) {
    emailOrPhoneField.value = "";
    emailOrPhoneField.placeholder =
      "이메일 형식이 틀리거나 전화번호가 유효하지않습니다";
  }
}

function validatePassword() {
  let passwordField = document.getElementById("password");
  let password = passwordField.value;

  if (!isValidPassword(password)) {
    passwordField.value = "";
    passwordField.placeholder = "비밀번호 조건이 맞지 않습니다";
  }
}

function validateConfirmPassword() {
  let passwordField = document.getElementById("password");
  let confirmPasswordField = document.getElementById("confirmPassword");
  let confirmPassword = confirmPasswordField.value;

  if (passwordField.value !== confirmPassword) {
    confirmPasswordField.value = "";
    confirmPasswordField.placeholder = "비밀번호가 일치하지 않습니다";
  }
}

document.getElementById("email").addEventListener("blur", validateEmailOrPhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document
  .getElementById("confirmPassword")
  .addEventListener("blur", validateConfirmPassword);

// 모두 동의 체크시 동그라미 전부 빨간불
const checks = document.querySelectorAll(".fa-circle-check");
const checkAll = document.querySelector(".checkAll");

checks.forEach((check) => {
  check.addEventListener("click", function () {
    this.classList.toggle("active");

    if (checkAll.classList.contains("active")) {
      checks.forEach((check) => {
        check.classList.add("active");
      });
    }
  });
});

// 모바일 사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width <= 510 && !window.location.href.includes("mobileAgree.html")) {
    window.location.href = "mobileAgree.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
