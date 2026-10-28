#!/usr/bin/env python3
"""Membangun ulang file turunan dari data/bintang.json dan data/simpul.json.

Yang dibuat atau diperbarui:
- bintang/NNN-nama-bintang.md  (hanya blok data otomatis yang ditimpa)
- bintang/README.md            (indeks, dibuat ulang penuh)
- simpul/<slug>.md             (hanya blok data otomatis yang ditimpa)
- simpul/README.md             (indeks, dibuat ulang penuh)
- docs/data.js                 (data untuk landing page)

Tulisan kontributor di luar blok data tidak pernah disentuh.
Jalankan dari akar repositori:  python3 alat/bangun.py
"""
import json
import re
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
MULAI = "<!-- data:mulai (dibuat otomatis oleh alat/bangun.py, jangan diubah manual) -->"
SELESAI = "<!-- data:selesai -->"
SEGMEN = {
    "A": ("Utama", "Rumah"),
    "B": ("Adat", "Tanah dan sumpah"),
    "C": ("Militer", "Pelaksana"),
    "D": ("Birokrat", "Dalam lingkaran"),
    "E": ("Akademisi", "Pola"),
    "F": ("Bisnis", "Modal dan jalur"),
}
STATUS = {
    "inti": "Tokoh inti (dipegang penulis kanon inti)",
    "terbuka": "Terbuka untuk diadopsi",
    "diadopsi": "Sudah diadopsi",
}


def slug(teks):
    teks = teks.lower()
    teks = re.sub(r"[^a-z0-9]+", "-", teks)
    return teks.strip("-")


def masuk(b):
    if b["perekrut"].startswith("PoV"):
        jenis = "tokoh sudut pandang parsial" if "parsial" in b["perekrut"] else "tokoh sudut pandang"
        return f"Babak {b['babak']}, sebagai {jenis}"
    return f"Babak {b['babak']}, direkrut oleh {b['perekrut']}"


def nama_file_bintang(b):
    return f"{b['no']:03d}-{slug(b['bintang'])}-{slug(b['nama'])}.md"


def tulis_dengan_blok(path, judul, blok, badan_awal):
    """Tulis file baru, atau ganti blok data saja bila file sudah ada."""
    isi_blok = f"{MULAI}\n{blok.strip()}\n{SELESAI}"
    if path.exists():
        lama = path.read_text(encoding="utf-8")
        pola = re.compile(re.escape(MULAI) + r".*?" + re.escape(SELESAI), re.S)
        if pola.search(lama):
            baru = pola.sub(lambda _: isi_blok, lama)
        else:
            baru = f"# {judul}\n\n{isi_blok}\n\n{lama}"
    else:
        baru = f"# {judul}\n\n{isi_blok}\n\n{badan_awal.strip()}\n"
    path.write_text(baru, encoding="utf-8")


BADAN_BINTANG = """
## Kanon

Ringkasan kanon tokoh ini ada di [`bible/03-bible-tokoh.md`](../bible/03-bible-tokoh.md).
Bagian di bawah ini diisi pengadopsi dan ditinjau kurator sebelum menjadi kanon luas.

## Latar dan suara

_Belum diisi._

## Luka atau kebutuhan

_Belum diisi._

## Adegan kunci

_Belum diisi._

## Relasi

_Belum diisi._

## Catatan riset

_Sumber, catatan bahasa daerah, atau detail lokal yang dipakai._
"""

BADAN_SIMPUL = """
## Kanon

Ringkasan kanon simpul ini ada di [`bible/02-bible-dunia.md`](../bible/02-bible-dunia.md).

## Suasana dan geografi

_Belum diisi._

## Konflik lokal

_Belum diisi._

## Orang-orang di simpul ini

_Belum diisi._

## Catatan riset

_Sumber, foto rujukan (dengan izin), istilah lokal._
"""


