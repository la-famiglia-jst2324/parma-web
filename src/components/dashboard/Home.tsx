'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Spinner from '../Spinner'
import NewsCard from '@/components/dashboard/NewsCard'
import type NewsItem from '@/types/news'
import { AuthContext } from '@/lib/firebase/auth'

async function getDashboardData() {
  const res = await fetch('/api/dashboard', {
    method: 'GET',
    cache: 'no-cache'
  })

  if (!res.ok) {
    console.error('Response status:', res.status)
    throw new Error('HTTP response was not OK')
  }

  return await res.json()
}

interface DashboardData {
  news: NewsItem[]
}

export const Home = () => {
  const user = useContext(AuthContext)
  const [data, setData] = useState<DashboardData>({ news: [] })

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getDashboardData()
        setData(data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [])

  const news = data.news as NewsItem[]

  if (!user) return <Spinner />

  return (
    <main className="m-4 flex h-full flex-col items-start justify-start space-y-4" role="main">
      <h1 className="text-3xl font-semibold text-slate-200">Trending News</h1>
      <div className="grid w-full grid-cols-1 gap-4">
        {news.map((item, index) => (
          <Link href={`/companies/${item.id}`} key={index}>
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              companyName={item.companyName}
              datasourceName={item.datasourceName}
              bucketName={item.bucketName}
              measureName={item.measureName}
              measureValue={item.measureValue}
              timestamp={item.timestamp}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
