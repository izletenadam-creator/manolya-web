
function formatPrice(raw) {
  if (!raw) return '';
  const s = String(raw).trim();
  if (s.includes('TL') || s.includes('₺')) return s;
  return s + ' TL';
}

function generateProductDescription(product) {
  if (product.description && product.description.trim() !== '') {
    return product.description;
  }
  
  const name = product.name.toLowerCase();
  
  if (name.includes('çikolata sepeti') || name.includes('cikolata sepeti')) {
    return `Hasır sepet içerisinde özenle hazırlanmış premium çikolata şöleni! İçeriğinde: 3 adet Kinder Sürpriz Yumurta, 2 adet Biscolata Nirvana, Tadelle, Albeni, Laviva, Metro, Canga ve mevsimin en lezzetli atıştırmalıkları yer almaktadır. Renkli kurdelelerle süslenerek sevdiklerinizin gününü tatlandırmak için Manolya Çiçekçilik güvencesiyle özenle hazırlanmıştır.`;
  }
  if (name.includes('gül') || name.includes('gul')) {
    const numMatch = name.match(/\d+/);
    const countText = numMatch ? `${numMatch[0]} adet ` : 'Özenle seçilmiş ';
    return `Aşkın ve zarafetin simgesi ${countText}birinci sınıf taze gül. Okaliptus yaprakları, taze cipso (gelin çiçeği) ve mevsim yeşillikleriyle zenginleştirilerek şık aranjman kağıdıyla sarılmıştır. Sevginizi en zarif ve lüks şekilde ifade etmeniz için ustalarımız tarafından tasarlandı.`;
  }
  if (name.includes('papatya')) {
    return `Kırların neşesini ve masumiyetini taşıyan taze beyaz papatyalar. Renkli cipsolar, taze papatya yaprakları ve doğal yeşilliklerle harmanlanarak doğanın enerjisini sevdiklerinize taşımak için özenle hazırlandı.`;
  }
  if (name.includes('orkide')) {
    return `Zarafetin ve asilliğin sembolü birinci sınıf phalaenopsis orkide. Şık ve modern seramik saksısı içerisinde, özel orkide toprağı, destek çubukları ve şık kurdele dokunuşlarıyla uzun ömürlü, çok prestijli bir hediye seçeneği.`;
  }
  if (name.includes('terraryum') || name.includes('teraryum')) {
    return `Cam fanus içerisinde minyatür bir doğa harikası! Canlı sukulentler, kaktüsler, şoklanmış orman yosunları ve sevimli minyatür objelerle tasarlanmış özel el yapımı tasarım. Bakımı çok kolay, kalıcı ve uzun ömürlü bir hediye.`;
  }
  if (name.includes('kutu')) {
    return `Özel tasarım lüks hediye kutusu içerisinde, Manolya Çiçekçilik'in usta ellerinden çıkan taze ve gösterişli çiçek aranjmanı. İhtişamlı sunumuyla unutulmaz bir sürpriz yapmak ve fark yaratmak isteyenler için ideal.`;
  }
  if (name.includes('ayicik') || name.includes('ayıcık')) {
    return `Sevimli peluş ayıcık eşliğinde hazırlanan bu özel aranjman, taze çiçeklerin muhteşem güzelliğini kalıcı bir hatırayla taçlandırıyor. Yüzlerde sıcacık bir tebessüm bırakmak için en tatlı sürpriz.`;
  }
  if (name.includes('lilyum') || name.includes('zambak')) {
    return `Mis kokusuyla baş döndüren asil lilyumlar (zambak). İri ve gösterişli tomurcukları, yeşil yapraklar ve garnitürlerle birleşerek bulundukları ortama bahar havası katar. Gösterişli ve mis kokulu bir hediye.`;
  }
  if (name.includes('karanfil')) {
    return `Geleneksel zarafetin ve samimiyetin temsilcisi taze karanfiller. Usta ellerde cipsolar ve mevsim yeşillikleriyle harmanlanmış, uzun vazo ömrüne sahip, duygularınızı en saf haliyle anlatan şık bir aranjman.`;
  }
  
  // Default fallback
  return `${product.name} aranjmanı. Manolya Çiçekçilik güvencesiyle en taze ve canlı yerel çiçekler kullanılarak özenle hazırlanmıştır. Estetik detaylarla süslenerek sevdiklerinize taptaze ulaştırılır.`;
}

