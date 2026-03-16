/* ================================================
   BELLUGA VOGUE — js/main.js
   ================================================ */

// ---- PRODUCTS DATA ----
const PRODUCTS = [
  { id: 1,  name: "Velvet Evening Gown",          category: "Evening Wear",    price: 485, image: "assets/product-1.jpg",                                          badge: "NEW" },
  { id: 2,  name: "Structured Power Blazer",      category: "Power Dressing",  price: 320, image: "assets/aiony-haust-IXYxqP4zejo-unsplash.jpg"                              },
  { id: 3,  name: "Silk Wrap Dress",              category: "Evening Wear",    price: 275, image: "assets/tamara-bellis-X2qRKqLKtg4-unsplash.jpg"                            },
  { id: 4,  name: "Tailored Wide-leg Trousers",   category: "Casual Luxe",     price: 195, image: "assets/product-5.jpg"                                                     },
  { id: 5,  name: "Beaded Cocktail Dress",        category: "Evening Wear",    price: 420, image: "assets/adriano-goncalves-IeHLttCrsXE-unsplash.jpg",             badge: "NEW" },
  { id: 6,  name: "Linen Resort Co-ord Set",      category: "Resort",          price: 245, image: "assets/product-6.jpg"                                                     },
  { id: 7,  name: "Oversized Wool Coat",          category: "Resort",          price: 580, image: "assets/maks-styazhkin-pi6NxokCYYM-unsplash.jpg"                           },
  { id: 8,  name: "Satin Slip Dress",             category: "Evening Wear",    price: 195, image: "assets/alexander-mass-y4jzsM8V6XY-unsplash.jpg"                           },
  { id: 9,  name: "Embroidered Kaftan",           category: "Resort",          price: 310, image: "assets/kunz-kashmir-BHG195O82Sc-unsplash.jpg",                  badge: "NEW" },
  { id: 10, name: "Sharp Shoulder Blazer Dress",  category: "Power Dressing",  price: 395, image: "assets/product-10.jpg"                                                    },
  { id: 11, name: "Draped Evening Cape",          category: "Resort",          price: 520, image: "assets/abdul-raheem-kannath-QznLAABBaII-unsplash.jpg"                      },
  { id: 12, name: "Gold Chain Belt",              category: "Accessories",     price: 95,  image: "assets/vishnu-prasad-Ct-7svw082I-unsplash.jpg"                            },
  { id: 13, name: "White Bag and Sunglasses Boho Look", category: "Accessories",     price: 285, image: "assets/tamara-bellis-IwVRO3TLjLc-unsplash.jpg",                badge: "NEW" },
  { id: 14, name: "Scarlet Flow",                      category: "Evening Wear",    price: 165, image: "assets/tamara-bellis-I_a57bVkkw4-unsplash.jpg"                            },
  { id: 15, name: "Pink Floral Wrap Gown",             category: "Evening Wear",    price: 175, image: "assets/smart-araromi-1MYkaNLoNzY-unsplash.jpg",                badge: "NEW" },
  { id: 16, name: "Coastal Fringe Poncho",             category: "Casual Luxe",     price: 155, image: "assets/product-4.jpg"                                                     },
  { id: 17, name: "Noir Classic",                      category: "Accessories",     price: 235, image: "assets/product-3.jpg"                                                     },
  { id: 18, name: "Red Floral Belted Midi",            category: "Casual Luxe",     price: 445, image: "assets/product-2.jpg"                                                     },
  { id: 19, name: "Blossom Ballgown",                  category: "Evening Wear",    price: 295, image: "assets/khaled-ghareeb--NyPn9up_7o-unsplash.jpg"                           },
  { id: 20, name: "Paisley Midi Sundress",             category: "Evening Wear",    price: 465, image: "assets/filip-rankovic-grobgaard-Nn5tNjUVBJk-unsplash.jpg",     badge: "NEW" },
  { id: 21, name: "Rocky Coast Magenta Gown",          category: "Evening Wear",    price: 340, image: "assets/alonso-reyes-AtVtXww06kc-unsplash.jpg"                             },
];

const CART_KEY     = 'belluga_cart';
const WISHLIST_KEY = 'belluga_wishlist';

// ================================================
// CART
// ================================================
function getCart()       { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart)  { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }

function addToCart(product, size = 'M', qty = 1) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === product.id && i.size === size);
  if (idx >= 0) { cart[idx].qty += qty; } else { cart.push({ ...product, size, qty }); }
  saveCart(cart);
  showToast(product.name + ' added to cart');
}

