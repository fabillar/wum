// Edit this list to update Featured Products. "url" should be the product's Shopee link.
const SHOPEE = "https://shopee.ph/whatsupmommah";
const products = [
  { name: "Wooden Rainbow Stacker",   price: 699, rating: 5, reviews: 128, img: "assets/p-stacker.jpg", url: SHOPEE },
  { name: "Good Night Little One Board Book", price: 349, rating: 5, reviews: 95, img: "assets/p-book.jpg", url: SHOPEE },
  { name: "Silicone Sippy Cup",       price: 499, rating: 5, reviews: 76,  img: "assets/p-cup.jpg",   url: SHOPEE },
  { name: "Bashful Bunny Plush Toy",  price: 899, rating: 5, reviews: 64,  img: "assets/p-bunny.jpg", url: SHOPEE },
  { name: "Silicone Suction Bowl Set", price: 599, rating: 5, reviews: 83, img: "assets/p-bowl.jpg",  url: SHOPEE },
];

const heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/></svg>';
const grid = document.getElementById("product-grid");
grid.innerHTML = products.map(p => `
  <article class="prod">
    <button class="wish" aria-label="Save ${p.name}">${heart}</button>
    <img src="${p.img}" alt="${p.name}" loading="lazy">
    <h3>${p.name}</h3>
    <div class="price">₱${p.price.toLocaleString()}</div>
    <div class="stars">${"★".repeat(p.rating)}<i>(${p.reviews})</i></div>
    <a class="btn" href="${p.url}" target="_blank" rel="noopener">Add to Cart</a>
  </article>`).join("");

// wishlist toggle + counter
const count = document.getElementById("cart-count");
grid.addEventListener("click", e => {
  const w = e.target.closest(".wish");
  if (w) w.classList.toggle("on");
});
grid.addEventListener("click", e => {
  if (e.target.closest(".prod .btn")) count.textContent = +count.textContent + 1;
});

// mobile nav
const toggle = document.querySelector(".nav-toggle"), links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", () => links.classList.remove("open"));

document.getElementById("yr").textContent = new Date().getFullYear();

// newsletter sign-up (front-end only: post to Mailchimp/Klaviyo/etc. here to collect real emails)
const form = document.getElementById("signup"), msg = document.getElementById("form-msg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email");
  if (!email.value.trim() || !email.checkValidity()) { msg.textContent = "Please enter a valid email address."; email.focus(); return; }
  msg.textContent = "Thank you, mommah! You’re on the list ♥";
  form.reset();
});
