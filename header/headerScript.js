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

// 이미지 인식 코드
const dropZone = document.getElementById("dropZone");
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  handleImageUpload(event.dataTransfer.files[0]);
});

dropZone.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();
  fileInput.onchange = () => {
    handleImageUpload(fileInput.files[0]);
  };
});

function handleImageUpload(file) {
  const uploadedFileName = file.name.toLowerCase().slice(0, 3); // 파일명의 앞 3글자 추출 및 소문자로 변환
  searchSimilarFiles(uploadedFileName);
}

function searchSimilarFiles(uploadedFileNamePrefix) {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      const matchedProducts = findMatchingProductsByFilename(
        uploadedFileNamePrefix,
        data.data
      );
      displayResults(matchedProducts);
    });
}

function findMatchingProductsByFilename(uploadedFileNamePrefix, products) {
  return products.filter((product) => {
    const productFileNamePrefix = product.img
      .split("/")
      .pop()
      .toLowerCase()
      .slice(0, 3);
    return productFileNamePrefix === uploadedFileNamePrefix;
  });
}

function displayResults(products) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // 기존 결과 지우기

  if (products.length === 0) {
    resultContainer.innerHTML = "<p>비슷한 상품이 없습니다.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
              <h4>${product.name}</h4>
              <img src="${product.img}" alt="${product.name}">
              <p>가격: ${product.price}원</p>
              <p>카테고리: ${product.category}</p>
          `;
    resultContainer.appendChild(productElement);
  });
}

// 카메라 클릭시 인식 화면 보이게 하는 코드
const camera = document.querySelector(".camera");

camera.addEventListener("click", () => {
  dropZone.classList.toggle("click");
});

// 실시간 검색어 관련 함수
const realTimeTxt = document.querySelector(".real-time-result-txt");
const realTimeResult = document.querySelector(".real-time-result");

realTimeTxt.addEventListener("mouseover", () => {
  realTimeResult.classList.add("timeHover");
});

realTimeTxt.addEventListener("mouseout", () => {
  realTimeResult.classList.remove("timeHover");
});

document.addEventListener("DOMContentLoaded", function () {
  // realTime.json에서 데이터를 가져옴
  fetch('realTime.json')
      .then(response => response.json())
      .then(data => {
          const realTimeResult = document.querySelector('.real-time-result');
          const currentHour = new Date().getHours();
          let timeOfDay;

          // 현재 시간에 따라 timeOfDay 설정
          if (currentHour >= 6 && currentHour < 12) {
              timeOfDay = 'morning';
          } else if (currentHour >= 12 && currentHour < 18) {
              timeOfDay = 'afternoon';
          } else {
              timeOfDay = 'evening';
          }

          // li 태그들을 지우고, 새로운 li 태그로 실시간 검색어 목록을 채움
          realTimeResult.innerHTML = ''; // 기존 목록 제거
          data[timeOfDay].forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = `${Object.keys(item)[0]}. ${Object.values(item)[0]}`;
              realTimeResult.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching real-time data:', error));
});
