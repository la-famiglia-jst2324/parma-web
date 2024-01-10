// src/lib/api/index.ts

import type { User } from 'firebase/auth'
import type { Role } from '@prisma/client'

export const fetchUserRoles = async (firebaseUser: User | null): Promise<Role[] | null> => {
  try {
    if (!firebaseUser) return null

    // Get user by authId
    const authId = await firebaseUser.getIdToken()

    const response = await fetch('/api/user/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authId}`
      }
    })

    const user = await response.json()

    return user?.role || null
  } catch (error) {
    console.error('Error fetching user roles:', error)
    return null
  }
}
