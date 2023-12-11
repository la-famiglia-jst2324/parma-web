import React from 'react'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...props }) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      type="submit"
      {...props}
    >
      {text}
    </button>
  )
}

export default CustomButton
