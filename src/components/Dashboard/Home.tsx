'use client'
import React, { useContext, useEffect, useState } from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import Link from 'next/link'
import useSubscribedCompanies from '../hooks/useSubscribedCompanies'
import Spinner from '../Spinner'
import NewsCard from '@/components/Dashboard/NewsCard'
import type NewsItem from '@/types/news'
import TopBucketsCard from '@/components/Dashboard/TopBucketsCard'
import type TopBucket from '@/types/topBuckets'
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
  topBuckets: TopBucket[]
  news: NewsItem[]
}

export const Home = () => {
  const user = useContext(AuthContext)
  const [data, setData] = useState<DashboardData>({ topBuckets: [], news: [] })
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

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

  const subscribedCompanies = useSubscribedCompanies()

  const news = data.news as NewsItem[]
  const topBuckets = data.topBuckets as TopBucket[]

  if (!user) return <Spinner />

  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className="relative m-4 flex h-full min-h-screen w-2/3 flex-col justify-start rounded bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-2 flex flex-col items-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-700">Trending News</h1>
              <div className="absolute right-0 top-0 mr-4 mt-4 w-1/3">
                <MultiSelect placeholder="Filter companies" onValueChange={(values) => setSelectedCompanies(values)}>
                  {subscribedCompanies.map((companyName, index) => (
                    <MultiSelectItem key={index} value={companyName}>
                      {companyName}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {news
                .filter((item) => selectedCompanies.length === 0 || selectedCompanies.includes(item.companyName))
                .slice(0, 4)
                .map((item, index) => (
                  <NewsCard
                    key={index}
                    id={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    companyName={item.companyName}
                    datasourceName={item.datasourceName}
                    timestamp={item.timestamp}
                    link={item.link}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative m-4 flex h-full min-h-screen w-2/6 flex-col justify-start rounded bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-700">Top Buckets</h1>
              {topBuckets.length > 5 && (
                <Link href="/buckets" className="text-lg text-gray-500 underline">
                  See more
                </Link>
              )}
            </div>
            {topBuckets.slice(0, 7).map((item, index) => (
              <TopBucketsCard
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                numberOfCompanies={item.numberOfCompanies}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
