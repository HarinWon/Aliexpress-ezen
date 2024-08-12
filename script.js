document.addEventListener("DOMContentLoaded", function () {
  fetch("./menu.json")
    .then((response) => response.json())
    .then((menuData) => {
      const menu = document.getElementById("menu");
      createMenu(menu, menuData);
      addMenuHoverEffect();
    })
    .catch((error) => console.error("Error loading menu:", error));
});

function createMenu(parent, items) {
  Object.keys(items).forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("has-children");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = category;
    li.appendChild(a);

    const subMenu = document.createElement("ul");
    subMenu.classList.add("sub-menu");

    Object.keys(items[category]).forEach((subCategory) => {
      const subLi = document.createElement("li");
      const subA = document.createElement("a");
      subA.href = "#";
      subA.textContent = subCategory;
      subLi.appendChild(subA);

      const megaMenu = document.createElement("div");
      megaMenu.classList.add("mega-menu");
      const megaUl = document.createElement("ul");

      items[category][subCategory].forEach((subItem) => {
        const megaLi = document.createElement("li");
        const megaA = document.createElement("a");
        megaA.href = "#";
        megaA.textContent = subItem;
        megaLi.appendChild(megaA);
        megaUl.appendChild(megaLi);
      });

      megaMenu.appendChild(megaUl);
      subLi.appendChild(megaMenu);
      subMenu.appendChild(subLi);
    });

    li.appendChild(subMenu);
    parent.appendChild(li);
  });
}

function addMenuHoverEffect() {
  const mainMenuItems = document.querySelectorAll(".has-children");

  mainMenuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const subMenu = this.querySelector(".sub-menu");
      const megaMenu = this.querySelector(".mega-menu");
      if (subMenu) {
        subMenu.style.display = "block";
      }
      if (megaMenu) {
        megaMenu.style.display = "block";
      }
    });

    item.addEventListener("mouseleave", function () {
      const subMenu = this.querySelector(".sub-menu");
      const megaMenu = this.querySelector(".mega-menu");
      if (subMenu) {
        subMenu.style.display = "none";
      }
      if (megaMenu) {
        megaMenu.style.display = "none";
      }
    });
  });
}
