'use client'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../Spinner'
import { Label } from '../ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink
} from '../ui/pagination'
import NewsCard from '@/components/dashboard/NewsCard'
import type NewsItem from '@/types/news'
import { AuthContext } from '@/lib/firebase/auth'
import { getNewsItems } from '@/services/news/newsService'

interface DashboardData {
  newsItems: NewsItem[]
  pagination: {
    currentPage: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}

export const Home = () => {
  const user = useContext(AuthContext)
  const [data, setData] = useState<DashboardData>({
    newsItems: [],
    pagination: { currentPage: 0, pageSize: 0, totalCount: 0, totalPages: 0 }
  })

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      try {
        const newData = await getNewsItems(currentPage, 10)
        setData(newData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    })().catch((error) => console.error('Error while fetching the newsItems:', error))
  }, [currentPage])

  const news = data.newsItems as NewsItem[]
  const pagination = data.pagination

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage)
    }
  }

  const paginationItems = []
  for (let i = 1; i <= pagination.totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(i)
          }}
          className={currentPage === i ? 'bg-gray-800' : ''}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    )
  }

  if (!user) return <Spinner />

  return (
    <main className="m-4 flex h-full flex-col items-center justify-start space-y-4" role="main">
      <h1 className="-mt-4 py-5 text-center text-3xl font-semibold text-slate-200">Trending News</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 grid w-full max-w-4xl grid-cols-1 gap-4">
          {news && news.length > 0 ? (
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
            <div className="flex h-full flex-col items-center justify-center">
              <Label>There are currently no trending news or notification items.</Label>
              <Label className="mt-4 text-blue-500">
                Tip: Use <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>⌘</kbd> + <kbd>K</kbd> to open the command interface.
              </Label>
            </div>
          )}
        </div>
        {news && news.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage !== 1) {
                      handlePageChange(currentPage - 1)
                    }
                  }}
                  className={currentPage === 1 ? 'pointer-events-none cursor-default' : ''}
                />
              </PaginationItem>
              {paginationItems}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage !== pagination.totalPages) {
                      handlePageChange(currentPage + 1)
                    }
                  }}
                  className={currentPage === pagination.totalPages ? 'pointer-events-none cursor-default' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  )
}
