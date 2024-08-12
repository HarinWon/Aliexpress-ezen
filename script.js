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
