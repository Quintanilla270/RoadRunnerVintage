const shoppingCart = [];
const cartLink = document.getElementById('cart-link');
let cartCount = 0;

function addToCart(product) {
    cartCount++;
    cartLink.textContent = `Cart (${cartCount})`;
    shoppingCart.push(product);
    updateCartDisplay();
}

document.querySelector('.featured-products').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3').textContent;
            const product = getProductByName(productName);

            if (product) {
                addToCart(product);
            }
        }
    }
});

function getProductByName(name) {
    return products.find(product => product.name === name);
}

// Fetch products when the page loads
window.addEventListener('load', fetchProducts);
