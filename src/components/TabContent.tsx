import React from 'react'

interface TabContentProps {
  label: string
  activeTab: string
  children: React.ReactNode
}

export const TabContent: React.FC<TabContentProps> = ({ label, activeTab, children }) => {
  if (activeTab !== label) {
    return null
  }

  return (
    <div className="mt-4 rounded-md bg-white p-4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-600">{label}</h2>
      {children}
    </div>
  )
}
