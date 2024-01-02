import { useEffect, useState } from 'react'
import type { Bucket } from '@prisma/client'
import BucketFunctions from '@/app/services/bucket.service'

const useBuckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([])

  useEffect(() => {
    BucketFunctions.getAllBuckets(1)
      .then((res) => {
        if (Array.isArray(res.buckets)) {
          const uniqueBuckets = Array.from(new Set(res.buckets.map((bucket: Bucket) => bucket))) as Bucket[]
          setBuckets(uniqueBuckets)
        } else {
          console.error('Expected an array but received', res)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch buckets', error)
      })
  }, [])

  return buckets
}

export default useBuckets
