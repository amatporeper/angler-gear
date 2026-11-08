ANGLER GEAR — WEBSITE E-COMMERCE DEMO (UPDATED)

CARA MENJALANKAN
1. Ekstrak ZIP.
2. Buka folder web utama/web asu.
3. Klik dua kali index.html atau unggah isi folder tersebut ke GitHub Pages.
4. Pastikan koneksi internet tersedia untuk memuat Google Fonts.

STRUKTUR
- index.html              : halaman toko, katalog, detail, ulasan, kebijakan, kontak
- style.css               : desain dan tampilan responsif
- script.js               : pencarian, filter, keranjang, checkout WhatsApp, ulasan demo
- logo_angler_gear.jpg/png: logo Angler Gear
- *.jpg                   : gambar produk (tetap di folder yang sama dengan index.html)

FITUR YANG DITAMBAHKAN
- Kategori produk diperbaiki: Tas Pancing, Kotak Pancing, Umpan Buatan.
- Detail produk dengan deskripsi, spesifikasi, harga, dan status stok simulasi.
- Keranjang dengan pengaturan kuantitas dan hapus produk.
- Form checkout berisi nama, nomor WhatsApp, alamat, dan catatan pesanan.
- Checkout menyiapkan ringkasan pesanan ke WhatsApp.
- Bagian ulasan pelanggan dengan form; ulasan disimpan lokal di browser (bukan server dan bukan ulasan terverifikasi).
- Informasi kebijakan pengiriman, pembayaran, retur, dan privasi.
- Kontak, area media sosial, dan perbaikan tampilan mobile.

PENTING — KONFIGURASI SEBELUM TRANSAKSI NYATA
Buka script.js dan edit bagian STORE_CONFIG:
- whatsappNumber: isi nomor WhatsApp toko dengan format internasional tanpa tanda +, contoh 6281234567890.
- instagramUrl: isi URL Instagram resmi.
- tiktokUrl: isi URL TikTok resmi.

Data kontak, alamat, jam operasional, spesifikasi bahan, ukuran, stok, dan kebijakan pada versi demo masih perlu diverifikasi serta diganti dengan data usaha yang sebenarnya. Harga produk adalah nilai dummy yang dapat diubah di index.html dan productData pada script.js. Website ini belum terhubung ke database, sistem inventaris, payment gateway, atau layanan pengiriman. Jangan gunakan data pribadi/pembayaran pelanggan sebelum sistem dan kebijakan privasi siap.

CATATAN GAMBAR PRODUK
Nama file gambar dipertahankan di folder yang sama dengan index.html agar mudah diunggah ke GitHub Pages.
