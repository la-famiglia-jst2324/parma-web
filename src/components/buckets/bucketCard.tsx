'use client'
import type { Bucket } from '@prisma/client'
import { Button } from '@tremor/react'
import Link from 'next/link'

export default function BucketCard({ bucket }: { bucket: Bucket }) {
  return (
    <div className="flex flex-col rounded-md border-2 border-solid p-4">
      <h2 className="text-xl font-medium">{bucket.title}</h2>
      <p className="mb-4 text-gray-400">{bucket.description}</p>
      <div className="flex justify-between">
        <div>
          <Button size="sm" variant="secondary">
            <Link href={'/buckets/' + bucket.id}>View more</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