function removeFromCart(id, size) {
  saveCart(getCart().filter(i => !(i.id === id && i.size === size)));
}

function updateCartQty(id, size, qty) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id && i.size === size);
  if (idx < 0) return;
  if (qty <= 0) { cart.splice(idx, 1); } else { cart[idx].qty = qty; }
  saveCart(cart);
}

function getCartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

function updateCartBadge() {
  const n = getCartCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

// ================================================
// WISHLIST
// ================================================
function getWishlist()          { return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'); }
function saveWishlist(w)        { localStorage.setItem(WISHLIST_KEY, JSON.stringify(w)); updateWishlistBadge(); }
function isInWishlist(id)       { return getWishlist().includes(id); }

function toggleWishlist(id) {
  const w   = getWishlist();
  const idx = w.indexOf(id);
  if (idx >= 0) { w.splice(idx, 1); } else { w.push(id); }
  saveWishlist(w);
  return w.includes(id);
}

function updateWishlistBadge() {
  const n = getWishlist().length;
  document.querySelectorAll('#wishlist-count').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

// ================================================
// TOAST
// ================================================
function showToast(msg) {
  let t = document.getElementById('bv-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'bv-toast';
    Object.assign(t.style, {
      position:   'fixed', bottom: '32px', left: '50%',
      transform:  'translateX(-50%) translateY(120px)',
      background: '#2C2A1E', color: '#F5F0E8',
      padding:    '13px 28px',
      fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', letterSpacing: '0.04em',
      borderRadius: '2px', zIndex: '9999',
      transition: 'transform 0.32s ease',
      borderLeft: '3px solid #C9A96E',
      boxShadow:  '0 4px 24px rgba(0,0,0,0.35)',
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._tid);
  t._tid = setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(120px)'; }, 3000);
}

// ================================================
// NAVBAR
// ================================================
function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const isHero = header.classList.contains('hero-page');
  const update = () => {
    if (isHero && window.scrollY < 60) {
      header.classList.add('transparent');
      header.classList.remove('solid');
    } else {
      header.classList.remove('transparent');
      header.classList.add('solid');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });

  // Hamburger
  const ham   = document.getElementById('hamburger');
  const mob   = document.getElementById('mobile-nav');
  const close = document.getElementById('mobile-close');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      mob.classList.add('open');
      ham.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (close && mob) {
    close.addEventListener('click', () => {
      mob.classList.remove('open');
      if (ham) ham.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Search
  const searchBtn     = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose   = document.getElementById('search-close');
  const searchInput   = document.getElementById('search-input');
  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.toggle('open');
      if (searchOverlay.classList.contains('open') && searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchOverlay) searchOverlay.classList.remove('open');
  });
}

// ================================================
// SCROLL TO TOP
// ================================================
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ================================================
// SCROLL REVEAL
// ================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ================================================
// ACTIVE NAV
// ================================================
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// ================================================
// WISHLIST BUTTONS
// ================================================
function initWishlistButtons() {
  document.querySelectorAll('.wishlist-btn[data-id]').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    btn.classList.toggle('active', isInWishlist(id));
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const added = toggleWishlist(id);
      btn.classList.toggle('active', added);
      showToast(added ? 'Added to wishlist' : 'Removed from wishlist');
    });
  });
}

// ================================================
// ADD TO CART BUTTONS
// ================================================
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart-btn[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === parseInt(btn.dataset.id));
      if (p) addToCart(p);
    });
  });
}

// ================================================
// PRODUCT CARD TEMPLATE
// ================================================
function productCardHTML(p) {
  return `
    <div class="product-card reveal" data-id="${p.id}" onclick="window.location.href='product.html'">
      <div class="product-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="wishlist-btn" data-id="${p.id}" aria-label="Wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="product-card-body">
        <span class="section-label">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="product-card-footer">
          <span class="price">$${p.price.toLocaleString()}</span>
          <button class="card-add-link add-to-cart-btn" data-id="${p.id}">Add to cart →</button>
        </div>
      </div>
    </div>`;
}

