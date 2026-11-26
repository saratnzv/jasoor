package com.jasoor.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * اتصال به MySQL. تنظیمات از فایل db.properties (کنار کلاس‌ها، داخل resources) خوانده می‌شود
 * و با متغیرهای محیطی JASOOR_DB_URL / JASOOR_DB_USER / JASOOR_DB_PASSWORD قابل بازنویسی است.
 * فایل db.properties نباید وارد گیت شود (در .gitignore است).
 */
public final class Database {

    private static final Properties CONFIG = load();

    private Database() { }

    private static Properties load() {
        Properties p = new Properties();
        try (InputStream in = Database.class.getResourceAsStream("/db.properties")) {
            if (in != null) p.load(in);
        } catch (IOException e) {
            throw new IllegalStateException("خواندن db.properties ممکن نشد", e);
        }
        override(p, "url", "JASOOR_DB_URL");
        override(p, "user", "JASOOR_DB_USER");
        override(p, "password", "JASOOR_DB_PASSWORD");
        return p;
    }

    private static void override(Properties p, String key, String envName) {
        String v = System.getenv(envName);
        if (v != null && !v.isBlank()) p.setProperty(key, v);
    }

    /** هر فراخوانی یک اتصال جدید می‌دهد؛ حتماً با try-with-resources ببندید. */
    public static Connection getConnection() throws SQLException {
        String url = CONFIG.getProperty("url");
        if (url == null) {
            throw new SQLException("db.properties پیدا نشد یا url ندارد؛ db.properties.example را کپی و پر کنید.");
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // در Tomcat مطمئن‌ترین راه بارگذاری درایور
        } catch (ClassNotFoundException e) {
            throw new SQLException("درایور MySQL (mysql-connector-j) در پروژه نیست", e);
        }
        return DriverManager.getConnection(url, CONFIG.getProperty("user"), CONFIG.getProperty("password"));
    }
}
