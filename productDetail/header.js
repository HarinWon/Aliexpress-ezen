document.addEventListener("DOMContentLoaded", function () {
  const menuItem = document.getElementById("all-categories");
  const categoryMenu = document.getElementById("category-menu");
  const dropdownContainer = document.querySelector(".dropdown-container");

  // Fetch categories from JSON and build menu
  fetch("categories.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      buildMenu(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Build categories menu
  function buildMenu(data) {
    Object.keys(data).forEach((mainCategory) => {
      const categoryElement = document.createElement("div");
      categoryElement.className = "category";
      categoryElement.innerHTML = renderIcon(
        data[mainCategory].image,
        mainCategory
      );
      categoryElement.appendChild(createCategoryText(mainCategory));

      const subcategoryMenu = createSubcategoryMenu(data, mainCategory);
      categoryElement.appendChild(subcategoryMenu);

      categoryElement.addEventListener(
        "mouseenter",
        () => (subcategoryMenu.style.display = "block")
      );
      categoryElement.addEventListener(
        "mouseleave",
        () => (subcategoryMenu.style.display = "none")
      );

      categoryMenu.appendChild(categoryElement);
    });
  }

  // Handle icon rendering
  function renderIcon(iconHtml, mainCategory) {
    if (iconHtml.includes("<i")) {
      return `<span class='icon-style'>${iconHtml}</span>`;
    } else {
      return `<img src="${iconHtml}" alt="${mainCategory} 아이콘" class="category-icon">`;
    }
  }

  // Create main category text
  function createCategoryText(mainCategory) {
    const categoryText = document.createElement("span");
    categoryText.textContent = mainCategory;
    return categoryText;
  }

  // Create subcategory menu
  function createSubcategoryMenu(data, mainCategory) {
    const subcategoryMenu = document.createElement("div");
    subcategoryMenu.className = "subcategory-menu";

    Object.keys(data[mainCategory]).forEach((subcategory) => {
      if (subcategory !== "image") {
        const subcategoryElement = document.createElement("div");
        subcategoryElement.className = "subcategory-item";
        subcategoryElement.textContent = subcategory;

        const subsubcategoryMenu = createSubSubcategoryMenu(
          data[mainCategory][subcategory]
        );
        subcategoryElement.appendChild(subsubcategoryMenu);

        subcategoryElement.addEventListener(
          "mouseover",
          () => (subsubcategoryMenu.style.display = "block")
        );
        subcategoryElement.addEventListener(
          "mouseleave",
          () => (subsubcategoryMenu.style.display = "none")
        );

        subcategoryMenu.appendChild(subcategoryElement);
      }
    });

    return subcategoryMenu;
  }

  // Create sub-subcategory menu
  function createSubSubcategoryMenu(items) {
    const subsubcategoryMenu = document.createElement("div");
    subsubcategoryMenu.className = "subcategory-menu";

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "subcategory-item";
      itemElement.textContent = item;
      subsubcategoryMenu.appendChild(itemElement);
    });

    return subsubcategoryMenu;
  }

  // Handle dropdown display logic
  menuItem.addEventListener(
    "mouseover",
    () => (dropdownContainer.style.display = "flex")
  );
  menuItem.addEventListener("mouseleave", () => {
    if (!dropdownContainer.matches(":hover"))
      dropdownContainer.style.display = "none";
  });
  dropdownContainer.addEventListener(
    "mouseenter",
    () => (dropdownContainer.style.display = "flex")
  );
  dropdownContainer.addEventListener(
    "mouseleave",
    () => (dropdownContainer.style.display = "none")
  );

  // Real-time search updates
  const realTimeSearchContainer = document.querySelector(".real-time-search");
  const realTimeSearchList = document.querySelector(".real-time-result");

  realTimeSearchContainer.addEventListener(
    "mouseenter",
    () => (realTimeSearchList.style.display = "block")
  );
  realTimeSearchContainer.addEventListener(
    "mouseleave",
    () => (realTimeSearchList.style.display = "none")
  );

  function updateRealTimeSearch() {
    fetch("/realTime.json")
      .then((response) => response.json())
      .then((data) => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const timeOfDay =
          hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
        displayRealTimeSearch(data[timeOfDay]);
      })
      .catch((error) =>
        console.error("Error loading real time search data:", error)
      );
  }

  function displayRealTimeSearch(items) {
    realTimeSearchList.innerHTML = "";
    items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${Object.values(item)[0]}`;
      realTimeSearchList.appendChild(listItem);
    });
  }

  updateRealTimeSearch();
  setInterval(updateRealTimeSearch, 1800000); // Refresh every 30 minutes
});

// scroll
document.addEventListener("DOMContentLoaded", function () {
  const hashContent = document.querySelector("#main_nav");

  // 이 부분에서 실제 스크롤 가능한 너비를 계산해야 합니다.
  let listScrollWidth = hashContent.scrollWidth - hashContent.clientWidth;

  let startX = 0;
  let transform = 0;

  hashContent.style.transition = "transform 0.1s ease";

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onScrollStart = (e) => {
    startX = getClientX(e);
    transform = getTranslateX();

    document.addEventListener("touchmove", onScrollMove, { passive: false });
    document.addEventListener("mousemove", onScrollMove, { passive: false });
    document.addEventListener("touchend", onScrollEnd);
    document.addEventListener("mouseup", onScrollEnd);
  };

  const onScrollMove = (e) => {
    const currentX = getClientX(e);
    const diffX = currentX - startX;
    const newPosition = transform + diffX;

    // newPosition의 경계를 체크하여 올바른 범위 내에서만 스크롤되도록 합니다.
    if (newPosition < 0 && newPosition > -listScrollWidth) {
      hashContent.style.transform = `translateX(${newPosition}px)`;
    }
    e.preventDefault();
  };

  const onScrollEnd = () => {
    document.removeEventListener("touchmove", onScrollMove, { passive: false });
    document.removeEventListener("mousemove", onScrollMove, { passive: false });
    document.removeEventListener("touchend", onScrollEnd);
    document.removeEventListener("mouseup", onScrollEnd);

    snapToBounds();
  };

  const getTranslateX = () => {
    const style = window.getComputedStyle(hashContent).transform;
    return parseInt(style.split(",")[4] || 0);
  };

  const snapToBounds = () => {
    const currentPosition = getTranslateX();
    let adjustedPosition = currentPosition;

    if (currentPosition > 0) {
      adjustedPosition = 0;
    } else if (Math.abs(currentPosition) > listScrollWidth) {
      adjustedPosition = -listScrollWidth;
    }

    hashContent.style.transform = `translateX(${adjustedPosition}px)`;
  };

  hashContent.addEventListener("touchstart", onScrollStart, { passive: false });
  hashContent.addEventListener("mousedown", onScrollStart, { passive: false });
});

// 이미지 검색
document.addEventListener("DOMContentLoaded", function () {
  const cameraIcon = document.querySelector(".camera");
  const dropZone = document.getElementById("dropZone");
  const modal = document.getElementById("modal"); // Ensure you have this element in your HTML
  const overlay = document.getElementById("overlay"); // Ensure you have this element in your HTML

  // Handle camera icon click to show drop zone and modal overlay
  cameraIcon.addEventListener("click", function () {
    modal.style.display = "block"; // Shows the modal if it's separate from the dropZone
    overlay.style.display = "block"; // Shows an overlay if used
    dropZone.style.display = "block"; // Make sure dropZone is visible
  });

  // Assuming closeModal and overlay are meant to hide the modal and drop zone
  document.getElementById("closeModal").addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
    dropZone.style.display = "none"; // Also hide dropZone here
  });

  // Setup for image drag-and-drop
  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault(); // Prevent default to allow drop
  });

  dropZone.addEventListener("drop", function (event) {
    event.preventDefault(); // Prevent default to handle the file
    handleImageUpload(event.dataTransfer.files[0]); // Process the dropped file
  });

  // Function to handle image upload
  function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      dropZone.innerHTML = ""; // Clear the drop zone
      dropZone.appendChild(img); // Add the image to the drop zone
    };
    reader.readAsDataURL(file); // Read the file as Data URL
  }
});

// 모바일 메뉴 active클래스 추가 코드
document.addEventListener("DOMContentLoaded", function () {
  // main_nav 내의 모든 li 요소를 선택
  const navItems = document.querySelectorAll("#main_nav > li");

  // 각 li 요소에 클릭 이벤트 리스너를 추가
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      // 이전에 active 클래스가 적용된 요소에서 active 클래스 제거
      const currentActive = document.querySelector("#main_nav .active");
      if (currentActive) {
        currentActive.classList.remove("active");
      }

      // 클릭된 요소에 active 클래스 추가
      this.classList.add("active");
    });
  });
});

// 서브 네비 스크롤 시 없애는 코드
// document.addEventListener("DOMContentLoaded", function () {
//   var lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수
//   var headerNav = document.querySelector(".header-nav"); // header-nav 요소 선택

//   window.addEventListener("scroll", function () {
//     var scrollTop = window.pageYOffset || document.documentElement.scrollTop; // 현재 스크롤 위치

//     if (scrollTop > lastScrollTop) {
//       // 아래로 스크롤할 경우
//       headerNav.style.opacity = Math.max(0, headerNav.style.opacity - 0.1);
//       if (headerNav.style.opacity <= 0) {
//         headerNav.style.display = "none";
//       }
//     } else {
//       // 위로 스크롤할 경우
//       headerNav.style.display = "block";
//       headerNav.style.opacity = Math.min(
//         1,
//         parseFloat(headerNav.style.opacity) + 0.1
//       );
//     }
//     lastScrollTop = scrollTop; // 스크롤 위치 업데이트
//   });
// });

let lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수
let headerNav = document.querySelector(".header-nav"); // header-nav 요소 선택

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY; // 현재 스크롤 위치

  if (scrollTop > lastScrollTop) {
    // 아래로 스크롤할 경우
    headerNav.style.opacity = Math.max(0, headerNav.style.opacity - 0.1);
    if (headerNav.style.opacity <= 0) {
      headerNav.style.display = "none";
    }
  } else {
    // 위로 스크롤할 경우
    headerNav.style.display = "block";
    headerNav.style.opacity = Math.min(
      1,
      parseFloat(headerNav.style.opacity) + 0.1
    );
  }
  lastScrollTop = scrollTop; // 스크롤 위치 업데이트
});
