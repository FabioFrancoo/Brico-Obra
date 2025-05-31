let imageBase64 = null;

const imageInput = document.getElementById("productImage");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];
  if (!file) {
    imageBase64 = null;
    const preview = document.getElementById("imagePreview");
    if (preview) {
      preview.remove();
    }
    document.getElementById("errorImage").textContent = "Por favor, carregue uma imagem do produto.";
    return;
  }

  if (!file.type.startsWith('image/')) {
    document.getElementById("errorImage").textContent = "Por favor, selecione um ficheiro de imagem válido.";
    imageBase64 = null;
    const preview = document.getElementById("imagePreview");
    if (preview) {
      preview.remove();
    }
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    document.getElementById("errorImage").textContent = "A imagem é muito grande (máximo 5MB).";
    imageBase64 = null;
    const preview = document.getElementById("imagePreview");
    if (preview) {
      preview.remove();
    }
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    imageBase64 = e.target.result;

    let preview = document.getElementById("imagePreview");
    if (!preview) {
      preview = document.createElement("img");
      preview.id = "imagePreview";
      preview.className = "mt-4 max-h-40 rounded border border-gray-300 object-contain";
      imagePreviewContainer.prepend(preview);
    }
    preview.src = imageBase64;

    const errorImage = document.getElementById("errorImage");
    if (errorImage) errorImage.textContent = "";
  };

  reader.readAsDataURL(file);
});

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Clear error messages
  const errors = ["Name", "Reference", "Price", "PricePerUnit", "PricePerLitre", "Stock", "Description", "Image"];
  errors.forEach(err => {
    const el = document.getElementById("error" + err);
    if (el) el.textContent = "";
  });

  // Get values
  const name = document.getElementById("productName").value.trim();
  const reference = document.getElementById("productReference").value.trim();

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

  // Validations
  if (!name) {
    document.getElementById("errorName").textContent = "Por favor, insira o título do produto.";
    valid = false;
  }

  if (!reference) {
    document.getElementById("errorReference").textContent = "Por favor, insira uma referência para o produto.";
    valid = false;
  } else {
    // Optional: Check if reference already exists (for uniqueness)
    const existingProducts = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];
    const referenceExists = existingProducts.some(product => product.reference === reference);
    if (referenceExists) {
      document.getElementById("errorReference").textContent = "Esta referência já existe. Por favor, utilize uma referência única.";
      valid = false;
    }
  }

  if (!priceRaw || isNaN(price) || price < 0) {
    document.getElementById("errorPrice").textContent = "Por favor, insira um preço válido e positivo.";
    valid = false;
  }

  if (!stockRaw || isNaN(stock) || stock < 0) {
    document.getElementById("errorStock").textContent = "Por favor, insira uma quantidade em stock válida (maior ou igual a 0).";
    valid = false;
  }

  if (!description) {
    document.getElementById("errorDescription").textContent = "Por favor, insira uma descrição.";
    valid = false;
  }

  if (pricePerUnit !== null && (isNaN(pricePerUnit) || pricePerUnit < 0)) {
    document.getElementById("errorPricePerUnit").textContent = "Preço por unidade deve ser um número válido e positivo ou estar vazio.";
    valid = false;
  }

  if (pricePerLitre !== null && (isNaN(pricePerLitre) || pricePerLitre < 0)) {
    document.getElementById("errorPricePerLitre").textContent = "Preço por litro deve ser um número válido e positivo ou estar vazio.";
    valid = false;
  }

  if (!imageBase64) {
    document.getElementById("errorImage").textContent = "Por favor, carregue uma imagem do produto.";
    valid = false;
  }

  if (!valid) {
    document.querySelector('.max-w-5xl.mx-auto').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Construct product object
  const product = {
    id: Date.now(), // Unique ID
    reference: reference,
    name,
    price: parseFloat(price.toFixed(2)),
    pricePerUnit: pricePerUnit !== null ? parseFloat(pricePerUnit.toFixed(2)) : null,
    pricePerLitre: pricePerLitre !== null ? parseFloat(pricePerLitre.toFixed(2)) : null,
    stock,
    description,
    image: imageBase64
  };

  const supplierProducts = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];

  supplierProducts.push(product);
  localStorage.setItem("bricoObraSupplierProducts", JSON.stringify(supplierProducts));
  
  alert("Produto adicionado com sucesso!");
  window.location.href = '../html/paginaFornecedor.html'; // Redirect to the products page
  // -----------------------------
});

// Add event listener for the Cancel button
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", function() {
    window.location.href = '../html/paginaFornecedor.html'; // Redirect to the products page
});