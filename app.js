/* ESP32 Project Studio — view engine
   Pure vanilla JS. Data comes from window.DB (loaded by data/*.js scripts).
   Works from file:// — no fetch, no build step. */
(function () {
  "use strict";
  var DB = window.DB || {};
  var boards = DB.boards || [];
  var modules = DB.modules || [];
  var projects = DB.projects || [];
  var guides = DB.guides || [];
  var shopping = DB.shopping || [];
  var sources = DB.sources || {};

  var boardById = index(boards, "id");
  var moduleById = index(modules, "id");
  var projectById = index(projects, "id");

  /* ---------- helpers ---------- */
  function index(arr, key) { var m = {}; arr.forEach(function (x) { m[x[key]] = x; }); return m; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }
  function diffClass(d) { return d === "Beginner" ? "b-beg" : d === "Advanced" ? "b-adv" : "b-int"; }
  function callout(type, html) { return "<div class='callout" + (type === "info" ? " info" : "") + "'>" + html + "</div>"; }

  /* Category -> color + glyph for procedurally drawn tiles */
  var CAT = {
    "Basics & I/O":            { c1: "#1f9d6b", c2: "#0d3a2a", g: "💡" },
    "Environmental sensing":   { c1: "#2a9d8f", c2: "#0d2f2c", g: "🌡️" },
    "Motion & Presence":       { c1: "#4aa8ff", c2: "#102134", g: "📡" },
    "Displays & UI":           { c1: "#7a5cff", c2: "#1a163a", g: "🖥️" },
    "Audio":                   { c1: "#f4a259", c2: "#3a2710", g: "🔊" },
    "Home Automation":         { c1: "#3ecf8e", c2: "#0e3326", g: "🏠" },
    "Connectivity & Cloud":    { c1: "#56c2e6", c2: "#0e2b34", g: "🌐" },
    "Camera & Edge AI":        { c1: "#ff7b9c", c2: "#3a1320", g: "📷" },
    "RF / IR / RFID":          { c1: "#ff6b6b", c2: "#3a1212", g: "🛰️" },
    "Robotics & Motors":       { c1: "#c084fc", c2: "#241439", g: "🤖" },
    "Clocks, Timers & Games":  { c1: "#ffd166", c2: "#3a3010", g: "⏱️" },
    "Power & Wearables":       { c1: "#9aa7ff", c2: "#16183a", g: "🔋" },
    "Board":                   { c1: "#00d2a8", c2: "#08322a", g: "🧠" },
    "Input":                   { c1: "#4aa8ff", c2: "#102134", g: "🎚️" },
    "Output":                  { c1: "#f4a259", c2: "#3a2710", g: "📤" },
    "Special":                 { c1: "#ff6b6b", c2: "#3a1212", g: "🛰️" },
    "Buy":                     { c1: "#ffb454", c2: "#3a2a10", g: "🛒" },
    "Guide":                   { c1: "#00d2a8", c2: "#08322a", g: "📘" }
  };
  function catTheme(name) { return CAT[name] || { c1: "#00d2a8", c2: "#08322a", g: "⚡" }; }

  /* Build an inline SVG data-URI tile (gradient + big glyph + label) */
  function svgTile(theme, glyph, label) {
    var t = catTheme(theme);
    var g = glyph || t.g;
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='" + t.c1 + "'/><stop offset='1' stop-color='" + t.c2 + "'/></linearGradient>" +
      "<pattern id='dots' width='22' height='22' patternUnits='userSpaceOnUse'>" +
      "<circle cx='2' cy='2' r='1.4' fill='rgba(255,255,255,.10)'/></pattern></defs>" +
      "<rect width='320' height='200' fill='url(#g)'/>" +
      "<rect width='320' height='200' fill='url(#dots)'/>" +
      "<text x='160' y='112' font-size='84' text-anchor='middle' dominant-baseline='middle'>" + g + "</text>" +
      (label ? "<text x='160' y='176' font-size='15' font-family='sans-serif' font-weight='700' fill='rgba(255,255,255,.9)' text-anchor='middle'>" + esc(label) + "</text>" : "") +
      "</svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  /* image element that prefers a dropped-in raster, falls back to the SVG tile */
  function thumb(item, theme, glyph, label) {
    var img = el("img", "thumb");
    img.alt = item.title || item.name || label || "";
    img.loading = "lazy";
    var fallback = svgTile(theme, glyph, label);
    var key = item.tile || item.id;
    if (key) {
      img.src = "assets/images/" + key + ".png";
      img.onerror = function () { img.onerror = null; img.src = fallback; };
    } else {
      img.src = fallback;
    }
    return img;
  }

  /* ---------- state ---------- */
  var state = { view: "projects", q: "", board: "", input: "", output: "", cat: "", diff: "", ownedOnly: false };

  /* ---------- view switching ---------- */
  function setView(v) {
    state.view = v;
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.view === v); });
    render();
  }

  /* ---------- filter bar ---------- */
  function buildFilterBar() {
    var bar = document.getElementById("filterbar");
    bar.innerHTML = "";
    if (state.view !== "projects" && state.view !== "components") { bar.hidden = true; return; }
    bar.hidden = false;

    if (state.view === "projects") {
      bar.appendChild(selectGroup("Board", "board", boards.map(function (b) { return [b.id, b.short || b.name]; })));
      bar.appendChild(selectGroup("Input", "input", tagOptions("inputs")));
      bar.appendChild(selectGroup("Output", "output", tagOptions("outputs")));
      bar.appendChild(selectGroup("Category", "cat", uniq(projects.map(function (p) { return p.category; })).sort().map(function (c) { return [c, c]; })));
      bar.appendChild(selectGroup("Level", "diff", [["Beginner", "Beginner"], ["Intermediate", "Intermediate"], ["Advanced", "Advanced"]]));
      var tog = el("label", "toggle");
      tog.innerHTML = "<input type='checkbox' id='ownedOnly'" + (state.ownedOnly ? " checked" : "") + "> Buildable with what I own";
      tog.querySelector("input").addEventListener("change", function (e) { state.ownedOnly = e.target.checked; render(); });
      bar.appendChild(tog);
    } else {
      bar.appendChild(selectGroup("Type", "input", [["input", "Inputs"], ["output", "Outputs"], ["special", "Special devices"]]));
      bar.appendChild(selectGroup("Interface", "output", uniq(modules.map(function (m) { return m.interface; })).filter(Boolean).sort().map(function (i) { return [i, i]; })));
    }
    var count = el("span", "count");
    count.id = "resultCount";
    bar.appendChild(count);
  }
  function tagOptions(field) {
    var all = [];
    projects.forEach(function (p) { (p[field] || []).forEach(function (t) { all.push(t); }); });
    return uniq(all).sort().map(function (t) { return [t, labelTag(t)]; });
  }
  function labelTag(t) { return t.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  function selectGroup(label, key, opts) {
    var g = el("div", "fgroup");
    g.appendChild(el("label", null, label));
    var sel = el("select");
    sel.innerHTML = "<option value=''>All</option>" + opts.map(function (o) {
      return "<option value='" + esc(o[0]) + "'" + (state[key] === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
    }).join("");
    sel.addEventListener("change", function () { state[key] = sel.value; render(); });
    g.appendChild(sel);
    return g;
  }

  /* ---------- main render ---------- */
  function render() {
    buildFilterBar();
    var hero = document.getElementById("hero");
    var grid = document.getElementById("grid");
    var empty = document.getElementById("empty");
    grid.innerHTML = ""; empty.hidden = true; hero.hidden = true;

    if (state.view === "projects") renderProjects(grid, hero, empty);
    else if (state.view === "boards") renderBoards(grid);
    else if (state.view === "components") renderComponents(grid, empty);
    else if (state.view === "buy") renderBuy(grid, hero);
    else if (state.view === "guides") renderGuides(grid, hero);
    else if (state.view === "sources") renderSources(grid, hero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function matchQuery(p, q) {
    if (!q) return true;
    var hay = [p.title, p.summary, p.category, (p.inputs || []).join(" "), (p.outputs || []).join(" "), (p.parts || []).join(" ")].join(" ").toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  function renderProjects(grid, hero, empty) {
    hero.hidden = false;
    hero.innerHTML =
      "<h1>Pick a project, prototype it, then print it.</h1>" +
      "<p>" + projects.length + " worked examples across " + uniq(projects.map(function (p) { return p.category; })).length +
      " categories, mapped to your boards and 46-module kit. Each card walks you from a breadboard or online simulation to a practical, 3D-printed device. New here? Start with the workflow guide.</p>" +
      "<div class='quick'>" +
      "<button data-go='guide:approach'>📘 How to approach a build</button>" +
      "<button data-go='diff:Beginner'>🌱 Beginner picks</button>" +
      "<button data-go='cat:Camera & Edge AI'>📷 Camera &amp; AI</button>" +
      "<button data-go='cat:Home Automation'>🏠 Smart home (C6)</button>" +
      "<button data-go='own'>🧰 Only what I own</button></div>";
    hero.querySelectorAll("[data-go]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.dataset.go;
        if (v.indexOf("guide:") === 0) { openGuide(v.split(":")[1]); }
        else if (v.indexOf("diff:") === 0) { state.diff = v.split(":")[1]; render(); }
        else if (v.indexOf("cat:") === 0) { state.cat = v.split(":")[1]; render(); }
        else if (v === "own") { state.ownedOnly = true; render(); }
      });
    });

    var q = state.q.toLowerCase();
    var list = projects.filter(function (p) {
      if (state.board && (p.boards || []).indexOf(state.board) < 0) return false;
      if (state.input && (p.inputs || []).indexOf(state.input) < 0) return false;
      if (state.output && (p.outputs || []).indexOf(state.output) < 0) return false;
      if (state.cat && p.category !== state.cat) return false;
      if (state.diff && p.difficulty !== state.diff) return false;
      if (state.ownedOnly && p.needsExtraParts) return false;
      return matchQuery(p, q);
    });

    var rc = document.getElementById("resultCount");
    if (rc) rc.textContent = list.length + " of " + projects.length;
    if (!list.length) { empty.hidden = false; return; }

    list.forEach(function (p) {
      var card = el("div", "card");
      card.appendChild(thumb(p, p.category, p.glyph));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(p.title)));
      body.appendChild(el("div", "card-sum", esc(p.summary)));
      var badges = el("div", "badges");
      badges.appendChild(el("span", "badge " + diffClass(p.difficulty), p.difficulty));
      badges.appendChild(el("span", "badge b-cat", esc(shortCat(p.category))));
      if (p.category === "RF / IR / RFID") badges.appendChild(el("span", "badge b-rf", "Authorized use"));
      badges.appendChild(el("span", "badge " + (p.needsExtraParts ? "b-buy" : "b-own"), p.needsExtraParts ? "needs parts" : "have it"));
      body.appendChild(badges);
      card.appendChild(body);
      card.addEventListener("click", function () { openProject(p.id); });
      grid.appendChild(card);
    });
  }
  function shortCat(c) { return c.replace(" & ", " & ").split(",")[0]; }

  function renderBoards(grid) {
    boards.forEach(function (b) {
      var card = el("div", "card");
      card.appendChild(thumb(b, "Board", b.glyph, b.short || b.name));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(b.name)));
      body.appendChild(el("div", "card-sum", esc(b.role)));
      var badges = el("div", "badges");
      (b.tags || []).slice(0, 3).forEach(function (t) { badges.appendChild(el("span", "badge b-cat", esc(t))); });
      body.appendChild(badges);
      card.appendChild(body);
      card.addEventListener("click", function () { openBoard(b.id); });
      grid.appendChild(card);
    });
  }

  function renderComponents(grid, empty) {
    var q = state.q.toLowerCase();
    var list = modules.filter(function (m) {
      if (state.input && m.category !== state.input) return false;
      if (state.output && m.interface !== state.output) return false;
      if (!q) return true;
      return [m.name, m.desc, m.interface, m.category].join(" ").toLowerCase().indexOf(q) >= 0;
    });
    var rc = document.getElementById("resultCount");
    if (rc) rc.textContent = list.length + " of " + modules.length;
    if (!list.length) { empty.hidden = false; return; }
    list.forEach(function (m) {
      var card = el("div", "card");
      var theme = m.category === "special" ? "Special" : m.category === "output" ? "Output" : "Input";
      card.appendChild(thumb(m, theme, m.glyph, null));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(m.name)));
      body.appendChild(el("div", "card-sum", esc(m.desc)));
      var badges = el("div", "badges");
      badges.appendChild(el("span", "badge b-cat", capital(m.category)));
      if (m.interface) badges.appendChild(el("span", "badge b-cat", esc(m.interface)));
      body.appendChild(badges);
      card.appendChild(body);
      card.addEventListener("click", function () { openModule(m.id); });
      grid.appendChild(card);
    });
  }
  function capital(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function renderBuy(grid, hero) {
    hero.hidden = false;
    hero.innerHTML = "<h1>Worth buying next</h1><p>You said you're open to adding parts. Each of these unlocks a cluster of projects beyond your 46-module kit. Tap one to see exactly what it enables.</p>";
    shopping.forEach(function (s) {
      var card = el("div", "card");
      card.appendChild(thumb(s, "Buy", s.glyph, null));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(s.name)));
      body.appendChild(el("div", "card-sum", esc(s.unlocks)));
      var badges = el("div", "badges");
      badges.appendChild(el("span", "badge b-cat", esc(s.kind || "Add-on")));
      if (s.price) badges.appendChild(el("span", "badge b-buy", esc(s.price)));
      body.appendChild(badges);
      card.appendChild(body);
      card.addEventListener("click", function () { openShopping(s.id); });
      grid.appendChild(card);
    });
  }

  function renderGuides(grid, hero) {
    hero.hidden = false;
    hero.innerHTML = "<h1>Guides</h1><p>The repeatable workflow, how to prototype, and how to turn a working breadboard into a 3D-printed device. There's also a Sources tab crediting the catalogs every idea draws from.</p>" +
      "<div class='quick'><button id='goSources'>🔗 Sources &amp; further reading</button></div>";
    hero.querySelector("#goSources").addEventListener("click", function () { state.view = "sources"; render(); });
    guides.forEach(function (g) {
      var card = el("div", "card");
      card.appendChild(thumb(g, "Guide", g.glyph, null));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(g.title)));
      body.appendChild(el("div", "card-sum", esc(g.summary)));
      card.appendChild(body);
      card.addEventListener("click", function () { openGuide(g.id); });
      grid.appendChild(card);
    });
  }

  function renderSources(grid, hero) {
    hero.hidden = false;
    hero.innerHTML = "<h1>Sources &amp; attribution</h1><p>Project ideas here are grounded in these established catalogs, tutorials, and open-source repositories. Use them to go deeper on any build — they have full wiring diagrams, photos, and videos.</p>";
    Object.keys(sources).forEach(function (k) {
      var s = sources[k];
      var card = el("div", "card");
      card.appendChild(thumb({ tile: null }, "Guide", "🔗", s.short || s.name));
      var body = el("div", "card-body");
      body.appendChild(el("div", "card-title", esc(s.name)));
      body.appendChild(el("div", "card-sum", esc(s.desc || "")));
      var badges = el("div", "badges");
      badges.appendChild(el("span", "badge b-cat", esc(s.type || "Catalog")));
      body.appendChild(badges);
      card.appendChild(body);
      card.addEventListener("click", function () { if (s.url) window.open(s.url, "_blank", "noopener"); });
      grid.appendChild(card);
    });
  }

  /* ---------- detail sheets ---------- */
  function openSheet(html) {
    var ov = document.getElementById("overlay");
    document.getElementById("sheetBody").innerHTML = html;
    ov.hidden = false;
    document.body.style.overflow = "hidden";
    return document.getElementById("sheetBody");
  }
  function closeSheet() {
    document.getElementById("overlay").hidden = true;
    document.body.style.overflow = "";
  }

  function boardName(id) { var b = boardById[id]; return b ? (b.short || b.name) : id; }

  function openProject(id) {
    var p = projectById[id];
    if (!p) return;
    var img = "assets/images/" + (p.tile || p.id) + ".png";
    var partsHtml = (p.parts || []).map(function (pt) {
      var buy = (p.extraParts || []).indexOf(pt) >= 0;
      return "<span class='pill " + (buy ? "buy" : "own") + "'>" + esc(pt) + "</span>";
    }).join("");

    var html =
      "<div class='detail-hero'>" +
      "<img src='" + img + "' onerror=\"this.onerror=null;this.src='" + svgTile(p.category, p.glyph) + "'\" alt=''/>" +
      "<div class='dh-text'>" +
      "<h2>" + esc(p.title) + "</h2>" +
      "<p class='lead'>" + esc(p.summary) + "</p>" +
      "<div class='badges'>" +
      "<span class='badge " + diffClass(p.difficulty) + "'>" + p.difficulty + "</span>" +
      "<span class='badge b-cat'>" + esc(p.category) + "</span>" +
      "<span class='badge " + (p.needsExtraParts ? "b-buy" : "b-own") + "'>" + (p.needsExtraParts ? "needs extra parts" : "buildable now") + "</span>" +
      "</div>" +
      "<dl class='kv'>" +
      "<dt>Best board</dt><dd>" + (p.boards || []).map(boardName).join(", ") + "</dd>" +
      "<dt>Inputs</dt><dd>" + ((p.inputs || []).map(labelTag).join(", ") || "—") + "</dd>" +
      "<dt>Outputs</dt><dd>" + ((p.outputs || []).map(labelTag).join(", ") || "—") + "</dd>" +
      "</dl>" +
      "</div></div>";

    if (p.whyBoard) html += callout("info", "<strong>Why this board:</strong> " + esc(p.whyBoard));
    if (p.category === "RF / IR / RFID") html += callout("warn", "⚠️ <strong>Authorized use only.</strong> Practice on hardware, cards, and remotes you own. Don't interact with systems or credentials that aren't yours.");

    html += "<div class='section'><h3>Parts</h3><div>" + partsHtml + "</div>" +
      ((p.extraParts && p.extraParts.length) ? "<p style='color:var(--warn);font-size:13px;margin-top:8px'>🛒 Amber = beyond your kit. See the Buy More tab.</p>" : "") + "</div>";

    if (p.prototype) {
      html += "<div class='section'><h3>Prototype it — breadboard</h3>";
      if (p.prototype.breadboard) html += "<ol>" + p.prototype.breadboard.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
      if (p.prototype.wiring && p.prototype.wiring.length) {
        html += "<div class='wire'>" + p.prototype.wiring.map(function (w) {
          return "<div>" + esc(w.from) + "</div><div class='arrow'>→</div><div>" + esc(w.to) + "</div>";
        }).join("") + "</div>";
      }
      if (p.prototype.simulator) {
        var sim = p.prototype.simulator;
        html += "<p style='margin-top:10px'><strong>Simulate:</strong> " + esc(sim.notes || "") + "</p>";
        if (sim.url) html += "<a class='simlink' href='" + esc(sim.url) + "' target='_blank' rel='noopener'>▶ Open in " + esc(sim.tool || "simulator") + "</a>";
      }
      html += "</div>";
    }

    if (p.code && (p.code.arduino || p.code.micropython)) html += codeBlock(p.id, p.code);

    if (p.makeItReal && p.makeItReal.length) {
      html += "<div class='section'><h3>Make it a real device</h3><ol>" +
        p.makeItReal.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>";
    }

    if (p.source && sources[p.source]) {
      var src = sources[p.source];
      html += "<div class='section'><h3>Go deeper</h3><p>Grounded in <a href='" + esc(src.url) + "' target='_blank' rel='noopener'>" + esc(src.name) + "</a>" + (src.desc ? " — " + esc(src.desc) : "") + "</p></div>";
    }

    var rel = projects.filter(function (o) { return o.id !== p.id && o.category === p.category; }).slice(0, 6);
    if (rel.length) {
      html += "<div class='section'><h3>More in " + esc(p.category) + "</h3><div class='relgrid'>" +
        rel.map(function (o) {
          return "<div class='relcard' data-rel='" + o.id + "'><img src='" + svgTile(o.category, o.glyph) + "'><span>" + esc(o.title) + "</span></div>";
        }).join("") + "</div></div>";
    }

    var body = openSheet(html);
    wireCode(body);
    body.querySelectorAll("[data-rel]").forEach(function (c) { c.addEventListener("click", function () { openProject(c.dataset.rel); }); });
  }

  function codeBlock(id, code) {
    var has = [];
    if (code.arduino) has.push(["arduino", "Arduino C++"]);
    if (code.micropython) has.push(["micropython", "MicroPython"]);
    var tabs = has.map(function (h, i) { return "<button class='codetab" + (i === 0 ? " active" : "") + "' data-lang='" + h[0] + "'>" + h[1] + "</button>"; }).join("");
    var first = has[0][0];
    return "<div class='section'><h3>Code</h3><div class='codewrap' data-code='" + id + "'>" +
      "<div class='codetabs'>" + tabs + "</div>" +
      "<button class='copybtn'>Copy</button>" +
      "<pre class='code'><code>" + esc(code[first]) + "</code></pre>" +
      "<script type='application/json' class='codedata'>" + JSON.stringify(code).replace(/</g, "\\u003c") + "</script>" +
      "</div></div>";
  }
  function wireCode(body) {
    body.querySelectorAll(".codewrap").forEach(function (wrap) {
      var data = JSON.parse(wrap.querySelector(".codedata").textContent);
      var pre = wrap.querySelector("pre code");
      wrap.querySelectorAll(".codetab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          wrap.querySelectorAll(".codetab").forEach(function (t) { t.classList.remove("active"); });
          tab.classList.add("active");
          pre.textContent = data[tab.dataset.lang] || "";
        });
      });
      wrap.querySelector(".copybtn").addEventListener("click", function () {
        var txt = pre.textContent;
        navigator.clipboard && navigator.clipboard.writeText(txt);
        var b = wrap.querySelector(".copybtn"); b.textContent = "Copied ✓";
        setTimeout(function () { b.textContent = "Copy"; }, 1400);
      });
    });
  }

  function openBoard(id) {
    var b = boardById[id];
    if (!b) return;
    var img = "assets/images/" + (b.tile || b.id) + ".png";
    var html = "<div class='detail-hero'><img src='" + img + "' onerror=\"this.onerror=null;this.src='" + svgTile("Board", b.glyph) + "'\"><div class='dh-text'>" +
      "<h2>" + esc(b.name) + "</h2><p class='lead'>" + esc(b.role) + "</p>" +
      "<div class='badges'>" + (b.tags || []).map(function (t) { return "<span class='badge b-cat'>" + esc(t) + "</span>"; }).join("") + "</div></div></div>";
    html += "<dl class='kv'>" + (b.specs || []).map(function (s) { return "<dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd>"; }).join("") + "</dl>";
    if (b.strengths) html += "<div class='section'><h3>Strengths</h3><ul>" + b.strengths.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
    if (b.gotchas) html += "<div class='section'><h3>Gotchas</h3><ul>" + b.gotchas.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
    if (b.pins) html += "<div class='section'><h3>Key pins</h3><div class='wire'>" + b.pins.map(function (pn) { return "<div>" + esc(pn[0]) + "</div><div class='arrow'>→</div><div>" + esc(pn[1]) + "</div>"; }).join("") + "</div></div>";

    var rel = projects.filter(function (p) { return (p.boards || []).indexOf(b.id) >= 0; }).slice(0, 8);
    if (rel.length) {
      html += "<div class='section'><h3>Great projects for this board</h3><div class='relgrid'>" +
        rel.map(function (o) { return "<div class='relcard' data-rel='" + o.id + "'><img src='" + svgTile(o.category, o.glyph) + "'><span>" + esc(o.title) + "</span></div>"; }).join("") + "</div></div>";
    }
    var body = openSheet(html);
    body.querySelectorAll("[data-rel]").forEach(function (c) { c.addEventListener("click", function () { openProject(c.dataset.rel); }); });
  }

  function openModule(id) {
    var m = moduleById[id];
    if (!m) return;
    var theme = m.category === "special" ? "Special" : m.category === "output" ? "Output" : "Input";
    var html = "<div class='detail-hero'><img src='assets/images/" + m.id + ".png' onerror=\"this.onerror=null;this.src='" + svgTile(theme, m.glyph) + "'\"><div class='dh-text'>" +
      "<h2>" + esc(m.name) + "</h2><p class='lead'>" + esc(m.desc) + "</p>" +
      "<dl class='kv'><dt>Type</dt><dd>" + capital(m.category) + "</dd>" +
      "<dt>Interface</dt><dd>" + esc(m.interface || "—") + "</dd>" +
      "<dt>Voltage</dt><dd>" + esc(m.voltage || "3.3V") + "</dd>" +
      (m.sim ? "<dt>Simulator</dt><dd>" + esc(m.sim) + "</dd>" : "") +
      "</dl></div></div>";
    if (m.pinout) html += "<div class='section'><h3>Pinout</h3><div class='wire'>" + m.pinout.map(function (pn) { return "<div>" + esc(pn[0]) + "</div><div class='arrow'>→</div><div>" + esc(pn[1]) + "</div>"; }).join("") + "</div></div>";
    if (m.notes) html += "<div class='section'><h3>Notes</h3><p>" + esc(m.notes) + "</p></div>";

    var rel = projects.filter(function (p) { return (p.parts || []).some(function (pt) { return pt.toLowerCase().indexOf((m.match || m.name).toLowerCase()) >= 0; }); }).slice(0, 8);
    if (rel.length) {
      html += "<div class='section'><h3>Projects using it</h3><div class='relgrid'>" +
        rel.map(function (o) { return "<div class='relcard' data-rel='" + o.id + "'><img src='" + svgTile(o.category, o.glyph) + "'><span>" + esc(o.title) + "</span></div>"; }).join("") + "</div></div>";
    }
    var body = openSheet(html);
    body.querySelectorAll("[data-rel]").forEach(function (c) { c.addEventListener("click", function () { openProject(c.dataset.rel); }); });
  }

  function openShopping(id) {
    var s = shopping.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    var html = "<div class='detail-hero'><img src='assets/images/" + s.id + ".png' onerror=\"this.onerror=null;this.src='" + svgTile("Buy", s.glyph) + "'\"><div class='dh-text'>" +
      "<h2>" + esc(s.name) + "</h2><p class='lead'>" + esc(s.unlocks) + "</p>" +
      "<dl class='kv'><dt>Kind</dt><dd>" + esc(s.kind || "Add-on") + "</dd>" +
      (s.price ? "<dt>Typical price</dt><dd>" + esc(s.price) + "</dd>" : "") +
      (s.interface ? "<dt>Interface</dt><dd>" + esc(s.interface) + "</dd>" : "") + "</dl></div></div>";
    if (s.why) html += "<div class='section'><h3>Why add it</h3><p>" + esc(s.why) + "</p></div>";
    if (s.enables && s.enables.length) {
      html += "<div class='section'><h3>Unlocks these projects</h3><div class='relgrid'>" +
        s.enables.map(function (pid) {
          var o = projectById[pid]; if (!o) return "";
          return "<div class='relcard' data-rel='" + o.id + "'><img src='" + svgTile(o.category, o.glyph) + "'><span>" + esc(o.title) + "</span></div>";
        }).join("") + "</div></div>";
    }
    var body = openSheet(html);
    body.querySelectorAll("[data-rel]").forEach(function (c) { c.addEventListener("click", function () { openProject(c.dataset.rel); }); });
  }

  function openGuide(id) {
    var g = guides.filter(function (x) { return x.id === id; })[0];
    if (!g) return;
    var html = "<h2 style='margin-top:10px'>" + esc(g.title) + "</h2><p class='lead'>" + esc(g.summary) + "</p>" +
      "<div class='guidebody'>" + g.body + "</div>";
    openSheet(html);
  }

  /* ---------- events ---------- */
  document.getElementById("tabs").addEventListener("click", function (e) {
    var t = e.target.closest(".tab"); if (t) setView(t.dataset.view);
  });
  document.getElementById("homeBtn").addEventListener("click", function () {
    state = { view: "projects", q: "", board: "", input: "", output: "", cat: "", diff: "", ownedOnly: false };
    document.getElementById("search").value = "";
    setView("projects");
  });
  document.getElementById("search").addEventListener("input", function (e) {
    state.q = e.target.value;
    if (state.view !== "projects" && state.view !== "components") state.view = "projects";
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.view === state.view); });
    render();
  });
  document.getElementById("clearFilters").addEventListener("click", function () {
    state.board = state.input = state.output = state.cat = state.diff = ""; state.ownedOnly = false; state.q = "";
    document.getElementById("search").value = ""; render();
  });
  document.getElementById("sheetClose").addEventListener("click", closeSheet);
  document.getElementById("overlay").addEventListener("click", function (e) { if (e.target.id === "overlay") closeSheet(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
  document.getElementById("footSources").addEventListener("click", function (e) { e.preventDefault(); setView("sources"); });

  /* ---------- boot ---------- */
  render();
})();
