import React, { useState, useEffect, useContext } from 'react'
import { ArrowDown, ArrowUp, Link2Icon, PencilIcon } from 'lucide-react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { useToast } from '../ui/use-toast'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSources()
        setAllDataSources(data.dataSources)
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

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedValues(values)
  }

  const handleUnlinkDataSource = async (dataSourceId: string) => {
    await deleteCompanyDataSource(companyId, dataSourceId)
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource.dataSources)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDatasources(companydatasources)
    toast({
      title: `Datasource unlinked successfully`,
      description: 'You have successfully unlinked a datasource from this company'
    })
  }

  const handleAddDataSourceToCompany = async () => {
    await Promise.allSettled(
      selectedValues.map((dataSourceId: string) => addDatasourceToCompany(companyId, dataSourceId))
    )
    setSelectedValues([])
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource.dataSources)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDatasources(companydatasources)
    toast({
      title: `Datasource/s linked successfully`,
      description: 'You have successfully added a datasource to the company'
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <PencilIcon className="mr-2 h-4 w-4" />
          Configure Datasources
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-3/5 flex-col">
        <DialogHeader>
          <DialogTitle>Link/Unlink data sources with this company</DialogTitle>
          <DialogDescription>
            Select data sources to link with the company and manage linked data sources.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div className="w-64 pb-3">
            <MultiSelect onValueChange={handleMultiSelectChange} value={selectedValues}>
              {filteredDataSources?.map((datasource: CompanyDataSource, index) => (
                <MultiSelectItem key={index} value={String(datasource.id)}>
                  {datasource.sourceName}
                </MultiSelectItem>
              ))}
            </MultiSelect>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfigureDatasourcesModal
