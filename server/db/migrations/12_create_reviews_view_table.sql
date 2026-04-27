
CREATE OR REPLACE VIEW reviews_view AS
SELECT 
    r.id,
    r.name_ru,
    r.name_en,
    r.content_ru,
    r.content_en,
    r.created_at AS review_created_at,
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
    i.alt_en,
    i.created_at AS image_created_at

FROM reviews r
LEFT JOIN images i ON i.imageable_id = r.id AND i.imageable_type = 'reviews';
