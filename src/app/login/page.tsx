'use client'

import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import { useState } from 'react'
import type firebase from 'firebase/app'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authLogin } from '@/lib/firebase/auth'
import ErrorInfo from '@/components/authentication/ErrorInfo'

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      setError('')

      // Further form validation
      if (!email || !password) {
        setError('All fields are required')
        return
      }

      // Add timeout
      const timeoutId = setTimeout(() => {
        setError('Your request could not be processed. Please try again.')
        setLoading(false)
      }, 10000)

      try {
        await authLogin(email, password)
        // If successful, clear timeout and handle success (if needed)
        clearTimeout(timeoutId)
        // Handle successful login, redirect to the dashboard
      } catch (loginError) {
        clearTimeout(timeoutId)
        // Handle specific login errors
        if (loginError instanceof Error) {
          const errorCode = (loginError as firebase.FirebaseError).code
          if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found') {
            setError('Email or password is incorrect. Please try again.')
          } else if (errorCode === 'auth/invalid-email') {
            setError('The email address is not valid. Please provide a valid email address.')
          } else if (errorCode === 'auth/too-many-requests') {
            setError('Too many requests. Please try again later.')
          } else {
            setError('Login failed. Please try again.')
          }
        } else {
          setError('Login failed. Please try again.')
        }
      }
    } catch (error) {
      // Handle general errors
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
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
