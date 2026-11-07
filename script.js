// Satu sumber data: nama, harga, dan gambar diambil langsung dari kartu katalog.
// Dengan begitu harga keranjang selalu mengikuti harga yang tampil di halaman produk.
const products = Object.fromEntries(
  [...document.querySelectorAll('.product-card')].map(card => {
    const id = card.dataset.id;
    return [id, {
      name: card.dataset.name,
      price: Number(card.dataset.price),
      image: card.querySelector('.product-image img')?.getAttribute('src') || ''
    }];
  })
);
const cart = {};
const rupiah = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const countEl=document.getElementById('cart-count'), itemsEl=document.getElementById('cart-items'), subtotalEl=document.getElementById('cart-subtotal');
function renderCart(){
  const entries=Object.entries(cart).filter(([,q])=>q>0);
  const count=entries.reduce((s,[,q])=>s+q,0);
  countEl.textContent=count;
  if(!entries.length){itemsEl.innerHTML='<p class="cart-empty">Keranjangmu masih kosong.</p>';subtotalEl.textContent=rupiah(0);return;}
  itemsEl.innerHTML=entries.map(([id,q])=>{const p=products[id];return `<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${rupiah(p.price)}</p><div class="qty"><button data-qty="${id}" data-change="-1">−</button><span>${q}</span><button data-qty="${id}" data-change="1">+</button></div></div><button class="remove" data-remove="${id}">Hapus</button></div>`}).join('');
  subtotalEl.textContent=rupiah(entries.reduce((s,[id,q])=>s+products[id].price*q,0));
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();openCart();}
document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>addToCart(btn.dataset.add)));
itemsEl.addEventListener('click',e=>{
  const qty=e.target.dataset.qty, remove=e.target.dataset.remove;
  if(qty){cart[qty]=Math.max(0,(cart[qty]||0)+Number(e.target.dataset.change));renderCart();}
  if(remove){delete cart[remove];renderCart();}
});
const drawer=document.getElementById('cart-drawer'),overlay=document.getElementById('overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('show');}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show');}
document.getElementById('cart-toggle').addEventListener('click',openCart);
document.getElementById('close-cart').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
document.getElementById('checkout').addEventListener('click',()=>{
  const entries=Object.entries(cart).filter(([,q])=>q>0);
  if(!entries.length){alert('Keranjang masih kosong.');return;}
  const summary=entries.map(([id,q])=>`${products[id].name} x${q}`).join('\n');
  alert('Terima kasih! Ini adalah demo toko Angler Gear.\n\nPesanan:\n'+summary+'\n\nSubtotal: '+subtotalEl.textContent+'\n\nHubungkan website dengan layanan pembayaran/WhatsApp untuk checkout sungguhan.');
});
document.getElementById('menu-toggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.getElementById('search-toggle').addEventListener('click',()=>{
  document.getElementById('search-box').scrollIntoView({behavior:'smooth',block:'center'});
  document.getElementById('search-input').focus();
});
let activeFilter='all';
function filterProducts(){
  const term=document.getElementById('search-input').value.toLowerCase();
  const cards=[...document.querySelectorAll('.product-card')];
  cards.forEach(card=>{
    const matchesCategory=activeFilter==='all'||card.dataset.category===activeFilter;
    const matchesText=card.dataset.name.toLowerCase().includes(term);
    card.hidden=!(matchesCategory&&matchesText);
  });
  document.getElementById('empty-state').hidden=cards.some(c=>!c.hidden);
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');
  activeFilter=btn.dataset.filter;filterProducts();
}));
document.getElementById('search-input').addEventListener('input',filterProducts);
document.getElementById('sort-select').addEventListener('change',e=>{
  const grid=document.getElementById('product-grid');
  const cards=[...grid.querySelectorAll('.product-card')];
  cards.sort((a,b)=>e.target.value==='low'?Number(a.dataset.price)-Number(b.dataset.price):e.target.value==='high'?Number(b.dataset.price)-Number(a.dataset.price):['rod','reel','box'].indexOf(a.dataset.id)-['rod','reel','box'].indexOf(b.dataset.id));
  cards.forEach(card=>grid.appendChild(card));
});