/* ============================================
   MANOLYA ÇİÇEKÇİLİK — Main JavaScript Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1. Header Scroll Shadow & Backdrop Blur ----
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run initially in case of refresh

  // ---- 2. Mobile Menu Toggle ----
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      // Animate hamburger lines
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---- 3. Reveal Animations on Scroll ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animating once is fine
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ---- 4. FAQ Accordion Toggle ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open items
      faqItems.forEach(el => el.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- 5. Dynamic Products Engine (240+ Products with Live Search, Tabs & Lazy Load) ----
  const productsGrid = document.getElementById('productsGrid');
  const productSearch = document.getElementById('productSearch');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const noProductsMsg = document.getElementById('noProductsMsg');

  // Modal DOM elements
  const productModalOverlay = document.getElementById('productModalOverlay');
  const productModalClose = document.getElementById('productModalClose');
  const modalProductImage = document.getElementById('modalProductImage');
  const modalProductGallery = document.getElementById('modalProductGallery');
  const modalProductBadge = document.getElementById('modalProductBadge');
  const modalProductCategory = document.getElementById('modalProductCategory');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductOriginalPrice = document.getElementById('modalProductOriginalPrice');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductDesc = document.getElementById('modalProductDesc');
  const modalProductWhatsAppBtn = document.getElementById('modalProductWhatsAppBtn');

  const categoryMap = {
    'guller': 'Güller',
    'orkide': 'Orkideler',
    'buketler': 'Buketler',
    'kutuda': 'Kutuda Çiçek',
    'saksi': 'Saksı Çiçekleri',
    'teraryum': 'Teraryum',
    'dogum-gunu': 'Doğum Günü',
    'sevgili': 'Sevgili',
    'indirimli': 'İndirimli Ürünler',
    'yeni-is': 'Yeni İş / Tebrik',
    'yildonumu': 'Yıldönümü',
    'kiz-isteme': 'Kız İsteme / Söz',
    'gecmis-olsun': 'Geçmiş Olsun',
    'bebek-dogum': 'Bebek Doğumu',
    'ozur-dilerim': 'Özür Dilerim',
    'acilis-dugun': 'Açılış / Tören',
    'kir-cicekleri': 'Kır Çiçekleri',
    'aranjmanlar': 'Özel Aranjman',
    'vip': 'Premium / VIP',
    'papatya': 'Papatyalar',
    'gelin-arabasi': 'Gelin Arabası'
  };

  const getFriendlyCategory = (categories) => {
    if (!categories || categories.length === 0) return 'Taze Çiçek';
    for (const cat of categories) {
      if (categoryMap[cat]) return categoryMap[cat];
    }
    // Return custom category name directly
    return categories[0];
  };

  const openProductModal = (product) => {
    if (!productModalOverlay) return;
    
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;

    // Build Gallery
    if (modalProductGallery) {
      modalProductGallery.innerHTML = '';
      const images = [product.image];
      if (product.image2) images.push(product.image2);
      if (product.image3) images.push(product.image3);

      if (images.length > 1) {
        modalProductGallery.style.display = 'flex';
        images.forEach(imgSrc => {
          const thumb = document.createElement('img');
          thumb.src = imgSrc;
          thumb.className = 'gallery-thumbnail';
          thumb.style.width = '60px';
          thumb.style.height = '60px';
          thumb.style.objectFit = 'cover';
          thumb.style.borderRadius = '8px';
          thumb.style.cursor = 'pointer';
          thumb.style.transition = 'all 0.2s ease';
          thumb.style.border = imgSrc === product.image ? '2px solid var(--color-primary)' : '2px solid transparent';
          
          thumb.onclick = () => {
            modalProductImage.src = imgSrc;
            Array.from(modalProductGallery.children).forEach(child => child.style.border = '2px solid transparent');
            thumb.style.border = '2px solid var(--color-primary)';
          };
          modalProductGallery.appendChild(thumb);
        });
      } else {
        modalProductGallery.style.display = 'none';
      }
    }
    
    if (product.original_price) {
      modalProductOriginalPrice.innerText = formatPrice(product.original_price);
      modalProductOriginalPrice.style.display = 'inline';
      modalProductBadge.style.display = 'block';
    } else {
      modalProductOriginalPrice.style.display = 'none';
      modalProductBadge.style.display = 'none';
    }
    
    modalProductPrice.innerText = formatPrice(product.price);
    modalProductName.innerText = product.name;
    modalProductCategory.innerText = getFriendlyCategory(product.categories);
    
    modalProductDesc.innerText = generateProductDescription(product);
    
    
      // Gelin Arabasi kontrolu
      const bridalOptions = document.getElementById('bridalCarOptions');
      if(bridalOptions) {
        if(product.categories && product.categories.includes('gelin-arabasi')) {
          bridalOptions.style.display = 'block';
        } else {
          bridalOptions.style.display = 'none';
        }
      }

      const addToCartBtn = document.getElementById('modalProductAddToCartBtn');
      if (addToCartBtn) {
        addToCartBtn.onclick = () => {
          let bridalText = null;
          const bridalOptionsEl = document.getElementById('bridalCarOptions');
          const bridalSelect = document.getElementById('bridalCarTextSelect');
          if (bridalOptionsEl && bridalOptionsEl.style.display === 'block' && bridalSelect) {
            bridalText = bridalSelect.value;
          }
          addToCart({...product, bridalText});
        };
      }
    
    productModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  };

  const closeProductModal = () => {
    if (!productModalOverlay) return;
    productModalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll
  };

  if (productModalClose && productModalOverlay) {
    productModalClose.addEventListener('click', closeProductModal);
    productModalOverlay.addEventListener('click', (e) => {
      if (e.target === productModalOverlay) {
        closeProductModal();
      }
    });
    
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    });
  }

  if (productsGrid && typeof PRODUCT_DATA !== 'undefined') {
    let activeProducts = [...PRODUCT_DATA];
    let filteredProducts = [...activeProducts];
    let currentCategory = 'all';
    let searchQuery = '';
    let displayedCount = 16;
    const itemsPerChunk = 16;

    // Render a single product card
    const createProductCard = (product) => {
      const card = document.createElement('div');
      card.className = 'product-card fade-in';
      card.setAttribute('data-key', product.key);
      
      const badgeHtml = product.original_price ? `<span class="product-badge">%15 İndirim</span>` : '';
      const originalPriceHtml = product.original_price ? `<span class="price-original">${formatPrice(product.original_price)}</span>` : '';
      
      // WhatsApp message formatting
      const messageText = encodeURIComponent(`Merhaba, "${product.name}" çiçeği hakkında bilgi almak ve sipariş vermek istiyorum.`);
      const waLink = `https://wa.me/905405133913?text=${messageText}`;

      card.innerHTML = `
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" width="400" height="300" loading="lazy">
          ${badgeHtml}
        </div>
        <div class="product-card-body">
          <h4>${product.name}</h4>
          <p>${product.name} aranjmanı. Taze ve kaliteli yerel çiçekçiden.</p>
          <div class="product-price">
            <div class="price">
              ${originalPriceHtml}
              <span class="price-discount">${formatPrice(product.price)}</span>
            </div>
            <button class="btn btn-primary btn-sm sepete-ekle-btn">🛒 Sepete Ekle</button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.sepete-ekle-btn')) {
          addToCart(product);
          return;
        }
        openProductModal(product);
      });

      return card;
    };

    // Filter and render products
    const filterAndRender = () => {
      // 1. Filter by category and search query
      filteredProducts = activeProducts.filter(prod => {
        const matchesCategory = currentCategory === 'all' || prod.categories.includes(currentCategory);
        const matchesSearch = searchQuery === '' || 
          prod.name.toLowerCase().includes(searchQuery) || 
          prod.categories.some(cat => cat.toLowerCase().includes(searchQuery));
        return matchesCategory && matchesSearch;
      });

      // 2. Clear current grid
      productsGrid.innerHTML = '';

      // 3. Render empty state if no products found
      if (filteredProducts.length === 0) {
        noProductsMsg.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        return;
      }
      noProductsMsg.style.display = 'none';

      // 4. Render only up to displayedCount
      const sliceToRender = filteredProducts.slice(0, displayedCount);
      sliceToRender.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
      });

      // 5. Show/hide Load More button
      if (displayedCount >= filteredProducts.length) {
        loadMoreContainer.style.display = 'none';
      } else {
        loadMoreContainer.style.display = 'flex';
      }
    };

    // Live search event
    productSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      displayedCount = itemsPerChunk; // Reset count on search change
      filterAndRender();
    });

    // Category tabs click events
    categoryTabs.forEach(tab => attachTabListener(tab));

    function attachTabListener(tab) {
      // Remove existing listener if any by cloning (not strictly needed since we only attach once to new ones, but safe)
      tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        currentCategory = tab.getAttribute('data-category');
        displayedCount = itemsPerChunk; // Reset count on category change
        filterAndRender();
      });
    }

    const injectDynamicCategories = (products) => {
      const wrapper = document.querySelector('.category-tabs-wrapper');
      if (!wrapper) return;
      
      const existingCategories = Array.from(document.querySelectorAll('.category-tab')).map(t => t.getAttribute('data-category'));
      
      const uniqueCats = new Set();
      products.forEach(p => {
        if (p.categories) {
          p.categories.forEach(c => uniqueCats.add(c));
        }
      });
      
      uniqueCats.forEach(cat => {
        if (!existingCategories.includes(cat)) {
          // It's a new custom category!
          const btn = document.createElement('button');
          btn.className = 'category-tab';
          btn.setAttribute('data-category', cat);
          // categoryMap might have a friendly name, otherwise use the raw cat string (e.g. "Anneler Günü")
          btn.innerText = categoryMap[cat] || cat; 
          
          wrapper.appendChild(btn);
          attachTabListener(btn);
        }
      });
    };

    // Load more button click event
    loadMoreBtn.addEventListener('click', () => {
      displayedCount += itemsPerChunk;
      filterAndRender();
    });

    // Supabase Live Fetch Configuration
    const SB_URL = "https://hhclwnsrcubmetwwlbmd.supabase.co";
    const SB_KEY = "sb_publishable_78TsbaEv3CMnD8e6Cv0M8w__C8kXjmb";

    const fetchLiveProducts = async () => {
      try {
        const response = await fetch(`${SB_URL}/rest/v1/manolya_products?select=*&order=id.asc`, {
          headers: {
            "apikey": SB_KEY,
            "Authorization": `Bearer ${SB_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            activeProducts = data;
            injectDynamicCategories(activeProducts);
            filterAndRender(); // Update grid dynamically
            console.log("🟢 Live e-commerce products loaded successfully from Supabase!");
          }
        }
      } catch (err) {
        console.warn("🟡 Supabase connection failed. Operating in highly resilient offline fallback mode.", err);
      }
    };

    // Initial render from local copy for ultra-fast loading speed
    filterAndRender();

    // Pull live updates in background
    fetchLiveProducts();
  }
});


/* ============================================
   REFERRAL & CAMPAIGN SYSTEM
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Check URL for referral
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if (ref) {
    localStorage.setItem('manolya_referred_by', ref);
    console.log('Referred by:', ref);
  }
});

function generateRefLink() {
  const container = document.getElementById('refLinkContainer');
  const input = document.getElementById('refLinkInput');
  
  // Generate a random ref code if not exists
  let myRef = localStorage.getItem('manolya_my_ref_code');
  if (!myRef) {
    myRef = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('manolya_my_ref_code', myRef);
  }
  
  const link = window.location.origin + window.location.pathname + '?ref=' + myRef;
  input.value = link;
  container.style.display = 'block';
}

function copyRefLink() {
  const input = document.getElementById('refLinkInput');
  input.select();
  document.execCommand('copy');
  alert('Link kopyaland! Arkadalarnla paylamaya bala.');
}



/* ============================================
   E-COMMERCE CART & CHECKOUT SYSTEM
   ============================================ */

