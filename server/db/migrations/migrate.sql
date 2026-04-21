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

CREATE TABLE IF NOT EXISTS videos (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    url  VARCHAR NOT NULL,
    title_ru TEXT,
    title_en TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ru VARCHAR,
    name_en VARCHAR,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS technologies (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ru TEXT,
    title_en TEXT,
    description_ru TEXT,
    description_en TEXT,
    display_order INT UNSIGNED DEFAULT 100,
    slug VARCHAR NOT NULL UNIQUE,
    link VARCHAR,
    category_id BIGINT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS modules (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    heading_ru TEXT,
    heading_en TEXT,
    body_ru TEXT NOT NULL,
    body_en TEXT NOT NULL,
    html_ru TEXT NOT NULL,
    html_en TEXT NOT NULL,
    type VARCHAR NOT NULL,
    display_order INT UNSIGNED DEFAULT 1,
    project_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_technology (
    project_id BIGINT UNSIGNED NOT NULL,
    technology_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, technology_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS images (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    imageable_id  INTEGER NOT NULL,
    imageable_type  VARCHAR NOT NULL,
    variant  VARCHAR NOT NULL DEFAULT 'image',
    dk_webp_3x  VARCHAR,
    dk_webp_2x  VARCHAR,
    dk_webp  VARCHAR,
    dk_avif_3x  VARCHAR,
    dk_avif_2x  VARCHAR,
    dk_avif  VARCHAR,
    tb_webp_3x  VARCHAR,
    tb_webp_2x  VARCHAR,
    tb_webp  VARCHAR,
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
