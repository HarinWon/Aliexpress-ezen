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
    addCategoryListeners(); // 카테고리 버튼에 이벤트 리스너 추가
  } catch (error) {
    console.error("제품 데이터를 불러오는 중 오류 발생:", error);
  }
}

// 카테고리 버튼에 이벤트 리스너를 추가하는 함수
function addCategoryListeners() {
  const categoryLinks = document.querySelectorAll(".categoryGnb ul li a");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 클릭 이벤트 막기

      // 모든 링크에서 active 클래스 제거
      categoryLinks.forEach((link) => link.classList.remove("active"));

      // 클릭된 링크에 active 클래스 추가
      this.classList.add("active");

      // 클릭된 카테고리의 텍스트 가져오기
      const category = this.querySelector("p").textContent.trim();

      // 카테고리와 일치하는 제품 필터링
      const filteredProducts = allProducts.filter(
        (product) => product["Product-classification"] === category
      );

      renderProducts(filteredProducts); // 필터링된 제품만 표시
    });
  });
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

      if (e.target.id === "lowPriceLabel") {
        const sortedProducts = [...allProducts].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
        );
        renderProducts(sortedProducts);
      } else if (e.target.id === "highPriceLabel") {
        const sortedProducts = [...allProducts].sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
        );
        renderProducts(sortedProducts);
      } else if (e.target.id === "mostReviewsLabel") {
        const sortedProducts = [...allProducts].sort(
          (a, b) => parseInt(b.ratings) - parseInt(a.ratings)
        );
        renderProducts(sortedProducts);
      } else if (e.target.id === "highRatingLabel") {
        const shuffledProducts = [...allProducts].sort(
          () => 0.5 - Math.random()
        );
        renderProducts(shuffledProducts);
      } else if (e.target.id === "lowRatingLabel") {
        const shuffledProducts = [...allProducts].sort(
          () => 0.5 - Math.random()
        );
        renderProducts(shuffledProducts);
      }
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
