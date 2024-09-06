let allProducts = [];

// 페이지 로드 시 JSON 파일을 불러오는 함수
function loadProducts() {
  fetch("db.json")
    .then((response) => response.json())
    .then((products) => {
      allProducts = products;
      updatePriceRange(); // 초기 로드 시 모든 상품 표시
    })
    .catch((error) => console.error("Error loading products:", error));
}

// 가격 범위를 업데이트하고 상품을 필터링하는 함수
function updatePriceRange() {
  const slider = document.getElementById("priceSlider");
  const priceRange = document.getElementById("priceRange");
  const currentValue = parseInt(slider.value);

  priceRange.textContent = `가격범위 0원~${currentValue.toLocaleString()}원`;

  filterProducts(currentValue);
}

// 가격에 따라 상품을 필터링하는 함수
function filterProducts(maxPrice) {
  const filteredProducts = allProducts.filter((product) => {
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""));
    return numericPrice <= maxPrice;
  });

  displayProducts(filteredProducts);
}

// 필터링된 상품들을 화면에 표시하는 함수
function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>선택한 가격 범위 내의 상품이 없습니다.</p>";
    return;
  }

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
            <img src="${product.image_path}" alt="${product.product_name}">
            <div>
                <h3>${product.product_name}</h3>
                <p>브랜드: ${product.brand}</p>
                <p>가격: ${product.price} <span style="text-decoration: line-through;">${product.original_price}</span></p>
                <p>${product.delivery} (${product.delivery_date})</p>
                <p>평점: ${product.ratings}</p>
            </div>
        `;
    productList.appendChild(productItem);
  });
}

// 페이지 로드 시 JSON 파일을 불러옴
window.onload = loadProducts;
