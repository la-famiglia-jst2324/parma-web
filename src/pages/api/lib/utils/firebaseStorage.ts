import fs from 'fs'
import type formidable from 'formidable'
import type { FileType } from '@prisma/client'
import { v4 as UUID } from 'uuid'
import admin from '@/api/firebase/main'

const uploadFileToFirebase = async (
  incomingFile: formidable.File,
  fileExtension: string,
  fileName: string,
  fileDestPrefix: string
) => {
  return new Promise<{ fileDest: string; fileName: string; fileType: FileType }>((resolve, reject) => {
    const bucket = admin.storage().bucket()
    const fileDest = fileDestPrefix + `${fileName.toLowerCase()}-${Date.now()}.${fileExtension.toLowerCase()}`
    fileExtension = fileExtension.toUpperCase()
    const blob = bucket.file(fileDest)
    const uuid = UUID()

    const stream = blob.createWriteStream({
      metadata: {
        contentType: incomingFile.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid
        }
      }
    })

    fs.createReadStream(incomingFile.filepath)
      .pipe(stream)
      .on('error', reject)
      .on('finish', async () => {
        fs.unlinkSync(incomingFile.filepath)
        resolve({ fileDest, fileName, fileType: fileExtension as FileType })
      })
  })
}

async function generateFileUrl(fileDest: string): Promise<string> {
  const bucket = admin.storage().bucket()
  const [url] = await bucket.file(fileDest).getSignedUrl({
    action: 'read',
    expires: '11-11-2111'
  })
  return url
}

async function deleteFileFromFirebaseStorage(filePath: string) {
  try {
    const bucket = admin.storage().bucket()
    await bucket.file(filePath).delete()
  } catch (error) {
    throw new Error('Failed to delete file from Firebase Storage.')
  }
}

/**
 * Asynchronously fetches raw data for a specific company from all datasources in Firestore.
 *
 * @param {string} companyId - The ID of the company for which to fetch the data.
 * @returns {Promise<Record<string, admin.firestore.DocumentData[]>>} - A promise that resolves to an object.
 * Each key in the object is a datasource name, and the value is an array of documents from that datasource.
 * Each document is represented as an object where the keys are the field names and the values are the field values.
 */
async function readRawDataByAllDatasources(companyId: string): Promise<Record<string, admin.firestore.DocumentData[]>> {
  const db = admin.firestore()
  const datasourcesSnapshot = await db.collection('parma/mining/datasource').listDocuments()

  const response: Record<string, admin.firestore.DocumentData[]> = {}
  for (const doc of datasourcesSnapshot) {
    const datasource = doc.id
    const collectionPath = `parma/mining/datasource/${datasource}/raw_data`
    const snapshot = await db.collection(collectionPath).where('company_id', '==', companyId).get()

    response[datasource] = []
    snapshot.forEach((doc) => {
      response[datasource].push(doc.data())
    })
  }

  return response
}

export { uploadFileToFirebase, generateFileUrl, deleteFileFromFirebaseStorage, readRawDataByAllDatasources }
