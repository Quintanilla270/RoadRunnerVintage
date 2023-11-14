// script.js
const shoppingCart = [];
const cartLink = document.getElementById('cart-link');
let currentSortingOption = 'latest';
let cartCount = 0;

// Function to fetch products asynchronously
async function fetchProducts() {
    try {
        const response = await fetch('/php/get_products.php');
        const products = await response.json();
        
        const sortedProducts = sortProducts(products, currentSortingOption);
        // Call a function to populate the products on the page
        displayProducts(sortedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function sortProducts(products, sortingOption) {
    if (sortingOption === 'latest') {
        return products.sort((a, b) => b.date_added - a.date_added);
    } else if (sortingOption === 'price-low-to-high') {
        return products.sort((a, b) => a.price - b.price);
    } else if (sortingOption === 'price-high-to-low') {
        return products.sort((a, b) => b.price - a.price);
    }

    return products;
}

// Function to display products on the page
function displayProducts(products) {
    const featuredProductsSection = document.querySelector('.featured-products');

    // Clear the existing content of the featured products section
    featuredProductsSection.innerHTML = '';

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

const sortingDropdown = document.getElementById('sort-products');
sortingDropdown.addEventListener('change', function() {
    currentSortingOption = sortingDropdown.value;
    fetchProducts();
});

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

// Fetch products when the page loads
window.addEventListener('load', fetchProducts);
