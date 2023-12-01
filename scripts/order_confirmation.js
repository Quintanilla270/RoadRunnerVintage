document.addEventListener('DOMContentLoaded', function() {
    const cartList = document.getElementById('cart-list');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalItemsElement = document.getElementById('subtotal');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const loginLink = document.getElementById('login-link');

    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];

    window.addEventListener('load', function() {
        if (storedCart.length == 0) {
            console.log(storedCart.length);
            const cartItems = document.querySelector('.cart-items');
            cartItems.innerHTML = `
            <h3>Your cart is empty!</h3>
            <br />
            <h3>Check out our <a href="index.html">nostalgic catalog</a>!</h3>
            `;
        } else {
            displayCartContents();
        }
    });

    checkoutBtn.addEventListener('click', function() {
        if (!isLoggedIn()) {
            sessionStorage.setItem('redirectFrom', 'cart');
            window.location.href = 'login.html';
        } else {
            sessionStorage.setItem('redirectFrom', 'cart');
            window.location.href = 'checkout.html';
        }
    });

    function displayCartContents() {
        cartList.innerHTML = '';
        totalItemsElement.textContent = '0';
        totalPriceElement.textContent = '0.00';

        let totalItems = 0;
        let totalPrice = 0;

        console.log(storedCart);

        storedCart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Qty: ${product.count}</p>
                <p>Price: $${(product.price * product.count).toFixed(2)}</p>
                <button class="remove-button">Remove</button>
            `;

            const removeButton = cartItem.querySelector('.remove-button');
            removeButton.addEventListener('click', function() {
                removeFromCart(product);
                displayCartContents();
                location.reload();
            });

            totalItems += product.count;
            totalPrice += product.price * product.count;

            cartList.appendChild(cartItem);
        });

        subtotalItemsElement.textContent = totalPrice.toFixed(2);
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function isLoggedIn() {
        return sessionStorage.getItem('user') !== null;
    }
});