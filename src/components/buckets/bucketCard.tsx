'use client'
import { Button, Badge } from '@tremor/react'
import Link from 'next/link'
import { EyeIcon, UserIcon } from '@heroicons/react/outline'
import type { Bucket } from '@/types/bucket'

export default function BucketCard({ bucket }: { bucket: Bucket }) {
  return (
    <div className="flex flex-col rounded-md border-2 border-solid p-4">
      <h2 className="text-xl font-medium">{bucket.title}</h2>
      {/* TODO: Add number of companies */}
      <p className="mb-2 text-sm">7 companies</p>
      <p className="mb-4 text-gray-400">{bucket.description}</p>
      <div className="flex justify-between">
        {/* TODO: Change to flex-row after 3xl */}
        <div className="flex flex-col gap-2">
          <Badge color={'gray'} size={'lg'} icon={EyeIcon}>
            1000 views
          </Badge>
          <Badge color={'gray'} icon={UserIcon}>
            5000 subscribers
          </Badge>
        </div>
        <div>
          <Button size="sm" variant="secondary">
            <Link href={'/buckets/' + bucket.id}>View more</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
