import React, { useState, useRef } from 'react'
import Link from 'next/link'
import type NewsItem from '@/types/news'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const contentRef = useRef(null)

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  const openClasses = 'max-h-96 overflow-auto transition-max-height duration-700 ease-in-out'
  const closedClasses = 'max-h-0 overflow-hidden transition-max-height duration-700 ease-out'

  return (
    <Card className="rounded-lg border border-gray-700 bg-gray-900 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-gray-400 hover:bg-slate-900">
      <CardHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Link href={`/companies/${id}`}>
              <CardTitle>{title}</CardTitle>
            </Link>
          </div>
          <div className="shrink-0">
            <Badge>
              {measureName}: {measureValue}
            </Badge>
          </div>
        </div>
        <CardDescription className="mt-2 text-gray-400">{datasourceName}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Notification Date:</span>
            <span className="text-white">{timestamp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Bucket:</span>
            <span className="text-white">{bucketName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Trigger Factor:</span>
            <span className="text-white">7.0</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-gray-700 p-4">
        <Badge>{companyName}</Badge>
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleAccordion()
          }}
          className="rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isAccordionOpen ? 'Hide details' : 'Quick details'}
        </Button>
      </CardFooter>

      <div
        ref={contentRef}
        className={`${
          isAccordionOpen ? openClasses : closedClasses
        } overflow-auto transition-all duration-700 ease-in-out`}
      >
        {isAccordionOpen && (
          <div className="border-t border-gray-700 p-4">
            <p className="text-gray-300">{description}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default NewsCard
