'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { authResetPassword } from '@/lib/firebase/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    let timeoutId: NodeJS.Timeout | null = null

    try {
      // further form validation
      if (!email) {
        toast({
          title: 'Please enter your email.',
          description: 'Please enter your email.',
          duration: 1000
        })
        return
      }

      // Add timeout
      timeoutId = setTimeout(() => {
        toast({
          title: 'Request is taking too long',
          description: 'Please try again later',
          duration: 5000
        })
      }, 10000)

      await authResetPassword(email)
      clearTimeout(timeoutId)
      timeoutId = null
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for further instructions.',
        duration: 5000
      })
    } catch (error) {
      toast({
        title: 'Error resetting password',
        description: 'Please try again',
        duration: 5000
      })
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
