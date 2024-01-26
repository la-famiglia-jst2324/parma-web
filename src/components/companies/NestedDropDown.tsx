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

interface NestedDropDownProps {
  measurements: CompanyMeasurement[]
  handleChange: (id: string, measurementName: string) => void
}

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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Measurement</Button>
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
                <DropdownMenuSubTrigger>{parentId}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {measurementGroups[parentId].map((measurement) => (
                      <DropdownMenuItem
                        key={measurement.id}
                        onClick={() => handleChange(String(measurement.id), measurement.measurementName)}
                      >
                        {measurement.measurementName}
                      </DropdownMenuItem>
                    ))}
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
