/* SRL Dad's Club beer-glass meter. No deps. 1 paid purchase = 1 beer = $5. */
(function () {
  "use strict";
  var API = "https://grid.barrioenergy.com/shop/srl-meter", PER = 5, POLL = 60000;
  var root = document.getElementById("beer-meter"); if (!root) return;
  var qs = new URLSearchParams(location.search), DEMO = qs.get("demo") === "1";
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SNAP = DEMO && qs.get("snap") === "1"; // screenshot helper: jump fill instantly
  var NS = "http://www.w3.org/2000/svg";
  // Glass geometry (viewBox 0 0 120 170): tapered pint, inner cavity top y=22, bottom y=158.
  var TOP = 22, BOT = 158, XL0 = 14, XR0 = 106, XL1 = 24, XR1 = 96;
  function xl(y) { return XL0 + (XL1 - XL0) * (y - TOP) / (BOT - TOP); }
  function xr(y) { return XR0 + (XR1 - XR0) * (y - TOP) / (BOT - TOP); }
  root.innerHTML =
    '<svg viewBox="0 0 120 172" role="img" aria-label="Beer glass fill meter"><defs>' +
    '<linearGradient id="bmBeer" x1="0" x2="1"><stop offset="0" stop-color="#e8961c"/><stop offset=".5" stop-color="#f7c443"/><stop offset="1" stop-color="#d9861a"/></linearGradient>' +
    '<clipPath id="bmClip"><path d="M14 22 L106 22 L96 158 Q60 162 24 158 Z"/></clipPath></defs>' +
    '<g class="bm-glass"><g clip-path="url(#bmClip)"><path class="bm-liq" fill="url(#bmBeer)"/><g class="bm-bub"></g><path class="bm-foam" fill="#fffaf0"/></g>' +
    '<path d="M14 22 L106 22 L96 158 Q60 162 24 158 Z" fill="rgba(255,255,255,.06)" stroke="rgba(220,220,230,.85)" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M22 32 L30 148" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M24 160 Q60 166 96 160 L96 166 Q60 172 24 166 Z" fill="rgba(220,220,230,.55)"/></g></svg>' +
    '<div class="bm-text"><div class="bm-eyebrow">Dad&rsquo;s Club beer meter</div>' +
    '<div class="bm-count" aria-live="polite"></div><div class="bm-sub"></div><div class="bm-bar"><i></i></div>' +
    '<div class="bm-note">Every paid SRL purchase pours one beer: $5 toward the next meeting.</div></div>';
  var liq = root.querySelector(".bm-liq"), foam = root.querySelector(".bm-foam"), bubG = root.querySelector(".bm-bub");
  var cEl = root.querySelector(".bm-count"), sEl = root.querySelector(".bm-sub"), bar = root.querySelector(".bm-bar i");
  var st = { beers: 0, goal: 50, label: "the next Dad\u2019s Club meeting" };
  var fill = 0, target = 0, amp = 1.2, t0 = 0, raf = 0, visible = true, bubs = [];
  for (var i = 0; i < 14; i++) { var c = document.createElementNS(NS, "circle"); c.setAttribute("fill", "rgba(255,255,255,.55)"); bubG.appendChild(c); bubs.push({ el: c, x: 0, y: 999, r: 1, v: 0 }); }
  function seed(b, h) { b.x = 30 + Math.random() * 60; b.y = BOT - Math.random() * h; b.r = .8 + Math.random() * 1.8; b.v = 8 + Math.random() * 18; }

  function draw(t) {
    var f = Math.max(0, Math.min(1, fill)), surf = BOT - f * (BOT - TOP - 6);
    var foamH = f > 0 ? 3 + 11 * f : 0, a = RM ? 0 : amp, ph = RM ? 0 : t / 1000;
    var w = function (x, o) { return Math.sin(x / 11 + ph * 2.4 + o) * a + Math.sin(x / 5.3 - ph * 1.7) * a * .45; };
    var d = "M0 " + (surf + w(0, 0)).toFixed(2), x;
    for (x = 4; x <= 120; x += 4) d += " L" + x + " " + (surf + w(x, 0)).toFixed(2);
    liq.setAttribute("d", f > 0 ? d + " L120 172 L0 172 Z" : "");
    var top = surf - foamH, fd = "M0 " + (surf + w(0, 0)).toFixed(2);
    for (x = 4; x <= 120; x += 4) fd += " L" + x + " " + (surf + w(x, 0)).toFixed(2);
    for (x = 120; x >= 0; x -= 6) fd += " L" + x + " " + (top + w(x, 1.3) * 1.3 - Math.abs(Math.sin(x * 0.55)) * 2.2 * Math.min(1, f * 3)).toFixed(2);
    foam.setAttribute("d", f > 0 ? fd + " Z" : "");
    for (var i = 0; i < bubs.length; i++) {
      var b = bubs[i];
      if (RM || f < .04) { b.el.setAttribute("r", 0); continue; }
      if (b.y < surf + 2 || b.y > BOT) seed(b, BOT - surf);
      b.el.setAttribute("cx", (b.x + Math.sin(t / 300 + i) * .8).toFixed(1)); b.el.setAttribute("cy", b.y.toFixed(1)); b.el.setAttribute("r", b.r);
    }
  }
  var last = 0;
  function frame(t) {
    raf = 0; var dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t;
    fill += (target - fill) * Math.min(1, dt * 3);
    amp += (1.2 - amp) * Math.min(1, dt * 1.2);
    for (var i = 0; i < bubs.length; i++) bubs[i].y -= bubs[i].v * dt;
    draw(t); schedule();
  }
  function schedule() { if (!RM && visible && !document.hidden && !raf) { raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
  function slosh() {
    if (RM) return; amp = 5.5;
    root.classList.remove("slosh"); void root.offsetWidth; root.classList.add("slosh");
  }
  function render(newBeers, animate) {
    var grew = newBeers > st.beers; st.beers = newBeers;
    target = Math.min(1, st.beers / st.goal);
    cEl.innerHTML = "<b>" + st.beers + "</b> beer" + (st.beers === 1 ? "" : "s") + " / <b>$" + (st.beers * PER).toLocaleString() + "</b> raised";
    sEl.textContent = "for " + st.label + " \u00b7 goal " + st.goal + " beers ($" + (st.goal * PER).toLocaleString() + ")";
    bar.style.width = (target * 100).toFixed(1) + "%";
    if (RM || SNAP) { fill = target; bar.style.transition = "none"; draw(performance.now()); if (RM) return; }
    if (grew && animate) slosh();
    schedule();
  }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; visible ? schedule() : stop(); }).observe(root);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : schedule(); });

  if (DEMO) {
    root.hidden = false; st.goal = +qs.get("goal") || 50; var stopAt = qs.has("stop") ? +qs.get("stop") : st.goal, n = 0;
    render(0, false);
    (function step() { if (n >= stopAt) return; render(++n, true); setTimeout(step, +qs.get("speed") || 900); })();
    return;
  }
  root.hidden = true; // nothing shown until real data arrives
  var first = true;
  function poll() {
    fetch(API, { cache: "no-store" }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) {
      var b = Math.max(0, j.beers | 0); if (!isFinite(j.beers)) throw 0;
      if (j.goal > 0) st.goal = j.goal | 0; if (j.meeting_label) st.label = String(j.meeting_label);
      root.hidden = false; render(b, !first); first = false;
    }).catch(function () { if (first) root.hidden = true; });
  }
  poll(); setInterval(function () { if (!document.hidden) poll(); }, POLL);
})();
