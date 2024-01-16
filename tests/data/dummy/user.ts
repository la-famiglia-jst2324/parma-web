import type { User } from '@prisma/client'
import { randomFileReference, randomPositiveInteger, randomTimestampStr, randomUniqueToken } from './random'

export const randomUserDummy = ({ managedFields = true }: { managedFields?: boolean }) => {
  const base = {
    authId: randomUniqueToken(),
    name: 'test user',
    profilePicture: randomFileReference(),
    role: 'USER'
  }
  return managedFields
    ? {
        id: randomPositiveInteger(),
        ...base,
        createdAt: randomTimestampStr(),
        modifiedAt: randomTimestampStr()
      }
    : base
}

export const randomDbUserDummy = (): User => {
  return randomUserDummy({ managedFields: false }) as User
}
