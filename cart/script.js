// 수량 조절을 위한 코드
const prodQuantNs = document.querySelectorAll(".prodQuantN");
let origQuantN;

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

// 버튼들이 제 역할을 하도록 해주는 코드
// Infinite increment/decrement
let intervId;
let timeOut;

// Function to clear the the infinite increment/decrement
function clearButtons() {
  clearTimeout(timeOut);
  clearInterval(intervId);
}

const minusBs = document.querySelectorAll(".minusB");
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

const plusBs = document.querySelectorAll(".plusB");
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

//모바일 상세가격 아코디언 효과
// const accordionContent = document.querySelectorAll(".accordion");
// const accordionOpen = document.querySelectorAll(".accordOpen");
// // console.log(accordionOpen);
// accordionOpen.forEach((openBtn) => {
//   openBtn.addEventListener("click", () => {
//     //버튼 안 보이게 할 거면 //openBtn.style.display = "none";

//     let openContainer = openBtn.parentElement.parentElement.parentElement;
//     let content = openContainer.previousElementSibling;
//     let accordClose = content.querySelector(".accordClose").addEventListener("click");

//     content.style.display = "flex";

//     if(accordClose){
//         openBtn.classList.remove("active");
//     }

//   });
// });
// 상점 상세가격
const accordionOpen = document.querySelectorAll(".accordOpen");
accordionOpen.forEach((openBtn) => {
  openBtn.addEventListener("click", () => {
    let openContainer = openBtn.parentElement.parentElement.parentElement;
    let content = openContainer.previousElementSibling;
    content.classList.add("active");
    // content.style.display = "flex";
    const accordClose = content.querySelector(".accordClose");
    accordClose.addEventListener("click", () => {
      // content.style.display = "none";
      content.classList.remove("active");
      openBtn.style.display = "inline-block";
    });
    // const accordCloseFoot = content
    openBtn.style.display = "none";
  });
});
// 전체 상세가격
const accordionOpenF = document.querySelector(".accordOpenF");
accordionOpenF.addEventListener("click", () => {
  let contentF = accordionOpenF.parentElement.previousElementSibling;
  // console.log(contentF);
  // contentF.style.display = "block";
  if (accordionOpenF.classList.contains("active")) {
    accordionOpenF.classList.remove("active");
    contentF.classList.remove("active");
    // contentF.style.display = "none";
    // contentF.style.height = "0px";
  } else {
    accordionOpenF.classList.add("active");
    contentF.classList.add("active");
    // contentF.style.height = "114px";
    // contentF.style.display = "block";
    // contentF.style.height = fit-content;
  }
  // const payDetail = document.querySelector(".payDetail");
  // const height = 140;
  // console.log(payDetail);
  // if (payDetail.style.height === "0px") {
  //   payDetail.style.height = `${height}px`;
  // } else {
  //   payDetail.style.height = "0px";
  // }
  const accordCloseF = contentF.querySelector(".accordCloseF");
  accordCloseF.addEventListener("click", () => {
    accordionOpenF.classList.remove("active");
    contentF.classList.remove("active");
    // contentF.style.height = "0px";
    // contentF.style.display = "none";
  });
});

// 체크박스를 하나로 묶어서 한번에 켰다 껐다 하게해주는 함수들

// 데스크톱과 모바일의 상품체크박스 연결 sync desktop and mob checkboxes
document.querySelectorAll(".prodBlock").forEach(function (prodBlock) {
  const prodCheck = prodBlock.querySelector(".prodCheck");
  const prodMobCheck =
    prodBlock.nextElementSibling.querySelector(".prodMobCheck");
  prodCheck.addEventListener("change", function () {
    prodMobCheck.checked = prodCheck.checked;
  });
  prodMobCheck.addEventListener("change", function () {
    prodCheck.checked = prodMobCheck.checked;
  });
});

// 상점 전체선택 storeCheck
const storeChecks = document.querySelectorAll(".storeCheck");
// 상점 전체선택을 눌렀을 때 상품들이 전부 체크됨
storeChecks.forEach((storeCheck) => {
  const prodchecks =
    storeCheck.parentElement.parentElement.nextElementSibling.querySelectorAll(
      ".prodMobCheck, .prodCheck"
    );
  storeCheck.addEventListener("change", function () {
    prodchecks.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
  });
  // 상품의 checkbox가 unchecked 되면 상점전체선택도 해제됨
  // 모든 상품의 checkbox가 체크되면 상점전체선택도 체크됨
  prodchecks.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(prodchecks).every(
        (checkbox) => checkbox.checked
      );
      const anyUnchecked = Array.from(prodchecks).some(
        (checkbox) => !checkbox.checked
      );
      if (allChecked) {
        storeCheck.checked = true;
      } else if (anyUnchecked) {
        storeCheck.checked = false;
      }
    });
  });
});
// 전체선택 SelectAll
// 전체선택을 눌렀을 때 모든 checkbox들이 체크됨
// const selectAll = document.getElementById("#selectAllTxt");
// const selectAll = document.querySelector('input[type="checkbox"]');
// selectAll.addEventListener("click", function(selectAll) {
//   const checkboxes = document.querySelectorAll(".storeCheck, .prodMobCheck, .prodCheck");
//   checkboxes.forEach((checkbox) => {
//     // checkbox.checked = selectAll.checked;
//     selectAll.checked = checkbox.checked;
//   });
// });

