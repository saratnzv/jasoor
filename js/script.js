
/* =========================================
   Jasoor Podcast Platform
   Main JavaScript
   ========================================= */


/* =========================================
   1. Data
   ========================================= */

// Podcast Categories
const categories = [
    {
        name: "داستان",
        icon: "♫",
        count: "۴۸ برنامه"
    },
    {
        name: "روانشناسی",
        icon: "✧",
        count: "۳۲ برنامه"
    },
    {
        name: "تاریخ",
        icon: "⌛",
        count: "۲۶ برنامه"
    },
    {
        name: "فرهنگ",
        icon: "❖",
        count: "۲۱ برنامه"
    },
    {
        name: "تکنولوژی",
        icon: "⌘",
        count: "۱۹ برنامه"
    },
    {
        name: "جنایی",
        icon: "◈",
        count: "۱۷ برنامه"
    },
    {
        name: "اجتماعی",
        icon: "♧",
        count: "۲۴ برنامه"
    },
    {
        name: "طنز",
        icon: "☺",
        count: "۱۵ برنامه"
    }
];


// فهرست پادکست‌ها: اطلاعات کارت‌ها از این آرایه ساخته می‌شود.
// برای کاور اختصاصی، فیلد cover را به هر شیء اضافه کنید و آدرس فایل تصویر را بدهید.
// Podcasts
const podcasts = [
    {
        title: "روایت جسارت",
        desc: "داستان‌هایی از آدم‌های شجاع",
        category: "داستان",
        symbol: "✦",
        listeners: "۴۸.۵K"
    },
    {
        title: "صبح با جسور",
        desc: "شروعی متفاوت برای روزی بهتر",
        category: "سبک زندگی",
        symbol: "☼",
        listeners: "۳۲.۷K"
    },
    {
        title: "قصه‌های ناتمام",
        desc: "روایت‌هایی از گذشته، برای امروز",
        category: "تاریخ",
        symbol: "❧",
        listeners: "۶۱.۲K"
    },
    {
        title: "زنان جسور",
        desc: "داستان زنانی که مسیر را تغییر دادند",
        category: "اجتماعی",
        symbol: "✿",
        listeners: "۲۷.۹K"
    }
];


// فهرست اپیزودها: اطلاعات این آرایه برای کارت‌های اپیزود تازه استفاده می‌شود.
// برای تصویر کاور اپیزود، می‌توانید فیلد cover با مسیر فایل تصویر اضافه کنید.
// Episodes
const episodes = [
    {
        title: "اولین قدم، حتی با ترس",
        podcast: "روایت جسارت",
        time: "۳۲ دقیقه",
        date: "امروز",
        symbol: "✦"
    },
    {
        title: "چرا خودمان را دست‌کم می‌گیریم؟",
        podcast: "صبح با جسور",
        time: "۲۶ دقیقه",
        date: "دیروز",
        symbol: "☼"
    },
    {
        title: "روزی که تاریخ عوض شد",
        podcast: "قصه‌های ناتمام",
        time: "۴۱ دقیقه",
        date: "۲ روز پیش",
        symbol: "❧"
    },
    {
        title: "صدای زنانی که شنیده نشد",
        podcast: "زنان جسور",
        time: "۳۵ دقیقه",
        date: "۳ روز پیش",
        symbol: "✿"
    }
];


/* =========================================
   2. DOM Elements
   ========================================= */

const categoryGrid = document.querySelector("#category-grid");

const podcastGrid = document.querySelector("#podcast-grid");

const episodeList = document.querySelector("#episode-list");

const searchForm = document.querySelector("#podcast-search");

const searchInput = document.querySelector("#search-input");

const focusSearchButton = document.querySelector("#focus-search");

const menuToggle = document.querySelector("#menu-toggle");

const navigation = document.querySelector(".main-nav");

const audioPlayer = document.querySelector("#audio-player");

const playerTitle = document.querySelector("#player-title");

const playerPodcast = document.querySelector("#player-podcast");

const playerToggle = document.querySelector("#player-toggle");

const playerClose = document.querySelector("#player-close");


/* =========================================
   3. Helper Functions
   ========================================= */

// Escape HTML to prevent unsafe HTML insertion
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


/* =========================================
   4. Render Categories
   ========================================= */

function renderCategories() {
    if (!categoryGrid) return;

    categoryGrid.innerHTML = categories.map(category => {
        const name = escapeHTML(category.name);
        const icon = escapeHTML(category.icon);
        const count = escapeHTML(category.count);

        return `
            <a
                class="category-card"
                href="pages/podcasts.html?category=${encodeURIComponent(category.name)}"
            >
                <span class="category-icon">${icon}</span>

                <strong>${name}</strong>

                <small>${count}</small>
            </a>
        `;
    }).join("");
}


/* =========================================
   5. Render Podcasts
   ========================================= */

