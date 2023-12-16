import { DataSourceType, Frequency, HealthStatus, PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createCompanyDataSource,
  deleteCompanyDataSource,
  getCompaniesByDataSourceId,
  getDataSourcesByCompanyId
} from '@/api/db/services/companyDataSourceService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Company Datasource Model Tests', () => {
  let membershipId: { dataSourceId: number; companyId: number }
  let userId: number
  let companyId: number
  let dataSourceId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const company = await createCompany({ name: 'Google', addedBy: user.id })
    const dataSource = await createDataSource({
      sourceName: 'source1',
      sourceType: DataSourceType.GITHUB,
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
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new Company Datasource Relation', async () => {
    const membership = await createCompanyDataSource({
      dataSourceId,
      companyId,
      isDataSourceActive: true,
      healthStatus: HealthStatus.UP
    })
    membershipId = {
      dataSourceId: membership.dataSourceId,
      companyId: membership.companyId
    }
    expect(membership).toHaveProperty('dataSourceId')
    expect(membership.isDataSourceActive).toBe(true)
    expect(membership.healthStatus).toBe(HealthStatus.UP)
  })

  test('Retrieve a Company Datasource Relation', async () => {
    const dataSource = await getDataSourcesByCompanyId(membershipId.companyId)
    expect(dataSource[0].id).toBe(dataSourceId)
    expect(dataSource[0].healthStatus).toBe(HealthStatus.UP)
  })

  test('Retrieve a Company Datasource Relation', async () => {
    const companies = await getCompaniesByDataSourceId(membershipId.dataSourceId)
    expect(companies[0].id).toBe(companyId)
    expect(companies[0].addedBy).toBe(userId)
  })

  test('Delete a Company Datasource Relation', async () => {
    await deleteCompanyDataSource(companyId, dataSourceId)
    const deletedMembership = await prisma.companyDataSource.findUnique({
      where: {
        dataSourceId_companyId: {
          dataSourceId: membershipId.dataSourceId,
          companyId: membershipId.companyId
        }
      }
    })
    expect(deletedMembership).toBeNull()
  })
})
