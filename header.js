document.addEventListener("DOMContentLoaded", function () {
  const menuItem = document.getElementById("all-categories");
  const categoryMenu = document.getElementById("category-menu");
  const dropdownContainer = document.querySelector(".dropdown-container");

  // * 좌측 아코디언 메뉴 코드
  fetch("categories.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Object.keys(data).forEach((mainCategory) => {
        // 메인 카테고리 컨테이너 생성
        const categoryElement = document.createElement("div");
        categoryElement.className = "category";

        // 아이콘 이미지 또는 Font Awesome 아이콘 추가
        const iconHtml = data[mainCategory].image; // 이미지 또는 아이콘 코드
        if (iconHtml) {
          if (iconHtml.includes("<i")) {
            // Font Awesome 아이콘이 포함된 경우
            const iconContainer = document.createElement("span");
            iconContainer.innerHTML = iconHtml; // 아이콘 HTML을 직접 렌더링
            categoryElement.appendChild(iconContainer);
          } else {
            // 이미지 경로로 설정된 경우
            const icon = document.createElement("img");
            icon.src = iconHtml;
            icon.alt = `${mainCategory} 아이콘`;
            icon.className = "category-icon"; // 스타일을 위한 클래스 추가
            categoryElement.appendChild(icon);
          }
        }

        // 메인 카테고리 이름 추가
        const categoryText = document.createElement("span");
        categoryText.textContent = mainCategory;
        categoryElement.appendChild(categoryText);

        // 서브카테고리 메뉴
        const subcategoryMenu = document.createElement("div");
        subcategoryMenu.className = "subcategory-menu";
        categoryElement.appendChild(subcategoryMenu);

        // 서브카테고리 이벤트 리스너 추가
        categoryElement.addEventListener("mouseenter", function () {
          subcategoryMenu.innerHTML = ""; // 기존 서브카테고리 제거
          if (data[mainCategory]) {
            Object.keys(data[mainCategory]).forEach((subcategory) => {
              if (subcategory !== "image") {
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

                subcategoryElement.addEventListener("mouseleave", function () {
                  subsubcategoryMenu.style.display = "none";
                });

                subcategoryMenu.appendChild(subcategoryElement);
              }
            });
          }
          subcategoryMenu.style.display = "block"; // 서브카테고리 보이기
        });

        // 메인 카테고리에서 마우스가 벗어나면 서브 메뉴 숨기기
        categoryElement.addEventListener("mouseleave", function () {
          subcategoryMenu.style.display = "none"; // 서브 메뉴 숨기기
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

// 기존 코드 내에서 아이콘 처리 부분
if (iconHtml.includes("<i")) {
  // Font Awesome 아이콘이 포함된 경우
  const iconContainer = document.createElement("span");
  iconContainer.innerHTML = iconHtml; // 아이콘 HTML을 직접 렌더링
  iconContainer.querySelector('i').classList.add('icon-style'); // 아이콘에 클래스 추가
  categoryElement.appendChild(iconContainer);
} else {
  // 이미지 경로로 설정된 경우
  const icon = document.createElement("img");
  icon.src = iconHtml;
  icon.alt = `${mainCategory} 아이콘`;
  icon.className = "category-icon"; // 스타일을 위한 클래스 추가
  categoryElement.appendChild(icon);
}
