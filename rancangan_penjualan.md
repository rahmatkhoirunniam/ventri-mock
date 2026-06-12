# Rancangan Sistem Penjualan & Kasir (POS) — RayFarm

Dokumen ini merancang modul penjualan/kasir untuk aplikasi **RayFarm** berbasis data hasil produksi dan log harian yang sudah berjalan.

---

## 1. Latar Belakang & Analisis Kebutuhan

Log harian kandang mencatat hasil produksi telur secara ganda:
* **Jumlah Butir (Pcs)**
* **Total Berat (Kg)**

Karena telur diproduksi setiap hari dengan kondisi pakan dan umur flock yang dinamis, **rasio berat per butir berubah-ubah setiap harinya** (misal: Hari ini 100 butir = 6.2 kg (62g/butir), besok 100 butir = 6.5 kg (65g/butir)). 

Oleh karena itu, modul penjualan/kasir harus mampu:
1. **Mendukung Dua Metode Penjualan:**
   * **Eceran (Butir):** Harga dihitung per butir (Pcs) menggunakan `hargaJual` komoditas.
   * **Grosir (Kg):** Harga dihitung per kilogram (Kg) menggunakan `hargaJualKg` komoditas.
2. **Pemotongan Stok Proporsional:**
   * Jika dijual per **Butir**, berat (kg) dalam batch harus berkurang secara proporsional sesuai rata-rata berat per butir di lot tersebut.
   * Jika dijual per **Kg**, jumlah (butir) dalam batch harus berkurang secara proporsional.
3. **Pemilihan Lot/Batch Cerdas:**
   * Mendukung alokasi otomatis menggunakan prinsip **FEFO (First Expired First Out)** / **FIFO (First In First Out)** untuk telur segar.
   * Memungkinkan kasir memilih batch tertentu secara manual (jika pembeli memesan hari panen tertentu).

---

## 2. Struktur Data Baru (Skema Data)

### 2.1 Penyesuaian pada Master Komoditas (`commodities`)
Menambahkan atribut `hargaJualKg` untuk mendukung penjualan grosir berbasis berat.

```json
{
  "id": "HSL-BFYUUV9W",
  "name": "Telur Komersial / Normal (Grade A)",
  "category": "Hasil Produksi",
  "unitName": "Pcs",
  "weightPerUnit": 1,
  "minAlert": 10,
  "nutrisi": "Telur segar kualitas premium",
  "suhu": "Suhu Dingin (4-10°C)",
  "hargaBeli": 0,
  "hargaJual": 1500,       // Harga per Butir/Pcs
  "hargaJualKg": 24000,    // [BARU] Harga per Kg untuk penjualan grosir
  "batches": [
    {
      "lot": "Batch Bravo (12/06/2026)",
      "gudang": "Gudang Hasil Produksi",
      "qty": 1000,         // Sisa stok dalam butir (Pcs)
      "qtyKg": 62.5,       // Sisa stok dalam Kg
      "receiveDate": "2026-06-12",
      "expiryDate": "2026-07-12"
    }
  ]
}
```

### 2.2 Model Data Transaksi Penjualan (`sales_transactions`)
Data riwayat transaksi kasir disimpan di `localStorage.setItem('rayfarm_sales', ...)` dengan struktur:

```json
{
  "id": "TX-20260612-0001",
  "dateTime": "2026-06-12 11:34:00",
  "customerName": "Toko Kue Ibu Budi",
  "items": [
    {
      "commodityId": "HSL-BFYUUV9W",
      "commodityName": "Telur Komersial / Normal (Grade A)",
      "sellMethod": "Kg",               // "Pcs" atau "Kg"
      "lotSelected": "Batch Bravo (12/06/2026)",
      "qtySold": 240,                   // Butir (dihitung proporsional jika beli Kg)
      "weightSold": 15.0,               // Kg (dihitung proporsional jika beli Pcs)
      "pricePerUnit": 24000,            // Sesuai sellMethod (harga per butir atau per kg)
      "subtotal": 360000
    }
  ],
  "subtotal": 360000,                   // [BARU] Total belanja sebelum diskon
  "discountType": "Percent",            // [BARU] "Percent", "Nominal", atau "None"
  "discountValue": 10,                  // [BARU] Nilai input (persen atau rupiah)
  "discountAmount": 36000,              // [BARU] Nominal potongan diskon dalam Rp
  "totalPrice": 324000,                 // Total bayar akhir setelah dipotong diskon
  "paymentMethod": "Tunai",             // "Tunai", "Transfer Bank", "Qris"
  "amountPaid": 350000,
  "amountReturn": 26000,
  "operator": "Kasir-Arief"
}
```

