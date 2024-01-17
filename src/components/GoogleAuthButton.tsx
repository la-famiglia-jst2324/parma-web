'use client'
import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from './ui/button'
import { googleAuthLogin, AuthContext } from '@/lib/firebase/auth'

const GoogleAuthButton = () => {
  const handleLogin = async () => {
    await googleAuthLogin()
  }

  const user = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <Button onClick={handleLogin}>
      <Image src="/google.svg" alt="Google logo" width={24} height={24} />
      <span className="ml-4">Authenticate with Google</span>
    </Button>
  )
}

export default GoogleAuthButton
