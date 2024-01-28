CREATE OR REPLACE FUNCTION add_data_source_company_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT id, NEW.id, true, 'UP', NOW() FROM company;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
