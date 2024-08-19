// 수량 조절을 위한 코드
const prodQuantNs = document.querySelectorAll(".prodQuantN");
let origQuantN;

// Loop through each prodQuantN to set up individual event listeners
prodQuantNs.forEach((prodQuantN) => {

  // number에 클릭해서 직접 값을 주는 코드
  prodQuantN.addEventListener("focus", function () {
    origQuantN = this.value;
  });

  prodQuantN.addEventListener("blur", function () {
    if (this.value < 1 || this.value > 999 || this.value % 1 !== 0) {
      this.value = origQuantN;
    }
  });

  prodQuantN.addEventListener("keydown", function (e) {
    const pressedKey = e.charCode || e.keyCode;
    const ctrlPressed = e.ctrlKey || e.metaKey;
    const necessaryKeys =
      pressedKey === 8 || // backspace
      pressedKey === 46 || // delete
      (pressedKey >= 37 && pressedKey <= 40); // arrow keys

    const preventOther =
      !ctrlPressed && !necessaryKeys && (pressedKey < 48 || pressedKey > 57); // not a number

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
});

// Infinite increment/decrement control variables
let intervId;
let timeOut;

// Function to clear the buttons (stops the infinite increment/decrement)
function clearButtons() {
  clearTimeout(timeOut);
  clearInterval(intervId);
}

// Loop through each minusN button and set up event listeners
const minusBs = document.querySelectorAll(".minusN");
minusBs.forEach((minusB, i) => {
  const prodQuantN = prodQuantNs[i];
  
  minusB.addEventListener("mousedown", () => {
    if (Number(prodQuantN.value) > 1) {
      prodQuantN.value = Number(prodQuantN.value) - 1;
      timeOut = setTimeout(() => {
        intervId = setInterval(() => infiniteMinus(prodQuantN), 100);
      }, 200);
    }
  });

  function infiniteMinus(prodQuantN) {
    let currentValue = Number(prodQuantN.value);
    if (currentValue > 1) {
      prodQuantN.value = currentValue - 1;
    }
  }

  minusB.addEventListener("mouseup", clearButtons);
  minusB.addEventListener("mouseout", clearButtons);
});

// Loop through each plusN button and set up event listeners
const plusBs = document.querySelectorAll(".plusN");
plusBs.forEach((plusB, i) => {
  const prodQuantN = prodQuantNs[i];

  plusB.addEventListener("mousedown", () => {
    if (Number(prodQuantN.value) < 999) {
      prodQuantN.value = Number(prodQuantN.value) + 1;
      timeOut = setTimeout(() => {
        intervId = setInterval(() => infinitePlus(prodQuantN), 100);
      }, 200);
    }
  });

  function infinitePlus(prodQuantN) {
    let currentValue = Number(prodQuantN.value);
    if (currentValue < 999) {
      prodQuantN.value = currentValue + 1;
    }
  }

  plusB.addEventListener("mouseup", clearButtons);
  plusB.addEventListener("mouseout", clearButtons);
});
