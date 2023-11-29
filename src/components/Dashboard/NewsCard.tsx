import React from 'react'

interface NewsCardProps {
  title: string
  company: string
  datasource: string
  timestamp: string
  description: string
  link: string
}

const NewsCard: React.FC<NewsCardProps> = ({ title, company, datasource, timestamp, description, link }) => {
  return (
    <div className="h-360 flex flex-col p-2">
      <div className="flex w-full flex-col rounded border border-gray-300 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="mb-4 flex grow flex-wrap justify-between">
          <div className="w-full">
            <p className="text-sm text-[#6B7280]">
              Company: <span className="font-bold">{company}</span>
            </p>
            <p className="text-sm text-[#6B7280]">
              Datasource: <span className="font-bold">{datasource}</span>
            </p>
            <p className="mt-2 text-xs text-[#6B7280]">Published: {timestamp}</p>
            <p className="mt-2 text-sm">
              {description.length > 400 ? description.substring(0, 400) + '...' : description}
            </p>
            <a href={link} className="mt-4 text-sm text-blue-500 hover:underline">
              Read full story here
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
