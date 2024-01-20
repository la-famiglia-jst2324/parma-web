import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

async function createTrigger() {
    const checkCompanyTriggerExistsSQL = `
      SELECT 1
      FROM pg_trigger
      WHERE tgname = 'company_inserted';
    `

    const createCompanyFunctionSQL = `
      CREATE OR REPLACE FUNCTION add_company_data_source_relationship() RETURNS TRIGGER AS $$
      BEGIN
          INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
          SELECT NEW.id, id, true, 'UP', NOW() FROM data_source;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `

    const createCompanyTriggerSQL = `
      CREATE TRIGGER company_inserted
      AFTER INSERT ON company
      FOR EACH ROW EXECUTE FUNCTION add_company_data_source_relationship();
    `

    const checkDataSourceTriggerExistsSQL = `
      SELECT 1
      FROM pg_trigger
      WHERE tgname = 'data_source_inserted';
    `

    const createDataSourceFunctionSQL = `
      CREATE OR REPLACE FUNCTION add_data_source_company_relationship() RETURNS TRIGGER AS $$
      BEGIN
          INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
          SELECT id, NEW.id, true, 'UP', NOW() FROM company;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `

    const createDataSourceTriggerSQL = `
      CREATE TRIGGER data_source_inserted
      AFTER INSERT ON data_source
      FOR EACH ROW EXECUTE FUNCTION add_data_source_company_relationship();
    `

    try {
      const companyTriggerExists: object[] = await prisma.$queryRawUnsafe(checkCompanyTriggerExistsSQL)

      if (companyTriggerExists.length === 0) {
        await prisma.$executeRawUnsafe(createCompanyFunctionSQL)
        await prisma.$executeRawUnsafe(createCompanyTriggerSQL)
        console.log('Company trigger created successfully')
      } else {
        console.log('Company trigger already exists')
      }

      const dataSourceTriggerExists: object[] = await prisma.$queryRawUnsafe(checkDataSourceTriggerExistsSQL)

      if (dataSourceTriggerExists.length === 0) {
        await prisma.$executeRawUnsafe(createDataSourceFunctionSQL)
        await prisma.$executeRawUnsafe(createDataSourceTriggerSQL)
        console.log('Data source trigger created successfully')
      } else {
        console.log('Data source trigger already exists')
      }
    } catch (error) {
      console.error('Error creating triggers:', error)
    }
  }

if (process.env.NODE_ENV !== 'test') {
  createTrigger();
}
