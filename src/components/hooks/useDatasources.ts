// useDatasources.ts
import { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import { getDataSourcesPagination as getDatasources } from '@/services/datasource/datasourceService'

const useDatasources = (currentPage: number, pageSize: number) => {
  const [data, setData] = useState<DataSource[] | null>(null)
  const [pagination, setPagination] = useState({ currentPage, pageSize, totalPages: 0, totalCount: 0 })

  useEffect(() => {
    getDatasources(pagination.currentPage, pagination.pageSize)
      .then((response) => {
        setData(response.datasources)
        setPagination(response.pagination)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [pagination.currentPage, pagination.pageSize])

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: newPage }))
  }

  const handleItemsPerPageChange = (newSize: number) => {
    setPagination((prevState) => ({ ...prevState, pageSize: newSize }))
  }

  return { data, pagination, handlePageChange, handleItemsPerPageChange }
}

export default useDatasources
