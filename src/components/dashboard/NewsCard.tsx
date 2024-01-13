import React, { useState, useRef } from 'react'
import type NewsItem from '@/types/news'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface NewsCardProps extends NewsItem {}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
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
    <Card className="border border-gray-700 bg-gray-900 transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-slate-900">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{datasourceName}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 items-center gap-4 text-sm text-gray-300 md:grid-cols-4">
          <div className="flex flex-col items-center space-y-2">
            <Badge className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-blue-700">
              Notification Date
            </Badge>
            <div className="my-2 w-full border-b border-transparent"></div>
            <span className="text-white">{timestamp}</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Badge className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-blue-700">
              {measureName}
            </Badge>
            <div className="my-2 w-full border-b border-transparent"></div>
            <span className="text-white">{measureValue}</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Badge className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-blue-700">
              Bucket
            </Badge>
            <div className="my-2 w-full border-b border-transparent"></div>
            <span className="text-white">{bucketName}</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Badge className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white transition-colors duration-300 ease-in-out hover:bg-blue-700">
              Trigger Factor
            </Badge>
            <div className="my-2 w-full border-b border-transparent"></div>
            <span className="text-white">7.0</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Badge
          className="bg-indigo-600 transition-colors duration-200 ease-in-out hover:bg-indigo-700"
          variant="secondary"
        >
          {companyName}
        </Badge>
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleAccordion()
          }}
        >
          {isAccordionOpen ? 'Hide details' : 'Quick details'}
        </Button>
      </CardFooter>
      <div ref={contentRef} className={`${isAccordionOpen ? openClasses : closedClasses}`}>
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
