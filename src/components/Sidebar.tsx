import Link from 'next/link'
import { LibraryIcon, DatabaseIcon, TruckIcon, PresentationChartLineIcon, ServerIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import Image from 'next/image'
import { AuthContext, authLogin, authLogout } from '@/lib/firebase/auth'

const Sidebar = () => {
  const user = useContext(AuthContext)

  return (
    <div className="flex min-h-screen w-1/6 flex-col bg-primary">
      <div className="ml-4 flex grow flex-col overflow-y-auto">
        <div className="mb-6 mt-4">
          <Link href="/" className="cursor-pointer pt-6 text-3xl font-extrabold text-white">
            ParmaAI
          </Link>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <div className={`mr-3 flex space-x-2 ${user ? 'mb-2' : ''}`}>
            {user && (
              <>
                <div className="flex items-center space-x-2 rounded-full bg-white p-2">
                  <h1 className="text-sm font-medium text-gray-900">{user.displayName}</h1>
                </div>
              </>
            )}
          </div>
          <div className="ml-1 flex w-full">
            <button
              className={`w-55% flex items-center justify-start rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700`}
              onClick={async () => {
                if (user) {
                  await authLogout()
                } else {
                  await authLogin({ provider: 'google' })
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
  )
}

export default Sidebar
