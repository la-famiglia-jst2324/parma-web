import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/reports/'
import { createReport } from '@/api/db/services/reportService'
jest.mock('@/api/db/services/reportService')

const newReport = {
  id: 1,
  companyId: 1,
  name: 'report1',
  reportFileUrl: 'www.report.com',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Report API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new report', async () => {
    createReport.mockResolvedValueOnce(newReport)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        name: 'report1',
        reportFileUrl: 'www.report.com',
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(newReport)
  })
})
