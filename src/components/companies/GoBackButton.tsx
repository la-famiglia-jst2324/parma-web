'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

const GoBackButton = () => {
  return (
    <Link href="/companies" passHref>
      <ArrowLeftIcon className="h-5 w-5" />
    </Link>
  )
}

export default GoBackButton
