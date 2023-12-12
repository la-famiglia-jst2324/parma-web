'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

const PerformancePanel = () => {
  return (
    <Link href="/companies" passHref>
      <div className="flex cursor-pointer flex-col items-center">
        <ArrowLeftIcon className="mb-1 h-5 w-5" />
      </div>
    </Link>
  )
}

export default PerformancePanel
