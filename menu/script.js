document.addEventListener("DOMContentLoaded", function () {
  const menuItem = document.getElementById("all-categories");
  const categoryMenu = document.getElementById("category-menu");
  const dropdownContainer = document.querySelector(".dropdown-container");

  // 메뉴 데이터 가져오기
  fetch("categories.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Object.keys(data).forEach((mainCategory) => {
        // 메인 카테고리 이름 추가
        const categoryElement = document.createElement("div");
        categoryElement.className = "category";
        categoryElement.textContent = mainCategory;

        // 서브카테고리 메뉴
        const subcategoryMenu = document.createElement("div");
        subcategoryMenu.className = "subcategory-menu";
        categoryElement.appendChild(subcategoryMenu);

        // 서브카테고리 이벤트 리스너 추가
        categoryElement.addEventListener("mouseenter", function () {
          subcategoryMenu.innerHTML = ""; // 기존 서브카테고리 제거
          if (data[mainCategory]) {
            Object.keys(data[mainCategory]).forEach((subcategory) => {
              const subcategoryElement = document.createElement("div");
              subcategoryElement.className = "subcategory-item";
              subcategoryElement.textContent = subcategory;

              // 서브 카테고리 메뉴
              const subsubcategoryMenu = document.createElement("div");
              subsubcategoryMenu.className = "subcategory-menu";
              subcategoryElement.appendChild(subsubcategoryMenu);

              subcategoryElement.addEventListener("mouseenter", function () {
                subsubcategoryMenu.innerHTML = ""; // 기존 하위 메뉴 제거
                const items = data[mainCategory][subcategory];
                items.forEach((item) => {
                  const itemElement = document.createElement("div");
                  itemElement.className = "subcategory-item";
                  itemElement.textContent = item;
                  subsubcategoryMenu.appendChild(itemElement);
                });
                subsubcategoryMenu.style.display = "block"; // 하위 메뉴 보이기
              });

              // 서브 카테고리에서 마우스가 벗어나면 하위 메뉴 숨기기
              subcategoryElement.addEventListener("mouseleave", function () {
                subsubcategoryMenu.style.display = "none";
              });

              subcategoryMenu.appendChild(subcategoryElement);
            });
          }
          subcategoryMenu.style.display = "block"; // 서브카테고리 보이기
        });

        // 메인 카테고리에서 마우스가 벗어나면 서브 메뉴 숨기기
        categoryElement.addEventListener("mouseleave", function () {
          subcategoryMenu.style.display = "none"; // 서브 메뉴 숨기기
        });

        dropdownContainer.addEventListener("mouseleave", function () {
          dropdownContainer.style.display = "none"; // 드롭다운 메뉴 숨기기
        });

        categoryMenu.appendChild(categoryElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // 드롭다운 메뉴 보이기
  menuItem.addEventListener("mouseenter", function () {
    dropdownContainer.style.display = "flex";
  });

  // 드롭다운 메뉴 숨기기
  menuItem.addEventListener("mouseleave", function () {
    if (!dropdownContainer.matches(":hover")) {
      dropdownContainer.style.display = "none";
    }
  });

  dropdownContainer.addEventListener("mouseenter", function () {
    dropdownContainer.style.display = "flex";
  });
});
