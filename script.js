const ORDER = ['cover','intro','toc-front','directors-note','voices',
    'ch-mississippi','ch-education','ch-healthcare','ch-immigrants','ch-faiths',
    'ch-blues','ch-civilrights','ch-media','ch-commemoration','closing'];

  const LABELS = {
    'cover':'Cover','intro':'Introduction','toc-front':'Contents','directors-note':"Director's Note",
    'voices':'Voices','ch-mississippi':'I · Mississippi','ch-education':'II · Education',
    'ch-healthcare':'III · Healthcare','ch-immigrants':'IV · Immigrants','ch-faiths':'V · Other Faiths',
    'ch-blues':'VI · Delta Blues','ch-civilrights':'VII · Civil Rights','ch-media':'VIII · Media Coverage',
    'ch-commemoration':'IX · Commemoration','closing':'Closing'
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

  function showTab(id){
    if(!ORDER.includes(id)) id = 'cover';
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === id));
    document.querySelectorAll('#spine-list a').forEach(a => a.classList.toggle('active', a.dataset.tab === id));
    try{ history.replaceState(null, '', '#' + id); }catch(e){}
    try{
      window.scrollTo(0,0);
    }catch(e){
      try{ document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }catch(e2){}
    }
  }

  document.querySelectorAll('#spine-list a').forEach(a => {
    a.addEventListener('click', () => showTab(a.dataset.tab));
  });

  buildPagers();
  const startId = (location.hash || '').replace('#','');
  showTab(ORDER.includes(startId) ? startId : 'cover');
