import { Frequency, HealthStatus, PrismaClient, Role, IdentifierType } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteDataSource } from '../models/utils/helperFunctions'
import {
  createCompanyDataSourceIdentifier,
  getAllCompanyDataSourceIdentifiers
} from '@/api/db/services/companyDataSourceIdentifierService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { getCompanyDataSourceByIds } from '@/api/db/services/companyDataSourceService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Company Datasource Identifier Model Tests', () => {
  let userId: number
  let companyId: number
  let dataSourceId: number
  let companyDataSourceId: number

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
    const companyDataSource = await getCompanyDataSourceByIds(dataSourceId, companyId)
    companyDataSourceId = companyDataSource.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Fail to create a new Company Datasource Identifier with duplicate data', async () => {
    try {
      await createCompanyDataSourceIdentifier({
        companyDataSourceId,
        identifierType: IdentifierType.AUTOMATICALLY_DISCOVERED,
        property: 'property',
        value: '1',
        validity: new Date()
      })
      expect('This should not be reached').toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test('Get All Company Data Source Identifiers', async () => {
    const page = 1
    const pageSize = 10
    const identifier = await getAllCompanyDataSourceIdentifiers(page, pageSize)
    expect(identifier).toBeTruthy()
  })
})
