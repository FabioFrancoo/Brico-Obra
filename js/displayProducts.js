document.addEventListener("DOMContentLoaded", () => {
    const productListings = document.getElementById("productListings");
    const noProductsMessage = document.getElementById("noProductsMessage");

    // Define initial fixed products with consistent structure and unique IDs
    const initialFixedProducts = [
        {
            id: 'prod_001',
            name: "Pincel caiar com cabo",
            reference: "84684317",
            price: 11.02,
            stock: 5,
            description: null,
            image: "../assets/images/pincel_caiar.png",
            pricePerUnit: null,
            pricePerLitre: null
        },
        {
            id: 'prod_002',
            name: "Rolo Dexter universal paredes e tetos 25cm",
            reference: "82799953",
            price: 21.99,
            stock: 12,
            description: null,
            image: "../assets/images/rolo.jpg",
            pricePerUnit: null,
            pricePerLitre: null
        },
        {
            id: 'prod_003',
            name: "Esmalte direto sobre ferrugem. Acetinado. Spray. PROANOX. Branco",
            reference: "82401638",
            price: 14.97,
            stock: 3,
            description: null,
            image: "../assets/images/esmalte.png",
            pricePerUnit: null,
            pricePerLitre: null
        },
        {
            id: 'prod_004',
            name: "Esmalte poliuretano 2 componentes. 10l brilhante. 1.5l branco",
            reference: "82393193",
            price: 218.01,
            stock: 8,
            description: null,
            image: "../assets/images/esmalte (2).png",
            pricePerUnit: null,
            pricePerLitre: 18.96
        },
        {
            id: 'prod_005',
            name: "Verniz interior aquoso acetinado e transparente 0,25l",
            reference: "82179513",
            price: 7.73,
            stock: 10,
            description: null,
            image: "../assets/images/verniz.png",
            pricePerUnit: null,
            pricePerLitre: 30.92
        },
        {
            id: 'prod_006',
            name: "Rolo fita Semi-Crep 45m x 48 mm",
            reference: "82556833",
            price: 3.44,
            stock: 48,
            description: null,
            image: "../assets/images/rolo_fitacola.png",
            pricePerUnit: null,
            pricePerLitre: null
        },
        {
            id: 'prod_007',
            name: "Tinta plástica antibolor antiverdete. Mate seda branca 4L. REVEPROA",
            reference: "84684317",
            price: 48.69,
            stock: 21,
            description: "Tinta plástica mate seda branca com propriedades antibolores e antiverdete. Volume: 4 litros.",
            image: "../assets/images/tinta_plastica.png",
            pricePerUnit: null,
            pricePerLitre: 12.17
        },
        {
            id: 'prod_008',
            name: "Misturador 14Mm/1600W Werku WK400130",
            reference: "82799953",
            price: 142.01,
            stock: 0,
            description: null,
            image: "../assets/images/misturador.png",
            pricePerUnit: null,
            pricePerLitre: null
        },
        {
            id: 'prod_009',
            name: "Óleo para teca. Proteção e nutrição para a madeira transparente 0,75L",
            reference: "82401638",
            price: 7.90,
            stock: 28,
            description: null,
            image: "../assets/images/oleo.png",
            pricePerUnit: null,
            pricePerLitre: 10.53
        }
    ];

    let dynamicProducts = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];

    const uniqueDynamicProducts = dynamicProducts.filter(dynamicProd => {
        return !initialFixedProducts.some(fixedProd => fixedProd.id === dynamicProd.id);
    });

    let allProductsToDisplay = [...initialFixedProducts, ...uniqueDynamicProducts];

    // Initialize localStorage with fixed products if it's empty or doesn't exist
    if (!localStorage.getItem("bricoObraSupplierProducts") || JSON.parse(localStorage.getItem("bricoObraSupplierProducts")).length === 0) {
        localStorage.setItem("bricoObraSupplierProducts", JSON.stringify(initialFixedProducts));
        allProductsToDisplay = initialFixedProducts; // Ensure we display them immediately
    }


    if (allProductsToDisplay.length === 0) {
        noProductsMessage.classList.remove("hidden");
        return;
    } else {
        noProductsMessage.classList.add("hidden");
    }

    productListings.innerHTML = '';

    allProductsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 max-w-sm w-full";

        // Separate price details for unit and litre
        let pricePerUnitHtml = product.pricePerUnit ? `<p class="text-gray-600 text-sm">Ou ${product.pricePerUnit.toFixed(2)}€ / unidade</p>` : '';
        let pricePerLitreHtml = product.pricePerLitre ? `<p class="text-gray-600 text-sm">Ou ${product.pricePerLitre.toFixed(2)}€ / Litro</p>` : '';

        const descriptionHtml = product.description ? `<p class="text-gray-700 text-sm mt-2">${product.description}</p>` : '';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain">
            <div class="p-6">
                <h3 class="text-base font-semibold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-gray-600">Ref ${product.reference}</p>
                <p class="text-black-600">${product.price.toFixed(2)}€</p>
                ${pricePerUnitHtml}
                ${pricePerLitreHtml}
                ${descriptionHtml}
                <p class="font-bold mt-2">Stock: ${product.stock}</p>
                <div class="mt-4 pt-4 border-t border-gray-200 text-center flex justify-around">
                    <button data-product-id="${product.id}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition edit-btn">Editar</button>
                    <button data-product-id="${product.id}" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition delete-btn">Remover</button>
                </div>
            </div>
        `;
        productListings.appendChild(productCard);
    });

    productListings.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productIdToDelete = event.target.dataset.productId;
            deleteProduct(productIdToDelete);
        } else if (event.target.classList.contains('edit-btn')) { // Added 'edit-btn' listener
            const productIdToEdit = event.target.dataset.productId;
            // Redirect to the publish/edit page with the product ID as a URL parameter
            window.location.href = `publicarProduto.html?id=${productIdToEdit}`;
        }
    });

    function deleteProduct(idToDelete) {
        let productsInStorage = JSON.parse(localStorage.getItem("bricoObraSupplierProducts")) || [];
        const initialLength = productsInStorage.length;

        // Filter out the product to delete. Use loose comparison (==) for string/number IDs.
        productsInStorage = productsInStorage.filter(product => product.id != idToDelete);

        if (productsInStorage.length < initialLength) {
            localStorage.setItem("bricoObraSupplierProducts", JSON.stringify(productsInStorage));
            alert("Produto removido com sucesso!");
            location.reload(); // Reload the page to reflect changes
        } else {
            alert("Erro: Produto não encontrado em seu inventário.");
        }
    }
});