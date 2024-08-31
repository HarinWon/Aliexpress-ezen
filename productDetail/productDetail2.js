let allProducts = [];

// 페이지 로드 시 JSON 파일을 불러오는 함수
async function loadProducts() {
  try {
    const response = await fetch("./db.json");
    const products = await response.json();
    allProducts = products;
    renderProducts(allProducts); // 초기 로드 시 모든 제품 표시
    addSortingListeners(); // 정렬 버튼에 이벤트 리스너 추가
    addFilterListeners(); // 필터 버튼에 이벤트 리스너 추가
  } catch (error) {
    console.error("제품 데이터를 불러오는 중 오류 발생:", error);
  }
}

// 제품을 화면에 표시하는 함수
function renderProducts(products) {
  const productList = document.querySelector(".ulElements");
  productList.innerHTML = ""; // 기존 제품 리스트 초기화

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `
      <a href="#none">
        <div class="contentImg">
          <img src="${product.image_path}" alt="${product.product_name}" />
        </div>
        <div class="contentTitle foryouTitle">
          <h3>${product.brand}</h3>
          <p>${product.product_name}</p>
        </div>
        <div class="contentPrice">
          <span>
            <strong>${product.discount}</strong>
            <b>${parseInt(product.price.replace(/[^0-9]/g, "")).toLocaleString(
              "ko-KR"
            )}원</b>
            <del>${parseInt(
              product.original_price.replace(/[^0-9]/g, "")
            ).toLocaleString("ko-KR")}원</del>
          </span>
          <span>
            <p>${product.delivery}</p>
            <p>${product.delivery_date}</p>
          </span>
          <span><b>*****</b>${product.ratings}</span>
        </div>
      </a>
    `;
    productList.appendChild(productItem);
  });
}

// 정렬 버튼에 이벤트 리스너를 추가하는 함수
function addSortingListeners() {
  const buttons = document.querySelectorAll(".titleBtn .btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((btn) => btn.classList.remove("active")); // 모든 버튼에서 active 클래스 제거
      e.target.classList.add("active"); // 클릭된 버튼에만 active 클래스 추가

      let sortedProducts = [];
      switch (e.target.id) {
        case "lowPriceLabel":
          sortedProducts = [...allProducts].sort(
            (a, b) =>
              parseInt(a.price.replace(/[^0-9]/g, "")) -
              parseInt(b.price.replace(/[^0-9]/g, ""))
          );
          break;
        case "highPriceLabel":
          sortedProducts = [...allProducts].sort(
            (a, b) =>
              parseInt(b.price.replace(/[^0-9]/g, "")) -
              parseInt(a.price.replace(/[^0-9]/g, ""))
          );
          break;
        case "mostReviewsLabel":
          sortedProducts = [...allProducts].sort(
            (a, b) => parseInt(b.ratings) - parseInt(a.ratings)
          );
          break;
        case "highRatingLabel":
        case "lowRatingLabel":
          sortedProducts = [...allProducts].sort(() => 0.5 - Math.random());
          break;
      }
      renderProducts(sortedProducts);
    });
  });
}

// 가격 범위를 업데이트하고 상품을 필터링하는 함수
function updatePriceRange() {
  const slider = document.getElementById("priceSlider");
  const priceRange = document.getElementById("priceRange");
  const currentValue = parseInt(slider.value);

  priceRange.textContent = `가격범위 0원~${currentValue.toLocaleString()}원`;

  updateFilters(); // 필터 적용
}

// 필터링 조건에 따라 제품을 필터링하는 함수
function updateFilters() {
  const maxPrice = parseInt(document.getElementById("priceSlider").value);
  const selectedCountry = document.querySelector(
    'input[name="country"]:checked'
  ).value;
  const selectedMethods = Array.from(
    document.querySelectorAll('input[name="method"]:checked')
  ).map((cb) => cb.value);

  const filteredProducts = allProducts.filter((product) => {
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""));

    // 가격 필터링
    if (numericPrice > maxPrice) {
      return false;
    }

    // 발송 국가 필터링
    if (selectedCountry !== "all" && product.shippingType !== selectedCountry) {
      return false;
    }

    // 배송 방법 필터링
    if (
      selectedMethods.length > 0 &&
      !selectedMethods.includes(product.shippingMethod)
    ) {
      return false;
    }

    return true;
  });

  renderProducts(filteredProducts);
}

// 필터 버튼에 이벤트 리스너를 추가하는 함수
function addFilterListeners() {
  document
    .getElementById("priceSlider")
    .addEventListener("input", updatePriceRange);
  document.querySelectorAll('input[name="country"]').forEach((radio) => {
    radio.addEventListener("change", updateFilters);
  });
  document.querySelectorAll('input[name="method"]').forEach((checkbox) => {
    checkbox.addEventListener("change", updateFilters);
  });
}

// 페이지 로드 시 JSON 파일을 불러옴
document.addEventListener("DOMContentLoaded", loadProducts);

// mobile-filter

document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".filterBtn");
  const sliderContainer = document.querySelector(".slider-container");
  const body = document.querySelector("body");

  filterBtn.addEventListener("click", function () {
    sliderContainer.classList.add("filter");

    // 배경을 어둡게 하고 스크롤 막기
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    body.style.overflow = "hidden"; // 스크롤 막기

    // 오버레이 클릭 시 필터 닫기
    overlay.addEventListener("click", function () {
      sliderContainer.classList.remove("filter");
      document.body.removeChild(overlay);
      body.style.overflow = ""; // 스크롤 해제
    });
  });
});

