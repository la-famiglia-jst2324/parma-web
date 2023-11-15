import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DatabaseIcon, ServerIcon, LibraryIcon, TruckIcon, PresentationChartLineIcon, CogIcon, BellIcon } from '@heroicons/react/outline';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ParmaUI',
  description: 'Frontend for interaction with ParmaAI, a vc monitoring system'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          <div className="w-1/4 bg-primary p-8 md:p-12 flex flex-col h-screen sticky top-0 left-0">
            <div className='flex flex-col flex-grow overflow-y-auto'>
              <div className='mb-12'>
                 <Link href="/" className='font-extrabold text-3xl text-white cursor-pointer'>ParmaAI</Link>
              </div>
              <div className='flex flex-col text-white'>   
                <Link href="/" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight  hover:font-semibold'><LibraryIcon className='w-6 h-6'></LibraryIcon>Dashboard</Link>
                <Link href="/buckets" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight hover:font-semibold'><DatabaseIcon className='w-6 h-6'></DatabaseIcon> Buckets</Link>
                <Link href="/companies" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight hover:font-semibold'><TruckIcon className='w-6 h-6'></TruckIcon>Companies</Link>
                <Link href="/analytics" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight hover:font-semibold'><PresentationChartLineIcon className='w-6 h-6'></PresentationChartLineIcon>Analytics</Link>
                <Link href="/datasources" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight hover:font-semibold'><ServerIcon className='w-6 h-6'></ServerIcon> Datasources</Link>    
              </div>
            </div>
            <Link href="/settings" className='mb-6 flex flex-row gap-3 cursor-pointer text-lg font-extralight hover:font-semibold'><CogIcon className='w-6 h-6'></CogIcon>Settings</Link>
          </div>
          <div className='w-full'>
            <div className="sticky top-0 bg-white shadow-lg p-4 flex justify-end items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 p-3 bg-light-gray rounded-md">
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    3 
                  </span> 
                  <BellIcon className='text-black cursor-pointer'></BellIcon>
                </div>
                <img src="/next.svg" alt="Profile" className="h-10 w-10 rounded-full border-2 cursor-pointer border-gray-300" />
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
