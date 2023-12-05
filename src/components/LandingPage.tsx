import React from 'react'

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="max-w-lg rounded bg-white p-10 text-gray-800 shadow-md">
        <h1 className="mb-4 bg-gradient-to-r from-slate-700 to-gray-500 bg-clip-text text-center text-6xl font-semibold text-transparent">
          Welcome to Parma AI
        </h1>
        <p className="mb-6 text-center text-xl text-gray-600">
          Your AI driven investing companion - Keep all your portfolio data in one place
        </p>
        <button
          className="block w-full rounded-full bg-indigo-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-indigo-600"
          onClick={() => (window.location.href = '/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default LandingPage
