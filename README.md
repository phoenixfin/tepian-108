# Tepian 108

Proyek terbuka untuk membangun satu semesta cerita bersama: novel, cerita pendek, riset daerah, seni, musik, dan sebuah game.

**Premis.** Indonesia, 2030. Negara dikendalikan empat keluarga konglomerat dan satu badan koordinasi yang tumbuh diam-diam di antara mereka. Seorang pemuda Kalimantan yang baru bebas dari salah tangkap membuka dapur umum di pabrik mangkrak di Jakarta. Dapur itu menjadi gerakan saling jaga, diburu, terpecah, lalu menyebar ke seluruh negeri. Seratus delapan orang yang dimasukkan rezim ke dalam satu daftar buronan akhirnya menemukan satu sama lain pada 17 Agustus 2030 di IKN.

Semesta ini terinspirasi struktur 108 pendekar dalam *Water Margin* (Shuihu Zhuan), kisah klasik Tiongkok tentang para buronan yang berkumpul di tepian air. Semua orang, partai, perusahaan, dan lembaga di dalamnya adalah rekaan.

## Mulai dari mana

| Kamu ingin | Buka |
|---|---|
| Memahami dunianya | [`bible/`](bible/) mulai dari `01-bible-inti.md` |
| Memilih tokoh untuk diadopsi | [`bintang/`](bintang/) |
| Menulis tentang daerahmu | [`simpul/`](simpul/) |
| Membaca atau menulis cerita | [`cerita/`](cerita/) |
| Ikut membuat game | [`game/`](game/) |
| Tahu aturan mainnya | [`CONTRIBUTING.md`](CONTRIBUTING.md) dan [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) |
| Bergabung dengan komunitas | [`KOMUNITAS.md`](KOMUNITAS.md) |

## Lapisan kanon

| Lapisan | Isi | Siapa yang memutuskan |
|---|---|---|
| Kanon inti | Bible dan novel utama | Pemrakarsa |
| Kanon luas | Karya kontributor yang lolos kurasi | Kurator |
| Non-kanon | Karya bebas, fan fiction, eksperimen | Siapa saja |

Kanon luas tidak boleh bertentangan dengan kanon inti. Non-kanon boleh ke mana saja selama mematuhi kode etik.

## Struktur repositori

```
bible/        Bible dunia, tokoh, dan alur (kanon inti)
bintang/      Satu file per bintang (108), bisa diadopsi
simpul/       Satu file per simpul daerah
cerita/       kanon/ dan non-kanon/
templat/      Templat tokoh, simpul, dan cerita
game/         Dokumen desain dan prototipe game
data/         bintang.json dan simpul.json, sumber data tunggal
alat/         Skrip pembangun file turunan
docs/         Landing page (GitHub Pages)
```

## Untuk pengelola

- Data bintang dan simpul hanya diubah di `data/`. Setelah itu jalankan `python3 alat/bangun.py` untuk memperbarui `bintang/`, `simpul/`, dan `docs/data.js`. Tulisan kontributor di dalam file bintang dan simpul tidak akan tertimpa.
- Tautan grup, email, dan alamat repositori untuk landing page diatur di `docs/config.js`.
- Aktifkan GitHub Pages dari folder `docs/` di cabang utama.
- Aktifkan GitHub Discussions untuk diskusi terbuka.

## Lisensi

- Konten (bible, cerita, data, seni): [CC BY-SA 4.0](LICENSE-CONTENT).
- Kode (game, situs, skrip): [MIT](LICENSE-CODE).
- Kontribusi tunduk pada [perjanjian kontributor](CLA.md).
