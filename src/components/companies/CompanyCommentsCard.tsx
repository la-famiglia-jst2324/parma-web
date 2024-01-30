import React, { useContext, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import NestedDropDown from './NestedDropDown'
import { getAnalyticsDataForCompany } from '@/services/measurement/measurementService'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
  const companyName = companyData.name || ''
  const defaultMeasurement = measurements.find((measurement) => measurement.type !== 'nested') || {}
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>('')
  const { id, measurementName } = defaultMeasurement as CompanyMeasurement

  const handleMeasurementChange = async (value: string, measurementName: string) => {
    try {
      const data = await getAnalyticsDataForCompany(value, companyId)
      setComments(data)
      setSelectedMeasurement(measurementName)
    } catch (error) {
      console.error('Failed to get the measurement data:', error)
    }
  }

  useEffect(() => {
    if (id) {
      handleMeasurementChange(String(id), measurementName || '')
    } else {
      setComments([])
    }
  }, [id])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Comments</CardTitle>
            <p className="text-sm">Selected Measurement: {selectedMeasurement}</p>
          </div>
          <NestedDropDown measurements={measurements} handleChange={handleMeasurementChange} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-2 flex h-72 flex-wrap overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Sentiment Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment, index) => {
                const commentData = comment[companyName]
                let title = ''
                let sentimentScore = 0
                if (typeof commentData === 'object' && commentData !== null) {
                  title = (commentData as { value?: string }).value || ''
                  sentimentScore = (commentData as { sentimentScore?: number }).sentimentScore || 0
                }
                return (
                  <TableRow key={index}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell>{sentimentScore}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyCommentsCard
