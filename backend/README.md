# بک‌اند جسور (Java Servlet + MySQL)

پوشه‌ی `backend/` کنار فرانت‌اند در همین مخزن است. فرانت‌اند همچنان در ریشه‌ی مخزن می‌ماند
(تا GitHub Pages کار کند) و موقع ساخت WAR خودکار داخل آن کپی می‌شود.

## پیش‌نیازها
- JDK 17 یا بالاتر (`java -version`)
- Maven (`mvn -v`)
- MySQL Server 8 (`mysql --version`)
- Tomcat 10.1

## راه‌اندازی پایگاه داده
1. جدول‌ها و داده‌ی اولیه:  `mysql -u root -p < db/schema.sql`
2. کاربر برنامه (به‌جای root): رمز را در `db/app_user.sql` عوض کن و اجرا کن:
   `mysql -u root -p < db/app_user.sql`
3. `src/main/resources/db.properties.example` را کپی کن به `db.properties` و رمز همان کاربر را بنویس.
   (این فایل در `.gitignore` است؛ هرگز وارد گیت نشود.)

## ساخت و اجرا
```
cd backend
mvn clean package
```
فایل `target/jasoor.war` را داخل `webapps` تامکت بگذار و Tomcat را بالا بیاور:
`http://localhost:8080/jasoor/`

## جدول‌ها
| جدول | نقش |
|---|---|
| `users` | حساب کاربران (رمز: هش PBKDF2) |
| `categories` | دسته‌بندی‌ها |
| `podcasts` | پادکست‌ها (جایگزین `js/data.js`) |
| `favorites` | علاقه‌مندی‌ها: چند‌به‌چند بین users و podcasts |
| `submissions` | پادکست‌های معرفی‌شده، با وضعیت pending/approved/rejected |

کاربر نمونه: `demo@jasoor.test` با رمز `Demo1234!` (برای تحویل واقعی عوضش کن).
