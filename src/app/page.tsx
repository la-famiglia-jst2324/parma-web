'use client'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/lib/firebase/auth'
import Home from '@/components/Dashboard/Dashboard'
import LandingPage from '@/components/LandingPage'
import Spinner from '@/components/Spinner'

export default function Page() {
  const user = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user !== undefined && user !== null) {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return <Spinner />
  }

  return <>{user ? <Home /> : <LandingPage />}</>
}
