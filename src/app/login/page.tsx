'use client'

import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import { useState } from 'react'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authLogin } from '@/lib/firebase/auth'
import ErrorInfo from '@/components/Authentication/ErrorInfo'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: further form validation
      // TODO: add timeout
      setError('')
      await authLogin(email, password)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div>
        <h2 className="mb-4 text-6xl font-bold">Login</h2>
        <p className="mb-4">Please enter your login details to sign in</p>

        {error ? <ErrorInfo msg={error} /> : null}

        <div className="py-6">
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Password
            </label>
            <TextInput
              type="password"
              onValueChange={(val: string) => {
                setPassword(val)
              }}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Link href="/forgot-password" className="font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button onClick={() => handleSubmit()} loading={loading} size="xl" className="w-full" variant="primary">
          Login
        </Button>
        <p className="mt-4">
          Don't have an account?{' '}
          <span className="font-bold underline">
            <Link href="/signup">Create a free account</Link>
          </span>
        </p>
        <GoogleAuthButton />
      </div>
    </div>
  )
}
