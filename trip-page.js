// Each trip has a stable HTML URL; content comes from the published data file.
const tripId = document.body.dataset.tripId;
const trip = (Array.isArray(window.FAMILY_TRIPS) ? window.FAMILY_TRIPS : []).find(t => t.id === tripId);
if (trip) {
  const cover = coverFor(trip);
  // Assets resolve from the trip subfolder; embedded photos remain self-contained.
  cover.background = cover.background.replaceAll('assets/', '../assets/');
  const page = new DOMParser().parseFromString(standaloneTripHtml(trip, cover), 'text/html');
  document.title = trip.name + ' · 家庭旅行';
  document.head.append(...page.head.querySelectorAll('style'));
  document.body.replaceChildren(...page.body.childNodes);
} else {
  document.querySelector('main').textContent = '暂时没有找到这个行程，请返回旅行首页。';
}
