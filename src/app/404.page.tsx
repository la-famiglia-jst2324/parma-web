import Link from 'next/link'
import React from 'react'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'

const Custom404: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
        <p className="mt-3 text-xl">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          className="mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </MainLayout>
  )
}

export default AuthCheck(Custom404)
