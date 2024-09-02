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

// Select all the quantity input fields and buttons in both prodBlock and prodBlockMob
const prodBlocks = document.querySelectorAll(".prodBlock");
const prodBlockMobs = document.querySelectorAll(".prodBlockMob");

prodBlocks.forEach((prodBlock, index) => {
  const minusB = prodBlock.querySelector(".minusB");
  const plusB = prodBlock.querySelector(".plusB");
  const prodQuantN = prodBlock.querySelector(".prodQuantN");

  const mobMinusB = prodBlockMobs[index].querySelector(".minusB");
  const mobPlusB = prodBlockMobs[index].querySelector(".plusB");
  const mobProdQuantN = prodBlockMobs[index].querySelector(".prodQuantN");

  function syncQuantities(mainInput, syncedInput) {
    syncedInput.value = mainInput.value;
  }

  // Handle minus button
  minusB.addEventListener("mousedown", () => {
    if (Number(prodQuantN.value) > 1) {
      prodQuantN.value = Number(prodQuantN.value) - 1;
      syncQuantities(prodQuantN, mobProdQuantN);
    }
  });

  mobMinusB.addEventListener("mousedown", () => {
    if (Number(mobProdQuantN.value) > 1) {
      mobProdQuantN.value = Number(mobProdQuantN.value) - 1;
      syncQuantities(mobProdQuantN, prodQuantN);
    }
  });

  // Handle plus button
  plusB.addEventListener("mousedown", () => {
    if (Number(prodQuantN.value) < 999) {
      prodQuantN.value = Number(prodQuantN.value) + 1;
      syncQuantities(prodQuantN, mobProdQuantN);
    }
  });

  mobPlusB.addEventListener("mousedown", () => {
    if (Number(mobProdQuantN.value) < 999) {
      mobProdQuantN.value = Number(mobProdQuantN.value) + 1;
      syncQuantities(mobProdQuantN, prodQuantN);
    }
  });

  // Sync on direct input changes
  prodQuantN.addEventListener("input", () => {
    syncQuantities(prodQuantN, mobProdQuantN);
  });

  mobProdQuantN.addEventListener("input", () => {
    syncQuantities(mobProdQuantN, prodQuantN);
  });
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

// 데스크탑과 모바일에 생기는 변화를 연결시키는 영역
// prodBlock
document.querySelectorAll(".prodBlock").forEach(function (prodBlock) {
  // 데스크톱과 모바일의 상품체크박스 연결 sync desktop and mob checkboxes
  const prodCheck = prodBlock.querySelector(".prodCheck");
  const prodMobCheck =
    prodBlock.nextElementSibling.querySelector(".prodMobCheck");
  prodCheck.addEventListener("change", function () {
    prodMobCheck.checked = prodCheck.checked;
  });
  prodMobCheck.addEventListener("change", function () {
    prodCheck.checked = prodMobCheck.checked;
  });
  // 상품하트 연결
  const prodHeart = prodBlock.querySelector(".prodHeart");
  const prodHeartMob =
    prodBlock.nextElementSibling.querySelector(".prodHeartMob");
  prodHeart.addEventListener("change", function () {
    prodHeartMob.checked = prodHeart.checked;
  });
  prodHeartMob.addEventListener("change", function () {
    prodHeart.checked = prodHeartMob.checked;
  });
  // 수량인풋 연결
  // minus
  const minusN = prodBlock.querySelector(".minusB");
  const minusNMob = prodBlock.nextElementSibling.querySelector(".minusB");
  // function syncMinusB(source, target) {
  //   target.click();  // Trigger a click event on the target button
  // }
  // minusN.addEventListener("click", function () {
  //   syncMinusB(minusN, minusNMob);
  // });
  // minusNMob.addEventListener("click", function () {
  //   syncMinusB(minusNMob, minusN);
  // });
  // Number
  const quantN = prodBlock.querySelector("input[type='number']");
  const quantNMob = prodBlock.nextElementSibling.querySelector(
    "input[type='number']"
  );
  minusN.addEventListener("change", function () {
    quantNMob.value = quantN.value;
  });
  minusNMob.addEventListener("change", function () {
    quantN.value = quantNMob.value;
  });
  quantN.addEventListener("change", function () {
    quantNMob.value = quantN.value;
  });
  quantNMob.addEventListener("change", function () {
    quantN.value = quantNMob.value;
  });
});
// storeBlock //상점하트 연결
document.querySelectorAll(".storeL").forEach(function (storeL) {
  const storeHeart = storeL.querySelector(".storeHeart");
  const storeHeartMob = storeL.nextElementSibling.querySelector(".storeHeart");
  storeHeart.addEventListener("change", function () {
    storeHeartMob.checked = storeHeart.checked;
  });
  storeHeartMob.addEventListener("change", function () {
    storeHeart.checked = storeHeartMob.checked;
  });
});


// 체크박스를 하나로 묶어서 한번에 켰다 껐다 하게해주는 함수들
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
const selectAll = document.querySelector("#selectAllTxt");
let checkboxes = document.querySelectorAll(
  ".storeCheck, .prodMobCheck, .prodCheck"
);

  checkboxes.forEach((checkbox) => {
    // 전체선택을 눌렀을 때 모든 checkbox들이 체크됨
  selectAll.addEventListener("change", function () {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });
  });
    // 상품의 checkbox가 unchecked 되면 상점전체선택도 해제됨
    // 모든 상품의 checkbox가 체크되면 상점전체선택도 체크됨
    checkbox.addEventListener("change", function () {
      const allChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );
      selectAll.checked = allChecked;
    });
  });

