(function () {
  const T = window.TEPIAN;
  const B = T.B, SEG = T.SEG, STATUS = T.STATUS, warna = T.warna;
  const WARNA_LANGIT = { A: "#F0B43C", B: "#7DB678", C: "#B5B985", D: "#85A8DA", E: "#C79BD6", F: "#DB9668" };
  const pergi = (b) => { location.href = "bintang.html#" + b.no; };
  // Langit: enam gugus bintang, cakrawala, dan air
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

  const air2 = document.createElementNS(NS, "g");
  air2.setAttribute("aria-hidden", "true");
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
    buat(langit, true);
  });
  // Cakrawala: siluet enam tempat (hanya di layar lebar) dan kilau lampu di air
  if (!sempit) {
    const sil = document.createElementNS(NS, "g");
    sil.setAttribute("transform", `translate(0 ${horizon - 119})`);
    sil.setAttribute("aria-hidden", "true");
    sil.innerHTML = `<g fill="#0E0907">
<rect x="0" y="108" width="1200" height="12"/>
<!-- A: pabrik gerigi + cerobong -->
<path d="M70 108V74l22 -14v14l22 -14v14l22 -14v14l22 -14v14l22 -14v62z"/>
<rect x="196" y="40" width="12" height="70"/><rect x="193" y="36" width="18" height="6"/>
<rect x="40" y="86" width="26" height="24"/>
<!-- B: rumah panggung dan palem -->
<path d="M300 88l30 -22l30 22z"/><rect x="306" y="88" width="48" height="12"/>
<rect x="308" y="100" width="3" height="12"/><rect x="322" y="100" width="3" height="12"/><rect x="336" y="100" width="3" height="12"/><rect x="349" y="100" width="3" height="12"/>
<rect x="388" y="52" width="3" height="60"/><path d="M389 54c-18 -4 -30 2 -36 14c12 -8 24 -10 36 -6zM389 54c18 -4 30 2 36 14c-12 -8 -24 -10 -36 -6zM389 54c-8 -14 -2 -24 10 -30c-4 12 -6 20 -10 30z"/>
<!-- C: menara radio -->
<path d="M530 110L546 28L562 110zM540 110l6 -50l6 50z" fill="#0E0907"/>
<rect x="545" y="14" width="2" height="16"/><rect x="500" y="92" width="70" height="18"/><rect x="580" y="96" width="46" height="14"/>
<!-- D: gedung berpilar -->
<path d="M690 56l60 -16l60 16z"/><rect x="694" y="58" width="112" height="8"/>
<rect x="700" y="66" width="8" height="44"/><rect x="718" y="66" width="8" height="44"/><rect x="736" y="66" width="8" height="44"/><rect x="754" y="66" width="8" height="44"/><rect x="772" y="66" width="8" height="44"/><rect x="790" y="66" width="8" height="44"/>
<!-- E: menara kampus -->
<rect x="900" y="30" width="34" height="80"/><rect x="896" y="26" width="42" height="6"/><rect x="940" y="62" width="50" height="48"/><rect x="866" y="74" width="28" height="36"/>
<!-- F: derek pelabuhan -->
<path d="M1040 110v-70h6v70zM1090 110v-70h6v70zM1030 40h120v6h-120zM1040 40l30 -22l30 22zM1146 40v26h-4v-26z"/>
<rect x="1110" y="88" width="28" height="22"/><rect x="1142" y="92" width="40" height="18"/><rect x="1004" y="94" width="22" height="16"/>
</g>
<g fill="#F0B43C">
<rect x="48" y="92" width="4" height="5"/><rect x="56" y="92" width="4" height="5"/>
<rect x="92" y="88" width="10" height="8" opacity="0.9"/><rect x="120" y="88" width="10" height="8" opacity="0.9"/><rect x="148" y="88" width="10" height="8" opacity="0.9"/>
<rect x="318" y="90" width="4" height="6"/><rect x="332" y="90" width="4" height="6"/>
<rect x="508" y="98" width="4" height="4"/><rect x="520" y="98" width="4" height="4"/>
<rect x="906" y="42" width="4" height="5"/><rect x="918" y="42" width="4" height="5"/><rect x="906" y="56" width="4" height="5"/><rect x="918" y="70" width="4" height="5"/><rect x="948" y="72" width="4" height="5"/><rect x="962" y="72" width="4" height="5"/>
<rect x="1114" y="94" width="4" height="5" opacity="0.8"/>
<circle cx="545" cy="14" r="2.5" fill="#E8825A"/>
</g>
<circle cx="110" cy="90" r="46" fill="url(#cahaya)" opacity="0.5"/>`;
    air2.appendChild(sil);
  }
  B.filter((b) => b.status === "inti").forEach((b, n) => {
    const [x, y] = posisi[b.no];
    const c = WARNA_LANGIT[b.segmen];
    [[16, 0.5], [11, 0.38], [7, 0.26], [4, 0.16]].forEach(([w, o], i) => {
      const k = document.createElementNS(NS, "rect");
      Object.entries({ x: x - w / 2, y: horizon + 12 + i * 17, width: w, height: 2, rx: 1, fill: c, opacity: o }).forEach(([a, v]) => k.setAttribute(a, v));
      air2.appendChild(k);
    });
  });
  const perahu = document.createElementNS(NS, "g");
  perahu.innerHTML = `<path d="M${W * 0.5 - 34} ${horizon + 62}c10 8 58 8 68 0l-6 -8h-56z" fill="#0E0907"/><rect x="${W * 0.5 - 1}" y="${horizon + 30}" width="2" height="24" fill="#0E0907"/><circle cx="${W * 0.5}" cy="${horizon + 36}" r="3" fill="#F0B43C"/>`;
  air2.appendChild(perahu);
  svg.appendChild(air2);
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
