import { useEffect, useState } from 'react'
import type { Bucket } from '@prisma/client'
import BucketFunctions from '@/app/services/bucket.service'

const useBuckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([])

  useEffect(() => {
    BucketFunctions.getMyOwnBuckets()
      .then((res) => {
        setBuckets(res)
      })
      .catch((error) => {
        console.error('Failed to fetch buckets', error)
      })
  }, [])

  return buckets
}

export default useBuckets
