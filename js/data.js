// داده‌های مشترک پادکست‌ها؛ هماهنگ با کارت‌های index.html
// slug همان مقدار ?category= در لینک‌های دسته‌بندی است.
const CATEGORIES = [
  { slug: "science", name: "علمی" },
  { slug: "history", name: "تاریخ" },
  { slug: "self-development", name: "توسعه فردی" },
  { slug: "technology", name: "تکنولوژی" },
  { slug: "culture", name: "فرهنگ و ادبیات" },
  { slug: "books", name: "کتاب" },
  { slug: "talk", name: "گفت‌وگو" }
];

// cover: null یعنی کاور خالی نمایش داده شود
// مسیرهای assets/... از ریشه‌ی سایت‌اند؛ در صفحات داخل pages/ خودکار با ../ ساخته می‌شوند.
const PODCASTS = [
  { id: "1399866", title: "رادیو دیو", category: "culture",
    desc: "در هر اپیزود یک اقلیم یا موضوع ویژه، با کمک ادبیات و موسیقی.",
    cover: "https://assets.pippa.io/shows/624d67c5c6535900128484a3/show-cover.jpg" },
  { id: "2385543", title: "رادیو نیست", category: "talk",
    desc: "پادکست گفت‌وگومحور فارسی که هفتگی منتشر می‌شود.",
    cover: "assets/images/covers/radio-nist.jpg" },
  { id: "7413246", title: "پاراگراف", category: "history",
    desc: "قصه‌ی تمدن‌ها، جنگ‌ها، ایده‌ها و آدم‌هایی که دنیای امروز را ساختند.",
    cover: "assets/images/covers/paragraph.jpg" },
  { id: "6039408", title: "رخ", category: "history",
    desc: "داستان زندگی کسانی که بخشی از تاریخ ایران و جهان را رقم زدند.",
    cover: "assets/images/covers/rokh.jpg" },
  { id: "5026144", title: "استرینگ‌کست", category: "science",
    desc: "هر قسمت داستانی واقعی درباره‌ی یک اتفاق علمی است.",
    cover: "assets/images/covers/stringcast.jpg" },
  { id: "6772092", title: "سل ساگا", category: "science",
    desc: "بررسی سرگذشت علم ژنتیک و رویدادهای مهم آن.",
    cover: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/44542160/44542160-1759592721682-36c0cb0505324.jpg" },
  { id: "4894772", title: "رادیو راه", category: "self-development",
    desc: "با مجتبی شکوری؛ کنج آرامی برای خواندن، فکر کردن و جست‌وجوی راهی برای بهتر زیستن.",
    cover: "assets/images/covers/radio-rah.jpg" },
  { id: "1555306", title: "رادیو مذاکره", category: "self-development",
    desc: "روزنوشته‌های محمدرضا شعبانعلی درباره‌ی روزمرگی، مسائل اجتماعی، فرهنگ، مدیریت و توسعه فردی.",
    cover: null },
  { id: "5656367", title: "بی‌پلاس", category: "books",
    desc: "خلاصه‌ی فارسی کتاب‌های غیرداستانی.",
    cover: "assets/images/covers/bplus.jpg" },
  { id: "4804474", title: "جادی و رادیو گیک", category: "technology",
    desc: "آرشیو پادکست‌های جادی میرمیرانی.",
    note: "این کانال رسمی نیست و یکی از علاقه‌مندان آن را ساخته است.",
    cover: "https://s3.castbox.fm/b8/20/ac/528f9c405797746dc3b568868e.jpg" }
];
