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

// 수량 감소 버튼
const decrementButtons = document.querySelectorAll(".quantity-btn.decrement");
// 수량 증가 버튼
const incrementButtons = document.querySelectorAll(".quantity-btn.increment");

// 각 수량 감소 버튼에 클릭 이벤트 리스너 추가
decrementButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const quantityInput = this.nextElementSibling;
    let currentValue = parseInt(quantityInput.value);

    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
});

// 각 수량 증가 버튼에 클릭 이벤트 리스너 추가
incrementButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const quantityInput = this.previousElementSibling;
    let currentValue = parseInt(quantityInput.value);

    quantityInput.value = currentValue + 1;
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

// 제품상세 정보 로드
$(document).ready(function () {
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
        $(".product-images .main-image img").attr("src", product.image_path);
        // 필요한 다른 정보들도 여기에 추가
      } else {
        alert("제품 정보를 찾을 수 없습니다.");
      }
    });
  } else {
    alert("제품 ID가 제공되지 않았습니다.");
  }
});
