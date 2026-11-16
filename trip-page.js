// Each trip has a stable HTML URL; Chinese is the default language.
const tripId = document.body.dataset.tripId;
const isEnglish = document.body.dataset.language === 'en';
const englishPage = document.body.dataset.englishPage;
const base = isEnglish ? '../../' : '../';
const sourceTrip = (Array.isArray(window.FAMILY_TRIPS) ? window.FAMILY_TRIPS : []).find(t => t.id === tripId);
const translation = (Array.isArray(window.FAMILY_TRIPS_EN) ? window.FAMILY_TRIPS_EN : []).find(t => t.id === tripId);
const trip = sourceTrip && (!isEnglish || translation) ? { ...sourceTrip, ...(isEnglish ? translation : {}) } : null;
if (trip) {
  if (isEnglish && sourceTrip.routeMap) {
    trip.routeMap = {
      ...sourceTrip.routeMap,
      label: translation.routeLabels.label,
      stops: sourceTrip.routeMap.stops.map(stop => ({ ...stop, name: translation.routeLabels.stops[stop.id] }))
    };
  }
  const cover = coverFor(trip);
  cover.background = cover.background.replaceAll('assets/', base + 'assets/');
  const page = new DOMParser().parseFromString(standaloneTripHtml(trip, cover), 'text/html');
  document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
  document.title = trip.name + (isEnglish ? ' · Family Trips' : ' · 家庭旅行');
  document.head.append(...page.head.querySelectorAll('style'));
  document.body.replaceChildren(...page.body.childNodes);
  document.querySelector('.printbar > a').href = base + 'index.html';
  if (isEnglish || englishPage) {
    const nav = document.createElement('nav');
    nav.className = 'language-switch';
    nav.setAttribute('aria-label', isEnglish ? 'Language' : '语言');
    for (const [lang, label, href] of [
      ['zh-CN', isEnglish ? 'Chinese' : '中文', isEnglish ? '../' + tripId + '.html' : tripId + '.html'],
      ['en', 'English', isEnglish ? tripId + '.html' : englishPage]
    ]) {
      const link = document.createElement('a');
      link.textContent = label;
      link.href = href;
      link.hreflang = lang;
      link.lang = lang;
      if (lang === document.documentElement.lang) link.setAttribute('aria-current', 'page');
      nav.append(link);
    }
    document.querySelector('.printbar').insertBefore(nav, document.querySelector('.printbar button'));
  }
} else {
  document.querySelector('main').textContent = isEnglish
    ? 'This English itinerary is not available. Please return to the Chinese trip page.'
    : '暂时没有找到这个行程，请返回旅行首页。';
}
