import React, { useState, useEffect, useContext } from 'react'
import { ArrowDown, ArrowUp, Link2Icon, FileCog } from 'lucide-react'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import { MultiSelect } from '../ui/multi-select'
import { IdentifierModal } from '../datasources/Identifiers/IdentifierModal'
import { ShowToast } from '../ShowToast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  addDatasourceToCompany,
  deleteCompanyDataSource,
  getDataSources,
  getDataSourcesByCompanyId
} from '@/services/datasource/datasourceService'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ConfigureDatasourcesModalProps {
  companyId: string
}

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  frequency: string
  frequencyPattern: null | string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maxRunSeconds: number
  invocationEndpoint: string
  additionalParams: null | string
}

const ConfigureDatasourcesModal: React.FC<ConfigureDatasourcesModalProps> = ({ companyId }) => {
  const [allDataSources, setAllDataSources] = useState<CompanyDataSource[]>([])
  const [filteredDataSources, setFilteredDataSources] = useState<CompanyDataSource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const { companyDatasources, setCompanyDatasources } = useContext(CompanyContext) as CompanyContextProps

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSources()
        setAllDataSources(data.datasources)
      } catch (error) {
        console.error('Error fetching data sources:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (allDataSources && companyDatasources) {
      const filtered = allDataSources.filter((dataSource: CompanyDataSource) => {
        return !companyDatasources.some((companyDataSource) => companyDataSource?.id === dataSource?.id)
      })
      setFilteredDataSources(filtered)
    }
  }, [allDataSources, companyDatasources])

  const handleUnlinkDataSource = async (dataSourceId: string) => {
    await deleteCompanyDataSource(companyId, dataSourceId)
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource?.datasources)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDatasources(companydatasources)
    ShowToast('Success', 'Datasource unlinked successfully')
  }

  const handleAddDataSourceToCompany = async () => {
    await Promise.allSettled(
      selectedValues.map((dataSourceId: string) => addDatasourceToCompany(companyId, dataSourceId))
    )
    setSelectedValues([])
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource.datasources)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDatasources(companydatasources)
    ShowToast('Success', 'Datasources linked successfully')
  }

  const data = filteredDataSources?.map((datasource) => {
    return {
      value: String(datasource?.id),
      label: datasource.sourceName
    }
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <FileCog className="mr-2 h-4 w-4" />
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-3/5 flex-col sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Configure datasources with this company</DialogTitle>
          <DialogDescription>
            Link or unlink datasources with this company. You can also configure identifiers for each datasource
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div className="pb-3">
            <MultiSelect
              options={data}
              selected={selectedValues}
              onChange={setSelectedValues}
              placeholder="Select Datasources"
              width="w-96"
            />
          </div>
          <div className="pl-3">
            <Button onClick={handleAddDataSourceToCompany} disabled={selectedValues.length === 0}>
              <Link2Icon className="mr-2 h-4 w-4" />
              Link
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Datasource</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Identifiers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-h-96 items-start overflow-y-auto">
            {companyDatasources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No data sources linked to this company
                </TableCell>
              </TableRow>
            ) : (
              companyDatasources.map((dataSource) => (
                <TableRow key={dataSource.id}>
                  <TableCell className="font-medium">{dataSource.sourceName}</TableCell>
                  <TableCell>
                    {dataSource.healthStatus === 'UP' ? (
                      <ArrowUp className="text-lime-700" />
                    ) : (
                      <ArrowDown className="text-red-700" />
                    )}
                  </TableCell>
                  <TableCell>
                    {dataSource.frequency.charAt(0).toUpperCase() + dataSource.frequency.slice(1).toLowerCase()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleUnlinkDataSource(dataSource.id.toString())}
                    >
                      Unlink
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IdentifierModal companyId={companyId} datasourceId={dataSource.id.toString()} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default ConfigureDatasourcesModal
