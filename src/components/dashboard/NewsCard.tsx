import React from 'react'
import Link from 'next/link'
import type NewsItem from '@/types/news'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NewsCardProps extends NewsItem {}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  id,
  companyName,
  datasourceName,
  bucketName,
  timestamp,
  measureName,
  measureValue,
  description
}) => {
  return (
    <Card className="rounded-lg border border-gray-700 bg-gray-900 shadow-lg transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-slate-800 hover:shadow-2xl">
      <CardHeader className="pb-3 pt-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Link href={`/companies/${id}`}>
              <CardTitle className="text-xl font-semibold text-gray-200 transition-colors duration-200 hover:text-white">
                {title}
              </CardTitle>
            </Link>
          </div>
          <div className="shrink-0">
            <Badge className="bg-indigo-600 px-3 py-1 text-white transition-all duration-200 hover:bg-indigo-500">
              {measureName}: {measureValue}
            </Badge>
          </div>
        </div>
        <CardDescription className="mt-2 text-gray-400">{datasourceName}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6 pt-3">
        <p className="text-gray-300">{description}</p>
      </CardContent>
      <CardFooter className="rounded-b-lg bg-slate-800 px-6 py-3 transition-colors duration-200 hover:bg-slate-700">
        <div className="flex space-x-4 text-sm text-gray-300">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Company:</span>
            <span className="text-white">{companyName}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Notification Date:</span>
            <span className="text-white">{timestamp}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Bucket:</span>
            <span className="text-white">{bucketName}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Trigger Factor:</span>
            <span className="text-white">7.0</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NewsCard
