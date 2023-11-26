'use client'
import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const GoBackButton = () => {
  return (
    <Link href="/companies" passHref>
      <ArrowLeftIcon className="h-5 w-5" />
    </Link>
  )
}

export default GoBackButton
