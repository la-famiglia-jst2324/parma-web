// SelectSection.tsx
import React, { useState } from 'react'
import { MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react' // Assuming you have these components

interface SelectSectionProps {
  title: string
  description: string
  placeholder: string
  options: string[]
  onValueChange: (values: string[]) => void
  isMultiSelect?: boolean
}

const SelectSection: React.FC<SelectSectionProps> = ({
  title,
  description,
  placeholder,
  options,
  onValueChange,
  isMultiSelect = true
}) => {
  const [value, setValue] = useState('')
  return (
    <div>
      <div className="pb-1 pt-6 font-bold">
        <h3>{title}</h3>
      </div>
      <div className="flex">
        <div>
          <h4 className="flex">{description}</h4>
        </div>
        <div className="absolute right-8 w-56 pb-3">
          {isMultiSelect ? (
            <MultiSelect placeholder={placeholder} onValueChange={onValueChange}>
              {options.map((option, index) => (
                <MultiSelectItem key={index} value={option}>
                  {option}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          ) : (
            <Select value={value} onValueChange={setValue}>
              {options.map((option, index) => (
                <SelectItem value={index.toString()}>{option}</SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectSection
