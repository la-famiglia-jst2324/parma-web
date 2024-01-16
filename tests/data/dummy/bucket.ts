import { randomPositiveInteger, randomTimestampStr } from './random'

export const randomBucketDummy = ({ ownerId, managedFields = true }: { ownerId: number; managedFields?: boolean }) => {
  const base = {
    title: 'test bucket',
    description: 'test bucket description',
    ownerId,
    isPublic: true
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

export const randomBucketDummies = ({
  ownerId,
  count = 3,
  managedFields = true
}: {
  ownerId: number
  count?: number
  managedFields?: boolean
}) => {
  const dummies = []
  for (let i = 0; i < count; i++) {
    dummies.push(
      randomBucketDummy({
        ownerId,
        managedFields
      })
    )
  }
  return dummies
}
