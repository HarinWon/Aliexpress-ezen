// slide
$(".product-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 430, // 430px 이하에서 적용
      settings: {
        slidesToShow: 2, // slidesToShow 값을 2로 변경
      },
    },
  ],
});

// button scroll & tab
$(document).ready(function () {
  // 탭 버튼 클릭 시 active 클래스 추가 및 스크롤 이동
  $(".tabs button").on("click", function (event) {
    event.preventDefault(); // 기본 링크 동작 방지
    $(".tabs button").removeClass("active"); // 모든 탭에서 active 클래스 제거
    $(this).addClass("active"); // 클릭된 탭에 active 클래스 추가

    // 클릭한 탭에 해당하는 컨텐츠로 스크롤 이동
    const target = $(this).find("a").attr("href");
    const targetPosition = $(target).offset().top - $(".tabs").outerHeight();

    $("html, body").animate(
      {
        scrollTop: targetPosition,
      },
      500
    );
  });

  // 스크롤에 따른 탭 활성화 처리
  $(window).on("scroll", function () {
    const scrollDistance = $(window).scrollTop();

    // 각 섹션에 대해
    $(".tab-content, .review-container, .delivery_information").each(function (
      i
    ) {
      if ($(this).position().top <= scrollDistance + $(".tabs").outerHeight()) {
        $(".tabs button").removeClass("active"); // 모든 탭에서 active 클래스 제거
        $(".tabs button").eq(i).addClass("active"); // 현재 섹션에 해당하는 탭에 active 클래스 추가
      }
    });
  });
});

// slider & json
$(document).ready(function () {
  // Load JSON data
  $.getJSON("/db.json", function (data) {
    // Shuffle and select 6 random items from the JSON data
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
      $(".product-slider").slick("slickAdd", productHtml);
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

  // Initialize the slick slider
  $(".product-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
const bodyElement = document.querySelector("body");

mobileBuyBtns.forEach((button) => {
  button.addEventListener("click", () => {
    bodyElement.classList.add("cart-active");
    mobileCartBtn.classList.add("cart");
  });
});

// main 영역 클릭 시 cart 클래스 및 오버레이 제거
mainElement.addEventListener("click", () => {
  bodyElement.classList.remove("cart-active");
  mobileCartBtn.classList.remove("cart");
});

document.querySelector(".overlay").addEventListener("click", () => {
  bodyElement.classList.remove("cart-active");
  mobileCartBtn.classList.remove("cart");
});

$(document).ready(function () {
  // 제품 정보를 로컬 스토리지에 저장하는 함수
  function saveProductToLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem("cartAli")) || [];

    // 기존에 같은 제품이 장바구니에 있는지 확인
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      // 제품이 이미 장바구니에 있는 경우 수량만 업데이트
      cart[existingProductIndex].cart += parseInt(
        $(".quantity-selector input").val(),
        10
      );
    } else {
      // 제품이 장바구니에 없는 경우 새로 추가
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
        cart: parseInt($(".quantity-selector input").val(), 10),
      });
    }

    localStorage.setItem("cartAli", JSON.stringify(cart));
  }

  // 장바구니 버튼 클릭 이벤트 처리
  $(".btn-cart").on("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      $.getJSON("db.json", function (data) {
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

  // 제품 상세 정보를 로드하는 부분
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    $.getJSON("db.json", function (data) {
      const product = data.find((item) => item.id === productId);

      if (product) {
        // 제품 정보를 페이지에 표시
        $(".product-info h2").text(product.brand);
        $(".product-info h1").text(product.product_name);
        $(".product-info .price").text(product.price);
        $(".product-info .badge").text(product.shippingMethod);
        $(".product-info .delivery").text(product.shippingType);
        $(".product-info .final-price").text(product.price);
        $(".product-summary p").text(product.product_name);
        $(".product-info-mobile .price").text(product.price);
        $(".product-info-mobile .delivery").text(product.shippingType);
        $(".product-info-mobile .badge").text(product.shippingMethod);
        $(".product-info-mobile h1").text(product.product_name);
        $(".product-info-mobile h2").text(product.brand);
        $(".product-images .main-image img").attr("src", product.image_path);

        // 가격을 숫자로 변환
        let originalPrice = parseInt(product.price.replace(/,/g, ""), 10);
        let finalPrice = originalPrice;

        // 이전 이벤트 리스너 제거
        // $(".increment").off("click");
        // $(".decrement").off("click");

        // increment 버튼 클릭 이벤트
        $(".increment").on("click", function () {
          const quantityInput = $(".quantity-selector input");
          let quantity = parseInt(quantityInput.val(), 10);
          quantityInput.val(quantity + 1);
          finalPrice = originalPrice * (quantity + 1);
          updateFinalPrice(finalPrice);
        });

        // decrement 버튼 클릭 이벤트
        $(".decrement").on("click", function () {
          const quantityInput = $(".quantity-selector input");
          let quantity = parseInt(quantityInput.val(), 10);
          if (quantity > 1) {
            quantityInput.val(quantity - 1);
            finalPrice = originalPrice * (quantity - 1);
            updateFinalPrice(finalPrice);
          }
        });

        // final-price 업데이트 함수
        function updateFinalPrice(price) {
          $(".product-info .final-price").text(`${price.toLocaleString()}원`);
        }

        if (product["Detailed-image"]) {
          const detailedImageHtml = `
            <div class="detailed-image">
              <img src="${product["Detailed-image"]}" alt="Detailed view of ${product.product_name}">
            </div>
          `;
          $(".tab-content").append(detailedImageHtml);
        }
      } else {
        alert("제품 정보를 찾을 수 없습니다.");
      }
    });
  } else {
    alert("제품 ID가 제공되지 않았습니다.");
  }
});
