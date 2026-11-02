#!/usr/bin/env python3
"""Membangun ulang file turunan dari data/bintang.json dan data/simpul.json.

Yang dibuat atau diperbarui:
- bintang/NNN-nama-bintang.md  (hanya blok data otomatis yang ditimpa)
- bintang/README.md            (indeks, dibuat ulang penuh)
- simpul/<slug>.md             (hanya blok data otomatis yang ditimpa)
- simpul/README.md             (indeks, dibuat ulang penuh)
- segmen/<huruf>-<nama>.md     (hanya blok data otomatis yang ditimpa)
- segmen/README.md             (indeks, dibuat ulang penuh)
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
PUSAT = {
    "A": "Jakarta dan Bekasi",
    "B": "Kalimantan Tengah, dengan kaki di Sulawesi Tenggara, Nusa Tenggara, dan Papua",
    "C": "Maluku dan Jawa Tengah",
    "D": "IKN dan Jakarta",
    "E": "Sumatera (Padang dan Palembang)",
    "F": "Pelabuhan antarpulau (Surabaya, Makassar, Belawan)",
}
STATUS = {
    "inti": "Tokoh inti (kanon inti, detail bisa diusulkan lewat issue)",
    "terbuka": "Terbuka: nama dan latar masih bisa ditulis bersama",
    "digarap": "Sedang digarap bersama",
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
Bagian di bawah ini ditulis bersama oleh para penggarap dan ditinjau kurator sebelum menjadi kanon luas.
Satu tokoh boleh digarap beberapa orang. Umumkan bagianmu di issue koordinasi tokoh ini supaya tidak bertabrakan.

## Latar dan suara

_Belum diisi._

## Luka atau kebutuhan

_Belum diisi._

## Adegan kunci

_Belum diisi._

## Relasi

_Belum diisi._

## Visual dan audio

_Belum ada. Tautkan potret, sketsa, tema musik, atau aset lain dari [`seni/`](../seni/) dan [`audio/`](../audio/)._

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

## Visual dan audio

_Belum ada. Tautkan lanskap, peta, ambient, atau tema musik dari [`seni/`](../seni/) dan [`audio/`](../audio/)._

## Catatan riset

_Sumber, foto rujukan (dengan izin), istilah lokal._
"""


def bangun_bintang(data):
    folder = AKAR / "bintang"
    folder.mkdir(exist_ok=True)
    for b in data:
        seg_nama, seg_fungsi = SEGMEN[b["segmen"]]
        penggarap = ", ".join(b.get("penggarap") or []) or "Belum ada"
        karya = ", ".join(f"[{k['judul']}]({k['url']})" for k in b.get("karya") or []) or "Belum ada"
        kunci = "Terkunci: nomor, bintang, segmen, peran, babak, nasib. Terbuka: nama kerja (boleh diusulkan ganti), asal, latar, suara, adegan, relasi" if b["nama_terbuka"] else "Terkunci: identitas dan nasib (kanon inti). Terbuka: detail yang diusulkan lewat issue"
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
| Penggarap | {penggarap} |
| Karya visual dan audio | {karya} |
| Terkunci dan terbuka | {kunci} |
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

Satu file untuk setiap bintang. Satu tokoh boleh digarap beberapa orang yang berkoordinasi. Bintang berstatus **terbuka** punya nama dan latar yang masih bisa ditulis bersama. Caranya ada di [`CONTRIBUTING.md`](../CONTRIBUTING.md).

Ringkasan: {jumlah['inti']} inti, {jumlah['terbuka']} terbuka, {jumlah['digarap']} digarap.

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


BADAN_SEGMEN = """
## Cerita segmen ini

_Belum diisi. Ringkasan kanon ada di [`bible/03-bible-tokoh.md`](../bible/03-bible-tokoh.md)._

## Yang terbuka untuk ditulis

- Suasana sehari-hari dan bahasa daerah di pusat segmen.
- Hubungan antar tokoh di dalam segmen.
- Cerita pendek yang melibatkan beberapa tokoh sekaligus.

## Visual dan audio

_Belum ada. Tema musik segmen, ilustrasi, dan aset lain bisa ditautkan di sini._

## Catatan koordinasi

_Siapa menulis apa, supaya tidak bertabrakan._
"""


def bangun_segmen(bintang, simpul):
    folder = AKAR / "segmen"
    folder.mkdir(exist_ok=True)
    indeks = ["# Segmen", "", "Enam segmen adalah enam pintu masuk ke cerita. Pilih satu untuk ikut menulis: tokoh dan simpulnya bisa digarap beberapa orang sekaligus.", "", "File ini dibuat otomatis oleh `alat/bangun.py`.", "", "| Segmen | Fungsi | Pusat daerah | Tokoh |", "|---|---|---|---|"]
    for k, (nama, fungsi) in SEGMEN.items():
        tokoh = [t for t in bintang if t["segmen"] == k]
        ss = [s for s in simpul if k in s["segmen"]]
        nf = f"{k.lower()}-{slug(nama)}.md"
        baris_tokoh = "\n".join(f"- [{t['no']:03d} {t['nama']}](../bintang/{nama_file_bintang(t)}), {t['peran']} ({'terbuka' if t['status'] == 'terbuka' else t['status']})" for t in tokoh)
        baris_simpul = "\n".join(f"- [{s['nama']}](../simpul/{s['slug']}.md), {s['wilayah']}" for s in ss)
        blok = f"""
| | |
|---|---|
| Segmen | {k}, {nama} ({fungsi}) |
| Pusat daerah | {PUSAT[k]} |
| Jumlah tokoh | {len(tokoh)} |

### Tokoh

{baris_tokoh}

### Simpul

{baris_simpul}
"""
        tulis_dengan_blok(folder / nf, f"Segmen {k}: {nama}", blok, BADAN_SEGMEN)
        indeks.append(f"| [{k} {nama}]({nf}) | {fungsi} | {PUSAT[k]} | {len(tokoh)} |")
    (folder / "README.md").write_text("\n".join(indeks) + "\n", encoding="utf-8")


def bangun_situs(bintang, simpul):
    publik = [
        {k: b[k] for k in ("no", "bintang", "kanji", "langit", "segmen", "nama", "usia_asal", "peran", "babak", "status", "penggarap", "nama_terbuka", "karya")}
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
    bangun_segmen(bintang, simpul)
    bangun_situs(bintang, simpul)
    print(f"Selesai: 108 bintang, {len(simpul)} simpul, docs/data.js diperbarui.")


if __name__ == "__main__":
    main()
