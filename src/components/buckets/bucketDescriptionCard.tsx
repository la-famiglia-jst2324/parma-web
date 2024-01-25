import React from 'react'
import type { Bucket } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ShowToast } from '../ShowToast'
import EditBucketModal from './EditBucketModal'
import BucketFunctions from '@/app/services/bucket.service'

interface BucketDescriptionCardProps {
  bucket: Bucket
  isModerator: boolean
  handleSave(bucket: Bucket): void
}

const BucketDescriptionCard: React.FC<BucketDescriptionCardProps> = ({ bucket, handleSave, isModerator }) => {
  const saveBucket = (title: string, description: string | null, isPublic: boolean, id: number) => {
    BucketFunctions.updateBucket(title, description, id, isPublic)
      .then((res) => {
        if (res) {
          handleSave(res) // Send updated bucket to parent component
          ShowToast('Success', 'Bucket is updated successfully')
        } else {
          ShowToast('Error', 'Failed to update bucket', 'destructive')
        }
      })
      .catch((e) => {
        ShowToast('Error', e, 'destructive')
      })
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Description</CardTitle>
          {isModerator && (
            <EditBucketModal
              title={bucket.title}
              description={bucket.description}
              isPublic={bucket.isPublic}
              handleSave={(title: string, description: string | null, isPublic: boolean) =>
                saveBucket(title, description, isPublic, bucket.id)
              }
            ></EditBucketModal>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{bucket.description}</p>
      </CardContent>
    </Card>
  )
}

export default BucketDescriptionCard
