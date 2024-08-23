// back-button 누르면뒤로
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
  window.history.back();
});
