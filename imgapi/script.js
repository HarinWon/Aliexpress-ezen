let products = []; // 제품 데이터를 저장할 배열

// JSON 파일에서 제품 데이터를 불러오기
fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    products = data.data; // JSON 데이터에서 'data' 배열을 products에 저장
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

function searchProducts() {
  const query = document.getElementById("searchQuery").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  displayProducts(filteredProducts);
}

function displayProducts(products) {
  const productResults = document.getElementById("productResults");
  productResults.innerHTML = ""; // 기존 결과 제거

  if (products.length === 0) {
    productResults.innerHTML = "<p>일치하는 제품이 없습니다.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");

    const imgElement = document.createElement("img");
    imgElement.src = product.img;
    imgElement.alt = product.name;

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;

    const priceElement = document.createElement("p");
    priceElement.textContent = `가격: ${product.price}원`;

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `카테고리: ${product.category}`;

    productElement.appendChild(imgElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(categoryElement);

    productResults.appendChild(productElement);
  });
}
