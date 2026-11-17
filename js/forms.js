// اعتبارسنجی فرم‌های ورود و ثبت‌نام (فعلاً بدون بک‌اند)
(function () {
  const form = document.querySelector("#auth-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // هر قانون پیام خطا برمی‌گرداند، یا رشته‌ی خالی اگر مقدار معتبر باشد
  const rules = {
    name: (v) => (v.trim().length < 2 ? "نام را وارد کن (حداقل ۲ حرف)." : ""),
    email: (v) => (!v.trim() ? "ایمیل را وارد کن." : EMAIL_RE.test(v.trim()) ? "" : "ایمیل معتبر نیست؛ مثلاً name@example.com"),
    password: (v) => (!v ? "رمز عبور را وارد کن." : v.length < 8 ? "رمز عبور حداقل ۸ کاراکتر باشد." : "")
  };

  function validate(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const message = rule(input.value);
    const error = document.querySelector(`#${input.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) input.setAttribute("aria-describedby", error.id);
    else input.removeAttribute("aria-describedby");
    return !message;
  }

  const inputs = [...form.querySelectorAll("input")];

  inputs.forEach((input) => {
    // بعد از ترک فیلد بررسی شود؛ بعد از اولین خطا با هر تایپ دوباره
    input.addEventListener("blur", () => { if (input.value) validate(input); });
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validate(input);
      status.hidden = true;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstBad = inputs.map((i) => ({ i, ok: validate(i) })).find((r) => !r.ok);
    if (firstBad) { status.hidden = true; firstBad.i.focus(); return; }
    status.textContent = "اطلاعات معتبر است؛ اما این نسخه به بک‌اند وصل نیست و چیزی ارسال نشد.";
    status.hidden = false;
  });
})();
