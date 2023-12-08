import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/reports/[reportId]'
import { getReportById, updateReport, deleteReport } from '@/api/db/services/reportService'

jest.mock('@/api/db/services/reportService')

const reportData = {
  id: 1,
  companyId: 2,
  name: 'Sample Report',
  reportFileUrl: 'textURL',
  createdAt: '2023-12-02T23:46:12.171Z',
  modifiedAt: '2023-12-02T23:46:12.171Z'
}

const updatedReportData = {
  id: 1,
  companyId: 2,
  name: 'Updated Sample Report',
  reportFileUrl: 'textURL',
  createdAt: '2023-12-02T23:46:12.171Z',
  modifiedAt: '2023-12-02T23:48:10.159Z'
}
describe('Report API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET retrieves a report', async () => {
    getReportById.mockResolvedValueOnce(reportData)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        reportId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(reportData)
  })

  test('PUT updates a report', async () => {
    updateReport.mockResolvedValueOnce(updatedReportData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        reportId: 1
      },
      body: {
        companyId: 2,
        name: 'Updated Sample Report',
        reportFileUrl: 'textURL'
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedReportData)
  })

  test('DELETE deletes a report', async () => {
    deleteReport.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        reportId: 1
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Report successfully Deleted' })
  })
})
