/* =========================================================================
   MATE ROV Club site — shared behavior
   - injects the HUD header + footer (edit nav in ONE place)
   - theme toggle (persisted), mobile menu, scroll reveal, TOC scrollspy
   ========================================================================= */
(function () {
  "use strict";

  // ---- Site config: edit these to rename the club or reorder the nav ----
  // Nav entries are either links { href, label } or groups { label, items: [...] }.
  // Groups render as dropdowns on desktop and labeled sections in the mobile menu.
  var SITE = {
    name: "Sea&nbsp;Otters",           // club call-sign shown in the HUD
    tagline: "ROV&nbsp;CLUB",
    nav: [
      { href: "index.html", label: "Home" },
      { href: "start.html", label: "Start Here" },
      { label: "Guide", items: [
        { href: "classes.html",  label: "The Classes" },
        { href: "build.html",    label: "Build Guide" },
        { href: "safety.html",   label: "Safety" },
        { href: "scoring.html",  label: "Scoring & Deliverables" },
        { href: "playbook.html", label: "Rookie Playbook" }
      ]},
      { label: "Season", items: [
        { href: "plan.html",            label: "Season Plan 2027" },
        { href: "mission.html",         label: "2026 Mission" },
        { href: "mission-compare.html", label: "NAV vs RANGER" },
        { href: "results.html",         label: "2026 Scorecard" }
      ]},
      { href: "resources.html", label: "Resources" }
    ]
  };

  // Determine current page (basename) for active-link highlighting
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (here === "") here = "index.html";

  // ---------- Header ----------
  function navLink(n) {
    var cur = n.href.toLowerCase() === here ? ' aria-current="page"' : "";
    return '<a href="' + n.href + '"' + cur + ">" + n.label + "</a>";
  }

  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var links = SITE.nav.map(function (n) {
      if (!n.items) return navLink(n);
      var inGroup = n.items.some(function (c) { return c.href.toLowerCase() === here; });
      return '<div class="nav__group" data-open="false">' +
        '<button class="nav__group-btn' + (inGroup ? " is-current" : "") + '" aria-expanded="false">' + n.label +
          '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
        '</button>' +
        '<div class="nav__menu">' + n.items.map(navLink).join("") + '</div>' +
      '</div>';
    }).join("");

    host.innerHTML =
      '<header class="hud">' +
        '<div class="hud__inner">' +
          '<a class="brand" href="index.html">' +
            '<span class="brand__mark">◈</span>' +
            '<span>' + SITE.name + '<small>' + SITE.tagline + '</small></span>' +
          '</a>' +
          '<nav class="nav" id="primary-nav" aria-label="Primary">' + links + '</nav>' +
          '<div class="hud__tools">' +
            '<button class="icon-btn" id="theme-btn" aria-label="Toggle color theme" title="Toggle theme">' +
              '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
              '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
            '</button>' +
            '<button class="icon-btn nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="primary-nav">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>';

    var navEl = document.getElementById("primary-nav");
    var toggle = document.getElementById("nav-toggle");
    toggle.addEventListener("click", function () {
      var open = navEl.getAttribute("data-open") === "true";
      navEl.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    navEl.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { navEl.setAttribute("data-open", "false"); toggle.setAttribute("aria-expanded", "false"); }
    });

    // Dropdown groups: click toggles (one open at a time); outside click closes
    function closeGroups(except) {
      navEl.querySelectorAll(".nav__group").forEach(function (g) {
        if (g === except) return;
        g.setAttribute("data-open", "false");
        g.querySelector(".nav__group-btn").setAttribute("aria-expanded", "false");
      });
    }
    navEl.querySelectorAll(".nav__group-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.parentElement;
        var open = group.getAttribute("data-open") === "true";
        closeGroups(group);
        group.setAttribute("data-open", String(!open));
        btn.setAttribute("aria-expanded", String(!open));
      });
    });
    document.addEventListener("click", function (e) {
      if (!navEl.contains(e.target)) closeGroups(null);
    });

    document.getElementById("theme-btn").addEventListener("click", toggleTheme);
  }

  // ---------- Footer ----------
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.innerHTML =
      '<footer class="foot">' +
        '<div class="foot__inner">' +
          '<div>' +
            '<a class="brand" href="index.html" style="margin-bottom:.8rem">' +
              '<span class="brand__mark">◈</span><span>' + SITE.name + '<small>' + SITE.tagline + '</small></span>' +
            '</a>' +
            '<p style="color:var(--ink-3);font-size:.9rem;max-width:34ch">A student-built field guide for the MATE ROV competition. Learn it, build it, win it.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Guide</h4>' +
            '<a href="start.html">Start Here</a>' +
            '<a href="classes.html">The Classes</a>' +
            '<a href="build.html">Build Guide</a>' +
            '<a href="safety.html">Safety</a>' +
            '<a href="scoring.html">Scoring &amp; Deliverables</a>' +
            '<a href="playbook.html">Rookie Playbook</a>' +
          '</div>' +
          '<div>' +
            '<h4>Season</h4>' +
            '<a href="plan.html">Season Plan 2027</a>' +
            '<a href="mission.html">2026 Mission</a>' +
            '<a href="results.html">Our 2026 Scorecard</a>' +
            '<a href="resources.html">Resources &amp; Downloads</a>' +
            '<a href="https://materovcompetition.org" target="_blank" rel="noopener">MATE Official ↗</a>' +
          '</div>' +
        '</div>' +
        '<div class="foot__bottom"><p>Built by students, for students · Source material © MATE ROV Competition · ' +
          'Rebuilt for humans 🌊</p></div>' +
      '</footer>';
  }

  // ---------- Theme ----------
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  function currentTheme() {
    var saved = null;
    try { saved = localStorage.getItem("rov-theme"); } catch (e) {}
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    try { localStorage.setItem("rov-theme", next); } catch (e) {}
    applyTheme(next);
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- TOC scrollspy ----------
  function initTOC() {
    var toc = document.querySelector(".toc");
    if (!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    if (!links.length) return;
    var map = links.map(function (a) {
      var el = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
      return { a: a, el: el };
    }).filter(function (m) { return m.el; });
    function onScroll() {
      var y = window.scrollY + 100, active = map[0];
      map.forEach(function (m) { if (m.el.offsetTop <= y) active = m; });
      links.forEach(function (a) { a.classList.remove("is-active"); });
      if (active) active.a.classList.add("is-active");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Boot ----------
  applyTheme(currentTheme());  // also runs pre-paint via inline snippet in <head>
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    initReveal();
    initTOC();
    var y = document.getElementById("year");
    if (y) y.textContent = "2026";
  });
})();
