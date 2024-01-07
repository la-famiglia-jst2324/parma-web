import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteCompany, deleteUser } from '../models/utils/helperFunctions'
import { createCompany } from '@/api/db/services/companyService'
import { createReport, deleteReport, getReportById, updateReport } from '@/api/db/services/reportService'
import { createUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Report Model Tests', () => {
  let reportId: number
  let companyId: number
  let userId: number

  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    userId = user.id
  })

  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company 4', addedBy: userId })
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company 4')
    expect(company.addedBy).toBe(userId)
  })

  test('Create a new report with valid details', async () => {
    const report = await createReport({ companyId, name: 'report', reportFileUrl: 'wwwwaaaa' })
    reportId = report.id // Store the ID for later use
    expect(report).toHaveProperty('id')
    expect(report.name).toBe('report')
    expect(report.reportFileUrl).toBe('wwwwaaaa')
  })

  test('Retrieve a report by ID', async () => {
    const report = await getReportById(reportId)
    expect(report).toBeTruthy()
    expect(report?.id).toBe(reportId)
  })

  test('Update a report name', async () => {
    const updatedReport = await updateReport(reportId, { name: 'sas' })
    expect(updatedReport.name).toBe('sas')
  })

  test('Delete a report', async () => {
    await deleteReport(reportId)
    const deletedReport = await prisma.report.findUnique({
      where: { id: reportId }
    })
    expect(deletedReport).toBeNull()
  })
})
