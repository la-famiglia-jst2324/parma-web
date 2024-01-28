CREATE OR REPLACE TRIGGER data_source_inserted
AFTER INSERT ON data_source
FOR EACH ROW EXECUTE FUNCTION add_data_source_company_relationship();
