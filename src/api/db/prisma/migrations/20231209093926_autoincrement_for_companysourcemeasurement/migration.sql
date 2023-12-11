-- AlterTable
CREATE SEQUENCE company_source_measurement_company_measurement_id_seq;
ALTER TABLE "company_source_measurement" ALTER COLUMN "company_measurement_id" SET DEFAULT nextval('company_source_measurement_company_measurement_id_seq');
ALTER SEQUENCE company_source_measurement_company_measurement_id_seq OWNED BY "company_source_measurement"."company_measurement_id";
