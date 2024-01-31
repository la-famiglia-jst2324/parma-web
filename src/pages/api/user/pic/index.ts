import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import fileValidation from '@/pages/api/lib/utils/fileValidation'
import { withAuthValidation } from '@/api/middleware/auth'
import {
  uploadFileToFirebase,
  generateFileUrl,
  deleteFileFromFirebaseStorage
} from '@/pages/api/lib/utils/firebaseStorage'
import { updateUser } from '@/api/db/services/userService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export const config = {
  api: {
    bodyParser: false
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id

  switch (method) {
    case 'POST':
      try {
        if (user.profilePicture) {
          res.status(400).json({ error: 'Profile picture already exists' })
        } else {
          const fileDestPrefix = `user/${userId}/pic/`
          const { incomingFile, name, type } = await fileValidation(req)
          const { fileDest } = await uploadFileToFirebase(incomingFile, type, name, fileDestPrefix)
          await updateUser(userId, {
            profilePicture: fileDest
          })
          const fileLink = await generateFileUrl(fileDest)
          res.status(200).json({ profilePicture: fileLink })
        }
      } catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    case 'GET':
      try {
        if (user.profilePicture) {
          const fileUrl = await generateFileUrl(user.profilePicture)
          res.status(200).json({ fileUrl })
        } else res.status(200).json({ message: 'Profile picture not found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        if (user && user.profilePicture) {
          await deleteFileFromFirebaseStorage(user.profilePicture)
          await updateUser(userId, {
            profilePicture: ''
          })
          res.status(204).end()
        } else res.status(404).json({ error: 'User not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        if (user && user.profilePicture) {
          const fileDestPrefix = `user/${userId}/pic/`
          const { incomingFile, name, type } = await fileValidation(req)
          const { fileDest } = await uploadFileToFirebase(incomingFile, type, name, fileDestPrefix)
          await deleteFileFromFirebaseStorage(user.profilePicture)
          await updateUser(userId, {
            profilePicture: fileDest
          })
          const fileLink = await generateFileUrl(fileDest)
          res.status(200).json({ profilePicture: fileLink })
        } else res.status(404).json({ error: 'User not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)
