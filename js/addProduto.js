let imageBase64 = null;
let editingProductId = null; // New variable to store the ID of the product being edited

const imageInput = document.getElementById("productImage");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const productNameInput = document.getElementById("productName");
const productReferenceInput = document.getElementById("productReference");
const productPriceInput = document.getElementById("productPrice");
const productPricePerUnitInput = document.getElementById("productPricePerUnit");
const productPricePerLitreInput = document.getElementById("productPricePerLitre");
const productStockInput = document.getElementById("productStock");
const productDescriptionInput = document.getElementById("productDescription");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", () => {
    editingProductId = getUrlParameter('id');

    if (editingProductId) {
        // Change button text to "Guardar Alterações"
        submitBtn.textContent = "Guardar Alterações";
        
        // Load product data if in edit mode
        const products = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];
        const productToEdit = products.find(p => p.id == editingProductId); // Use == for loose comparison if IDs are strings/numbers

        if (productToEdit) {
            productNameInput.value = productToEdit.name;
            productReferenceInput.value = productToEdit.reference;
            productPriceInput.value = productToEdit.price;
            productPricePerUnitInput.value = productToEdit.pricePerUnit || '';
            productPricePerLitreInput.value = productToEdit.pricePerLitre || '';
            productStockInput.value = productToEdit.stock;
            productDescriptionInput.value = productToEdit.description || '';
            
            // Set image preview
            if (productToEdit.image) {
                imageBase64 = productToEdit.image;
                let preview = document.createElement("img");
                preview.id = "imagePreview";
                preview.className = "mt-4 max-h-40 rounded border border-gray-300 object-contain";
                preview.src = imageBase64;
                imagePreviewContainer.prepend(preview);
            }
        } else {
            // Product not found, maybe redirect or show error
            alert("Produto não encontrado para edição.");
            window.location.href = '../html/paginaFornecedor.html';
        }
    }
});

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


submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Clear error messages
    const errors = ["Name", "Reference", "Price", "PricePerUnit", "PricePerLitre", "Stock", "Description", "Image"];
    errors.forEach(err => {
        const el = document.getElementById("error" + err);
        if (el) el.textContent = "";
    });

    // Get values
    const name = productNameInput.value.trim();
    const reference = productReferenceInput.value.trim();
    const priceRaw = productPriceInput.value.trim();
    const price = parseFloat(priceRaw);
    const pricePerUnitRaw = productPricePerUnitInput.value.trim();
    const pricePerLitreRaw = productPricePerLitreInput.value.trim();
    const pricePerUnit = pricePerUnitRaw === "" ? null : parseFloat(pricePerUnitRaw);
    const pricePerLitre = pricePerLitreRaw === "" ? null : parseFloat(pricePerLitreRaw);
    const stockRaw = productStockInput.value.trim();
    const stock = parseInt(stockRaw, 10);
    const description = productDescriptionInput.value.trim();

    let valid = true;

    // Validations (same as before)
    if (!name) {
        document.getElementById("errorName").textContent = "Por favor, insira o título do produto.";
        valid = false;
    }

    if (!reference) {
        document.getElementById("errorReference").textContent = "Por favor, insira uma referência para o produto.";
        valid = false;
    } else {
        // Check if reference already exists (for uniqueness)
        const existingProducts = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];
        const referenceExists = existingProducts.some(product => 
            product.reference === reference && product.id != editingProductId // Exclude current product if editing
        );
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
        id: editingProductId ? editingProductId : Date.now(), // Use existing ID if editing, otherwise generate new
        reference: reference,
        name,
        price: parseFloat(price.toFixed(2)),
        pricePerUnit: pricePerUnit !== null ? parseFloat(pricePerUnit.toFixed(2)) : null,
        pricePerLitre: pricePerLitre !== null ? parseFloat(pricePerLitre.toFixed(2)) : null,
        stock,
        description,
        image: imageBase64
    };

    let supplierProducts = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];

    if (editingProductId) {
        // Update existing product
        const index = supplierProducts.findIndex(p => p.id == editingProductId);
        if (index !== -1) {
            supplierProducts[index] = product;
            alert("Produto atualizado com sucesso!");
        } else {
            // This case should ideally not happen if productToEdit was found earlier
            alert("Erro: Produto a ser editado não encontrado.");
        }
    } else {
        // Add new product
        supplierProducts.push(product);
        alert("Produto adicionado com sucesso!");
    }
    
    localStorage.setItem("bricoObraSupplierProducts", JSON.stringify(supplierProducts));
    window.location.href = '../html/paginaFornecedor.html'; // Redirect to the products page
});

// Add event listener for the Cancel button
cancelBtn.addEventListener("click", function() {
    window.location.href = '../html/paginaFornecedor.html'; // Redirect to the products page
});