def bangun_bintang(data):
    folder = AKAR / "bintang"
    folder.mkdir(exist_ok=True)
    for b in data:
        seg_nama, seg_fungsi = SEGMEN[b["segmen"]]
        pengadopsi = b.get("pengadopsi") or "Belum ada"
        blok = f"""
| | |
|---|---|
| Nomor | {b['no']} dari 108 |
| Bintang | {b['bintang']} {b['kanji']} ({'bintang langit' if b['langit'] else 'bintang bumi'}) |
| Nama | {b['nama']} |
| Usia dan asal | {b['usia_asal']} |
| Segmen | {b['segmen']}, {seg_nama} ({seg_fungsi}) |
| Peran | {b['peran']} |
| Masuk cerita | {masuk(b)} |
| Status | {STATUS[b['status']]} |
| Pengadopsi | {pengadopsi} |
"""
        tulis_dengan_blok(folder / nama_file_bintang(b), f"{b['nama']}", blok, BADAN_BINTANG)

    baris = []
    for b in data:
        baris.append(
            f"| {b['no']} | {b['bintang']} {b['kanji']} | [{b['nama']}]({nama_file_bintang(b)}) "
            f"| {b['segmen']} | {b['peran']} | {b['babak']} | {STATUS[b['status']]} |"
        )
    jumlah = {s: sum(1 for b in data if b["status"] == s) for s in STATUS}
    indeks = f"""# Papan 108 Bintang

Satu file untuk setiap bintang. Bintang berstatus **terbuka** bisa diadopsi: kamu menjadi penanggung jawab kisah, suara, dan riset tokoh itu. Caranya ada di [`CONTRIBUTING.md`](../CONTRIBUTING.md).

Ringkasan: {jumlah['inti']} inti, {jumlah['terbuka']} terbuka, {jumlah['diadopsi']} diadopsi.

File ini dibuat otomatis oleh `alat/bangun.py`. Untuk mengubah status, ubah `data/bintang.json` lalu jalankan skripnya.

| No | Bintang | Nama | Segmen | Peran | Babak | Status |
|---|---|---|---|---|---|---|
""" + "\n".join(baris) + "\n"
    (folder / "README.md").write_text(indeks, encoding="utf-8")


def bangun_simpul(data):
    folder = AKAR / "simpul"
    folder.mkdir(exist_ok=True)
    for s in data:
        blok = f"""
| | |
|---|---|
| Wilayah | {s['wilayah']} |
| Fungsi dalam cerita | {s['fungsi']} |
| Babak aktif | {s['babak']} |
| Segmen | {', '.join(s['segmen'])} |
"""
        tulis_dengan_blok(folder / f"{s['slug']}.md", s["nama"], blok, BADAN_SIMPUL)
    baris = [f"| [{s['nama']}]({s['slug']}.md) | {s['wilayah']} | {s['babak']} | {', '.join(s['segmen'])} |" for s in data]
    indeks = """# Simpul Daerah

Simpul adalah tempat cerita berpijak. Kontributor dari daerah mana pun bisa memperkaya simpul yang ada, atau mengusulkan simpul baru lewat issue "Usulan simpul".

File ini dibuat otomatis oleh `alat/bangun.py`.

| Simpul | Wilayah | Babak | Segmen |
|---|---|---|---|
""" + "\n".join(baris) + "\n"
    (folder / "README.md").write_text(indeks, encoding="utf-8")


def bangun_situs(bintang, simpul):
    publik = [
        {k: b[k] for k in ("no", "bintang", "kanji", "langit", "segmen", "nama", "usia_asal", "peran", "babak", "status", "pengadopsi")}
        | {"file": nama_file_bintang(b)}
        for b in bintang
    ]
    isi = (
        "// Dibuat otomatis oleh alat/bangun.py. Jangan diubah manual.\n"
        f"window.TEPIAN_BINTANG = {json.dumps(publik, ensure_ascii=False)};\n"
        f"window.TEPIAN_SIMPUL = {json.dumps(simpul, ensure_ascii=False)};\n"
    )
    (AKAR / "docs").mkdir(exist_ok=True)
    (AKAR / "docs" / "data.js").write_text(isi, encoding="utf-8")


def main():
    bintang = json.loads((AKAR / "data" / "bintang.json").read_text(encoding="utf-8"))
    simpul = json.loads((AKAR / "data" / "simpul.json").read_text(encoding="utf-8"))
    assert len(bintang) == 108, "data/bintang.json harus berisi tepat 108 bintang"
    assert len({b["no"] for b in bintang}) == 108, "nomor bintang ganda"
    for b in bintang:
        assert b["status"] in STATUS, f"status tidak dikenal pada bintang {b['no']}"
    bangun_bintang(bintang)
    bangun_simpul(simpul)
    bangun_situs(bintang, simpul)
    print(f"Selesai: 108 bintang, {len(simpul)} simpul, docs/data.js diperbarui.")


if __name__ == "__main__":
    main()
