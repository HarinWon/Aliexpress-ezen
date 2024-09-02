$(document).ready(function () {
  // JSON 데이터 로드
  $.getJSON("/db.json", function (data) {
    const randomItems = shuffleArray(data).slice(0, 6); // JSON 데이터에서 6개 항목 선택
    randomItems.forEach(function (item) {
      const productHtml = `
          <div>
            <div class="productImg">
              <img src="${item.image_path}" alt="${item.product_name}"/>
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
            <span><b>${item.reviews}</b>${item.ratings}판매</span>
          </div>
        `;
      $(".product-slider").slick("slickAdd", productHtml); // 슬라이더에 상품 추가
    });
  });

  // 배열 셔플 함수
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // slick 슬라이더 초기화
  $(".product-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// 로그인 연결
const userIdElement = document.querySelector("#userId");
document.addEventListener("DOMContentLoaded", function () {
  const keys = Object.keys(localStorage);

  if (keys.length > 0) {
    let userId;

    if (localStorage.getItem("registeredUsers") === null) userId = [];
    else userId = JSON.parse(localStorage.getItem("registeredUsers"));

    if (userId.length > 0) {
      const lastValue = userId[userId.length - 1];
      const user = lastValue.split("@")[0];

      userIdElement.innerText = `${user} 님`;
    }
  }
});
// 헤더 로그인사이트진입
userIdElement.addEventListener("click", () => {
  window.location.href = "../login/login.html";
});
