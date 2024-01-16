import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
    <div className="flex items-center justify-between p-4">
      <div className="flex-1 text-sm font-semibold text-gray-200">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => handlePageChange(currentPage - 2)}
          disabled={currentPage === 1}
          className="rounded-full bg-transparent p-2 text-gray-200 transition-colors duration-200 hover:bg-gray-700"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage)}
          disabled={currentPage * itemsPerPage >= totalItems}
          className="rounded-full bg-transparent p-2 text-gray-200 transition-colors duration-200 hover:bg-gray-700"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium text-gray-200">Rows per page</p>
        <Select onValueChange={(value) => handleItemsPerPageChange(value)} value={itemsPerPage.toString()}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Pagination
