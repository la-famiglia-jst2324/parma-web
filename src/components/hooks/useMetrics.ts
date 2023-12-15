import { useEffect, useState } from 'react'
import type { SourceMeasurement } from '@prisma/client'
import { getMeasurements } from 'src/app/api/measurements'
import { getMeasurementsForCompanies } from '@/services/measurement/measurementService'

const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<SourceMeasurement[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res: SourceMeasurement[] = await getMeasurements()
        setMeasurements(res)
      } catch (error) {
        console.error('Failed to fetch measurements:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [])

  return measurements
}

const useMeasurementsCompanies = (companies: string[]) => {
  const [measurements, setMeasurements] = useState<SourceMeasurement[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res: SourceMeasurement[] = await getMeasurementsForCompanies(companies)
        setMeasurements(res)
      } catch (error) {
        console.error('Failed to fetch measurements:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [companies])

  return measurements
}

export { useMeasurements, useMeasurementsCompanies }
