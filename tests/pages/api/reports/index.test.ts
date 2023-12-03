import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/reports/'
import { createReport } from '@/api/db/services/reportService'

jest.mock('@/api/db/services/reportService')

const newReportData = {
  companyId: 2,
  name: 'Sample Report',
  reportFileUrl: 'textURL'
}

describe('Create Report API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new report', async () => {
    createReport.mockResolvedValueOnce(newReportData)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 2,
        name: 'Sample Report',
        reportFileUrl: 'textURL'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(newReportData)
  })
})
