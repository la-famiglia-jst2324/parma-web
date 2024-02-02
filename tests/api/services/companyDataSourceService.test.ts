import type { Company } from '@prisma/client'
import { Frequency, HealthStatus, PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteDataSource } from '../models/utils/helperFunctions'
import {
  createCompanyDataSource,
  getCompaniesByDataSourceId,
  getDataSourcesByCompanyId
} from '@/api/db/services/companyDataSourceService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createUser, deleteUser } from '@/api/db/services/userService'
import type Datasource from '@/types/datasource'

const prisma = new PrismaClient()

describe('Company Datasource Model Tests', () => {
  let userId: number
  let companyId: number
  let dataSourceId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const company = await createCompany({ name: 'Google', addedBy: user.id })
    const dataSource = await createDataSource({
      sourceName: 'source1',
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a new data source',
      invocationEndpoint: 'dummy endpoint'
    })

    userId = user.id
    companyId = company.id
    dataSourceId = dataSource.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Fail to create a new Company Datasource Relation with duplicate data', async () => {
    try {
      await createCompanyDataSource({
        dataSourceId,
        companyId,
        isDataSourceActive: true,
        healthStatus: HealthStatus.UP
      })
      // If the above line does not throw an error, fail the test
      expect('This should not be reached').toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test('Retrieve a Company Datasource Relation', async () => {
    const dataSources = await getDataSourcesByCompanyId(companyId)
    expect(dataSources.some((dataSource: Datasource) => dataSource.id === dataSourceId)).toBe(true)
  })

  test('Retrieve a Company Datasource Relation', async () => {
    const companies = await getCompaniesByDataSourceId(dataSourceId)
    expect(companies.some((company: Company) => company.id === companyId)).toBe(true)
  })
})
