import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface PaginationProps {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50]
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage + 1)
  }

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    const newItemsPerPageNumber = parseInt(newItemsPerPage, 10)
    onItemsPerPageChange(newItemsPerPageNumber)
  }

  return (
    <div className="flex items-center justify-between bg-transparent p-4">
      <div className="flex-1 text-sm font-semibold">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 2)}
          disabled={currentPage === 1}
          className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200"
        >
          <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage)}
          disabled={currentPage * itemsPerPage >= totalItems}
          className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200"
        >
          <ChevronRightIcon className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
          className="rounded-md p-1 text-sm"
        >
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Pagination
