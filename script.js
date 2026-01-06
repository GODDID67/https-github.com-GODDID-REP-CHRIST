let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  alert("Added to cart");
}

function updateCount() {
  let count = cart.reduce((sum, i) => sum + i.qty, 0);
  let el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

function loadCart() {
  let list = document.getElementById("cart-items");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty} — GHS ${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
    total += item.price * item.qty;
  });

  document.getElementById("total").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCount();
}

function checkout() {
  let message = "Hello, I want to order:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} x${item.qty} (GHS ${item.price * item.qty})%0A`;
    total += item.price * item.qty;
  });

  message += `%0ATotal: GHS ${total}`;

  window.open("https://wa.me/23326429422?text=" + message);
}

if (document.getElementById("cart-items")) {
  loadCart();
}

updateCount();
