//mainVideo
const mainVideo = document.querySelector("#mainVideo");
const arrows = document.querySelectorAll(".arrow");
const mainArrows = document.querySelectorAll(".mainArrow");
const videos = ["aliExpressMainVideo1.mp4", "aliExpressMainVideo2.mp4"];

mainVideo.innerHTML = `<video src="./dbimg/${videos[0]}" autoplay muted loop></video>`;

const srcVideo = document.querySelector("video");

let i = 0;
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (e.target.id === "right") {
      i++;
      if (i >= videos.length) {
        i = 0;
      }
    } else if (e.target.id === "left") {
      i--;
      if (i < 0) {
        i = videos.length - 1;
      }
    }

    srcVideo.src = `./dbimg/${videos[i]}`;

    if (i === 0) {
      arrows[0].classList.add("action");
      arrows[1].classList.remove("action");
      mainArrows[0].classList.add("action");
      mainArrows[1].classList.remove("action");
    } else if (i === 1) {
      arrows[0].classList.remove("action");
      arrows[1].classList.add("action");
      mainArrows[0].classList.remove("action");
      mainArrows[1].classList.add("action");
    }
  });
});

//infoScroll
window.addEventListener("scroll", () => {
  const info = document.querySelectorAll("#infoContainer ul li");
  let scrollY = window.scrollY;

  info.forEach((item) => {
    if (scrollY > 250) {
      item.classList.add("activeScroll");
    } else {
      item.classList.remove("activeScroll");
    }
  });
});

//Coupon Slick Slider

