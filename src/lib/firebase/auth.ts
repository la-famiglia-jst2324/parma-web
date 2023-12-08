'use client'

import type { User } from 'firebase/auth'
import { EmailAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import React from 'react'
import type { Role } from '@prisma/client'
require('@/lib/firebase/main')

type AuthContextType = {
  user: User | null
  roles: Role[] | null
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

const auth = getAuth()
const googleAuthProvider = new GoogleAuthProvider()
const mailAuthProvider = new EmailAuthProvider()

export const authLogin = async ({ provider }: { provider: 'google' | 'email' }) => {
  let authProvider = null
  switch (provider) {
    case 'google':
      authProvider = googleAuthProvider
      break
    case 'email':
      authProvider = mailAuthProvider
      break
    default:
      throw new Error('invalid provider')
  }

  signInWithPopup(auth, authProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log(credential)
      // TODO: we might need this in the future
      // const token = credential.accessToken;
      // const user = result.user;
    })
    .catch((error) => {
      console.log(error)
    })
}

export const authLogout = async () => {
  await auth.signOut()
}
