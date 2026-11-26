-- =====================================================================
-- پایگاه داده‌ی جسور  |  MySQL 8+  |  ۵ جدول
-- اجرا:  mysql -u root -p < db/schema.sql      (یا باز کردن در MySQL Workbench و Run)
-- هشدار: این اسکریپت جدول‌های قبلی جسور را پاک و از نو می‌سازد.
-- =====================================================================
CREATE DATABASE IF NOT EXISTS jasoor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jasoor;
SET NAMES utf8mb4;

-- اول جدول‌های وابسته (فرزند) پاک می‌شوند
DROP TABLE IF EXISTS favorites, submissions, podcasts, categories, users;

-- ۱) کاربران
CREATE TABLE users (
  id            INT          NOT NULL AUTO_INCREMENT,
  name          VARCHAR(80)  NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,                 -- قالب pbkdf2$...؛ هرگز متن ساده
  role          ENUM('listener','creator','admin') NOT NULL DEFAULT 'listener',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- ۲) دسته‌بندی‌ها
CREATE TABLE categories (
  id   INT         NOT NULL AUTO_INCREMENT,
  slug VARCHAR(50) NOT NULL,                           -- همان مقدار ?category= در سایت
  name VARCHAR(80) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB;

-- ۳) پادکست‌ها
CREATE TABLE podcasts (
  id          INT          NOT NULL AUTO_INCREMENT,
  castbox_id  VARCHAR(20)  NOT NULL,                   -- شناسه‌ی عمومی در سایت و لینک کست‌باکس
  title       VARCHAR(120) NOT NULL,
  description TEXT         NOT NULL,
  cover_url   VARCHAR(500) NULL,                       -- مسیر محلی یا آدرس بیرونی؛ NULL = بدون کاور
  note        VARCHAR(255) NULL,
  category_id INT          NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_podcasts_castbox (castbox_id),
  KEY idx_podcasts_category (category_id),
  CONSTRAINT fk_podcasts_category FOREIGN KEY (category_id) REFERENCES categories (id)
) ENGINE=InnoDB;

-- ۴) علاقه‌مندی‌ها (رابطه‌ی چند‌به‌چند کاربر و پادکست)
CREATE TABLE favorites (
  user_id    INT       NOT NULL,
  podcast_id INT       NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, podcast_id),
  CONSTRAINT fk_fav_user    FOREIGN KEY (user_id)    REFERENCES users (id)    ON DELETE CASCADE,
  CONSTRAINT fk_fav_podcast FOREIGN KEY (podcast_id) REFERENCES podcasts (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ۵) پادکست‌های معرفی‌شده توسط کاربران (منتظر تأیید)
CREATE TABLE submissions (
  id           INT          NOT NULL AUTO_INCREMENT,
  user_id      INT          NOT NULL,
  title        VARCHAR(120) NOT NULL,
  castbox_link VARCHAR(500) NOT NULL,
  category_id  INT          NOT NULL,
  description  TEXT         NOT NULL,
  status       ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sub_user (user_id),
  CONSTRAINT fk_sub_user     FOREIGN KEY (user_id)     REFERENCES users (id)      ON DELETE CASCADE,
  CONSTRAINT fk_sub_category FOREIGN KEY (category_id) REFERENCES categories (id)
) ENGINE=InnoDB;

-- ===== SEED: داده‌ی اولیه (هماهنگ با js/data.js) =====
INSERT INTO categories (slug, name) VALUES
  ('science', 'علمی'),
  ('history', 'تاریخ'),
  ('self-development', 'توسعه فردی'),
  ('technology', 'تکنولوژی'),
  ('culture', 'فرهنگ و ادبیات'),
  ('books', 'کتاب'),
  ('talk', 'گفت‌وگو');

INSERT INTO podcasts (castbox_id, title, description, cover_url, note, category_id) VALUES
  ('1399866', 'رادیو دیو', 'در هر اپیزود یک اقلیم یا موضوع ویژه، با کمک ادبیات و موسیقی.', 'https://assets.pippa.io/shows/624d67c5c6535900128484a3/show-cover.jpg', NULL, (SELECT id FROM categories WHERE slug = 'culture')),
  ('2385543', 'رادیو نیست', 'پادکست گفت‌وگومحور فارسی که هفتگی منتشر می‌شود.', 'assets/images/covers/radio-nist.jpg', NULL, (SELECT id FROM categories WHERE slug = 'talk')),
  ('7413246', 'پاراگراف', 'قصه‌ی تمدن‌ها، جنگ‌ها، ایده‌ها و آدم‌هایی که دنیای امروز را ساختند.', 'assets/images/covers/paragraph.jpg', NULL, (SELECT id FROM categories WHERE slug = 'history')),
  ('6039408', 'رخ', 'داستان زندگی کسانی که بخشی از تاریخ ایران و جهان را رقم زدند.', 'assets/images/covers/rokh.jpg', NULL, (SELECT id FROM categories WHERE slug = 'history')),
  ('5026144', 'استرینگ‌کست', 'هر قسمت داستانی واقعی درباره‌ی یک اتفاق علمی است.', 'assets/images/covers/stringcast.jpg', NULL, (SELECT id FROM categories WHERE slug = 'science')),
  ('6772092', 'سل ساگا', 'بررسی سرگذشت علم ژنتیک و رویدادهای مهم آن.', 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/44542160/44542160-1759592721682-36c0cb0505324.jpg', NULL, (SELECT id FROM categories WHERE slug = 'science')),
  ('4894772', 'رادیو راه', 'با مجتبی شکوری؛ کنج آرامی برای خواندن، فکر کردن و جست‌وجوی راهی برای بهتر زیستن.', 'assets/images/covers/radio-rah.jpg', NULL, (SELECT id FROM categories WHERE slug = 'self-development')),
  ('1555306', 'رادیو مذاکره', 'روزنوشته‌های محمدرضا شعبانعلی درباره‌ی روزمرگی، مسائل اجتماعی، فرهنگ، مدیریت و توسعه فردی.', NULL, NULL, (SELECT id FROM categories WHERE slug = 'self-development')),
  ('5656367', 'بی‌پلاس', 'خلاصه‌ی فارسی کتاب‌های غیرداستانی.', 'assets/images/covers/bplus.jpg', NULL, (SELECT id FROM categories WHERE slug = 'books')),
  ('4804474', 'جادی و رادیو گیک', 'آرشیو پادکست‌های جادی میرمیرانی.', 'https://s3.castbox.fm/b8/20/ac/528f9c405797746dc3b568868e.jpg', 'این کانال رسمی نیست و یکی از علاقه‌مندان آن را ساخته است.', (SELECT id FROM categories WHERE slug = 'technology'));

-- کاربر نمونه‌ی برنامه (ایمیل: demo@jasoor.test  |  رمز: Demo1234!)
-- هش با همین PasswordUtil ساخته شده؛ برای تحویل واقعی رمز را عوض کن.
INSERT INTO users (name, email, password_hash, role) VALUES
  ('کاربر نمونه', 'demo@jasoor.test', 'pbkdf2$120000$1hYahNpBSQaQQr+8HD5cKA==$ExQ5VHBZcp5EwOtSrIwvTGQ/o8n53+HjfO6kXpAggyY=', 'listener');