// ================================================
// SHOP FILTERS
// ================================================
function initShopFilters() {
  const grid        = document.getElementById('products-grid');
  const tabs        = document.querySelectorAll('.filter-tab');
  const priceRange  = document.getElementById('price-range');
  const priceVal    = document.getElementById('price-display');
  const sortSel     = document.getElementById('sort-select');
  const countEl     = document.getElementById('results-count');
  if (!grid) return;

  let cat  = 'All';
  let maxP = 800;
  let sort = 'featured';

  function render() {
    let list = PRODUCTS.filter(p => {
      return (cat === 'All' || p.category === cat) && p.price <= maxP;
    });
    if (sort === 'low')  list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'new')  list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));

    grid.innerHTML = list.map(productCardHTML).join('');
    if (countEl) countEl.textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;
    initWishlistButtons();
    initAddToCartButtons();
    initScrollReveal();
  }

  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    cat = t.dataset.category;
    render();
  }));
  if (priceRange) priceRange.addEventListener('input', () => {
    maxP = +priceRange.value;
    if (priceVal) priceVal.textContent = '$' + maxP;
    render();
  });
  if (sortSel) sortSel.addEventListener('change', () => { sort = sortSel.value; render(); });

  render();
}

// ================================================
// PRODUCT GALLERY (product.html)
// ================================================
function initProductGallery() {
  const main   = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!main || !thumbs.length) return;
  thumbs[0]?.classList.add('active');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      main.style.opacity = '0';
      setTimeout(() => { main.src = t.querySelector('img').src; main.style.opacity = '1'; }, 220);
    });
  });
}

// ================================================
// SIZE / COLOR / QTY SELECTORS
// ================================================
function initSizeSelector() {
  document.querySelectorAll('.size-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });
}

function initColorSelector() {
  document.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
    });
  });
}

function initQtySelector() {
  const inp = document.getElementById('qty-input');
  if (!inp) return;
  document.querySelectorAll('.qty-btn').forEach(b => {
    b.addEventListener('click', () => {
      let v = parseInt(inp.value) || 1;
      if (b.dataset.action === 'plus')  v = Math.min(v + 1, 10);
      if (b.dataset.action === 'minus') v = Math.max(v - 1, 1);
      inp.value = v;
    });
  });
}

// ================================================
// ACCORDION
// ================================================
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item   = h.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ================================================
// PRODUCT PAGE — Add to Cart
// ================================================
function initProductPageCart() {
  const btn = document.getElementById('product-add-to-cart');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const p    = PRODUCTS[0];
    const size = document.querySelector('.size-btn.active')?.textContent || 'M';
    const qty  = parseInt(document.getElementById('qty-input')?.value || 1);
    addToCart(p, size, qty);
  });

  const wBtn = document.getElementById('product-wishlist-btn');
  if (wBtn) {
    const id = 1;
    wBtn.classList.toggle('active', isInWishlist(id));
    wBtn.addEventListener('click', () => {
      const added = toggleWishlist(id);
      wBtn.classList.toggle('active', added);
      showToast(added ? 'Added to wishlist' : 'Removed from wishlist');
    });
  }
}

// ================================================
// CART PAGE
// ================================================
function initCartPage() {
  const wrap     = document.getElementById('cart-items-wrap');
  const emptyEl  = document.getElementById('cart-empty');
  const fullEl   = document.getElementById('cart-full');
  if (!wrap) return;

  function render() {
    const cart = getCart();
    if (cart.length === 0) {
      if (emptyEl) emptyEl.style.display = 'flex';
      if (fullEl)  fullEl.style.display  = 'none';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (fullEl)  fullEl.style.display  = 'block';

    wrap.innerHTML = cart.map(item => `
      <tr data-id="${item.id}" data-size="${item.size}">
        <td>
          <div style="display:flex;align-items:center;gap:16px">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <span>Size: ${item.size}</span>
            </div>
          </div>
        </td>
        <td><span class="price" style="font-size:1rem">$${item.price}</span></td>
        <td>
          <div class="cart-qty">
            <button data-action="minus">−</button>
            <span>${item.qty}</span>
            <button data-action="plus">+</button>
          </div>
        </td>
        <td><span class="price" style="font-size:1rem">$${(item.price * item.qty).toLocaleString()}</span></td>
        <td><button class="cart-remove" title="Remove">×</button></td>
      </tr>`).join('');

    wrap.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        removeFromCart(+row.dataset.id, row.dataset.size);
        render();
      });
    });
    wrap.querySelectorAll('.cart-qty button').forEach(btn => {
      btn.addEventListener('click', () => {
        const row  = btn.closest('tr');
        const id   = +row.dataset.id;
        const size = row.dataset.size;
        const item = getCart().find(i => i.id === id && i.size === size);
        if (!item) return;
        updateCartQty(id, size, btn.dataset.action === 'plus' ? item.qty + 1 : item.qty - 1);
        render();
      });
    });
    updateSummary();
  }

  function updateSummary() {
    const total    = getCartTotal();
    const shipping = total >= 150 ? 0 : 15;
    const sub  = document.getElementById('cart-subtotal');
    const ship = document.getElementById('cart-shipping');
    const tot  = document.getElementById('cart-total');
    if (sub)  sub.textContent  = '$' + total.toLocaleString();
    if (ship) ship.textContent = shipping === 0 ? 'Free' : '$' + shipping;
    if (tot)  tot.textContent  = '$' + (total + shipping).toLocaleString();
  }

  render();
}

