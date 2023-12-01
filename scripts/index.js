document.addEventListener('DOMContentLoaded', function() {
    const shoppingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartLink = document.getElementById('cart-link');
    let products;
    let currentSortingOption = 'latest';
    let cartCount = 0;
    shoppingCart.forEach(item => { cartCount += 1 * item.count; });

    // Function to fetch products asynchronously
    async function fetchProducts(section) {
        try {
            const response = await fetch('/php/get_products.php');
            products = await response.json();
            const sortedProducts = sortProducts([...products], currentSortingOption);

            if (section === 'featured-products') {
                displayFeaturedProducts(sortedProducts);
            } else if (section === 'all-products') {
                displayAllProducts(sortedProducts);
            } else if (section === 'all') {
                displayFeaturedProducts(sortedProducts);
                displayAllProducts(sortedProducts);
            }

            updateCartDisplay();
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
    function displayFeaturedProducts(products) {
        const featuredProductsSection = document.querySelector('.featured-products');
        featuredProductsSection.innerHTML = '';

        products.forEach(product => {
            if (product.featured == "1") {
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
                const addToCartButton = productCard.querySelector('button');
                addToCartButton.addEventListener('click', function() {
                    addToCart(product);
                });
            }
        });
    }

    function displayAllProducts(products) {
        const allProductsSection = document.querySelector('.all-products');
        allProductsSection.innerHTML = '';

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

            allProductsSection.appendChild(productCard);
            const addToCartButton = productCard.querySelector('button');
            addToCartButton.addEventListener('click', function() {
                addToCart(product);
            });
        });
    }

    const sortingDropdownFeatured = document.getElementById('sort-featured');
    sortingDropdownFeatured.addEventListener('change', function() {
        currentSortingOption = sortingDropdownFeatured.value;
        fetchProducts('featured-products');
    });

    const sortingDropdownAll = document.getElementById('sort-all');
    sortingDropdownAll.addEventListener('change', function() {
        currentSortingOption = sortingDropdownAll.value;
        fetchProducts('all-products');
    });

    function updateSessionStorage() {
        console.log("Updating cart session storage...")
        sessionStorage.setItem('cart', JSON.stringify(shoppingCart));
    }
    
    function getProductByName(name) {
        return products.find(product => product.name === name);
    }

    function addToCart(product) {
        console.log("Product requested:");
        console.log(product);
        var existingProduct = shoppingCart.find(item => item.name === product.name);

        if (existingProduct) {
            console.log("Existing product [" + existingProduct.name + "]");
            // If the desired quantity is less than or equal to the product's availability, increment the count
            if (existingProduct.count < existingProduct.maxqty) {
                console.log("Adding existing product [" + existingProduct.name + "]");
                existingProduct.count++;
                cartCount++;
                updateCartDisplay();
                updateSessionStorage();
            } else {
                window.alert("Warning: Cannot add more items than quantity availability!");
                console.log("Product [" + product.name + "] was not added.");
            }
        } else {
            console.log("New product [" + product.name + "]");
            console.log(product);
            // If the desired quantity is less than or equal to the product's availability, add the product to the cart
            if (product.quantity_available > 0) {
                console.log("Adding new product... " + product.name);
                shoppingCart.push({
                    name: product.name,
                    price: parseFloat(product.price),
                    maxqty: parseInt(product.quantity_available),
                    count: 1,
                    image: product.image_url
                });
                cartCount++;
                updateCartDisplay();
                updateSessionStorage();
            }
        }
    }

    function updateCartDisplay() {
        cartLink.textContent = `Cart (${cartCount})`;
    }

    // Fetch products when the page loads
    window.addEventListener('load', function () {
        fetchProducts('all');
    });

    function callPhpFile() {
        fetch('index.php')
            .then(response => response.text())
            .then(data => {
                // Display the result in an HTML element with id 'result'
                document.getElementById('result').innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
    }
    
});