'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import type firebase from 'firebase/app'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authSignup } from '@/lib/firebase/auth'
import ErrorInfo from '@/components/Authentication/ErrorInfo'

export default function SignupPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      setError('')

      // Further form validation
      if (!name || !email || !password || !confirm) {
        setError('All fields are required')
        return
      }

      if (password !== confirm) {
        setError('Passwords do not match')
        return
      }

      // Add timeout for server response
      const timeoutId = setTimeout(() => {
        setError('Your request could not be processed. Please try again.')
        setLoading(false)
      }, 10000)

      // Attempt signup
      try {
        await authSignup(name, email, password)
        clearTimeout(timeoutId)
        // Handle successful signup, redirect to the login page
      } catch (signupError) {
        clearTimeout(timeoutId)
        // Handle specific signup errors
        if (signupError instanceof Error) {
          const errorCode = (signupError as firebase.FirebaseError).code
          if (errorCode === 'auth/email-already-in-use') {
            setError('The provided email is already in use. Please use a different email address.')
          } else if (errorCode === 'auth/weak-password') {
            setError(
              'Password is too weak. It must be at least 8 characters long and include a mix of letters, numbers, and symbols.'
            )
          } else if (errorCode === 'auth/invalid-email') {
            setError('The email address is not valid. Please provide a valid email address.')
          } else {
            setError('Login failed. Please try again.')
          }
        } else {
          setError('Signup failed. Please try again.')
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
