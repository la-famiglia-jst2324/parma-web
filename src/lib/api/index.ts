// src/lib/api/index.ts

import type { User } from 'firebase/auth'
import type { Role } from '@prisma/client'

export const fetchUserRole = async (firebaseUser: User | null): Promise<Role | null> => {
  try {
    if (!firebaseUser) return null

    const authId = await firebaseUser.getIdToken()

    const response = await fetch('/api/user/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authId}`
      }
    })

    const data = await response.json()
    return data.role || null
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}
