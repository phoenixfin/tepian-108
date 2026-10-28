# Cara Berkontribusi

Siapa saja boleh ikut, tidak perlu pengalaman menulis atau memprogram. Yang perlu hanyalah membaca [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) dan setuju dengan [perjanjian kontributor](CLA.md).

## Jalur kontribusi

| Jalur | Contoh |
|---|---|
| Menulis | Kisah satu bintang, cerita pendek di satu simpul, dokumen dalam dunia (berita Cakra Media, memo BPSN, pesan grup warga) |
| Riset daerah | Bahasa, makanan, adat, geografi, dan konflik nyata di sebuah daerah sebagai bahan simpul |
| Seni | Potret tokoh, peta simpul, ilustrasi adegan |
| Musik dan suara | Tema per segmen, suara lingkungan (pasar, sungai, pelabuhan) |
| Desain game | Mekanik, keseimbangan, alur misi |
| Kode | Prototipe game, situs, alat bantu |
| Penyuntingan | Membaca ulang, memeriksa konsistensi dengan bible |

## Mengadopsi bintang

Mengadopsi berarti menjadi penanggung jawab kisah, suara, dan riset satu tokoh.

1. Pilih bintang berstatus terbuka di [`bintang/`](bintang/) atau di landing page.
2. Buka issue dengan templat "Adopsi bintang".
3. Kurator mengonfirmasi dan mengubah status di `data/bintang.json`.
4. Isi file bintangmu di bagian di luar blok data otomatis, lalu kirim pull request.
5. Kurator meninjau kesesuaian dengan kanon. Setelah lolos, isinya menjadi kanon luas.

Ketentuan:
- Satu orang mengadopsi paling banyak dua bintang sekaligus, agar bintang lain tetap terbuka.
- Bila tidak ada kabar selama tiga bulan, bintang bisa dibuka kembali setelah pemberitahuan.
- Tokoh inti dipegang pemrakarsa, tetapi siapa saja boleh mengusulkan detail lewat issue.
- Usia, asal, peran, dan nasib tokoh di bible adalah kanon. Bila ingin mengubahnya, ajukan lewat issue lebih dulu.

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
