// Chinese remains the default; English is an optional companion view.
const TRIP_EN_LABELS = {
  "在 Google Maps 打开路线": "Open route in Google Maps",
  "自驾路线图": "Road trip route",
  "家庭往返自驾路线": "Family road trip route",
  "实线为去程与城市间移动，虚线为返程；路线图为地理位置示意。": "Solid lines show the outward route; dashed lines show the return journey. This is a schematic map.",
  "封面": "cover",
  "返回全部旅行": "All trips (Chinese)",
  "打印 / 保存 PDF": "Print / Save PDF",
  "计划中": "Planned",
  "时间待定": "Dates to be confirmed",
  "时间未定": "Dates undecided",
  "交通待定": "Transport to be confirmed",
  "调整：": "Alternative:",
  "优点：": "Advantages:",
  "取舍：": "Trade-off:",
  "天数待定": "Duration to be confirmed",
  "行程概览": "Trip overview",
  "同行人员": "Travel buddies",
  "预算想法": "Budget notes",
  "往返交通": "Getting there and back",
  "当地交通": "Getting around",
  "航班计划": "Flight plans",
  "旅行概要": "Our adventure",
  "逐日行程": "Day by day",
  "尚未添加": "Not added yet",
  "主要地点与活动": "Places to explore",
  "特色体验与方案": "Hotels and special experiences",
  "补充笔记": "Helpful reminders",
  "参考资料": "Useful links",
  "行程更新于": "Last updated",
  "日期未记录": "Date not recorded",
  "景点开放时间、票价与交通请在出发前再次确认": "Check opening hours, ticket prices and travel conditions before departure."
};
function tripText(trip, text) { return trip.language === 'en' ? (TRIP_EN_LABELS[text] || text) : text; }
// Shared read-only itinerary layout, reused from the original site.
    function esc(v=''){ return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
    function coverFor(t){
      if (t.cover === 'galveston-new-year') return {
        scene: 'Galveston · New Year 2027',
        background: 'linear-gradient(rgba(12,35,45,.04),rgba(12,35,45,.25)),url("assets/galveston-cover.jpg") center / cover no-repeat'
      };

      if (t.cover === 'arizona-desert' || /phoenix|sedona|saguaro|petrified forest/i.test((t.name || '') + ' ' + (t.destination || ''))) return {
        scene: 'Arizona · Desert & Red Rocks',
        background: 'linear-gradient(rgba(20,38,34,.02),rgba(20,38,34,.3)),url("assets/arizona-christmas-cover.jpg") center / cover no-repeat'
      };
      if (t.cover === 'san-antonio') return {
        scene: 'River Walk · San Antonio',
        background: 'linear-gradient(rgba(12,35,31,.12),rgba(12,35,31,.38)),url("https://images.unsplash.com/photo-1692193483739-0e378f2eec45?auto=format&fit=crop&w=1600&q=82") center / cover no-repeat'
      };
      if (t.cover === 'texas-road-trip' || /fredericksburg|san antonio|hill country/i.test((t.name || '') + ' ' + (t.destination || ''))) return {
        scene: 'Texas Hill Country · Road Trip',
        background: 'radial-gradient(circle at 78% 22%,rgba(255,218,128,.95) 0 7%,transparent 7.5%),linear-gradient(155deg,transparent 0 58%,rgba(71,112,76,.88) 59% 70%,transparent 71%),linear-gradient(25deg,transparent 0 48%,rgba(181,111,72,.8) 49% 63%,transparent 64%),linear-gradient(180deg,#87b7c0 0%,#e7d3a3 58%,#b7774e 100%)'
      };
      if (t.cover === 'peru' || /peru|machu|cusco/i.test(`${t.name} ${t.destination}`)) return {
        scene: 'Machu Picchu · Peru',
        background: `linear-gradient(rgba(16,45,35,.05),rgba(16,45,35,.16)),url("${TRIP_PHOTO}") right center / 200% 100% no-repeat`
      };
      if (t.cover === 'alaska' || /alaska|fairbanks|anchorage/i.test(`${t.name} ${t.destination}`)) return {
        scene: 'Aurora · Alaska',
        background: `linear-gradient(rgba(4,18,29,.05),rgba(4,18,29,.16)),url("${TRIP_PHOTO}") left center / 200% 100% no-repeat`
      };
      if (t.cover === 'atlantic' || /atlanta.*maine.*quebec|east coast/i.test(`${t.name} ${t.destination}`)) return {
        scene: 'Tesla · Maine Coast · Atlantic Road',
        background: 'linear-gradient(rgba(13,35,44,.02),rgba(13,35,44,.28)),url("assets/tesla-east-coast-cover.jpg") center / cover no-repeat'
      };
      if (t.cover === 'panama' || /panama|boquete|gamboa/i.test(`${t.name} ${t.destination}`)) return {
        scene: 'Panama Canal · El Valle · Bijao',
        background: 'linear-gradient(rgba(8,29,25,.02),rgba(8,29,25,.28)),url("assets/panama-christmas-cover.jpg") center / cover no-repeat'
      };
      return { scene: 'Family Journey', background: 'radial-gradient(circle at 72% 22%,rgba(255,232,164,.85) 0 7%,transparent 8%),linear-gradient(145deg,transparent 0 55%,rgba(48,105,78,.85) 56% 70%,transparent 71%),linear-gradient(180deg,#77aeba,#cfd9b9 62%,#b58e61 100%)' };
    }
    function routeMap(t){
      const ui = text => tripText(t, text);
      const map = t.routeMap;
      if (!map || !Array.isArray(map.stops) || !map.stops.length || !Array.isArray(map.legs)) return '';
      const stops = map.stops.filter(s => Number.isFinite(Number(s.lon)) && Number.isFinite(Number(s.lat)));
      if (!stops.length) return '';
      const byId = Object.fromEntries(stops.map(s => [s.id, s]));
      const width = 620, height = 330, padX = 58, padY = 36;
      const lons = stops.map(s => Number(s.lon)), lats = stops.map(s => Number(s.lat));
      const minLon = Math.min(...lons) - .45, maxLon = Math.max(...lons) + .45;
      const minLat = Math.min(...lats) - .5, maxLat = Math.max(...lats) + .5;
      const point = s => ({
        x: padX + (Number(s.lon) - minLon) / (maxLon - minLon) * (width - padX * 2),
        y: padY + (maxLat - Number(s.lat)) / (maxLat - minLat) * (height - padY * 2)
      });
      const lines = map.legs.map(leg => {
        const a = byId[leg.from], b = byId[leg.to];
        if (!a || !b) return '';
        const p1 = point(a), p2 = point(b);
        const klass = 'route-line' + (leg.returning ? ' route-return' : '') + (leg.side ? ' route-side' : '');
        return '<line class="' + klass + '" x1="' + p1.x.toFixed(1) + '" y1="' + p1.y.toFixed(1) + '" x2="' + p2.x.toFixed(1) + '" y2="' + p2.y.toFixed(1) + '"></line>';
      }).join('');
      const dots = stops.map(s => {
        const p = point(s), dx = Number(s.dx) || 10, dy = Number(s.dy) || -10;
        return '<g><circle class="route-dot' + (s.side ? ' side' : '') + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="12"></circle><text class="route-number" x="' + p.x.toFixed(1) + '" y="' + p.y.toFixed(1) + '">' + esc(s.number || '') + '</text><text class="route-name" x="' + (p.x + dx).toFixed(1) + '" y="' + (p.y + dy).toFixed(1) + '" text-anchor="' + (s.anchor === 'end' ? 'end' : 'start') + '">' + esc(s.name) + '</text></g>';
      }).join('');
      const regions = (Array.isArray(map.regions) ? map.regions : []).map(r => '<text class="route-region" x="' + (Number(r.x) || 0) + '" y="' + (Number(r.y) || 0) + '">' + esc(r.name || '') + '</text>').join('');
      const link = map.directionsUrl ? '<a class="btn small" target="_blank" rel="noopener" href="' + esc(map.directionsUrl) + '">' + ui('在 Google Maps 打开路线') + '</a>' : '';
      return '<div class="detail-item full"><strong>' + ui('自驾路线图') + '</strong><div class="route-map"><svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + esc(map.label || ui('家庭往返自驾路线')) + '">' + regions + lines + dots + '</svg><div class="route-map-note"><span>' + ui('实线为去程与城市间移动，虚线为返程；路线图为地理位置示意。') + '</span>' + link + '</div></div></div>';
    }
    function standaloneGuide(guide, trip = {}){
      const ui = text => tripText(trip, text);
      if (!guide || !Array.isArray(guide.sections)) return '';
      const sections = guide.sections.map(section => {
        let body = '';
        if (section.days) body = section.days.map(day => `<article class="share-day"><h3>${esc(day.date)} · ${esc(day.title)}</h3><p class="muted">${esc(day.preview || '')}</p><div class="tags"><span>${esc(day.duration || ui('时间待定'))}</span><span>${esc(day.transport || ui('交通待定'))}</span>${(day.tags || []).map(tag => `<span>${esc(tag)}</span>`).join('')}</div><ul>${(day.activities || []).map(activity => `<li>${esc(activity)}</li>`).join('')}</ul>${day.backup ? `<p class="note"><b>${ui('调整：')}</b>${esc(day.backup)}</p>` : ''}</article>`).join('');
        if (section.options) body = `<div class="two-col">${section.options.map(option => `<article class="share-card"><h3>${esc(option.title)}</h3><p>${esc(option.text)}</p><p><b>${ui('优点：')}</b>${esc(option.pros)}</p><p><b>${ui('取舍：')}</b>${esc(option.tradeoff)}</p></article>`).join('')}</div>`;
        if (section.groups) body = section.groups.map(group => `<article class="share-card"><h3>${esc(group.title)}</h3><ul>${(group.items || []).map(value => `<li>${esc(value)}</li>`).join('')}</ul></article>`).join('');
        return `<section><h2>${esc(section.title || section.label)}</h2>${section.kicker ? `<p class="muted">${esc(section.kicker)}</p>` : ''}${body}</section>`;
      }).join('');
      return `${guide.intro ? `<p class="intro">${esc(guide.intro)}</p>` : ''}${sections}`;
    }
    function standaloneTripHtml(t, cover){
      const ui = text => tripText(t, text);
      const value = (label, text, full='') => text ? `<div class="fact ${full}"><b>${esc(label)}</b><div>${esc(text)}</div></div>` : '';
      const days = (t.itinerary || '').split('\n').filter(Boolean).map(line => { const [day,...rest] = line.split('|'); return `<article class="day"><b>${esc(day)}</b><span>${esc(rest.join('|'))}</span></article>`; }).join('');
      const refs = (t.sources || '').split('\n').filter(Boolean).map(line => { const match=line.match(/https?:\/\/\S+/); return match ? `<div>${esc(line.slice(0,match.index))}<a href="${esc(match[0])}" target="_blank" rel="noopener">${esc(match[0])}</a></div>` : `<div>${esc(line)}</div>`; }).join('');
      const rawMap = routeMap(t);
      const map = rawMap ? rawMap.replace(/^<div class="detail-item full"><strong>[^<]*<\/strong>/, '<section><h2>' + ui('自驾路线图') + '</h2>').replace(/<\/div>$/, '</section>') : '';
      const coverImageMatch = cover.background.match(/url\(["']?((?:data:image|https?)[^"')]+)["']?\)/i);
      const coverMarkup = coverImageMatch
        ? `<div class="cover" data-scene="${esc(cover.scene)}"><img src="${esc(coverImageMatch[1])}" alt="${esc(t.destination || t.name)} ${ui('封面')}"></div>`
        : `<div class="cover" data-scene="${esc(cover.scene)}" style="background:${esc(cover.background)}"></div>`;
      return `<!doctype html>
<html lang="${t.language === 'en' ? 'en' : 'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t.name)}</title>
<style>
:root{--ink:#24342f;--muted:#697873;--paper:#f6f3eb;--card:#fffdf8;--green:#1f6653;--coral:#e9785f;--line:#e5e0d5}*{box-sizing:border-box}body{margin:0;color:var(--ink);background:var(--paper);font:15px/1.55 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}.page{max-width:900px;margin:auto;padding:28px 22px 64px}.cover{height:330px;border-radius:24px;position:relative;overflow:hidden;background:#315d50;box-shadow:0 14px 42px rgba(37,54,48,.14)}.cover img{display:block;width:100%;height:100%;object-fit:cover}.cover:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(16,35,30,.04),rgba(16,35,30,.48))}.cover:after{content:attr(data-scene);position:absolute;z-index:2;right:20px;bottom:16px;color:#fff;font:700 12px Georgia,serif;letter-spacing:.14em;text-shadow:0 2px 8px #000}.title{padding:25px 4px 12px}.title h1{margin:0;font:40px/1.08 Georgia,serif}.place,.muted{color:var(--muted)}.chips,.tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.chips span,.tags span{padding:6px 9px;border-radius:9px;background:#e8f0eb;color:#174b3f;font-size:12px;font-weight:700}.panel,section{margin-top:18px;padding:21px;border:1px solid var(--line);border-radius:18px;background:var(--card)}h2{margin:0 0 12px;font:27px Georgia,serif}h3{margin:0 0 6px}.facts,.two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px}.fact.full{grid-column:1/-1}.fact b{display:block;margin-bottom:4px;color:var(--green);font-size:12px;text-transform:uppercase;letter-spacing:.06em}.fact div,.sources{white-space:pre-wrap}.itinerary{display:grid;gap:9px}.day{display:grid;grid-template-columns:105px 1fr;gap:12px;padding:12px;border-radius:12px;background:#f3f0e8}.day b{color:var(--green)}.intro,.note{padding:12px 14px;border-radius:10px;background:#fff0e9}.share-day,.share-card{margin-top:10px;padding:15px;border-radius:13px;background:#f3f0e8}.share-day ul,.share-card ul{margin-bottom:0}.route-map{margin-top:8px;padding:14px;border-radius:16px;background:#edf3ef;overflow:hidden}.route-map svg{display:block;width:100%;height:auto;min-height:260px}.route-line{fill:none;stroke:var(--green);stroke-width:4;stroke-linecap:round}.route-return{stroke-dasharray:9 7;opacity:.8}.route-side{stroke:var(--coral);stroke-width:3}.route-dot{fill:var(--card);stroke:var(--green);stroke-width:3}.route-dot.side{stroke:var(--coral)}.route-number{fill:#174b3f;font-size:12px;font-weight:800;text-anchor:middle;dominant-baseline:central}.route-name{fill:var(--ink);font-size:13px;font-weight:800;paint-order:stroke;stroke:#edf3ef;stroke-width:5px;stroke-linejoin:round}.route-region{fill:var(--muted);font:italic 18px Georgia,serif;opacity:.55}.route-map-note{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:10px;color:var(--muted);font-size:12px}a{color:var(--green);font-weight:700;overflow-wrap:anywhere}.btn{display:inline-block;border:1px solid var(--green);border-radius:10px;padding:9px 12px;background:var(--green);color:#fff;text-decoration:none;font-weight:700}.language-switch{display:flex;gap:12px;align-items:center}.language-switch [aria-current]{color:var(--ink);text-decoration:none}.printbar{flex-wrap:wrap;display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:15px;color:var(--muted);font-size:12px}.footer{margin-top:24px;text-align:center;color:var(--muted);font-size:12px}@media(max-width:650px){.page{padding:14px 12px 42px}.cover{height:245px}.title h1{font-size:31px}.facts,.two-col{grid-template-columns:1fr}.fact.full{grid-column:auto}.day{grid-template-columns:1fr}.panel,section{padding:16px}}@media print{@page{size:letter;margin:.35in}body{background:#fff;font-size:17px;line-height:1.5}.page{max-width:none;padding:0}.printbar{display:none}.cover{height:200px;box-shadow:none}.title{padding:14px 4px 4px}.title h1{font-size:36px}h2{font-size:28px;break-after:avoid}.panel,section{margin-top:20px;padding:0;border:0;border-radius:0;background:#fff;break-inside:auto;box-shadow:none}.route-map,.day,.share-day,.share-card{break-inside:avoid}.day{grid-template-columns:115px 1fr;gap:13px;padding:13px}.chips span,.tags span,.fact b,.route-map-note,.footer{font-size:13px}.route-map{padding:12px}.route-map svg{min-height:210px;max-height:260px}a{color:var(--ink);text-decoration:none}}
</style></head><body><main class="page"><div class="printbar"><a href="../index.html">← ${ui('返回全部旅行')}</a><button class="btn" onclick="window.print()">${ui('打印 / 保存 PDF')}</button></div>${coverMarkup}<header class="title"><h1>${esc(t.name)}</h1><p class="place">⌖ ${esc(t.destination)}</p><div class="chips"><span>${esc(t.status || ui('计划中'))}</span><span>${esc(t.months || t.season || ui('时间待定'))}</span><span>${esc(t.duration || ui('天数待定'))}</span><span>${esc(t.holiday || ui('时间未定'))}</span></div></header><section><h2>${ui('行程概览')}</h2><div class="facts">${value(ui('同行人员'),t.travelers)}${value(ui('预算想法'),t.budget)}${value(ui('往返交通'),t.gettingThere,'full')}${value(ui('当地交通'),t.transport,'full')}${value(ui('航班计划'),t.flights,'full')}${value(ui('旅行概要'),t.summary,'full')}</div></section>${map}<section><h2>${ui('逐日行程')}</h2><div class="itinerary">${days || ui('尚未添加')}</div></section><section><h2>${ui('主要地点与活动')}</h2><div class="sources">${esc(t.places || ui('尚未添加'))}</div></section>${t.aurora ? `<section><h2>${ui('特色体验与方案')}</h2><div class="sources">${esc(t.aurora)}</div></section>` : ''}${standaloneGuide(t.detailGuide, t)}${t.notes ? `<section><h2>${ui('补充笔记')}</h2><div class="sources">${esc(t.notes)}</div></section>` : ''}<section><h2>${ui('参考资料')}</h2><div class="sources">${refs || ui('尚未添加')}</div></section><p class="footer">${ui('行程更新于')} ${esc(t.updated || ui('日期未记录'))} · ${ui('景点开放时间、票价与交通请在出发前再次确认')}</p></main></body></html>`;
    }