$(".myslider").slick({
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 2,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1170,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

//weeklyCountdown
const weeklyTime = document.querySelector(".weeklyTime");
const targetDate = new Date("2024-09-27T00:00:00"); // 기준 날짜 설정

const countdown = () => {
  const current = new Date();
  const diff = targetDate - current; // 현재 시간과 기준 시간 차이 계산

  if (diff <= 0) {
    weeklyTime.innerHTML = "00:00:00"; // 카운트다운이 끝났을 때
    return;
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const format = (unit) => (unit < 10 ? `0${unit}` : unit);

  weeklyTime.innerHTML = `
        <span>${format(hours)}</span><span>:</span>
        <span>${format(minutes)}</span><span>:</span>
        <span>${format(seconds)}</span>
    `;
};

setInterval(countdown);

// JSON 데이터 로드 함수
function loadJSON() {
  return fetch("/db.json")
    .then((response) => response.json())
    .catch((error) => console.error("JSON 로드 오류:", error));
}

// 로컬 스토리지 관리 함수
function initLocalStorage() {
  const cartInfo = JSON.parse(localStorage.getItem("cartAli")) || [];
  return cartInfo;
}
function saveToLocalStorage(cartContArr) {
  localStorage.setItem("cartAli", JSON.stringify(cartContArr));
}

// welcomeConts
function welcomeConts(data) {
  const welcomeElement = document.querySelector(".welcomeContentRight");

  if (!welcomeElement) {
    console.error("welcomeContentRight 요소를 찾을 수 없습니다.");
    return;
  }

  // ul 요소가 없으면 생성합니다.
  let createUl = welcomeElement.querySelector("ul");
  if (!createUl) {
    createUl = document.createElement("ul");
    welcomeElement.appendChild(createUl);
  }

  // "AA-0001"부터 "AA-0004"까지의 항목만 필터링
  const filteredData = data.filter(
    (item) => item.id >= "AA-0001" && item.id <= "AA-0004"
  );

  filteredData.forEach((item) => {
    const productHTML = `
      <li>
        <a href="#none">
          <div class="contentImg">
            <img src="${item.image_path}" alt="${item.product_name}" />
            <div class="icon">
              <i class="fa-solid fa-heart"></i>
              <a href="/cart/index.html">
                <img data-productid="${item.id}" src="./dbImg/icon/cart.png" alt="cart" />
              </a>
            </div>
          </div>
          <div class="contentTitle foryouTitle">
            <h3>${item.brand}</h3>
            <p>${item.product_name}</p>
          </div>
          <div class="contentPrice">
            <span>
              <strong>${item.discount}</strong>
              <b>${item.price}</b>
              <del>${item.original_price}</del>
            </span>
            <span>
              <p>${item.delivery}</p>
              <p>${item.delivery_date}</p>
            </span>
            <span><b>${item.reviews}</b>${item.ratings}</span>
          </div>
        </a>
      </li>
    `;
    createUl.insertAdjacentHTML("beforeend", productHTML);
  });
}

//weeklyConts
function weeklyContent(data) {
  const weeklyContentElement = document.querySelector(".weeklyContent ul");

  if (!weeklyContentElement) {
    console.error("weeklyContent 요소를 찾을 수 없습니다.");
    return;
  }

  // 특정 ID에 해당하는 데이터를 필터링하여 표시
  const targetIds = [
    "WK-0001",
    "WK-0002",
    "WK-0003",
    "WK-0004",
    "WK-0005",
    "WK-0006",
  ];
  const filteredData = data.filter((item) => targetIds.includes(item.id));

  // 기존 슬라이드 내용 초기화
  weeklyContentElement.innerHTML = "";

  filteredData.forEach((item) => {
    const productHTML = `
      <li>
        <a href="#none">
          <div class="contentImg">
            <img src="${item.image_path}" alt="${item.product_name}" />
            <div class="sale">${item.discount}</div>
            <div class="icon">
              <i class="fa-solid fa-heart"></i>
              <a href="/cart/index.html">
                <img
                  data-productid="${item.id}"
                  src="./dbImg/icon/cart.png"
                  alt="cart"
                />
              </a>
            </div>
          </div>
          <div class="contentTitle">
            <h3>${item.brand}</h3>
            <p>${item.product_name}</p>
          </div>
          <div class="contentPrice">
            <span>
              <strong>${item.discount}</strong>
              <b>${item.price}</b>
              <del>${item.original_price}</del>
            </span>
            <span>
              <p>${item.delivery}</p>
              <p>${item.delivery_date}</p>
            </span>
            <span><b>${item.reviews}</b>${item.ratings} 판매</span>
          </div>
        </a>
      </li>
    `;

    weeklyContentElement.insertAdjacentHTML("beforeend", productHTML);
  });

  initializeSlide(); // 슬라이드 초기화 함수 호출
}
// 슬라이드를 초기화하는 함수
function initializeSlide() {
  const slideWrapper = document.querySelector(".weeklyContent ul");
  const slides = document.querySelectorAll(".weeklyContent li");
  const totalSlides = slides.length;
  const triggerBar = document.querySelector("#triggerBar");
  const triggerItems = 6;
  let currentIndex = 0;
  let slideInterval;
  let isPaused = false;

  let slideWidth = 350;
  let slideMargin = 50;

  // 슬라이드 복제 - 앞에 마지막 슬라이드 복제, 뒤에 첫 슬라이드 복제
  const firstSlide = slides[0];
  const lastSlide = slides[totalSlides - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);

  slideWrapper.appendChild(cloneFirst);
  slideWrapper.insertBefore(cloneLast, firstSlide);

  // 슬라이드 너비 계산 및 초기 위치 설정
  const updateSlideWidth = () => {
    const totalWidth = (slideWidth + slideMargin) * (totalSlides + 2); // 복제된 슬라이드 2개 포함
    slideWrapper.style.width = `${totalWidth}px`;
    slideWrapper.style.transform = `translateX(-${slideWidth + slideMargin}px)`; // 첫 번째 슬라이드로 이동
  };
  updateSlideWidth();

  // 슬라이드 이동 함수
  function moveToSlide(index) {
    slideWrapper.style.transition = "transform 0.5s ease-in-out";
    slideWrapper.style.transform = `translateX(-${
      (index + 1) * (slideWidth + slideMargin)
    }px)`;

    // 현재 슬라이드 인덱스를 업데이트
    currentIndex = index;

    // 마지막 슬라이드에서 첫 슬라이드로 자연스럽게 전환
    if (index === totalSlides) {
      setTimeout(() => {
        slideWrapper.style.transition = "none";
        slideWrapper.style.transform = `translateX(-${
          slideWidth + slideMargin
        }px)`;
        currentIndex = 0;
        updateTrigger(); // 트리거 위치 업데이트
      }, 500); // 트랜지션 지속 시간 (0.5초)과 일치시킴
    }

    // 첫 슬라이드에서 마지막 슬라이드로 자연스럽게 전환
    else if (index === -1) {
      setTimeout(() => {
        slideWrapper.style.transition = "none";
        slideWrapper.style.transform = `translateX(-${
          totalSlides * (slideWidth + slideMargin)
        }px)`;
        currentIndex = totalSlides - 1;
        updateTrigger(); // 트리거 위치 업데이트
      }, 500); // 트랜지션 지속 시간 (0.5초)과 일치시킴
    } else {
      currentIndex = index;
      updateTrigger(); // 일반적인 슬라이드 이동 시 트리거 위치 업데이트
    }
  }

  // 트리거 업데이트
  function updateTrigger() {
    triggerBar.style.transition = "transform 0.5s ease-in-out";
    triggerBar.style.transform = `translateX(${
      (currentIndex % triggerItems) * 100
    }%)`;
  }

  // 다음 슬라이드로 이동 함수
  function moveToNextSlide() {
    moveToSlide(currentIndex + 1);
  }

  // 자동 슬라이드 함수 시작
  function startSlide() {
    slideInterval = setInterval(moveToNextSlide, 2800);
  }

  // arrow 클릭 이벤트 추가
  const weeklyArrowLeft = document.querySelector(".weeklyArrowLeft");
  const weeklyArrowRight = document.querySelector(".weeklyArrowRight");

  weeklyArrowLeft.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
    clearInterval(slideInterval);
    isPaused = true; // 자동 슬라이드 일시 정지
  });

  weeklyArrowRight.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
    clearInterval(slideInterval);
    isPaused = true; // 자동 슬라이드 일시 정지
  });

  // 마우스 오버시 슬라이드 일시 정지
  slideWrapper.addEventListener("mouseover", () => {
    clearInterval(slideInterval);
    triggerBar.style.transition = "none"; // 트리거 애니메이션 일시 정지
    isPaused = true;
  });

  slideWrapper.addEventListener("mouseout", () => {
    if (!isPaused) startSlide(); // 마우스 아웃시 자동 슬라이드 재개
    triggerBar.style.transition = "transform 0.5s ease-in-out"; // 트리거 애니메이션 재개
    isPaused = false;
  });

  // 슬라이드 시작
  startSlide();
}

