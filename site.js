/* 포켓몬 리그 사이트 v15 — 탭으로 넘기는 한 화면 사이트 */
(function(){
  "use strict";
  var S = window.SITE || {};
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hover = window.matchMedia && matchMedia("(hover:hover)").matches;
  var saver = navigator.connection && navigator.connection.saveData;
  function el(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ---------- content ---------- */
  var REGIONS = [
    { name:"푸른들", when:"I · MORNING", desc:"과수원과 풍차, 모험이 시작되는 들판. 루버 덧창을 단 서양 시골 마을이 이어지고, 첫 리그는 들판 한가운데 있어요.",
      chips:["체육관 8곳","배틀 타워","백화점과 게임코너"],
      shots:[["r1_sprout","새싹마을"],["r1_windmill","풍차 마을"],["r1_orchard","과수원 마을"],["r1_tower","배틀 타워"],["r1_league","푸른들 포켓몬 리그"]] },
    { name:"백암산", when:"II · SUNSET", desc:"흰 바위 산맥 위의 산사와 온천. 창호지 문과 팔작지붕의 산마을을 지나 산 위의 리그로 올라가요.",
      chips:["체육관 8곳","온천 마을","광산 도시"],
      shots:[["r2_temple","산사원 마을"],["r2_lake","설산 호숫가"],["r2_spring","온천 마을"],["r2_league","백암산 포켓몬 리그"]] },
    { name:"남해 제도", when:"III · NOON", desc:"산호 해변과 섬을 잇는 바다. 격자창과 아치 회랑의 섬마을, 바다 밑 유리 통로까지 이어져요.",
      chips:["체육관 8곳","해저 기지 섬","섬과 섬 사이 바닷길"],
      shots:[["r3_light","등대 마을"],["r3_shrine","신전 섬"],["r3_reef","암초 마을"],["r3_league","남해 포켓몬 리그"]] },
    { name:"북부 고원", when:"IV · NIGHT", desc:"설원과 연구탑, 마지막 지방. 석조 성채와 목조 회관 사이로 밤이면 창마다 불이 켜져요.",
      chips:["체육관 8곳","관문 마을","온기 마을의 온천"],
      shots:[["r4_lab","연구탑 마을"],["r4_glacier","빙하 마을"],["r4_league","북부 포켓몬 리그"]] }
  ];
  var IC = {
    legend:'<path d="M12 3l2.2 5.3 5.8.5-4.4 3.8 1.3 5.6L12 15.3 7.1 18.2l1.3-5.6L4 8.8l5.8-.5z"/>',
    cards:'<rect x="4" y="3.5" width="11" height="15" rx="1.5"/><path d="M15 6.5l4 1.2-3.5 12.3-6-1.8"/>',
    tv:'<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M8 3l4 3 4-3M10 10l4 2-4 2z"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.2c2.3.2 4 1.7 4.5 4.3"/>',
    style:'<path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M3 10h18l-1 2H4z"/><path d="M9 15h6l1 5H8z"/>',
    season:'<path d="M12 21V11"/><path d="M12 11c-4 0-7-2.6-7-7 4 0 7 2.6 7 7zM12 13c3.6 0 6-2.2 6-6-3.6 0-6 2.2-6 6z"/>',
    ask:'<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6M12 16.6v.2"/>',
    battle:'<path d="M5 19 19 5M14 5h5v5M5 5l5 5M14 14l5 5M5 14v5h5"/>',
    explore:'<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    gear:'<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M9 6.5h6M9 9.5h6M9 12.5h3"/><circle cx="12" cy="17.5" r="1"/>'
  };
  var FEAT = [
    { ic:"legend", tag:"LEGENDS", t:"전설은 한 사람을 골라요", imgs:["r2_league","r4_glacier"],
      b:["전설과 준전설 모두, 서버에서 처음 만나 잡은 한 명만 데려갈 수 있어요. 단서는 마을 곳곳의 메모와 옛 돌에 흩어져 있고, 하늘이 유성우나 뇌우로 바뀌는 날에만 나타나는 전설도 있어요.","누군가 먼저 데려갔다면 남은 잔상과 기념 배틀을 해 「인정」을 받고 다음 전설로 넘어가면 돼요. 교환은 되지만, 처음 고른 트레이너의 이름은 기록에 남아요."],
      n:[["44종","전설 도감"],["1명","종마다 첫 주인"]] },
    { ic:"cards", tag:"CARDS", t:"리그 카드", imgs:["ui_card","ui_binder"], fit:["contain","contain"],
      b:["포켓몬 카드로 겨루는 카드 배틀. 과수원 마을 북쪽 카드 클럽에서 트레이너 8명과 카드 마스터가 기다려요.","관장 · 사천왕 · 챔피언이 그려진 인물 카드도 팩에서 나와요. 카드 사이트에 디스코드로 들어오면 마크 친구와 그대로 대전할 수 있어요."],
      n:[["67장","트레이너스 카드"],["크로스플레이","사이트 ↔ 마크"]] },
    { ic:"tv", tag:"LIVE", t:"리그 TV와 배틀 카메라", imgs:["feat_tv"],
      b:["챔피언전 · 사천왕 · 체육관 · 전설 조우 · 카드 대전을 포켓기어 TV로 생중계해요. 관전석에 들어가 응원하고, 나가면 원래 자리로 돌아와요.","내 배틀은 시작할 때, 큰 기술이 맞을 때, 포켓몬이 쓰러질 때 카메라가 잠깐 두 포켓몬을 비춰요."],
      n:[["7종","중계되는 배틀"]] },
    { ic:"people", tag:"PEOPLE", t:"마을 사람과 가까워지기", imgs:["ui_phone","feat_people"], fit:["contain","cover"],
      b:["직업 NPC 24종과 「이야기 나누기」로 친해지면 그 사람만의 이야기가 이어져요. 관장 · 사천왕 · 챔피언과는 포켓기어로 전화를 주고받아요.","이야기 의뢰를 모두 마치면 지방마다 후일담이 열리고, 도서관엔 사천왕 수기와 전설 연구 노트가 꽂혀 있어요."],
      n:[["24종","마음을 나누는 NPC"],["53명","전화 연락처"]] },
    { ic:"style", tag:"STYLE", t:"여섯 부위 꾸미기", imgs:["ui_style"],
      b:["모자 · 얼굴 · 목 · 등 · 손 · 신발. 날개, 안경, 목에 건 카메라, 잠자리채, 찻잔까지 300가지 가까운 꾸미기가 있어요.","부티크 거울 앞의 꾸미기 상자로 모으고, 겹친 건 조각으로 바꿔 원하는 걸 골라요. 현금 결제는 없어요."],
      n:[["6칸","부위"],["0원","현금 결제"]] },
    { ic:"season", tag:"SEASONS", t:"달력을 따라 바뀌는 계절", imgs:["r1_sprout","r2_temple"],
      b:["실제 달력을 따라 봄 · 여름 · 가을 · 겨울이 와요. 나뭇잎 색이 바뀌고, 봄엔 꽃잎이, 가을엔 낙엽이, 겨울엔 비 대신 눈이 내려요.","주민들은 시간대마다 괭이, 낚싯대, 밤엔 등불을 들고 하루 일과대로 움직여요."],
      n:[["4계절","실제 달력 기준"]] },
    { ic:"ask", tag:"ASK", t:"무엇이든 박사님께", imgs:["ui_ask"], fit:["contain"],
      b:["서버에 대해 궁금한 건 박사님께 물어보세요. 3,400개가 넘는 답 중에서 찾아 줘요.","답하지 못한 질문은 모아 두었다가 새 답으로 돌아와요. 물어볼수록 똑똑해지는 박사님이에요."],
      n:[["3,400+","준비된 답"]] },
    { ic:"battle", tag:"BATTLE", t:"더 영리한 배틀", imgs:["feat_battle"],
      b:["메가진화 · Z기술 · 다이맥스 · 테라스탈을 모두 써요. 길 트레이너는 눈이 마주치면 「!」 하고 다가와 승부를 걸어요.","공식 챔피언과는 실전으로 겨뤄, 이긴 사람이 다음 챔피언이 돼요."],
      n:[["4가지","배틀 기믹"]] },
    { ic:"explore", tag:"EXPLORE", t:"들어가서 노는 마을", imgs:["feat_explore","r3_shrine"],
      b:["난파선, 다이빙 코스, 별 관측소, 그림자 동굴, 폐광, 해저 기지. 체육관만 깨고 지나가던 마을에 들러 볼 이유가 생겼어요."],
      n:[["45곳","들를 마을"]] },
    { ic:"gear", tag:"POKÉGEAR", t:"정리된 포켓기어", imgs:["ui_gear"], fit:["contain"],
      b:["앱을 12개로 묶고 「기능 찾기」를 넣었어요. 지도, 도감, 위키, 전화, TV를 우클릭 한 번으로 열어요.","오늘 할 일, 물건 찾기, 어디서나 PC까지 손안에 있어요."],
      n:[["12개","앱"]] }
  ];
  var STEPS = [
    ["준비","마인크래프트 자바 에디션과 무료 런처 Modrinth 앱을 설치해요.","modrinth"],
    ["모드팩 받기","받은 .mrpack 파일을 더블클릭하거나, Modrinth 앱의 ＋ 버튼 → 「파일에서 가져오기」로 불러와요.","dl"],
    ["메모리 늘리기","프로필 설정 → Java 메모리를 4GB 이상으로. 여유가 있으면 6GB가 좋아요.",""],
    ["출발","▶ 플레이를 누르고 서버에 들어가면 첫 열차가 새싹마을로 데려다줘요.",""]
  ];
  var DL_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2v9M4 7.5 8 11.5 12 7.5M2.5 14h11"/></svg>';

  /* ---------- config.js ---------- */
  var ver = (S.version || "").trim(), vShort = (ver.split("·")[0] || "").trim() || "v15";
  $$(".verTag").forEach(function(e){ e.textContent = vShort; });
  if (ver){ $("#verLine").textContent = "최신 모드팩 "; var vb = el("b"); vb.textContent = ver; $("#verLine").appendChild(vb); }
  if (S.server){ $("#srvNone").hidden = true; $("#srvBox").hidden = false; $("#srv").textContent = S.server; }
  $("#srvCopy").addEventListener("click", function(){ var b = this; if (navigator.clipboard) navigator.clipboard.writeText(S.server).then(function(){ b.textContent = "복사됨"; setTimeout(function(){ b.textContent = "복사"; }, 1500); }); });
  var L = [];
  if (S.discord) L.push({ title:"디스코드 들어가기", url:S.discord });
  if (S.cards) L.push({ title:"리그 카드 사이트", url:S.cards });
  if (S.poster) L.push({ title:"서버 소개 포스터", url:S.poster });
  (S.links || []).forEach(function(x){ if (x && x.url && !/modrinth\.com\/app/.test(x.url)) L.push(x); });
  L.forEach(function(x){ var a = el("a"); a.href = x.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "↗ " + (x.title || x.url); $("#links").appendChild(a); });
  $$("[data-dl]").forEach(function(a){
    if (S.download){ a.href = S.download; a.target = "_blank"; a.rel = "noopener"; }
    else a.addEventListener("click", function(e){ e.preventDefault(); go("start"); });
  });

  /* ---------- tabs instead of scrolling ---------- */
  var VIEWS = ["home","world","new","film","start","music"];
  var tabBtns = $$("#tabs button"), ink = $("#ink"), curtain = $("#curtain"), top = $("#top"), current = null, counted = false, timer = null;
  function narrow(){ return matchMedia("(max-width:900px)").matches; }
  function moveInk(){
    var b = tabBtns[VIEWS.indexOf(current)]; if (!b) return;
    var pad = narrow() ? 18 : 16;
    ink.style.left = (b.offsetLeft + pad) + "px";
    ink.style.width = Math.max(0, b.offsetWidth - pad * 2) + "px";
  }
  function go(name, opts){
    if (VIEWS.indexOf(name) < 0) name = "home";
    if (name === current) return;
    var prev = current; current = name;
    tabBtns.forEach(function(b){ var on = b.dataset.go === name; b.setAttribute("aria-selected", on ? "true" : "false"); b.tabIndex = on ? 0 : -1; });
    moveInk();
    function show(){
      VIEWS.forEach(function(v){
        var s = document.getElementById("v-" + v), on = v === name;
        s.classList.toggle("on", on); s.setAttribute("aria-hidden", on ? "false" : "true"); if ("inert" in s) s.inert = !on;
        if (on) s.scrollTop = 0;
      });
      top.classList.toggle("solid", name !== "home");
      enter(name, prev);
    }
    clearTimeout(timer);
    if (prev && !reduce){ curtain.classList.remove("go"); void curtain.offsetWidth; curtain.classList.add("go"); timer = setTimeout(show, 380); }
    else show();
    if (!(opts && opts.fromHash)){
      var h = name === "home" ? location.pathname + location.search : "#" + name;
      if (prev) history.pushState(null, "", h); else history.replaceState(null, "", h);
    }
  }
  function enter(name, prev){
    var hv = $("#heroVid");
    if (name === "home"){ if (!reduce && !saver) hv.play().catch(function(){}); countUp(); }
    else hv.pause();
    if (prev === "film"){ var v = $("#screen video"); if (v) v.pause(); }
    if (prev === "music" && name !== "music"){ /* music keeps playing across tabs on purpose */ }
  }
  $$("[data-go]").forEach(function(b){ b.addEventListener("click", function(){ go(b.dataset.go); }); });
  $("#tabs").addEventListener("keydown", function(e){
    var i = VIEWS.indexOf(current), n = null;
    if (e.key === "ArrowRight") n = (i + 1) % VIEWS.length;
    if (e.key === "ArrowLeft") n = (i + VIEWS.length - 1) % VIEWS.length;
    if (n != null){ e.preventDefault(); go(VIEWS[n]); tabBtns[n].focus(); }
  });
  addEventListener("popstate", function(){ go(location.hash.slice(1) || "home", { fromHash:true }); });
  addEventListener("resize", moveInk);
  // swipe left / right between tabs on phones (not inside horizontal strips)
  var sx = null, sy = null;
  $(".views").addEventListener("touchstart", function(e){ if (e.target.closest(".flist,.trail,.bar,video")) { sx = null; return; } sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive:true });
  $(".views").addEventListener("touchend", function(e){
    if (sx == null) return; var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8){ var i = VIEWS.indexOf(current) + (dx < 0 ? 1 : -1); if (i >= 0 && i < VIEWS.length) go(VIEWS[i]); }
  });

  /* ---------- home ---------- */
  if (reduce || saver){ var hv0 = $("#heroVid"); hv0.removeAttribute("autoplay"); hv0.pause(); hv0.style.display = "none"; }
  function countUp(){
    if (counted || reduce) return; counted = true;
    var start = performance.now() + (document.documentElement.classList.contains("loaded") ? 300 : 2000);
    $$("[data-count]").forEach(function(b){
      var to = +b.dataset.count; b.textContent = "0";
      (function tick(t){ var k = Math.max(0, Math.min(1, (t - start) / 1300)); b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(performance.now());
    });
  }

  /* ---------- world ---------- */
  var acc = $("#acc"), panels = [];
  REGIONS.forEach(function(r, i){
    var p = el("div", "panel" + (i === 0 ? " open" : ""));
    p.tabIndex = 0; p.setAttribute("role", "button"); p.setAttribute("aria-expanded", i === 0 ? "true" : "false"); p.setAttribute("aria-label", r.name + " 펼치기");
    p.innerHTML = '<div class="bg"><img src="img/v15/' + r.shots[0][0] + '.jpg" alt=""><img class="off" alt=""></div><span class="vt">' + r.name + '</span><span class="num">' + r.when.replace(" · ", "<br>") + '</span>' +
      '<div class="body"><p class="when">' + r.when + '</p><h3>' + r.name + '</h3><p class="town">' + r.shots[0][1] + '</p><p>' + r.desc + '</p><ul class="chips">' + r.chips.map(function(c){ return "<li>" + c + "</li>"; }).join("") + '</ul><div class="trail" role="group" aria-label="' + r.name + ' 마을"></div></div>';
    var imgs = $$(".bg img", p), front = 0, trail = $(".trail", p), town = $(".town", p), shown = 0;
    r.shots.forEach(function(sh, k){
      var b = el("button"); b.type = "button"; b.setAttribute("aria-label", sh[1]); b.setAttribute("aria-current", k === 0 ? "true" : "false");
      b.innerHTML = '<img src="img/v15/' + sh[0] + '.jpg" alt="" loading="lazy">';
      function pickShot(e){
        if (e) e.stopPropagation();
        if (shown === k) return; shown = k;
        $$("button", trail).forEach(function(x){ x.setAttribute("aria-current", x === b ? "true" : "false"); });
        var nx = imgs[1 - front]; nx.src = "img/v15/" + sh[0] + ".jpg"; nx.classList.remove("off"); imgs[front].classList.add("off"); front = 1 - front;
        town.textContent = sh[1]; town.classList.remove("swap"); void town.offsetWidth; town.classList.add("swap");
      }
      b.addEventListener("click", pickShot);
      if (hover) b.addEventListener("mouseenter", pickShot);
      trail.appendChild(b);
    });
    function open(){ panels.forEach(function(q){ q.classList.toggle("open", q === p); q.setAttribute("aria-expanded", q === p ? "true" : "false"); }); }
    if (hover) p.addEventListener("mouseenter", open);
    p.addEventListener("click", open);
    p.addEventListener("keydown", function(e){ if (e.target === p && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); open(); } });
    acc.appendChild(p); panels.push(p);
  });

  /* ---------- this season ---------- */
  var flist = $("#flist"), fstage = $("#fstage"), fl = $$("img", $("#fpic")), ff = 0, fcur = -1;
  FEAT.forEach(function(f, i){
    var li = el("li"), b = el("button"); b.type = "button"; b.setAttribute("role", "tab"); b.id = "ftab" + i;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + IC[f.ic] + '</svg><b>' + f.t + '</b><small>' + f.tag + '</small>';
    b.addEventListener("click", function(){ pickF(i); });
    b.addEventListener("keydown", function(e){ var k = e.key; if (k === "ArrowDown" || k === "ArrowRight"){ e.preventDefault(); pickF((i + 1) % FEAT.length, true); } if (k === "ArrowUp" || k === "ArrowLeft"){ e.preventDefault(); pickF((i + FEAT.length - 1) % FEAT.length, true); } });
    li.appendChild(b); flist.appendChild(li);
  });
  var slideT = null, dots = el("div", "dots"); $("#fpic").appendChild(dots);
  function showImg(f, k){
    var nx = fl[1 - ff]; nx.src = "img/v15/" + f.imgs[k] + ".jpg"; nx.alt = f.t;
    nx.style.objectFit = (f.fit && f.fit[k]) || "cover";
    nx.classList.add("on"); fl[ff].classList.remove("on"); ff = 1 - ff;
    $$("button", dots).forEach(function(d, j){ d.setAttribute("aria-current", j === k ? "true" : "false"); });
  }
  function pickF(i, focus){
    if (i === fcur) return; fcur = i; var f = FEAT[i], k = 0;
    $$("button", flist).forEach(function(b, j){ b.setAttribute("aria-selected", j === i ? "true" : "false"); b.tabIndex = j === i ? 0 : -1; });
    if (focus) $("#ftab" + i).focus();
    fstage.setAttribute("aria-labelledby", "ftab" + i);
    dots.innerHTML = "";
    if (f.imgs.length > 1) f.imgs.forEach(function(_, j){
      var d = el("button"); d.type = "button"; d.setAttribute("aria-label", (j + 1) + "번째 장면");
      d.addEventListener("click", function(){ k = j; showImg(f, k); restart(); }); dots.appendChild(d);
    });
    showImg(f, 0);
    clearInterval(slideT);
    function restart(){ clearInterval(slideT); if (f.imgs.length > 1 && !reduce) slideT = setInterval(function(){ k = (k + 1) % f.imgs.length; showImg(f, k); }, 4200); }
    restart();
    fstage.classList.add("out");
    setTimeout(function(){
      $("#ft").textContent = f.t;
      $("#fb").innerHTML = f.b.map(function(p){ return "<p>" + p + "</p>"; }).join("");
      $("#fn").innerHTML = (f.n || []).map(function(n){ return "<div><b>" + n[0] + "</b>" + n[1] + "</div>"; }).join("");
      fstage.classList.remove("out");
    }, reduce ? 0 : 200);
    var sel = $("#ftab" + i); if (flist.scrollWidth > flist.clientWidth) flist.scrollTo({ left: sel.parentNode.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }
  pickF(0);
  FEAT.forEach(function(f){ f.imgs.forEach(function(n){ var im = new Image(); im.src = "img/v15/" + n + ".jpg"; }); });
  $("#fpic").addEventListener("mousemove", function(e){ var r = this.getBoundingClientRect(); this.style.setProperty("--mx", (e.clientX - r.left) + "px"); this.style.setProperty("--my", (e.clientY - r.top) + "px"); });

  /* ---------- trailer plays inside its tab ---------- */
  $("#posterBtn").addEventListener("click", function(){
    var v = el("video"); v.src = "trailer.mp4"; v.controls = true; v.playsInline = true; v.autoplay = true; v.poster = "img/v15/cover.jpg";
    var s = $("#screen"); s.innerHTML = ""; s.appendChild(v); v.play().catch(function(){}); v.focus();
  });

  /* ---------- install steps ---------- */
  var stabs = $("#stabs"), sbody = $("#sbody"), scur = -1;
  STEPS.forEach(function(s, i){
    var b = el("button"); b.type = "button"; b.setAttribute("role", "tab");
    b.innerHTML = '<span class="n">0' + (i + 1) + '</span><b>' + s[0] + '</b>';
    b.addEventListener("click", function(){ pickS(i); }); if (hover) b.addEventListener("mouseenter", function(){ pickS(i); });
    stabs.appendChild(b);
  });
  function pickS(i){
    if (i === scur) return; scur = i;
    $$("button", stabs).forEach(function(b, k){ b.setAttribute("aria-selected", k === i ? "true" : "false"); });
    $("#sfill").style.width = ((i + 1) / STEPS.length * 100) + "%";
    var s = STEPS[i], act = "";
    if (s[2] === "dl") act = '<a class="btn main" data-dl href="#" target="_blank" rel="noopener">' + DL_ICON + '모드팩 받기 <small>' + vShort + '</small></a>';
    if (s[2] === "modrinth") act = '<a class="btn" href="https://modrinth.com/app" target="_blank" rel="noopener">Modrinth 앱 받기 <span class="ar">→</span></a>';
    sbody.innerHTML = '<div class="t"><h3>' + s[0] + '</h3><p>' + s[1] + '</p>' + (s[2] === "dl" ? '<p style="font-size:13px;color:var(--mute);margin-top:8px">' + (S.download ? "구글 드라이브에서 받아요. 「다운로드」 버튼을 누르면 돼요." : "다운로드 링크를 준비 중이에요. 디스코드 공지를 확인해 주세요.") + '</p>' : "") + '</div>' + act;
    var d = $("[data-dl]", sbody); if (d){ if (S.download) d.href = S.download; else d.setAttribute("aria-disabled", "true"); }
  }
  pickS(1);

  /* ---------- soundtrack ---------- */
  var T = window.TRACKS || [], mbox = $("#musicBox");
  var order = ["마을","도로","야생","체육관","리그","시설","배틀","헤일로","이야기"];
  var names = { "마을":"TOWNS","도로":"ROUTES","야생":"WILD","체육관":"GYMS","리그":"LEAGUE","시설":"PLACES","배틀":"BATTLE","헤일로":"HALO","이야기":"STORY" };
  var list = $("#mList"), audio = new Audio(), mcur = null, btnOf = {};
  audio.preload = "none";
  if (T.length) { $("#trackCount").dataset.count = T.length; $("#trackCount").textContent = T.length; }
  function fmt(s){ s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
  order.forEach(function(g){
    var ts = T.filter(function(t){ return t.group === g; }); if (!ts.length) return;
    var d = el("div", "grp"), h = el("h4"); h.textContent = names[g] || g; d.appendChild(h);
    ts.forEach(function(t){
      var b = el("button"); b.type = "button";
      b.innerHTML = '<span class="ic">▶</span><span class="eq"><i></i><i></i><i></i></span><b style="font-weight:500"></b><small></small>';
      $("b", b).textContent = t.title; $("small", b).textContent = fmt(t.dur);
      b.addEventListener("click", function(){ if (mcur === t && !audio.paused) audio.pause(); else pick(t, true); });
      btnOf[t.id] = b; d.appendChild(b);
    });
    list.appendChild(d);
  });
  function capAt(t, s){ var c = ""; (t.caps || []).forEach(function(x){ if (s >= x[0]) c = x[1]; }); return c; }
  function pick(t, play){
    if (mcur && btnOf[mcur.id]) btnOf[mcur.id].removeAttribute("aria-current");
    mcur = t; if (btnOf[t.id]) btnOf[t.id].setAttribute("aria-current", "true");
    $("#mTitle").textContent = t.title; $("#mWhere").textContent = t.where || "";
    audio.src = "audio/" + t.id + ".mp3"; $("#mCap").textContent = capAt(t, 0) || " ";
    if (play) audio.play().catch(function(){});
  }
  $("#mPlay").addEventListener("click", function(){ if (!mcur && T.length) pick(T[0], false); if (audio.paused) audio.play().catch(function(){}); else audio.pause(); });
  audio.addEventListener("play", function(){ $("#mPlay").textContent = "❚❚ 멈춤"; mbox.classList.add("playing"); mbox.classList.remove("paused"); });
  audio.addEventListener("pause", function(){ $("#mPlay").textContent = "▶ 재생"; mbox.classList.remove("playing"); mbox.classList.add("paused"); });
  audio.addEventListener("timeupdate", function(){
    var p = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
    $("#mFill").style.width = p + "%"; $("#mBar").setAttribute("aria-valuenow", Math.round(p));
    $("#mTime").textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration || (mcur && mcur.dur));
    if (mcur) $("#mCap").textContent = capAt(mcur, audio.currentTime) || " ";
  });
  audio.addEventListener("ended", function(){ var i = T.indexOf(mcur); if (i >= 0 && T[i + 1]) pick(T[i + 1], true); });
  $("#mBar").addEventListener("click", function(e){ var r = this.getBoundingClientRect(); if (audio.duration) audio.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * audio.duration; });
  $("#mBar").addEventListener("keydown", function(e){ if (!audio.duration) return; if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5); });
  if (T.length){ $("#mTitle").textContent = T[0].title; $("#mWhere").textContent = T[0].where || ""; }

  /* ---------- go ---------- */
  go(location.hash.slice(1) || "home", { fromHash:true });
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ document.documentElement.classList.add("loaded"); moveInk(); }); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
})();
