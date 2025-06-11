const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active')
    })
}
if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}



// sproduct
function viewProduct(name, image, price) {
        const product = {
        name: name,
        image: image,
        price: price
        };
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'sproduct.html';
        }


         window.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('MainImg').src = product.image;
    }
});




//cart page 
function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ name, image, price, quantity: 1 });
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to cart!");
}



    window.addEventListener('DOMContentLoaded', () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartTable = document.getElementById('cart-items');
        let subtotal = 0;

        cartItems.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <i class="far fa-times-circle" onclick='removeFromCart("${item.name}", "${item.size}")' style="cursor:pointer;"></i>
            </td>
            <td>${item.size}</td>
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', '${item.size}', this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartTable.appendChild(row);
    });

    // Calculate shipping
    const shipping = subtotal >= 500 || subtotal==0 ? 0 : 60;
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
    });

    
    function removeFromCart(name, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Find and remove the item with matching name and size
    cart = cart.filter(item => !(item.name === name && item.size === size));
    
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Refresh the page to update UI
}




    function updateQuantity(name, size, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name && item.size === size);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    }
}










//sproduct.html js
document.getElementById('add-to-cart').addEventListener('click', function () {
    const name = document.getElementById('product-name').innerText;
    const price = parseFloat(document.getElementById('product-price').innerText.replace('$', ''));
    const size = document.getElementById('product-size').value;
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const image = document.getElementById('MainImg').src;

    if (size === 'Select Size') {
      alert("Please select a size.");
      return;
    }

    const cartItem = {
      name,
      price,
      size,
      quantity,
      image
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Redirect to cart page
    window.location.href = 'shop.html'; // or your cart section page
  });




  document.querySelector('form').addEventListener('submit', function () {
  alert("Thanks! Your message has been sent.");
});

