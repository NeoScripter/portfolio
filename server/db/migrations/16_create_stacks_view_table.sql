
CREATE OR REPLACE VIEW stacks_view AS
SELECT
    s.id,
    s.body_ru,
    s.body_en,
    s.html_ru,
    s.html_en,

    i.alt_ru,
    i.alt_en,
    i.mb_webp_3x,
    i.mb_webp_2x,
    i.mb_webp,
    i.mb_avif_3x,
    i.mb_avif_2x,
    i.mb_avif,
    i.mb_tiny

FROM stacks s
LEFT JOIN images i ON i.imageable_id = s.id AND i.imageable_type = 'stacks';
