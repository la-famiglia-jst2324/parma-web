'use client'
import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/lib/firebase/auth'
import Spinner from '@/components/Spinner'

const AuthCheck = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter()
    const user = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const checkAuth = () => {
        setIsLoading(false)
        if (!user) {
          router.push('/login')
        }
      }

      if (user === null) {
        setIsLoading(true)
        return
      }

      checkAuth()
    }, [user, router])

    if ( isLoading ) {
        return <Spinner />
    }
    if ( user ) {
        return <WrappedComponent {...props} />
    }
    return null;
  }

  return WithAuth
}

export default AuthCheck
