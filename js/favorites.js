// صفحه‌ی علاقه‌مندی‌های من
(function () {
  const gate = document.querySelector("#login-required");
  const content = document.querySelector("#favorites-content");
  const list = document.querySelector("#favorites-list");
  const count = document.querySelector("#results-count");
  if (!list) return;

  if (!Jasoor.getUser()) {
    gate.hidden = false;
    content.hidden = true;
    gate.querySelector("a").href = Jasoor.loginUrl();
    return;
  }

  function render() {
    const ids = Jasoor.favorites.list();
    const items = PODCASTS.filter((p) => ids.includes(p.id));
    count.textContent = items.length ? `${items.length.toLocaleString("fa-IR")} پادکست در علاقه‌مندی‌های توست` : "";
    list.innerHTML = items.length
      ? items.map(Cards.html).join("")
      : `<div class="empty-state"><strong>هنوز چیزی اضافه نکرده‌ای</strong><p>روی ♡ کارت هر پادکست بزن تا اینجا ذخیره بشه.</p><p><a class="btn btn--small" href="podcasts.html">دیدن پادکست‌ها</a></p></div>`;
    Jasoor.paintAll();
  }

  document.addEventListener("jasoor:favorites-changed", render);
  render();
})();
