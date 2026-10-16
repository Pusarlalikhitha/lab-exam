
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "Electronics",
    image: "https://placehold.co/300x200?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "Electronics",
    image: "https://placehold.co/300x200?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    category: "Fashion",
    image: "https://placehold.co/300x200?text=Shoes"
  },
  {
    id: 4,
    name: "Casual T-Shirt",
    price: 599,
    category: "Fashion",
    image: "https://placehold.co/300x200?text=T-Shirt"
  },
  {
    id: 5,
    name: "Table Lamp",
    price: 899,
    category: "Home",
    image: "https://placehold.co/300x200?text=Lamp"
  },
  {
    id: 6,
    name: "Coffee Mug",
    price: 299,
    category: "Home",
    image: "https://placehold.co/300x200?text=Mug"
  }
];

let cart = [];
let activeCategory = "All";

const formatPrice = price =>
  new Intl.NumberFormat("en-IN").format(price);

function renderProducts() {
  const search = document.getElementById("search").value
    .toLowerCase();

  const filtered = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search);

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  document.getElementById("product-list").innerHTML =
    filtered.length
      ? filtered.map(product => `
          <article class="product">
            <img src="${product.image}"
                 alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p class="price">₹${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">
              Add to Cart
            </button>
          </article>
        `).join("")
      : "<p>No products found.</p>";
}

function filterProducts(category) {
  activeCategory = category;
  renderProducts();
}

function addToCart(id) {
  const item = cart.find(product => product.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find(product => product.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  toggleCart(true);
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += amount;
  cart = cart.filter(product => product.quantity > 0);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(product => product.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("count").textContent = count;
  document.getElementById("total").textContent =
    formatPrice(total);

  document.getElementById("cart-items").innerHTML =
    cart.length
      ? cart.map(item => `
          <div class="cart-item">
            <div>
              <strong>${item.name}</strong>
              <p>₹${formatPrice(item.price)} × ${item.quantity}</p>
              <button onclick="changeQuantity(${item.id}, -1)">−</button>
              <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button onclick="removeItem(${item.id})">Remove</button>
          </div>
        `).join("")
      : "<p>Your cart is empty.</p>";
}

function toggleCart(forceOpen) {
  const cartElement = document.getElementById("cart");

  if (forceOpen === true) {
    cartElement.classList.remove("hidden");
  } else {
    cartElement.classList.toggle("hidden");
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(
    `Demo checkout\nTotal: ₹${formatPrice(total)}\n` +
    "No payment has been collected."
  );
}

document.getElementById("search")
  .addEventListener("input", renderProducts);

renderProducts();
renderCart();