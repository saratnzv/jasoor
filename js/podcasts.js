// صفحه‌ی پادکست‌ها: فیلتر دسته‌بندی + جست‌وجو (از روی data.js)
// خواندن ?q= و ?category= از آدرس، و به‌روز نگه‌داشتن آدرس هنگام فیلتر.
(function () {
  const list = document.querySelector("#podcast-list");
  if (!list) return;

  const form = document.querySelector("#filter-form");
  const input = document.querySelector("#q");
  const filters = document.querySelector("#category-filters");
  const count = document.querySelector("#results-count");

  const params = new URLSearchParams(location.search);
  const state = {
    category: CATEGORIES.some((c) => c.slug === params.get("category")) ? params.get("category") : "",
    query: params.get("q") || ""
  };
  input.value = state.query;

  filters.innerHTML = [{ slug: "", name: "همه" }, ...CATEGORIES]
    .map((c) => `<li><button type="button" class="category-chip" data-slug="${c.slug}" aria-pressed="false">${c.name}</button></li>`)
    .join("");

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.category) p.set("category", state.category);
    if (state.query.trim()) p.set("q", state.query.trim());
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function render() {
    const q = Cards.norm(state.query);
    const result = PODCASTS.filter((p) =>
      (!state.category || p.category === state.category) &&
      (!q || Cards.norm(p.title).includes(q) || Cards.norm(p.desc).includes(q) || Cards.norm(Cards.catName(p.category)).includes(q)));

    filters.querySelectorAll(".category-chip").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.slug === state.category)));
    count.textContent = result.length ? `${result.length.toLocaleString("fa-IR")} پادکست پیدا شد` : "";
    list.innerHTML = result.length
      ? result.map(Cards.html).join("")
      : `<div class="empty-state"><strong>پادکستی پیدا نشد</strong><p>عبارت دیگری را امتحان کن یا فیلتر دسته‌بندی را بردار.</p></div>`;
    Jasoor.paintAll();
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
