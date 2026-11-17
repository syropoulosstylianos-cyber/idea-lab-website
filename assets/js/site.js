/* IDEA Lab site. Content lives in /data/*.json; edit those files to update the site. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const load = (name) => fetch(`data/${name}.json`, { cache: "no-cache" }).then((r) => r.json());
  const page = document.body.dataset.page;
  const EMAIL = 'ssyropou@asu.edu';
  const VIZ = 'https://syropoulosstylianos-cyber.github.io/research-landscape/';

  const TOPICS = {
    climate: { name: 'Climate & Sustainability', long: 'Human Dimensions of Climate Change', q: 'Mitigation and adaptation start with people. What moves them to act?' },
    intergen: { name: 'Intergenerational Decisions', long: 'Intergenerational Decisions', q: 'How do people weigh today’s choices against the generations who will inherit them?' },
    future: { name: 'Future Thinking', long: 'Future Thinking', q: 'How do people picture what comes next, and does picturing it change what they do?' },
    morality: { name: 'Morality', long: 'Morality', q: 'Where do people draw the line between right and wrong, and who counts?' },
    prosocial: { name: 'Altruism & Prosociality', long: 'Altruism, Cooperation, and Prosociality', q: 'Why do people help strangers, and how far can that help reach?' },
    intergroup: { name: 'Intergroup Conflict', long: 'Intergroup Conflict', q: 'What pulls groups apart, and what brings them back together?' },
  };
  const CATS = { publication: 'Publications', award: 'Awards & Grants', outreach: 'Public Outreach', presentation: 'Presentations', lab: 'Lab News' };
  const ICONS = {
    climate: '<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c7 6 7 28 0 34M24 7c-7 6-7 28 0 34"/><path d="M30 14c5 0 8 3 8 8" stroke-width="3.5"/>',
    intergen: '<circle cx="24" cy="12.5" r="9"/><path d="M15 12.5h18M24 3.5c4.5 5 4.5 13 0 18M24 3.5c-4.5 5-4.5 13 0 18" stroke-width="1.8"/><path d="M2 29.5L9 28.5L13 25.5C15 24 17.5 26 16 28L14.5 30L27 30.5C30 30.5 30 35.5 27 35.5L13 37.5L2 37.5Z" fill="currentColor" stroke-width="1.2"/><path d="M46 38.5L39 37.5L35 34.5C33 33 30.5 35 32 37L33.5 39L21 39.5C18 39.5 18 44.5 21 44.5L35 46.5L46 46.5Z" fill="currentColor" stroke-width="1.2" opacity=".6"/>',
    future: '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l8 5"/><path d="M41 10l3-5M44 14l5-2" stroke-width="2"/>',
    morality: '<path d="M24 7v34M12 41h24M8 15h32"/><path d="M8 15l-5 12a5 5 0 0 0 10 0zM40 15l-5 12a5 5 0 0 0 10 0z"/>',
    prosocial: '<path d="M24 41S7 31 7 18a8.5 8.5 0 0 1 17-2 8.5 8.5 0 0 1 17 2c0 13-17 23-17 23z"/><path d="M17 23h14M24 16v14" stroke-width="2"/>',
    intergroup: '<path d="M33 9l11 4v9c0 9-4.5 14.5-11 18-6.5-3.5-11-9-11-18v-9z"/><path d="M33 16v17M27 23h12" stroke-width="2"/><path d="M4 44l22-22M6.5 34.5l7 7"/><path d="M19 12l-2-5M14 17l-5-2M25 8l1-4" stroke-width="2"/>',
  };
  const ico = (k) => `<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /* ---------- chrome: nav, footer, theme ---------- */
  const NAV = [['index.html', 'Home', 'home'], ['research.html', 'Research', 'research'], ['people.html', 'People', 'people'], ['news.html', 'News', 'news'], ['lab-life.html', 'Lab Life', 'life'], ['partners.html', 'Partners', 'partners'], ['join.html', 'Join', 'join']];
  const bulb = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3a9.5 9.5 0 0 0-5.5 17.2V24h11v-3.8A9.5 9.5 0 0 0 16 3z" stroke="#f2b33d" stroke-width="2.4"/><circle cx="16" cy="12.5" r="3.6" fill="#2f7fd0"/><path d="M12 27.5h8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  $('#nav').innerHTML = `<div class="wrap nav-in">
    <a class="brand" href="index.html">${bulb}<span>IDEA Lab</span></a>
    <button class="icon-btn" id="menu-btn" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <nav class="nav-links" aria-label="Main">
      ${NAV.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      <button class="icon-btn" id="theme-btn" aria-label="Switch light and dark theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg></button>
    </nav></div>`;
  $('#menu-btn').onclick = (e) => {
    const open = $('.nav-links').classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open);
  };
  $('#theme-btn').onclick = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };
  const onScroll = () => $('#nav').classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  $('#footer').innerHTML = `<div class="wrap"><div class="cols">
    <div class="foot-id"><img src="assets/img/idea-lab-logo.png" alt="IDEA Lab logo" width="140">
      <div><h3>Intergenerational Decisions and Effective Action Lab</h3>
      <p style="margin-top:14px;max-width:44ch">College of Global Futures, Arizona State University. Directed by Dr. Stylianos Syropoulos.</p></div></div>
    <div><h4>Explore</h4>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>
    <div><h4>Connect</h4>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <a href="https://scholar.google.com/citations?user=N1vvKpQAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>
      <a href="https://www.linkedin.com/in/stylianos-syropoulos-165437382/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://search.asu.edu/profile/3260579" target="_blank" rel="noopener">ASU profile</a></div>
  </div><p class="fine">IDEA Lab, Arizona State University</p></div>`;

  const reveal = () => {
    const els = $$('.reveal:not(.in)');
    if (!els.length) return;
    let fired = false;
    const io = new IntersectionObserver((es) => { fired = true; es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    // Safety net: if the observer never reports (very old or throttled browsers), show everything.
    setTimeout(() => { if (!fired) els.forEach((el) => el.classList.add('in')); }, 1500);
  };
  const countUp = (el, to) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1300;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const stats = (el, items) => {
    el.innerHTML = items.map(([n, l]) => `<div class="stat"><b data-to="${n}">0</b><span>${l}</span></div>`).join('');
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { $$('b', el).forEach((b) => countUp(b, +b.dataset.to)); io.disconnect(); } }));
    io.observe(el);
  };
  const boldMe = (a) => esc(a).replace(/Syropoulos[.,] S\.?(?:,? E\.?(?= ?\())?/g, (m) => `<b>${m}</b>`);
  const newsRow = (n) => `<article class="news-item reveal"><div class="when"><span>${n.month} ${n.year}</span><span class="tag" data-c="${n.cat}">${CATS[n.cat].replace(/s$/, '').replace('Awards & Grant', 'Award / Grant')}</span></div><p>${n.html}</p></article>`;

  /* ---------- home ---------- */
  async function home() {
    hero();
    const [pubs, news] = await Promise.all([load('publications'), load('news')]);
    const grid = $('#themes');
    grid.innerHTML = Object.entries(TOPICS).map(([k, t]) => {
      const n = pubs.filter((p) => p.topics.includes(k)).length;
      return `<button class="theme reveal" data-c="${k}" data-k="${k}" aria-expanded="false">${ico(k)}<h3>${t.long}</h3><p class="q">${t.q}</p><span class="n">${n} papers</span></button>`;
    }).join('');
    grid.onclick = (e) => {
      const b = e.target.closest('.theme'); if (!b) return;
      const was = b.getAttribute('aria-expanded') === 'true';
      $$('.theme', grid).forEach((x) => x.setAttribute('aria-expanded', 'false'));
      $('.theme-panel', grid)?.remove();
      if (was) return;
      b.setAttribute('aria-expanded', 'true');
      const k = b.dataset.k, list = pubs.filter((p) => p.topics.includes(k));
      const panel = document.createElement('div');
      panel.className = 'theme-panel'; panel.dataset.c = k;
      panel.innerHTML = `<span class="eyebrow" style="color:var(--c)">Fresh from the lab: ${TOPICS[k].name}</span>
        <ol>${list.slice(0, 3).map((p) => `<li><a href="${esc(p.url || 'research.html?topic=' + k)}" target="_blank" rel="noopener">${esc(p.title)}</a><small><em>${esc(p.journal)}</em>, ${p.year}</small></li>`).join('')}</ol>
        <a class="btn line small" href="research.html?topic=${k}">See all ${list.length} papers</a>`;
      // place the panel after the last card in the clicked card's row
      const cards = $$('.theme', grid), top = b.offsetTop;
      const last = cards.filter((c) => c.offsetTop === top).pop();
      last.after(panel);
    };
    $('#latest').innerHTML = news.slice(0, 5).map(newsRow).join('');
    const outlets = [...new Set(pubs.flatMap((p) => p.media.map((m) => m.name.replace('Character & Context Blog', 'Character and Context'))))];
    $('#outlets').innerHTML = `<div class="marquee-track">${[...outlets, ...outlets].map((o) => `<span>${esc(o)}</span>`).join('')}</div>`;
    reveal();
  }

  function hero() {
    const words = [
      'Who cares about future generations?',
      'Does the moral circle stand the test of time?',
      'What moves people to act on climate change?',
      'Can concern for the future bridge political divides?',
      'What drives extraordinary altruism?',
      'How far into the future does our moral concern reach?',
    ];
    const rot = $('.rot'); let i = 0;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(() => {
        rot.classList.add('out');
        setTimeout(() => { rot.textContent = words[++i % words.length]; rot.classList.remove('out'); }, 360);
      }, 4200);
    }
    // Generations drifting toward the future: nodes flow left to right, linked to their neighbors.
    const cv = $('.hero canvas'), cx = cv.getContext('2d');
    let W, H, pts = [], mouse = { x: -999, y: -999 };
    const size = () => {
      const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(110, (W * H) / 13000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, v: 0.15 + Math.random() * 0.45, r: 1 + Math.random() * 2.2, w: Math.random() * 6.28 }));
    };
    const draw = (t) => {
      cx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.v; p.y += Math.sin(t / 1400 + p.w) * 0.18;
        if (p.x > W + 20) { p.x = -20; p.y = Math.random() * H; }
      }
      for (let a = 0; a < pts.length; a++) {
        const p = pts[a];
        for (let b = a + 1; b < pts.length; b++) {
          const q = pts[b], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            cx.strokeStyle = `rgba(150,185,255,${0.16 * (1 - d2 / 15000)})`;
            cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke();
          }
        }
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y), hot = md < 150 ? 1 - md / 150 : 0;
        const fut = p.x / W; // further right = further in the future = more golden
        cx.fillStyle = `rgba(${Math.round(150 + 92 * fut)},${Math.round(185 - 6 * fut)},${Math.round(255 - 194 * fut)},${0.45 + 0.4 * fut + hot * 0.4})`;
        cx.beginPath(); cx.arc(p.x, p.y, p.r + hot * 3, 0, 6.29); cx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    let raf; size();
    addEventListener('resize', size);
    $('.hero').addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) draw(0), cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  }

  /* ---------- research ---------- */
  async function research() {
    const pubs = await load('publications');
    const params = new URLSearchParams(location.search);
    const st = { q: params.get('q') || '', topic: params.get('topic') || '', year: +params.get('year') || 0, mentee: false, press: false };
    const years = [...new Set(pubs.map((p) => p.year))].sort();
    const max = Math.max(...years.map((y) => pubs.filter((p) => p.year === y).length));
    stats($('#stats'), [
      [pubs.length, 'published papers'],
      [new Set(pubs.map((p) => p.journal)).size, 'different journals'],
      [pubs.filter((p) => p.mentee).length, 'with mentee co-authors'],
      [pubs.filter((p) => p.media.length).length, 'covered in the press'],
    ]);
    $('#yearchart').innerHTML = years.map((y) => {
      const n = pubs.filter((p) => p.year === y).length;
      return `<button class="ybar" data-y="${y}" aria-pressed="false" aria-label="${y}: ${n} papers"><b>${n}</b><i style="height:0" data-h="${Math.round((n / max) * 128)}"></i><span>${y}</span></button>`;
    }).join('');
    setTimeout(() => $$('.ybar i').forEach((i) => (i.style.height = i.dataset.h + 'px')), 80);
    $('#topics').innerHTML = Object.entries(TOPICS).map(([k, t]) => `<button class="chip" data-c="${k}" data-topic="${k}" aria-pressed="false">${t.name} <span class="ct">${pubs.filter((p) => p.topics.includes(k)).length}</span></button>`).join('')
      + `<button class="chip plain" data-flag="mentee" aria-pressed="false">With mentees <span class="ct">${pubs.filter((p) => p.mentee).length}</span></button>`
      + `<button class="chip plain" data-flag="press" aria-pressed="false">In the press <span class="ct">${pubs.filter((p) => p.media.length).length}</span></button>`;
    const input = $('#q'); input.value = st.q;

    const card = (p) => {
      const long = p.authors.length > 260;
      const au = long ? `${boldMe(p.authors.slice(0, 200))}… <button class="linkish" data-full="${esc(p.authors)}">all authors</button>` : boldMe(p.authors);
      return `<article class="pub">
        <div class="num">${p.n}</div>
        <div>
          <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
          <p class="au">${au}</p>
          <div class="meta"><span class="jr">${esc(p.journal)}</span><span>${p.year}</span>
            ${p.topics.map((t) => `<button class="tag" data-c="${t}" data-topic="${t}">${TOPICS[t].name}</button>`).join('')}
            ${p.mentee ? '<span class="tag">Mentee co-author</span>' : ''}
            <button class="linkish" data-cite>Full citation</button></div>
          ${p.media.length ? `<p class="press">In the press: ${p.media.map((m) => (m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.name)}</a>` : esc(m.name))).join(', ')}</p>` : ''}
        </div>
        <div class="cite" hidden>${p.cite} <button class="linkish" data-copy>Copy</button></div>
      </article>`;
    };
    const render = () => {
      const q = st.q.trim().toLowerCase();
      const out = pubs.filter((p) => (!st.topic || p.topics.includes(st.topic)) && (!st.year || p.year === st.year) && (!st.mentee || p.mentee) && (!st.press || p.media.length)
        && (!q || `${p.title} ${p.authors} ${p.journal} ${p.year}`.toLowerCase().includes(q)));
      $$('[data-topic].chip').forEach((c) => c.setAttribute('aria-pressed', c.dataset.topic === st.topic));
      $$('[data-flag]').forEach((c) => c.setAttribute('aria-pressed', st[c.dataset.flag]));
      $$('.ybar').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.y === st.year));
      const active = st.q || st.topic || st.year || st.mentee || st.press;
      $('#count').innerHTML = `<span><b>${out.length}</b> ${out.length === 1 ? 'paper' : 'papers'}${active ? ` of ${pubs.length}` : ''}${st.year ? ` from ${st.year}` : ''}${st.topic ? ` on ${TOPICS[st.topic].name}` : ''}</span>${active ? '<button class="linkish" id="clear">Clear filters</button>' : ''}`;
      $('#pubs').innerHTML = out.length ? out.map(card).join('') : '<p class="empty">No results.</p>';
      const u = new URLSearchParams(); if (st.topic) u.set('topic', st.topic); if (st.year) u.set('year', st.year); if (st.q) u.set('q', st.q);
      history.replaceState(null, '', location.pathname + (u.size ? '?' + u : ''));
    };
    input.oninput = () => { st.q = input.value; render(); };
    document.addEventListener('click', (e) => {
      const t = e.target;
      const topic = t.closest('[data-topic]'); if (topic) { st.topic = st.topic === topic.dataset.topic ? '' : topic.dataset.topic; render(); return; }
      const flag = t.closest('[data-flag]'); if (flag) { st[flag.dataset.flag] = !st[flag.dataset.flag]; render(); return; }
      const y = t.closest('.ybar'); if (y) { st.year = st.year === +y.dataset.y ? 0 : +y.dataset.y; render(); return; }
      if (t.id === 'clear') { Object.assign(st, { q: '', topic: '', year: 0, mentee: false, press: false }); input.value = ''; render(); return; }
      if (t.dataset.full) { t.parentElement.innerHTML = boldMe(t.dataset.full); return; }
      if ('cite' in t.dataset) { const c = $('.cite', t.closest('.pub')); c.hidden = !c.hidden; return; }
      if ('copy' in t.dataset) {
        const c = t.parentElement.cloneNode(true); $('button', c).remove();
        navigator.clipboard?.writeText(c.textContent.trim()).then(() => { t.textContent = 'Copied'; setTimeout(() => (t.textContent = 'Copy'), 1500); });
      }
    });
    render();
  }

  /* ---------- people ---------- */
  async function people() {
    const all = await load('people');
    const [dir, ...rest] = all;
    $('#director').innerHTML = `<img src="${dir.img}" alt="${esc(dir.name)}"><div><span class="eyebrow">${esc(dir.role)}</span><h2>${esc(dir.name)}</h2><p style="margin-top:16px">${dir.bio}</p>
      <div class="links"><a class="btn line small" href="mailto:${EMAIL}">Email</a><a class="btn line small" href="https://scholar.google.com/citations?user=N1vvKpQAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a><a class="btn line small" href="https://drive.google.com/file/d/1bDPRRRMNZccow4m5jPc5edH4H73I4Wsi/view?usp=sharing" target="_blank" rel="noopener">CV</a></div></div>`;
    const card = (p, i) => `<button class="person reveal" data-i="${i}"><div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"></div><div class="tx"><span class="role">${esc(p.role)}</span><h3>${esc(p.name)}</h3><span class="more">Read bio</span></div></button>`;
    $('#team').innerHTML = rest.map((p, i) => (p.alumni ? '' : card(p, i))).join('');
    $('#alumni').innerHTML = rest.map((p, i) => (p.alumni ? card(p, i) : '')).join('');
    const dlg = $('#bio');
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.person');
      if (b) {
        const p = rest[+b.dataset.i];
        dlg.innerHTML = `<div class="modal"><button class="icon-btn x" aria-label="Close">✕</button><img src="${p.img}" alt=""><div><span class="eyebrow">${esc(p.role)}${p.alumni ? ' · Alum' : ''}</span><h2 style="font-size:1.9rem">${esc(p.name)}</h2>
          <p class="bio" style="margin-top:14px">${p.bio}</p>${p.now ? `<p class="bio"><strong>Where they are now.</strong> ${p.now}</p>` : ''}
          ${p.link ? `<a class="btn line small" href="${esc(p.link)}" target="_blank" rel="noopener">Visit their page</a>` : ''}</div></div>`;
        dlg.showModal();
      } else if (e.target === dlg || e.target.closest('.x')) dlg.close();
    });
    reveal();
  }

  /* ---------- news ---------- */
  async function news() {
    const all = await load('news');
    const st = { cat: '', q: '' };
    $('#cats').innerHTML = Object.entries(CATS).map(([k, n]) => `<button class="chip" data-c="${k}" data-cat="${k}" aria-pressed="false">${n} <span class="ct">${all.filter((x) => x.cat === k).length}</span></button>`).join('');
    const render = () => {
      const q = st.q.trim().toLowerCase();
      const out = all.filter((x) => (!st.cat || x.cat === st.cat) && (!q || x.html.replace(/<[^>]+>/g, '').toLowerCase().includes(q)));
      $$('[data-cat]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.cat === st.cat));
      let html = '', y = null, m = null, open = false;
      for (const x of out) {
        if (x.year !== y) { if (open) html += '</div></section>'; open = false; y = x.year; m = null; html += `<div class="tl-year">${y}</div>`; }
        if (x.month !== m) {
          if (open) html += '</div></section>';
          m = x.month; open = true;
          const n = out.filter((o) => o.year === y && o.month === m).length;
          html += `<section class="tl-month reveal"><h3>${m}<small>${n} ${n === 1 ? 'update' : 'updates'}</small></h3><div class="tl-items">`;
        }
        html += `<article class="tl-item" data-c="${x.cat}"><span class="tag" data-c="${x.cat}">${CATS[x.cat].replace(/s$/, '').replace('Awards & Grant', 'Award / Grant')}</span><p>${x.html}</p></article>`;
      }
      if (open) html += '</div></section>';
      $('#timeline').innerHTML = html || '<p class="empty">No results.</p>';
      $('#count').innerHTML = `<span><b>${out.length}</b> ${out.length === 1 ? 'update' : 'updates'}</span>${st.cat || st.q ? '<button class="linkish" id="clear">Clear filters</button>' : ''}`;
      reveal();
    };
    $('#q').oninput = (e) => { st.q = e.target.value; render(); };
    document.addEventListener('click', (e) => {
      const c = e.target.closest('[data-cat]'); if (c) { st.cat = st.cat === c.dataset.cat ? '' : c.dataset.cat; render(); }
      if (e.target.id === 'clear') { st.cat = ''; st.q = ''; $('#q').value = ''; render(); }
    });
    render();
  }

  /* ---------- lab life ---------- */
  const prettyDate = (d) => {
    let m = d.match(/^(\d+)-(\d+)-(\d{4})$/);
    if (m) return `${MONTHS[m[1] - 1]} ${+m[2]}, ${m[3]}`;
    m = d.match(/^(\d+)\/(\d+)-(\d+)\/(\d+)-(\d{4})$/);
    if (m) return m[1] === m[3] ? `${MONTHS[m[1] - 1]} ${+m[2]} to ${+m[4]}, ${m[5]}` : `${MONTHS[m[1] - 1]} ${+m[2]} to ${MONTHS[m[3] - 1]} ${+m[4]}, ${m[5]}`;
    return d;
  };
  async function life() {
    const acts = await load('activities');
    const flat = [];
    $('#events').innerHTML = acts.map((a) => `<article class="event reveal"><div class="ev-tx"><time>${prettyDate(a.date)}</time><p>${esc(a.text)}</p></div>
      <div class="shots n${a.imgs.length}">${a.imgs.map((src) => { flat.push({ src, cap: `${prettyDate(a.date)}. ${a.text}` }); return `<button data-i="${flat.length - 1}" aria-label="Enlarge photo"><img src="${src}" alt="${esc(a.text)}" loading="lazy"></button>`; }).join('')}</div></article>`).join('');
    const dlg = $('#lightbox'); let i = 0;
    const show = (k) => { i = (k + flat.length) % flat.length; $('img', dlg).src = flat[i].src; $('figcaption', dlg).textContent = flat[i].cap; };
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.shots button'); if (b) { show(+b.dataset.i); dlg.showModal(); return; }
      if (e.target.closest('.prev')) show(i - 1);
      else if (e.target.closest('.next')) show(i + 1);
      else if (e.target.closest('.x') || e.target.classList.contains('lb')) dlg.close();
    });
    addEventListener('keydown', (e) => { if (!dlg.open) return; if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
    reveal();
  }

  /* ---------- partners ---------- */
  async function partners() {
    const groups = await load('partners');
    const mono = (n) => n.replace(/\b(the|for|of|and|at)\b/gi, '').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
    $('#partners').innerHTML = groups.map((g) => `<h2 style="margin-top:56px">${esc(g.group)}</h2><div class="partners">${g.items.map((p) => {
      const inner = `<span class="mono" aria-hidden="true">${mono(p.name)}</span><h3>${esc(p.name)}</h3>${p.url ? '<span class="more">Visit website</span>' : ''}`;
      return p.url ? `<a class="partner reveal" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="partner reveal">${inner}</div>`;
    }).join('')}</div>`).join('');
    reveal();
  }

  ({ home, research, people, news, life, partners })[page]?.();
  reveal();
})();
