/*
This migration creates triggers for adding company data source relationships
whenever a company or a data source is added.
*/

CREATE OR REPLACE FUNCTION add_company_data_source_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT NEW.id, id, true, 'UP', NOW() FROM data_source;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER company_inserted
AFTER INSERT ON company
FOR EACH ROW EXECUTE FUNCTION add_company_data_source_relationship();

CREATE OR REPLACE FUNCTION add_data_source_company_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT id, NEW.id, true, 'UP', NOW() FROM company;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER data_source_inserted
AFTER INSERT ON data_source
FOR EACH ROW EXECUTE FUNCTION add_data_source_company_relationship();
