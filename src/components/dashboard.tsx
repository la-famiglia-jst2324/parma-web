'use client'

import {
  BellIcon,
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
        <div className="flex grow flex-col overflow-y-auto">
          <div className="mb-12">
            <Link href="/" className="cursor-pointer text-3xl font-extrabold text-white">
              ParmaAI
            </Link>
          </div>
          <span>{user ? 'Logged in as <' + user.displayName + '>' : ''}</span>
          <button
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
        <Link
          href="/settings"
          className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
        >
          <CogIcon className="h-6 w-6"></CogIcon>Settings
        </Link>
      </div>
      <div className="w-full">
        <div className="sticky top-0 flex items-center justify-end bg-white p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 rounded-md bg-light-gray p-3">
              <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
                3
              </span>
              <BellIcon className="cursor-pointer text-black"></BellIcon>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
