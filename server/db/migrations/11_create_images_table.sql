
CREATE TABLE IF NOT EXISTS images (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_images_imageable 
ON images (imageable_id, imageable_type);

