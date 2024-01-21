import React from 'react'
import { SearchSelect, SearchSelectItem } from '@tremor/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CompanyCommentsCardItem from './CompanyCommentsCardItem'
// import { getAnalyticsDataForCompany } from '@/services/measurement/measurementService';

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

const getRandomTimestamp = () => {
  const date = new Date()
  return date.toISOString()
}

const getRandomSentimentScore = () => {
  return Math.floor(Math.random() * 10)
}

const generateRandomData = () => {
  const numberOfComments = 5

  const data = Array.from({ length: numberOfComments }, (_, index) => ({
    id: index + 1,
    title: `Comment ${index + 1}`,
    timestamp: getRandomTimestamp(),
    sentimentScore: getRandomSentimentScore()
  }))

  return data
}

const CompanyCommentsCard: React.FC<CompanyCommentsCardProps> = ({ companyId, measurements }) => {
  const randomData = generateRandomData()
  console.log(companyId)

  const handleMeasurementChange = async (value: string) => {
    console.log(value)
    // try {
    //   const data = await getAnalyticsDataForCompany(value, companyId)
    // } catch (error) {
    //   console.error('Failed to get the measurement data', error)
    // }
  }

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
          >
            {measurements?.map((measurement, index) => (
              <SearchSelectItem key={index} value={String(measurement.id)}>
                {measurement.measurementName}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        </div>
      </CardHeader>
      <CardContent>
        {randomData.map((comment) => (
          <CompanyCommentsCardItem
            key={comment.id}
            title={comment.title}
            timestamp={comment.timestamp}
            sentimentScore={comment.sentimentScore}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default CompanyCommentsCard
