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

// PC사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width >= 510 && !window.location.href.includes("loginAgree.html")) {
    window.location.href = "loginAgree.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
