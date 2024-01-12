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
          className="ml-1 mt-2 w-96 appearance-none rounded border bg-slate-800 leading-tight shadow focus:text-white focus:outline-none"
          type="text"
          id={id}
          name={name}
          placeholder={` ${placeholder.toLowerCase()}`}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
      ) : (
        <Textarea
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id={id}
          name={name}
          placeholder={`${placeholder.toLowerCase()}`}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}
