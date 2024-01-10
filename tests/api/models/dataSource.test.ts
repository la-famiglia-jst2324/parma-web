import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  deleteUser,
  deleteCompany,
  createDataSource,
  deleteDataSource
} from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('DataSource Model Tests', () => {
  let dataSourceId: number

  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  // Create DataSource Test
  test('Create a new DataSource', async () => {
    const dataSource = await prisma.dataSource.create({
      data: {
        sourceName: 'Test Source',
        isActive: true,
        frequency: 'DAILY',
        healthStatus: 'UP',
        description: 'Test Description'
      }
    })

    dataSourceId = dataSource.id

    expect(dataSource).toHaveProperty('id')
    expect(dataSource.sourceName).toBe('Test Source')
    expect(dataSource.isActive).toBe(true)
    expect(dataSource.frequency).toBe('DAILY')
    expect(dataSource.healthStatus).toBe('UP')
    expect(dataSource.description).toBe('Test Description')
  })

  // Read DataSource Test
  test('Retrieve a DataSource by ID', async () => {
    const dataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId }
    })

    expect(dataSource).toBeTruthy()
    expect(dataSource.id).toBe(dataSourceId)
  })

  // Update DataSource Test
  test('Update a DataSource', async () => {
    const updatedDataSource = await prisma.dataSource.update({
      where: { id: dataSourceId },
      data: { description: 'Updated Description' }
    })

    expect(updatedDataSource.description).toBe('Updated Description')
  })

  // Delete DataSource Test
  test('Delete a DataSource', async () => {
    await prisma.dataSource.delete({
      where: { id: dataSourceId }
    })

    const dataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId }
    })

    expect(dataSource).toBeNull()
  })
})

describe('CompanyDataSource Model Tests', () => {
  let dataSourceId: number
  let companyId: number
  let userId: number
  beforeAll(async () => {
    // Assuming createCompany and createDataSource are helper functions
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create CompanyDataSource Test
  test('Create a new CompanyDataSource', async () => {
    const companyDataSource = await prisma.companyDataSource.create({
      data: {
        companyId,
        dataSourceId,
        isDataSourceActive: true,
        healthStatus: 'UP' // Replace with your actual enum value
      }
    })

    expect(companyDataSource).toHaveProperty('companyId')
    expect(companyDataSource).toHaveProperty('dataSourceId')
    expect(companyDataSource.isDataSourceActive).toBe(true)
    expect(companyDataSource.healthStatus).toBe('UP')
  })

  // Read CompanyDataSource Test
  test('Retrieve a CompanyDataSource', async () => {
    const companyDataSource = await prisma.companyDataSource.findUnique({
      where: {
        dataSourceId_companyId: {
          companyId,
          dataSourceId
        }
      }
    })

    expect(companyDataSource).toBeTruthy()
    expect(companyDataSource.companyId).toBe(companyId)
    expect(companyDataSource.dataSourceId).toBe(dataSourceId)
  })

  // Update CompanyDataSource Test
  test('Update a CompanyDataSource', async () => {
    const updatedCompanyDataSource = await prisma.companyDataSource.update({
      where: {
        dataSourceId_companyId: {
          companyId,
          dataSourceId
        }
      },
      data: { isDataSourceActive: false }
    })

    expect(updatedCompanyDataSource.isDataSourceActive).toBe(false)
  })

  // Delete CompanyDataSource Test
  test('Delete a CompanyDataSource', async () => {
    await prisma.companyDataSource.delete({
      where: {
        dataSourceId_companyId: {
          companyId,
          dataSourceId
        }
      }
    })

    const companyDataSource = await prisma.companyDataSource.findUnique({
      where: {
        dataSourceId_companyId: {
          companyId,
          dataSourceId
        }
      }
    })

    expect(companyDataSource).toBeNull()
  })
})
