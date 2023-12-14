import { useEffect, useState, useContext } from 'react'
import type { Company } from '@prisma/client'
import { getSubscribedCompanies } from '@/services/company/companyService'
import { AuthContext } from '@/lib/firebase/auth'

const useSubscribedCompanies = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<string[]>([])
  const [idToken, setIdToken] = useState<string | null>(null)

  const user = useContext(AuthContext)

  useEffect(() => {
    const setToken = async () => {
      if (user) {
        try {
          const token = await user.getIdToken()
          setIdToken(token)
        } catch (error) {
          console.error('Error fetching token:', error)
        }
      }
    }
    setToken()
  }, [user])

  useEffect(() => {
    ;(async () => {
      try {
        if (idToken) {
          const res: Company[] = await getSubscribedCompanies()
          const uniqueCompanies = Array.from(new Set(res.map((company: Company) => company.name)))
          setSubscribedCompanies(uniqueCompanies)
        }
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [idToken])

  return subscribedCompanies
}

export default useSubscribedCompanies
