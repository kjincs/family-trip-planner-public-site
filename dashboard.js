const trips = [...(Array.isArray(window.FAMILY_TRIPS) ? window.FAMILY_TRIPS : [])]
  .sort((a, b) => (a.startDate || '9999-12-31').localeCompare(b.startDate || '9999-12-31'));
const $ = id => document.getElementById(id);
    function render(){
      const q = $('search').value.trim().toLowerCase(), status = $('statusFilter').value, season = $('seasonFilter').value, holiday = $('holidayFilter').value;
      const shown = trips.filter(t => (!q || JSON.stringify(t).toLowerCase().includes(q)) && (!status || t.status === status) && (!season || t.season === season) && (!holiday || t.holiday === holiday));
      $('tripGrid').innerHTML = shown.map(t => { const cover = coverFor(t); return `<article class="trip">
        <a class="photo" href="trips/${encodeURIComponent(t.id)}.html" aria-label="查看${esc(t.name)}的具体行程" data-scene="${esc(cover.scene)}" style='background:${cover.background}'><span class="badge">${esc(t.status)}</span><span class="heart" aria-hidden="true">♥</span></a>
        <div class="trip-body"><div class="trip-title"><div><h3>${esc(t.name)}</h3><div class="place">⌖ ${esc(t.destination)}</div></div></div>
        <div class="meta"><span class="chip">◷ ${esc(t.duration || '天数待定')}</span><span class="chip">☀ ${esc(t.months || t.season)}</span><span class="chip">假期 ${esc(t.holiday || '时间未定')}</span><span class="chip">♟ ${esc(t.travelers || '同行人员待定')}</span></div>
        <div class="summary">${esc(t.summary || '家庭旅行路线与活动安排。')}</div>
        <div class="card-actions"><span class="updated">更新于 ${esc(t.updated || '今天')}</span><div class="card-buttons"><a class="btn small" href="trips/${encodeURIComponent(t.id)}.html">查看行程 →</a></div></div></div></article>`; }).join('');
      $('emptyState').style.display = shown.length ? 'none' : 'block';
      $('tripCount').textContent = trips.length;
      $('shortlistCount').textContent = trips.filter(t => ['重点考虑','计划中'].includes(t.status)).length;
      $('countryCount').textContent = new Set(trips.map(t => t.country || t.destination).filter(Boolean)).size;
    }

['search','statusFilter','seasonFilter','holidayFilter'].forEach(id => $(id).addEventListener(id === 'search' ? 'input' : 'change', render));
$('clearBtn').onclick = () => { ['search','statusFilter','seasonFilter','holidayFilter'].forEach(id => $(id).value = ''); render(); };
document.querySelector('.hero').style.backgroundImage = `linear-gradient(90deg,rgba(8,29,25,.82) 0%,rgba(8,29,25,.45) 44%,rgba(8,29,25,.08) 100%),url("${HERO_PHOTO}")`;
document.querySelector('.hero').style.backgroundPosition = 'center';
document.querySelector('.hero').style.backgroundSize = 'cover';
render();
