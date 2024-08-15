function updatePlaceholder(option) {
  const input = document.getElementById("reset-input");
  if (option === "email") {
    input.placeholder = "이메일 또는 회원 ID";
  } else if (option === "phone") {
    input.placeholder = "KR+82 | 010-0000-0000";
  }
}
