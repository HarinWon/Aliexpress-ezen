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

// 모두확인하였고 << 버튼이벤트
const toggleButton2 = document.querySelector("#agree_more_angle");
const agreeSection2 = document.querySelector(".agree_more");

toggleButton2.addEventListener("click", () => {
  agreeSection2.classList.toggle("active");

  if (agreeSection2.classList.contains("active")) {
    toggleButton2.classList.add("fa-angle-down");
    toggleButton2.style.fontSize = "22px";
    toggleButton2.classList.remove("fa-angle-up");
  } else {
    toggleButton2.classList.add("fa-angle-up");
    toggleButton2.classList.remove("fa-angle-down");
  }
});

// 아래 모두동의 체크
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
      "이메일 형식이 맞지 않거나 전화번호가 유효하지 않습니다";
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