---

## 3. Algoritma Pengurangan Stok Proporsional

Ketika transaksi disubmit, stok di `rayfarm_commodities` dipotong berdasarkan lot/batch yang dipilih:

### Kasus A: Penjualan Berdasarkan Butir (Pcs)
Misal pembeli membeli telur sebanyak $Q_{sell}$ butir dari lot yang memiliki total stok $Q_{lot}$ butir dan berat $W_{lot}$ kg.
1. Kurangi sisa butir: 
   $$Q_{new} = Q_{lot} - Q_{sell}$$
2. Hitung berat yang berkurang secara proporsional:
   $$W_{sold} = Q_{sell} \times \left(\frac{W_{lot}}{Q_{lot}}\right)$$
3. Kurangi sisa berat: 
   $$W_{new} = W_{lot} - W_{sold}$$

### Kasus B: Penjualan Berdasarkan Berat (Kg)
Misal pembeli membeli telur sebanyak $W_{sell}$ kg dari lot yang memiliki total stok $Q_{lot}$ butir dan berat $W_{lot}$ kg.
1. Kurangi sisa berat: 
   $$W_{new} = W_{lot} - W_{sell}$$
2. Hitung jumlah butir yang berkurang secara proporsional (dibulatkan ke bilangan bulat terdekat):
   $$Q_{sold} = \text{round}\left(W_{sell} \times \left(\frac{Q_{lot}}{W_{lot}}\right)\right)$$
3. Kurangi sisa butir: 
   $$Q_{new} = Q_{lot} - Q_{sold}$$

### 3.3 Aturan Nilai Default & Konversi Otomatis (UX Card Specification)

Untuk memudahkan developer membuat task card, berikut adalah aturan default input dan konversi yang harus diimplementasikan pada modal kasir:

1. **Inisialisasi Nilai Default Modal:**
   * Saat modal penjualan pertama kali dibuka, satuan jual default adalah **Butir / Pcs** dengan nilai input default **`1` Pcs**.
   * Sistem merekomendasikan batch tertua secara otomatis (**FEFO** sebagai default lot pilihan).

2. **Konversi UX Pintar saat Mengganti Satuan Jual (Pcs <=> Kg):**
   * Jika pengguna mengubah unit dari **Pcs ke Kg**, nilai input saat ini harus langsung dikonversi secara otomatis:
     $$\text{Nilai Baru (Kg)} = \text{Nilai Lama (Pcs)} \times \left(\frac{W_{lot}}{Q_{lot}}\right)$$
     *(Dibulatkan ke 2 desimal)*
   * Jika pengguna mengubah unit dari **Kg ke Pcs**, nilai input saat ini dikonversi dan dibulatkan ke bilangan bulat terdekat:
     $$\text{Nilai Baru (Pcs)} = \text{round}\left(\text{Nilai Lama (Kg)} \times \left(\frac{Q_{lot}}{W_{lot}}\right)\right)$$
   * Jika hasil konversi melebihi stok lot terpilih, nilai input harus dibatasi (**capping**) maksimal sesuai sisa stok unit yang aktif.
   * Jika input kosong atau bernilai $\le 0$, maka default menjadi **`1` Pcs** atau **`1.0` Kg** setelah diganti.

3. **Perhitungan Default Berat/Butir Proporsional (Sisi Database/Sistem):**
   * Meskipun kasir hanya memasukkan satu unit (misal: Pcs), sistem akan menyimpan sisa berat default secara proporsional.
   * **Default Berat untuk Penjualan Pcs:** $\text{weightSold} = \text{qtySold} \times (W_{lot} / Q_{lot})$
   * **Default Pcs untuk Penjualan Kg:** $\text{qtySold} = \text{round}(\text{weightSold} \times (Q_{lot} / W_{lot}))$

