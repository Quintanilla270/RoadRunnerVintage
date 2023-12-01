document.addEventListener('DOMContentLoaded', function() {
    const checkoutItemList = document.getElementById('checkout-review-items');
    const subtotalPriceElement = document.getElementById('subtotal');
    const shippingPriceElement = document.getElementById('shipping');
    const totalPriceElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const isLoggedIn = sessionStorage.getItem('user') !== null;
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    let username = null;
    let user = null;

    window.addEventListener('load', function() {
        displayCartContents();
    });

    function submitOrder() {
        // Grab order details from order summary section
        var orderSummary = document.getElementById('order-summary');
        var orderSummaryContent = orderSummary.innerHTML;
    
        // Make a request to send order to server
        alert('Finalizing order:\n\n' + orderSummaryContent);
    
        window.location.href = 'order_confirmation.html';
    }

    function displayCartContents() {
        checkoutItemList.innerHTML = '';
        subtotalPriceElement.textContent = '0.00';
        shippingPriceElement.textContent = '0.00';
        totalPriceElement.textContent = '0.00';

        let checkoutItems = 0;
        let subtotalPrice = 0;
        let shippingPrice = 4.99;
        let totalPrice = 0;

        console.log(storedCart);

        storedCart.forEach(product => {
            const checkoutItem = document.createElement('div');
            checkoutItem.className = 'checkout-item';
            checkoutItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Qty: ${product.count}</p>
                <p>Price: $${(product.price * product.count).toFixed(2)}</p>
            `;

            checkoutItems += product.count;
            subtotalPrice += product.price * product.count
            totalPrice += subtotalPrice + shippingPrice;

            checkoutItemList.appendChild(checkoutItem);
        });

        shippingPriceElement.textContent = shippingPrice.toFixed(2);
        subtotalPriceElement.textContent = subtotalPrice.toFixed(2);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    if (isLoggedIn) {
        username = sessionStorage.getItem('user');

        fetch('/php/get_user_info.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}`,
        })      
        .then(response => response.text())
        .then(data => {
            try {
                const userData = JSON.parse(data);
                const fname = document.getElementById('fname');
                const address = document.getElementById('address');
                const city = document.getElementById('city');
                const state = document.getElementById('state');
                const zip = document.getElementById('zip');

                console.log('Data:', userData);
                console.log('Data:', userData.fname);

                if (userData.success) {
                    console.log("Updating [" + username + "] login session storage...")
                    sessionStorage.setItem('user', username);

                    fname.textContent = userData.fname + " " + userData.lname;
                    address.textContent = userData.address;
                    city.textContent = userData.city;
                    state.textContent = userData.state;
                    zip.textContent = userData.zipcode;

                } else {
                    alert(`User is not logged in. ${userData.message}`);
                }
            } catch (error) {
                // Handle the case where the response is not valid JSON
                console.error('Error parsing JSON:', error);
                alert('An error occurred during login. Please try again.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred during the fetch. Please try again.');
        });
    } else {
        sessionStorage.setItem('redirectFrom', 'checkout');
        window.location.href = 'login.html';
    }
});