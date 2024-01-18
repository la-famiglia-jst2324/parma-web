'use client'

import { useContext } from 'react'
import Sidebar from '../Sidebar'
import LandingPage from '../LandingPage'
import Spinner from '../Spinner'
import Header from '../Header'
import { CommandInterface } from '../CommandInterface'
import StartLayout from './StartLayout'
import { AuthContext } from '@/lib/firebase/auth'

/**
 * Dashboard style layout with sidebar and navbar
 *
 * If the user is not logged in, they will be shown the landing page.
 */
function _AuthLayout({ children }: { children: React.ReactNode }) {
  const user = useContext(AuthContext)

  if (user === null) return <LandingPage />

  const content = user === 'loading' ? <Spinner /> : <>{children}</>

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <CommandInterface />
      <div className="flex w-full flex-col">
        <Header />
        <main className="grow p-4">{content}</main>
      </div>
    </div>
  )
}

/**
 * Multiplexer that chooses between the StartLayout and the AuthLayout depending on
 * page type. Pages that require authentication should use the AuthLayout.
 * Pages that do not require authentication (like login, signup, etc.) should use
 * the StartLayout.
 */
export const MainLayout = ({ children, auth }: { children: React.ReactNode; auth?: boolean }) => {
  if (auth === true || auth === undefined) return <_AuthLayout>{children}</_AuthLayout>
  else return <StartLayout>{children}</StartLayout>
}

export const MainLayoutWrapper = <P extends object>(WrappedComponent: React.ComponentType<P>, auth: boolean = true) => {
  const Wrapped: React.FC<P> = (props) => {
    if (auth === true || auth === undefined)
      return (
        <_AuthLayout>
          <WrappedComponent {...props} />
        </_AuthLayout>
      )
    else
      return (
        <StartLayout>
          <WrappedComponent {...props} />
        </StartLayout>
      )
  }
  return Wrapped
}
