import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/scheduledTasks'
import { createScheduledTask, getAllScheduledTasks } from '@/api/db/services/scheduledTaskService'

jest.mock('@/api/db/services/scheduledTaskService')

const mockTask = {
  id: 1,
  dataSourceId: 1,
  scheduleType: 'REGULAR',
  status: 'SUCCESS',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('ScheduledTasks API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new subscription', async () => {
    createScheduledTask.mockResolvedValueOnce(mockTask)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        dataSourceId: 1,
        scheduleType: 'REGULAR',
        status: 'SUCCESS',
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(mockTask)
  })
  test('GET returns a list of tasks', async () => {
    getAllScheduledTasks.mockResolvedValueOnce(mockTask)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockTask)
  })
})
