import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="fixed z-10 flex h-14 w-full items-center justify-between bg-zinc-900 p-6">
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
            className="rounded-full bg-white px-3 py-1 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
        <div className="relative mb-2">
          <Image src="/parmalogo2.png" width={160} height={160} alt="Logo" className="rounded-full" />
        </div>
        <div className="max-w-lg rounded p-8">
          <h1 className="mb-2 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-center text-8xl font-semibold text-transparent">
            Parma AI
          </h1>
          <p className="mb-6 text-center text-xl font-light text-slate-200">
            Your AI-driven investing companion - Keep all your portfolio data in one place
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
