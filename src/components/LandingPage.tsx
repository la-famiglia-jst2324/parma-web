import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="fixed z-10 flex h-14 w-full items-center justify-between bg-gray-900 p-6">
        <div className="flex items-center">
          <Image src="/logo_version_2.png" width={60} height={60} alt="" className="rounded-full" />
          <h1 className="ml-4 text-2xl font-bold text-white">Parma AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="rounded-full px-3 py-1 text-white">
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-white px-3 py-1 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 bg-[url('/bg3.png')] bg-cover">
        <div className="relative mb-2">
          <Image src="/logo_version_2.png" width={200} height={200} alt="Logo" className="rounded-full" />
        </div>
        <div className="max-w-lg rounded p-8">
          <h1
            className="mb-2 text-center text-6xl font-bold text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Parma AI
          </h1>
          <p
            className="mb-6 text-center text-xl font-medium text-slate-100"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Empower Your Investments with AI: Streamline, Monitor, and Thrive with All Your Portfolio Data Unified!
          </p>
          <button
            className="block w-full rounded-full bg-white px-6 py-3 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
            onClick={() => (window.location.href = '/login')}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}
export default LandingPage
