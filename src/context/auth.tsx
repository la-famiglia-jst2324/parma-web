'use client'

import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { AuthContext } from '@/lib/firebase/auth'

require('@/lib/firebase/main')

const auth = getAuth()
auth.languageCode = 'en'

const LOCAL_STORE_RECENTLY_LOGGED_IN = '__recently_logged_in'

const readAuthState = () => {
  try {
    return localStorage.getItem(LOCAL_STORE_RECENTLY_LOGGED_IN)
  } catch (e) {}
  return sessionStorage.getItem(LOCAL_STORE_RECENTLY_LOGGED_IN)
}

const writeAuthState = (value: string) => {
  try {
    localStorage.setItem(LOCAL_STORE_RECENTLY_LOGGED_IN, value)
  } catch (e) {
    console.warn('Local Storage is not supported in this environment.')
  }
  try {
    sessionStorage.setItem(LOCAL_STORE_RECENTLY_LOGGED_IN, value)
  } catch (e) {
    console.warn('Session Storage is not supported in this environment.')
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  /**
   * User: successfully logged in
   * 'pending': session state is being fetched
   * 'loading': has previously been logged in but firebase has not responded yet
   * null: not logged in
   */
  const [user, setUser] = useState<User | 'pending' | 'loading' | null>('pending')

  // access to localstorage avoiding ssr conflicts
  useEffect(() => {
    if (user === 'pending' && (window.localStorage || window.sessionStorage)) {
      setUser(readAuthState() === 'logged_in' ? 'loading' : null)
    }
  }, [user])

  // to avoid page flicker when user is logged in and reloads the page
  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      writeAuthState(firebaseUser ? 'logged_in' : 'logged_out')
    })
  }, [])

  // The pending state could cause some flickering for the instances where we cannot
  // retrieve sessionstorage / localstorage details within milliseconds
  // (as landing page has different color than the rest of the app)
  if (user === 'pending') return <> </>
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
