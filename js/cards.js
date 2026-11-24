// ساخت کارت پادکست؛ مشترک بین صفحه‌ی پادکست‌ها و علاقه‌مندی‌ها (نیازمند data.js و auth.js)
const Cards = (function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // یکسان‌سازی حروف عربی/فارسی و حذف نیم‌فاصله برای جست‌وجوی راحت‌تر
  const norm = (s) => String(s).replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || "";
  const coverSrc = (p) => (p.cover && !/^https?:/.test(p.cover) ? Jasoor.ROOT + p.cover : p.cover);

  function html(p) {
    const cover = p.cover
      ? `<img class="podcast-card__cover" src="${esc(coverSrc(p))}" alt="کاور پادکست ${esc(p.title)}" loading="lazy" width="300" height="300">`
      : `<div class="podcast-card__cover podcast-card__cover--empty" role="img" aria-label="کاور پادکست ${esc(p.title)}"></div>`;
    const note = p.note ? `<p class="podcast-card__note">${esc(p.note)}</p>` : "";
    return `<article class="podcast-card" data-castbox-id="${esc(p.id)}">${cover}
      <div class="podcast-card__body">
        <h3 class="podcast-card__title">${esc(p.title)}</h3>
        <p class="podcast-card__desc">${esc(p.desc)}</p>
        <p class="podcast-card__meta"><span class="tag">${esc(catName(p.category))}</span></p>${note}
        <div class="podcast-card__actions">
          <a class="btn btn--small" href="https://castbox.fm/app/castbox/player/id${esc(p.id)}" target="_blank" rel="noopener">شنیدن در کست‌باکس</a>
          ${Jasoor.favButtonHTML(p.id, p.title)}
        </div>
      </div></article>`;
  }

  return { esc, norm, catName, html };
})();
