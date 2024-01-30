import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/company/[companyId]/attachment/[attachmentId]'
import { getCompanyByID } from '@/api/db/services/companyService'
import { deleteAttachment, getAttachmentByID } from '@/api/db/services/attachmentService'
import { generateFileUrl } from '@/pages/api/lib/utils/firebaseStorage'
jest.mock('@/api/db/services/attachmentService')
jest.mock('@/api/db/services/companyService')
jest.mock('@/pages/api/lib/utils/firebaseStorage')
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
const mockCompany = {
  id: 1,
  name: 'company1',
  description: 'company1 description',
  addedBy: 1,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}
describe('Company Attachment API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET - Successfully retrieves attachment (200 status)', async () => {
    getCompanyByID.mockResolvedValueOnce(mockCompany)
    getAttachmentByID.mockResolvedValueOnce(mockAttachment)
    generateFileUrl.mockResolvedValueOnce('mocked-file-url')
    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1', attachmentId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - Company or Attachment not found (404 status)', async () => {
    getCompanyByID.mockResolvedValueOnce(null)
    getAttachmentByID.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1', attachmentId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })

  test('DELETE - Successfully deletes attachment (200 status)', async () => {
    getCompanyByID.mockResolvedValueOnce(mockCompany)
    getAttachmentByID.mockResolvedValueOnce(mockAttachment)
    deleteAttachment.mockResolvedValueOnce(mockAttachment)
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: '1', attachmentId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE - Company or Attachment not found (404 status)', async () => {
    getCompanyByID.mockResolvedValueOnce(null)
    getAttachmentByID.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: '1', attachmentId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })
})
