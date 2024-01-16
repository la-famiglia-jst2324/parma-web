'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type firebase from 'firebase/app'
import { Button } from '@/components/ui/button'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authSignup } from '@/lib/firebase/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

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
    console.log(name, email, password, confirm)
    try {
      // Further form validation
      if (!name || !email || !password || !confirm) {
        toast({
          title: 'All fields are required',
          description: 'Please fill out all fields',
          duration: 5000
        })
        return
      }

      if (password !== confirm) {
        toast({
          title: 'Passwords do not match',
          description: 'Please make sure your passwords match',
          duration: 5000
        })
        return
      }

      // Add timeout for server response
      const timeoutId = setTimeout(() => {}, 10000)

      // Attempt signup
      try {
        console.log('signup')

        await authSignup(name, email, password)
        console.log('done')

        clearTimeout(timeoutId)
        toast({
          title: 'Your account has been created successfully. Please check your email to verify your account.',
          description: 'Please check your email to verify your account.',
          duration: 5000
        })
      } catch (signupError) {
        clearTimeout(timeoutId)
        // Handle specific signup errors
        if (signupError instanceof Error) {
          const errorCode = (signupError as firebase.FirebaseError).code
          if (errorCode === 'auth/email-already-in-use') {
            toast({
              title: 'Email already in use.',
              description: 'Please use a different email address or try to log in.',
              duration: 5000
            })
          } else if (errorCode === 'auth/weak-password') {
            toast({
              title:
                'Password is too weak. It must be at least 8 characters long and include a mix of letters, numbers, and symbols.',
              description: 'Please try again',
              duration: 5000
            })
          } else if (errorCode === 'auth/invalid-email') {
            toast({
              title: 'Invalid email address',
              description: 'Please provide a valid email address.',
              duration: 5000
            })
          } else {
            toast({
              title: 'Login failed.',
              description: 'Please try again',
              duration: 5000
            })
          }
        } else {
          toast({
            title: 'Signup failed.',
            description: 'Please try again',
            duration: 5000
          })
        }
      }
    } catch (error) {
      // Handle general errors
      toast({
        title: error instanceof Error ? error.message : 'Something went wrong.',
        description: 'Please try again',
        duration: 5000
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center lg:p-8">
      <div className="space-y-6 sm:w-[350px]">
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
