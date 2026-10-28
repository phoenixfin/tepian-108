// Bagian bersama untuk semua halaman Tepian 108.
(function () {
  const K = window.TEPIAN_KONFIG || {};
  const B = window.TEPIAN_BINTANG || [];
  const S = window.TEPIAN_SIMPUL || [];
  const SEG = {
    A: { nama: "Utama", fungsi: "Rumah. Dapur umum, pengungsian, orang-orang yang saling jaga." },
    B: { nama: "Adat", fungsi: "Tanah dan sumpah. Buruh tambang, masyarakat adat, nelayan, petani." },
    C: { nama: "Militer", fungsi: "Pelaksana. Aparat yang retak pelan-pelan dari dalam." },
    D: { nama: "Birokrat", fungsi: "Dalam lingkaran. Keluarga pejabat, staf, pejabat daerah dan lembaga." },
    E: { nama: "Akademisi", fungsi: "Pola. Analis, auditor, peneliti, pengacara kebijakan." },
    F: { nama: "Bisnis", fungsi: "Modal dan jalur. Pelabuhan, kapal, truk, dan pewaris konglomerat." }
  };
  const STATUS = { inti: "Tokoh inti", terbuka: "Menunggu penulis", diadopsi: "Sudah diadopsi" };
  const repo = (K.repo || "").replace(/\/$/, "");
  const cabang = K.cabang || "main";
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  window.TEPIAN = {
    K, B, S, SEG, STATUS, repo, cabang, esc,
    warna: (s) => `var(--seg-${s.toLowerCase()})`,
    fileUrl: (b) => `${repo}/blob/${cabang}/bintang/${b.file}`,
    adopsiUrl: (b) => `${repo}/issues/new?template=adopsi-bintang.md&title=${encodeURIComponent(`Adopsi bintang ${b.no}: ${b.nama}`)}`,
    gh: (jalur) => `${repo}/${jalur}`,
    kanal(el) {
      const baris = [
        { judul: K.grupNama || "Grup obrolan", ket: "Ngobrol, perkenalan, mencari kolaborator.", url: K.grup, label: "Gabung grup" },
        { judul: "Diskusi GitHub", ket: "Diskusi dunia, usulan besar, tanya jawab.", url: K.diskusi, label: "Buka diskusi" },
        { judul: "Repositori", ket: "Bible, file tokoh, cerita, dan game.", url: repo.includes("GANTI") ? "" : repo, label: "Buka GitHub" },
        { judul: "Email", ket: "Kerja sama, hal pribadi, laporan pelanggaran kode etik.", url: K.email ? `mailto:${K.email}` : "", label: K.email || "Kirim email" }
      ];
      el.innerHTML = baris.map((r) => `
        <div>
          <div><h3>${esc(r.judul)}</h3><p>${esc(r.ket)}</p></div>
          ${r.url ? `<a class="tombol kedua" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`
                  : `<span class="belum">Tautan segera diumumkan</span>`}
        </div>`).join("");
    }
  };
})();