function renderPodcasts() {
    if (!podcastGrid) return;

    podcastGrid.innerHTML = podcasts.map(podcast => {
        const title = escapeHTML(podcast.title);
        const description = escapeHTML(podcast.desc);
        const category = escapeHTML(podcast.category);
        const symbol = escapeHTML(podcast.symbol);
        const listeners = escapeHTML(podcast.listeners);

        return `
            <article class="podcast-card">

                <div class="podcast-art">
                    ${symbol}
                </div>

                <div class="podcast-body">

                    <h3>${title}</h3>

                    <p>${description}</p>

                    <div class="podcast-bottom">

                        <span class="tag">
                            ${category}
                        </span>

                        <small>
                            ${listeners} شنونده
                        </small>

                        <button
                            class="play-button"
                            data-title="${title}"
                            data-podcast="${title}"
                            aria-label="پخش ${title}"
                            type="button"
                        >
                            ▶
                        </button>

                    </div>

                </div>

            </article>
        `;
    }).join("");
}


/* =========================================
   6. Render Episodes
   ========================================= */

function renderEpisodes() {
    if (!episodeList) return;

    episodeList.innerHTML = episodes.map(episode => {
        const title = escapeHTML(episode.title);
        const podcast = escapeHTML(episode.podcast);
        const time = escapeHTML(episode.time);
        const date = escapeHTML(episode.date);
        const symbol = escapeHTML(episode.symbol);

        return `
            <article class="episode-card">

                <div class="episode-cover">
                    ${symbol}
                </div>

                <div class="episode-info">

                    <h3>${title}</h3>

                    <p>${podcast}</p>

                    <span class="episode-meta">
                        ${time} · ${date}
                    </span>

                </div>

                <button
                    class="play-button"
                    data-title="${title}"
                    data-podcast="${podcast}"
                    aria-label="پخش ${title}"
                    type="button"
                >
                    ▶
                </button>

            </article>
        `;
    }).join("");
}


/* =========================================
   7. Search
   ========================================= */

function performSearch(value) {
    const query = value.trim();

    if (!query) {
        searchInput?.focus();
        return;
    }

    alert(
        `جست‌وجوی «${query}» در نسخه‌ی بعدی به نتایج پادکست متصل می‌شود.`
    );
}


// Search Form Submit
searchForm?.addEventListener("submit", event => {
    event.preventDefault();

    performSearch(searchInput?.value ?? "");
});


// Popular Search Buttons
document.querySelectorAll("[data-search]").forEach(button => {
    button.addEventListener("click", () => {
        const query = button.dataset.search ?? "";

        if (searchInput) {
            searchInput.value = query;
        }

        performSearch(query);
    });
});


// Focus Search Input
focusSearchButton?.addEventListener("click", () => {
    searchInput?.focus();
});


/* =========================================
   8. Mobile Navigation
   ========================================= */

function toggleMenu() {
    if (!navigation) return;

    const isOpen = navigation.classList.toggle("open");

    menuToggle?.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
}


// Menu Button
menuToggle?.addEventListener("click", toggleMenu);


// Close Menu After Navigation
navigation?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


/* =========================================
   9. Audio Player
   این پلیر در نسخه فعلی فقط رابط نمایشی دارد؛ پخش واقعی نیازمند فایل صوتی و عنصر Audio است.
   ========================================= */

let isPlaying = false;


// Open Player
function openPlayer(title, podcast) {
    if (!audioPlayer) return;

    audioPlayer.hidden = false;

    if (playerTitle) {
        playerTitle.textContent = title;
    }

    if (playerPodcast) {
        playerPodcast.textContent = podcast;
    }

    isPlaying = true;

    updatePlayerButton();
}


// Update Play / Pause Button
function updatePlayerButton() {
    if (!playerToggle) return;

    playerToggle.textContent = isPlaying ? "Ⅱ" : "▶";

    playerToggle.setAttribute(
        "aria-label",
        isPlaying ? "توقف موقت" : "ادامه پخش"
    );
}


// دکمه‌های پخش کارت‌ها با event delegation کنترل می‌شوند؛
 // چون کارت‌ها پس از بارگذاری، توسط renderPodcasts و renderEpisodes ساخته می‌شوند.
document.addEventListener("click", event => {
    const button = event.target.closest(".play-button");
    if (!button) return;

    const title = button.dataset.title || "اپیزود انتخاب‌شده";
    const podcast = button.dataset.podcast || "جسور";
    openPlayer(title, podcast);
});


// Toggle Play / Pause
playerToggle?.addEventListener("click", () => {
    isPlaying = !isPlaying;

    updatePlayerButton();
});


// Close Player
playerClose?.addEventListener("click", () => {
    if (!audioPlayer) return;

    audioPlayer.hidden = true;

    isPlaying = false;

    updatePlayerButton();
});


/* =========================================
   10. Initialize Website
   ========================================= */

function initializeWebsite() {
    renderCategories();

    renderPodcasts();

    renderEpisodes();
}


// Start Website
initializeWebsite();
