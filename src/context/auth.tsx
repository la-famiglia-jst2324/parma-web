'use client'

import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { AuthContext } from '@/lib/firebase/auth'

require('@/lib/firebase/main')

const auth = getAuth()
auth.languageCode = 'en'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      firebaseUser
        ?.getIdToken()
        .then((token) => {
          localStorage.setItem('token', token)
        })
        .catch((e) => {
          console.log(e)
        })
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
