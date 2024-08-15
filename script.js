//mainVideo
const mainVideo = document.querySelector("#mainVideo");
const arrows = document.querySelectorAll(".arrow");
const mainArrows = document.querySelectorAll(".mainArrow");
const videos = ["aliExpressMainVideo1.mp4", "aliExpressMainVideo2.mp4"];

mainVideo.innerHTML = `<video width="100%" height="100%" src="./img/${videos[0]}" autoplay muted loop></video>`;

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

    srcVideo.src = `./img/${videos[i]}`;

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
    if (scrollY > 200) {
      item.classList.add("activeScroll");
    } else {
      item.classList.remove("activeScroll");
    }
  });
});

//weeklyCountdown
const weeklyTime = document.querySelector(".weeklyTime");

const targetDate = new Date("2024-09-27T00:00:00");

const countdown = () => {
  const current = new Date();
  const diff = targetDate - current;

  if (diff <= 0) {
    weeklyTime.innerHTML = "00:00:00";
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

//weekly slide

//자동 슬라이드 기능

//마우스 오버하면 멈추기
//트리거도 함께 움직이기

// const weeklyTrigger = document.querySelector("#triggerBar");
// const weeklySlides = document.querySelector(".weeklyContent ul");
// const weeklySlide = document.querySelectorAll(".weeklyContent li");

// const slideCount = weeklySlide.length;
// const slideWidth = 350;
// const slideMargin = 50;

// let currentIdx = 0;

// const updateWidth = () => {
//   const newWidth = `${(slideWidth + slideMargin) * slideCount - slideMargin}px`;
//   weeklySlides.computedStyleMap.width = newWidth;
// };

// const setInitialPos = () => {
//   const translateValue = -(slideWidth + slideMargin) * slideCount;
//   weeklySlides.computedStyleMap.transform = `translateX(${translateValue}px)`;
// };

// const makeClone = () => {
//   for (let i = 0; i < slideCount; i++) {
//     const cloneSlide = weeklySlide[i].cloneNode(true);
//     cloneSlide.classList.add("clone");
//     weeklySlides.appendChild(cloneSlide);
//   }
//   updateWidth();
//   setInitialPos();
//   setTimeout(() => {
//     slides.classList.add("animated");
//   }, 1000);
// };
// makeClone();

// const moveSlide = (num) => {
//   weeklySlides.style.left = `${-num * (slideWidth + slideMargin)}px`;
//   currentIdx = num;
//   if (currentIdx === slideCount || currentIdx === -slideCount) {
//     setTimeout(() => {
//       weeklySlides.classList.remove("animated");
//       weeklySlides.style.left = "0px";
//       currentIdx = 0;
//     }, 500);
//     setTimeout(() => {
//       weeklySlides.classList.add("animated");
//     }, 600);
//   }
//   // console.log(currentIdx, slideCount);
// };

//foryou
const form = document.querySelector("form");
const foryouBtn = form.querySelectorAll(".btn");

foryouBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    //1.active가 있는지 확인
    const isActive = btn.classList.contains("active");
    foryouBtn.forEach((b) => b.classList.remove("active"));
    //2.있다면 삭제
    //3.클릭했을 때 active없으면 add 있으면 remove
    if (isActive) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
});
