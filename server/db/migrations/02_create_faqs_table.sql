
CREATE TABLE IF NOT EXISTS faqs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru    VARCHAR,
    title_en    VARCHAR,
    content_ru  TEXT,
    content_en  TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
