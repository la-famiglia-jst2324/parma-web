'use client'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/lib/firebase/auth'

const AuthCheck = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter()
    const user = useContext(AuthContext)

    useEffect(() => {
      // Redirect to login if user is not authenticated
      if (!user) {
        router.push('/login')
      }
    }, [user, router])

    return user ? <WrappedComponent {...props} /> : null
  }

  return WithAuth
}

export default AuthCheck
