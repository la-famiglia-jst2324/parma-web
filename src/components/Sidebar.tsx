import Link from 'next/link'
import { useContext } from 'react'
import {
  BuildingLibraryIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
  ServerIcon,
  TruckIcon
} from '@heroicons/react/20/solid'
import { AuthContext, authLogin, authLogout } from '@/lib/firebase/auth'

const Sidebar = () => {
  const contextType = useContext(AuthContext)
  const user = contextType?.user
  const roles = contextType?.roles

  return (
    <div className="flex min-h-screen w-1/6 flex-col bg-primary">
      <div className="ml-4 flex grow flex-col overflow-y-auto">
        <div className="mb-6 mt-4">
          <Link href="/" className="cursor-pointer pt-6 text-3xl font-extrabold text-white">
            ParmaAI
          </Link>
        </div>
        <span className="text-white">{user ? 'Logged in as <' + user.displayName + '>' : ''}</span>
        <span className="text-white">{roles ? `Roles <${roles.join(', ')}>` : ''}</span>
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
      </div>
    </div>
  )
}

export default Sidebar
