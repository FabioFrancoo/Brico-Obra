document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');

    function updateTotals() {
        let subtotal = 0;
        cartItems.forEach(item => {
            const priceText = item.querySelector('.item-price').textContent.trim();
            const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            subtotal += price * quantity;
        });

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
        let deliveryFee = 0;
        if (deliveryElement) {
            const deliveryText = deliveryElement.textContent.trim();
            deliveryFee = parseFloat(deliveryText.replace('€', '').replace(',', '.'));
        }

        // Update total display
        const totalElement = document.querySelector('.totals-row.total-row .totals-value');
        if (totalElement) {
            const total = subtotal + deliveryFee;
            totalElement.textContent = total.toFixed(2).replace('.', ',') + ' €';
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
            quantityInput.value = currentValue + 1;
            updateTotals();
        });
    });

    // Initial totals update on page load
    updateTotals();
});