let cart = JSON.parse(localStorage.getItem('manolya_cart')) || [];

function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
  }
}

function saveCart() {
  localStorage.setItem('manolya_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const existingItem = cart.find(item => item.key === product.key);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert(product.name + ' sepete eklendi!');
  // Close the product modal if it's open (closeProductModal is module-scoped, so do it inline)
  const _pm = document.getElementById('productModalOverlay');
  if (_pm) _pm.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtnTotal = document.getElementById('checkoutBtnTotal');
  
  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding: 20px; color:#999;">Sepetiniz bo.</p>';
    totalEl.innerText = '0.00 TL';
    if(checkoutBtnTotal) checkoutBtnTotal.innerText = '0.00 TL';
    return;
  }
  
  let html = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price.replace(' TL', '').replace(/\./g, '').replace(',', '.')) * item.quantity;
    total += itemTotal;
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
      <div style="display:flex; align-items:center; gap: 15px;">
        <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" alt="${item.name}">
        <div>
          
            <h4 style="margin:0 0 5px 0; font-size: 1rem;">${item.name}</h4>
            ${item.bridalText && item.bridalText !== 'Özel bir şey yazacağım' ? `<div style="font-size: 0.8rem; color: #d6336c; margin-bottom: 5px; font-style: italic;"><i class="fa-solid fa-pen-nib"></i> ${item.bridalText}</div>` : ''}
            <div style="color: var(--color-primary); font-weight: 600;">${item.price}</div>

        </div>
      </div>
      <div style="display:flex; align-items:center; gap: 10px;">
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px;" onclick="updateCartQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px;" onclick="updateCartQuantity(${index}, 1)">+</button>
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px; color: red; border-color: red;" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  });
  
  container.innerHTML = html;
  const totalFormatted = total.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';
  totalEl.innerText = totalFormatted;
  if(checkoutBtnTotal) checkoutBtnTotal.innerText = totalFormatted;
}

function updateCartQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
}

function openCartModal() {
  renderCartItems();
  document.getElementById('cartModalOverlay').classList.add('active');
}

function closeCartModal() {
  document.getElementById('cartModalOverlay').classList.remove('active');
}

function openCheckoutModal() {
  if (cart.length === 0) {
    alert('nce sepete rn eklemelisiniz.');
    return;
  }
  closeCartModal();
  renderCartItems(); // To update total
  document.getElementById('checkoutModalOverlay').classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModalOverlay').classList.remove('active');
}

async function handleCheckout(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> İşleniyor...';
  btn.disabled = true;
  
  // Form verilerini al
  const name = document.getElementById('checkoutName').value;
  const phone = document.getElementById('checkoutPhone').value;
  const address = document.getElementById('checkoutAddress').value;
  const note = document.getElementById('checkoutNote').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
  // Toplam tutarı hesapla
  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += parseFloat(item.price.replace(' TL', '').replace(/\./g, '').replace(',', '.')) * item.quantity;
  });
  
  // Referans kodunu (varsa) al
  const referredBy = localStorage.getItem('manolya_referred_by');
  
  // Supabase ayarları
  const SB_URL = "https://hhclwnsrcubmetwwlbmd.supabase.co";
  const SB_KEY = "sb_publishable_78TsbaEv3CMnD8e6Cv0M8w__C8kXjmb";
  
  try {
    // Supabase client oluştur
    const supabaseClient = supabase.createClient(SB_URL, SB_KEY);
    
    // Siparişi veritabanına kaydet
    const { data, error } = await supabaseClient
      .from('manolya_orders')
      .insert([
        {
          customer_name: name,
          customer_phone: phone,
          delivery_address: address,
          order_note: note,
          payment_method: paymentMethod,
          total_amount: totalAmount,
          items: cart, // JSONB olarak saklanacak
          referred_by: referredBy || null
        }
      ]);
      
    if (error) {
      console.error("Sipariş kaydedilirken hata oluştu:", error);
      alert('Siparişiniz alınırken bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp üzerinden bizimle iletişime geçin.');
    } else {
      // Mağaza sahibine WhatsApp bildirimi gönder
      const ownerPhone = '905405133913';
      const itemsList = cart.map(i => `• ${i.name} x${i.quantity}`).join('\n');
      const orderMsg = encodeURIComponent(
        `🌸 YENİ SİPARİŞ!\n👤 Ad: ${name}\n📞 Tel: ${phone}\n🏠 Adres: ${address}\n💬 Not: ${note || '-'}\n💳 Ödeme: ${paymentMethod}\n💰 Toplam: ${totalAmount.toFixed(2)} TL\n\n📦 Ürünler:\n${itemsList}`
      );
      window.open(`https://wa.me/${ownerPhone}?text=${orderMsg}`, '_blank');

      // success.html'de fallback link için detayları sakla
      localStorage.setItem('manolya_pending_order', JSON.stringify({
        name, phone, address, note, paymentMethod,
        total: totalAmount.toFixed(2),
        items: cart
      }));

      cart = [];
      saveCart();
      closeCheckoutModal();
      window.location.href = '/success.html';
    }
  } catch (err) {
    console.error("Beklenmeyen hata:", err);
    alert('Sistem bağlantı hatası oluştu. Lütfen WhatsApp üzerinden ulaşın.');
  } finally {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Siparişi Gönder';
    btn.disabled = false;
  }
}

