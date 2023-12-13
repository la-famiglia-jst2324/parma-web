import { useEffect, useState } from 'react'
import type { SourceMeasurement } from '@prisma/client'
import { getMeasurements } from 'src/app/api/measurements'

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

export default useMeasurements
