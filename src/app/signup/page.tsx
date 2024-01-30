'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type firebase from 'firebase/app'
import { Button } from '@/components/ui/button'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authSignup } from '@/lib/firebase/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ShowToast } from '@/components/ShowToast'

export default function SignupPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!name || !email || !password || !confirm) {
        ShowToast('All fields are required', 'Please fill out all fields', 'destructive')
        return
      }

      if (password !== confirm) {
        ShowToast('Passwords do not match', 'Please try again', 'destructive')
        return
      }

      const timeoutId = setTimeout(() => {}, 10000)

      try {
        await authSignup(name, email, password)
        clearTimeout(timeoutId)
        ShowToast('Account created successfully', 'Please check your email to verify your account')
      } catch (signupError) {
        clearTimeout(timeoutId)

        if (signupError instanceof Error) {
          const errorCode = (signupError as firebase.FirebaseError).code
          if (errorCode === 'auth/email-already-in-use') {
            ShowToast('Email already in use', 'Please use a different email address or try logging in', 'destructive')
          } else if (errorCode === 'auth/weak-password') {
            ShowToast(
              'Password is too weak',
              'It must be at least 8 characters long and include a mix of letters, numbers, and symbols.',
              'destructive'
            )
          } else if (errorCode === 'auth/invalid-email') {
            ShowToast('Invalid email address', 'Please provide a valid email address.', 'destructive')
          } else {
            ShowToast('Signup failed', 'Please try again later.', 'destructive')
          }
        } else {
          ShowToast('Signup failed', 'Please try again later.', 'destructive')
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      ShowToast('Signup failed', error instanceof Error ? error.message : 'Something went wrong.', 'destructive')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center lg:p-8">
      <div className="space-y-6 sm:w-[350px] md:h-3/4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Your Account</h1>
          <p className="text-sm text-muted-foreground">Enter following details to create an account</p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input placeholder="Viet Le" onChange={(e) => handleInputChange(e, setName)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="name@example.com" onChange={(e) => handleInputChange(e, setEmail)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="********" onChange={(e) => handleInputChange(e, setPassword)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input type="password" placeholder="********" onChange={(e) => handleInputChange(e, setConfirm)} />
            </div>

            <Button onClick={handleSubmit}>Sign Up</Button>
            <div className="relative flex justify-center text-xs">
              Already have an account?
              <div className="ml-2 font-semibold underline">
                <Link href="/login"> Login</Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  )
}
