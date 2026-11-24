// فرم معرفی پادکست (فعلاً بدون سرور؛ ثبت‌ها موقتاً در localStorage می‌مانند)
(function () {
  const form = document.querySelector("#submit-form");
  if (!form) return;

  const gate = document.querySelector("#login-required");
  if (!Jasoor.getUser()) {
    gate.hidden = false;
    form.hidden = true;
    gate.querySelector("a").href = Jasoor.loginUrl();
    return;
  }

  const select = document.querySelector("#category");
  select.insertAdjacentHTML("beforeend", CATEGORIES.map((c) => `<option value="${c.slug}">${c.name}</option>`).join(""));

  const status = document.querySelector("#form-status");
  const isCastbox = (v) => {
    try { const u = new URL(v.trim()); return /^https?:$/.test(u.protocol) && (u.hostname === "castbox.fm" || u.hostname.endsWith(".castbox.fm")); }
    catch { return false; }
  };

  // هر قانون پیام خطا برمی‌گرداند، یا رشته‌ی خالی اگر معتبر باشد
  const rules = {
    title: (v) => (v.trim().length < 2 ? "نام پادکست را وارد کن." : ""),
    link: (v) => (!v.trim() ? "لینک کست‌باکس را وارد کن." : isCastbox(v) ? "" : "لینک باید از castbox.fm باشد."),
    category: (v) => (v ? "" : "یک دسته‌بندی انتخاب کن."),
    description: (v) => (v.trim().length < 10 ? "توضیح حداقل ۱۰ حرف باشد." : "")
  };

  function validate(field) {
    const message = rules[field.name](field.value);
    const error = document.querySelector(`#${field.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) field.setAttribute("aria-describedby", error.id); else field.removeAttribute("aria-describedby");
    return !message;
  }

  const fields = [...form.querySelectorAll("input, select, textarea")];
  fields.forEach((f) => {
    f.addEventListener("blur", () => { if (f.value) validate(f); });
    f.addEventListener("input", () => {
      if (f.getAttribute("aria-invalid") === "true") validate(f);
      status.hidden = true;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstBad = fields.map((f) => ({ f, ok: validate(f) })).find((r) => !r.ok);
    if (firstBad) { status.hidden = true; firstBad.f.focus(); return; }

    // موقت: ذخیره در مرورگر تا زمانی که سرولت آماده شود
    try {
      const all = JSON.parse(localStorage.getItem("jasoor_submissions") || "[]");
      const f = form.elements; // form.title خودِ فرم است، پس از elements می‌خوانیم
      all.push({ user: Jasoor.getUser().email, title: f.title.value.trim(), link: f.link.value.trim(),
                 category: f.category.value, description: f.description.value.trim(), status: "pending" });
      localStorage.setItem("jasoor_submissions", JSON.stringify(all));
    } catch { /* نادیده */ }

    form.reset();
    status.textContent = "درخواست ثبت شد و پس از بررسی منتشر می‌شود. (نمایشی؛ هنوز به سرور ارسال نشده)";
    status.hidden = false;
  });
})();
