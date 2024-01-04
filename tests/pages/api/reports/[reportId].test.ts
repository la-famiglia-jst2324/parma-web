import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/reports/[reportId]'
import { getReportById, deleteReport, updateReport } from '@/api/db/services/reportService'
jest.mock('@/api/db/services/reportService')

const report = {
  id: 1,
  companyId: 1,
  name: 'report1',
  reportFileUrl: 'www.report.com',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('ReportId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a report', async () => {
    getReportById.mockResolvedValueOnce(report)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(report)
  })

  test('DELETE delete a report', async () => {
    deleteReport.mockResolvedValueOnce(report)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Report successfully Deleted' })
  })

  test('PUT update a report', async () => {
    updateReport.mockResolvedValueOnce(report)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(report)
  })
})
