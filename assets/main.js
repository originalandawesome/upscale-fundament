/* ============================================================
   FUNDAMENT — "De Blauwdruk" · main.js
   Illustration set (constructielijnen) + interaction layer.
   No dependencies. Hand-drawn SVG, 2.5px petrol stroke, 64px grid.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) document.documentElement.classList.add("reduced-motion");
  var LANG = (document.documentElement.lang || "nl").slice(0, 2);

  /* ---------------- Illustration library ----------------
     Conventions: .stroke = 2.5px petrol line · .stroke--thin = hairline
     .plane = the ONE closed mint plane · .amber = the one amber detail
     .label = typographic label · .gdot = construction grid dot · .dot = node
  ------------------------------------------------------- */

  function heroSVG() {
    var t = LANG === "en"
      ? { a: "invoices", b: "receipts", c: "bank", s1: "01 records", s2: "02 ledger", s3: "03 returns", ok: "filed" }
      : { a: "facturen", b: "bonnen", c: "bank", s1: "01 administratie", s2: "02 jaarstukken", s3: "03 aangiften", ok: "ingediend" };

    // construction grid dots on 64px grid
    var dots = "";
    for (var y = 44; y <= 428; y += 64) {
      for (var x = 32; x <= 608; x += 64) {
        dots += '<circle class="gdot" cx="' + x + '" cy="' + y + '" r="1.6"/>';
      }
    }

    return '<svg viewBox="0 0 640 460" role="img" aria-hidden="true">' +
      dots +
      // sheet frame + registration crosses
      '<rect class="stroke stroke--thin" x="10" y="10" width="620" height="440" rx="2"/>' +
      '<path class="stroke stroke--thin" d="M24 17v14M17 24h14"/>' +
      '<path class="stroke stroke--thin" d="M616 429v14M609 436h14"/>' +
      // title block (bottom right)
      '<path class="stroke stroke--thin" d="M446 450V418h184M446 434h184M538 418v32"/>' +
      '<text class="label" x="456" y="431" style="font-size:10px">UC-2026</text>' +
      '<text class="label" x="548" y="431" style="font-size:10px">' + (LANG === "en" ? "sheet 01" : "blad 01") + '</text>' +
      '<text class="label" x="456" y="446" style="font-size:10px">1 : 64</text>' +
      '<text class="label" x="548" y="446" style="font-size:10px">64 / 128</text>' +

      // --- three iso documents (sources) ---
      // doc 1
      '<path class="stroke" d="M120 78l52 26-32 16-52-26z"/>' +
      '<path class="stroke stroke--thin" d="M124 84l36 18M116 92l36 18"/>' +
      // doc 2
      '<path class="stroke" d="M92 148l52 26-32 16-52-26z"/>' +
      '<path class="stroke stroke--thin" d="M96 154l36 18M88 162l36 18"/>' +
      // doc 3
      '<path class="stroke" d="M124 218l52 26-32 16-52-26z"/>' +
      '<path class="stroke stroke--thin" d="M128 224l36 18M120 232l36 18"/>' +
      '<text class="label" x="52" y="72">' + t.a + '</text>' +
      '<text class="label" x="24" y="142">' + t.b + '</text>' +
      '<text class="label" x="60" y="212">' + t.c + '</text>' +

      // --- routing lines into the ledger ---
      '<path class="stroke" d="M176 106l64 32 26-13 32 16"/>' +
      '<path class="stroke" d="M148 176l84 42 34-17"/>' +
      '<path class="stroke" d="M180 246l52 26 64-32"/>' +
      '<circle class="dot" cx="266" cy="125" r="3.5"/>' +
      '<circle class="dot" cx="266" cy="201" r="3.5"/>' +
      '<circle class="dot" cx="232" cy="272" r="3.5"/>' +

      // --- ledger structure (isometric) ---
      '<path class="plane" d="M420 150l80 40-80 40-80-40z"/>' +
      '<path class="stroke" d="M420 150l80 40-80 40-80-40z"/>' +
      '<path class="stroke" d="M340 190v90l80 40v-90M500 190v90l-80 40"/>' +
      // ledger rules: rows on top plane
      '<path class="stroke stroke--thin" d="M400 160l80 40M380 170l80 40M360 180l80 40"/>' +
      '<path class="stroke stroke--thin" d="M460 170l-80 40"/>' +
      // face rules
      '<path class="stroke stroke--thin" d="M340 214l80 40M340 244l80 40M420 254l80-40M420 284l80-40"/>' +
      '<text class="label" x="356" y="316" transform="rotate(26.6 356 316)" style="font-size:10px">snelstart</text>' +

      // --- output: filed return ---
      '<path class="stroke" d="M508 194l56 28"/>' +
      '<path class="stroke" d="M550 210l14 12-18 2"/>' +
      '<path class="stroke" d="M540 250l52 26-32 16-52-26z"/>' +
      '<path class="stroke stroke--thin" d="M544 256l36 18"/>' +
      '<circle class="amber" cx="586" cy="244" r="12"/>' +
      '<path class="amber" d="M581 244l4 4 7-8"/>' +
      '<text class="label" x="520" y="318">' + t.ok + '</text>' +

      // --- dimension line with stage labels ---
      '<path class="stroke stroke--thin" d="M64 388h512M64 382v12M320 382v12M448 382v12M576 382v12"/>' +
      '<text class="label" x="76" y="378">' + t.s1 + '</text>' +
      '<text class="label" x="330" y="378">' + t.s2 + '</text>' +
      '<text class="label" x="484" y="378">' + t.s3 + '</text>' +
      '</svg>';
  }

  var ILL = {
    "svc-administratie":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M64 78l44 22-44 22-44-22z"/>' +
      '<path class="stroke" d="M64 78l44 22-44 22-44-22z"/>' +
      '<path class="stroke" d="M20 100v12l44 22 44-22v-12M64 122v12"/>' +
      '<path class="stroke" d="M44 26l40 20-24 12-40-20z"/>' +
      '<path class="stroke stroke--thin" d="M48 32l28 14M40 40l28 14"/>' +
      '<path class="stroke" d="M64 64v24M58 82l6 8 6-8"/>' +
      '</svg>',

    "svc-jaarstukken":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M30 40h56v64H30z"/>' +
      '<path class="stroke" d="M30 40h56v64H30z"/>' +
      '<path class="stroke" d="M30 40l12-10h56l-12 10M98 30v64l-12 10"/>' +
      '<path class="stroke stroke--thin" d="M42 62h32M42 72h24"/>' +
      '<path class="amber" d="M74 40v18l-6-5-6 5V40"/>' +
      '</svg>',

    "svc-aangiften":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M60 24l16 16H60z"/>' +
      '<path class="stroke" d="M28 24h32l16 16v64H28zM60 24v16h16"/>' +
      '<path class="stroke stroke--thin" d="M40 56h24M40 68h24M40 80h16"/>' +
      '<path class="amber" d="M84 64h28M102 54l10 10-10 10"/>' +
      '</svg>',

    "svc-loonheffingen":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M24 24h48v80H24z"/>' +
      '<path class="stroke stroke--thin" d="M34 40h28M34 52h28M34 64h20"/>' +
      '<path class="plane" d="M64 68h44v14H64z"/>' +
      '<path class="stroke" d="M64 68h44v36H64zM64 82h44"/>' +
      '<path class="stroke" d="M76 62v10M96 62v10"/>' +
      '<path class="amber" d="M78 92l6 6 12-14"/>' +
      '</svg>',

    "svc-advies":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M34 32h60a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H58l-16 16V84h-8a10 10 0 0 1-10-10V42a10 10 0 0 1 10-10z"/>' +
      '<path class="stroke" d="M34 32h60a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H58l-16 16V84h-8a10 10 0 0 1-10-10V42a10 10 0 0 1 10-10z"/>' +
      '<path class="stroke" d="M40 66l16-16 16 12 16-16"/>' +
      '<circle class="dot" cx="40" cy="66" r="3"/><circle class="dot" cx="56" cy="50" r="3"/><circle class="dot" cx="72" cy="62" r="3"/>' +
      '<circle class="amber" cx="88" cy="46" r="3.5"/>' +
      '</svg>',

    "svc-optimalisatie":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M40 24v76M64 24v76M88 24v76"/>' +
      '<path class="stroke stroke--thin" d="M32 108h64"/>' +
      '<path class="plane" d="M33 44h14v14H33z"/>' +
      '<path class="stroke" d="M33 44h14v14H33z"/>' +
      '<path class="stroke" d="M57 68h14v14H57z"/>' +
      '<path class="amber" d="M81 36h14v14H81z"/>' +
      '</svg>',

    "tip-kosten":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M16 104h28V72h32v32h32"/>' +
      '<circle class="dot" cx="16" cy="104" r="3.5"/><circle class="dot" cx="44" cy="72" r="3.5"/><circle class="dot" cx="76" cy="104" r="3.5"/>' +
      '<path class="plane" d="M68 24h32v34l-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4z"/>' +
      '<path class="stroke" d="M68 24h32v34l-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4z"/>' +
      '<path class="stroke stroke--thin" d="M74 34h20M74 42h14"/>' +
      '<circle class="amber" cx="108" cy="104" r="4"/>' +
      '</svg>',

    "tip-investeringen":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M14 40h42v48H14z"/>' +
      '<path class="stroke stroke--thin" d="M14 54h42"/>' +
      '<path class="stroke" d="M26 32v12M44 32v12"/>' +
      '<path class="plane" d="M72 40h42v14H72z"/>' +
      '<path class="stroke" d="M72 40h42v48H72zM72 54h42"/>' +
      '<path class="stroke" d="M84 32v12M102 32v12"/>' +
      '<path class="amber" d="M52 100h24M68 92l8 8-8 8"/>' +
      '<text class="label" x="24" y="76">dec</text>' +
      '<text class="label" x="82" y="76">jan</text>' +
      '</svg>',

    "tip-optijd":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<circle class="plane" cx="60" cy="68" r="34"/>' +
      '<circle class="stroke" cx="60" cy="68" r="34"/>' +
      '<path class="stroke" d="M60 46v22l14 10"/>' +
      '<path class="stroke stroke--thin" d="M60 38v-6M90 68h6M60 98v6M30 68h-6"/>' +
      '<path class="amber" d="M78 26a46 46 0 0 1 26 28M100 44l4 10-10-2"/>' +
      '</svg>',

    "tip-betaaldata":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M20 28h88v16H20z"/>' +
      '<path class="stroke" d="M20 28h88v76H20zM20 44h88"/>' +
      '<path class="stroke" d="M40 20v12M88 20v12"/>' +
      '<path class="stroke stroke--thin" d="M20 64h88M20 84h88M42 44v60M64 44v60M86 44v60"/>' +
      '<path class="amber--fill" d="M90 88h12v12H90z"/>' +
      '</svg>',

    "tip-voorlopige":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M28 20h72v88H28z"/>' +
      '<path class="stroke stroke--thin" d="M40 34h48M40 44h32"/>' +
      '<path class="plane" d="M64 84V60a24 24 0 0 1 21 12z"/>' +
      '<path class="stroke" d="M40 84a24 24 0 0 1 48 0"/>' +
      '<path class="amber" d="M64 84L50 66"/>' +
      '<circle class="dot" cx="64" cy="84" r="3.5"/>' +
      '</svg>',

    "tip-rente":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M24 96h20V80h20V60h20V40h20v64H24z"/>' +
      '<path class="stroke" d="M24 24v80h84"/>' +
      '<path class="stroke" d="M24 96h20V80h20V60h20V40h20"/>' +
      '<circle class="amber" cx="104" cy="40" r="4.5"/>' +
      '<path class="stroke stroke--thin" d="M24 40h-6M24 60h-6M24 80h-6"/>' +
      '</svg>',

    "tip-uitstel":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<circle class="plane" cx="64" cy="64" r="28"/>' +
      '<circle class="stroke" cx="64" cy="64" r="28"/>' +
      '<path class="stroke" d="M64 46v18l12 8"/>' +
      '<path class="stroke" d="M64 20a44 44 0 1 1-44 44"/>' +
      '<path class="amber" d="M14 56l6 10 8-8"/>' +
      '<text class="label" x="94" y="114">+1</text>' +
      '</svg>',

    "tip-checklist":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M28 22h72v86H28z"/>' +
      '<path class="plane" d="M52 14h24v14H52z"/>' +
      '<path class="stroke" d="M52 14h24v14H52z"/>' +
      '<path class="stroke" d="M40 46h12v12H40zM40 70h12v12H40z"/>' +
      '<path class="stroke" d="M42 52l4 4 6-7M42 76l4 4 6-7"/>' +
      '<path class="stroke stroke--thin" d="M60 52h28M60 76h28M60 96h20"/>' +
      '<path class="amber" d="M40 94h12v12H40z"/>' +
      '</svg>',

    "ww-flow":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M12 56h20v20H12z"/>' +
      '<path class="plane" d="M54 56h20v20H54z"/>' +
      '<path class="stroke" d="M54 56h20v20H54z"/>' +
      '<path class="stroke" d="M96 56h20v20H96z"/>' +
      '<path class="stroke" d="M32 66h22M74 66h14"/>' +
      '<path class="amber" d="M88 60l8 6-8 6"/>' +
      '<path class="stroke" d="M64 56V36h30"/>' +
      '<circle class="stroke" cx="102" cy="36" r="8"/>' +
      '</svg>',

    "over-ons":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="plane" d="M64 41a28 28 0 0 1 0 46 28 28 0 0 1 0-46z"/>' +
      '<circle class="stroke" cx="48" cy="64" r="28"/>' +
      '<circle class="stroke" cx="80" cy="64" r="28"/>' +
      '<circle class="amber" cx="64" cy="64" r="3.5"/>' +
      '<path class="stroke stroke--thin" d="M20 104h88"/>' +
      '</svg>',

    "contact":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<path class="stroke" d="M44 24h28a6 6 0 0 1 6 6v68a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z"/>' +
      '<path class="stroke stroke--thin" d="M52 32h12"/>' +
      '<circle class="dot" cx="58" cy="94" r="2.5"/>' +
      '<path class="stroke" d="M86 52a16 16 0 0 1 0 24M94 44a28 28 0 0 1 0 40"/>' +
      '<path class="plane" d="M12 20h30a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H28l-8 8v-8h-8a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z"/>' +
      '<path class="stroke" d="M12 20h30a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H28l-8 8v-8h-8a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z"/>' +
      '</svg>',

    "regio-amsterdam":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      // folded map sheet — the ONE mint plane is the centre panel
      '<path class="plane" d="M46 24l34 10v70l-34-10z"/>' +
      '<path class="stroke" d="M16 34l30-10 34 10 32-10v70l-32 10-34-10-30 10z"/>' +
      '<path class="stroke stroke--thin" d="M46 24v70M80 34v70"/>' +
      // street grid (left panel) + river (right panel)
      '<path class="stroke stroke--thin" d="M22 46l18 7M22 60l18 7M22 74l18 7M31 42v46"/>' +
      '<path class="stroke stroke--thin" d="M98 32c-7 12 5 20-2 34c-6 12 3 16-2 30"/>' +
      // location pin (Diemen, tegen Amsterdam aan)
      '<path class="stroke" d="M63 42a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9z"/>' +
      '<circle class="amber" cx="63" cy="51" r="3.5"/>' +
      '</svg>',

    "regio-flevoland":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      // isometric polder plane — the ONE mint plane
      '<path class="plane" d="M16 72l48-24 48 24-48 24z"/>' +
      '<path class="stroke" d="M16 72l48-24 48 24-48 24z"/>' +
      // polder parcel lines
      '<path class="stroke stroke--thin" d="M32 80l48-24M48 88l48-24"/>' +
      // water (Marker-/IJsselmeer) at the dyke edge
      '<path class="stroke stroke--thin" d="M14 96c4-3 8-3 12 0s8 3 12 0M20 106c4-3 8-3 12 0s8 3 12 0"/>' +
      // location pin (regio Almere)
      '<path class="stroke" d="M64 26a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9z"/>' +
      '<circle class="amber" cx="64" cy="35" r="3.5"/>' +
      '</svg>',

    "expat":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      // Dutch tax return document
      '<path class="stroke" d="M20 36h36l14 14v58H20zM56 36v14h14"/>' +
      '<path class="stroke stroke--thin" d="M32 68h26M32 80h18M32 92h22"/>' +
      // speech bubble in English — the ONE mint plane
      '<path class="plane" d="M66 12h42a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H88l-12 12V48h-10a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8z"/>' +
      '<path class="stroke" d="M66 12h42a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H88l-12 12V48h-10a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8z"/>' +
      '<text class="label" x="78" y="35" style="font-size:14px">EN</text>' +
      '<path class="amber" d="M86 92l6 6 12-14"/>' +
      '</svg>',

    "check":
      '<svg viewBox="0 0 128 128" aria-hidden="true">' +
      '<circle class="plane" cx="64" cy="64" r="40"/>' +
      '<circle class="stroke" cx="64" cy="64" r="40"/>' +
      '<path class="stroke" d="M46 66l13 13 24-28"/>' +
      '</svg>'
  };

  /* ---------------- Injection + draw choreography ---------------- */

  function injectIllustrations() {
    document.querySelectorAll("[data-ill]").forEach(function (el) {
      var name = el.getAttribute("data-ill");
      el.innerHTML = name === "hero" ? heroSVG() : (ILL[name] || "");
      el.classList.add("ill");
      el.setAttribute("aria-hidden", "true");
    });
  }

  function prepDraw(el) {
    if (reduced) return;
    var svg = el.querySelector("svg");
    if (!svg) return;
    el.classList.add("draw");
    // With vector-effect: non-scaling-stroke, Chromium applies dash patterns in
    // screen space — so scale the measured path length by the render scale.
    var scale = 1;
    var vb = svg.viewBox && svg.viewBox.baseVal;
    var rect = svg.getBoundingClientRect();
    if (vb && vb.width && rect.width) scale = Math.max(1, rect.width / vb.width);
    var i = 0;
    svg.querySelectorAll(".stroke, .amber").forEach(function (s) {
      var len = 0;
      try { len = s.getTotalLength(); } catch (e) { /* text etc. */ }
      if (!len) return;
      var L = Math.ceil(len * scale * 1.15);
      s.style.strokeDasharray = L + "px";
      s.style.strokeDashoffset = L + "px";
      s.style.transitionDelay = (i * 0.09).toFixed(2) + "s";
      i++;
    });
    svg.querySelectorAll(".label").forEach(function (l, j) {
      l.style.transitionDelay = (0.9 + j * 0.14).toFixed(2) + "s";
    });
    svg.querySelectorAll(".dot").forEach(function (d) {
      d.style.opacity = "0";
      d.style.transition = "opacity .4s ease " + (0.7 + i * 0.05).toFixed(2) + "s";
    });
  }

  function drawNow(el) {
    el.classList.add("is-drawn");
    el.querySelectorAll(".stroke, .amber").forEach(function (s) {
      if (s.style.strokeDashoffset) s.style.strokeDashoffset = "0";
    });
    el.querySelectorAll(".dot").forEach(function (d) { d.style.opacity = "1"; });
  }

  function setupDrawing() {
    var ills = document.querySelectorAll(".ill");
    if (reduced) return;
    ills.forEach(prepDraw);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          drawNow(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.2 });
    ills.forEach(function (el) {
      if (el.getAttribute("data-draw") === "load") {
        // hero: replay on every visit, right away
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { drawNow(el); });
        });
      } else {
        io.observe(el);
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || reduced) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- Leader line (JS fallback) ---------------- */
  function setupLeader() {
    var leader = document.querySelector(".leader");
    if (!leader) return;
    if (window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()")) return;
    if (reduced) { leader.style.setProperty("--leader-p", "1"); return; }
    var ticking = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, window.scrollY / h) : 1;
      leader.style.setProperty("--leader-p", p.toFixed(4));
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------------- Mobile menu ---------------- */
  function setupMenu() {
    var btn = document.querySelector(".menu-btn");
    var menu = document.querySelector(".mobile-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  function setupYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- Count-up numbers ---------------- */
  function animateNumber(el, from, to, dur, fmt) {
    if (reduced) { el.textContent = fmt(to); return; }
    var t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function setupCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    function fmtFor(el) {
      var pre = el.getAttribute("data-prefix") || "";
      var suf = el.getAttribute("data-suffix") || "";
      return function (n) { return pre + n.toLocaleString(LANG === "en" ? "en-NL" : "nl-NL") + suf; };
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        animateNumber(el, 0, parseInt(el.getAttribute("data-count"), 10), 1100, fmtFor(el));
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- EZ ↔ BV segment toggle ---------------- */
  function setupToggles() {
    document.querySelectorAll(".seg-toggle").forEach(function (toggle) {
      var scope = document.querySelector(toggle.getAttribute("data-scope"));
      if (!scope) return;
      var buttons = toggle.querySelectorAll("button");

      function setMode(mode, animate) {
        if (toggle.getAttribute("data-active") === mode) return;
        toggle.setAttribute("data-active", mode);
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-mode") === mode ? "true" : "false");
        });
        scope.setAttribute("data-mode", mode);

        // animate swap targets
        if (animate && !reduced) {
          scope.querySelectorAll(".swap-target").forEach(function (el) {
            el.classList.remove("swap-anim");
            void el.offsetWidth;
            el.classList.add("swap-anim");
          });
        }
        // price morph
        scope.querySelectorAll("[data-ez][data-bv]").forEach(function (el) {
          var to = parseInt(el.getAttribute(mode === "bv" ? "data-bv" : "data-ez"), 10);
          var from = parseInt(el.textContent.replace(/[^\d]/g, ""), 10) || to;
          animateNumber(el, from, to, 420, function (n) { return String(n); });
        });
      }

      buttons.forEach(function (b) {
        b.addEventListener("click", function () { setMode(b.getAttribute("data-mode"), true); });
      });
    });
  }

  /* ---------------- Tips modals ---------------- */
  var lastOpener = null;

  function openModal(dialog, opener) {
    if (!dialog || dialog.open) return;
    lastOpener = opener || null;
    dialog.showModal();
    if (dialog.id === "checklist-ib") {
      history.replaceState(null, "", "#checklist-ib");
    }
    // draw the modal's illustration
    dialog.querySelectorAll(".ill").forEach(function (el) {
      if (!el.classList.contains("is-drawn")) {
        setTimeout(function () { drawNow(el); }, 150);
      }
    });
  }

  function closeModal(dialog) {
    if (dialog.open) dialog.close();
  }

  function setupModals() {
    document.querySelectorAll("[data-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(document.getElementById(btn.getAttribute("data-modal")), btn);
      });
    });
    document.querySelectorAll("dialog.tip-modal").forEach(function (dialog) {
      dialog.addEventListener("click", function (e) {
        if (e.target === dialog) closeModal(dialog); // backdrop
      });
      dialog.querySelectorAll("[data-close]").forEach(function (c) {
        c.addEventListener("click", function () { closeModal(dialog); });
      });
      dialog.addEventListener("close", function () {
        if (dialog.id === "checklist-ib" && location.hash === "#checklist-ib") {
          history.replaceState(null, "", location.pathname + location.search);
        }
        if (lastOpener) { lastOpener.focus(); lastOpener = null; }
      });
    });
    // deep link (#checklist-ib and friends)
    var hash = location.hash.replace("#", "");
    if (hash) {
      var target = document.getElementById(hash);
      if (target && target.matches("dialog.tip-modal")) {
        setTimeout(function () { openModal(target, null); }, 250);
      }
    }
  }

  /* ---------------- Speech balloon (kostenstructuur) ---------------- */
  function setupBalloon() {
    document.querySelectorAll(".balloon").forEach(function (b) {
      var pinned = false;
      function flip(on) { b.classList.toggle("is-flipped", on); }
      b.addEventListener("click", function (e) {
        if (e.target.closest("a")) return; // let the CTA work
        pinned = !pinned;
        flip(pinned);
      });
      b.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          if (e.target !== b) return;
          e.preventDefault();
          pinned = !pinned;
          flip(pinned);
        }
      });
      if (window.matchMedia("(hover: hover)").matches) {
        b.addEventListener("mouseenter", function () { flip(true); });
        b.addEventListener("mouseleave", function () { if (!pinned) flip(false); });
      }
    });
  }

  /* ---------------- Lead form (demo) ---------------- */
  function setupForms() {
    document.querySelectorAll("form.lead-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var panel = form.closest(".form-panel") || form.parentElement;
        var success = panel.querySelector(".form-success");
        form.classList.add("is-hidden");
        var chip = panel.querySelector(".pkg-chip");
        if (chip) chip.classList.remove("is-visible");
        if (success) {
          success.classList.add("is-visible");
          var ph = success.querySelector("[data-ill-success]");
          if (ph && !ph.querySelector("svg")) {
            ph.innerHTML = ILL.check;
            ph.classList.add("ill");
            prepDraw(ph);
            requestAnimationFrame(function () {
              requestAnimationFrame(function () { drawNow(ph); });
            });
          } else if (ph) {
            drawNow(ph);
          }
          success.setAttribute("tabindex", "-1");
          success.focus({ preventScroll: false });
        }
      });
    });

    // package tile → form chip
    var chip = document.querySelector(".pkg-chip");
    var chipName = chip ? chip.querySelector("[data-chip-name]") : null;
    var pkgField = document.querySelector("input[name='pakket']");
    document.querySelectorAll("[data-pkg]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tile = btn.closest(".price-tile");
        var name = tile ? tile.querySelector(".pt-name").textContent.replace(/\s+/g, " ").trim() : btn.getAttribute("data-pkg");
        if (chip && chipName) {
          chipName.textContent = name;
          chip.classList.add("is-visible");
        }
        if (pkgField) pkgField.value = name;
      });
    });
    if (chip) {
      var rm = chip.querySelector("button");
      if (rm) rm.addEventListener("click", function () {
        chip.classList.remove("is-visible");
        if (pkgField) pkgField.value = "";
      });
    }
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    injectIllustrations();
    setupDrawing();
    setupReveal();
    setupLeader();
    setupMenu();
    setupYear();
    setupCounters();
    setupToggles();
    setupModals();
    setupBalloon();
    setupForms();
  });
})();
