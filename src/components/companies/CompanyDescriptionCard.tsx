import React, { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import { ShowToast } from '../ShowToast'
import EditCompanyModal from './EditCompanyModal'
import { editCompany, getCompanyData } from '@/services/company/companyService'

interface CompanyDescriptionCardProps {
  companyId: string
}

const CompanyDescriptionCard: React.FC<CompanyDescriptionCardProps> = ({ companyId }) => {
  const { companyData, setCompanyData } = useContext(CompanyContext) as CompanyContextProps

  const handleEditCompany = async (name: string, description: string) => {
    try {
      await editCompany(companyId, name, description)
      const data = await getCompanyData(companyId)
      setCompanyData(data)
      ShowToast(`${data.name} edited successfully`)
    } catch (error) {
      ShowToast(`Unable to edit ${name}`, 'An error has occurred. Please try again')
    }
  }

  return (
    <Card className="mb-5">
      <CardHeader className="-mb-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Description</CardTitle>
          <EditCompanyModal
            companyName={companyData.name}
            companyDescription={companyData.description}
            handleSave={handleEditCompany}
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <p className="mb-2 text-sm">{companyData.description}</p>
      </CardContent>
    </Card>
  )
}

export default CompanyDescriptionCard
