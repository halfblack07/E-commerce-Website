// Navbar toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// ----------------------
// View product & Load it on sproduct.html
// ----------------------
function viewProduct(name, image, price) {
    const product = { name, image, price };
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'sproduct.html';
}

window.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        const nameEl = document.getElementById('product-name');
        const priceEl = document.getElementById('product-price');
        const imgEl = document.getElementById('MainImg');
        if (nameEl && priceEl && imgEl) {
            nameEl.textContent = product.name;
            priceEl.textContent = `$${product.price.toFixed(2)}`;
            imgEl.src = product.image;
        }
    }
});

// ----------------------
// Add to Cart from sproduct.html
// ----------------------
const addToCartBtn = document.getElementById('add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
        const name = document.getElementById('product-name').innerText;
        const price = parseFloat(document.getElementById('product-price').innerText.replace('$', ''));
        const size = document.getElementById('product-size').value;
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const image = document.getElementById('MainImg').src;

        if (size === 'Select Size') {
            alert("Please select a size.");
            return;
        }

        const cartItem = { name, price, size, quantity, image };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if same item with same size exists → increase quantity
        const existingIndex = cart.findIndex(item => item.name === name && item.size === size);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirect or show message
        alert("Item added to cart!");
        window.location.href = 'shop.html'; // or cart.html
    });
}

// ----------------------
// Render Cart on cart.html
// ----------------------
window.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-items');

    if (cartTable && cartItems.length > 0) {
        let subtotal = 0;

        cartItems.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><i class="far fa-times-circle" onclick='removeFromCart("${item.name}", "${item.size}")' style="cursor:pointer;"></i></td>
                <td>${item.size}</td>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', '${item.size}', this.value)"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartTable.appendChild(row);
        });

        // Calculate shipping and total
        const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 60;
        const total = subtotal + shipping;

        const subtotalTable = document.querySelector('#subtotal table');
        if (subtotalTable) {
            subtotalTable.innerHTML = `
                <tr>
                    <td>Cart Subtotal</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$${total.toFixed(2)}</strong></td>
                </tr>
            `;
        }
    }
});

// ----------------------
// Remove Item from Cart
// ----------------------
function removeFromCart(name, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.name === name && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// ----------------------
// Update Quantity in Cart
// ----------------------
function updateQuantity(name, size, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name && item.size === size);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    }
}

// ----------------------
// Contact form submit (optional)
// ----------------------
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function () {
        alert("Thanks! Your message has been sent.");
    });
}
