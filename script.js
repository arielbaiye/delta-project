const ORDER = ['cover','intro','toc-front','directors-note','voices',
    'ch-mississippi','ch-education','ch-healthcare','ch-immigrants','ch-faiths',
    'ch-blues','ch-emmetttill','ch-civilrights','ch-media','ch-commemoration','closing'];

  const LABELS = {
    'cover':'Cover','intro':'Introduction','toc-front':'Contents','directors-note':"Director's Note",
    'voices':'Voices','ch-mississippi':'I · Mississippi','ch-education':'II · Education',
    'ch-healthcare':'III · Healthcare','ch-immigrants':'IV · Immigrants','ch-faiths':'V · Other Faiths',
    'ch-blues':'VI · Delta Blues','ch-emmetttill':'VII · Emmett Till','ch-civilrights':'VIII · Civil Rights',
    'ch-media':'IX · Media Coverage','ch-commemoration':'X · Commemoration','closing':'Closing'
  };

  function buildPagers(){
    ORDER.forEach((id, i) => {
      const panel = document.getElementById(id);
      const pager = panel.querySelector('.tab-pager');
      if(!pager) return;
      const prev = i > 0 ? ORDER[i-1] : null;
      const next = i < ORDER.length-1 ? ORDER[i+1] : null;
      pager.innerHTML = `
        ${prev ? `<a class="p-prev" onclick="showTab('${prev}')"><span>&larr;</span><span><small>Previous</small>${LABELS[prev]}</span></a>` : '<span></span>'}
        ${next ? `<a class="p-next" onclick="showTab('${next}')"><span><small>Next</small>${LABELS[next]}</span><span>&rarr;</span></a>` : '<span></span>'}
      `;
    });
  }

  // routes that exist outside the main chapter flow (e.g. linked only from the utility bar)
  const EXTRA_ROUTES = ['forum', 'speaker-info'];

  function showTab(id){
    if(!ORDER.includes(id) && !EXTRA_ROUTES.includes(id)) id = 'cover';
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === id));
    document.querySelectorAll('#spine-list a').forEach(a => a.classList.toggle('active', a.dataset.tab === id && !a.dataset.target));
    document.querySelectorAll('#spine-list > li').forEach(li => {
      const topLink = li.querySelector(':scope > a');
      li.classList.toggle('expanded', !!topLink && topLink.dataset.tab === id);
    });
    closeDropdowns();
    try{ history.replaceState(null, '', '#' + id); }catch(e){}
    try{
      window.scrollTo(0,0);
    }catch(e){
      try{ document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }catch(e2){}
    }
  }

  function jumpToSub(tabId, targetId){
    showTab(tabId);
    document.querySelectorAll('.spine-sub a').forEach(a => a.classList.toggle('sub-active', a.dataset.target === targetId));
    const el = document.getElementById(targetId);
    if(el){
      // let the tab-panel finish becoming visible before measuring scroll position
      requestAnimationFrame(() => requestAnimationFrame(() => {
        try{ el.scrollIntoView({behavior:'smooth', block:'start'}); }
        catch(e){ try{ el.scrollIntoView(); }catch(e2){} }
      }));
    }
  }

  document.querySelectorAll('#spine-list a').forEach(a => {
    a.addEventListener('click', () => {
      if(a.dataset.target){ jumpToSub(a.dataset.tab, a.dataset.target); }
      else{ showTab(a.dataset.tab); }
    });
  });

  // ---------- sidebar hamburger toggle ----------
  function toggleSpine(){
    const spine = document.getElementById('spine');
    const btn = document.getElementById('spine-toggle');
    const isWide = spine.classList.toggle('wide');
    document.documentElement.style.setProperty('--spine-w', isWide ? '320px' : '230px');
    btn.setAttribute('aria-expanded', isWide ? 'true' : 'false');
    btn.setAttribute('aria-label', isWide ? 'Collapse sidebar' : 'Expand sidebar');
  }

  // ---------- utility bar: Editor Sheet dropdown ----------
  function toggleDropdown(evt){
    evt.stopPropagation();
    const menu = document.getElementById('editor-dropdown');
    menu.classList.toggle('open');
  }
  function closeDropdowns(){
    document.querySelectorAll('.ub-dropdown-menu').forEach(m => m.classList.remove('open'));
  }
  document.addEventListener('click', closeDropdowns);

  buildPagers();
  const startId = (location.hash || '').replace('#','');
  showTab((ORDER.includes(startId) || EXTRA_ROUTES.includes(startId)) ? startId : 'cover');

  // ---------- cover carousel ----------
  (function initCoverCarousel(){
    const carousel = document.getElementById('cover-carousel');
    const dotsWrap = document.getElementById('cover-dots');
    if(!carousel || !dotsWrap) return;
    const slides = Array.from(carousel.querySelectorAll('.cover-slide'));
    if(slides.length < 2) return; // nothing to rotate

    let current = slides.findIndex(s => s.classList.contains('active'));
    if(current < 0) current = 0;
    let timer = null;
    const INTERVAL = 5500;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'cover-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Show cover photo ' + (i+1));
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });

    function goTo(i){
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }
    function next(){ goTo((current + 1) % slides.length); }
    function start(){ timer = setInterval(next, INTERVAL); }
    function stop(){ if(timer) clearInterval(timer); }
    function restart(){ stop(); start(); }

    start();
    const coverSection = document.getElementById('cover');
    coverSection.addEventListener('mouseenter', stop);
    coverSection.addEventListener('mouseleave', start);
  })();

  // ---------- intro cinematic scroll (parallax photo + line-by-line poem reveal) ----------
  (function initIntroCinematic(){
    const track = document.getElementById('intro-scroll-track');
    const sticky = document.getElementById('intro-sticky');
    const photo = document.getElementById('intro-photo');
    const card = document.getElementById('intro-poem-card');
    if(!track || !sticky || !photo || !card) return;
    const lines = Array.from(card.querySelectorAll('.poem-line'));

    let reduceMotion = false;
    try{ reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}

    if(reduceMotion){
      // Static fallback: show everything immediately, no scroll-linked effects.
      card.classList.add('revealed');
      lines.forEach(l => l.classList.add('revealed'));
      return;
    }

    // Give the track enough scroll distance to drive the reveal: one viewport for the
    // photo itself, plus a slice per poem line so each one gets room to trigger.
    function setTrackHeight(){
      const perLineVh = 12;
      const baseVh = 100;
      track.style.height = (baseVh + lines.length * perLineVh) + 'vh';
    }
    setTrackHeight();

    function update(){
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      let progress = total > 0 ? (-rect.top) / total : 0;
      if(progress < 0) progress = 0;
      if(progress > 1) progress = 1;

      // subtle parallax drift on the photo — deliberately small, not a big slide effect
      try{ photo.style.transform = 'translateY(' + (progress * 34 - 14) + 'px)'; }catch(e){}

      card.classList.toggle('revealed', progress > 0.03);

      const lineStart = 0.08, lineEnd = 0.94;
      const span = lineEnd - lineStart;
      lines.forEach((line, i) => {
        const threshold = lineStart + span * (i / Math.max(1, lines.length - 1));
        line.classList.toggle('revealed', progress >= threshold);
      });
    }

    let ticking = false;
    function onScroll(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){ update(); ticking = false; });
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', function(){ setTrackHeight(); update(); });
    update();
  })();

  /* ---------- DIASPORA SLIDESHOW (Dr. John Strait lecture slides) ---------- */
  (function initDiasporaGallery(){
    const gallery = document.getElementById('dg-strait');
    if(!gallery) return;
    const slides = Array.from(gallery.querySelectorAll('.dg-slide'));
    const thumbs = Array.from(gallery.querySelectorAll('.dg-thumbs img'));
    const countEl = gallery.querySelector('.dg-count');
    const prevBtn = gallery.querySelector('.dg-prev');
    const nextBtn = gallery.querySelector('.dg-next');
    if(!slides.length) return;

    let current = slides.findIndex(s => s.classList.contains('active'));
    if(current < 0) current = 0;

    function show(i){
      slides[current].classList.remove('active');
      if(thumbs[current]) thumbs[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      if(thumbs[current]){
        thumbs[current].classList.add('active');
        thumbs[current].scrollIntoView({inline:'center', block:'nearest', behavior:'smooth'});
      }
      if(countEl) countEl.textContent = (current + 1) + ' / ' + slides.length;
    }

    prevBtn && prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => show(current + 1));
    thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));

    gallery.querySelector('.dg-viewer').addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft') show(current - 1);
      if(e.key === 'ArrowRight') show(current + 1);
    });

    // simple swipe support
    let touchX = null;
    const viewer = gallery.querySelector('.dg-viewer');
    viewer.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, {passive:true});
    viewer.addEventListener('touchend', e => {
      if(touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if(Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    }, {passive:true});

    show(current);
  })();
