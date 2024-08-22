//mainVideo
const mainVideo = document.querySelector("#mainVideo");
const arrows = document.querySelectorAll(".arrow");
const mainArrows = document.querySelectorAll(".mainArrow");
const videos = ["aliExpressMainVideo1.mp4", "aliExpressMainVideo2.mp4"];

mainVideo.innerHTML = `<video width="100%" height="100%" src="./dbimg/${videos[0]}" autoplay muted loop></video>`;

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
  let scrollY = window.scrollY;
  const info = document.querySelectorAll("#infoContainer ul li");
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

fetch("./db.json")
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
        // 새로운 ulElements 생성
        const ulElement = document.createElement("ul");
        ulElement.className = "ulElements";
        ulElement.style.display = "flex";
        ulElement.style.flexWrap = "wrap";
        // JSON 데이터를 이용해 li 태그 생성 및 추가
        selectedButton.forEach((item) => {
          const liElement = document.createElement("li");
          // 제품 정보를 포함하는 HTML 구조를 생성
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
          ulElement.appendChild(liElement); // li 태그를 ulElement에 추가
        });
        // 생성된 ulElements를 foryouContent에 추가
        foryouContent.appendChild(ulElement);
      });
    });
    document.querySelector(".btn.active")?.click();

    const digital = document.querySelector("#digital");
    const categoryContent = document.querySelector(".categoryContent");

    let categoryJson;
    categoryJson.forEach((item) => {
      const productHTML = `
        <ul>
          <li>
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
           </li>
        </ul>
        `;
      categoryContent.insertAdjacentHTML("beforeend", productHTML);
    });
  });

//category Scroll Event
const categories = document.querySelectorAll(".category");
const gnbItems = document.querySelectorAll(".Desk ul li a");

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
      gnbItems.forEach((item) => item.classList.remove("active"));
      categories.forEach((item) => item.classList.remove("active"));
      gnbItems[index].classList.add("active");
      categories[index].classList.add("active");
    }
  });
});