// ================================================
// WISHLIST PAGE
// ================================================
function initWishlistPage() {
  const emptyEl  = document.getElementById('wishlist-empty');
  const fullEl   = document.getElementById('wishlist-full');
  const grid     = document.getElementById('wishlist-grid');
  const countEl  = document.getElementById('wishlist-item-count');
  const clearBtn = document.getElementById('wishlist-clear-all');
  if (!grid) return;

  function render() {
    const ids  = getWishlist();
    const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

    if (items.length === 0) {
      if (emptyEl) emptyEl.style.display = 'flex';
      if (fullEl)  fullEl.style.display  = 'none';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (fullEl)  fullEl.style.display  = 'block';
    if (countEl) countEl.textContent   = `${items.length} saved piece${items.length !== 1 ? 's' : ''}`;

    grid.innerHTML = items.map(p => `
      <div class="product-card reveal" data-id="${p.id}">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <button class="wishlist-btn active" data-id="${p.id}" aria-label="Remove from wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-card-body">
          <span class="section-label">${p.category}</span>
          <h3>${p.name}</h3>
          <div class="product-card-footer">
            <span class="price">$${p.price.toLocaleString()}</span>
            <button class="card-add-link add-to-cart-btn" data-id="${p.id}">Add to cart →</button>
          </div>
        </div>
      </div>`).join('');

    grid.querySelectorAll('.wishlist-btn[data-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleWishlist(parseInt(btn.dataset.id));
        render();
      });
    });
    initAddToCartButtons();
    initScrollReveal();
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(WISHLIST_KEY);
      updateWishlistBadge();
      render();
    });
  }

  render();
}

// ================================================
// CHECKOUT PAGE
// ================================================
function initCheckoutPage() {
  const itemsEl   = document.getElementById('checkout-items');
  const subtotEl  = document.getElementById('checkout-subtotal');
  const shippEl   = document.getElementById('checkout-shipping');
  const totalEl   = document.getElementById('checkout-total');
  if (!itemsEl) return;

  const cart  = getCart();
  const total = getCartTotal();
  const ship  = total >= 150 ? 0 : 15;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p style="color:var(--muted);font-size:0.85rem">Your cart is empty.</p>';
  } else {
    itemsEl.innerHTML = cart.map(i => `
      <div class="checkout-item">
        <img src="${i.image}" alt="${i.name}">
        <div class="checkout-item-info">
          <h4>${i.name}</h4>
          <span>Size: ${i.size} &middot; Qty: ${i.qty}</span>
        </div>
        <span class="checkout-item-price">$${(i.price * i.qty).toLocaleString()}</span>
      </div>`).join('');
  }

  if (subtotEl) subtotEl.textContent = '$' + total.toLocaleString();
  if (shippEl)  shippEl.textContent  = ship === 0 ? 'Free' : '$' + ship;
  if (totalEl)  totalEl.textContent  = '$' + (total + ship).toLocaleString();

  const placeBtn = document.getElementById('place-order-btn');
  if (placeBtn) {
    placeBtn.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem(CART_KEY);
      updateCartBadge();
      showToast('Order placed! Thank you for shopping with Belluga Vogue.');
      setTimeout(() => window.location.href = 'index.html', 3000);
    });
  }
}

// ================================================
// NEWSLETTER
// ================================================
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Thank you for subscribing!');
        input.value = '';
      }
    });
  });
}

// ================================================
// CONTACT FORM
// ================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent! We\'ll be in touch within 24 hours.');
    form.reset();
  });
}

// ================================================
// INIT
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollTop();
  initScrollReveal();
  initWishlistButtons();
  initAddToCartButtons();
  updateCartBadge();
  updateWishlistBadge();
  setActiveNav();
  initProductGallery();
  initSizeSelector();
  initColorSelector();
  initQtySelector();
  initAccordion();
  initProductPageCart();
  initCartPage();
  initWishlistPage();
  initCheckoutPage();
  initShopFilters();
  initNewsletter();
  initContactForm();
});
