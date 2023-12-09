'use client'
import { Button } from '@tremor/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Bucket } from '@prisma/client'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import BucketCard from '@/components/buckets/bucketCard'
import SearchInput from '@/components/buckets/searchInput'

async function getAllBuckets(name?: string) {
  try {
    const url = name ? `/api/bucket?name=${name}` : '/api/bucket'
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

// async function getMyBuckets() {
//   try {
//     const res = await fetch('/api/bucket/my', {
//       method: 'GET',
//       cache: 'no-cache'
//     })
//     if (!res.ok) {
//       console.log('Response status:', res.status)
//       throw new Error('HTTP response was not OK')
//     }
//     const json = await res.json()
//     return json
//   } catch (error) {
//     console.log('An error has occurred: ', error)
//   }
// }
export default function BucketsPage() {
  // Need an api call to get myBucketsß
  const myBuckets: Bucket[] = [
    {
      id: 1,
      title: 'Bucket 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 1,
      createdAt: new Date(),
      modifiedAt: new Date()
    },
    {
      id: 2,
      title: 'Bucket 2',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: false,
      ownerId: 2,
      createdAt: new Date(),
      modifiedAt: new Date()
    },
    {
      id: 3,
      title: 'Bucket 3',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 3,
      createdAt: new Date(),
      modifiedAt: new Date()
    }
  ]

  // Here we will manage the buckets that comes from backend
  const [allBuckets, setAllBuckets] = useState<Bucket[]>([])

  useEffect(() => {
    getAllBuckets()
      .then((res) => {
        setAllBuckets(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const filterBuckets = (data: string) => {
    getAllBuckets(data)
      .then((res) => {
        setAllBuckets(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="m-8 rounded-md bg-white p-8">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold">My Buckets</h1>
        <Button>
          <Link href={'/buckets/add-bucket'} className="flex items-center gap-0.5 text-white">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create new Bucket
          </Link>
        </Button>
      </div>
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {myBuckets.map((bucket) => (
          <BucketCard key={bucket.id} bucket={bucket} />
        ))}
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Search for trending buckets</h1>
        <SearchInput inputValue={filterBuckets} />
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {allBuckets.map((bucket) => (
            <BucketCard key={bucket.id} bucket={bucket} />
          ))}
        </div>
      </div>
    </div>
  )
}