// function selectAllFunc() {
//   checkboxes.forEach((checkbox) => {
//     // 전체선택을 눌렀을 때 모든 checkbox들이 체크됨
//     selectAll.addEventListener("change", function () {
//       checkbox.checked = selectAll.checked;
//     });
//     // 상품의 checkbox가 unchecked 되면 상점전체선택도 해제됨
//     // 모든 상품의 checkbox가 체크되면 상점전체선택도 체크됨
//     checkbox.addEventListener("change", function () {
//       const allChecked = Array.from(checkboxes).every(
//         (checkbox) => checkbox.checked
//       );
//       selectAll.checked = allChecked;
//     });
//   });
// }
// 전체,해외,국내 구분
const sortAlls = document.querySelectorAll(".sortAll");
const sortFrs = document.querySelectorAll(".sortFr");
const sortLocals = document.querySelectorAll(".sortLc");
const storeBlocks = document.querySelectorAll(".storeBlock");

function selectAllState() {
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAll.checked = allChecked;
  // selectAllFunc();
}


// 전체
sortAlls.forEach((button) => {
  button.addEventListener("click", function () {
    storeBlocks.forEach((block) => {
      block.style.display = "flex";
    });
    checkboxes = document.querySelectorAll(
      ".storeCheck, .prodMobCheck, .prodCheck"
    );
    selectAllState();
  });
});

// 해외
sortFrs.forEach((button) => {
  button.addEventListener("click", function () {
    storeBlocks.forEach((block) => {
      if (block.querySelector(".foreignStore")) {
        block.style.display = "flex";
      } else {
        block.style.display = "none";
      }
    });
    const foreignStore = document.querySelector(".foreignStore");
    const frStoreBlock = foreignStore.parentElement;
    checkboxes = frStoreBlock.querySelectorAll(".storeCheck, .prodCheck, .prodMobCheck")
    selectAllState();
  });
});

// 국내
sortLocals.forEach((button) => {
  button.addEventListener("click", function () {
    storeBlocks.forEach((block) => {
      if (block.querySelector(".localStore")) {
        block.style.display = "flex";
      } else {
        block.style.display = "none";
      }
    });
    const localStore = document.querySelector(".localStore");
    const lcStoreBlock = localStore.parentElement;
    checkboxes = lcStoreBlock.querySelectorAll(".storeCheck, .prodCheck, .prodMobCheck")
    selectAllState();
  });
});



