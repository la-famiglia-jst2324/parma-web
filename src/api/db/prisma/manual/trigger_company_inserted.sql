CREATE OR REPLACE TRIGGER company_inserted
AFTER INSERT ON company
FOR EACH ROW EXECUTE FUNCTION add_company_data_source_relationship();
