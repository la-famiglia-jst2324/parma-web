import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/scheduledTasks/[taskId]'
import { getScheduledTaskByID, updateScheduledTask, deleteScheduledTask } from '@/api/db/services/scheduledTaskService'
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

  test('GET returns a notification', async () => {
    getScheduledTaskByID.mockResolvedValueOnce(mockTask)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockTask)
  })

  test('DELETE delete a notification', async () => {
    deleteScheduledTask.mockResolvedValueOnce(mockTask)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Task successfully deleted' })
  })

  test('PUT update a notification', async () => {
    updateScheduledTask.mockResolvedValueOnce(mockTask)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockTask)
  })
})
