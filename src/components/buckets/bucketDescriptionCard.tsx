import React from 'react'
import type { Bucket } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useToast } from '../ui/use-toast'
import EditBucketModal from './EditBucketModal'
import BucketFunctions from '@/app/services/bucket.service'

interface BucketDescriptionCardProps {
  bucket: Bucket
  isModerator: boolean
  handleSave(bucket: Bucket): void
}

const BucketDescriptionCard: React.FC<BucketDescriptionCardProps> = ({ bucket, handleSave, isModerator }) => {
  const { toast } = useToast()
  const saveBucket = (title: string, description: string | null, isPublic: boolean, id: number) => {
    BucketFunctions.updateBucket(title, description, id, isPublic)
      .then((res) => {
        if (res) {
          handleSave(res) // Send updated bucket to parent component
          toast({
            title: 'Success',
            description: 'Bucket is updated successfully'
          })
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update bucket',
            variant: 'destructive'
          })
        }
      })
      .catch((e) => {
        toast({
          title: 'Error',
          description: e,
          variant: 'destructive'
        })
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
