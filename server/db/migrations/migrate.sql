CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru       varchar NOT NULL,
    title_en      varchar NOT NULL UNIQUE,
    content_ru   TEXT NOT NULL,
    content_en   TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
