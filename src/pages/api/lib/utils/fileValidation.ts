import fs from 'fs'
import path from 'path'
import os from 'os'
import formidable from 'formidable'
import type { NextApiRequest } from 'next'

const maxFileSize = 25 * 1024 * 1024 // 25MB

function mapExtensionToFileType(extension: string): string | undefined {
  const mapping: { [key: string]: string } = {
    PDF: 'PDF',
    JPG: 'JPG',
    JPEG: 'JPG'
  }

  return mapping[extension.toUpperCase()]
}

const fileValidation = async (req: NextApiRequest) => {
  const form = formidable({ multiples: false, maxFieldsSize: maxFileSize, uploadDir: os.tmpdir() })

  return new Promise<{ incomingFile: formidable.File; name: string; type: string }>((resolve, reject) => {
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
      const name = path.parse(incomingFile.originalFilename).name
      const fileExtension = path
        .extname(incomingFile.originalFilename || '')
        .toUpperCase()
        .slice(1)
      const type = mapExtensionToFileType(fileExtension)
      if (!type) {
        reject(new Error('Invalid file type'))
        return
      }

      resolve({ incomingFile, name, type })
    })
  })
}

export default fileValidation
