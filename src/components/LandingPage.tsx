import React from 'react'

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded bg-white p-8 text-gray-800 shadow-md">
        <h1 className="mb-4 text-center text-4xl font-extrabold">Welcome to ParmaAI</h1>
        <p className="mb-6 text-center text-lg text-gray-600">
          Your AI driven investing companion - See all your data in one place
        </p>
        <button
          className="block w-full rounded-full bg-gray-800 px-6 py-3 text-white transition duration-300 hover:bg-gray-700"
          onClick={() => (window.location.href = '/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default LandingPage
