import path from 'path'
import fs from 'fs'
import os from 'os'
import type { NextApiRequest } from 'next'
import formidable from 'formidable'
import admin from 'firebase-admin'
import type { FileType } from '@prisma/client'
import { v4 as UUID } from 'uuid'

const maxFileSize = 25 * 1024 * 1024 // 25MB

function mapExtensionToFileType(extension: string): string | undefined {
  const mapping: { [key: string]: string } = {
    PDF: 'PDF',
    JPG: 'JPG',
    JPEG: 'JPG'
  }

  return mapping[extension.toUpperCase()]
}

const uploadFileToFirebase = async (req: NextApiRequest, companyId: number) => {
  const form = formidable({ multiples: false, maxFieldsSize: maxFileSize, uploadDir: os.tmpdir() })

  return new Promise<{ fileDest: string; fileName: string; fileType: FileType }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }

      // Check if files contain the 'file' field and it has at least one file
      if (!files || !files.file || !Array.isArray(files.file) || files.file.length === 0) {
        reject(new Error('No file uploaded'))
        return
      }

      const incomingFile = files.file[0]
      if (!incomingFile) {
        reject(new Error('No file uploaded'))
        return
      }
      if (!fs.existsSync(incomingFile.filepath)) {
        reject(new Error('Uploaded file not found'))
        return
      }
      if (incomingFile.size > maxFileSize) {
        reject(new Error('File size exceeds the limit'))
        return
      }

      if (!incomingFile.originalFilename) {
        reject(new Error('File name is missing'))
        return
      }

      const fileExtension = path
        .extname(incomingFile.originalFilename || '')
        .toUpperCase()
        .slice(1)
      const fileType = mapExtensionToFileType(fileExtension)
      if (!fileType) {
        reject(new Error('Invalid file type'))
        return
      }

      const fileName = path.parse(incomingFile.originalFilename).name
      const bucket = admin.storage().bucket()
      const fileDest = `Company/${companyId}/${fileName}-${Date.now()}.${fileExtension.toLowerCase()}`
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
          resolve({ fileDest, fileName, fileType: fileType as FileType })
        })
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
