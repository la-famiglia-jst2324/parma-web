import React, { useContext, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
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
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>(measurements[0]?.measurementName || '')
  const { companyData } = useContext(CompanyContext) as CompanyContextProps
  const companyName = companyData.name
  const defaultMeasurement = measurements[0]

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
    handleMeasurementChange(String(defaultMeasurement?.id), defaultMeasurement?.measurementName || '')
  }, [defaultMeasurement?.id, companyId])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Comments</CardTitle>
            <p className="text-sm">Selected Measurement: {selectedMeasurement}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Measurement</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {measurements.map((measurement) => (
                  <DropdownMenuItem
                    key={measurement.id}
                    onClick={() => handleMeasurementChange(String(measurement.id), measurement.measurementName)}
                  >
                    {measurement.measurementName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default CompanyCommentsCard
