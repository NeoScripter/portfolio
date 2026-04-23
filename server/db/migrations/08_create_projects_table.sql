
CREATE TABLE IF NOT EXISTS projects (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title_ru TEXT,
    title_en TEXT,
    description_ru TEXT,
    description_en TEXT,
    display_order INTEGER DEFAULT 100,
    mockup INTEGER DEFAULT 1,
    slug VARCHAR NOT NULL UNIQUE,
    link VARCHAR,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
