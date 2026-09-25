// Edit this list to update Featured Products. "url" = the product's Shopee link; "rating" (1-5) and "reviews" = its real Shopee rating and review count.
const SHOPEE = "https://shopee.ph/whatsupmommah";
const products = [
  { name: "Explorer Bag | Kids Travel Organizer",  price: 2500, rating: 5, reviews: 128, img: "assets/prod-explorer.jpg",   url: "https://shopee.ph/Whatsupmommah-Explorer-Bag-Kids-Travel-Organizer-Multi-Pocket-Toy-Organizer-Baby-Kids-Bag-i.296186146.45406681205" },
  { name: "Rope Diaper Caddy Bag",                 price: 1799, rating: 5, reviews: 95, img: "assets/prod-rope.jpg",       url: "https://shopee.ph/Whatsupmommah-Rope-Diaper-Caddy-Bag-Baby-Nursery-Organizer-Cotton-Rope-Baby-Essentials-i.296186146.14001294090" },
  { name: "Kids Compression Packing Cube Set",     price: 1795, rating: 5, reviews: 76, img: "assets/prod-cubes.jpg",      url: "https://shopee.ph/WhatsUpMommah-Kids-Compression-Packing-Cube-Set-Travel-Organizer-for-Luggage-Space-Saving-i.296186146.41579592811" },
  { name: "Felt Diaper Caddy Bag",                 price: 1495, rating: 5, reviews: 64, img: "assets/prod-felt.jpg",       url: "https://shopee.ph/Whatsupmommah-Felt-Diaper-Caddy-Bag-Baby-Nursery-Storage-Organizer-Portable-Nappy-Diapper-Caddy-i.296186146.5469220751" },
  { name: "Woodpecker & Worm Feeding Game",        price: 850,  rating: 5, reviews: 83, img: "assets/prod-woodpecker.jpg", url: "https://shopee.ph/Whatsupmommah-Woodpecker-Worm-Feeding-Game-by-Topbright-i.296186146.48060234783" },
  { name: "Multifunctional Push Cart Baby Walker", price: 2549, rating: 5, reviews: 52, img: "assets/prod-walker.jpg",     url: "https://shopee.ph/Whatsupmommah-Outlet-Multifunctional-Push-Cart-Baby-Walker-with-Piano-i.296186146.8864351041" },
];

const heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/></svg>';
const grid = document.getElementById("product-grid");
grid.innerHTML = products.map(p => `
  <article class="prod">
    <button class="wish" aria-label="Save ${p.name.replace(/&/g,"&amp;")}">${heart}</button>
    <img src="${p.img}" alt="${p.name.replace(/&/g,"&amp;")}" loading="lazy">
    <h3><a class="card-link" href="${p.url}" target="_blank" rel="noopener">${p.name.replace(/&/g,"&amp;")}</a></h3>
    <div class="meta">
      <div class="price">₱${p.price.toLocaleString()}</div>
      <div class="stars" aria-label="${p.rating} out of 5 stars, ${p.reviews} reviews">${"\u2605".repeat(p.rating)}<i>(${p.reviews})</i></div>
    </div>
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

// scroll reveal: fade/slide elements in as they enter the viewport
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 821px)").matches;
  const groups = [
    [".cats a", "zoom", 6],
    [".duo .promo", "up", 2],
    [".section-head", "up", 1],
    [".slider", "up", 1],
    [".story-media", "left", 1],
    [".story-copy", "right", 1],
    [".news-photo", "left", 1],
    [".news-copy", "up", 1],
    [".news-bunny", "right", 1],
    [".foot-main > *", "up", 5],
    [".foot-base .base-in > *", "up", 3],
  ];
  if (desktop) groups.push([".hero-body", "up", 1]); // mobile hero already has its own intro animation
  const items = [];
  groups.forEach(([sel, variant, cols]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      if (variant !== "up") el.dataset.reveal = variant;
      el.style.setProperty("--d", ((i % cols) * 0.09).toFixed(2) + "s");
      items.push(el);
    });
  });
  const done = el => setTimeout(() => {           // hand the element back to its normal styles (hover effects etc.)
    el.classList.remove("reveal", "in"); el.removeAttribute("data-reveal"); el.style.removeProperty("--d");
  }, 1500);
  const show = el => { el.classList.add("in"); done(el); };
  if (reduce || !("IntersectionObserver" in window)) { items.forEach(show); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  items.forEach(el => io.observe(el));
})();

// featured products: max 5 visible on desktop, slides left/right when there are more
(() => {
  const slider = document.getElementById("slider"), track = document.getElementById("product-grid");
  const prev = slider.querySelector(".sl-prev"), next = slider.querySelector(".sl-next");
  const VISIBLE = 5, mq = window.matchMedia("(min-width: 1000px)");
  let index = 0, timer;
  const cards = () => [...track.children];
  const max = () => Math.max(0, cards().length - VISIBLE);
  function update() {
    const on = mq.matches && cards().length > VISIBLE;
    slider.classList.toggle("is-slider", on);
    if (!on) { index = 0; track.style.transform = ""; cards().forEach(c => c.classList.remove("is-out")); return; }
    index = Math.min(index, max());
    const step = cards()[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0; next.disabled = index === max();
    cards().forEach((c, i) => c.classList.toggle("is-out", i < index || i >= index + VISIBLE));   // cards outside the 5 in view are invisible
  }
  const go = d => { index = Math.max(0, Math.min(max(), index + d)); update(); };
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  slider.addEventListener("keydown", e => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); });
  let sx = null;                                   // swipe support
  track.addEventListener("pointerdown", e => { sx = e.clientX; });
  let dragged = false;
  track.addEventListener("pointerup", e => { dragged = sx !== null && Math.abs(e.clientX - sx) > 40; if (dragged) go(e.clientX < sx ? 1 : -1); sx = null; });
  track.addEventListener("click", e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
  window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(update, 100); });
  mq.addEventListener("change", update);
  update();
})();
