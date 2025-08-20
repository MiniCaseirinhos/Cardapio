const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Atualiza a interface do carrinho
function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button class="remove-item" data-index="${index}">Remover</button>`;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      updateCartUI();
    });
  });
}

// Adiciona item ao carrinho
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    cart.push({ name, price });
    updateCartUI();
    alert(`${name} adicionado ao carrinho!`);
  });
});

// Abre o carrinho
document.getElementById('view-cart').addEventListener('click', () => {
  cartModal.style.display = 'flex';
  updateCartUI();
});

// Fecha o carrinho
document.getElementById('close-cart').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Envia pedido para WhatsApp
document.getElementById('send-whatsapp').addEventListener('click', () => {

  if (!cart.length) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const name = document.querySelector('input[name="name"]').value;

  if (!name) {
    alert('Por favor, preencha seu nome antes de enviar o pedido.');
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  let message = '*Novo Pedido - Mini Caseirinhos*%0A';
  message += `👤 Nome: ${name}%0A`;
  message += `🧁 Itens:%0A`;

  cart.forEach(item => {
    message += `- ${item.name} (R$ ${item.price.toFixed(2)})%0A`;
  });

  message += `💰 Total: R$ ${total.toFixed(2)}%0A`;
  message += `✅ Forma de pagamento: PIX`;

  const phoneNumber = '5511983185622';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappURL, '_blank');

  cart = [];
  updateCartUI();
  alert('Pedido enviado via WhatsApp! Carrinho esvaziado.');
});