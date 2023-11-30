import Link from 'next/link'
import { LibraryIcon, DatabaseIcon, TruckIcon, PresentationChartLineIcon, ServerIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
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
  )
}

export default Sidebar
