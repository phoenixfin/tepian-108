# Cara Berkontribusi

Siapa saja boleh ikut, tidak perlu pengalaman menulis atau memprogram. Yang perlu hanyalah membaca [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) dan setuju dengan [perjanjian kontributor](CLA.md).

## Jalur kontribusi

Cerita bukan satu-satunya cara ikut. Setiap jalur punya tempat, dan semuanya bisa terkait ke segmen, simpul, atau tokoh tertentu.

| Jalur | Contoh | Tempat |
|---|---|---|
| Menulis | Kisah satu tokoh, cerita pendek di satu simpul, dokumen dalam dunia (berita Cakra Media, memo BPSN, pesan grup warga) | [`bintang/`](bintang/), [`simpul/`](simpul/), [`cerita/`](cerita/) |
| Ilustrasi | Potret tokoh, lanskap simpul, adegan penting | [`seni/`](seni/) |
| Aset visual dan desain | Sprite, tileset, ikon, antarmuka, logo, poster, peta | [`seni/`](seni/) |
| Musik | Aransemen soundtrack, BGM per simpul atau babak, tema segmen dan tokoh | [`audio/`](audio/) |
| Suara | Suara lingkungan (pasar, sungai, pelabuhan), efek suara, pengisi suara | [`audio/`](audio/) |
| Desain game | Mekanik, keseimbangan, alur misi, penulisan dialog | [`game/`](game/) |
| Kode | Prototipe Godot, situs, alat bantu | [`game/`](game/), [`docs/`](docs/), [`alat/`](alat/) |
| Riset daerah | Bahasa, makanan, adat, geografi, dan konflik nyata sebagai bahan simpul | [`simpul/`](simpul/) |
| Penerjemahan | Menerjemahkan atau memeriksa dialog dan istilah dalam bahasa daerah | issue |
| Penyuntingan dan uji main | Membaca ulang, memeriksa konsistensi dengan bible, mencoba prototipe | issue |

Pedoman karya visual ada di [`seni/README.md`](seni/README.md), pedoman musik dan suara di [`audio/README.md`](audio/README.md).

## Ikut berkarya: pilih segmen, simpul, atau tokoh

Ada tiga pintu masuk, dan kamu boleh memilih yang mana saja:

| Pintu | Apa artinya | Di mana |
|---|---|---|
| Segmen | Enam kelompok besar (A sampai F), masing-masing dengan pusat daerahnya | [`segmen/`](segmen/) |
| Simpul | Tempat cerita berpijak, dari Medan sampai Merauke | [`simpul/`](simpul/) |
| Tokoh | Satu dari 108 bintang | [`bintang/`](bintang/) |

Tidak ada satu-satu. Satu tokoh, simpul, atau segmen boleh digarap beberapa orang selama saling berkoordinasi.

1. Pilih pintu masukmu dan buka issue dengan templat "Ikut berkarya". Sebutkan bagian yang ingin kamu garap (latar, suara, satu adegan, relasi, suasana simpul).
2. Issue itu menjadi tempat koordinasi. Penggarap lain di tokoh atau simpul yang sama akan melihatnya. Sepakati pembagian bagian di sana, lalu tulis nama samaranmu sebagai penggarap.
3. Tulis di file tokoh, simpul, atau segmen, pada bagian yang kamu umumkan. Kirim pull request kecil dan sering, bukan satu besar di akhir.
4. Kurator meninjau kecocokan dengan plot utama. Setelah lolos, isinya menjadi kanon luas, dan namamu tercatat sebagai penggarap di `data/bintang.json` atau file simpul.

### Yang terkunci dan yang terbuka

| Terkunci (kanon inti) | Terbuka (kanon luas) |
|---|---|
| Plot utama lima babak dan garis waktunya | Suara, luka, adegan kunci, dan relasi antar tokoh |
| Peta simpul besar: tempat, fungsi, babak aktif | Suasana, bahasa, dan konflik lokal di dalam simpul |
| Enam segmen dan pusat daerahnya | Simpul kecil, cerita pendek, dokumen dalam dunia |
| Per tokoh: nomor, segmen, peran, babak masuk, nasib | Nama (sengaja dikosongkan dulu), asal, dan latar 85 tokoh berstatus terbuka |
| Identitas 23 tokoh inti | Detail tokoh inti, lewat usulan di issue |

Memberi nama atau mengubah asal tokoh terbuka dilakukan lewat issue lebih dulu supaya kurator memperbarui bible dan data sekaligus.

### Aturan koordinasi

- Umumkan bagianmu di issue sebelum menulis panjang. Dua orang tidak menulis adegan yang sama tanpa sepakat.
- Hormati tulisan penggarap lain. Ubah milik orang lain hanya lewat komentar atau pull request yang sudah disetujui.
- Bila dua versi bertabrakan, kurator membantu menyatukannya atau menaruh keduanya sebagai versi alternatif (non-kanon).
- Bila tidak ada kabar selama tiga bulan, bagianmu bisa dibuka kembali setelah pemberitahuan di issue.
- Tokoh inti dipegang pemrakarsa, tetapi siapa saja boleh mengusulkan detail lewat issue.

## Menulis cerita

- Pakai templat di [`templat/cerita.md`](templat/cerita.md).
- Simpan di `cerita/non-kanon/` bila bebas, atau di `cerita/kanon/` bila ingin diajukan sebagai kanon luas.
- Nama file: `babak-N-judul-singkat.md`, misalnya `babak-2-kurban-terakhir.md`.
- Cerita kanon luas harus cocok dengan garis waktu di [`bible/04-bible-alur.md`](bible/04-bible-alur.md).

## Gaya penulisan

- Bahasa Indonesia yang wajar. Bahasa daerah dan logat boleh, beri konteks agar pembaca memahami.
- Realis: tidak ada kekuatan ajaib.
- Hindari tanda pisah panjang. Pakai koma, titik, atau kalimat baru.
- Peringatan konten di awal bila ada kekerasan, penyiksaan, atau kematian.

## Alur kerja Git

1. Fork repositori.
2. Buat cabang: `bintang/045-chimou`, `cerita/judul-singkat`, atau `game/fitur`.
3. Satu pull request untuk satu hal.
4. Isi templat pull request.

Belum terbiasa dengan Git? Kirim tulisanmu lewat issue atau grup komunitas, kurator akan membantu memasukkannya.

## Mengubah data

Data bintang dan simpul hanya diubah di `data/`, lalu jalankan:

```
python3 alat/bangun.py
```

Skrip ini memperbarui blok data di setiap file bintang dan simpul, indeks, serta data landing page. Tulisan di luar blok data tidak tersentuh.

## Kurasi

Kurator memeriksa empat hal:
1. Mematuhi kode etik.
2. Tidak bertentangan dengan kanon inti.
3. Tidak memuat nama orang atau lembaga nyata.
4. Layak baca. Kurator boleh meminta revisi, bukan menolak karena selera.
