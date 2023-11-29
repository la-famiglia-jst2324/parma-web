import React from 'react'

interface TabButtonProps {
  label: string
  activeTab: string
  handleTabClick: (label: string) => void
}

export const TabButton: React.FC<TabButtonProps> = ({ label, activeTab, handleTabClick }) => {
  return (
    <button
      className={`grow border-b-4 py-2 text-center ${
        activeTab === label ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
      } hover:text-blue-500`}
      onClick={() => handleTabClick(label)}
      role="button"
    >
      {label}
    </button>
  )
}
