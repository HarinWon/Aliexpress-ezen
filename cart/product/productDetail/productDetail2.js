// 탭 버튼 클릭 시 active 클래스 추가 및 스크롤 이동
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tabs button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // 기본 링크 동작 방지
      tabButtons.forEach((btn) => btn.classList.remove("active")); // 모든 탭에서 active 클래스 제거
      this.classList.add("active"); // 클릭된 탭에 active 클래스 추가

      // 클릭한 탭에 해당하는 컨텐츠로 스크롤 이동
      const target = this.querySelector("a").getAttribute("href");
      const targetElement = document.querySelector(target);
      const targetPosition =
        targetElement.offsetTop - document.querySelector(".tabs").offsetHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // 스크롤에 따른 탭 활성화 처리
  window.addEventListener("scroll", function () {
    const scrollDistance = window.scrollY;
    const sections = document.querySelectorAll(
      ".tab-content, .review-container, .delivery_information"
    );

    sections.forEach((section, i) => {
      if (
        section.offsetTop <=
        scrollDistance + document.querySelector(".tabs").offsetHeight
      ) {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabButtons[i].classList.add("active");
      }
    });
  });
});

// slider & json
document.addEventListener("DOMContentLoaded", function () {
  // Load JSON data
  fetch("/db.json")
    .then((response) => response.json())
    .then((data) => {
      const randomItems = shuffleArray(data).slice(0, 6);

      // Loop through the selected items and append them to the slider
      randomItems.forEach(function (item) {
        const productHtml = `
          <div>
            <div class="productImg">
            <img src="${item.image_path}" alt="${item.product_name}" />
            </div>
            <h3>${item.brand}</h3>
            <p>${item.product_name}</p>
            <span>
              <strong>${item.discount}</strong>
              <b>${item.price}</b>
              <del>${item.original_price}</del>
            </span>
            <span>
              <p>${item.delivery}</p>
              <p>${item.delivery_date}</p>
            </span>
            <span><b>*****</b>${item.ratings}개 판매</span>
          </div>
        `;
        document
          .querySelector(".product-slider")
          .insertAdjacentHTML("beforeend", productHtml);
      });

      // Initialize the slick slider
      new Slick(".product-slider", {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
    });

  // Function to shuffle an array (Fisher-Yates shuffle algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});

// cart-option
const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sizeOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
  });
});

// cart-mobile
const mobileBuyBtns = document.querySelectorAll(
  ".mobile-cart-btn, .mobile-buy-btn"
);
const mobileCartBtn = document.querySelector(".buy-nav-cart");
const mainElement = document.querySelector("main");
const bodyElement = document.body;

mobileBuyBtns.forEach((button) => {
  button.addEventListener("click", () => {
    bodyElement.classList.add("cart-active");
    mobileCartBtn.classList.add("cart");
  });
});

mainElement.addEventListener("click", () => {
  bodyElement.classList.remove("cart-active");
  mobileCartBtn.classList.remove("cart");
});

document.querySelector(".overlay").addEventListener("click", () => {
  bodyElement.classList.remove("cart-active");
  mobileCartBtn.classList.remove("cart");
});

document.addEventListener("DOMContentLoaded", function () {
  function saveProductToLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem("cartAli")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].cart += parseInt(
        document.querySelector(".quantity-selector input").value,
        10
      );
    } else {
      cart.push({
        id: product.id,
        brand: product.brand,
        product_name: product.product_name,
        price: product.price,
        original_price: product.original_price,
        delivery: product.delivery,
        image_path: product.image_path,
        shippingType: product.shippingType,
        shippingMethod: product.shippingMethod,
        cart: parseInt(
          document.querySelector(".quantity-selector input").value,
          10
        ),
      });
    }

    localStorage.setItem("cartAli", JSON.stringify(cart));
  }

  document.querySelector(".btn-cart").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      fetch("db.json")
        .then((response) => response.json())
        .then((data) => {
          const product = data.find((item) => item.id === productId);

          if (product) {
            saveProductToLocalStorage(product);
            alert("장바구니에 추가되었습니다.");
          } else {
            alert("제품 정보를 찾을 수 없습니다.");
          }
        });
    } else {
      alert("제품 ID가 제공되지 않았습니다.");
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.find((item) => item.id === productId);

        if (product) {
          document.querySelector(".product-info h2").textContent =
            product.brand;
          document.querySelector(".product-info h1").textContent =
            product.product_name;
          document.querySelector(".product-info .price").textContent =
            product.price;
          document.querySelector(".product-info .badge").textContent =
            product.shippingMethod;
          document.querySelector(".product-info .delivery").textContent =
            product.shippingType;
          document.querySelector(".product-info .final-price").textContent =
            product.price;
          document.querySelector(".product-summary p").textContent =
            product.product_name;
          document.querySelector(".product-info-mobile .price").textContent =
            product.price;
          document.querySelector(".product-info-mobile .delivery").textContent =
            product.shippingType;
          document.querySelector(".product-info-mobile .badge").textContent =
            product.shippingMethod;
          document.querySelector(".product-info-mobile h1").textContent =
            product.product_name;
          document.querySelector(".product-info-mobile h2").textContent =
            product.brand;
          document.querySelector(".product-images .main-image img").src =
            product.image_path;

          let originalPrice = parseInt(product.price.replace(/,/g, ""), 10);
          let finalPrice = originalPrice;

          document
            .querySelector(".increment")
            .addEventListener("click", function () {
              const quantityInput = document.querySelector(
                ".quantity-selector input"
              );
              let quantity = parseInt(quantityInput.value, 10);
              quantityInput.value = quantity + 1;
              finalPrice = originalPrice * (quantity + 1);
              updateFinalPrice(finalPrice);
            });

          document
            .querySelector(".decrement")
            .addEventListener("click", function () {
              const quantityInput = document.querySelector(
                ".quantity-selector input"
              );
              let quantity = parseInt(quantityInput.value, 10);
              if (quantity > 1) {
                quantityInput.value = quantity - 1;
                finalPrice = originalPrice * (quantity - 1);
                updateFinalPrice(finalPrice);
              }
            });

          function updateFinalPrice(price) {
            document.querySelector(
              ".product-info .final-price"
            ).textContent = `${price.toLocaleString()}원`;
          }

          if (product["Detailed-image"]) {
            const detailedImageHtml = `
              <div class="detailed-image">
                <img src="${product["Detailed-image"]}" alt="Detailed view of ${product.product_name}">
              </div>
            `;
            document
              .querySelector(".tab-content")
              .insertAdjacentHTML("beforeend", detailedImageHtml);
          }
        } else {
          alert("제품 정보를 찾을 수 없습니다.");
        }
      });
  } else {
    alert("제품 ID가 제공되지 않았습니다.");
  }
});
