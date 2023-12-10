'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  BuildingLibraryIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
  ServerIcon,
  TruckIcon
} from '@heroicons/react/20/solid'
import { AuthContext, authLogout } from '@/lib/firebase/auth'

const Sidebar = () => {
  const user = useContext(AuthContext)
  const router = useRouter()

  return (
    <div className="fixed z-10 flex min-h-screen w-64 flex-col bg-primary">
      <div className="ml-4 flex grow flex-col overflow-y-auto">
        <div className="mb-14 mt-4">
          <Link href="/" className="cursor-pointer pt-6 text-3xl font-extrabold text-white">
            ParmaAI
          </Link>
        </div>
        <div className="flex flex-col text-white">
          <Link
            href="/"
            className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight  hover:font-semibold"
          >
            <BuildingLibraryIcon className="h-6 w-6"></BuildingLibraryIcon>Dashboard
          </Link>
          <Link
            href="/buckets"
            className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
          >
            <CircleStackIcon className="h-6 w-6"></CircleStackIcon> Buckets
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
        <div className="ml-1 mt-40 flex w-full">
          <button
            className={`flex w-3/4 items-center justify-center rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700`}
            onClick={async () => {
              if (user) {
                await authLogout()
                router.push('/')
              }
            }}
          >
            {user ? (
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
                <span>Log Out</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Image src="google.svg" width={18} height={20} alt="Google Icon" />
                <span className="ml-2 text-xs">Sign in with Google</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
