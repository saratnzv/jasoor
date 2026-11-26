-- =====================================================================
-- «کاربر پایگاه داده» برای برنامه (به‌جای استفاده از root)
-- فقط روی دیتابیس jasoor و فقط با دسترسی‌های لازم؛ نه DROP و نه ALTER.
-- قبل از اجرا، رمز را عوض کن و همان را در db.properties بنویس.
-- این فایل را با رمز واقعی وارد گیت نکن.
-- اجرا:  mysql -u root -p < db/app_user.sql
-- =====================================================================
CREATE USER IF NOT EXISTS 'jasoor_app'@'localhost' IDENTIFIED BY 'یک-رمز-قوی-اینجا';
GRANT SELECT, INSERT, UPDATE, DELETE ON jasoor.* TO 'jasoor_app'@'localhost';
FLUSH PRIVILEGES;
