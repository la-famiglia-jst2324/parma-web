'use client'

import type { User } from 'firebase/auth'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import React from 'react'
require('@/lib/firebase/main')

export const AuthContext = React.createContext<User | null>(null)

const auth = getAuth()
const googleAuthProvider = new GoogleAuthProvider()

export const googleAuthLogin = async () => {
  signInWithPopup(auth, googleAuthProvider).catch((error) => {
    console.log(error)
  })
}

export const authLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const authSignup = async (name: string, email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(user.user, {
    displayName: name
  })
}

export const authResetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email)
}

export const authLogout = async () => {
  await auth.signOut()
}
