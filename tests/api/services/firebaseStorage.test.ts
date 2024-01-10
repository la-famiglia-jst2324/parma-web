import type { CollectionReference, DocumentReference, Query } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import { readRawDataByAllDatasources } from '@/pages/api/lib/utils/firebaseStorage'

// Mock the 'firebase-admin' module
jest.mock('firebase-admin', () => {
  const Firestore = jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      forEach: jest.fn()
    }),
    listDocuments: jest.fn().mockResolvedValue([])
  })
  return { firestore: Firestore }
})

describe('readRawDataByAllDatasources', () => {
  it('fetches raw data for a specific company from all datasources', async () => {
    const companyId = 'testCompany'

    // Mock all the called functions
    const mockGet = jest.fn().mockResolvedValue({
      forEach: jest.fn()
    })
    const mockQuery: Partial<Query> = { get: mockGet }

    const mockWhere = jest.fn(() => mockQuery as Query)

    const mockDocRef: Partial<DocumentReference> = { id: 'testDatasource' }
    const mockListDocuments = jest.fn(() => Promise.resolve([mockDocRef as DocumentReference]))

    const mockCollection: Partial<CollectionReference> = {
      where: mockWhere,
      listDocuments: mockListDocuments
    }

    // Mock the 'collection' function to return the mock CollectionReference
    admin.firestore().collection = jest.fn(() => mockCollection as CollectionReference)

    // Call the function under test
    await readRawDataByAllDatasources(companyId)

    // Assert that the 'collection' function was called with the correct argument
    expect(admin.firestore().collection).toHaveBeenCalledWith('parma/mining/datasource/testDatasource/raw_data')
    // Assert that the 'where' function was called with the correct arguments
    expect(mockWhere).toHaveBeenCalledWith('company_id', '==', companyId)
    // Assert that the 'get' function was called
    expect(mockGet).toHaveBeenCalled()
  })
})
