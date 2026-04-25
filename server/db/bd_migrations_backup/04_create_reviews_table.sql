
CREATE TABLE IF NOT EXISTS reviews (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ru  VARCHAR NOT NULL,
    name_en  VARCHAR NOT NULL,
    content_ru TEXT,
    content_en TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
