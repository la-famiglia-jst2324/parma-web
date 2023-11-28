'use client'

import {
  CogIcon,
  DatabaseIcon,
  LibraryIcon,
  PresentationChartLineIcon,
  ServerIcon,
  TruckIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext, authLogin, authLogout } from '@/lib/firebase/auth'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const user = useContext(AuthContext)
  return (
    <div className="flex flex-row">
      <div className="sticky left-0 top-0 flex h-screen w-1/4 flex-col bg-primary">
        <div className="ml-4 flex grow flex-col overflow-y-auto">
          <div className="mb-12">
            <Link href="/" className="cursor-pointer text-3xl font-extrabold text-white">
              ParmaAI
            </Link>
          </div>
          <span className="text-white">{user ? 'Logged in as <' + user.displayName + '>' : ''}</span>
          <button
            className="mb-6 text-white"
            onClick={async () => {
              if (user) {
                await authLogout()
              } else {
                await authLogin({ provider: 'google' })
              }
            }}
          >
            {user ? 'Log Out' : 'Log In'}
          </button>
          <div className="flex flex-col text-white">
            <Link
              href="/"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight  hover:font-semibold"
            >
              <LibraryIcon className="h-6 w-6"></LibraryIcon>Dashboard
            </Link>
            <Link
              href="/buckets"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <DatabaseIcon className="h-6 w-6"></DatabaseIcon> Buckets
            </Link>
            <Link
              href="/companies"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <TruckIcon className="h-6 w-6"></TruckIcon>Companies
            </Link>
            <Link
              href="/analytics"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <PresentationChartLineIcon className="h-6 w-6"></PresentationChartLineIcon>Analytics
            </Link>
            <Link
              href="/datasources"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <ServerIcon className="h-6 w-6"></ServerIcon> Datasources
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="sticky top-0 z-50 flex items-center justify-end gap-4 bg-white p-4 shadow-lg">
          <div className=" mr-4 inline-flex h-9 w-32 items-center justify-center rounded-md bg-gray-200">
            <Link
              href="/settings"
              className="
                flex
                cursor-pointer
                flex-row
                items-center
                justify-center
                gap-3
                text-lg
                text-[#374151]
              "
            >
              <CogIcon className="w-6 text-[#374151]"></CogIcon>Settings
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
