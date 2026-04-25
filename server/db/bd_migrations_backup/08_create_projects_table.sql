
CREATE TABLE IF NOT EXISTS projects (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru TEXT,
    title_en TEXT,
    description_ru TEXT,
    description_en TEXT,
    display_order INT UNSIGNED DEFAULT 100,
    mockup: INT UNSIGNED DEFAULT 1,
    slug VARCHAR NOT NULL UNIQUE,
    link VARCHAR,
    category_id BIGINT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
