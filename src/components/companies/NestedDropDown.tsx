import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

interface NestedDropDownProps {
  measurements: CompanyMeasurement[]
  handleChange: (id: string, measurementName: string) => void
}

interface CompanyMeasurement {
  id: number
  companyId?: number
  createdAt: string | Date
  measurementName: string
  modifiedAt: string | Date
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
}

const NestedDropDown: React.FC<NestedDropDownProps> = ({ measurements, handleChange }) => {
  const measurementGroups: { [key: string]: CompanyMeasurement[] } = {}

  measurements.forEach((measurement) => {
    const parentId = measurement.parentMeasurementId !== null ? String(measurement.parentMeasurementId) : 'null'
    if (!measurementGroups[parentId]) {
      measurementGroups[parentId] = []
    }
    measurementGroups[parentId].push(measurement)
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={measurements?.length === 0}>
          Select Measurement
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {measurementGroups.null &&
            measurementGroups.null.map((measurement) => (
              <DropdownMenuItem
                key={measurement.id}
                onClick={() => handleChange(String(measurement.id), measurement.measurementName)}
              >
                {measurement.measurementName}
              </DropdownMenuItem>
            ))}
          {Object.keys(measurementGroups)
            .filter((parentId) => parentId !== 'null')
            .map((parentId) => (
              <DropdownMenuSub key={parentId}>
                <DropdownMenuSubTrigger>{measurementGroups[parentId][0]?.measurementName}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {measurementGroups[parentId].length > 5 ? (
                      <ScrollArea className="h-56 w-48">
                        {measurementGroups[parentId].map((measurement) => (
                          <DropdownMenuItem
                            key={measurement.id}
                            onClick={() => handleChange(String(measurement.id), measurement.measurementName)}
                          >
                            {measurement.measurementName}
                          </DropdownMenuItem>
                        ))}
                      </ScrollArea>
                    ) : (
                      measurementGroups[parentId].map((measurement) => (
                        <DropdownMenuItem
                          key={measurement.id}
                          onClick={() => handleChange(String(measurement.id), measurement.measurementName)}
                        >
                          {measurement.measurementName}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NestedDropDown
