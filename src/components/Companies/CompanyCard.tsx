import React from 'react'
import Link from 'next/link'
import { BadgeDelta, Button } from '@tremor/react'

interface CompanyCardProps {
  name: string
  description: string
  activeDatasources: number
  inactiveDatasources: number
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, description, activeDatasources, inactiveDatasources }) => {
  return (
    <div className="p-2">
      <div className="w-full rounded border border-gray-300 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{name}</h2>
        </div>
        <p className="mb-4 line-clamp-3 overflow-hidden text-sm text-gray-700">{description}</p>
        <div className="mb-4 flex flex-wrap">
          <div className="px-1">
            <BadgeDelta deltaType="moderateIncrease">{`${activeDatasources} Active Datasources`}</BadgeDelta>
          </div>
          <div className="px-1">
            <BadgeDelta deltaType="moderateDecrease">{`${inactiveDatasources} Inactive Datasources`}</BadgeDelta>
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/companies/1">
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
