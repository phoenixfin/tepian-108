# Game Tepian 108

Dokumen desain awal. Semua bagian terbuka untuk diskusi lewat issue berlabel `game`.

## Konsep

RPG naratif tentang merekrut 108 orang dan menjaga mereka tetap hidup. Tidak ada pertempuran senjata sebagai inti permainan. "Perang" di game ini adalah aksi asimetris: blokade, logistik, mogok, siaran, dan pemilihan waktu.

## Pilar desain

1. **Saling jaga lebih kuat daripada menyerang.** Pemain menang dengan membuat lawan tidak punya alasan untuk menyerang, bukan dengan mengalahkan semua musuh.
2. **Setiap orang punya fungsi.** Setiap bintang yang direkrut menambah sesuatu yang nyata ke markas atau jaringan.
3. **Keputusan punya harga.** Pilihan moral, terutama terhadap pengkhianat, mengubah kepercayaan segmen dan nasib tokoh.
4. **Banyak sudut pandang.** Pemain berpindah antar tokoh sudut pandang dan hanya melihat kepingan gambaran besar.

## Lingkar permainan inti

```
Jelajahi simpul ──> Temui orang dan kebutuhannya ──> Bantu atau rekrut
      ^                                                    │
      │                                                    v
Hadapi tekanan  <── Kembangkan markas pengungsian <── Fungsi baru terbuka
(razia, fitnah,
 pengkhianatan)
```

## Sistem

| Sistem | Ringkasan |
|---|---|
| Rekrutmen | 108 bintang dari `data/bintang.json`. Tiap bintang punya syarat rekrut (misi kecil, kebutuhan yang dipenuhi, atau keputusan tertentu) |
| Markas pengungsian | Pabrik, lalu simpul-simpul. Tiap bintang bumi membuka fasilitas: dapur, klinik, bengkel, radio, gudang, perahu |
| Kebutuhan dan tekanan | Sumber daya harian (makanan, obat, uang, rasa aman) melawan tekanan rezim (izin, audit, razia, fitnah) |
| Aksi asimetris | Pengganti perang besar. Pemain menyusun aksi serentak di beberapa simpul dengan logistik, kurir, waktu, dan narasi publik sebagai kartu |
| Kepercayaan segmen | Enam meter kepercayaan (A sampai F). Naik turun karena keputusan, bukan karena dialog yang "benar" |
| Keputusan pengkhianat | Momen pilihan yang menentukan nasib tokoh dan kepercayaan segmen |
| Daftar 108 | Daftar buronan rezim sebagai antarmuka: makin banyak bintang terkumpul, makin lengkap daftar, makin besar tekanan |
| Buku catatan Damar | Antarmuka koleksi: nama setiap orang yang pernah ditolong |

## Prototipe pertama: Babak 1

Tujuan: membuktikan bahwa lingkar inti menyenangkan.

- Satu tokoh sudut pandang: Damar.
- Satu lokasi: pabrik Cakung dan sekitarnya.
- Sekitar 10 bintang yang bisa direkrut: Jeki, Mak Inah, Yoseph, Rangga, Haris, Laras, Nadia, Fransiska, Pak Sobari, Tarno.
- Tiga fasilitas: dapur umum, klinik, bengkel.
- Satu bentuk tekanan: cek izin dan audit.
- Akhir prototipe: malam ketika 40 orang buka puasa bersama.

## Teknologi

- **Mesin:** Godot 4 (sumber terbuka, ringan, cocok untuk kolaborasi).
- **Bahasa:** GDScript.
- **Data:** dibaca langsung dari `data/bintang.json` dan `data/simpul.json`, agar game dan cerita memakai satu sumber.
- **Gaya visual:** belum ditentukan. Usulan awal: 2D, ilustrasi tangan, palet malam sungai.

## Struktur folder yang direncanakan

```
game/
├── README.md        dokumen ini
├── desain/          dokumen desain per sistem
├── seni/            konsep seni dan aset (dengan lisensi jelas)
├── audio/
└── godot/           proyek Godot
```

## Peta jalan

1. Diskusi dan sepakati pilar serta lingkar inti.
2. Dokumen desain sistem rekrutmen dan markas.
3. Konsep seni: Damar, pabrik, dapur umum.
4. Prototipe abu-abu (tanpa seni) untuk Babak 1.
5. Uji main bersama komunitas.

## Cara ikut

Buka issue berlabel `game`, atau perkenalkan diri di grup komunitas (lihat [`KOMUNITAS.md`](../KOMUNITAS.md)) dan sebutkan keahlianmu: desain, pemrograman Godot, seni, audio, atau penulisan dialog.
