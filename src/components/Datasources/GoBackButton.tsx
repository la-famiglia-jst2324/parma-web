'use client'
import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const GoBackButton = () => {
  return (
    <Link href="/datasources" passHref>
      <div className="flex cursor-pointer flex-col items-center">
        <ArrowLeftIcon className="mb-1 h-5 w-5" />
      </div>
    </Link>
  )
}

export default GoBackButton
