import React, { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useToast } from '../ui/use-toast'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import EditCompanyModal from './EditCompanyModal'
import { editCompany, getCompanyData } from '@/services/company/companyService'

interface CompanyDescriptionCardProps {
  companyId: string
}

const CompanyDescriptionCard: React.FC<CompanyDescriptionCardProps> = ({ companyId }) => {
  const { toast } = useToast()
  const { companyData, setCompanyData } = useContext(CompanyContext) as CompanyContextProps

  const handleEditCompany = async (name: string, description: string) => {
    try {
      await editCompany(companyId, name, description)
      const data = await getCompanyData(companyId)
      setCompanyData(data)
      toast({
        title: `Company ${data.name} edited successfully`,
        description: 'You have successfully edited this company'
      })
    } catch (error) {
      console.error('Error in editing the company:', error)
      toast({
        title: `Unable to edit ${name}`,
        description: 'An error occurred while editing this company! Please try again'
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Description</CardTitle>
          <EditCompanyModal
            companyName={companyData.name}
            companyDescription={companyData.description}
            handleSave={handleEditCompany}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{companyData.description}</p>
      </CardContent>
    </Card>
  )
}

export default CompanyDescriptionCard
