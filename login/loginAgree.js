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

document.addEventListener("DOMContentLoaded", function () {
  const registeredEmail = "aliexpress@naver.com";
  const registeredPhone = "01012345678";

  const form = document.querySelector(".login-form");
  const emailInput = document.querySelector("#email-phone");
  const passwordInput = document.querySelector("#email-pw");

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
    let emailOrPhoneField = document.querySelector("#email");
    let value = emailOrPhoneField.value;

    if (!isValidEmail(value) && !isValidPhone(value)) {
      emailOrPhoneField.value = "";
      document.querySelector("#error_email").innerText =
        "*이메일 형식이 틀리거나 전화번호가 유효하지않습니다";
      return false;
    }
    return true;
  }

  function validatePassword() {
    let passwordField = document.querySelector("#password");
    let password = passwordField.value;

    if (!isValidPassword(password)) {
      passwordField.value = "";
      document.querySelector("#error_password1").innerText =
        "*비밀번호양식을 확인해주세요!";
      return false;
    }
    return true;
  }

  function validateConfirmPassword() {
    let passwordField = document.querySelector("#password");
    let confirmPasswordField = document.querySelector("#confirmPassword");
    let confirmPassword = confirmPasswordField.value;

    if (passwordField.value !== confirmPassword) {
      confirmPasswordField.value = "";
      document.querySelector("#error_password2").innerText =
        "*비밀번호가 일치하지 않습니다";
      return false;
    }
    return true;
  }
  // 유효성 검사 이벤트 핸들러
  document
    .querySelector("#email")
    .addEventListener("blur", validateEmailOrPhone);
  document
    .querySelector("#password")
    .addEventListener("blur", validatePassword);
  document
    .querySelector("#confirmPassword")
    .addEventListener("blur", validateConfirmPassword);

  // 모두 동의 체크박스 이벤트 처리
  const checks = document.querySelectorAll(".fa-circle-check");
  const checkAll = document.querySelector(".checkAll");
  const submitButton = document.querySelector(".submit");

  checkAll.addEventListener("click", function () {
    const isActive = checkAll.classList.contains("active");

    if (isActive) {
      checks.forEach((check) => {
        check.classList.remove("active");
      });
    } else {
      checks.forEach((check) => {
        check.classList.add("active");
      });
    }

    checkAll.classList.toggle("active");
  });

  checks.forEach((check) => {
    check.addEventListener("click", function () {
      this.classList.toggle("active");

      const allActive = Array.from(checks).every((check) =>
        check.classList.contains("active")
      );
      const anyActive = Array.from(checks).some((check) =>
        check.classList.contains("active")
      );

      if (allActive) {
        checkAll.classList.add("active");
      } else if (!anyActive) {
        checkAll.classList.remove("active");
      }
    });
  });

  // 제출 버튼 클릭 시 가입 축하 페이지로 이동
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const isEmailOrPhoneValid = validateEmailOrPhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const allChecksActive = checkAll.classList.contains("active");

    if (
      isEmailOrPhoneValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      allChecksActive
    ) {
      const newUserid = document.querySelector("#email").value;
      let registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      if (!registeredUsers.includes(newUserid)) {
        registeredUsers.push(newUserid);
        localStorage.setItem(
          "registeredUsers",
          JSON.stringify(registeredUsers)
        );
      }
      window.location.href = "./congratulate.html";
    } else {
      alert("회원가입 조건을 만족하지 않았거나 약관에 동의하지 않으셨습니다.");
    }
  });
});

// 모바일 사이즈 진입
const mediaQuery = window.matchMedia("(max-width: 430px)");

// 모바일 사이즈 진입
function checkScreenWidth() {
  if (
    mediaQuery.matches &&
    !window.location.href.includes("mobileAgree.html")
  ) {
    window.location.href = "mobileAgree.html";
  }
}

// 200ms 딜레이로 resize 이벤트 핸들러 호출 (성능 최적화)
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkScreenWidth, 200);
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", handleResize);

// 로고 클릭시 메인페이지
const logoMain = document.querySelector(".logo");
logoMain.addEventListener("click", () => {
  window.location.href = "../index.html";
});
