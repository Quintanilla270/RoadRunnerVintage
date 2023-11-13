// script.js

// Function to fetch products asynchronously
async function fetchProducts() {
    try {
        const response = await fetch('/php/get_products.php');
        const products = await response.json();
        
        // Call a function to populate the products on the page
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display products on the page
function displayProducts(products) {
    const featuredProductsSection = document.querySelector('.featured-products');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>Qty:${product.quantity_available}</p>
            <button>Add to Cart</button>
        `;

        featuredProductsSection.appendChild(productCard);
    });
}

// Fetch products when the page loads
window.addEventListener('load', fetchProducts);
