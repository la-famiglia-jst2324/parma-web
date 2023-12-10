'use client'

import React from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import GoogleAuthButton from '@/components/GoogleAuthButton'

export default function SignupPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div>
        <h2 className="mb-3 text-5xl font-bold">Signup</h2>
        <p className="mb-3 text-base">Please enter your details to create an account</p>
        <div className="py-5">
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Name
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Password
            </label>
            <TextInput type="password" onValueChange={() => {}} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Confirm Password
            </label>
            <TextInput type="password" onValueChange={() => {}} />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex">
              <input type="checkbox" className="mr-2" />
              <p className="text-base">Keep me logged in</p>
            </div>
            <Link href="/forgot-password" className="text-base font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button size="lg" className="w-full" variant="primary">
          Signup
        </Button>
        <p className="mt-2 text-base">
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
