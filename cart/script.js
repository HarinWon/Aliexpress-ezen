// // localStorage에서 값을 가져오는 곳
const cart = JSON.parse(localStorage.getItem("cartAli")) || [];
const stores = document.getElementById("stores");
const alertEmptyWrapper = document.getElementById("alertEmptyWrapper");
const recommandLogin = document.querySelectorAll(".recommandLogin");
const replaceByLogin = document.querySelectorAll(".replacedByLogin");

// 카트에 물건이 있냐 없냐에 따라서 다른 걸 띄움
function emptyCart() {
  if (cart.length === 0) {
    stores.style.display = "none";
    alertEmptyWrapper.style.display = "flex";
    replaceByLogin.forEach((el) => (el.style.display = "none"));
    recommandLogin.forEach((el) => (el.style.display = "block"));
    document.getElementById("selectDel").addEventListener("click", () => {
      alert("상품이 없습니다");
    });
    document.getElementById("selectAllTxt").checked = false;
    // });
  } else {
    stores.style.display = "flex";
    alertEmptyWrapper.style.display = "none";
    replaceByLogin.forEach((el) => (el.style.display = "flex"));
    recommandLogin.forEach((el) => (el.style.display = "none"));
  }
}
emptyCart();

// 브랜드별로 묶기
const groupByBrand = cart.reduce((acc, product) => {
  if (!acc[product.brand]) {
    acc[product.brand] = [];
  }
  acc[product.brand].push(product);
  return acc;
}, {});

// 로컬스토리지 업데이트
function updatePrices(product, prodBlock, prodBlockMob) {
  const quantity = parseInt(prodBlock.querySelector(".prodQuantN").value);

  const originalPriceText = prodBlock
    .querySelector(".prodOrigPrice")
    .textContent.replace(/[,원]/g, "");
  const priceText = prodBlock
    .querySelector(".prodFinaPrice")
    .textContent.replace(/[,원]/g, "");

  const currentOriginalPrice = parseFloat(originalPriceText) || 0;
  const currentPrice = parseFloat(priceText) || 0;

  const unitPrice =
    parseFloat(product.unit_price) || currentPrice / product.cart;
  const unitOriginalPrice =
    parseFloat(product.unit_original_price) ||
    currentOriginalPrice / product.cart;

  const updatedPrice = (unitPrice * quantity).toLocaleString() + "원";
  const updatedOriginalPrice =
    (unitOriginalPrice * quantity).toLocaleString() + "원";

  prodBlock.querySelector(".prodFinaPrice").textContent = updatedPrice;
  prodBlock.querySelector(".prodOrigPrice").textContent = updatedOriginalPrice;

  prodBlockMob.querySelector(".prodFinaPrice").textContent = updatedPrice;
  prodBlockMob.querySelector(".prodOrigPrice").textContent =
    updatedOriginalPrice;
  product.cart = quantity;

  localStorage.setItem("cartAli", JSON.stringify(cart));
  storeCalc();
  totalCalc();
}

function updatePricesOnLoad(cart) {
  cart.forEach((product, index) => {
    const prodBlock = document
      .querySelector(`#prodCheck_${index}`)
      .closest(".prodBlock");
    const prodBlockMob = document
      .querySelector(`#prodCheckMob_${index}`)
      .closest(".prodBlockMob");

    const quantity = parseInt(product.cart);

    const currentOriginalPrice =
      parseFloat(product.original_price.replace(/[,원]/g, "")) || 0;
    const currentPrice = parseFloat(product.price.replace(/[,원]/g, "")) || 0;

    const unitPrice = parseFloat(product.unit_price) || currentPrice;
    const unitOriginalPrice =
      parseFloat(product.unit_original_price) || currentOriginalPrice;

    const updatedPrice = (unitPrice * quantity).toLocaleString() + "원";
    const updatedOriginalPrice =
      (unitOriginalPrice * quantity).toLocaleString() + "원";

    if (prodBlock) {
      prodBlock.querySelector(".prodFinaPrice").textContent = updatedPrice;
      prodBlock.querySelector(".prodOrigPrice").textContent =
        updatedOriginalPrice;
    }
    if (prodBlockMob) {
      prodBlockMob.querySelector(".prodFinaPrice").textContent = updatedPrice;
      prodBlockMob.querySelector(".prodOrigPrice").textContent =
        updatedOriginalPrice;
    }
    product.cart = quantity;
  });

  localStorage.setItem("cartAli", JSON.stringify(cart));
}

window.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cartAli")) || [];
  updatePricesOnLoad(cart);
});

for (let brand in groupByBrand) {
  const storeBlock = document.createElement("div");
  storeBlock.classList.add("storeBlock");

  const localStore = document.createElement("div");
  localStore.classList.add("localStore");

  const foreignStore = document.createElement("div");
  foreignStore.classList.add("foreignStore");

  const prodList = document.createElement("ul");
  prodList.classList.add("prodList");

  // storeBlock 상단 요소들
  const storeLLc = document.createElement("div");
  storeLLc.classList.add("storeL");
  storeLLc.innerHTML = `
        <input type="checkbox" class="storeCheck" id="storeCheck_${brand}" checked />
        <label for="storeCheck_${brand}">
            <i class="fa-solid fa-circle-check"></i>
        </label>
        <span>
            <a href="#storeLink" class="storeLinkTitle">${brand}</a>
            <input type="checkbox" class="storeHeart" id="storeHeart_${brand}" />
            <label for="storeHeart_${brand}" class="storeHeartLb">
                <i class="fa-solid fa-heart"></i>
            </label>
            <a href="#storeLink" class="storeLink">
                <i class="fa-solid fa-angle-right"></i>
            </a>
        </span>`;

  const storeLFr = document.createElement("div");
  storeLFr.classList.add("storeL");
  storeLFr.innerHTML = `
        <input type="checkbox" class="storeCheck" id="storeCheck_${brand}" checked />
        <label for="storeCheck_${brand}">
            <i class="fa-solid fa-circle-check"></i>
        </label>
        <span>
        <img
                  src="./img/mingcute_flight-land-line.png"
                  alt="foreign-sign"
              /></span>
        <span>
            <a href="#storeLink" class="storeLinkTitle">${brand}</a>
            <input type="checkbox" class="storeHeart" id="storeHeart_${brand}" />
            <label for="storeHeart_${brand}" class="storeHeartLb">
                <i class="fa-solid fa-heart"></i>
            </label>
            <a href="#storeLink" class="storeLink">
                <i class="fa-solid fa-angle-right"></i>
            </a>
        </span>`;

  const storeR = document.createElement("div");
  storeR.classList.add("storeR");
  storeR.innerHTML = `                      
                      <input type="button" class="storeQuant" value="2건바로구매" />
                      <span>
                        <input
                          type="checkbox"
                          class="storeHeart"
                          id="storeHeartMob2"
                        />
                        <label
                          for="storeHeartMob2"
                          class="storeHeartMobLb"
                          id="heartLb"
                          ><i class="fa-solid fa-heart"></i
                        ></label>
                      </span>`;

  // 국내와 해외배송에 따른 상점차이
  if (
    groupByBrand[brand].some((product) => product.shippingType === "국내배송")
  ) {
    storeBlock.appendChild(localStore);
    localStore.appendChild(storeLLc);
    localStore.appendChild(storeR);
  } else if (
    groupByBrand[brand].some((product) => product.shippingType === "해외배송")
  ) {
    storeBlock.appendChild(foreignStore);
    foreignStore.appendChild(storeLFr);
    foreignStore.appendChild(storeR);
  }

  const storeCalc = document.createElement("div");
  storeCalc.classList.add("storeCalc");
  storeCalc.innerHTML = `              
                <div>
                  <span>상품금액</span>
                  <span class="storeOrigPrice"></span>
                </div>
                <i class="fa-solid fa-circle-plus"></i>
                <div>
                  <span>배송비<i class="fa-solid fa-chevron-down"></i></span>
                  <span class="storeShipFee">0원</span>
                </div>
                <i class="fa-solid fa-circle-minus"></i>
                <div>
                  <span>할인금액<i class="fa-solid fa-chevron-down"></i></span>
                  <span class="storeDiscount"></span>
                </div>
                <i class="fa-solid fa-circle-pause"></i>
                <div>
                  <h1 class="storePrice"></h1>
                </div>`;

  const storeCalcMob = document.createElement("div");
  storeCalcMob.classList.add("storeCalcMob");
  storeCalcMob.innerHTML = `              
                <div class="accordion">
                  <i class="fa-solid fa-chevron-down accordClose"></i>
                  <div>
                    <span>상품금액 </span>
                    <span class="storeOrigPrice"></span>
                  </div>
                  <div>
                    <span>배송비 <i class="fa-solid fa-chevron-down"></i></span>
                    <span class="storeShipFee">0원</span>
                  </div>
                  <div>
                    <span>할인금액 <i class="fa-solid fa-chevron-down"></i></span>
                    <span class="storeDiscount"></span>
                  </div>
                </div>
                <div class="storePay">
                  <div class="storeTotalPrice">
                    <h3 class="storeTotalPriceL">
                      주문금액 <i class="fa-solid fa-chevron-up accordOpen"></i>
                    </h3>
                    <h3 class="storePrice"></h3>
                  </div>
                  <input
                    type="submit"
                    class="storeQuantMob"
                    value="2건 바로구매"
                  />
                </div>`;

  storeBlock.appendChild(prodList);
  storeBlock.appendChild(storeCalc);
  storeBlock.appendChild(storeCalcMob);

  // 도착예정 날자 계산
  let latestArrivalDate = new Date(0);
  groupByBrand[brand].forEach((product) => {
    let daysToAdd = 0;
    if (product.shippingMethod === "7-10일 배송") {
      daysToAdd = Math.floor(Math.random() * 3) + 7;
    } else if (product.shippingMethod === "choice배송") {
      daysToAdd = Math.floor(Math.random() * 2) + 3;
    }

    const today = new Date();
    const arrivalDate = new Date(today);
    arrivalDate.setDate(today.getDate() + daysToAdd);

    if (arrivalDate > latestArrivalDate) {
      latestArrivalDate = arrivalDate;
    }
  });

  const arrivalMonth = latestArrivalDate.getMonth() + 1;
  const arrivalDay = latestArrivalDate.getDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const arrivalWeekday = weekdays[latestArrivalDate.getDay()];
  const txtLatestArrivalDate = `${arrivalMonth}/${arrivalDay}(${arrivalWeekday})`;

  groupByBrand[brand].forEach((product, index) => {
    // prodBlock
    const originalPrice =
      (
        product.original_price.replace(/[,원]/g, "") * product.cart
      ).toLocaleString() + "원";
    const finalPrice =
      (product.price.replace(/[,원]/g, "") * product.cart).toLocaleString() +
      "원";
    const prodBlock = document.createElement("li");
    prodBlock.classList.add("prodBlock");
    prodBlock.innerHTML = `
            <div class="prodBlockL">
                <input type="checkbox" class="prodCheck" id="prodCheck_${index}" checked />
                <label for="prodCheck_${index}">
                    <i class="fa-solid fa-circle-check"></i>
                </label>
                <a href="#prodLink">
                    <img src="${product.image_path}" alt="prodImg" class="prodImg" />
                </a>
                <div class="prodInfoL">
                    <a href="#prodLink">
                        <h3 class="prodTitle">${product.product_name}</h3>
                    </a>
                    <div class="ProdInfoLBtn">
                        <div class="prodQuant">
                            <input type="button" value=" - " class="minusB" />
                            <input type="number" name="prodQuantN" class="prodQuantN" maxlength="1" value="${product.cart}" />
                            <input type="button" value=" + " class="plusB" />
                        </div>
                        <input type="checkbox" class="prodHeart" id="prodHeart_${index}" />
                        <label for="prodHeart_${index}" class="prodHeartLb">
                            <i class="fa-solid fa-heart"></i>
                        </label>
                    </div>
                </div>
            </div>
            <div class="prodBlockR">
                <div class="prodInfoRdesc">
                    <i class="fa-solid fa-xmark"></i>
                    <h2 class="prodFinaPrice">${finalPrice}</h2>
                    <h4><s class="prodOrigPrice">${originalPrice}</s></h4>
          <h4><span class="arrivDate">${txtLatestArrivalDate}</span> 배송예정</h4>
                </div>
                <div class="prodInfoRBtn">
                    <input type="button" value="쿠폰변경" />
                    <input type="button" value="바로구매" />
                </div>
            </div>`;

    const prodBlockMob = document.createElement("li");
    prodBlockMob.classList.add("prodBlockMob");
    prodBlockMob.innerHTML = `
                <div class="prodBlockMobClose">
                  <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="prodInfoWrapper">
                  <div class="prodBlockMobInfo">
                    <div class="prodBlockMobL">
                      <input
                        type="checkbox"
                        class="prodMobCheck"
                        id="prodMobCheck1"
                        checked
                      />
                      <label for="prodMobCheck1" id="prodMobChkLb">
                        <i class="fa-solid fa-circle-check"></i>
                      </label>
                      <div class="prodImgMob">
                        <input
                          type="checkbox"
                          class="prodHeartMob"
                          id="prodHeartMob1"
                        />
                        <label for="prodHeartMob1" class="prodHeartMobLb">
                          <i class="fa-solid fa-heart"></i>
                        </label>
                      </div>
                    </div>
                    <div class="prodBlockMobR">
                      <div class="prodInfoRdesc">
                        <a href="#prodLink">
                          <h3 class="prodTitle">
                          ${product.product_name}
                          </h3>
                        </a>
          <h4><span class="arrivDate">${txtLatestArrivalDate}</span> 배송예정</h4>
                        <div class="origNFina">
                          <h4 class="prodOrigPrice"><s>${originalPrice}</s></h4>
                          <h2 class="prodFinaPrice">${finalPrice}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="prodInfoBtn">
                    <div class="prodQuant">
                      <input type="button" value=" - " class="minusB" />
                      <input
                        type="number"
                        name="prodQuantN"
                        class="prodQuantN"
                        maxlength="1"
                        value="${product.cart}"
                      />
                      <input type="button" value=" + " class="plusB" />
                    </div>
                    <input type="button" value="쿠폰변경" />
                    <input type="button" value="바로구매" />
                  </div>
                </div>`;
    const quantInput = prodBlock.querySelector(".prodQuantN");
    const quantInputMob = prodBlockMob.querySelector(".prodQuantN");

    const plusButton = prodBlock.querySelector(".plusB");
    const minusButton = prodBlock.querySelector(".minusB");
    const plusButtonMob = prodBlockMob.querySelector(".plusB");
    const minusButtonMob = prodBlockMob.querySelector(".minusB");

    [plusButton, plusButtonMob].forEach((button) => {
      button.addEventListener("mouseup", function () {
        updatePrices(product, prodBlock, prodBlockMob);
      });
      button.addEventListener("mouseout", function () {
        updatePrices(product, prodBlock, prodBlockMob);
      });
    });

    [minusButton, minusButtonMob].forEach((button) => {
      button.addEventListener("mouseup", function () {
        updatePrices(product, prodBlock, prodBlockMob);
      });
      button.addEventListener("mouseout", function () {
        updatePrices(product, prodBlock, prodBlockMob);
      });
    });

    [quantInput, quantInputMob].forEach((input) => {
      input.addEventListener("change", function () {
        updatePrices(product, prodBlock, prodBlockMob);
      });
    });

    // 모바일 상품 이미지 차이
    prodBlockMob.querySelectorAll(".prodImgMob").forEach((img) => {
      img.style.background = `url("${product.image_path}")`;
      img.style.backgroundSize = "cover";
      img.style.backgroundPosition = "center";
    });
    // 삭제 기능
    //  선택삭제
    function checkAndConfirm() {
      const prodChecks = document.querySelectorAll(".prodCheck:checked");
      const prodMobChecks = document.querySelectorAll(".prodMobCheck:checked");

      const allChecked = [...prodChecks, ...prodMobChecks];

      if (allChecked.length === 0) {
        alert("선택된 상품이 없습니다");
      } else {
        const userConfirmed = confirm("선택하신 상품을 삭제 하시겠습니까?");
        if (userConfirmed) {
          allChecked.forEach((checkbox) => {
            const prodBlock = checkbox.closest(".prodBlock");
            const prodBlockMob = checkbox.closest(".prodBlockMob");

            const productName = prodBlock
              ? prodBlock.querySelector(".prodTitle").textContent
              : prodBlockMob.querySelector(".prodTitle").textContent;

            removeProd(prodBlock, prodBlockMob, productName);
          });

          storeCalc();
          totalCalc();
        }
      }
    }
    document
      .getElementById("selectDel")
      .addEventListener("click", checkAndConfirm);
    // 상품 삭제
    function removeProd(prodBlock, prodBlockMob, productName) {
      if (prodBlock) {
        const storeBlock = prodBlock.closest(".storeBlock");
        prodBlock.remove();
        if (prodBlockMob) {
          prodBlockMob.remove();
        }
        const productIndex = cart.findIndex(
          (item) => item.product_name === productName
        );
        if (productIndex !== -1) {
          cart.splice(productIndex, 1);
          localStorage.setItem("cartAli", JSON.stringify(cart));
        }
        if (storeBlock.querySelectorAll(".prodBlock").length === 0) {
          storeBlock.remove();
        }
        emptyCart();
      }
    }
    prodBlock.querySelector(".fa-xmark").addEventListener("click", function () {
      removeProd(prodBlock, prodBlockMob, product.product_name);
    });
    prodBlockMob
      .querySelector(".fa-xmark")
      .addEventListener("click", function () {
        removeProd(prodBlock, prodBlockMob, product.product_name);
      });

    prodList.appendChild(prodBlock);
    prodList.appendChild(prodBlockMob);
  });
  stores.appendChild(storeBlock);
}

