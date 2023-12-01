'use client'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Button } from '@tremor/react'
import { useState } from 'react'
import BucketCard from '@/components/buckets/bucketCard'
import type { Bucket } from '@/types/bucket'
import SearchInput from '@/components/buckets/searchInput'

export default function BucketsPage() {
  const myBuckets: Bucket[] = [
    {
      id: 1,
      title: 'Bucket 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Bucket 2',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: false,
      ownerId: 2,
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Bucket 3',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 3,
      createdAt: new Date()
    }
  ]

  const allBucketsMock: Bucket[] = [
    {
      id: 1,
      title: 'Bucket 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Bucket 2',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: false,
      ownerId: 2,
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Bucket 3',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 3,
      createdAt: new Date()
    },
    {
      id: 4,
      title: 'Bucket 4',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: false,
      ownerId: 4,
      createdAt: new Date()
    },
    {
      id: 5,
      title: 'Bucket 5',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 5,
      createdAt: new Date()
    },
    {
      id: 6,
      title: 'Bucket 6',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: false,
      ownerId: 6,
      createdAt: new Date()
    },
    {
      id: 7,
      title: 'Bucket 7',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores ipsum eum quae ad architecto voluptatem illum name facere et!',
      isPublic: true,
      ownerId: 7,
      createdAt: new Date()
    }
  ]

  // Here we will manage the buckets that comes from backend
  const [allBuckets, setAllBuckets] = useState<Bucket[]>(allBucketsMock)

  const oldBuckets: Bucket[] = [...allBucketsMock]

  const filterBuckets = (data: string) => {
    if (data !== '') {
      setAllBuckets(oldBuckets.filter((bucket) => bucket.title.toLowerCase().includes(data.toLowerCase())))
    } else {
      setAllBuckets(oldBuckets)
    }
  }
  return (
    <div className="m-8 rounded-md bg-white p-8">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold">My Buckets</h1>
        <Button>
          <div className="flex items-center gap-0.5 text-white">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create new Bucket
          </div>
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
