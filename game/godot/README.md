# Prototipe Godot, Babak 1

Kerangka **prototipe abu-abu** (teks dan tombol, tanpa seni) untuk menguji lingkar inti Babak 1: temui, bantu, rekrut, fasilitas terbuka, tekanan, dan malam buka puasa.

> **Status: belum diuji.** Kerangka ini ditulis tanpa menjalankan Godot. Kemungkinan ada galat kecil. Perbaiki lewat pull request, dan jangan ragu mengubah aturannya.

## Cara menjalankan

1. Pasang [Godot 4.2 atau lebih baru](https://godotengine.org/).
2. Buka folder `game/godot/` sebagai proyek (`project.godot`).
3. Jalankan (F5). Data dibaca langsung dari `data/bintang.json` di akar repositori, jadi kalau nama atau peran tokoh berubah, prototipe ikut berubah.

## Yang ada

- `scripts/data_loader.gd`: membaca data tokoh dan memberi label untuk tokoh yang belum bernama.
- `scripts/main.gd`: seluruh lingkar permainan, dibangun dari kode (tanpa tata letak di editor).
- Sumber daya: makanan, uang, rasa aman, kepercayaan.
- Tiga fasilitas (dapur umum, klinik, bengkel) yang terbuka ketika tokoh tertentu bergabung.
- Satu bentuk tekanan: cek izin dan audit setiap tiga hari.
- Akhir: malam ke-10, apakah dapur cukup kuat untuk buka puasa bersama.

## Yang belum ada (silakan ambil)

- Seni, suara, dan antarmuka sungguhan.
- Dialog dan kebutuhan unik tiap tokoh (sekarang semua tokoh memakai biaya yang sama).
- Pilihan moral dan keputusan terhadap pengkhianat.
- Aksi asimetris (blokade, logistik, siaran) yang menjadi pengganti perang.

Rancangan lengkapnya ada di [`../README.md`](../README.md). Pilar utamanya: saling jaga lebih kuat daripada menyerang, setiap orang punya fungsi, keputusan punya harga, banyak sudut pandang.
