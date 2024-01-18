import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/company/attachment/index'
import { getAllAttachmentsForCompany, createAttachment } from '@/api/db/services/attachmentService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/attachmentService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))
const mockUser: User = {
  id: 1,
  authId: 'AAAAAdfw',
  name: 'ZL',
  profilePicture: 'pic',
  role: 'USER',
  createdAt: new Date(),
  modifiedAt: new Date()
}

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
describe('Attachment API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET with no attachments returns 400', async () => {
    getAllAttachmentsForCompany.mockResolvedValueOnce([]) // Simulate no attachments found

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: 'some_company_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Attachments found' })
  })

  test('GET with invalid companyId returns 404', async () => {
    getAllAttachmentsForCompany.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: 'invalid_company_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })

  test('GET with server error returns 500', async () => {
    getAllAttachmentsForCompany.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: 'error_company_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('POST creates a new data source', async () => {
    createAttachment.mockResolvedValueOnce(mockAttachment)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        fileType: 'JPG',
        fileUrl: 'url',
        userId: 1,
        title: 'attachment1',
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })
    await handler(req, res, mockUser)
    expect(JSON.parse(res._getData())).toEqual(mockAttachment)
  })

  test('POST with invalid parameters returns 400', async () => {
    createAttachment.mockResolvedValueOnce(null) // Simulate failure due to invalid parameters

    const { req, res } = createMocks({
      method: 'POST',
      body: { fileType: 'JPG' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createAttachment.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        fileType: 'JPG',
        fileUrl: 'url',
        userId: 1,
        title: 'attachment1',
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})
