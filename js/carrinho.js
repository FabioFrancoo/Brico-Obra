document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const checkoutButton = document.querySelector('.checkout-button');

    function saveCartToLocalStorage(cartData) {
        localStorage.setItem('bricoObraCart', JSON.stringify(cartData));
    }

    function getCartFromLocalStorage() {
        const cartData = localStorage.getItem('bricoObraCart');
        return cartData ? JSON.parse(cartData) : [];
    }

    function updateTotals() {
        let subtotal = 0;
        const cartData = [];

        cartItems.forEach(item => {
            const priceText = item.querySelector('.item-price').textContent.trim();
            const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            subtotal += price * quantity;

            const name = item.querySelector('.item-name').textContent.trim();
            const ref = item.querySelector('.item-ref').textContent.trim();

            cartData.push({ name, ref, price, quantity });
        });

        console.log('Saving cart data to localStorage (bricoObraCart):', cartData);
        saveCartToLocalStorage(cartData);

        const totalsRows = document.querySelectorAll('.totals-row');
        let subtotalElement = null;
        let deliveryElement = null;
        if (totalsRows.length >= 2) {
            subtotalElement = totalsRows[0].querySelector('.totals-value');
            deliveryElement = totalsRows[1].querySelector('.totals-value');
        }
        if (subtotalElement) {
            subtotalElement.textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
        }

        let deliveryFee = 2.99;

        if (deliveryElement) {
            deliveryElement.textContent = deliveryFee.toFixed(2).replace('.', ',') + ' €';
        }

        const totalElement = document.querySelector('.totals-row.total-row .totals-value');
        if (totalElement) {
            const total = subtotal + deliveryFee;
            totalElement.textContent = total.toFixed(2).replace('.', ',') + ' €';

            console.log('Saving totals to localStorage (bricoObraTotals):', { subtotal: subtotal, deliveryFee: deliveryFee, total: total });
            localStorage.setItem('bricoObraTotals', JSON.stringify({
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total
            }));
        }
    }

    // Event listeners for quantity controls
    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.quantity-btn.minus');
        const plusBtn = item.querySelector('.quantity-btn.plus');
        const quantityInput = item.querySelector('.quantity-input');

        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateTotals();
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updateTotals();
        });

        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
            updateTotals();
        });
    });

    // Add event listener for the checkout button
    checkoutButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default form submission

        window.location.href = 'dadosentrega.html';
    });

    // Initial totals update on page load
    updateTotals();
});