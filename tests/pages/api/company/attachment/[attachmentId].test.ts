import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/company/attachment/[attachmentId]'
import { getAttachmentByID, deleteAttachment } from '@/api/db/services/attachmentService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/attachmentService')

const mockAttachment = {
  id: 1,
  companyId: 1,
  fileType: 'JPG',
  fileUrl: 'url',
  userId: 1,
  title: 'attachment1',
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('attachmentId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a attachment', async () => {
    getAttachmentByID.mockResolvedValueOnce(mockAttachment)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockAttachment)
  })

  test('GET with non-existent bucketId returns 400', async () => {
    getAttachmentByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: 'non_existent_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No attachment found' })
  })

  test('GET with an invalid bucketId returns 404', async () => {
    getAttachmentByID.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: 'invalid_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })

  test('GET with server error returns 500', async () => {
    getAttachmentByID.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: 'error_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('DELETE delete an attachment', async () => {
    const existingAttachment = getAttachmentByID.mockResolvedValueOnce(mockAttachment)
    deleteAttachment.mockResolvedValueOnce(existingAttachment)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'attachment successfully Deleted' })
  })

  test('DELETE with non-existent bucketId returns 404', async () => {
    getAttachmentByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: 'non_existent_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'attachment not found' })
  })

  test('DELETE with server error returns 500', async () => {
    getAttachmentByID.mockResolvedValueOnce(mockAttachment)
    deleteAttachment.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: 'error_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})
