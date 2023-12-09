'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authSignup } from '@/lib/firebase/auth'
import ErrorInfo from '@/components/Authentication/ErrorInfo'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: further form validation
      // TODO: add timeout
      setError('')
      if (password !== confirm) {
        throw new Error('Passwords do not match')
      }
      await authSignup(name, email, password)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div>
        <h2 className="mb-3 text-5xl font-bold">Signup</h2>
        <p className="mb-3 text-base">Please enter your details to create an account</p>

        {error ? <ErrorInfo msg={error} /> : null}

        <div className="py-5">
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Name
            </label>
            <TextInput
              onValueChange={(val: string) => {
                setName(val)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email
            </label>
            <TextInput
              type="email"
              onValueChange={(val: string) => {
                setEmail(val)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Password
            </label>
            <TextInput
              type="password"
              onValueChange={(val) => {
                setPassword(val)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Confirm Password
            </label>
            <TextInput
              type="password"
              onValueChange={(val) => {
                setConfirm(val)
              }}
            />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <Link href="/forgot-password" className="text-base font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button onClick={() => handleSubmit()} loading={loading} size="lg" className="w-full" variant="primary">
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
