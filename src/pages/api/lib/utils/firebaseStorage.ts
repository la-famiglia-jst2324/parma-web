import fs from 'fs'
import type formidable from 'formidable'
import admin from 'firebase-admin'
import type { FileType } from '@prisma/client'
import { v4 as UUID } from 'uuid'

const uploadFileToFirebase = async (
  incomingFile: formidable.File,
  fileExtension: string,
  fileName: string,
  fileDestPrefix: string
) => {
  return new Promise<{ fileDest: string; fileName: string; fileType: FileType }>((resolve, reject) => {
    const bucket = admin.storage().bucket()
    const fileDest = fileDestPrefix + `${fileName}-${Date.now()}.${fileExtension.toLowerCase()}`
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

export { uploadFileToFirebase, generateFileUrl, deleteFileFromFirebaseStorage }
