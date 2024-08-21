function findEmail() {
  // '계정 찾기' 버튼 클릭 시 계정 찾기 폼 활성화
  document.querySelector(".find-email-form").classList.add("active");
  document.querySelector(".find-password-form1").classList.remove("active");

  // '계정 찾기' 버튼 활성화, '비밀번호 찾기' 버튼 비활성화
  document.querySelector(".email-btn").classList.add("active");
  document.querySelector(".pw-btn").classList.remove("active");
}

function findPw() {
  // '비밀번호 찾기' 버튼 클릭 시 비밀번호 찾기 폼 활성화
  document.querySelector(".find-email-form").classList.remove("active");
  document.querySelector(".find-password-form1").classList.add("active");

  // '비밀번호 찾기' 버튼 활성화, '계정 찾기' 버튼 비활성화
  document.querySelector(".pw-btn").classList.add("active");
  document.querySelector(".email-btn").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  findEmail();
});

document.addEventListener("DOMContentLoaded", () => {
  const emailRadio = document.querySelector('input[name="pw1"][value="email"]');
  const phoneRadio = document.querySelector('input[name="pw1"][value="phone"]');
  const inputField = document.querySelector(
    '.find-password-form1 input[type="text"]'
  );

  // 이메일 라디오 버튼 클릭 시
  emailRadio.addEventListener("click", () => {
    inputField.placeholder = "이메일 또는 회원 ID";
    inputField.value = "";
  });

  // 전화번호 라디오 버튼 클릭 시
  phoneRadio.addEventListener("click", () => {
    inputField.placeholder = "KR +82 | 전화번호를 입력하세요.";
    inputField.value = "";
  });
});

// 계정찾기 화면에서 원하는정보 찾기 누르면 체크표시에 불들어오게 하기

const find = document.querySelectorAll(".find-method-email li span");

find.forEach((span) => {
  span.addEventListener("click", function () {
    document
      .querySelectorAll(".find-method-email li span i")
      .forEach((icon) => {
        icon.classList.remove("active");
      });

    const icon = this.querySelector("i");
    if (icon) {
      icon.classList.add("active");
    }
  });
});

// 모바일 사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width <= 510 && !window.location.href.includes("mobileFind.html")) {
    window.location.href = "mobileFind.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
