document.addEventListener('DOMContentLoaded', function() {
    const loginSubmitBtn = document.getElementById('login-submit');

    loginSubmitBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Send a POST request to login_handler.php
        fetch('/php/login_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        })
        .then(response => response.text())
        .then(data => {
            console.log('Data received:', data); // Add this line to inspect the data

            try {
                data = JSON.parse(data);
                console.log('Data:', data);
        
                if (data.success) {
                    console.log("Updating [" + username + "] login session storage...")
                    sessionStorage.setItem('user', username);
        
                    if (sessionStorage.getItem('redirectFrom') == "cart") {
                        window.location.href = 'cart.html';
                    } else {
                        window.location.href = sessionStorage.getItem('redirectFrom');
                    }
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('An error occurred during login. Please try again.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred during the fetch. Please try again.');
        });
    });

    if (sessionStorage.getItem('redirectFrom') == "checkout") {
        alert('Please login to continue checkout.');
    }
});