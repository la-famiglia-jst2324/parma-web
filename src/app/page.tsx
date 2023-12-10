'use client'
import React, { useContext } from 'react'
import { AuthContext } from '@/lib/firebase/auth'
import Home from '@/components/Dashboard/Dashboard'
import LandingPage from '@/components/LandingPage'

export default function Page() {
  const user = useContext(AuthContext)

  return <>{user ? <Home /> : <LandingPage />}</>
}
