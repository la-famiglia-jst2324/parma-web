import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface FormContentProps {
  id: string
  label: string
  name: string
  placeholder: string
  value?: string
  type?: 'input' | 'textarea'
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  readonly?: boolean
}

export const FormContent: React.FC<FormContentProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  type,
  onChange,
  readonly
}) => {
  return (
    <div className="mb-4 flex-col justify-center">
      <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={id}>
        {label}
      </label>
      {type === 'input' ? (
        <Input
          type="text"
          id={id}
          name={name}
          placeholder={` ${placeholder.toLowerCase()}`}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
      ) : (
        <Textarea id={id} name={name} placeholder={`${placeholder.toLowerCase()}`} value={value} onChange={onChange} />
      )}
    </div>
  )
}
