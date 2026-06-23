# 📋 Trello Tasks: Penyesuaian Multi-Harga & Sistem POS Proporsional

Berikut adalah 4 task Trello yang siap disalin untuk tim developer. Rancangan ini dibuat mengacu pada kode mockup di menu hasil produksi, penjualan, dan riwayat penjualan.

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
* **File Mockup:** [hasil-produksi.html](file:///d:/Product/ventri%20farm/ventri-mock/hasil-produksi.html)
* **Struktur Data:** Lihat array `INITIAL_COMMODITIES` (Baris 1268-1350) yang sudah ditambahkan atribut `hargaJualKg`.
* **Fungsi Simpan & Edit:**
  - Fungsi tambah data: `handleAddCommodity()`
  - Fungsi edit data: `openEditModal()` & `handleEditCommoditySubmit()`

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
* **File Mockup:** [penjualan.html](file:///d:/Product/ventri%20farm/ventri-mock/penjualan.html)
* **Dokumen Perancangan:** [rancangan_penjualan.md](file:///d:/Product/ventri%20farm/ventri-mock/rancangan_penjualan.md)
* **Fungsi JavaScript Mockup:**
  - Konversi UX Unit: `setSaleUnit(unit)`
  - Pembatasan Stok: `updateLotStockHint()`
  - Kalkulasi Subtotal & Estimasi: `updateModalSubtotal()`
  - Logika Pemotongan Stok Proporsional: `processTransaction()`

---

## Task 3: [POS / Kasir] Penambahan Fitur Diskon (Persentase & Nominal) pada Transaksi Penjualan

### Deskripsi Task
Untuk mendukung strategi promosi dan loyalitas pelanggan, kita perlu menambahkan fitur diskon pada modul kasir/penjualan (POS). Kasir harus dapat menerapkan diskon pada tingkat transaksi, baik dalam bentuk **Persentase (%)** maupun **Nominal Rupiah (Rp)**. Sistem harus menghitung ulang Grand Total secara real-time, menyesuaikan batas diskon agar tidak melebihi subtotal, serta menyimpan informasi diskon ini ke dalam riwayat transaksi.

### Kriteria Penerimaan (Acceptance Criteria)
1. **Komponen UI Pilihan Diskon**
   - Tambahkan input dropdown **"Tipe Diskon"** (`#discount-type`) dengan opsi:
     - `None` (Tanpa Diskon)
     - `Percent` (Persentase)
     - `Nominal` (Nominal Rupiah)
   - Tambahkan input field **"Nilai Diskon"** (`#discount-value`). Input ini harus berstatus *disabled* ketika tipe diskon adalah `None`, dan *enabled* ketika tipe diskon `Percent` atau `Nominal`.
   - Perbarui label input secara dinamis (contoh: "Diskon (%)" atau "Diskon (Rp)").

2. **Kalkulasi Diskon Real-time & Validasi Input Capping**
   - **Diskon Persentase:** 
     - Lakukan pembatasan (capping) nilai input persentase otomatis antara `0` s.d. `100`.
     - Formula potongan harga: `discountAmount = Math.round((Percent / 100) * Subtotal)`.
   - **Diskon Nominal:** 
     - Lakukan pembatasan (capping) nilai input rupiah otomatis agar tidak kurang dari `0` atau tidak melebihi `Subtotal` transaksi belanja.
     - Formula potongan harga: `discountAmount = Nominal`.
   - Grand Total akhir dihitung secara real-time: `Grand Total = Math.max(0, Subtotal - discountAmount)`.

3. **Integrasi Kasir & Pembayaran**
   - Tampilkan nominal diskon (`#discount-disp`) dan total bayar akhir setelah dipotong diskon (`#grand-total-disp`) di panel ringkasan belanja.
   - Bila kasir memilih metode pembayaran non-tunai (Transfer Bank atau QRIS), secara otomatis set nilai input **"Diterima (Rp)"** (`#amount-paid`) sama dengan `Grand Total`.
   - Jika pembayaran menggunakan metode Tunai, hitung kembalian (`#change-value`) berdasarkan `Grand Total`: `Kembalian = Diterima - Grand Total`. Nonaktifkan tombol "Selesaikan Transaksi" jika uang diterima kurang dari `Grand Total`.

4. **Pembaruan Skema Data & Riwayat Transaksi**
   - Simpan data transaksi ke riwayat (`rayfarm_sales`) dengan properti diskon:
     - `discountType` ("Percent", "Nominal", atau "None")
     - `discountValue` (nilai input diskon mentah)
     - `discountAmount` (nilai nominal rupiah dari diskon)
   - Cetak nominal diskon pada struk penjualan (`receipt-visual`) jika `discountAmount > 0`.

### Referensi Kode Mockup & Desain
* **File Mockup:** [penjualan.html](file:///d:/Product/ventri%20farm/ventri-mock/penjualan.html)
* **Dokumen Perancangan:** [rancangan_penjualan.md](file:///d:/Product/ventri%20farm/ventri-mock/rancangan_penjualan.md)
* **Fungsi JavaScript Mockup:**
  - Perhitungan Nilai Diskon: `getDiscountAmount()`
  - Penanganan Ganti Tipe Diskon: `handleDiscountChange()`
  - Pembatasan Input Diskon: `handleDiscountInput()`

---

## Task 4: [Riwayat Penjualan] Pembaruan Detail Transaksi untuk Menampilkan Jumlah, Harga Satuan, dan Informasi Diskon

### Deskripsi Task
Melakukan penyesuaian pada panel/modal detail transaksi penjualan di menu riwayat penjualan (`riwayat-penjualan.html`) agar menyajikan informasi transaksi secara mendetail. Fokus penyesuaian dilakukan pada visualisasi kolom Jumlah (beserta info konversi unit), Harga Satuan yang dinamis, serta rincian kalkulasi informasi diskon (baik persentase maupun nominal).

### Kriteria Penerimaan (Acceptance Criteria)
1. **Penyesuaian Kolom Jumlah (Qty) & Info Unit**
   - Tampilkan jumlah item terjual secara dinamis menyesuaikan metode penjualan yang dipilih (`sellMethod`):
     - Jika eceran (**Pcs**), tampilkan jumlah dalam satuan `Butir / Pcs` dan sertakan estimasi berat `Kg` dalam kurung.
     - Jika grosir (**Kg**), tampilkan jumlah dalam satuan `Kg` dan sertakan estimasi jumlah `Butir` dalam kurung.

2. **Penyesuaian Harga Satuan**
   - Tampilkan harga satuan secara dinamis sesuai metode penjualan yang dipilih kasir pada item tersebut (contoh: `Rp 1.500 / butir` atau `Rp 24.000 / kg`).

3. **Rincian Informasi Diskon & Kalkulasi Keuangan**
   - Tampilkan baris potongan diskon secara detail jika terdapat diskon pada transaksi (`discountAmount > 0`):
     - Tampilkan tipe diskon yang digunakan ("Persentase" atau "Nominal Potongan") beserta nilai input mentahnya (contoh: `Potongan Diskon (Persentase 10%)`).
     - Tampilkan nominal potongan rupiah (`discountAmount`) sebagai baris pengurang.
     - Pastikan kalkulasi akhir dihitung dengan benar: `Total Akhir = Subtotal - discountAmount`.

### Referensi Kode Mockup & Desain
* **File Mockup:** [riwayat-penjualan.html](file:///d:/Product/ventri%20farm/ventri-mock/riwayat-penjualan.html)
* **Fungsi JavaScript Mockup:** Lihat logika pemetaan detail di fungsi `openDetailModal(txId)` (Baris 548-615).
* **Penyimpanan State:** Membaca data objek transaksi dari `localStorage` (`rayfarm_sales`).
