import React from 'react'

interface CompanyCommentsCardItemProps {
  title: string
  timestamp: string
  sentimentScore: number
}

const CompanyCommentsCardItem: React.FC<CompanyCommentsCardItemProps> = ({ title, timestamp, sentimentScore }) => {
  const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(new Date(timestamp))

  return (
    <div className="my-3 flex">
      <div>
        <div className="font-bold">{title}</div>
        <div className="mt-1 text-xs">Timestamp: {formattedTimestamp}</div>
      </div>
      <div className="ml-auto">Sentiment Score: {sentimentScore}</div>
    </div>
  )
}

export default CompanyCommentsCardItem
