function updatePlaceholder(option) {
  const input = document.getElementById("reset-input");
  if (option === "email") {
    input.placeholder = "이메일 또는 회원 ID";
    inputField.value = "";
  } else if (option === "phone") {
    input.placeholder = "KR+82 | 010-0000-0000";
    inputField.value = "";
  }
}

// PC 사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width >= 510 && !window.location.href.includes("find.html")) {
    window.location.href = "find.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
