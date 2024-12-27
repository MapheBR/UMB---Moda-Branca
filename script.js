let cart = [];
let currentProduct = null;
let selectedSize = null;
let selectedEmbroidery = {
  name: {
    enabled: false,
    position: null,
    name: '',
    profession: '',
    price: 0
  },
  logo: {
    enabled: false,
    position: null,
    file: null,
    price: 0
  },
  brasao: {
    enabled: false,
    position: null,
    file: null,
    price: 0
  }
};

const EMBROIDERY_PRICES = {
  name: 15,
  logo: 25,
  brasao: 60
};

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-image" style="background: url('${product.image}') center/cover no-repeat;">
    </div>
    <h3 class="product-title">${product.title}</h3>
    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
    <button class="add-to-cart">Selecionar Opções</button>
  `;
  const addToCartBtn = card.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => showProductModal(product));
  return card;
}

function addToCart(product, price, size, embroidery) {
  const totalPrice = price + Object.values(embroidery).filter(item => item.enabled).reduce((sum, item) => sum + item.price, 0);
  cart.push({
    product: product.title,
    price: totalPrice,
    size,
    embroidery,
    image: product.image
  });
  updateCartCount();
  updateCartPage();
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = cart.length;
}

function updateCartPage() {
  const cartItems = document.querySelector('.cart-items');
  const totalAmount = document.querySelector('.total-amount');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    let embroideryDetails = '';
    Object.keys(item.embroidery).forEach(key => {
      if (item.embroidery[key].enabled) {
        embroideryDetails += `
          <p>Bordado: ${key}</p>
        `;
        if (key === 'name') {
          embroideryDetails += `
            <p>Nome: ${item.embroidery[key].name}</p>
            <p>Profissão: ${item.embroidery[key].profession}</p>
          `;
        }
        embroideryDetails += `
          <p>Posição: ${item.embroidery[key].position}</p>
          <p>Preço do bordado: R$ ${item.embroidery[key].price.toFixed(2)}</p>
        `;
      }
    });
    cartItem.innerHTML = `
      <div class="cart-item-image" style="background-image: url(${item.image})"></div>
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.product}</h3>
        <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
        ${item.size ? `<p>Tamanho: ${item.size}</p>` : ''}
        ${embroideryDetails}
      </div>
      <i class="fas fa-times remove-item" data-index="${index}"></i>
    `;
    cartItems.appendChild(cartItem);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = `R$ ${total.toFixed(2)}`;
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      cart.splice(index, 1);
      updateCartCount();
      updateCartPage();
    });
  });
}

const products = {
  jalecos: [
    { id: 1, title: "Jaleco Premium Branco", price: 199.90, image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 2, title: "Jaleco Premium Preto", price: 199.90, image: "https://images.unsplash.com/photo-1624711932877-60d3b6caa676?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 3, title: "Jaleco Premium Azul", price: 199.90, image: "https://images.unsplash.com/photo-16247119332f5-1d6f776fa而3?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 4, title: "Jaleco Premium Verde", price: 199.90, image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 5, title: "Jaleco Premium Roxo", price: 199.90, image: "https://images.unsplash.com/photo-1602595688238-9fffe12d5af3?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 6, title: "Jaleco Premium Amarelo", price: 199.90, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 7, title: "Jaleco Premium Laranja", price: 199.90, image: "https://images.unsplash.com/photo-1612883440432-24aea5f3e0f4?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 8, title: "Jaleco Premium Cinza", price: 199.90, image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] }
  ],
  scrubs: [
    { id: 1, title: "Scrub Ultra Comfort Verde", price: 179.90, image: "https://images.unsplash.com/photo-1624127663472-1a1af47e9d8b?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 2, title: "Scrub Ultra Comfort Azul", price: 179.90, image: "https://images.unsplash.com/photo-1624127663999-99c1b6caa676?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 3, title: "Scrub Ultra Comfort Roxo", price: 179.90, image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2fb2e?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 4, title: "Scrub Ultra Comfort Amarelo", price: 179.90, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 5, title: "Scrub Ultra Comfort Laranja", price: 179.90, image: "https://images.unsplash.com/photo-1612883440432-24aea5f3e0f4?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 6, title: "Scrub Ultra Comfort Cinza", price: 179.90, image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 7, title: "Scrub Ultra Comfort Preto", price: 179.90, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 8, title: "Scrub Ultra Comfort Branco", price: 179.90, image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2fb2e?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] }
  ],
  acessorios: [
    { id: 1, title: "Estetoscópio Premium", price: 299.90, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 2, title: "Termômetro Digital", price: 99.90, image: "https://images.unsplash.com/photo-1584036533827-45d3e65d125c?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 3, title: "Luvas de Exame", price: 49.90, image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?fit=crop&h=400&w=300", sizes: ["PP", "P", "M", "G", "GG"] },
    { id: 4, title: "Máscara Facial", price: 29.90, image: "https://images.unsplash.com/photo-1602595688238-9fffe12d5af3?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 5, title: "Kit de Higiene", price: 199.90, image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2fb2e?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 6, title: "Pulseira de Identificação", price: 99.90, image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 7, title: "Lupa de Exame", price: 149.90, image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?fit=crop&h=400&w=300", sizes: ["Único"] },
    { id: 8, title: "Caixa de Ferramentas", price: 299.90, image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2fb2e?fit=crop&h=400&w=300", sizes: ["Único"] }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
  document.querySelectorAll('.see-more').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const category = button.getAttribute('href').split('/').pop();
      showProductsPage(category);
    });
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href.includes('/produtos')) {
        const category = href.split('/').pop();
        if (category === 'produtos') {
          showProductsPage('all');
        } else {
          showProductsPage(category);
        }
      } else if (href === 'https://universitaria.com') {
        showHomePage();
      }
    });
  });
  document.querySelector('.cart-icon').addEventListener('click', () => {
    showCartPage();
  });
  document.querySelector('.logo-link').addEventListener('click', e => {
    e.preventDefault();
    showHomePage();
  });
});

const heroCarousel = new Swiper('.hero-carousel', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

const carouselOptions = {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    640: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
};

new Swiper('.jalecos-carousel', carouselOptions);
new Swiper('.scrubs-carousel', carouselOptions);
new Swiper('.acessorios-carousel', carouselOptions);

document.querySelector('.checkout-btn').addEventListener('click', function checkout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  const customerInfoModal = document.querySelector('.customer-info-modal');
  customerInfoModal.style.display = 'flex';
  document.querySelector('.confirm-customer-info').addEventListener('click', () => {
    const customerName = document.querySelector('#customerName').value.trim();
    if (!customerName) {
      alert('Por favor, digite seu nome.');
      return;
    }
    let message = `*Novo Pedido*\n\n`;
    message += `*Cliente:* ${customerName}\n\n`;
    message += `*Itens do Pedido:*\n`;
    const filesPromises = [];
    cart.forEach((item, index) => {
      message += `\n*${index + 1}. ${item.product}*\n`;
      message += `▫️ Tamanho: ${item.size}\n`;
      Object.keys(item.embroidery).forEach(key => {
        if (item.embroidery[key].enabled) {
          message += `▫️ Bordado: ${key}\n`;
          if (key === 'name') {
            message += `▫️ Nome: ${item.embroidery[key].name}\n`;
            message += `▫️ Profissão: ${item.embroidery[key].profession}\n`;
          } else if (item.embroidery[key].file) {
            filesPromises.push(fetch(item.embroidery[key].file).then(res => res.blob()).then(blob => ({
              type: key,
              blob: blob
            })));
          }
          message += `▫️ Posição: ${item.embroidery[key].position}\n`;
          message += `▫️ Valor do bordado: R$ ${item.embroidery[key].price.toFixed(2)}\n`;
        }
      });
      message += `▫️ Valor do produto: R$ ${item.price.toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\n*Valor Total:* R$ ${total.toFixed(2)}`;
    const whatsappNumber = '5563991181347';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    Promise.all(filesPromises).then(files => {
      files.forEach(file => {
        const formData = new FormData();
        formData.append('file', file.blob, `${file.type}-bordado.png`);
        const url = URL.createObjectURL(file.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file.type}-bordado.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    });
    cart = [];
    updateCartCount();
    updateCartPage();
    customerInfoModal.style.display = 'none';
  });
  document.querySelector('.cancel-customer-info').addEventListener('click', () => {
    customerInfoModal.style.display = 'none';
  });
});

function handleFileInput(input, type) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      selectedEmbroidery[type].file = e.target.result;
      const previewDiv = document.createElement('div');
      previewDiv.className = 'file-preview';
      previewDiv.style.marginTop = '0.5rem';
      previewDiv.innerHTML = `
        <img src="${e.target.result}" 
             style="max-width: 100px; max-height: 100px; object-fit: contain;">
      `;
      const container = input.closest('.file-upload');
      const existingPreview = container.querySelector('.file-preview');
      if (existingPreview) {
        container.removeChild(existingPreview);
      }
      container.appendChild(previewDiv);
    };
    reader.readAsDataURL(file);
  }
}

function initializeModalEvents(modal) {
  const sizeOptions = modal.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      sizeOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedSize = option.dataset.size;
    });
  });
  const embroideryCheckboxes = modal.querySelectorAll('input[type="checkbox"]');
  embroideryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', e => {
      const type = e.target.value;
      const optionsDiv = modal.querySelector(`.${type}-position-options`);
      selectedEmbroidery[type].enabled = e.target.checked;
      if (e.target.checked) {
        optionsDiv.style.display = 'block';
        selectedEmbroidery[type].price = EMBROIDERY_PRICES[type];
      } else {
        optionsDiv.style.display = 'none';
        selectedEmbroidery[type].price = 0;
        selectedEmbroidery[type].position = null;
      }
      updateTotalPrice();
    });
  });
  const positionButtons = modal.querySelectorAll('.position-option');
  positionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.type;
      const position = button.dataset.position;
      modal.querySelectorAll(`.position-option[data-type="${type}"]`).forEach(btn => {
        btn.classList.remove('selected');
      });
      button.classList.add('selected');
      selectedEmbroidery[type].position = position;
    });
  });
  function updateTotalPrice() {
    const totalPriceElement = modal.querySelector('#total-price');
    const embroideryTotal = Object.values(selectedEmbroidery).reduce((sum, item) => {
      return sum + (item.enabled ? item.price : 0);
    }, 0);
    const totalPrice = currentProduct.price + embroideryTotal;
    totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
  }
  const nameInputs = modal.querySelectorAll('.embroidery-name');
  nameInputs.forEach(input => {
    input.addEventListener('input', e => {
      selectedEmbroidery.name.name = e.target.value;
    });
  });
  const professionInputs = modal.querySelectorAll('.embroidery-profession');
  professionInputs.forEach(input => {
    input.addEventListener('input', e => {
      selectedEmbroidery.name.profession = e.target.value;
    });
  });
  const logoInput = modal.querySelector('.embroidery-logo');
  if (logoInput) {
    logoInput.addEventListener('change', e => {
      handleFileInput(e.target, 'logo');
    });
  }
  const brasaoInput = modal.querySelector('.embroidery-brasao');
  if (brasaoInput) {
    brasaoInput.addEventListener('change', e => {
      handleFileInput(e.target, 'brasao');
    });
  }
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    const selectedItems = Object.entries(selectedEmbroidery).filter(([_, item]) => item.enabled);
    for (const [type, item] of selectedItems) {
      if (!item.position) {
        alert(`Por favor, selecione a posição do ${type === 'name' ? 'nome' : type}.`);
        return;
      }
      if (type === 'name' && (!item.name || !item.profession)) {
        alert('Por favor, preencha nome e profissão.');
        return;
      }
      if ((type === 'logo' || type === 'brasao') && !item.file) {
        alert(`Por favor, selecione um arquivo para o ${type}.`);
        return;
      }
    }
    addToCart(currentProduct, currentProduct.price, selectedSize, selectedEmbroidery);
    modal.style.display = 'none';
  });
}

function showHomePage() {
  document.querySelector('.featured-section').style.display = 'block';
  document.querySelector('.hero').style.display = 'flex';
  document.querySelector('.cart-page').style.display = 'none';
  document.querySelector('.products-page').style.display = 'none';
  document.querySelectorAll('.swiper-container').forEach(container => {
    if (container.swiper) {
      container.swiper.update();
    }
  });
}

function loadFeaturedProducts() {
  const jalecosCarousel = document.querySelector('.jalecos-carousel .swiper-wrapper');
  const scrubsCarousel = document.querySelector('.scrubs-carousel .swiper-wrapper');
  const acessoriosCarousel = document.querySelector('.acessorios-carousel .swiper-wrapper');
  jalecosCarousel.innerHTML = '';
  scrubsCarousel.innerHTML = '';
  acessoriosCarousel.innerHTML = '';
  products.jalecos.slice(0, 4).forEach(product => {
    jalecosCarousel.appendChild(createProductCard(product));
  });
  products.scrubs.slice(0, 4).forEach(product => {
    scrubsCarousel.appendChild(createProductCard(product));
  });
  products.acessorios.slice(0, 4).forEach(product => {
    acessoriosCarousel.appendChild(createProductCard(product));
  });
}

function showProductsPage(category = null) {
  document.querySelector('.featured-section').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.cart-page').style.display = 'none';
  document.querySelector('.products-page').style.display = 'block';
  const productsGrid = document.querySelector('.products-grid-page');
  productsGrid.innerHTML = '';
  let productsToShow;
  if (category && category !== 'all') {
    document.querySelector('.products-title').textContent = category === 'jalecos' ? 'Jalecos' : category === 'scrubs' ? 'Scrubs' : 'Acessórios';
    productsToShow = products[category] || [];
  } else {
    document.querySelector('.products-title').textContent = 'Todos os Produtos';
    productsToShow = [...products.jalecos, ...products.scrubs, ...products.acessorios];
  }
  const sortBy = document.querySelector('#sortBy').value;
  const sortedProducts = sortProducts(productsToShow, sortBy);
  sortedProducts.forEach(product => {
    productsGrid.appendChild(createProductCard(product));
  });
}

function sortProducts(products, sortBy) {
  const sortedProducts = [...products];
  switch (sortBy) {
    case 'name-asc':
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      sortedProducts.sort(() => Math.random() - 0.5);
      break;
  }
  return sortedProducts;
}

function showCartPage() {
  document.querySelector('.featured-section').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.cart-page').style.display = 'block';
  document.querySelector('.products-page').style.display = 'none';
  updateCartPage();
}

function showProductModal(product) {
  const modal = document.querySelector('.product-details-modal');
  currentProduct = product;
  selectedSize = null;
  selectedEmbroidery = {
    name: {
      enabled: false,
      position: null,
      name: '',
      profession: '',
      price: 0
    },
    logo: {
      enabled: false,
      position: null,
      file: null,
      price: 0
    },
    brasao: {
      enabled: false,
      position: null,
      file: null,
      price: 0
    }
  };
  modal.style.display = 'flex';
  const modalContent = modal.querySelector('.modal-content');
  modalContent.style.padding = '1.2rem';
  modalContent.style.gap = '1.2rem';
  modalContent.style.maxWidth = '700px';
  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${product.title}</h2>
      <button class="close-modal" onclick="closeModal()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="modal-body">
      <div class="modal-left">
        <img src="${product.image}" alt="${product.title}" class="modal-image">
        <p class="product-price" id="total-price">R$ ${product.price.toFixed(2)}</p>
      </div>
      
      <div class="modal-right">
        <div class="size-selector">
          <h4>Selecione o Tamanho:</h4>
          <div class="size-options">
            ${product.sizes.map(size => `
              <button class="size-option" data-size="${size}">${size}</button>
            `).join('')}
          </div>
        </div>

        ${product.title.toLowerCase().includes('jaleco') || product.title.toLowerCase().includes('scrub') ? `
          <div class="embroidery-selector" style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
            <h4 style="margin-bottom: 0.8rem;">Personalização</h4>
            
            <div class="embroidery-options" style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div class="embroidery-group">
                <label class="embroidery-option" style="display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" name="embroidery-name" value="name">
                  <span>Nome e Profissão</span>
                  <span class="embroidery-price">+R$ ${EMBROIDERY_PRICES.name}</span>
                </label>
                <div class="name-position-options" style="display: none; margin-left: 1.5rem; margin-top: 0.5rem;">
                  <div class="position-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <button class="position-option" data-type="name" data-position="peito-esquerdo">Peito Esquerdo</button>
                    <button class="position-option" data-type="name" data-position="peito-direito">Peito Direito</button>
                  </div>
                  <div class="name-inputs" style="margin-top: 0.5rem;">
                    <input type="text" class="embroidery-name" placeholder="Nome" style="width: 100%; margin-bottom: 0.5rem; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    <input type="text" class="embroidery-profession" placeholder="Profissão" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                  </div>
                </div>
              </div>

              <div class="embroidery-group">
                <label class="embroidery-option" style="display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" name="embroidery-logo" value="logo">
                  <span>Logo</span>
                  <span class="embroidery-price">+R$ ${EMBROIDERY_PRICES.logo}</span>
                </label>
                <div class="logo-position-options" style="display: none; margin-left: 1.5rem; margin-top: 0.5rem;">
                  <div class="position-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <button class="position-option" data-type="logo" data-position="manga-esquerda">Manga Esquerda</button>
                    <button class="position-option" data-type="logo" data-position="manga-direita">Manga Direita</button>
                    <button class="position-option" data-type="logo" data-position="peito-esquerdo">Peito Esquerdo</button>
                    <button class="position-option" data-type="logo" data-position="peito-direito">Peito Direito</button>
                  </div>
                  <div class="file-upload" style="margin-top: 0.5rem;">
                    <label class="file-label" style="display: block; padding: 0.5rem; border: 1px dashed #ddd; border-radius: 4px; text-align: center; cursor: pointer;">
                      <i class="fas fa-cloud-upload-alt"></i>
                      <span>Escolher Arquivo</span>
                      <input type="file" accept="image/*" class="embroidery-logo" style="display: none;">
                    </label>
                  </div>
                </div>
              </div>

              <div class="embroidery-group">
                <label class="embroidery-option" style="display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" name="embroidery-brasao" value="brasao">
                  <span>Brasão</span>
                  <span class="embroidery-price">+R$ ${EMBROIDERY_PRICES.brasao}</span>
                </label>
                <div class="brasao-position-options" style="display: none; margin-left: 1.5rem; margin-top: 0.5rem;">
                  <div class="position-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <button class="position-option" data-type="brasao" data-position="manga-esquerda">Manga Esquerda</button>
                    <button class="position-option" data-type="brasao" data-position="manga-direita">Manga Direita</button>
                  </div>
                  <div class="file-upload" style="margin-top: 0.5rem;">
                    <label class="file-label" style="display: block; padding: 0.5rem; border: 1px dashed #ddd; border-radius: 4px; text-align: center; cursor: pointer;">
                      <i class="fas fa-cloud-upload-alt"></i>
                      <span>Escolher Arquivo</span>
                      <input type="file" accept="image/*" class="embroidery-brasao" style="display: none;">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="modal-footer" style="text-align: right;">
      <button class="add-to-cart-modal" style="background: var(--accent-color); color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; font-weight: 500; cursor: pointer; transition: background 0.3s;">
        Adicionar ao Carrinho
      </button>
    </div>
  `;
  initializeModalEvents(modal);
}

function closeModal() {
  document.querySelector('.product-details-modal').style.display = 'none';
}

document.querySelectorAll('.category-filter').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    document.querySelectorAll('.category-filter').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    showProductsPage(category);
  });
});

document.querySelector('#sortBy').addEventListener('change', e => {
  const category = document.querySelector('.category-filter.active').dataset.category;
  showProductsPage(category);
});