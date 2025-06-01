document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');

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

        console.log('Saving cart data to localStorage:', cartData);
        // Save cart data to localStorage
        saveCartToLocalStorage(cartData);

        // Update subtotal display
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

        // Get delivery fee
        let deliveryFee = 2.99; // Fixed delivery fee

        if (deliveryElement) {
            deliveryElement.textContent = deliveryFee.toFixed(2).replace('.', ',') + ' €';
        }

        // Update total display
        const totalElement = document.querySelector('.totals-row.total-row .totals-value');
        if (totalElement) {
            const total = subtotal + deliveryFee;
            totalElement.textContent = total.toFixed(2).replace('.', ',') + ' €';

            // Save totals to localStorage
            localStorage.setItem('bricoObraTotals', JSON.stringify({
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total
            }));
        }
    }

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
            // Fix increment to add only 1
            quantityInput.value = currentValue + 1;
            updateTotals();
        });
    });

    // Initial totals update on page load
    updateTotals();
});