// foryouConts
function foryouConts(products, container) {
  container.innerHTML = "";
  const ulElement = document.createElement("ul");
  ulElement.className = "ulElements";
  ulElement.style.display = "flex";
  ulElement.style.flexWrap = "wrap";
  products.forEach((item) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `
      <a href="#none">
        <div class="contentImg">
          <img src="${item.image_path}" alt="${item.product_name}" style="width:340px;" />
          <div class="icon">
            <i class="fa-solid fa-heart"></i>
            <a href="/cart/index.html">
            <img data-productid="${item.id}" src="./dbImg/icon/cart.png" alt="cart" />
            </a>
          </div>
        </div>
        <div class="contentTitle foryouTitle">
          <h3>${item.brand}</h3>
          <p>${item.product_name}</p>
        </div>
        <div class="contentPrice">
          <span>
            <strong>${item.discount}</strong>
            <b>${item.price}</b>
            <del>${item.original_price}</del>
          </span>
          <span>
            <p>${item.delivery}</p>
            <p>${item.delivery_date}</p>
          </span>
          <span><b>${item.reviews}</b>${item.ratings} 판매</span>
        </div>
      </a>
    `;
    ulElement.appendChild(liElement);
  });

  container.appendChild(ulElement);
}

//foryou button
const form = document.querySelector("form");
const foryouBtn = form.querySelectorAll(".btn");

foryouBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isActive = btn.classList.contains("active");
    foryouBtn.forEach((b) => b.classList.remove("active"));
    if (
      !isActive ||
      !Array.from(foryouBtn).some((b) => b.classList.contains("active"))
    ) {
      btn.classList.add("active");
    }
  });
});

