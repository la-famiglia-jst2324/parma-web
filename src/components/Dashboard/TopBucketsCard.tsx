import Link from 'next/link'
import React from 'react'

interface TopBucketsCardProps {
  id: number
  name: string
  description: string
  numberOfCompanies: number
}

const TopBucketsCard: React.FC<TopBucketsCardProps> = ({ id, name, description, numberOfCompanies }) => {
  return (
    <div className="py-1">
      <div className="w-full rounded-b border-b border-gray-200 p-2">
        <h2 className="text-base font-bold">{name}</h2>
        <span className="mb-2 line-clamp-3 overflow-hidden text-xs text-gray-700">{numberOfCompanies} companies</span>
        <p className="mb-1 block text-sm">
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </p>
        <div className="flex justify-end">
          <Link
            href={`/buckets/${id}`}
            className="rounded-lg border-2 border-blue-500 px-2 py-1 text-xs text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBucketsCard
