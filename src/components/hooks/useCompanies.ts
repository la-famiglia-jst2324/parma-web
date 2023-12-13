import { useEffect, useState, useContext } from 'react'
import type { Company } from '@prisma/client'
import { getAllCompanies } from 'src/app/api/companies'
import { AuthContext } from '@/lib/firebase/auth'

const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([])
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
          const data = await getAllCompanies(idToken)
          setCompanies(data)
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [])

  return companies
}

export default useCompanies
