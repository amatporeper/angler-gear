/* ANGLER GEAR — storefront interactions
   KONFIGURASI: ganti nomor WhatsApp toko dan tautan sosial di bagian CONFIG sebelum digunakan sungguhan. */
const STORE_CONFIG = {
  whatsappNumber: "", // 6285865795489",
  instagramUrl: "",   // https://instagram.com/Anglergear/",
  tiktokUrl: ""       // https://tiktok.com/@Anglergear",
};

const productData = {
  box: {
    name: "Kotak Pancing", price: 30000, image: "carbon_fishing_rod.jpg",
    description: "Kotak penyimpanan untuk membantu menata perlengkapan kecil saat memancing. Pastikan ukuran dan kompartemen sesuai kebutuhan sebelum membeli.",
    specs: {Kategori:"Kotak pancing",Bahan:"Plastik (perkiraan; verifikasi pemasok)",Fungsi:"Menyimpan aksesori dan perlengkapan kecil",Warna:"Sesuai varian yang tersedia",Stok:"Simulasi tersedia"}
  },
  bag: {
    name: "Fishing Rod Bag", price: 80000, image: "precision_spinning_reel.jpg",
    description: "Tas penyimpanan joran pancing agar perlengkapan lebih rapi dan mudah dibawa. Periksa kembali ukuran tas yang dipilih agar sesuai dengan panjang joran.",
    specs: {Kategori:"Tas joran / fishing rod bag",Bahan:"Kain sintetis (perkiraan; verifikasi pemasok)",Ukuran:"Pilih ukuran sesuai stok pemasok",Fungsi:"Membawa dan melindungi joran",Stok:"Simulasi tersedia"}
  },
  bait: {
    name: "Umpan Buatan", price: 5000, image: "tackle_box_kit.jpg",
    description: "Umpan buatan untuk membantu pemancing menyesuaikan pilihan umpan dengan kondisi perairan dan target ikan.",
    specs: {Kategori:"Artificial bait",Bahan:"Material sintetis (perkiraan; verifikasi pemasok)",Fungsi:"Umpan untuk aktivitas memancing",Warna:"Sesuai varian yang tersedia",Stok:"Simulasi tersedia"}
  }
};
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const cart = {};
const countEl=document.getElementById("cart-count"), itemsEl=document.getElementById("cart-items"), subtotalEl=document.getElementById("cart-subtotal");
const drawer=document.getElementById("cart-drawer"), overlay=document.getElementById("overlay");
const entries = () => Object.entries(cart).filter(([,q])=>q>0);
const subtotal = () => entries().reduce((sum,[id,q])=>sum+productData[id].price*q,0);