// categoryConts
function categoryConts(data) {
  data.forEach((item) => {
    const categoryElement = document.querySelector(`.${item.category}`);
    if (categoryElement) {
      let createUl = categoryElement.querySelector("ul");
      if (!createUl) {
        createUl = document.createElement("ul");
        categoryElement.appendChild(createUl);
      }
      const productHTML = `
        <li>
          <a href="#none">
            <div class="contentImg">
              <img src="${item.image_path}" alt="${item.product_name}" />
              <div class="icon">
                <i class="fa-solid fa-heart"></i>
                <a href="/cart/index.html">
                <img data-productid="${item.id}" src="./dbImg/icon/cart.png" alt="cart" />
                </a>
              </div>
            </div>
            <div class="contentTitle foryouTitle">
              <h3>${item.brand}</h3>
              <p>${item.product_name}</p>
            </div>
            <div class="contentPrice">
              <span>
                <strong>${item.discount}</strong>
                <b>${item.price}</b>
                <del>${item.original_price}</del>
              </span>
              <span>
                <p>${item.delivery}</p>
                <p>${item.delivery_date}</p>
              </span>
              <span><b>${item.reviews}</b>${item.ratings} 판매</span>
            </div>
          </a>
        </li>
      `;
      createUl.insertAdjacentHTML("beforeend", productHTML);
    }
  });
}

// 이벤트 핸들러 설정 함수
function setupEventHandlers(data, cartContArr, save) {
  const foryouBtn = document.querySelectorAll(".btn");
  const foryouContent = document.querySelector(".foryoucontent");

  foryouBtn.forEach((button) => {
    button.addEventListener("click", () => {
      let selectedProducts;
      if (button.id === "view") {
        selectedProducts = data.filter(
          (item) => item.id >= "AP-0001" && item.id <= "AP-0006"
        );
      } else if (button.id === "cart") {
        selectedProducts = data.filter(
          (item) => item.id >= "CP-0001" && item.id <= "CP-0006"
        );
      } else if (button.id === "buy") {
        selectedProducts = data.filter(
          (item) => item.id >= "PT-0001" && item.id <= "PT-0006"
        );
      }

      foryouConts(selectedProducts, foryouContent);
    });
  });

  // 장바구니 아이콘 클릭 핸들러 설정
  document.addEventListener("click", (e) => {
    if (e.target.matches(".icon > a > img")) {
      e.preventDefault();
      const clickItem = e.target.dataset.productid;

      const selectedProduct = data.find((item) => item.id === clickItem);
      if (selectedProduct) {
        cartContArr.push(selectedProduct);
        save(cartContArr);
      }

      const userConfirmed = confirm(
        `상품이 장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?`
      );
      if (userConfirmed) {
        window.location.href = "/cart/index.html";
      }
    }
  });
}

// 초기화 함수
function initialize() {
  const cartContArr = initLocalStorage();
  loadJSON().then((data) => {
    setupEventHandlers(data, cartContArr, saveToLocalStorage);
    categoryConts(data);
    welcomeConts(data);
    weeklyContent(data);
    document.querySelector(".btn.active").click(); // 기본 활성화된 버튼 클릭 트리거
  });
}
initialize();

//category Touch Event
const categoryGnb = document.querySelector(".Tablet ul");
// console.log(categoryGnb);
const gnbClientWidth = categoryGnb.clientWidth;
const gnbScrollWidth = categoryGnb.scrollWidth + categoryGnb.clientWidth / 8;

let firstX = 0;
let secondX = 0;

// 현재 터치나 마우스 이벤트에서 X 좌표를 가져오는 함수
const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

// categoryGnb 요소의 transform 값을 가져오는 함수
const getTranslateX = () =>
  parseInt(getComputedStyle(categoryGnb).transform.split(/[^\-0-9]+/g)[5]) || 0;

// categoryGnb 요소를 X축으로 이동시키는 함수
const setTranslateX = (x) => {
  categoryGnb.style.transform = `translateX(${x}px)`;
  categoryGnb.style.transition = `none`; // 이동 중 애니메이션 없음
};

