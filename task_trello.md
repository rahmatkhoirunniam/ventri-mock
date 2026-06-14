# 📋 Trello Tasks: Penyesuaian Multi-Harga & Sistem POS Proporsional

Berikut adalah 2 task Trello yang siap disalin untuk tim developer. Rancangan ini dibuat mengacu pada kode mockup di menu hasil produksi dan penjualan.

---

## Task 1: [Master Data] Penambahan Field Harga Jual Kedua (Per Kg) di Menu Hasil Produksi

### Deskripsi Task
Saat ini, sistem hasil produksi hanya mencatat 1 jenis harga jual (per Pcs). Untuk mendukung penjualan grosir berbasis berat, kita perlu menambahkan field harga jual kedua, yaitu **Harga Jual per Kg** pada komoditas kategori "Hasil Produksi". Developer perlu memperbarui database/state komoditas, form tambah/edit komoditas, serta tampilan tabel hasil produksi.

### Kriteria Penerimaan (Acceptance Criteria)
1. **Pembaruan Skema Data (Database/State)**
   - Tambahkan atribut baru `hargaJualKg` (integer/double) di entitas komoditas/produk, bersandingan dengan `hargaJual` (harga per Pcs).
   - Set nilai default `hargaJualKg` ke `0` untuk produk yang tidak mendukung penjualan per Kg (misalnya Ayam Afkir).

2. **Pembaruan UI Form (Tambah & Edit Komoditas)**
   - Pada modal tambah & edit komoditas, tambahkan input field baru: **"Harga Jual per Kg (Rp)"**.
   - Input hanya tampil atau diwajibkan jika kategori komoditas adalah "Hasil Produksi".
   - ID elemen UI (mengacu pada mockup):
     - Form Tambah: `#add-hargajual-kg`
     - Form Edit: `#edit-hargajual-kg`

3. **Pembaruan Tabel & Informasi Stok**
   - Tampilkan informasi multi-harga pada tabel daftar hasil produksi dan sub-tabel detail lot/batch.
   - Contoh format tampilan: `Rp 1.500 / Pcs` dan `Rp 24.000 / Kg`. Jika salah satu harga `0` atau tidak diset, jangan tampilkan satuan tersebut.

### Referensi Kode Mockup
* **File Mockup:** [hasil-produksi.html](file:///Users/mm/Product/ventri-farm/ventri-mock/hasil-produksi.html)
* **Struktur Data:** Lihat array `INITIAL_COMMODITIES` (Baris 1335-1440) yang sudah ditambahkan atribut `hargaJualKg`.
* **Fungsi Simpan & Edit:**
  - Fungsi tambah data: `handleAddCommodity()` (Baris 1815-1842)
  - Fungsi edit data: `openEditModal()` & `handleEditCommoditySubmit()` (Baris 1921-1950)

---

## Task 2: [POS / Kasir] Penyesuaian Menu Penjualan untuk Pilihan Multi-Harga & Pemotongan Stok Proporsional

### Deskripsi Task
Menyesuaikan halaman kasir/penjualan (POS) agar kasir dapat memilih unit transaksi, baik secara eceran (**Butir/Pcs**) maupun grosir (**Kilogram/Kg**), dengan harga yang dinamis sesuai pilihan unit tersebut. Selain itu, sistem harus memotong stok lot/batch secara proporsional karena rasio berat per butir telur berubah-ubah setiap hari.

### Kriteria Penerimaan (Acceptance Criteria)
1. **UI Pilihan Unit & Konversi UX Pintar**
   - Saat kasir mengeklik produk untuk dimasukkan ke keranjang, tampilkan pilihan unit menggunakan **Toggle Pcs / Kg**.
   - Jika `hargaJualKg` dari produk bernilai `0` (tidak mendukung grosir), sembunyikan atau nonaktifkan pilihan **Kg**.
   - Implementasikan konversi nilai input secara otomatis saat kasir mengganti unit (Pcs <=> Kg):
     - **Ke Kg:** `Nilai Baru (Kg) = Nilai Lama (Pcs) * (Berat Lot / Jumlah Pcs Lot)` (dibulatkan ke 2 desimal).
     - **Ke Pcs:** `Nilai Baru (Pcs) = round(Nilai Lama (Kg) * (Jumlah Pcs Lot / Berat Lot))`.
   - Lakukan pembatasan input (**capping**) secara otomatis agar nilai yang diinput tidak melebihi sisa stok aktif pada lot terpilih.

2. **Kalkulasi & Estimasi Real-time**
   - Tampilkan subtotal secara dinamis berdasarkan satuan yang dipilih: `Qty * Harga per Unit`.
   - Tampilkan petunjuk estimasi konversi real-time di modal input (contoh: jika input 10 Pcs, tampilkan *“Estimasi Berat: ± 0.62 Kg”*).

3. **Algoritma Pemotongan Stok Proporsional**
   - Saat transaksi berhasil disubmit, potong stok pada lot/batch komoditas dengan aturan berikut:
     - **Penjualan Pcs:**
       - Sisa butir (`qty`) dikurangi sebesar jumlah dibeli.
       - Sisa berat (`qtyKg`) dikurangi secara proporsional: `weightSold = qtySold * (qtyKg_lot / qty_lot)`.
     - **Penjualan Kg:**
       - Sisa berat (`qtyKg`) dikurangi sebesar berat dibeli.
       - Sisa butir (`qty`) dikurangi secara proporsional: `qtySold = round(weightSold * (qty_lot / qtyKg_lot))`.
   - Pastikan sisa stok tidak menjadi negatif dan hilangkan sisa desimal kecil (di bawah `0.01`) jika stok habis agar database tetap bersih.

4. **Pembaruan Skema Riwayat Transaksi**
   - Simpan data transaksi ke riwayat (`rayfarm_sales`) dengan field tambahan:
     - `sellMethod` ("Pcs" atau "Kg")
     - `qtySold` (jumlah butir sesungguhnya/proporsional)
     - `weightSold` (berat kg sesungguhnya/proporsional)
     - `pricePerUnit` (harga yang berlaku saat itu)

### Referensi Kode Mockup & Desain
* **File Mockup:** [penjualan.html](file:///Users/mm/Product/ventri-farm/ventri-mock/penjualan.html)
* **Dokumen Perancangan:** [rancangan_penjualan.md](file:///Users/mm/Product/ventri-farm/ventri-mock/rancangan_penjualan.md)
* **Fungsi JavaScript Mockup:**
  - Konversi UX Unit: `setSaleUnit(unit)` (Baris 1351-1405)
  - Pembatasan Stok: `updateLotStockHint()` (Baris 1407-1435)
  - Kalkulasi Subtotal & Estimasi: `updateModalSubtotal()` (Baris 1438-1481)
  - Logika Pemotongan Stok Proporsional: `processTransaction()` (Baris 1774-1805)
