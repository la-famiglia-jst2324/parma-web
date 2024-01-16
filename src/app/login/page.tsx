'use client'

import Link from 'next/link'
import { useState } from 'react'
import type firebase from 'firebase/app'
import { Button } from '@/components/ui/button'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import { authLogin } from '@/lib/firebase/auth'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
    console.log(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      // Further form validation
      if (!email || !password) {
        toast({
          title: 'All fields are required',
          description: 'Please fill out all fields',
          duration: 5000
        })
        return
      }

      // Add timeout
      const timeoutId = setTimeout(() => {
        toast({
          title: 'Login is taking too long',
          description: 'Please try again later',
          duration: 5000
        })
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
            toast({
              title: 'Login failed',
              description: 'Invalid email or password',
              duration: 5000
            })
          } else if (errorCode === 'auth/invalid-email') {
            toast({
              title: 'Login failed',
              description: 'Invalid email or password',
              duration: 5000
            })
          } else if (errorCode === 'auth/too-many-requests') {
            toast({
              title: 'Login failed',
              description: 'Too many requests. Please try again later.'
            })
          } else {
            toast({
              title: 'Login failed',
              description: 'Please try again later.',
              duration: 5000
            })
          }
        } else {
          toast({
            title: 'Login failed',
            description: 'Please try again later.',
            duration: 5000
          })
        }
      }
    } catch (error) {
      // Handle general errors
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Something went wrong.',
        duration: 5000
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center lg:p-8">
      <div className="space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">Please enter your login details to continue</p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="name@example.com" onChange={(e) => handleInputChange(e, setEmail)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="********" onChange={(e) => handleInputChange(e, setPassword)} />
            </div>
            <div className="text-xs font-semibold underline">
              <Link href="/forgot-password"> Forgot password?</Link>
            </div>

            <Button onClick={handleSubmit}>Login</Button>
            <div className="relative flex justify-center text-xs">
              Don't have an account?
              <div className="ml-2 font-semibold underline">
                <Link href="/signup"> Sign up</Link>
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
