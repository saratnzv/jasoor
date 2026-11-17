// صفحه‌ی پادکست‌ها: فیلتر دسته‌بندی + جست‌وجو (از روی data.js)
// خواندن ?q= و ?category= از آدرس، و به‌روز نگه‌داشتن آدرس هنگام فیلتر.
(function () {
  const list = document.querySelector("#podcast-list");
  if (!list) return;

  const form = document.querySelector("#filter-form");
  const input = document.querySelector("#q");
  const filters = document.querySelector("#category-filters");
  const count = document.querySelector("#results-count");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // یکسان‌سازی حروف عربی/فارسی و حذف نیم‌فاصله برای جست‌وجوی راحت‌تر
  const norm = (s) => String(s).replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || "";
  const coverSrc = (p) => (p.cover && !/^https?:/.test(p.cover) ? "../" + p.cover : p.cover);

  const params = new URLSearchParams(location.search);
  const state = {
    category: CATEGORIES.some((c) => c.slug === params.get("category")) ? params.get("category") : "",
    query: params.get("q") || ""
  };
  input.value = state.query;

  filters.innerHTML = [{ slug: "", name: "همه" }, ...CATEGORIES]
    .map((c) => `<li><button type="button" class="category-chip" data-slug="${c.slug}" aria-pressed="false">${c.name}</button></li>`)
    .join("");

  function card(p) {
    const cover = p.cover
      ? `<img class="podcast-card__cover" src="${esc(coverSrc(p))}" alt="کاور پادکست ${esc(p.title)}" loading="lazy" width="300" height="300">`
      : `<div class="podcast-card__cover podcast-card__cover--empty" role="img" aria-label="کاور پادکست ${esc(p.title)}"></div>`;
    const note = p.note ? `<p class="podcast-card__note">${esc(p.note)}</p>` : "";
    return `<article class="podcast-card">${cover}
      <div class="podcast-card__body">
        <h3 class="podcast-card__title">${esc(p.title)}</h3>
        <p class="podcast-card__desc">${esc(p.desc)}</p>
        <p class="podcast-card__meta"><span class="tag">${esc(catName(p.category))}</span></p>${note}
        <a class="btn btn--small" href="https://castbox.fm/app/castbox/player/id${esc(p.id)}" target="_blank" rel="noopener">شنیدن در کست‌باکس</a>
      </div></article>`;
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.category) p.set("category", state.category);
    if (state.query.trim()) p.set("q", state.query.trim());
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function render() {
    const q = norm(state.query);
    const result = PODCASTS.filter((p) =>
      (!state.category || p.category === state.category) &&
      (!q || norm(p.title).includes(q) || norm(p.desc).includes(q) || norm(catName(p.category)).includes(q)));

    filters.querySelectorAll(".category-chip").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.slug === state.category)));
    count.textContent = result.length ? `${result.length.toLocaleString("fa-IR")} پادکست پیدا شد` : "";
    list.innerHTML = result.length
      ? result.map(card).join("")
      : `<div class="empty-state"><strong>پادکستی پیدا نشد</strong><p>عبارت دیگری را امتحان کن یا فیلتر دسته‌بندی را بردار.</p></div>`;
    syncUrl();
  }

  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".category-chip");
    if (!b) return;
    state.category = b.dataset.slug;
    render();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    state.query = input.value;
    render();
  });
  render();
})();
