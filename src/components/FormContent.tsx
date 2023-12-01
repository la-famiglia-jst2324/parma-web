import React from 'react'

interface FormContentProps {
  id: string
  label: string
  name: string
  placeholder: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormContent: React.FC<FormContentProps> = ({ id, name, label, placeholder, value, onChange }) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
        id={id}
        name={name}
        placeholder={`Please enter ${placeholder.toLowerCase()}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
