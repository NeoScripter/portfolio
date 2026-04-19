CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru    VARCHAR,
    title_en    VARCHAR,
    content_ru  TEXT,
    content_en  TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stacks (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR NOT NULL,
    alt_ru  VARCHAR NOT NULL,
    alt_en  VARCHAR NOT NULL,
    body_ru TEXT,
    body_en TEXT,
    html_ru TEXT,
    html_en TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
