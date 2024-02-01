import React from 'react'
import Link from 'next/link'
import type NewsItem from '@/types/news'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NewsCardProps extends NewsItem {}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  companyId,
  companyName,
  dataSourceName,
  notificationDate,
  triggerFactor,
  description
}) => {
  const date = new Date(notificationDate)
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  return (
    <Card className="rounded-lg border border-gray-800 bg-gray-900 shadow-lg">
      <CardHeader className="pb-3 pt-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Link href={`/companies/${companyId}`}>
              <CardTitle className="text-xl font-semibold text-gray-300 transition-colors hover:text-white">
                {title || 'No title available'}
              </CardTitle>
            </Link>
          </div>
          <div className="shrink-0">{triggerFactor && <Badge variant="indigo">{triggerFactor}</Badge>}</div>
        </div>
        <CardDescription className="mt-2 text-gray-500">
          Data source: {dataSourceName || 'No data source available'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6 pt-3">
        <p className="text-gray-400">{description || 'No description available'}</p>
      </CardContent>
      <CardFooter className="rounded-b-lg bg-gray-800 px-6 py-3">
        <div className="flex space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <span className="mr-1 text-gray-500">Company:</span>
            <span className="text-gray-300">{companyName || 'No company name'}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-500">Notification Date:</span>
            <span className="text-gray-300">{formattedDate || 'No date available'}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NewsCard