// 체크박스에 다른 id값을 주는 코드
// prodCheck prodHeart
const prodBlocks = document.querySelectorAll(".prodBlockL");
const prodBlockMobs = document.querySelectorAll(".prodBlockMobL");

prodBlocks.forEach((block, index) => {
  const prodCheck = block.querySelector(".prodCheck");
  const prodCheckId = `prodCheck${index + 1}`;
  const prodHeart = block.querySelector(".prodHeart");
  const prodHeartId = `prodHeart${index + 1}`;
  prodCheck.id = prodCheckId;
  prodHeart.id = prodHeartId;
  const checkLabel = block.querySelector('label[for^="prodCheck"]');
  if (checkLabel) {
    checkLabel.setAttribute("for", prodCheckId);
  }
  const heartLabel = block.querySelector('label[for^="prodHeart"]');
  if (heartLabel) {
    heartLabel.setAttribute("for", prodHeartId);
  }
});
prodBlockMobs.forEach((block, index) => {
  const prodMobCheck = block.querySelector(".prodMobCheck");
  const prodMobCheckId = `prodMobCheck${index + 1}`;
  const prodHeartMob = block.querySelector(".prodHeartMob");
  const prodHeartMobId = `prodHeartMob${index + 1}`;
  prodMobCheck.id = prodMobCheckId;
  prodHeartMob.id = prodHeartMobId;
  const checkLabel = block.querySelector('label[for^="prodMobCheck"]');
  if (checkLabel) {
    checkLabel.setAttribute("for", prodMobCheckId);
  }
  const heartLabel = block.querySelector('label[for^="prodHeartMob"]');
  if (heartLabel) {
    heartLabel.setAttribute("for", prodHeartMobId);
  }
});

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
const accordionOpen = document.querySelectorAll(".accordOpen");
accordionOpen.forEach((openBtn) => {
  openBtn.addEventListener("click", () => {
    let openContainer = openBtn.parentElement.parentElement.parentElement;
    let content = openContainer.previousElementSibling;
    content.classList.add("active");
    const accordClose = content.querySelector(".accordClose");
    accordClose.addEventListener("click", () => {
      content.classList.remove("active");
      openBtn.style.display = "inline-block";
    });
    openBtn.style.display = "none";
  });
});
// 전체 상세가격
const accordionOpenF = document.querySelector(".accordOpenF");
accordionOpenF.addEventListener("click", () => {
  let contentF = accordionOpenF.parentElement.previousElementSibling;
  if (accordionOpenF.classList.contains("active")) {
    accordionOpenF.classList.remove("active");
    contentF.classList.remove("active");
  } else {
    accordionOpenF.classList.add("active");
    contentF.classList.add("active");
  }

  const accordCloseF = contentF.querySelector(".accordCloseF");
  accordCloseF.addEventListener("click", () => {
    accordionOpenF.classList.remove("active");
    contentF.classList.remove("active");
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
  const minusN = prodBlock.querySelector(".minusB");
  const minusNMob = prodBlock.nextElementSibling.querySelector(".minusB");
  const plusN = prodBlock.querySelector(".plusB");
  const plusNMob = prodBlock.nextElementSibling.querySelector(".plusB");
  // Number
  const quantN = prodBlock.querySelector("input[type='number']");
  const quantNMob = prodBlock.nextElementSibling.querySelector(
    "input[type='number']"
  );
  minusN.addEventListener("mouseup", function () {
    quantNMob.value = quantN.value;
  });
  minusNMob.addEventListener("mouseup", function () {
    quantN.value = quantNMob.value;
  });
  plusN.addEventListener("mouseup", function () {
    quantNMob.value = quantN.value;
  });
  plusNMob.addEventListener("mouseup", function () {
    quantN.value = quantNMob.value;
  });
  minusN.addEventListener("mouseout", function () {
    quantNMob.value = quantN.value;
  });
  minusNMob.addEventListener("mouseout", function () {
    quantN.value = quantNMob.value;
  });
  plusN.addEventListener("mouseout", function () {
    quantNMob.value = quantN.value;
  });
  plusNMob.addEventListener("mouseout", function () {
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

// 전체,해외,국내 버튼으로 분류
const sortAlls = document.querySelectorAll(".sortAll");
const sortFrs = document.querySelectorAll(".sortFr");
const sortLocals = document.querySelectorAll(".sortLc");
const storeBlocks = document.querySelectorAll(".storeBlock");

function selectAllState() {
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAll.checked = allChecked;
}

function removeActiveClass(buttons) {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
}

// 전체
sortAlls.forEach((button) => {
  button.addEventListener("click", function () {
    storeBlocks.forEach((block) => {
      block.style.display = "flex";
    });
    sortAlls.forEach((sortButton) => {
      sortButton.classList.add("active");
    });
    removeActiveClass(sortFrs);
    removeActiveClass(sortLocals);
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
    sortFrs.forEach((sortButton) => {
      sortButton.classList.add("active");
    });
    removeActiveClass(sortAlls);
    removeActiveClass(sortLocals);
    checkboxes = [];
    storeBlocks.forEach((block) => {
      if (block.querySelector(".foreignStore")) {
        const blockCheckboxes = block.querySelectorAll(
          ".storeCheck, .prodCheck, .prodMobCheck"
        );
        checkboxes = [...checkboxes, ...blockCheckboxes];
      }
    });
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
    sortLocals.forEach((sortButton) => {
      sortButton.classList.add("active");
    });
    removeActiveClass(sortAlls);
    removeActiveClass(sortFrs);
    checkboxes = [];
    storeBlocks.forEach((block) => {
      if (block.querySelector(".localStore")) {
        const blockCheckboxes = block.querySelectorAll(
          ".storeCheck, .prodCheck, .prodMobCheck"
        );
        checkboxes = [...checkboxes, ...blockCheckboxes];
      }
    });
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
        // 할인금액이 0원 이상일 때 액티브 클래스(빨간색)이 부여됨
        if (storeDiscTotal > 0) {
          storeDiscount.classList.add("active");
        } else if (storeDiscTotal === 0) {
          storeDiscount.classList.remove("active");
        }
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
    });
    storeBlock.querySelectorAll(".storePrice").forEach(function (storePrice) {
      storePrice.textContent = storePriceTotal.toLocaleString() + "원";
    });
    // 상점별 수량
    let quantN = storeBlock.querySelectorAll(".prodCheck:checked").length;
    const storeQuant = storeBlock.querySelector(".storeQuant");
    storeQuant.value = quantN.toLocaleString() + "건바로구매";
    const storeQuantMob = storeBlock.querySelector(".storeQuantMob");
    storeQuantMob.value = quantN.toLocaleString() + "건 바로구매";
    // 수량에 따른 색상 변경
    if (quantN > 0) {
      storeQuant.classList.remove("disabled");
      storeQuantMob.style.background = "#ff611d";
      storeQuantMob.style.cursor = "pointer";
    } else if (quantN === 0) {
      storeQuant.classList.add("disabled");
      storeQuantMob.style.background = "#afafaf";
      storeQuantMob.style.cursor = "default";
    }
  });
}
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
  // 상품수에 따른 버튼색 변화
  if (checkedProd > 0) {
    document
      .querySelectorAll(".tabFooterSubmit, #payInfoMob, .stickyDeskBtt")
      .forEach(function (gradiantBtt) {
        gradiantBtt.classList.remove("disabled");
      });
    document
      .querySelectorAll(".tabSectionSubmit")
      .forEach(function (tabSectionSubmit) {
        tabSectionSubmit.classList.remove("disabled");
      });
  } else if (checkedProd === 0) {
    document
      .querySelectorAll(".tabFooterSubmit, #payInfoMob, .stickyDeskBtt")
      .forEach(function (gradiantBtt) {
        gradiantBtt.classList.add("disabled");
      });
    document
      .querySelectorAll(".tabSectionSubmit")
      .forEach(function (tabSectionSubmit) {
        tabSectionSubmit.classList.add("disabled");
      });
  }
  // 해외상품 & 국내상품 수량
  let localStoreCount = 0;
  let foreignStoreCount = 0;
  const storeBlocks = document.querySelectorAll(".storeBlock");

  storeBlocks.forEach((storeBlock) => {
    if (storeBlock.querySelector(".localStore")) {
      const checkedLocal =
        storeBlock.querySelectorAll(".prodCheck:checked").length;
      localStoreCount += checkedLocal;
    } else if (storeBlock.querySelector(".foreignStore")) {
      const checkedForeign =
        storeBlock.querySelectorAll(".prodCheck:checked").length;
      foreignStoreCount += checkedForeign;
    }
  });
  document.querySelectorAll(".localProdQuant").forEach((element) => {
    element.textContent = localStoreCount;
  });
  document.querySelectorAll(".foreignProdQuant").forEach((element) => {
    element.textContent = foreignStoreCount;
  });

  // 종금액
  // 총상품금액 totalOrigPrice
  const storeOrigPrices = document.querySelectorAll(".storeOrigPrice");
  if (storeOrigPrices) {
    let origToTal = 0;
    storeOrigPrices.forEach(function (e) {
      const origPrice = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
      origToTal += origPrice / 2;
      document.querySelectorAll(".totalOrigPrice").forEach(function (tOP) {
        tOP.textContent = origToTal.toLocaleString() + "원";
      });
    });
  }
  // 총배송비
  const storeShipFees = document.querySelectorAll(".storeShipFee");
  if (storeShipFees) {
    let shipTotal = 0;
    storeShipFees.forEach(function (e) {
      const origPrice = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
      shipTotal += origPrice / 2;
      document.querySelectorAll(".totalShipFee").forEach(function (tSF) {
        tSF.textContent = shipTotal.toLocaleString() + "원";
        // 배송비가 0원일 때 액티브 클래스(빨간색)이 부여됨
        // if (shipTotal === 0) {
        //   tSF.classList.add("active");
        // } else if (shipTotal > 0) {
        //   tSF.classList.remove("active");
        // }
      });
    });
  }
  // 총할인금액
  const storeDiscounts = document.querySelectorAll(".storeDiscount");
  if (storeDiscounts) {
    let DiscTotal = 0;
    storeDiscounts.forEach(function (e) {
      const storeDiscount = parseInt(e.textContent.replace(/[,원]/g, ""), 10);
      DiscTotal += storeDiscount / 2;
      document.querySelectorAll(".totalDiscount").forEach(function (tD) {
        tD.textContent = DiscTotal.toLocaleString() + "원";
        // 할인금액이 0원 이상일 때 액티브 클래스(빨간색)이 부여됨
        if (DiscTotal > 0) {
          tD.classList.add("active");
        } else if (DiscTotal === 0) {
          tD.classList.remove("active");
        }
      });
    });
  }
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
      point = Math.floor(priceTotal * 0.02);
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

// 체크박스와 삭제버튼를 클릭했을 떄 계산이 진행되도록 해주는 함수
document
  .querySelectorAll(".prodCheck, .prodMobCheck, .storeCheck , .selectAllCheck")
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", storeCalc);
    checkbox.addEventListener("change", totalCalc);
  });
storeCalc();
totalCalc();

document
  .querySelectorAll(".fa-xmark, #selectDel")
  .forEach(function (deleteAll) {
    deleteAll.addEventListener("click", function () {
      console.log("clicksele");
      if (!document.storeBlock) {
        document.querySelectorAll(".totalOrigPrice").forEach(function (tOP) {
          tOP.textContent = "0원";
        });
        document.querySelectorAll(".totalShipFee").forEach(function (tSF) {
          tSF.textContent = "0원";
        });
        document.querySelectorAll(".totalDiscount").forEach(function (tD) {
          tD.textContent = "0원";
          tD.classList.remove("active");
        });
        document.querySelectorAll(".totalPrice").forEach(function (tP) {
          tP.textContent = "0원";
        });
      }
      storeCalc();
      totalCalc();
    });
  });
  
// localstorage에서 카트로 값을 받는 과정
// v1. 전부 cart: 0일 경우에 content를 비우고 cartNone에 정리해둔 content를 띄운다.
// v2. cart: 0이 아닌 게 하나라도 있을 경우에 상점이름을 읽는다.
// 상점이름 하나당 .storeBlock 하나를 만드는데 해외배송/국내배송에 따라서 .localStore .foreignStore class를 구분해서 넣는다.
// v3. cart: 안에 있는 값을  number의 value로 넣는다.
// v4. number 안에 있는 값과 상품 값을 곱한 값이 상품가격에 표시되도록 ***이건 script
// v5. number 안에 있는 값이 바뀌면 local storage 안에 있는 cart: 에도 값이 바뀐다
// x6. .storeBlock 안에 있는 상품들의 배송비 중에 비교후 더 싼 걸 상점의 배송비로 끌어온다
// v7. x버튼을 누르면 해당 상품이 사라진다. localstorage에서도 지워진다
// v8. 배송날짜 choice배송 7-10일 배송
// V9. 한박스의 상품들이 배송비가 다르면 더 늦는 날짜를 배송날짜로 사용한다

// header와의 연결
// 1. 상세페이지에서 집어넣을시와 장바구니에서 지울시에 localstorage에 상품이 몇개 들어와 있는지 업데이트 한다(length)

// 하트 (찜한상품)
// 상세페이지, 메인페이지, 장바구니에 있는 찜버튼이 비활성화된 상태에서 체크되면(change) localstoreage에 favorite이 true로 바뀐 값이 들어간다
// 찜버튼을 활성화된 상태에서 누르면 localstoreage에서 cart(수량)이 0 인경우 데이터가 제거된다
// 모든 페이지들을 부를때 관련 제품의 찜 버튼이 활성화된 상태로 불려져온다.

// 선택 삭제
// V1. 정말 지우겠냐/선택된 게 없다 alert
// V2. 체크가 된 상품들을 지운다
