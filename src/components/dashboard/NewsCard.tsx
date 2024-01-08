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
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 md:grid-cols-4">
          <div>
            Notification Date
            <br />
            <span className="text-white">{timestamp}</span>
          </div>
          <div>
            {measureName}
            <br />
            <span className="text-white">{measureValue}</span>
          </div>
          <div>
            Bucket
            <br />
            <span className="text-white">{bucketName}</span>
          </div>
          <div>
            Trigger Factor
            <br />
            <span className="text-white">7.0</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Badge
          className="bg-green-600 transition-colors duration-200 ease-in-out hover:bg-green-700"
          variant="secondary"
        >
          {companyName}
        </Badge>
        <Button
          className="border border-gray-600 bg-gray-600 text-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:bg-gray-800"
          onClick={toggleAccordion}
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
