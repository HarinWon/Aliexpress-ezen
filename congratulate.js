document.addEventListener("DOMContentLoaded", function () {
  const keys = Object.keys(localStorage);

  if (keys.length > 0) {
    let userId;

    if (localStorage.getItem("registeredUsers") === null) userId = [];
    else userId = JSON.parse(localStorage.getItem("registeredUsers"));

    const userIdElement = document.querySelector("#usrId");
    if (userId.length > 0) {
      const lastValue = userId[userId.length - 1];
      const user = lastValue;
      userIdElement.innerText = user;
    }
  }
});
