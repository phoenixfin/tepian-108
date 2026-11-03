#!/usr/bin/env python3
"""Memeriksa tautan relatif di docs/*.html: file tujuan harus ada, dan jangkar (#id) harus ada di halaman tujuan.

Jalankan dari akar repositori:  python3 alat/cek-tautan.py
Tautan yang dibuat lewat JavaScript (tombol tokoh, tugas, dan sebagainya) tidak diperiksa.
"""
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"
halaman = {p.name: p.read_text(encoding="utf-8") for p in DOCS.glob("*.html")}
id_per_halaman = {n: set(re.findall(r'\bid="([^"]+)"', s)) for n, s in halaman.items()}
masalah = []

for nama, isi in halaman.items():
    for href in re.findall(r'href="([^"]+)"', isi):
        if re.match(r"^(https?:|mailto:|data:|javascript:|#?$)", href) or "${" in href:
            continue
        tujuan, _, jangkar = href.partition("#")
        tujuan = tujuan.split("?")[0] or nama
        if not (DOCS / tujuan).exists():
            masalah.append(f"{nama}: file tidak ada -> {href}")
        elif jangkar and tujuan.endswith(".html") and jangkar not in id_per_halaman.get(tujuan, set()):
            masalah.append(f"{nama}: jangkar tidak ada -> {href}")
    for src in re.findall(r'(?:src|href)="([^"#?]+\.(?:js|css|png|xml))"', isi):
        if not src.startswith(("http", "data:")) and not (DOCS / src).exists():
            masalah.append(f"{nama}: aset tidak ada -> {src}")

if masalah:
    print("\n".join(sorted(set(masalah))))
    sys.exit(1)
print(f"Semua tautan relatif di {len(halaman)} halaman beres.")
