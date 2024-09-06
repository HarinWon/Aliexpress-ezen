document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tabs button");

  // 탭 버튼 클릭 시 active 클래스 추가 및 스크롤 이동
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

      // 장바구니에 제품을 로컬스토리지에 추가하는 기능
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
          })
          .catch((error) => {
            console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
          });
      } else {
        alert("제품 ID가 제공되지 않았습니다.");
      }
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

  // 로컬스토리지에 제품 저장
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

  // 장바구니 추가 버튼 클릭 시 로직
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
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        });
    } else {
      alert("제품 ID가 제공되지 않았습니다.");
    }
  });

  // 페이지 로드 시 제품 정보 불러오기
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

          // 수량 증가/감소 버튼 동작
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
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      });
  } else {
    alert("제품 ID가 제공되지 않았습니다.");
  }
});
