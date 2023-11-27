'use client'

import React from 'react'
import Link from 'next/link'
import { TextInput, Callout, Button } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div>
        <h2 className="mb-4 text-4xl font-bold">Forgot your Password?</h2>
        <p className="mb-4">
          Please enter your email address and we will send you <br /> instructions to reset your password
        </p>
        <div className="max-w-md">
          <Callout className="mt-4" title="Please check your email" icon={CheckCircleIcon} color="teal">
            We have sent instructions on your given email to reset your password.
          </Callout>
        </div>
        <div className="py-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email
            </label>
            <TextInput onValueChange={() => {}} />
          </div>
        </div>
        <Button size="xl" className="w-full" variant="primary">
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
