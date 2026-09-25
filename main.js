// Edit this list to update Featured Products. "url" = the product's Shopee link; "rating" (1-5) and "reviews" = its real Shopee rating and review count.
const SHOPEE = "https://shopee.ph/whatsupmommah";
const products = [
  { name: "Explorer Bag | Kids Travel Organizer",  price: 2500, rating: 5, reviews: 128, img: "assets/prod-explorer.jpg",   url: SHOPEE },
  { name: "Rope Diaper Caddy Bag",                 price: 1799, rating: 5, reviews: 95, img: "assets/prod-rope.jpg",       url: SHOPEE },
  { name: "Kids Compression Packing Cube Set",     price: 1795, rating: 5, reviews: 76, img: "assets/prod-cubes.jpg",      url: SHOPEE },
  { name: "Felt Diaper Caddy Bag",                 price: 1495, rating: 5, reviews: 64, img: "assets/prod-felt.jpg",       url: SHOPEE },
  { name: "Woodpecker & Worm Feeding Game",        price: 850,  rating: 5, reviews: 83, img: "assets/prod-woodpecker.jpg", url: SHOPEE },
  { name: "Multifunctional Push Cart Baby Walker", price: 2549, rating: 5, reviews: 52, img: "assets/prod-walker.jpg",     url: SHOPEE },
];

const heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/></svg>';
const grid = document.getElementById("product-grid");
grid.innerHTML = products.map(p => `
  <article class="prod">
    <button class="wish" aria-label="Save ${p.name.replace(/&/g,"&amp;")}">${heart}</button>
    <img src="${p.img}" alt="${p.name.replace(/&/g,"&amp;")}" loading="lazy">
    <h3>${p.name.replace(/&/g,"&amp;")}</h3>
    <div class="price">₱${p.price.toLocaleString()}</div>
    <div class="stars" aria-label="${p.rating} out of 5 stars, ${p.reviews} reviews">${"\u2605".repeat(p.rating)}<i>(${p.reviews})</i></div>
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
links.addEventListener("click", e => { if (!e.target.closest(".sub-toggle")) links.classList.remove("open"); });

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

// scroll-to-top button: appears after scrolling down
const toTop = document.getElementById("to-top");
const toggleTop = () => toTop.classList.toggle("show", window.scrollY > 400);
window.addEventListener("scroll", toggleTop, { passive: true });
toggleTop();
toTop.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});

// header "Socials" dropdown: tap/click to toggle (hover also works on desktop)
const subToggle = document.querySelector(".sub-toggle"), hasSub = document.querySelector(".has-sub");
subToggle.addEventListener("click", e => {
  e.preventDefault();
  const open = hasSub.classList.toggle("open");
  subToggle.setAttribute("aria-expanded", open);
});
document.addEventListener("click", e => {
  if (!hasSub.contains(e.target)) { hasSub.classList.remove("open"); subToggle.setAttribute("aria-expanded", "false"); }
});