4. **Fitur Diskon Transaksi (Persentase / Rupiah):**
   * Kasir dapat memasukkan potongan harga untuk keseluruhan transaksi belanja pada panel checkout.
   * **Tipe Diskon:**
     * **Tanpa Diskon (None):** Nilai diskon dinonaktifkan (disabled) dan diset ke `0`.
     * **Persentase (%):** Kasir menginput nilai persentase (batas `0` s.d. `100`). Potongan dihitung dengan formula: $\text{discountAmount} = \text{round}\left(\frac{\text{Percent}}{100} \times \text{Subtotal}\right)$.
     * **Nominal Rupiah (Rp):** Kasir menginput jumlah potongan langsung dalam Rupiah (batas `0` s.d. $\text{Subtotal}$).
   * **Perhitungan Uang Kembali & Validasi:**
     * **Total Akhir (Grand Total):** $\text{totalPrice} = \text{Subtotal} - \text{discountAmount}$.
     * **Kembalian:** $\text{amountReturn} = \text{Uang Diterima} - \text{totalPrice}$.
     * Tombol "Selesaikan Transaksi" dinonaktifkan jika uang yang diterima kurang dari `totalPrice`.

---

## 4. Rancangan Wireframe & Layout Kasir (POS UI)

Layout kasir menggunakan desain **Split Screen (Two-Column Layout)** yang responsif dan elegan:

```
+--------------------------------------------------------------------------------+
|  [🍳 RayFarm POS] | Kasir: Samsudin                        12 Jun 2026, 11:34  |
+--------------------------------------------------------------------------------+
| Cari Produk: [ Cari nama komoditas... (QR / Barcode) ]                         |
+-------------------------------------------------------+------------------------+
|                                                       | Detail Keranjang       |
| KARTU PILIHAN PRODUK (Katalog)                        | +--------------------+ |
| +-------------------------+ +-----------------------+ | | Telur Grade A       | |
| |🥚 Telur Normal Grade A  | |🥚 Telur Retak Grade B | | | Lot: Batch Bravo   | |
| | Stok: 1.000 Pcs (62 Kg) | | Stok: 150 Pcs (9 Kg)  | | | Metode: [ Pcs |(Kg)]| |
| | Rp 1.500 / Rp 24.000    | | Rp 1.000 / Rp 16.000  | | | Qty: [ 15.0 ] Kg   | |
| |                         | |                       | | | Rp 24.000/kg       | |
| | [ + Tambah Keranjang ]  | | [ + Tambah Keranjang ]| | | Sub: Rp 360.000 [x]| |
| +-------------------------+ +-----------------------+ | +--------------------+ |
|                                                       | Total: Rp 360.000      |
| +-------------------------+                           |                        |
| |🐔 Ayam Afkir (Spent Hen)|                           | Pembayaran:            |
| | Stok: 40 Pcs (40 Kg)    |                           | [ Tunai | Transfer ]   |
| | Rp 35.000 / Pcs         |                           | Bayar:   [ 400.000   ] |
| |                         |                           | Kembali: Rp 40.000     |
| | [ + Tambah Keranjang ]  |                           |                        |
| +-------------------------+                           | [ PROSES & CETAK ]     |
+-------------------------------------------------------+------------------------+
```

### 4.1 Bagian Kiri: Galeri Produk & Pemilihan Lot
* Menampilkan daftar komoditas kategori **Hasil Produksi**.
* Setiap kartu produk menampilkan informasi stok ganda (butir & kg) serta harga beli/jual.
* Saat kartu diklik, muncul pop-up pemilihan lot:
  * **Default (Rekomendasi FEFO/FIFO):** Sistem memilih lot tertua secara otomatis.
  * **Pilihan Manual:** Dropdown/list lot yang aktif agar kasir dapat memilih lot tertentu.

### 4.2 Bagian Kanan: Panel Transaksi / Keranjang
* Daftar item yang dibeli dengan opsi metode penjualan: **Toggle Pcs / Kg**.
* Input dinamis:
  * Jika memilih **Pcs**, input memvalidasi nilai sisa butir di lot.
  * Jika memilih **Kg**, input memvalidasi sisa berat kg di lot.
* Ringkasan Pembayaran: Total harga, Metode pembayaran, Input jumlah bayar, dan kalkulasi kembalian real-time.

---

## 5. Rencana Verifikasi & Uji Coba

1. **Uji Validasi Form:** Pastikan kasir tidak dapat menjual melebihi stok lot yang tersedia (baik dalam butir maupun kg).
2. **Uji Akurasi Rumus:** Lakukan transaksi pembelian telur 10 kg, periksa apakah sisa stok butir berkurang secara proporsional dan tidak terjadi nilai minus atau desimal aneh pada stok butir.
3. **Uji Persistence Data:** Pastikan riwayat transaksi tersimpan dengan benar di `localStorage` dan langsung meng-update stok di halaman utama (Katalog Komoditas) serta halaman log kandang.
