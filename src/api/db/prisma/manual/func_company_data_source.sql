CREATE OR REPLACE FUNCTION add_company_data_source_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT NEW.id, id, true, 'UP', NOW() FROM data_source;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
