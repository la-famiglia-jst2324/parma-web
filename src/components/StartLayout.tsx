import Head from 'next/head'
import type { ReactNode } from 'react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Parma UI' }) => {
  const pathname = usePathname() || ''

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {pathname === '/' && (
        <nav className="fixed z-10 flex h-14 w-full items-center justify-between bg-slate-900 p-6">
          <div className="flex items-center">
            <Image src="/ParmaLogo1.jpeg" width={40} height={40} alt="" className="rounded-full" />
            <h1 className="ml-4 text-2xl font-semibold text-white">Parma AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="rounded-full px-3 py-1 text-white">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-indigo-500 px-3 py-1 text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
      <main>{children}</main>
    </div>
  )
}

export default Layout
