'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { authResetPassword } from '@/lib/firebase/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ShowToast } from '@/components/ShowToast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    let timeoutId: NodeJS.Timeout | null = null

    try {
      // further form validation
      if (!email) {
        ShowToast('Please enter your email.', 'Please enter your email', 'destructive')
        return
      }

      // Add timeout
      timeoutId = setTimeout(() => {
        ShowToast('Request is taking too long', 'Please try again later', 'destructive')
      }, 10000)

      await authResetPassword(email)
      clearTimeout(timeoutId)
      timeoutId = null
      ShowToast('Password reset email sent', 'Please check your email for further instructions.')
    } catch (error) {
      ShowToast('Error resetting password', 'Please try again', 'destructive')
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center lg:p-8">
      <div className="space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Reset your Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we will send you instructions to reset your password.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button onClick={handleSubmit}>Request password reset</Button>
            <div className="relative flex justify-center text-xs">
              <div className="ml-2 font-semibold underline">
                <Link href="/login">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
