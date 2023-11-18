document.addEventListener('DOMContentLoaded', function() {
    const loginStatus = document.getElementById('login-status');
    const logoutStatus = document.getElementById('logout-status');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.getElementById('login-btn');
    const isLoggedIn = sessionStorage.getItem('user') !== null;

    if (isLoggedIn) {
        loginStatus.style.display = 'block';
        logoutStatus.style.display = 'none';
    } else {
        loginStatus.style.display = 'none';
        logoutStatus.style.display = 'block';
    }

    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('user');
        window.location.reload();
    });

    loginBtn.addEventListener('click', function() {
        sessionStorage.setItem('redirectFrom', window.location.href);
        window.location.href = 'login.html';
    });
});
