'use client'

import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import type { Role } from '@prisma/client'
import { AuthContext } from '@/lib/firebase/auth'
import { fetchUserRole } from '@/lib/api'

require('@/lib/firebase/main')

const auth = getAuth()
auth.languageCode = 'en'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      fetchUserRole(firebaseUser)
        .then((role) => {
          setRole(role)
        })
        .catch((err) => {
          console.error(err)
          setRole(null)
        })
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={{ user, role }}>{children}</AuthContext.Provider>
}