// 가격&수량 계산
// 상점 가격&수량 계산
function storeCalc() {
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
    // 상점별 수량
    let quantN = storeBlock.querySelectorAll(".prodCheck:checked").length;
    console.log(quantN);
    const storeQuant = storeBlock.querySelector(".storeQuant");
    storeQuant.value = quantN.toLocaleString() + "건바로구매";
    const storeQuantMob = storeBlock.querySelector(".storeQuantMob");
    storeQuantMob.value = quantN.toLocaleString() + "건 바로구매";
  });
}
// const storeR = document.querySelectorAll(".storeR");
// const prodBlock =
//   storeR.parentElement.nextElementSibling.querySelectorAll(".prodBlock");
// prodBlock.forEach(function (storeRIn) {
//   const storeQuant = storeRIn.;
// storeRIn.querySelector(
//   ".storeQuant"
// ).value = `${}건바로구매`
// });
// 결제정보
function totalCalc() {
  // 총수량
  // 총상품수 totalProdQuant
  let checkedProd = 0;
  document.querySelectorAll(".prodCheck:checked").forEach(function () {
    checkedProd++;
  });
  document.querySelectorAll(".totalProdQuant").forEach(function (tPQ) {
    tPQ.textContent = checkedProd;
  });
  // 해외상품 수량
  const foreignStores = document.querySelectorAll(".foreignStore");
  foreignStores.forEach(function (foreignStore) {
    const foreignStoreBlock = foreignStore.parentElement;
    let checkedFrProd = 0;
    foreignStoreBlock
      .querySelectorAll(".prodCheck:checked")
      .forEach(function () {
        checkedFrProd++;
      });
    console.log(checkedFrProd);
    document.querySelectorAll(".foreignProdQuant").forEach(function (fPQ) {
      fPQ.textContent = checkedFrProd;
    });
  });
  // 국내상품 수량
  const localStores = document.querySelectorAll(".localStore");
  localStores.forEach(function (localStore) {
    const localStoreBlock = localStore.parentElement;
    let checkedLcProd = 0;
    localStoreBlock.querySelectorAll(".prodCheck:checked").forEach(function () {
      checkedLcProd++;
    });
    console.log(checkedLcProd);
    document.querySelectorAll(".localProdQuant").forEach(function (lPQ) {
      lPQ.textContent = checkedLcProd;
    });
  });
  // 종금액
  // 총상품금액 totalOrigPrice
  const storeOrigPrices = document.querySelectorAll(".storeOrigPrice");
  let origToTal = 0;
  storeOrigPrices.forEach(function (e) {
    const origPrice = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
    origToTal += origPrice / 2;
    document.querySelectorAll(".totalOrigPrice").forEach(function (tOP) {
      tOP.textContent = origToTal.toLocaleString() + "원";
    });
  });
  // 총배송비
  const storeShipFees = document.querySelectorAll(".storeShipFee");
  let shipToTal = 0;
  storeShipFees.forEach(function (e) {
    const origPrice = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
    shipToTal += origPrice / 2;
    document.querySelectorAll(".totalShipFee").forEach(function (tSF) {
      tSF.textContent = shipToTal.toLocaleString() + "원";
    });
  });
  // 총할인금액
  const storeDiscounts = document.querySelectorAll(".storeDiscount");
  let DiscTotal = 0;
  storeDiscounts.forEach(function (e) {
    const storeDiscount = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
    DiscTotal += storeDiscount / 2;
    document.querySelectorAll(".totalDiscount").forEach(function (tD) {
      tD.textContent = DiscTotal.toLocaleString() + "원";
    });
  });
  // 결제예정금액
  const storePrices = document.querySelectorAll(".storePrice");
  let priceTotal = 0;
  let point = 0;
  storePrices.forEach(function (e) {
    const storePrice = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
    priceTotal += storePrice / 2;
    document.querySelectorAll(".totalPrice").forEach(function (tP) {
      tP.textContent = priceTotal.toLocaleString() + "원";
    });
    // 적립예정포인트
    document.querySelectorAll(".expectedPoint").forEach(function (tP) {
      point = priceTotal * 0.02;
      tP.textContent = point.toLocaleString() + "원";
    });
  });
  //테블릿 결제용 submit 안에 value를 바꿔주는 코드
  const totalPrice = parseInt(
    document.querySelector(".totalPrice").textContent.replace(/[,]/g, ""),
    10
  );
  const totalQuant = parseInt(
    document.querySelector(".totalProdQuant").textContent.replace(/[,]/g, ""),
    10
  );
  // const totalPrice = document.querySelector(".totalPrice");
  document.querySelector(
    ".tabFooterSubmit"
  ).value = `${totalPrice}원 (${totalQuant}건)`;
  document.querySelector(
    ".tabSectionSubmit"
  ).value = `총 ${totalQuant}개 주문하기`;
}

// 체크박스를 클릭했을 떄 계산이 진행되도록 해주는 함수
document
  .querySelectorAll(".prodCheck, .prodMobCheck, .storeCheck , .selectAllCheck")
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", storeCalc);
    checkbox.addEventListener("change", totalCalc);
  });
storeCalc();
totalCalc();





// local storage로 상세체이지에서 값을 넣는 과정
// 1.값이 1 이상& 옵션이 선택 돼있어야 locastorage에 값이 들어감. 장바구니에 상품이 들어갔다는 메세지를 띄움.
// 2.상품이름이 같은 게 이미 들어가 있으면 수량만 더해주고 이미 있었다는 메세지를 띄움

// localstorage에서 카트로 값을 받는 과정
// 1. 전부 cart: 0일 경우에 content를 비우고 cartNone에 정리해둔 content를 띄운다.
// 2. cart: 0이 아닌 게 하나라도 있을 경우에 상점이름을 읽는다.
// 상점이름 하나당 .storeBlock 하나를 만드는데 해외배송/국내배송에 따라서 .localStore .foreignStore class를 구분해서 넣는다.
// 3. cart: 안에 있는 값을  number의 value로 넣는다.
// 4. number 안에 있는 값과 상품 값을 곱한 값이 상품가격에 표시되도록 ***이건 script
// 5. number 안에 있는 값이 바뀌면 local storage 안에 있는 cart: 에도 값이 바뀐다
// 6. .storeBlock 안에 있는 상품들의 배송비중에 비교후 더 싼 걸 상점의 배송비로 끌어온다
// 7. x버튼을 누르면 해당 상품이 사라진다. localstorage에서도 지워진다

// header와의 연결
// 1. 상세페이지에서 집어넣을시와 장바구니에서 지울시에 localstorage에 상품이 몇개 들어와 있는지 업데이트 한다(length)

// 하트 (찜한상품)
// 상세페이지, 메인페이지, 장바구니에 있는 찜버튼이 비활성화된 상태에서 체크되면(change) localstoreage에 favorite이 true로 바뀐 값이 들어간다
// 찜버튼을 활성화된 상태에서 누르면 localstoreage에서 cart(수량)이 0 인경우 데이터가 제거된다
// 모든 페이지들을 부를때 관련 제품의 찜 버튼이 활성화된 상태로 불려져온다.

// 선택 삭제
// 1. 정말 지우겠냐/선택된 게 없다 alert
// 2. 체크가 된 상품들을 지운다
