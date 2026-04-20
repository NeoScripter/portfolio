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

CREATE TABLE IF NOT EXISTS reviews (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ru  VARCHAR NOT NULL,
    name_en  VARCHAR NOT NULL,
    content_ru TEXT,
    content_en TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS images (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    imageable_id  INTEGER NOT NULL,
    imageable_type  VARCHAR NOT NULL,
    variant  VARCHAR NOT NULL,
    dk_webp_3x  VARCHAR,
    dk_webp_2x  VARCHAR,
    dk_webp  VARCHAR NOT NULL,
    dk_avif_3x  VARCHAR,
    dk_avif_2x  VARCHAR,
    dk_avif  VARCHAR,
    tb_webp_3x  VARCHAR,
    tb_webp_2x  VARCHAR,
    tb_webp  VARCHAR NOT NULL,
    tb_avif_3x  VARCHAR,
    tb_avif_2x  VARCHAR,
    tb_avif  VARCHAR,
    mb_webp_3x  VARCHAR,
    mb_webp_2x  VARCHAR,
    mb_webp  VARCHAR NOT NULL,
    mb_avif_3x  VARCHAR,
    mb_avif_2x  VARCHAR,
    mb_avif  VARCHAR,
    tiny  VARCHAR,
    alt_ru  VARCHAR NOT NULL,
    alt_en  VARCHAR NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_images_imageable 
ON images (imageable_id, imageable_type);
