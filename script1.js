// 수량 조절을 위한 코드
const prodQuantN = document.querySelector(".prodQuantN");
let origQuantN = prodQuantN.value;

// // number에 클릭해서 직접 값을 주는 코드
prodQuantN.onfocus = function () {
  origQuantN = this.value;
};
prodQuantN.onblur = function () {
  if (this.value < 1 || this.value > 999) {
    this.value = origQuantN;
  } else if (this.value % 1 !== 0) {
    this.value = origQuantN;
  }
};

prodQuantN.addEventListener("keydown", function (e) {
  const pressedKey = e.charCode || e.keyCode;
  const ctrlPressed = e.ctrlKey || e.metaKey;
  const necessaryKeys =
    pressedKey === 8 ||
    pressedKey === 46 ||
    (pressedKey >= 37 && pressedKey <= 40);
  const preventOther =
    !ctrlPressed && ((!necessaryKeys && pressedKey < 48) || pressedKey > 57);
  // if (preventOther && this.value.length >= 3) {
  if (preventOther) {
    e.preventDefault();
  }
  if (e.key === "Enter") {
    this.blur();
  }
});

prodQuantN.addEventListener("input", function () {
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
});

// // button을 누를 때 수량에 변화를 주는 코드
let intervId;
let timeOut;

function clearButtons() {
  clearTimeout(timeOut);
  clearInterval(intervId);
}


const minusN = document.querySelector(".minusN");
minusN.addEventListener("mousedown", () => {
  if (Number(prodQuantN.value) < 999) {
    prodQuantN.value = Number(prodQuantN.value) - 1;
    timeOut = setTimeout(() => {
      intervId = setInterval(infinitePlus, 100);
    }, 200);
  }
});
function infinitePlus() {
  let currentValue = Number(prodQuantN.value);
  if (currentValue < 999) {
    prodQuantN.value = currentValue - 1;
  }
}
minusN.addEventListener("mouseup", clearButtons);
minusN.addEventListener("mouseout", clearButtons);


// const minusN = document.querySelectorAll(".minusN");
// minusN.forEach((item) => {
//   item.addEventListener("mousedown", () => {
//     if (Number(prodQuantN.value) > 1) {
//       prodQuantN.value = Number(prodQuantN.value) - 1;
//       timeOut = setTimeout(() => {
//         intervId = setInterval(infiniteMinus, 100);
//       }, 200);
//     }
//   });
//   function infiniteMinus() {
//     let currentValue = Number(prodQuantN.value);
//     if (currentValue > 1) {
//       prodQuantN.value = currentValue - 1;
//     }
//   }
//   item.addEventListener("mouseup", clearButtons);
//   item.addEventListener("mouseout", clearButtons);
// });

// const minusBs = document.querySelectorAll(".minusN");
// minusBs.forEach((minusB, i) => {
//   const prodQuantN = prodQuantNs[i];
//   minusB.addEventListener("mousedown", () => {
//     if (Number(prodQuantN.value) > 1) {
//       prodQuantN.value = Number(prodQuantN.value) - 1;
//       timeOut = setTimeout(() => {
//         intervId = setInterval(() => infiniteMinus(prodQuantN), 100);
//       }, 200);
//     }
//   });

//   function infiniteMinus(prodQuantN) {
//     let currentValue = Number(prodQuantN.value);
//     if (currentValue > 1) {
//       prodQuantN.value = currentValue - 1;
//     }
//   }

//   minusB.addEventListener("mouseup", clearButtons);
//   minusB.addEventListener("mouseout", clearButtons);
// });

const plusN = document.querySelector(".plusN");
plusN.addEventListener("mousedown", () => {
  if (Number(prodQuantN.value) < 999) {
    prodQuantN.value = Number(prodQuantN.value) + 1;
    timeOut = setTimeout(() => {
      intervId = setInterval(infinitePlus, 100);
    }, 200);
  }
});
function infinitePlus() {
  let currentValue = Number(prodQuantN.value);
  if (currentValue < 999) {
    prodQuantN.value = currentValue + 1;
  }
}
plusN.addEventListener("mouseup", clearButtons);
plusN.addEventListener("mouseout", clearButtons);
