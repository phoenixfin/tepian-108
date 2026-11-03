// Bagian bersama untuk semua halaman Tepian 108.
(function () {
  const K = window.TEPIAN_KONFIG || {};
  const B = window.TEPIAN_BINTANG || [];
  const S = window.TEPIAN_SIMPUL || [];
  const SEG = {
    A: { nama: "Utama", fungsi: "Rumah. Dapur umum, pengungsian, orang-orang yang saling jaga.", pusat: "Jakarta dan Bekasi" },
    B: { nama: "Adat", fungsi: "Tanah dan sumpah. Buruh tambang, masyarakat adat, nelayan, petani.", pusat: "Kalimantan Tengah" },
    C: { nama: "Militer", fungsi: "Pelaksana. Aparat yang retak pelan-pelan dari dalam.", pusat: "Maluku dan Jawa Tengah" },
    D: { nama: "Birokrat", fungsi: "Dalam lingkaran. Keluarga pejabat, staf, pejabat daerah dan lembaga.", pusat: "IKN dan Jakarta" },
    E: { nama: "Akademisi", fungsi: "Pola. Analis, auditor, peneliti, pengacara kebijakan.", pusat: "Sumatera" },
    F: { nama: "Bisnis", fungsi: "Modal dan jalur. Pelabuhan, kapal, truk, dan pewaris konglomerat.", pusat: "Pelabuhan antarpulau" }
  };
  const STATUS = { inti: "Tokoh inti", terbuka: "Menunggu penulis", digarap: "Sedang digarap" };
  const repo = (K.repo || "").replace(/\/$/, "");
  const cabang = K.cabang || "main";
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  if (K.analitik) {
    const g = document.createElement("script");
    g.async = true; g.dataset.goatcounter = `https://${K.analitik}.goatcounter.com/count`; g.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(g);
  }

  window.TEPIAN = {
    K, B, S, SEG, STATUS, repo, cabang, esc,
    warna: (s) => `var(--seg-${s.toLowerCase()})`,
    fileUrl: (b) => `${repo}/blob/${cabang}/bintang/${b.file}`,
    ikutUrl: (judul) => `${repo}/issues/new?template=ikut-berkarya.md&title=${encodeURIComponent(judul)}`,
    ikutTokoh: (b) => `${repo}/issues/new?template=ikut-berkarya.md&title=${encodeURIComponent(`Ikut menulis tokoh ${String(b.no).padStart(3, "0")}: ${b.nama || b.bintang}`)}`,
    usulNama: (b) => `${repo}/issues/new?template=ikut-berkarya.md&title=${encodeURIComponent(`Usulan nama tokoh ${String(b.no).padStart(3, "0")} (${b.bintang})${b.nama ? ": " + b.nama : ""}`)}`,
    ikutKarya: (jalur, b) => `${repo}/issues/new?template=ikut-berkarya.md&title=${encodeURIComponent(`Ikut berkarya (${jalur}) tokoh ${String(b.no).padStart(3, "0")}: ${b.nama || b.bintang}`)}`,
    label: (b) => b.nama || `Tokoh ${String(b.no).padStart(3, "0")} (${b.bintang})`,
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
