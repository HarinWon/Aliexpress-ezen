function updatePlaceholder(option) {
  const input = document.querySelector("#reset-input");

  if (option === "email") {
    input.placeholder = "이메일 또는 회원 ID";
  } else if (option === "phone") {
    input.placeholder = "KR+82 | 010-0000-0000";
  }

  input.value = "";
}

// PC 사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width > 430 && !window.location.href.includes("find.html")) {
    window.location.href = "find.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// back-button 누르면뒤로
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
  window.history.back();
});
