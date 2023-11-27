document.addEventListener('DOMContentLoaded', function() {
    const loginSubmitBtn = document.getElementById('login-submit');

    loginSubmitBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Send a POST request to login_handler.php
        /// updating content-type from application/x-www-form-urlencoded
        fetch('/php/login_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        })
        .then(response => {
            console.log('Response:', response);
            return response.text();
            //return response.json();
        })        
        .then(data => {
            console.log('Data:', data);
            data = JSON.parse(data);
            
            if (data.success) {
                console.log("Updating [" + username + "] login session storage...")
                sessionStorage.setItem('user', username);

                if (sessionStorage.getItem('redirectFrom') == "checkout") {
                    window.location.href = 'cart.html';
                } else {
                    window.location.href = sessionStorage.getItem('redirectFrom');
                }
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    if (sessionStorage.getItem('redirectFrom') == "checkout") {
        alert('Please login to continue checkout.');
    }
});
