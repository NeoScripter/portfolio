
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
