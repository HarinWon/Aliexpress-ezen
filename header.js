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
  iconContainer.querySelector("i").classList.add("icon-style"); // 아이콘에 클래스 추가
  categoryElement.appendChild(iconContainer);
} else {
  // 이미지 경로로 설정된 경우
  const icon = document.createElement("img");
  icon.src = iconHtml;
  icon.alt = `${mainCategory} 아이콘`;
  icon.className = "category-icon"; // 스타일을 위한 클래스 추가
  categoryElement.appendChild(icon);
}

// 실시간 검색어
document.addEventListener("DOMContentLoaded", function () {
  const realTimeSearchContainer = document.querySelector(".real-time-search");
  const realTimeSearchList = document.querySelector(".real-time-result");

  // 호버 이벤트를 추가하여 실시간 검색 결과 목록을 표시하거나 숨김
  realTimeSearchContainer.addEventListener("mouseenter", function () {
    realTimeSearchList.style.display = "block"; // 목록 표시
  });
  realTimeSearchContainer.addEventListener("mouseleave", function () {
    realTimeSearchList.style.display = "none"; // 목록 숨김
  });

  function updateRealTimeSearch() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let timeOfDay;

    // 시간대에 따라 'morning', 'afternoon', 'evening' 설정
    if (hours >= 6 && hours < 12) {
      timeOfDay = "morning";
    } else if (hours >= 12 && hours < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    // realTime.json에서 적절한 데이터 가져오기
    fetch("/realTime.json")
      .then((response) => response.json())
      .then((data) => {
        displayRealTimeSearch(data[timeOfDay]);
      })
      .catch((error) =>
        console.error("Error loading real time search data:", error)
      );
  }

  function displayRealTimeSearch(items) {
    realTimeSearchList.innerHTML = ""; // 기존 목록 지우기
    items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = index + 1 + ". " + Object.values(item)[0];
      realTimeSearchList.appendChild(listItem);
    });
  }

  // 실시간 검색어 목록 업데이트
  updateRealTimeSearch();
  // 30분마다 업데이트
  setInterval(updateRealTimeSearch, 1800000);
});