function renderCart(){
  const list=entries(), count=list.reduce((s,[,q])=>s+q,0);
  countEl.textContent=count;
  if(!list.length){itemsEl.innerHTML='<p class="cart-empty">Keranjangmu masih kosong.</p>';subtotalEl.textContent=rupiah(0);return;}
  itemsEl.innerHTML=list.map(([id,q])=>{const p=productData[id];return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${rupiah(p.price)}</p><div class="qty"><button type="button" data-qty="${id}" data-change="-1" aria-label="Kurangi">−</button><span>${q}</span><button type="button" data-qty="${id}" data-change="1" aria-label="Tambah">+</button></div></div><button class="remove" type="button" data-remove="${id}">Hapus</button></div>`}).join("");
  subtotalEl.textContent=rupiah(subtotal());
}
function openCart(){drawer.classList.add("open");overlay.classList.add("show");}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show");}
function addToCart(id){if(!productData[id])return;cart[id]=(cart[id]||0)+1;renderCart();openCart();}
document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(btn.dataset.add)));
itemsEl.addEventListener("click",e=>{
  const qty=e.target.dataset.qty, remove=e.target.dataset.remove;
  if(qty){cart[qty]=Math.max(0,(cart[qty]||0)+Number(e.target.dataset.change));renderCart();}
  if(remove){delete cart[remove];renderCart();}
});
document.getElementById("cart-toggle").addEventListener("click",openCart);
document.getElementById("close-cart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);

const productModal=document.getElementById("product-modal"), productBackdrop=document.getElementById("product-modal-backdrop");
const checkoutModal=document.getElementById("checkout-modal"), checkoutBackdrop=document.getElementById("checkout-backdrop");
function closeProductModal(){productModal.hidden=true;productBackdrop.hidden=true;}
function closeCheckoutModal(){checkoutModal.hidden=true;checkoutBackdrop.hidden=true;}
function openProductModal(id){
  const p=productData[id];if(!p)return;
  document.getElementById("modal-product-image").src=p.image;
  document.getElementById("modal-product-image").alt=p.name;
  document.getElementById("product-modal-title").textContent=p.name;
  document.getElementById("modal-product-description").textContent=p.description;
  document.getElementById("modal-product-price").textContent=rupiah(p.price);
  document.getElementById("modal-product-stock").textContent="Status stok: simulasi tersedia. Konfirmasi stok sebelum transaksi.";
  document.getElementById("modal-product-specs").innerHTML=Object.entries(p.specs).map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join("");
  document.getElementById("modal-add-cart").dataset.id=id;
  productModal.hidden=false;productBackdrop.hidden=false;
}
document.querySelectorAll("[data-detail]").forEach(btn=>btn.addEventListener("click",()=>openProductModal(btn.dataset.detail)));
document.querySelectorAll("[data-close-modal]").forEach(btn=>btn.addEventListener("click",closeProductModal));
productBackdrop.addEventListener("click",closeProductModal);
document.getElementById("modal-add-cart").addEventListener("click",e=>{const id=e.currentTarget.dataset.id;closeProductModal();addToCart(id);});

document.getElementById("checkout").addEventListener("click",()=>{
  if(!entries().length){alert("Keranjang masih kosong.");return;}
  document.getElementById("checkout-total").textContent=rupiah(subtotal());
  checkoutModal.hidden=false;checkoutBackdrop.hidden=false;
});
document.querySelectorAll("[data-close-checkout]").forEach(btn=>btn.addEventListener("click",closeCheckoutModal));
checkoutBackdrop.addEventListener("click",closeCheckoutModal);
document.getElementById("checkout-form").addEventListener("submit",e=>{
  e.preventDefault();
  if(!entries().length){alert("Keranjang masih kosong.");closeCheckoutModal();return;}
  if(!STORE_CONFIG.6285865795489){
    alert("Checkout WhatsApp belum aktif. Buka script.js, lalu isi STORE_CONFIG.whatsappNumber dengan nomor WhatsApp resmi Angler Gear (format internasional tanpa +).");
    return;
  }
  const data=new FormData(e.currentTarget);
  const lines=entries().map(([id,q])=>`- ${productData[id].name} x${q} = ${rupiah(productData[id].price*q)}`);
  const message=[
    "Halo Angler Gear, saya ingin melakukan pemesanan:",
    ...lines,"",
    `Total sementara: ${rupiah(subtotal())}`,"",
    `Nama: ${data.get("customerName")}`,
    `WhatsApp pembeli: ${data.get("customerPhone")}`,
    `Alamat: ${data.get("customerAddress")}`,
    `Catatan: ${data.get("customerNote")||"-"}`,
    "Mohon konfirmasi ketersediaan stok, ongkos kirim, dan metode pembayaran."
  ].join("\n");
  window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});

document.getElementById("menu-toggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("search-toggle").addEventListener("click",()=>{
  document.getElementById("search-box").scrollIntoView({behavior:"smooth",block:"center"});
  document.getElementById("search-input").focus();
});
let activeFilter="all";
function filterProducts(){
  const term=document.getElementById("search-input").value.toLowerCase();
  const cards=[...document.querySelectorAll(".product-card")];
  cards.forEach(card=>{
    const categoryMatch=activeFilter==="all"||card.dataset.category===activeFilter;
    const textMatch=(card.dataset.name+" "+card.dataset.category).toLowerCase().includes(term);
    card.hidden=!(categoryMatch&&textMatch);
  });
  document.getElementById("empty-state").hidden=cards.some(c=>!c.hidden);
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelector(".filter.active")?.classList.remove("active");
  btn.classList.add("active");activeFilter=btn.dataset.filter;filterProducts();
}));
document.getElementById("search-input").addEventListener("input",filterProducts);
document.getElementById("sort-select").addEventListener("change",e=>{
  const grid=document.getElementById("product-grid");
  const cards=[...grid.querySelectorAll(".product-card")];
  cards.sort((a,b)=>e.target.value==="low"?Number(a.dataset.price)-Number(b.dataset.price):e.target.value==="high"?Number(b.dataset.price)-Number(a.dataset.price):["bag","box","bait"].indexOf(a.dataset.id)-["bag","box","bait"].indexOf(b.dataset.id));
  cards.forEach(card=>grid.appendChild(card));
});

// Ulasan lokal untuk demonstrasi. Tidak disimpan ke server dan tidak dianggap terverifikasi.
const REVIEW_KEY="anglerGearDemoReviews";
function getReviews(){try{return JSON.parse(localStorage.getItem(REVIEW_KEY)||"[]");}catch{return [];}}
function renderReviews(){
  const reviews=getReviews(), list=document.getElementById("review-list");
  document.getElementById("review-count").textContent=reviews.length?`${reviews.length} ulasan demo`:"Belum ada ulasan";
  if(!reviews.length){list.innerHTML='<p class="review-empty">Belum ada ulasan pelanggan yang terverifikasi. Jadilah yang pertama memberikan masukan.</p>';return;}
  list.innerHTML=reviews.slice().reverse().map(r=>`<article class="review-item"><div class="review-item-head"><strong>${escapeHTML(r.name)}</strong><small>${escapeHTML(r.product)} · ${escapeHTML(r.date)}</small></div><div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div><p>${escapeHTML(r.comment)}</p><small>Ulasan demo — belum terverifikasi sebagai pembelian.</small></article>`).join("");
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.getElementById("review-form").addEventListener("submit",e=>{
  e.preventDefault();const d=new FormData(e.currentTarget);
  const reviews=getReviews();reviews.push({name:d.get("reviewer"),product:productData[d.get("product")].name,rating:Number(d.get("rating")),comment:d.get("comment"),date:new Date().toLocaleDateString("id-ID")});
  localStorage.setItem(REVIEW_KEY,JSON.stringify(reviews));e.currentTarget.reset();renderReviews();
  alert("Terima kasih. Ulasan demo tersimpan pada browser ini saja.");
});
renderReviews();

// Terapkan tautan media sosial hanya jika URL resmi telah diisi di konfigurasi.
document.querySelectorAll("[data-social='instagram']").forEach(a=>{if(STORE_CONFIG.instagramUrl){a.href=STORE_CONFIG.instagramUrl;a.target="_blank";a.rel="noopener";}});
document.querySelectorAll("[data-social='tiktok']").forEach(a=>{if(STORE_CONFIG.tiktokUrl){a.href=STORE_CONFIG.tiktokUrl;a.target="_blank";a.rel="noopener";}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeProductModal();closeCheckoutModal();closeCart();}});
