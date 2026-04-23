
CREATE TABLE IF NOT EXISTS modules (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    heading_ru TEXT,
    heading_en TEXT,
    body_ru TEXT NOT NULL,
    body_en TEXT NOT NULL,
    html_ru TEXT NOT NULL,
    html_en TEXT NOT NULL,
    type VARCHAR NOT NULL,
    display_order INTEGER DEFAULT 1,
    project_id BIGINT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