// 드래그(스크롤) 중에 호출되는 함수
const onScrollMove = (e) => {
  const nowX = getClientX(e);
  setTranslateX(secondX + nowX - firstX); // 현재 위치에서 드래그한 만큼 이동
};

// 스크롤(드래그)이 끝났을 때 호출되는 함수
const onScrollEnd = () => {
  secondX = getTranslateX(); // 현재 이동된 위치 저장

  // 화면 범위를 넘어가면 위치를 조정
  if (secondX > 0) {
    setTranslateX(0); // 왼쪽으로 벗어나면 0으로 설정
  } else if (secondX < gnbClientWidth - gnbScrollWidth) {
    setTranslateX(gnbClientWidth - gnbScrollWidth); // 오른쪽으로 벗어나면 설정
  }

  // 부드럽게 이동하는 효과 추가
  categoryGnb.style.transition = `all 0.1s ease`;

  // 스크롤 관련 리스너 해제
  document.removeEventListener("touchmove", onScrollMove);
  document.removeEventListener("touchend", onScrollEnd);
  document.removeEventListener("mousemove", onScrollMove);
  document.removeEventListener("mouseup", onScrollEnd);
};

// 스크롤(드래그)이 시작될 때 호출되는 함수
const onScrollStart = (e) => {
  firstX = getClientX(e); // 터치/마우스 시작 위치 저장
  secondX = getTranslateX(); // 현재 위치 저장

  // 스크롤 관련 리스너 추가
  document.addEventListener("touchmove", onScrollMove);
  document.addEventListener("touchend", onScrollEnd);
  document.addEventListener("mousemove", onScrollMove);
  document.addEventListener("mouseup", onScrollEnd);
};

// 터치 및 마우스 이벤트 리스너 등록
categoryGnb.addEventListener("touchstart", onScrollStart);
categoryGnb.addEventListener("mousedown", onScrollStart);

//category Scroll Event
const categories = document.querySelectorAll(".category");
const deskgnbItems = document.querySelectorAll(".Desk ul li a");
const tabletgnbItems = document.querySelectorAll(".Tablet ul li a");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let tabletBreakpoint = 768;
  let mobileBreakpoint = 430;

  categories.forEach((category, index) => {
    const categoryRect = category.getBoundingClientRect();
    const categoryTop = window.scrollY + categoryRect.top;
    const categoryHeight = category.offsetHeight;

    const offset = 160;

    if (
      scrollY >= categoryTop - offset &&
      scrollY < categoryTop + categoryHeight - offset
    ) {
      tabletgnbItems.forEach((item) => item.classList.remove("active"));
      deskgnbItems.forEach((item) => item.classList.remove("active"));
      categories.forEach((item) => item.classList.remove("active"));

      tabletgnbItems[index].classList.add("active");
      deskgnbItems[index].classList.add("active");
      categories[index].classList.add("active");

      const maxTranslateX = categoryGnb.scrollWidth - categoryGnb.clientWidth;
      let divideFactor;
      if (window.innerWidth < 768) {
        divideFactor = 70;
      } else {
        divideFactor = 100;
      }

      const translateXValue = Math.min(-scrollY / divideFactor, maxTranslateX);

      categoryGnb.style.transform = `translateX(${translateXValue + 50}px)`;
    }

    // 태블릿 scrollY
    if (window.innerWidth >= tabletBreakpoint) {
      if (scrollY > 5000) {
        document.querySelector(".TabletBtnBox").style.display = "block";
      } else {
        document.querySelector(".TabletBtnBox").style.display = "none";
      }
    }
    // 모바일 scrollY
    else if (window.innerWidth <= mobileBreakpoint) {
      if (scrollY > 4180) {
        document.querySelector(".TabletBtnBox").style.display = "block";
      } else {
        document.querySelector(".TabletBtnBox").style.display = "none";
      }
    }
  });
});

const tablet = document.querySelector(".Tablet");
const tabletBtnBox = document.querySelector(".TabletBtnBox");

tabletBtnBox.addEventListener("click", () => {
  tablet.classList.toggle("on");
  tabletBtnBox.classList.toggle("on");
});

//heart
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-heart")) {
    e.target.classList.toggle("active");
  }
});
