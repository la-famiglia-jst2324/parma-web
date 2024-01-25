import { useContext, useEffect, useState } from 'react'
import type { Bucket } from '@prisma/client'
import BucketFunctions from '@/app/services/bucket.service'
import { AuthContext, getAuthToken } from '@/lib/firebase/auth'

const useBuckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([])
  const user = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const token = await getAuthToken(user)
      if (!token) return
      const data = await BucketFunctions.getMyOwnBuckets(token)
      setBuckets(data)
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [user])
  return buckets
}

export default useBuckets
