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
