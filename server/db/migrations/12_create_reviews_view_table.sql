
CREATE VIEW IF NOT EXISTS reviews_view as 
    SELECT r.id review_id, r.*, i.id img_id, i.*
    FROM reviews r
    LEFT JOIN images i ON i.imageable_id = r.id AND i.imageable_type = 'reviews';

