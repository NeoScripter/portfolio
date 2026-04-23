
CREATE TABLE IF NOT EXISTS faqs (
    id         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title_ru    VARCHAR,
    title_en    VARCHAR,
    content_ru  TEXT,
    content_en  TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
