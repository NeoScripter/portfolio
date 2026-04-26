
CREATE OR REPLACE VIEW projects_view AS
SELECT 
    p.id,
    p.title_ru,
    p.title_en,
    p.description_ru,
    p.description_en,
    p.display_order,
    p.mockup,
    p.slug,
    p.link,
    p.category_id,
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
    (SELECT STRING_AGG(DISTINCT t.name, ', ') 
     FROM project_technology pt 
     JOIN technologies t ON t.id = pt.technology_id 
     WHERE pt.project_id = p.id) AS tech_stack
FROM projects p
LEFT JOIN images i ON i.imageable_id = p.id AND i.imageable_type = 'projects';
