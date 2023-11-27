'use client'

import React from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div>
        <h2 className="mb-4 text-6xl font-bold">Login</h2>
        <p className="mb-4">Please enter your login details to sign in</p>
        <div className="py-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Password
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex">
              <input type="checkbox" className="mr-2" />
              <p>Keep me logged in</p>
            </div>
            <Link href="/forgot-password" className="font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button size="xl" className="w-full" variant="primary">
          Login
        </Button>
        <p className="mt-4">
          Don't have an account?{' '}
          <span className="font-bold underline">
            <Link href="/signup">Create a free account</Link>
          </span>
        </p>
        <Button size="xl" className="mt-6 w-full" variant="secondary">
          Authenticate with Google
        </Button>
      </div>
    </div>
  )
}
