import { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import { getSubscribedCompanies } from 'src/app/api/companies'

const useSubscribedCompanies = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res: Company[] = await getSubscribedCompanies()
        const uniqueCompanies = Array.from(new Set(res.map((company: Company) => company.name)))
        console.log('Subscribed companies:', uniqueCompanies)
        setSubscribedCompanies(uniqueCompanies)
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    })().catch((error) => console.error('Error in useEffect:', error))
  }, [])

  return subscribedCompanies
}

export default useSubscribedCompanies
