// نشست نمایشی کاربر + علاقه‌مندی‌ها (فقط فرانت‌اند)
// ⚠ موقت: داده‌ها در localStorage مرورگر نگه داشته می‌شوند. بعد از نوشتن سرولت‌ها،
// getUser / login / logout و favorites به فراخوانی سرور تبدیل می‌شوند و بقیه‌ی کد ثابت می‌ماند.
(function () {
  const script = document.currentScript || document.querySelector('script[src$="js/auth.js"]');
  const ROOT = new URL("../", script.src).href; // ریشه‌ی سایت، چه از index و چه از pages/

  const read = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; } catch { return fallback; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ذخیره‌سازی در دسترس نیست */ } };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const Jasoor = {
    ROOT,
    getUser: () => read("jasoor_user", null),
    login(user) { write("jasoor_user", { name: user.name, email: user.email }); },
    logout() { try { localStorage.removeItem("jasoor_user"); } catch { /* نادیده */ } },
    loginUrl(next) { return ROOT + "pages/login.html?next=" + encodeURIComponent(next || location.href); },

    favorites: {
      key() { const u = Jasoor.getUser(); return u ? "jasoor_fav_" + u.email : null; },
      list() { const k = this.key(); return k ? read(k, []) : []; },
      has(id) { return this.list().includes(String(id)); },
      // برمی‌گرداند: true = اضافه شد، false = حذف شد، null = کاربر وارد نشده
      toggle(id) {
        const k = this.key();
        if (!k) return null;
        id = String(id);
        const list = this.list();
        const i = list.indexOf(id);
        if (i >= 0) list.splice(i, 1); else list.push(id);
        write(k, list);
        return i < 0;
      }
    },

    favButtonHTML(id, title) {
      return `<button type="button" class="fav-btn" data-id="${esc(id)}" data-title="${esc(title)}" aria-pressed="false"><span class="fav-btn__icon" aria-hidden="true">♡</span></button>`;
    },

    paintAll() {
      document.querySelectorAll(".fav-btn").forEach((btn) => {
        const on = Jasoor.favorites.has(btn.dataset.id);
        btn.setAttribute("aria-pressed", String(on));
        btn.setAttribute("aria-label", (on ? "حذف از علاقه‌مندی‌ها: " : "افزودن به علاقه‌مندی‌ها: ") + (btn.dataset.title || "این پادکست"));
        btn.querySelector(".fav-btn__icon").textContent = on ? "♥" : "♡";
      });
    }
  };
  window.Jasoor = Jasoor;

  // ---- هدر: حالت «وارد شده» ----
  function updateHeader() {
    const user = Jasoor.getUser();
    const loginLink = document.querySelector('.site-header__actions a[href$="login.html"]');
    if (!user || !loginLink) return;

    const menu = document.createElement("div");
    menu.className = "user-menu";
    menu.innerHTML =
      `<a class="user-menu__name" href="${ROOT}pages/favorites.html" title="علاقه‌مندی‌های من">${esc(user.name)}</a>` +
      `<button type="button" class="btn btn--small user-menu__logout">خروج</button>`;
    loginLink.replaceWith(menu);
    menu.querySelector(".user-menu__logout").addEventListener("click", () => { Jasoor.logout(); location.reload(); });

    const navList = document.querySelector(".main-nav__list");
    if (navList) {
      const current = location.pathname.endsWith("/favorites.html") ? ' aria-current="page"' : "";
      navList.insertAdjacentHTML("beforeend", `<li><a href="${ROOT}pages/favorites.html"${current}>علاقه‌مندی‌ها</a></li>`);
    }
  }

  // ---- دکمه‌ی علاقه‌مندی روی کارت‌های ثابت صفحه‌ی اصلی ----
  function enhanceStaticCards() {
    document.querySelectorAll(".podcast-card[data-castbox-id]").forEach((card) => {
      if (card.querySelector(".fav-btn")) return;
      const link = card.querySelector(".podcast-card__body > a.btn");
      if (!link) return;
      const title = (card.querySelector(".podcast-card__title") || {}).textContent || "";
      const actions = document.createElement("div");
      actions.className = "podcast-card__actions";
      link.replaceWith(actions);
      actions.append(link);
      actions.insertAdjacentHTML("beforeend", Jasoor.favButtonHTML(card.dataset.castboxId, title.trim()));
    });
  }

  // یک شنونده برای همه‌ی دکمه‌ها (کارت‌های ساخته‌شده با JS هم کار می‌کنند)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-btn");
    if (!btn) return;
    if (!Jasoor.getUser()) { location.href = Jasoor.loginUrl(); return; }
    Jasoor.favorites.toggle(btn.dataset.id);
    Jasoor.paintAll();
    document.dispatchEvent(new CustomEvent("jasoor:favorites-changed"));
  });

  updateHeader();
  enhanceStaticCards();
  Jasoor.paintAll();
})();