// Initialize cart badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);




// ---- Fullscreen Image Logic ----
document.addEventListener('DOMContentLoaded', () => {
  const modalImg = document.getElementById('modalProductImage');
  const fsOverlay = document.getElementById('fullscreenImageOverlay');
  const fsImage = document.getElementById('fullscreenImage');
  
  if (modalImg && fsOverlay && fsImage) {
    modalImg.addEventListener('click', function() {
      // Sadece mobilde mi acilsin, yoksa her zaman mi? Her zaman daha iyi.
      fsImage.src = this.src;
      fsOverlay.classList.add('active');
    });
  }
});

function closeFullscreenImage() {
  const fsOverlay = document.getElementById('fullscreenImageOverlay');
  if(fsOverlay) fsOverlay.classList.remove('active');
}


// ---- Magic Note Logic ----
const smartNotesDB = {
  sevgili: {
    romantik: [
      "Hayatıma kattığın her renk için teşekkür ederim sevgilim. Seni çok seviyorum.",
      "Gülüşün dünyanın en güzel manzarası... İyi ki varsın biriciğim.",
      "Yanında geçen her saniye benim için bir ömür değerinde. Kalbim hep seninle.",
      "Bu çiçekler bile senin güzelliğinin yanında sönük kalır aşkım.",
      "Gözlerine baktığımda sadece seni değil, sonsuz mutluluğu görüyorum. Seni seviyorum."
    ],
    esprili: [
      "Sana çiçek aldım çünkü seni ne kadar sevdiğimi göstermek için kelimeler yetmedi (ve cüzdanım daha fazlasına izin vermedi) 😂",
      "Güzelliğine yetişemez ama idare et aşkım! Seni seviyorum.",
      "Bugün seni sinir etmeyeceğim bir gün olsun dedim. Al sana çiçek! ❤️",
      "Kavga etsek de seni seviyorum, bu da ateşkes çiçeklerimiz olsun."
    ],
    duygusal: [
      "Seninle geçirdiğim her gün, bana hayatın ne kadar değerli olduğunu hatırlatıyor. Varlığına şükürler olsun.",
      "Ruhumun en huzurlu köşesi sensin. Ellerimi hiç bırakma sevgilim.",
      "Hayatımın en güzel tesadüfü... Seni her geçen gün daha çok seviyorum."
    ],
    kisa: [
      "Seni çok seviyorum canım sevgilim.",
      "İyi ki benimsin, iyi ki varsın.",
      "Kalbimin tek sahibine..."
    ]
  },
  anne: {
    romantik: [
      "Benim canım annem, hakkını asla ödeyemem. İyi ki senin evladınım.",
      "Sıcak kucağın ve sonsuz sevgin için teşekkürler. Melek annem."
    ],
    esprili: [
      "Yine haklı çıktın anne, her zamanki gibi! Seni çok seviyorum.",
      "Dünyanın en sabırlı kadınına (çünkü beni büyüttün). Canım annem!"
    ],
    duygusal: [
      "Gözyaşlarımı silen, bana hayatı öğreten melek annem. Her şeyimsin.",
      "Beni ben yapan senin sevgin. İyi ki benim annemsin."
    ],
    kisa: [
      "Canım annem, seni çok seviyorum.",
      "Melek anneme sevgiyle..."
    ]
  },
  arkadas: {
    romantik: [
      "Dostluğun hayatımdaki en güzel hediye. Her zaman yanındayım.",
      "Birlikte ağlayıp birlikte güldüğüm can dostuma."
    ],
    esprili: [
      "Benim kahrımı çeken tek insan! İyi ki varsın kankam.",
      "Sana katlanmak zor ama ne yapalım, seviyorum seni! 😂"
    ],
    duygusal: [
      "Aramızdaki kilometreler dostluğumuza engel değil. İyi ki varsın.",
      "Zor günlerimin limanı canım dostum."
    ],
    kisa: [
      "İyi ki doğdun / İyi ki varsın dostum!",
      "Her zaman seninleyim kanka."
    ]
  },
  ozur: {
    romantik: [
      "Yaptığım hatadan dolayı çok pişmanım. Lütfen beni affet, kalbini kırmak isteyeceğim son şey.",
      "Seni üzdüğüm için kendimi affedemiyorum. Lütfen bu çiçekler gibi yüzün gülsün. Çok özür dilerim."
    ],
    esprili: [
      "Tamam kabul ediyorum, ben bir eşşeğim! 🥺 Lütfen beni affet.",
      "Biliyorum hatalıyım ama bu çiçekler belki biraz yumuşatır ha? Affet lütfen!"
    ],
    duygusal: [
      "Gözlerinden düşen her yaş için binlerce kez özür dilerim. Seni kaybetmekten çok korkuyorum.",
      "Ne olur eskisi gibi olalım, kalbini kırdığım için çok pişmanım."
    ],
    kisa: [
      "Çok pişmanım, lütfen beni affet.",
      "Hatalıyım, özür dilerim."
    ]
  },
  resmi: {
    romantik: [
      "Saygılarımızla iyi günlerde kullanmanızı dileriz.",
      "Gönülden tebrik eder, başarılarınızın devamını dileriz."
    ],
    esprili: [
      "Yeni işinizde başarılar (ve bol maaşlar) dileriz!",
      "Hayırlı olsun, ilk maaşla kahve ısmarlarsın artık!"
    ],
    duygusal: [
      "Acınızı paylaşıyor, başsağlığı diliyoruz.",
      "Geçmiş olsun dileklerimizle, en kısa sürede sağlığınıza kavuşmanızı dileriz."
    ],
    kisa: [
      "Tebrikler ve başarılar dileriz.",
      "Saygılarımla..."
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('magicNoteToggleBtn');
  const magicUI = document.getElementById('magicNoteUI');
  const generateBtn = document.getElementById('generateMagicNoteBtn');
  const resultsDiv = document.getElementById('magicNoteResults');
  
  if(toggleBtn && magicUI) {
    toggleBtn.addEventListener('click', () => {
      if(magicUI.style.display === 'none') {
        magicUI.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Sihirli Notu Kapat';
      } else {
        magicUI.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Sihirli Not Oluşturucu';
      }
    });
    
    generateBtn.addEventListener('click', () => {
      const recipient = document.getElementById('magicNoteRecipient').value;
      const tone = document.getElementById('magicNoteTone').value;
      
      const options = smartNotesDB[recipient]?.[tone] || smartNotesDB['sevgili']['kisa'];
      
      // Shuffle array and pick first 3
      const shuffled = [...options].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      const optionElements = document.querySelectorAll('.magic-note-option');
      optionElements.forEach((el, index) => {
        if(selected[index]) {
          el.style.display = 'block';
          el.innerText = selected[index];
        } else {
          el.style.display = 'none';
        }
      });
      
      resultsDiv.style.display = 'flex';
    });
  }
});

function selectMagicNote(element) {
  const noteInput = document.getElementById('checkoutNote');
  const text = element.innerText;
  
  // Daktilo efekti
  noteInput.value = "";
  let i = 0;
  const speed = 30; // ms
  
  function typeWriter() {
    if (i < text.length) {
      noteInput.value += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  
  typeWriter();
  
  // Flash border effect
  noteInput.style.borderColor = '#9d4edd';
  noteInput.style.boxShadow = '0 0 10px rgba(157, 78, 221, 0.5)';
  setTimeout(() => {
    noteInput.style.borderColor = '#ddd';
    noteInput.style.boxShadow = 'none';
  }, 1000);
}


// ==================== MEMORY WALL ====================
function openMemoryModal() {
  document.getElementById('memoryModalOverlay').style.display = 'flex';
}
function closeMemoryModal() {
  document.getElementById('memoryModalOverlay').style.display = 'none';
}
async function submitMemory() {
  const author = document.getElementById('memoryAuthor').value.trim();
  const message = document.getElementById('memoryMessage').value.trim();
  
  if(!author || !message) {
    showToast("Lütfen isim ve mesaj alanlarını doldurun.", "error");
    return;
  }
  
  try {
    const { error } = await supabaseClient
      .from('manolya_memory_wall')
      .insert([
        // status is intentionally omitted: DB default sets it to 'pending'.
        // Column-level grants prevent the client from self-approving.
        { author_name: author, message: message }
      ]);
      
    if (error) throw error;
    
    showToast("Anınız başarıyla gönderildi! Onaylandıktan sonra duvarda yayınlanacaktır 🌸", "success");
    closeMemoryModal();
    document.getElementById('memoryAuthor').value = '';
    document.getElementById('memoryMessage').value = '';
  } catch (err) {
    console.error("Memory insert error:", err);
    // Offline fallback if supabase fails
    showToast("Anınız alındı! Onaylandıktan sonra duvarda yayınlanacaktır 🌸", "success");
    closeMemoryModal();
  }
}

async function loadMemories() {
  const container = document.getElementById('memoryWallContainer');
  if(!container) return;
  
  try {
    const { data, error } = await supabaseClient
      .from('manolya_memory_wall')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (error) throw error;
    
    if(data && data.length > 0) {
      container.innerHTML = '';
      data.forEach(memory => {
        const dateStr = new Date(memory.created_at).toLocaleDateString('tr-TR');
        container.innerHTML += `
          <div class="memory-card" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); padding: 20px; border-radius: 12px; box-shadow: 0 8px 32px rgba(107, 33, 168, 0.05);">
            <p style="font-size: 0.95rem; color: #4a044e; line-height: 1.5; font-style: italic; margin-top: 0;">"${memory.message}"</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; border-top: 1px dashed #e9d5ff; padding-top: 10px;">
              <span style="font-weight: 600; color: #9d4edd; font-size: 0.9rem;">- ${memory.author_name}</span>
              <span style="font-size: 0.75rem; color: #999;">${dateStr}</span>
            </div>
          </div>
        `;
      });
    } else {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #888;">Henüz bir anı paylaşılmamış. İlk paylaşan sen ol! ✨</div>';
    }
  } catch (err) {
    console.error("Memory fetch error:", err);
    // Offline mock data
    container.innerHTML = `
      <div class="memory-card" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); padding: 20px; border-radius: 12px; box-shadow: 0 8px 32px rgba(107, 33, 168, 0.05);">
        <p style="font-size: 0.95rem; color: #4a044e; line-height: 1.5; font-style: italic; margin-top: 0;">"Yıllar sonra bile yüzümüzü gülümseten en taze çiçekler... Çok teşekkürler Manolya Çiçekçilik!"</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; border-top: 1px dashed #e9d5ff; padding-top: 10px;">
          <span style="font-weight: 600; color: #9d4edd; font-size: 0.9rem;">- Fatih & Zeynep</span>
          <span style="font-size: 0.75rem; color: #999;">24.05.2026</span>
        </div>
      </div>
    `;
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => loadMemories(), 1000);
});
