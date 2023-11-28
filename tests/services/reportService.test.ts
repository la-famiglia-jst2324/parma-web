import { PrismaClient } from '@prisma/client'

import companyService from '@/api/services/companyService'
import reportService from '@/api/services/reportService'
const { createCompany } = companyService
const { createReport, deleteReport, getReportById, updateReport } = reportService
const prisma = new PrismaClient()

describe('Report Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  let reportId: number
  let companyId: number

  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: 1 })
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(1)
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
