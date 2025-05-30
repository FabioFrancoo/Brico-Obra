// JavaScript - Exemplo em produto.js (ajustado)

submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Previne envio padrão para validar antes

  // Limpar mensagens de erro
  const errors = ["Name", "Price", "PricePerUnit", "PricePerLitre", "Stock", "Description"];
  errors.forEach(err => {
    const el = document.getElementById("error" + err);
    if (el) el.textContent = "";
  });

  // Obter valores
  const name = document.getElementById("productName").value.trim();
  const priceRaw = document.getElementById("productPrice").value.trim();
  const price = parseFloat(priceRaw);

  const pricePerUnitRaw = document.getElementById("productPricePerUnit").value.trim();
  const pricePerLitreRaw = document.getElementById("productPricePerLitre").value.trim();

  const pricePerUnit = pricePerUnitRaw === "" ? null : parseFloat(pricePerUnitRaw);
  const pricePerLitre = pricePerLitreRaw === "" ? null : parseFloat(pricePerLitreRaw);

  const stockRaw = document.getElementById("productStock").value.trim();
  const stock = parseInt(stockRaw, 10);

  const description = document.getElementById("productDescription").value.trim();

  let valid = true;

  // Validações

  if (!name) {
    document.getElementById("errorName").textContent = "Por favor, insira o título do produto.";
    valid = false;
  }

  if (!priceRaw || isNaN(price)) {
    document.getElementById("errorPrice").textContent = "Por favor, insira um preço válido.";
    valid = false;
  }

  if (!stockRaw || isNaN(stock)) {
    document.getElementById("errorStock").textContent = "Por favor, insira a quantidade em stock.";
    valid = false;
  } else if (stock < 0) {
    document.getElementById("errorStock").textContent = "A quantidade em stock deve ser maior ou igual a 0.";
    valid = false;
  }

  if (!description) {
    document.getElementById("errorDescription").textContent = "Por favor, insira uma descrição.";
    valid = false;
  }

  if (pricePerUnit !== null && isNaN(pricePerUnit)) {
    document.getElementById("errorPricePerUnit").textContent = "Preço por unidade deve ser um número válido ou estar vazio.";
    valid = false;
  }

  if (pricePerLitre !== null && isNaN(pricePerLitre)) {
    document.getElementById("errorPricePerLitre").textContent = "Preço por litro deve ser um número válido ou estar vazio.";
    valid = false;
  }

  if (!valid) return; // Não prosseguir se houver erro

  // Montar objeto produto (sem categoria)
  const product = {
    name,
    price: price.toFixed(2),
    pricePerUnit: pricePerUnit !== null ? pricePerUnit.toFixed(2) : null,
    pricePerLitre: pricePerLitre !== null ? pricePerLitre.toFixed(2) : null,
    stock,
    description,
    image: imageBase64
  };

  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Produto adicionado com sucesso!");
  location.reload();
});