const selectAll = document.querySelector('input[type="checkbox"]');

selectAll.addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(
    ".storeCheck, .prodMobCheck, .prodCheck"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
    // 상품의 checkbox가 unchecked 되면 상점전체선택도 해제됨
    // 모든 상품의 checkbox가 체크되면 상점전체선택도 체크됨
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );
      const anyUnchecked = Array.from(checkboxes).some(
        (checkbox) => !checkbox.checked
      );
      if (allChecked) {
        selectAll.checked = true;
      } else if (anyUnchecked) {
        selectAll.checked = false;
      }
    });
  });
});
// const selectAll = document.getElementById("#selectAllTxt");
// const selectAll = document.querySelector('input[type="checkbox"]');
// selectAll.addEventListener('click', function() {
//   const checkboxes = document.querySelectorAll(".storeCheck , .prodMobCheck, .prodCheck");
//   if (selectAll.checked) {
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = true;
//     });
//   } else {
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = false;
//     });
//   }
// });

// 가격 계산
function calculateTotal() {
  document.querySelectorAll(".storeBlock").forEach(function (storeBlock) {
    // 상점 기본금액&할인금액 //storeOrigPrice & storeDiscount
    let storeOrigPrTotal = 0;
    let storeDiscTotal = 0;
    storeBlock.querySelectorAll(".prodBlock").forEach(function (prodBlock) {
      const prodCheck = prodBlock.querySelector(".prodCheck");
      if (prodCheck.checked) {
        const prodFinaPrice = prodBlock.querySelector(".prodFinaPrice");
        const prodOrigPrice = prodBlock.querySelector(".prodOrigPrice");
        if (prodOrigPrice) {
          let origPrice = parseFloat(
            prodOrigPrice.textContent.replace(/[,원]/g, "")
          );
          let finaPrice = parseFloat(
            prodFinaPrice.textContent.replace(/[,원]/g, "")
          );
          storeOrigPrTotal += origPrice;
          storeDiscTotal += origPrice - finaPrice;
        } else if (prodFinaPrice) {
          let finaPrice = parseFloat(
            prodFinaPrice.textContent.replace(/[,원]/g, "")
          );
          storeOrigPrTotal += finaPrice;
        }
      }
    });
    storeBlock
      .querySelectorAll(".storeOrigPrice")
      .forEach(function (storeOrigPrice) {
        storeOrigPrice.textContent = storeOrigPrTotal.toLocaleString() + "원";
      });
    storeBlock
      .querySelectorAll(".storeDiscount")
      .forEach(function (storeDiscount) {
        storeDiscount.textContent = storeDiscTotal.toLocaleString() + "원";
      });
    // 상점 총액 storePrice
    let storePriceTotal = 0;
    storeBlock.querySelectorAll(".storeCalc").forEach(function (storeCalc) {
      const storeOrigPrice = parseFloat(
        storeCalc
          .querySelector(".storeOrigPrice")
          .textContent.replace(/[,원]/g, "")
      );
      const storeShipFee = parseFloat(
        storeCalc
          .querySelector(".storeShipFee")
          .textContent.replace(/[,원]/g, "")
      );
      const storeDiscount = parseFloat(
        storeCalc
          .querySelector(".storeDiscount")
          .textContent.replace(/[,원]/g, "")
      );
      storePriceTotal = storeOrigPrice + storeShipFee - storeDiscount;
      // console.log(storePriceTotal);
    });
    storeBlock.querySelectorAll(".storePrice").forEach(function (storePrice) {
      storePrice.textContent = storePriceTotal.toLocaleString() + "원";
    });
  });
}
// 체크박스를 클릭했을 떄 계산이 진행되도록 해주는 함수
document
  .querySelectorAll(".prodCheck, .prodMobCheck, .storeCheck , .selectAllCheck")
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", calculateTotal);
  });
calculateTotal();
// 결제정보
// 총상품수
const prodBlocks = document.querySelectorAll(".prodBlock").length;
document.querySelectorAll("totalProdQuant").forEach(function (tPQ) {
  tPQ.textContent = prodBlocks + "개";
});
// console.log('Number of .prodBlock elements:', prodBlockCount);
// 총상품금액
const storeOrigPrices = document.querySelectorAll(".storeOrigPrice");
let totalSum = 0;
storeOrigPrices.forEach(function (e) {
  const priceText = e.textContent.replace(/[,원]/g, "");
  const priceValue = parseInt(priceText, 10);
  totalSum += priceValue / 2;
  document.querySelectorAll(".totalOrigPrice").forEach(function (tOP) {
    tOP.textContent = totalSum.toLocaleString() + "원";
  });
});

// 총배송비
const totalShipFee = document.querySelectorAll("storeOrigPrice").value;
// 총할인금액
// 결제예정금액
// 적립예정포인트

// document.querySelectorAll(".storeBlock").forEach(function (storeBlock) {
//   let storePriceTotal = 0;
// });