// mobile-filter-scroll
document.addEventListener("DOMContentLoaded", function () {
  const titleRight = document.querySelector(".titleRight");

  let isDown = false;
  let startX;
  let scrollLeft;

  // 마우스 다운 이벤트
  titleRight.addEventListener("mousedown", (e) => {
    isDown = true;
    titleRight.classList.add("active");
    startX = e.pageX - titleRight.offsetLeft;
    scrollLeft = titleRight.scrollLeft;
  });

  // 마우스가 떠날 때
  titleRight.addEventListener("mouseleave", () => {
    isDown = false;
    titleRight.classList.remove("active");
  });

  // 마우스 업 이벤트
  titleRight.addEventListener("mouseup", () => {
    isDown = false;
    titleRight.classList.remove("active");
  });

  // 마우스 무브 이벤트
  titleRight.addEventListener("mousemove", (e) => {
    if (!isDown) return; // 클릭하지 않았으면 종료
    e.preventDefault();
    const x = e.pageX - titleRight.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    titleRight.scrollLeft = scrollLeft - walk;
  });
});

// Assuming you have a class 'product-item' on each product element
document.querySelectorAll(".product-item").forEach((item) => {
  item.addEventListener("click", function () {
    const productId = this.getAttribute("data-id"); // Assuming you have a data-id attribute on each product item
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "productDetail.html"; // Redirect to the detail page
  });
});

// 제품상세 연결
$(document).ready(function () {
  $(".ulElements").on("click", "li", function () {
    const productId = $(this).data("id"); // 클릭한 제품의 ID 가져오기
    window.location.href = `productDetail.html?id=${productId}`; // 제품 ID를 URL의 쿼리 파라미터로 전달하며 페이지 이동
  });
});

// 제품 리스트를 렌더링할 때, 각 항목에 data-id를 추가해야 합니다.
function renderProducts(products) {
  const productList = document.querySelector(".ulElements");
  productList.innerHTML = ""; // 기존 제품 리스트 초기화

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.setAttribute("data-id", product.id); // 제품 ID 설정
    productItem.innerHTML = `
          <a href="#none">
              <div class="contentImg">
                  <img src="${product.image_path}" alt="${
      product.product_name
    }" />
              </div>
              <div class="contentTitle foryouTitle">
                  <h3>${product.brand}</h3>
                  <p>${product.product_name}</p>
              </div>
              <div class="contentPrice">
                  <span>
                      <strong>${product.discount}</strong>
                      <b>${parseInt(
                        product.price.replace(/[^0-9]/g, "")
                      ).toLocaleString("ko-KR")}원</b>
                      <del>${parseInt(
                        product.original_price.replace(/[^0-9]/g, "")
                      ).toLocaleString("ko-KR")}원</del>
                  </span>
                  <span>
                      <p>${product.delivery}</p>
                      <p>${product.delivery_date}</p>
                  </span>
                  <span><b>*****</b>${product.ratings}</span>
              </div>
          </a>
      `;
    productList.appendChild(productItem);
  });
}

// filter scroll
const titleBtnContainer = document.querySelector(".titleBtnContainer");
const titleBtn = document.querySelector(".titleBtn");

let startX = 0;
let scrollLeft = 0;
let isDragging = false;

// 터치 및 마우스 이벤트에서 X 좌표를 가져오는 함수
const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

// 드래그 시작 시 호출되는 함수
const onDragStart = (e) => {
  isDragging = true;
  startX = getClientX(e) - titleBtn.offsetLeft; // 시작 위치
  scrollLeft = titleBtn.scrollLeft; // 초기 스크롤 위치 저장
  titleBtn.classList.add("dragging");

  // 드래그 이벤트 추가
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("touchmove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener("touchend", onDragEnd);
};

// 드래그 중 호출되는 함수
const onDragMove = (e) => {
  if (!isDragging) return; // 드래그 중이 아니면 종료
  const x = getClientX(e) - startX; // 현재 위치에서 시작 위치를 뺀 값
  titleBtn.style.transform = `translateX(${x}px)`;
};

// 드래그 종료 시 호출되는 함수
const onDragEnd = () => {
  isDragging = false;
  titleBtn.classList.remove("dragging");

  // 이벤트 해제
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("touchmove", onDragMove);
  document.removeEventListener("mouseup", onDragEnd);
  document.removeEventListener("touchend", onDragEnd);

  // 이동 범위 제한 및 제자리 돌아오기
  const maxScroll = Math.max(titleBtn.scrollWidth - titleBtnContainer.clientWidth, 0);
  const currentTranslateX = parseInt(titleBtn.style.transform.split(/[^\-0-9]+/g)[1]) || 0;

  if (currentTranslateX > 0) {
    titleBtn.style.transform = `translateX(0px)`; // 왼쪽으로 벗어날 경우
  } else if (Math.abs(currentTranslateX) > maxScroll) {
    titleBtn.style.transform = `translateX(-${maxScroll}px)`; // 오른쪽으로 벗어날 경우
  }
};

// 이벤트 리스너 추가
titleBtn.addEventListener("mousedown", onDragStart);
titleBtn.addEventListener("touchstart", onDragStart);
