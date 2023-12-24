import { useEffect, useState, useContext } from 'react'
import type { Company } from '@prisma/client'
import { getSubscribedCompanies } from '@/services/company/companyService'
import { AuthContext, getAuthToken } from '@/lib/firebase/auth'

const useSubscribedCompanies = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<string[]>([])
  const user = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const token = await getAuthToken(user)
      if (!token) return
      const res: Company[] = await getSubscribedCompanies()
      const uniqueCompanies = Array.from(new Set(res.map((company: Company) => company.name)))
      setSubscribedCompanies(uniqueCompanies)
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [user])

  return subscribedCompanies
}

export default useSubscribedCompanies
