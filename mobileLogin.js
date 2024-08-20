function checkScreenWidth() {
  const width = window.innerWidth;

  if (width >= 510 && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }
}

window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
