
CREATE TABLE IF NOT EXISTS projects (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title_ru TEXT,
    title_en TEXT,
    description_ru TEXT,
    description_en TEXT,
    priority INTEGER DEFAULT 100,
    mockup INTEGER DEFAULT 1,
    slug VARCHAR NOT NULL UNIQUE,
    link VARCHAR,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'projects' AND column_name = 'is_featured'
    ) THEN
        ALTER TABLE projects ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
    END IF;
END;
$$;
