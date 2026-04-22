
CREATE VIEW IF NOT EXISTS projects_view AS 
SELECT 
    p.id AS project_id,
    p.*,
    i.id AS image_id,
    i.*,
    GROUP_CONCAT(DISTINCT t.name) AS tech_stack,
    c.name_ru AS category_ru,
    c.name_en AS category_en
FROM projects p
LEFT JOIN images i ON i.imageable_id = p.id AND i.imageable_type = 'projects'
LEFT JOIN project_technology pt ON pt.project_id = p.id
LEFT JOIN technologies t ON t.id = pt.technology_id
LEFT JOIN categories c ON c.id = p.category_id
GROUP BY p.id, i.id;
