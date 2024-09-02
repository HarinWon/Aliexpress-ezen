document.getElementById("cameraIcon").addEventListener("click", function () {
  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("dropZone").innerHTML =
    "이미지를 이곳에 드래그하거나 클릭하세요";
});

const dropZone = document.getElementById("dropZone");
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.style.backgroundColor = "#f0f0f0";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.backgroundColor = "";
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.style.backgroundColor = "";
  handleImageUpload(event.dataTransfer.files[0]);
});

dropZone.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();
  fileInput.onchange = () => {
    handleImageUpload(fileInput.files[0]);
  };
});

function handleImageUpload(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const uploadedImage = new Image();
    uploadedImage.src = event.target.result;
    dropZone.innerHTML = ""; // DropZone 내용 지우기
    dropZone.appendChild(uploadedImage);

    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        const matchedProducts = findMatchingProducts(uploadedImage, data.data);
        displayResults(matchedProducts);
      });
  };
  reader.readAsDataURL(file);
}

function findMatchingProducts(uploadedImage, products) {
  const uploadedFileName = uploadedImage.src.split("/").pop().toLowerCase(); // 업로드된 이미지 파일 이름 추출

  return products.filter((product) => {
    const productFileName = product.img.split("/").pop().toLowerCase();
    return (
      uploadedFileName.includes(productFileName) ||
      productFileName.includes(uploadedFileName)
    );
  });
}

function displayResults(products) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // 기존 결과 지우기

  if (products.length === 0) {
    resultContainer.innerHTML = "<p>비슷한 상품이 없습니다.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
          <h4>${product.name}</h4>
          <img src="${product.img}" alt="${product.name}">
          <p>가격: ${product.price}원</p>
          <p>카테고리: ${product.category}</p>
      `;
    resultContainer.appendChild(productElement);
  });

  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
