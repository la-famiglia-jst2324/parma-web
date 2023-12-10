import React from 'react'
import { Button } from '@tremor/react'
import Link from 'next/link'

interface CompanyCardProps {
  id: string
  name: string
  description: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({ id, name, description }) => {
  return (
    <div className="h-full p-2">
      <div className="h-full w-full rounded border border-gray-300 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{name}</h2>
        </div>
        <p className="mb-4 line-clamp-3 overflow-hidden text-sm text-gray-700">{description}</p>
        <div className="flex justify-end">
          <Link href={`/companies/${id}`}>
            <Button size="xs" variant="secondary">
              View more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard
