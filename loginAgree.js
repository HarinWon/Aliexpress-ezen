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
