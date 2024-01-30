import { Frequency, HealthStatus, PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteDataSource } from '../models/utils/helperFunctions'
import {
  createCompanySourceMeasurement,
  getAllCompanySourceMeasurements,
  getCompanySourceMeasurementByID,
  getCompanySourceMeasurementByCompanyId,
  deleteCompanySourceMeasurement,
  updateCompanySourceMeasurement
} from '@/api/db/services/companySourceMeasurementService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createSourceMeasurement, deleteSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser, deleteUser } from '@/api/db/services/userService'
import { createDataSource } from '@/api/db/services/dataSourceService'
const prisma = new PrismaClient()

describe('Company Source Measurement Model Tests', () => {
  let userId: number
  let companyId: number
  let measurementId: number
  let dataSourceId: number
  let updatedCompanyId: number
  let id: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const company = await createCompany({ name: 'Google', addedBy: user.id })
    const updatedCompany = await createCompany({ name: 'Git', addedBy: user.id })
    const dataSource = await createDataSource({
      sourceName: 'source1',
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a new data source',
      invocationEndpoint: 'dummy endpoint'
    })
    const measurement = await createSourceMeasurement({
      sourceModuleId: dataSource.id,
      type: 'int',
      measurementName: '# of employee'
    })

    userId = user.id
    companyId = company.id
    dataSourceId = dataSource.id
    measurementId = measurement.id
    updatedCompanyId = updatedCompany.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(measurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new Company Source Measurement Relation with valid details', async () => {
    const relation = await createCompanySourceMeasurement({
      sourceMeasurementId: measurementId,
      companyId
    })
    id = relation.companyMeasurementId
    expect(relation).toHaveProperty('companyMeasurementId')
    expect(relation.sourceMeasurementId).toBe(measurementId)
    expect(relation.companyId).toBe(companyId)
  })

  test('Retrieve a Company Source Measurement Relation', async () => {
    const id: number[] = []
    id.push(companyId)
    const relation = await getCompanySourceMeasurementByCompanyId(id)
    expect(relation.some((companySourceMeasurement) => companySourceMeasurement.companyId === companyId)).toBe(true)
  })

  test('Update a Company Source Measurement Relation', async () => {
    const updated = await updateCompanySourceMeasurement(id, {
      companyId: updatedCompanyId
    })
    expect(updated.companyId).toBe(updatedCompanyId)
  })

  test('Get first page of CompanySourceMeasurements', async () => {
    const page = 1
    const size = 10
    const resultPagination = await getAllCompanySourceMeasurements(page, size)
    expect(resultPagination.companySourceMeasurements.length).toBeLessThanOrEqual(size)
  })

  test('Retrieve for non existing id', async () => {
    const id = -1
    await expect(getCompanySourceMeasurementByID(id)).rejects.toThrow(
      `Company source measurement with ID ${id} not found.`
    )
  })

  test('Delete a Company SourceMeasurement', async () => {
    await deleteCompanySourceMeasurement(id)
    const deletedRelation = await prisma.companySourceMeasurement.findUnique({
      where: { companyMeasurementId: id }
    })
    expect(deletedRelation).toBeNull()
  })
})
