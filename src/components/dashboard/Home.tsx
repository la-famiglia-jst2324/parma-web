'use client'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../Spinner'
import NewsCard from '@/components/dashboard/NewsCard'
import type NewsItem from '@/types/news'
import { AuthContext } from '@/lib/firebase/auth'
import { getNewsItems } from '@/services/news/newsService'

interface DashboardData {
  newsItems: NewsItem[]
}

export const Home = () => {
  const user = useContext(AuthContext)
  const [data, setData] = useState<DashboardData>({ newsItems: [] })

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getNewsItems()
        setData(data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [])

  const news = data.newsItems as NewsItem[]

  if (!user) return <Spinner />

  return (
    <main className="m-4 flex h-full flex-col items-center justify-start space-y-4" role="main">
      <h1 className="text-center text-3xl font-semibold text-slate-200">Trending News</h1>
      <div className="flex justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4">
          {news ? (
            news.map((item, index) => (
              <NewsCard
                key={index}
                id={item.id}
                title={item.title}
                companyId={item.companyId}
                description={item.description}
                companyName={item.companyName}
                dataSourceName={item.dataSourceName}
                notificationDate={item.notificationDate}
                triggerFactor={item.triggerFactor}
              />
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      </div>
    </main>
  )
}
