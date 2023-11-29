'use client'
import React, { useEffect, useState } from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import NewsCard from '@/components/Dashboard/NewsCard'
import type NewsItem from '@/types/news'

async function getTrendingNews() {
  try {
    const res = await fetch('/api/dashboard/news', {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    getTrendingNews()
      .then(setNews)
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
      })
  }, [])

  return (
    <main className="m-4 flex flex-row items-start justify-start space-x-4" role="main">
      <div className="relative m-4 flex min-h-screen w-2/3 flex-col justify-start rounded bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-2 flex flex-col items-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-[#374151]">Trending News</h1>
              <div className="w-1/3 pb-3">
                <MultiSelect placeholder="Filter companies" onValueChange={() => {}}>
                  <MultiSelectItem value="1">Tesla</MultiSelectItem>
                  <MultiSelectItem value="2">Amazon</MultiSelectItem>
                  <MultiSelectItem value="3">Microsoft</MultiSelectItem>
                </MultiSelect>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {news.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  company={item.companyName}
                  datasource={item.datasourceName}
                  timestamp={item.timestamp}
                  link={item.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative m-4 flex min-h-screen w-2/6 flex-col justify-start rounded bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-2 flex items-center justify-start space-x-4">
            <h1 className="m-6 text-3xl font-bold text-[#374151]">Top Buckets</h1>
            {/* TODO: Add Top Buckets component here */}
          </div>
        </div>
      </div>
    </main>
  )
}
