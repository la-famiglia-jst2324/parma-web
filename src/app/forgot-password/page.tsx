'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TextInput, Button } from '@tremor/react'
import ErrorInfo from '@/components/authentication/ErrorInfo'
import { authResetPassword } from '@/lib/firebase/auth'
import SuccessInfo from '@/components/authentication/SuccessInfo'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    let timeoutId: NodeJS.Timeout | null = null

    try {
      // further form validation
      if (!email) {
        setError('Please enter your email.')
        return
      }

      // Add timeout
      timeoutId = setTimeout(() => {
        setError('Your request could not be processed. Please try again.')
        setLoading(false)
      }, 10000)

      await authResetPassword(email)
      clearTimeout(timeoutId)
      timeoutId = null
      setError('')
      setSuccess('We have sent instructions on your given email to reset your password.')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div>
        <h2 className="mb-4 text-4xl font-bold">Forgot your Password?</h2>
        <p className="mb-4">
          Please enter your email address and we will send you <br /> instructions to reset your password
        </p>

        {error ? (
          <div className="mt-5">
            <ErrorInfo msg={error} />
          </div>
        ) : null}
        {success ? (
          <div className="mt-5">
            <SuccessInfo msg={success} />
          </div>
        ) : null}

        <div className="py-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email
            </label>
            <TextInput
              type="email"
              onValueChange={(val) => {
                setEmail(val)
              }}
            />
          </div>
        </div>
        <Button onClick={() => handleSubmit()} loading={loading} size="xl" className="w-full" variant="primary">
          Request reset link
        </Button>
        <p className="mt-4 text-center">
          <Link className="font-bold underline" href="/login">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
