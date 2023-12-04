'use client'

import React from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import GoogleAuthButton from '@/components/GoogleAuthButton'

export default function SignupPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div>
        <h2 className="mb-4 text-6xl font-bold">Signup</h2>
        <p className="mb-4">Please enter your details to create an account</p>
        <div className="py-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Name
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Confirm Password
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
          Signup
        </Button>
        <p className="mt-4">
          Already have an account?{' '}
          <span className="font-bold underline">
            <Link href="/login">Login now</Link>
          </span>
        </p>
        <GoogleAuthButton />
      </div>
    </div>
  )
}
