'use client'
import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
    <button
      className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100"
      onClick={handleLogin}
    >
      <Image src="/google.svg" alt="Google logo" width={24} height={24} />
      <span className="ml-4">Authenticate with Google</span>
    </button>
  )
}

export default GoogleAuthButton
