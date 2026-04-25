
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

