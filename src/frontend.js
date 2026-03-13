export function html(baseUrl) {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>APIfy — Build Any API in Seconds</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
*{font-family:'Inter',sans-serif;box-sizing:border-box}
code,pre,.mono{font-family:'JetBrains Mono',monospace}
html,body{background:#040408;color:#f1f5f9;min-height:100vh}

/* ── Orbs ── */
.orb{position:fixed;border-radius:50%;filter:blur(80px);opacity:.12;pointer-events:none;z-index:0}
.orb1{width:700px;height:700px;background:#7c3aed;top:-250px;left:-200px;animation:drift 22s ease-in-out infinite}
.orb2{width:500px;height:500px;background:#1d4ed8;top:25%;right:-180px;animation:drift 28s ease-in-out infinite reverse}
.orb3{width:450px;height:450px;background:#0e7490;bottom:-120px;left:30%;animation:drift 18s ease-in-out infinite 3s}
@keyframes drift{0%,100%{transform:translate(0,0)}33%{transform:translate(35px,-25px)}66%{transform:translate(-20px,18px)}}

/* ── Glass ── */
.glass{background:rgba(255,255,255,.032);border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(16px)}
.glass-sm{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06)}
.glass:hover{background:rgba(255,255,255,.05)}
.card{background:rgba(255,255,255,.032);border:1px solid rgba(255,255,255,.08);border-radius:1rem}

/* ── Gradient text ── */
.gtext{background:linear-gradient(135deg,#a78bfa,#818cf8,#60a5fa);-webkit-background-clip:text;background-clip:text;color:transparent}

/* ── Buttons ── */
.btn-p{background:linear-gradient(135deg,#7c3aed,#4f46e5);transition:all .2s;position:relative;overflow:hidden}
.btn-p::after{content:'';position:absolute;top:0;left:-100%;right:0;bottom:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);transition:left .5s}
.btn-p:hover::after{left:100%}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(124,58,237,.45)}
.btn-p:active{transform:translateY(0)}
.btn-p:disabled{opacity:.6;cursor:not-allowed;transform:none}

/* ── Input glow ── */
.inp-wrap:focus-within{box-shadow:0 0 0 1px rgba(124,58,237,.5),0 0 28px rgba(124,58,237,.12)}

/* ── Method badges ── */
.m-GET   {background:rgba(16,185,129,.14);color:#34d399;border:1px solid rgba(16,185,129,.28)}
.m-POST  {background:rgba(59,130,246,.14);color:#60a5fa;border:1px solid rgba(59,130,246,.28)}
.m-PUT   {background:rgba(245,158,11,.14);color:#fbbf24;border:1px solid rgba(245,158,11,.28)}
.m-PATCH {background:rgba(249,115,22,.14);color:#fb923c;border:1px solid rgba(249,115,22,.28)}
.m-DELETE{background:rgba(239,68,68,.14); color:#f87171;border:1px solid rgba(239,68,68,.28)}

/* ── Tabs ── */
.tab-on {background:rgba(255,255,255,.09);color:#f1f5f9}
.tab-off{color:#64748b}
.tab-off:hover{color:#94a3b8}
.ctab-on {background:rgba(124,58,237,.28);color:#c4b5fd}
.ctab-off{color:#64748b}
.ctab-off:hover{color:#94a3b8}

/* ── Status badges ── */
.s-ok {background:rgba(16,185,129,.15);color:#34d399}
.s-err{background:rgba(239,68,68,.15); color:#f87171}

/* ── Animations ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin  {to{transform:rotate(360deg)}}
@keyframes pulse {0%,100%{opacity:1}50%{opacity:.4}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
.afu {animation:fadeUp .45s ease-out both}
.afu1{animation-delay:.07s}
.afu2{animation-delay:.15s}
.afu3{animation-delay:.24s}
.afi {animation:fadeIn .35s ease-out}
.spin{animation:spin 1s linear infinite}
.pulse{animation:pulse 2s ease-in-out infinite}

/* ── Progress bar ── */
.pbar{background:linear-gradient(90deg,#7c3aed,#4f46e5,#2563eb,#7c3aed);background-size:200% 100%;animation:shimmer 2s linear infinite;transition:width .9s cubic-bezier(.4,0,.2,1)}

/* ── Misc ── */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.2)}
.ep-card{transition:background .15s}
.ep-card:hover{background:rgba(255,255,255,.025)}
.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
</style>
</head>
<body class="relative">

<!-- background orbs (z-index 0, behind everything) -->
<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>

<!-- ╔══════════════════════════════════════╗ -->
<!-- ║            NAVBAR                   ║ -->
<!-- ╚══════════════════════════════════════╝ -->
<nav class="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-14"
     style="background:rgba(4,4,8,.85);border-bottom:1px solid rgba(255,255,255,.06);backdrop-filter:blur(20px)">
  <div class="flex items-center gap-2.5 cursor-pointer" onclick="showHome()">
    <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm select-none"
         style="background:linear-gradient(135deg,#7c3aed,#4f46e5)">⚡</div>
    <span class="font-extrabold text-lg tracking-tight">APIfy</span>
    <span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:rgba(124,58,237,.2);color:#a78bfa">Beta</span>
  </div>
  <div class="flex items-center gap-1">
    <button onclick="showHome()"      class="text-sm text-gray-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">Home</button>
    <button onclick="showDashboard()" class="text-sm glass px-3 py-1.5 rounded-lg transition-all">My APIs</button>
  </div>
</nav>

<!-- ╔══════════════════════════════════════╗ -->
<!-- ║            HOME VIEW                ║ -->
<!-- ╚══════════════════════════════════════╝ -->
<div id="v-home" class="relative z-10 pt-14">

  <!-- Hero -->
  <section class="flex flex-col items-center justify-center min-h-[92vh] px-4 text-center">

    <div class="afu mb-2">
      <div class="inline-flex items-center gap-2 glass-sm px-3 py-1.5 rounded-full text-sm text-gray-400">
        <span class="w-2 h-2 rounded-full bg-emerald-400 pulse"></span>
        Live on Cloudflare Edge &nbsp;·&nbsp; Zero config &nbsp;·&nbsp; Instant deploy
      </div>
    </div>

    <h1 class="afu afu1 text-5xl sm:text-7xl font-black tracking-tight leading-none mt-6 mb-3">
      Any API,<br><span class="gtext">in seconds.</span>
    </h1>
    <p class="afu afu2 text-lg text-slate-400 max-w-lg mb-10">
      Describe what you need in plain language.<br>Get a fully deployed, production-ready REST API — instantly.
    </p>

    <!-- Input card -->
    <div class="afu afu3 w-full max-w-2xl">
      <div class="glass rounded-2xl p-1 inp-wrap transition-all">
        <textarea id="inp"
          placeholder="e.g.  A todo list API with CRUD, priorities, and tag filtering&#10;      A product catalog with search and inventory tracking&#10;      A URL shortener with analytics"
          class="w-full bg-transparent text-white placeholder-slate-600 px-5 pt-4 pb-3 text-base resize-none outline-none rounded-xl"
          style="min-height:120px;caret-color:#7c3aed"
          oninput="onInp(this)"></textarea>
        <div class="flex items-center justify-between px-4 pb-3 pt-1">
          <span id="cnt" class="text-xs text-slate-700 mono">0 / 2000</span>
          <button id="gen-btn" onclick="doGenerate()"
            class="btn-p text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2">
            <span id="btn-icon">⚡</span>
            <span id="btn-txt">Generate API</span>
          </button>
        </div>
      </div>
      <div id="err-box" class="hidden mt-3 px-4 py-3 rounded-xl text-sm text-red-400"
           style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2)"></div>
    </div>

    <!-- Example chips -->
    <div class="afu w-full max-w-2xl mt-5 flex flex-wrap justify-center gap-2">
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">📝 Todo list with tags &amp; priorities</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">🛍️ E-commerce product catalog</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">💬 Chat messages &amp; rooms</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">📊 Analytics event tracker</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">🔖 Bookmark manager</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">📦 Inventory &amp; stock tracker</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">👥 User profiles &amp; followers</button>
      <button onclick="useEx(this)" class="text-xs glass-sm px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">🎯 Project task manager</button>
    </div>

    <!-- Feature pills -->
    <div class="afu mt-14 flex flex-wrap justify-center gap-3 text-xs text-slate-600 max-w-xl">
      <span>⚡ CF Worker edge execution</span>
      <span>·</span>
      <span>💾 R2-backed persistent state</span>
      <span>·</span>
      <span>🔒 Isolated per-API sandboxes</span>
      <span>·</span>
      <span>📡 Global low-latency</span>
    </div>
  </section>

  <!-- ── Result section ── -->
  <div id="v-result" class="hidden px-4 pb-28">
    <div class="max-w-4xl mx-auto afi">

      <!-- Header card -->
      <div class="card p-6 mb-3">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-emerald-400">✓</span>
              <h2 id="r-name" class="font-bold text-lg truncate"></h2>
            </div>
            <p id="r-desc" class="text-sm text-slate-400"></p>
          </div>
          <button onclick="resetGen()"
            class="shrink-0 text-xs text-slate-600 hover:text-slate-300 glass-sm px-3 py-1.5 rounded-lg transition-colors">
            New API
          </button>
        </div>

        <!-- Endpoint URL bar -->
        <div class="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
             style="background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.06)">
          <span class="text-xs mono text-slate-600 shrink-0">BASE&nbsp;URL</span>
          <code id="r-url" class="flex-1 text-sm mono text-purple-300 truncate"></code>
          <button id="copy-btn" onclick="copyUrl()"
            class="shrink-0 text-xs text-slate-500 hover:text-white glass-sm px-3 py-1 rounded-md transition-colors">
            Copy
          </button>
        </div>
      </div>

      <!-- Tab bar -->
      <div class="flex gap-1 card p-1 mb-3 rounded-xl">
        <button id="t-docs" onclick="switchTab('docs')" class="flex-1 py-2 text-sm font-medium rounded-lg transition-all tab-on">Documentation</button>
        <button id="t-test" onclick="switchTab('test')" class="flex-1 py-2 text-sm font-medium rounded-lg transition-all tab-off">Test Console</button>
        <button id="t-code" onclick="switchTab('code')" class="flex-1 py-2 text-sm font-medium rounded-lg transition-all tab-off">Code Snippets</button>
      </div>

      <!-- ── Docs tab ── -->
      <div id="tc-docs">
        <div id="ep-list" class="space-y-2"></div>
      </div>

      <!-- ── Test tab ── -->
      <div id="tc-test" class="hidden">
        <div class="card p-5">
          <!-- Request bar -->
          <div class="flex gap-2 mb-4">
            <select id="ts-method" onchange="onMethodChange()"
              class="mono text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer shrink-0"
              style="background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.1);color:white;min-width:96px">
              <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
            </select>
            <div class="flex-1 flex items-center rounded-xl overflow-hidden"
                 style="background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.1)">
              <span id="ts-base" class="px-3 text-xs mono text-slate-600 shrink-0 truncate" style="max-width:220px"></span>
              <input id="ts-path" type="text" value="/"
                class="flex-1 bg-transparent text-sm mono text-white py-2.5 pr-3 outline-none" placeholder="/path">
            </div>
            <button onclick="runTest()" id="run-btn"
              class="btn-p text-white text-sm font-medium px-5 py-2.5 rounded-xl shrink-0">▶&nbsp;Send</button>
          </div>

          <!-- Body -->
          <div id="ts-body-wrap" class="hidden mb-4">
            <label class="text-xs text-slate-600 uppercase tracking-wider block mb-2">Request Body (JSON)</label>
            <textarea id="ts-body" rows="5" placeholder='{"key": "value"}'
              class="w-full mono rounded-xl p-3 text-sm text-emerald-400 outline-none resize-none"
              style="background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.08)"></textarea>
          </div>

          <!-- Response -->
          <div id="ts-loading" class="hidden text-center py-8 text-sm text-slate-600">Sending request…</div>
          <div id="ts-res" class="hidden">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <span class="text-xs text-slate-600 uppercase tracking-wider">Response</span>
                <span id="ts-status" class="text-xs font-bold mono px-2 py-0.5 rounded"></span>
                <span id="ts-time"   class="text-xs text-slate-600 mono"></span>
              </div>
              <button onclick="copyRes()" class="text-xs text-slate-600 hover:text-slate-300 transition-colors">Copy</button>
            </div>
            <pre id="ts-out" class="mono text-xs text-emerald-400 rounded-xl p-4 overflow-auto max-h-80"
                 style="background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.06)"></pre>
          </div>
        </div>
      </div>

      <!-- ── Code tab ── -->
      <div id="tc-code" class="hidden">
        <div class="card p-5">
          <div class="inline-flex gap-1 p-1 rounded-xl mb-4" style="background:rgba(0,0,0,.4)">
            <button id="ct-curl"   onclick="switchCodeTab('curl')"   class="px-4 py-1.5 rounded-lg text-sm mono transition-all ctab-on">curl</button>
            <button id="ct-js"     onclick="switchCodeTab('js')"     class="px-4 py-1.5 rounded-lg text-sm mono transition-all ctab-off">JavaScript</button>
            <button id="ct-python" onclick="switchCodeTab('python')" class="px-4 py-1.5 rounded-lg text-sm mono transition-all ctab-off">Python</button>
          </div>
          <pre id="code-out" class="mono text-xs text-emerald-400 rounded-xl p-4 overflow-auto max-h-96"
               style="background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.06)"></pre>
          <button onclick="copyCode()" class="mt-3 text-xs text-slate-600 hover:text-slate-300 transition-colors">Copy snippet</button>
        </div>
      </div>

    </div>
  </div>
</div><!-- /v-home -->

<!-- ╔══════════════════════════════════════╗ -->
<!-- ║          DASHBOARD VIEW             ║ -->
<!-- ╚══════════════════════════════════════╝ -->
<div id="v-dash" class="hidden relative z-10 pt-20 px-4 pb-28">
  <div class="max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">My APIs</h1>
        <p class="text-sm text-slate-500 mt-1">All your generated APIs in one place</p>
      </div>
      <button onclick="showHome()" class="btn-p text-white text-sm font-semibold px-4 py-2 rounded-xl">⚡ New API</button>
    </div>
    <div id="d-load"  class="text-center py-24 text-slate-600">Loading…</div>
    <div id="d-empty" class="hidden text-center py-24">
      <div class="text-5xl mb-4">🚀</div>
      <p class="text-slate-400 font-semibold mb-1">No APIs yet</p>
      <p class="text-sm text-slate-600">Generate your first API to get started</p>
    </div>
    <div id="d-grid" class="hidden gap-4"
         style="display:none;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))"></div>
  </div>
</div>

<!-- ╔══════════════════════════════════════╗ -->
<!-- ║         LOADING OVERLAY             ║ -->
<!-- ╚══════════════════════════════════════╝ -->
<div id="v-load" class="hidden fixed inset-0 z-50 flex items-center justify-center"
     style="background:rgba(4,4,8,.93);backdrop-filter:blur(20px)">
  <div class="text-center max-w-sm px-6">
    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
         style="background:linear-gradient(135deg,#7c3aed,#4f46e5);box-shadow:0 0 70px -10px rgba(124,58,237,.65)">
      <div class="w-7 h-7 rounded-full border-2 border-white/30 border-t-white spin"></div>
    </div>
    <h2 class="text-xl font-bold mb-2">Building your API…</h2>
    <p id="gen-msg" class="text-sm text-slate-500 mb-8 transition-opacity duration-500">Analyzing your requirements</p>
    <div class="w-full h-1 rounded-full mb-3" style="background:rgba(255,255,255,.06)">
      <div id="gen-bar" class="h-full rounded-full pbar" style="width:4%"></div>
    </div>
    <p class="text-xs text-slate-700 mono">GPT-4o × Cloudflare Workers × R2</p>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════════════════
// State
// ═══════════════════════════════════════════════════════════════
var BASE     = '${baseUrl}';
var curApi   = null;
var curTab   = 'docs';
var curCTab  = 'curl';
var genTmrs  = [];

// ═══════════════════════════════════════════════════════════════
// Tiny DOM helpers
// ═══════════════════════════════════════════════════════════════
function G(id)   { return document.getElementById(id); }
function show(id){ G(id).classList.remove('hidden');   }
function hide(id){ G(id).classList.add('hidden');      }
function esc(s)  {
  if (!s) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════════════════════
// Input helpers
// ═══════════════════════════════════════════════════════════════
function onInp(el) {
  G('cnt').textContent = el.value.length + ' / 2000';
}
function useEx(btn) {
  var t = btn.textContent.trim();
  var i = t.indexOf(' ');
  if (i > -1) t = t.slice(i + 1);
  G('inp').value = t;
  onInp(G('inp'));
  G('inp').focus();
}

// ═══════════════════════════════════════════════════════════════
// Generation flow
// ═══════════════════════════════════════════════════════════════
var genSteps = [
  [0,     4,  'Analyzing your requirements…'],
  [1200,  22, 'Designing REST endpoints…'],
  [4000,  50, 'Writing handler code…'],
  [10000, 76, 'Deploying to Cloudflare Edge…'],
  [18000, 92, 'Almost ready…'],
];

function startLoad() {
  show('v-load');
  genTmrs.forEach(clearTimeout); genTmrs = [];
  genSteps.forEach(function(s) {
    genTmrs.push(setTimeout(function() {
      if (!G('v-load').classList.contains('hidden')) {
        G('gen-msg').textContent  = s[2];
        G('gen-bar').style.width  = s[1] + '%';
      }
    }, s[0]));
  });
}
function stopLoad() {
  G('gen-bar').style.width = '100%';
  genTmrs.forEach(clearTimeout); genTmrs = [];
  setTimeout(function(){ hide('v-load'); }, 420);
}
function showErr(m) { G('err-box').textContent = m; show('err-box'); }
function hideErr()  { hide('err-box'); }

async function doGenerate() {
  var desc = G('inp').value.trim();
  if (!desc || desc.length < 5) { showErr('Please describe your API (at least 5 characters).'); return; }
  if (desc.length > 2000)       { showErr('Description is too long (max 2000 characters).');   return; }
  hideErr();
  startLoad();
  try {
    var r    = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({description: desc}),
    });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Generation failed');
    stopLoad();
    curApi = data;
    renderResult(data);
  } catch (e) {
    stopLoad();
    showErr('Error: ' + e.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// Result rendering
// ═══════════════════════════════════════════════════════════════
function renderResult(api) {
  G('r-name').textContent  = api.name;
  G('r-desc').textContent  = api.description;
  G('r-url').textContent   = api.endpoint;
  G('ts-base').textContent = api.endpoint;
  renderEndpoints(api.endpoints);
  switchTab('docs');
  renderCode('curl');
  show('v-result');
  setTimeout(function(){
    G('v-result').scrollIntoView({behavior:'smooth',block:'start'});
  }, 80);
}

function renderEndpoints(eps) {
  var list = G('ep-list');
  list.innerHTML = '';
  (eps || []).forEach(function(ep) {
    var div = document.createElement('div');
    div.className = 'card p-4 ep-card cursor-pointer';
    div.onclick   = function(){ prefillTest(ep); switchTab('test'); };

    var pHtml = '';
    if (ep.params && ep.params.length) {
      pHtml = '<div class="mt-2 flex flex-wrap gap-1.5">';
      ep.params.forEach(function(p) {
        pHtml += '<span class="text-xs mono px-2 py-0.5 rounded" style="background:rgba(255,255,255,.05);color:#94a3b8">'
               + esc(p.name)
               + '<span style="color:#475569;margin-left:4px">' + esc(p.in||'query') + (p.required?' *':'') + '</span></span>';
      });
      pHtml += '</div>';
    }

    var exHtml = '';
    if (ep.responseExample) {
      exHtml = '<div class="mt-3"><pre class="mono text-xs text-emerald-400 rounded-lg p-2.5 overflow-auto max-h-28" '
             + 'style="background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.05)">'
             + esc(JSON.stringify(ep.responseExample, null, 2)) + '</pre></div>';
    }

    div.innerHTML = '<div class="flex items-center gap-3">'
      + '<span class="mono text-xs font-bold px-2.5 py-1 rounded-lg m-' + esc(ep.method) + '">' + esc(ep.method) + '</span>'
      + '<code class="text-sm text-slate-200">' + esc(ep.path) + '</code>'
      + '<span class="text-xs text-slate-600 ml-auto truncate max-w-xs">' + esc(ep.description||'') + '</span>'
      + '</div>'
      + pHtml + exHtml;
    list.appendChild(div);
  });
}

function prefillTest(ep) {
  G('ts-method').value = ep.method;
  G('ts-path').value   = ep.path;
  onMethodChange();
  if (['POST','PUT','PATCH'].includes(ep.method)) {
    G('ts-body').value = JSON.stringify(ep.body || {}, null, 2);
  }
}

function resetGen() {
  G('inp').value = ''; onInp(G('inp'));
  hide('v-result'); curApi = null;
  window.scrollTo({top:0,behavior:'smooth'});
}

// ═══════════════════════════════════════════════════════════════
// Tabs
// ═══════════════════════════════════════════════════════════════
function switchTab(tab) {
  curTab = tab;
  ['docs','test','code'].forEach(function(t) {
    G('t-'+t).className  = 'flex-1 py-2 text-sm font-medium rounded-lg transition-all ' + (t===tab?'tab-on':'tab-off');
    t===tab ? show('tc-'+t) : hide('tc-'+t);
  });
}

// ═══════════════════════════════════════════════════════════════
// Test console
// ═══════════════════════════════════════════════════════════════
function onMethodChange() {
  var m = G('ts-method').value;
  ['POST','PUT','PATCH'].includes(m) ? show('ts-body-wrap') : hide('ts-body-wrap');
}

async function runTest() {
  if (!curApi) return;
  var method = G('ts-method').value;
  var path   = G('ts-path').value || '/';
  var body   = G('ts-body').value;

  hide('ts-res'); show('ts-loading');
  G('run-btn').disabled = true;

  var t0 = Date.now();
  try {
    var opts = {method: method, headers: {'Content-Type':'application/json'}};
    if (['POST','PUT','PATCH'].includes(method) && body.trim()) opts.body = body;
    var url  = curApi.endpoint + (path[0]==='/' ? path : '/'+path);
    var r    = await fetch(url, opts);
    var ms   = Date.now() - t0;
    var txt  = await r.text();
    var fmt;
    try { fmt = JSON.stringify(JSON.parse(txt), null, 2); } catch { fmt = txt; }
    G('ts-out').textContent = fmt;
    var sb = G('ts-status');
    sb.textContent = r.status + ' ' + r.statusText;
    sb.className   = 'text-xs font-bold mono px-2 py-0.5 rounded ' + (r.ok ? 's-ok' : 's-err');
    G('ts-time').textContent = ms + ' ms';
    hide('ts-loading'); show('ts-res');
  } catch (e) {
    G('ts-out').textContent = 'Network error: ' + e.message;
    var sb = G('ts-status');
    sb.textContent = 'Error'; sb.className = 'text-xs font-bold mono px-2 py-0.5 rounded s-err';
    G('ts-time').textContent = '';
    hide('ts-loading'); show('ts-res');
  }
  G('run-btn').disabled = false;
}

function copyRes()  { navigator.clipboard.writeText(G('ts-out').textContent); }

// ═══════════════════════════════════════════════════════════════
// Code snippets
// ═══════════════════════════════════════════════════════════════
function switchCodeTab(lang) {
  curCTab = lang;
  ['curl','js','python'].forEach(function(l) {
    G('ct-'+l).className = 'px-4 py-1.5 rounded-lg text-sm mono transition-all ' + (l===lang?'ctab-on':'ctab-off');
  });
  renderCode(lang);
}

function renderCode(lang) {
  if (!curApi) return;
  var ep  = (curApi.endpoints||[])[0] || {method:'GET',path:'/'};
  var url = curApi.endpoint + ep.path;
  var m   = ep.method;
  var hb  = ['POST','PUT','PATCH'].includes(m);
  var c;
  if (lang === 'curl') {
    c = 'curl -X ' + m + ' "' + url + '"';
    if (hb) c += ' \\\n  -H "Content-Type: application/json" \\\n  -d \'{"key": "value"}\'';
  } else if (lang === 'js') {
    c = 'const response = await fetch("' + url + '", {\n  method: "' + m + '"'
      + (hb ? ',\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ key: "value" })' : '')
      + '\n});\n\nconst data = await response.json();\nconsole.log(data);';
  } else {
    c = 'import requests\n\n';
    if (hb) c += 'r = requests.post(\n    "' + url + '",\n    json={"key": "value"}\n)\n';
    else    c += 'r = requests.' + m.toLowerCase() + '("' + url + '")\n';
    c += '\nprint(r.json())';
  }
  G('code-out').textContent = c;
}

function copyCode() { navigator.clipboard.writeText(G('code-out').textContent); }

// ═══════════════════════════════════════════════════════════════
// Copy URL
// ═══════════════════════════════════════════════════════════════
function copyUrl() {
  if (!curApi) return;
  navigator.clipboard.writeText(curApi.endpoint).then(function() {
    var b = G('copy-btn');
    b.textContent = 'Copied!';
    setTimeout(function(){ b.textContent = 'Copy'; }, 2000);
  });
}

// ═══════════════════════════════════════════════════════════════
// Dashboard
// ═══════════════════════════════════════════════════════════════
async function showDashboard() {
  hide('v-home'); show('v-dash');
  show('d-load'); hide('d-empty');
  var dg = G('d-grid');
  dg.style.display = 'none';

  try {
    var r    = await fetch('/api/apis');
    var apis = await r.json();
    hide('d-load');

    if (!Array.isArray(apis) || !apis.length) { show('d-empty'); return; }

    dg.innerHTML = '';
    apis.forEach(function(api) {
      var ep   = (api.endpoints||[])[0];
      var card = document.createElement('div');
      card.className = 'card p-5 cursor-pointer transition-all group';
      card.style.borderRadius = '1rem';

      card.innerHTML =
        '<div class="flex items-start justify-between gap-3 mb-3">'
        + '<div class="min-w-0"><h3 class="font-semibold text-sm mb-1 truncate">' + esc(api.name) + '</h3>'
        + '<p class="text-xs text-slate-500 line-clamp-2">' + esc(api.description) + '</p></div>'
        + '<button onclick="delApi(event,\''+api.id+'\')" class="shrink-0 opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-300 glass-sm px-2 py-1 rounded-lg transition-all">Delete</button>'
        + '</div>'
        + '<div class="flex items-center justify-between mb-3">'
        + (ep ? '<span class="mono text-xs font-bold px-2 py-0.5 rounded-lg m-'+esc(ep.method)+'">'+esc(ep.method)+'</span>' : '<span></span>')
        + '<span class="text-xs text-slate-700">' + (api.calls_count||0) + ' calls</span>'
        + '</div>'
        + '<div class="pt-3 border-t border-white/5">'
        + '<code class="text-xs text-purple-400 mono truncate block">' + esc(api.endpoint) + '</code>'
        + '</div>';

      card.onclick = function(e) {
        if (e.target.tagName === 'BUTTON') return;
        curApi = api;
        showHome();
        renderResult(api);
      };
      dg.appendChild(card);
    });

    dg.style.display = 'grid';
  } catch (e) {
    G('d-load').textContent = 'Failed to load: ' + e.message;
  }
}

async function delApi(e, id) {
  e.stopPropagation();
  if (!confirm('Delete this API and all its data? This cannot be undone.')) return;
  try {
    await fetch('/api/apis/' + id, {method:'DELETE'});
    var card = e.target.closest('.card');
    if (card) card.remove();
    var dg = G('d-grid');
    if (dg && !dg.children.length) { dg.style.display='none'; show('d-empty'); }
  } catch (err) { alert('Delete failed: ' + err.message); }
}

// ═══════════════════════════════════════════════════════════════
// Navigation
// ═══════════════════════════════════════════════════════════════
function showHome() {
  show('v-home'); hide('v-dash');
}
</script>
</body>
</html>`;
}
