# Panduan Pengelola

Folder ini untuk pemrakarsa dan kurator: daftar hal yang perlu dilakukan sendiri (saya tidak bisa membuatkan akun atau memasang di tempatmu), dan bahan siap pakai untuk membuka proyek ke publik.

## Daftar kerja pertama

Urutan dari yang paling berdampak:

- [ ] **Buat grup obrolan** (Discord atau Telegram), lalu isi `grup` di [`docs/config.js`](../docs/config.js). Struktur dan pesan sambutan ada di [`komunitas.md`](komunitas.md).
- [ ] **Siapkan email proyek**, lalu isi `email` di `docs/config.js`. Halaman Kirim karya dan Tata kelola otomatis memakainya.
- [ ] **Buat kategori Discussions.** Discussions sudah diaktifkan. Buat kategori `Kenalan` dan `Usul nama` (nama kategori harus cocok dengan templat di `.github/DISCUSSION_TEMPLATE/`), dan tambahkan `Tantangan` bila perlu.
- [ ] **Buat formulir kirim karya** (Tally atau Google Form) untuk yang tidak memakai GitHub, lalu isi `formulir` di `docs/config.js`. Atur agar jawaban masuk ke emailmu.
- [ ] **Daftar analitik tanpa cookie** (misalnya GoatCounter), lalu isi `analitik` di `docs/config.js` dengan kode situsmu.
- [ ] **Buka kanal dana** bila siap (Saweria, Trakteer, Ko-fi, GitHub Sponsors), lalu isi `dukungan` di `docs/config.js` dan buka [`.github/FUNDING.yml`](../.github/FUNDING.yml). Lihat prinsip di halaman Dukung.
- [ ] **Tunjuk penjaga segmen.** Pakai [`rekrut-penjaga-segmen.md`](rekrut-penjaga-segmen.md) sebagai bahan ajakan.
- [ ] **Periksa bible/.** Folder itu masih memuat nama kerja untuk tokoh yang di situs sengaja dikosongkan. Putuskan: biarkan, samarkan, atau pindahkan.
- [ ] **Tinjau cerita dan tema contoh** di `cerita/non-kanon/` dan `audio/tema-segmen/`. Keduanya draf dari asisten penulisan, belum kanon.
- [ ] **Uji prototipe Godot** di `game/godot/`. Kerangka itu belum pernah dijalankan.
- [ ] **Periksa aturan hak cipta dan merek** bersama ahli hukum sebelum ada dana atau perilisan.

## Rutin mingguan

- Perbarui [`data/kabar.json`](../data/kabar.json): tantangan pekan ini dan satu catatan pengembangan.
- Jalankan `python alat/bangun.py` setelah mengubah data, lalu push.
- Setujui atau minta revisi karya yang masuk. Isi `penggarap` dan `karya` di `data/bintang.json` untuk karya yang diterima, dan tambahkan penyumbang baru ke `data/kontributor.json`.
- Balas issue dan Discussions baru.

## Bahan siap pakai

| File | Isi |
|---|---|
| [`komunitas.md`](komunitas.md) | Struktur channel, pesan sambutan, dan aturan grup |
| [`promosi.md`](promosi.md) | Draf postingan, caption, dan kit pers (Indonesia dan Inggris) |
| [`game-jam.md`](game-jam.md) | Aturan dan penilaian "Tepian 108 Jam" |
| [`rekrut-penjaga-segmen.md`](rekrut-penjaga-segmen.md) | Ajakan dan tanggung jawab penjaga segmen |
