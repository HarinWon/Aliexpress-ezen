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

//weeklySlideDesktop
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

// 슬라이드 복제
slides.forEach((slide) => {
  let cloneSlide = slide.cloneNode(true);
  slideWrapper.appendChild(cloneSlide);
});

// 슬라이드 너비 계산
const updateSlideWidth = () => {
  const totalWidth = (slideWidth + slideMargin) * totalSlides;
  slideWrapper.style.width = `${totalWidth}px`;
};
updateSlideWidth();

// 슬라이드 이동 함수
function moveToSlide(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1;
    slideWrapper.style.transition = "none";
    slideWrapper.style.transform = `translateX(-${
      currentIndex * (slideWidth + slideMargin)
    }px)`;
  } else if (index >= totalSlides) {
    currentIndex = 0;
    slideWrapper.style.transition = "none";
    slideWrapper.style.transform = `translateX(0)`;
  } else {
    currentIndex = index;
  }

  setTimeout(() => {
    slideWrapper.style.transition = "transform 0.5s ease-in-out";
    slideWrapper.style.transform = `translateX(-${
      currentIndex * (slideWidth + slideMargin)
    }px)`;
  }, 0);

  updateTrigger();
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
  slideInterval = setInterval(moveToNextSlide, 3000);
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

function applyResponsiveSettings() {
  const tabletQuery = window.matchMedia("(max-width: 768px)");
  const mobileQuery = window.matchMedia("(max-width: 430px)");

  if (mobileQuery.matches) {
    slideWidth = 300;
    slideMargin = 70;
  } else if (tabletQuery.matches) {
    slideWidth = 210;
    slideMargin = 18;
  } else {
    slideWidth = 350;
    slideMargin = 50;
  }

  updateSlideWidth();

  // 슬라이드 위치 재조정
  slideWrapper.style.transform = `translateX(-${
    currentIndex * (slideWidth + slideMargin)
  }px)`;
}

applyResponsiveSettings();
window.addEventListener("resize", applyResponsiveSettings);

// 슬라이드 시작
startSlide();

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

//foryou json + category json
const foryouContent = document.querySelector(".foryoucontent");

fetch("/db.json")
  .then((response) => response.json())
  .then((data) => {
    foryouBtn.forEach((button) => {
      button.addEventListener("click", () => {
        let selectedButton;
        if (button.id === "view") {
          selectedButton = data.filter(
            (item) => item.id >= "AP-0001" && item.id <= "AP-0006"
          );
        } else if (button.id === "cart") {
          selectedButton = data.filter(
            (item) => item.id >= "CP-0001" && item.id <= "CP-0006"
          );
        } else if (button.id === "buy") {
          selectedButton = data.filter(
            (item) => item.id >= "PT-0001" && item.id <= "PT-0006"
          );
        }
        // 기존 콘텐츠 제거
        foryouContent.innerHTML = "";

        const ulElement = document.createElement("ul");
        ulElement.className = "ulElements";
        ulElement.style.display = "flex";
        ulElement.style.flexWrap = "wrap";

        selectedButton.forEach((item) => {
          const liElement = document.createElement("li");

          liElement.innerHTML = `
            <a href="#none">
              <div class="contentImg">
                <img src="${item.image_path}" alt="${item.product_name}" style="width:340px; height:220px;" />
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
                <span><b>*****</b>${item.ratings} 판매</span>
              </div>
            </a>
          `;
          ulElement.appendChild(liElement);
        });

        foryouContent.appendChild(ulElement);
      });
    });
    document.querySelector(".btn.active").click();

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
                <span><b>*****</b>${item.ratings} 판매</span>
              </div>
            </a>
          </li>
          
      `;
        createUl.insertAdjacentHTML("beforeend", productHTML);
      }
    });
  });

//category Touch Event
const categoryGnb = document.querySelector(".Tablet ul");
const gnbClientWidth = categoryGnb.clientWidth;
const gnbScrollWidth = categoryGnb.scrollWidth;

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

  categories.forEach((category, index) => {
    const categoryRect = category.getBoundingClientRect();

    const categoryTop = window.scrollY + categoryRect.top;
    const categoryHeight = category.offsetHeight;

    const offset = 130;

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
    }
    if (scrollY > 5100) {
      document.querySelector(".TabletBtnBox").style.display = "block";
    } else {
      document.querySelector(".TabletBtnBox").style.display = "none";
    }
  });
});

const tablet = document.querySelector(".Tablet");
const tabletBtnBox = document.querySelector(".TabletBtnBox");

tabletBtnBox.addEventListener("click", () => {
  tablet.classList.toggle("on");
  tabletBtnBox.classList.toggle("on");
});
