import React, { useContext, useState, useEffect } from 'react'
import { SearchSelect, SearchSelectItem } from '@tremor/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import CompanyCommentsCardItem from './CompanyCommentsCardItem'
import { getAnalyticsDataForCompany } from '@/services/measurement/measurementService'

interface CompanyMeasurement {
  id: number
  companyId: number
  createdAt: string
  measurementName: string
  modifiedAt: string
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
}

interface CompanyCommentsCardProps {
  companyId: string
  measurements: CompanyMeasurement[]
}

interface Comment {
  date: string
  [key: string]:
    | {
        value: string
        sentimentScore: number
      }
    | string
}

const CompanyCommentsCard: React.FC<CompanyCommentsCardProps> = ({ companyId, measurements }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const { companyData } = useContext(CompanyContext) as CompanyContextProps
  const companyName = companyData.name
  const defaultMeasurement = String(measurements[0]?.id)

  const handleMeasurementChange = async (value: string) => {
    try {
      const data = await getAnalyticsDataForCompany(value, companyId)
      setComments(data)
    } catch (error) {
      console.error('Failed to get the measurement data', error)
    }
  }

  useEffect(() => {
    handleMeasurementChange(defaultMeasurement)
  }, [defaultMeasurement, companyId])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Comments</CardTitle>
          <SearchSelect
            onValueChange={handleMeasurementChange}
            placeholder={'Select comment measurement'}
            className="w-96"
            enableClear={false}
            value={defaultMeasurement}
          >
            {measurements.map((measurement, index) => (
              <SearchSelectItem key={index} value={String(measurement.id)}>
                {measurement.measurementName}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        </div>
      </CardHeader>
      <CardContent>
        {comments.map((comment, index) => {
          const commentData = comment[companyName]
          let title = ''
          let sentimentScore = 0
          if (typeof commentData === 'object' && commentData !== null) {
            title = (commentData as { value?: string }).value || ''
            sentimentScore = (commentData as { sentimentScore?: number }).sentimentScore || 0
          }
          return (
            <CompanyCommentsCardItem
              key={index}
              title={title}
              timestamp={comment.date}
              sentimentScore={sentimentScore}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CompanyCommentsCard
