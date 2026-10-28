(function () {
  const T = window.TEPIAN;
  const B = T.B, SEG = T.SEG, STATUS = T.STATUS, warna = T.warna;
  const WARNA_LANGIT = { A: "#F0B43C", B: "#7DB678", C: "#B5B985", D: "#85A8DA", E: "#C79BD6", F: "#DB9668" };
  const pergi = (b) => { location.href = "bintang.html#" + b.no; };
  // Langit: enam gugus bintang dan pantulannya
  const svg = document.getElementById("langit");
  const NS = "http://www.w3.org/2000/svg";
  const sempit = window.innerWidth < 640;
  const W = sempit ? 600 : 1200, H = sempit ? 560 : 500, horizon = sempit ? 420 : 345;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const pusat = sempit
    ? { A: [105, 130], B: [300, 120], C: [495, 135], D: [105, 320], E: [300, 310], F: [495, 315] }
    : { A: [150, 175], B: [345, 120], C: [545, 200], D: [740, 115], E: [930, 190], F: [1085, 120] };
  const sudutEmas = Math.PI * (3 - Math.sqrt(5));
  const posisi = {};
  Object.keys(SEG).forEach((k) => {
    const anggota = B.filter((b) => b.segmen === k).sort((a, b) => (b.langit - a.langit) || (a.no - b.no));
    anggota.forEach((b, i) => {
      const r = 13 * Math.sqrt(i + 0.6);
      const t = i * sudutEmas + k.charCodeAt(0);
      posisi[b.no] = [pusat[k][0] + r * Math.cos(t) * 1.25, pusat[k][1] + r * Math.sin(t) * 0.9];
    });
  });

  const defs = document.createElementNS(NS, "defs");
  defs.innerHTML = `
    <linearGradient id="g-air" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#241A13"/><stop offset="1" stop-color="#1C1410"/>
    </linearGradient>
    <filter id="f-riak" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="2" seed="7"/>
      <feDisplacementMap in="SourceGraphic" scale="14"/>
      <feGaussianBlur stdDeviation="0.8"/>
    </filter>
    <filter id="f-cahaya"><feGaussianBlur stdDeviation="3"/></filter>`;
  svg.appendChild(defs);

  const air = document.createElementNS(NS, "rect");
  Object.entries({ x: 0, y: horizon, width: W, height: H - horizon, fill: "url(#g-air)" }).forEach(([a, v]) => air.setAttribute(a, v));
  svg.appendChild(air);
  const garis = document.createElementNS(NS, "line");
  Object.entries({ x1: 0, x2: W, y1: horizon, y2: horizon, stroke: "#ECE5D8", "stroke-opacity": 0.18 }).forEach(([a, v]) => garis.setAttribute(a, v));
  svg.appendChild(garis);

  const pantulan = document.createElementNS(NS, "g");
  pantulan.setAttribute("transform", `translate(0 ${horizon}) scale(1 -0.55) translate(0 ${-horizon})`);
  pantulan.setAttribute("opacity", "0.32");
  pantulan.setAttribute("filter", "url(#f-riak)");
  pantulan.setAttribute("aria-hidden", "true");
  const langit = document.createElementNS(NS, "g");

  Object.entries(SEG).forEach(([k, v]) => {
    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", pusat[k][0]); t.setAttribute("y", sempit ? pusat[k][1] - 88 : 40);
    t.setAttribute("text-anchor", "middle"); t.setAttribute("class", "label-seg");
    t.textContent = `${k}  ${v.nama}`;
    langit.appendChild(t);
  });

  const urutanMuncul = [...B].sort((a, b) => (a.babak - b.babak) || (a.no - b.no));
  const elemen = {};
  B.forEach((b) => {
    const [x, y] = posisi[b.no];
    const r = b.langit ? 5 : 3.2;
    const c = WARNA_LANGIT[b.segmen];
    const isi = b.status === "inti" ? c : b.status === "diadopsi" ? "#ECE5D8" : "#1C1410";
    const garisT = b.status === "terbuka" ? "#ECE5D8" : "none";
    const buat = (induk, interaktif) => {
      const g = document.createElementNS(NS, "g");
      if (b.status !== "terbuka") {
        const halo = document.createElementNS(NS, "circle");
        Object.entries({ cx: x, cy: y, r: r * 2.2, fill: isi, opacity: 0.35, filter: "url(#f-cahaya)" }).forEach(([a, v]) => halo.setAttribute(a, v));
        g.appendChild(halo);
      }
      const s = document.createElementNS(NS, "circle");
      Object.entries({ cx: x, cy: y, r, fill: isi, stroke: garisT, "stroke-width": 1.3, "stroke-opacity": 0.75 }).forEach(([a, v]) => s.setAttribute(a, v));
      g.appendChild(s);
      if (interaktif) {
        g.setAttribute("class", "bintang");
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.setAttribute("aria-label", `${b.nama}, ${b.bintang}, segmen ${SEG[b.segmen].nama}, ${STATUS[b.status]}`);
        const judul = document.createElementNS(NS, "title");
        judul.textContent = `${b.nama} (${b.bintang})`;
        g.appendChild(judul);
        g.addEventListener("click", () => pergi(b));
        g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pergi(b); } });
        elemen[b.no] = g;
      }
      induk.appendChild(g);
    };
    buat(pantulan, false);
    buat(langit, true);
  });
  svg.appendChild(pantulan);
  svg.appendChild(langit);

  // Satu momen: bintang menyala sesuai babak kemunculan tokohnya
  const tenang = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tenang) {
    urutanMuncul.forEach((b, i) => {
      const g = elemen[b.no];
      g.style.opacity = 0;
      g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 300 + i * 22, fill: "forwards", easing: "ease-out" })
        .onfinish = () => { g.style.opacity = 1; };
    });
  }
})();
