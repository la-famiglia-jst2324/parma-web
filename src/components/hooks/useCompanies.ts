import { useEffect, useState, useContext } from 'react'
import type { Company } from '@prisma/client'
import { getAllCompanies } from '@/services/company/companyService'
import { AuthContext, getAuthToken } from '@/lib/firebase/auth'

const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const user = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const token = await getAuthToken(user)
      if (!token) return
      const data = await getAllCompanies(token)
      const uniqueCompanies = Array.from(new Set(data.map((company: Company) => company)))
      setCompanies(uniqueCompanies)
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [user])

  return companies
}

export default useCompanies
