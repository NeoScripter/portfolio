
CREATE OR REPLACE VIEW videos_view AS
SELECT 
    v.*,
    i.imageable_id,
    i.imageable_type,
    i.variant,
    i.dk_webp_3x,
    i.dk_webp_2x,
    i.dk_webp,
    i.dk_avif_3x,
    i.dk_avif_2x,
    i.dk_avif,
    i.dk_tiny,
    i.tb_webp_3x,
    i.tb_webp_2x,
    i.tb_webp,
    i.tb_avif_3x,
    i.tb_avif_2x,
    i.tb_avif,
    i.tb_tiny,
    i.mb_webp_3x,
    i.mb_webp_2x,
    i.mb_webp,
    i.mb_avif_3x,
    i.mb_avif_2x,
    i.mb_avif,
    i.mb_tiny,
    i.alt_ru,
    i.alt_en
FROM videos v
LEFT JOIN images i ON i.imageable_id = v.id AND i.imageable_type = 'videos';
