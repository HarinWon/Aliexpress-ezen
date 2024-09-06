const checks = document.querySelectorAll(".fa-circle-check");
const checkAll = document.querySelector(".checkAll");
const agreeBtn = document.querySelector(".continue-button");

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

  agreeBtn.removeEventListener("click", handleAgreeBtnClick);
  agreeBtn.addEventListener("click", handleAgreeBtnClick);
});

function handleAgreeBtnClick() {
  if (checkAll.classList.contains("active")) {
    window.location.href = "mobileCongratulate.html";
  } else {
    alert("약관에 동의하세요.");
  }
}

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

// PC사이즈 진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width > 430 && !window.location.href.includes("loginAgree.html")) {
    window.location.href = "loginAgree.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// back-button 누르면뒤로
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
  window.history.back();
});
