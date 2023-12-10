import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="fixed z-10 flex h-14 w-full items-center justify-between bg-slate-900 p-6">
        <div className="flex items-center">
          <Image src="/parmalogo2.png" width={40} height={40} alt="" className="rounded-full" />
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
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-200">
        <div className="relative mb-8">
          <Image src="/parmalogo2.png" width={160} height={160} alt="Logo" className="rounded-full" />
        </div>
        <div className="max-w-lg rounded bg-white p-10 text-gray-800 shadow-md">
          <h1 className="mb-4 bg-gradient-to-r from-slate-700 to-gray-500 bg-clip-text text-center text-6xl font-semibold text-transparent">
            Welcome to Parma AI
          </h1>
          <p className="mb-6 text-center text-xl text-gray-600">
            Your AI-driven investing companion - Keep all your portfolio data in one place
          </p>
          <button
            className="block w-full rounded-full bg-indigo-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-indigo-600"
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
