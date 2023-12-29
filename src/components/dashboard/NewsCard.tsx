import React from 'react'
import Image from 'next/image'
import type NewsItem from '@/types/news'

interface NewsCardProps extends NewsItem {}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  companyName,
  datasourceName,
  timestamp,
  description,
  link,
  icon
}) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex w-full flex-col rounded border border-gray-300 p-4">
        <div className="mb-4 flex flex-col items-center">
          <div className="flex h-12 items-center justify-center">
            <Image src={icon} alt={companyName} width={50} height={50} />
          </div>
          <h2 className="mt-2 text-lg font-bold text-slate-800">{title}</h2>
        </div>
        <div className="mb-4 flex grow flex-wrap justify-between">
          <div className="w-full">
            <p className="text-sm text-gray-500">
              Company: <span className="font-bold">{companyName} </span>
            </p>
            <p className="text-sm text-gray-500">
              Datasource: <span className="font-bold">{datasourceName}</span>
            </p>
            <p className="mt-2 text-xs text-gray-500">Published: {timestamp}</p>
            <div className="h-44">
              <p className="mt-2 text-sm">
                {description.length > 300 ? description.substring(0, 300) + '...' : description}
              </p>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-blue-500 hover:underline"
            >
              Read full story here
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
