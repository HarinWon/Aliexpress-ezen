let timeLeft = 300;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.querySelector("#timer").innerText = `${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.querySelector("#timer").innerText = "00:00";
    alert("시간이 만료되었습니다.");
  } else {
    timeLeft--;
  }
}

let timerInterval = setInterval(updateTimer, 1000);
