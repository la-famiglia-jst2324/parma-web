import React, { useState, useEffect } from 'react'
import { Link2Icon, PencilIcon } from 'lucide-react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { useToast } from '../ui/use-toast'
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
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [allDataSources, setAllDataSources] = useState<CompanyDataSource[]>([])
  const [filteredDataSources, setFilteredDataSources] = useState<CompanyDataSource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSourcesByCompanyId(companyId)
        setCompanyDataSources(data)
      } catch (error) {
        console.error('Failed to fetch data sources:', error)
      }
    }

    fetchData()
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSources()
        setAllDataSources(data)
      } catch (error) {
        console.error('Error fetching data sources:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (allDataSources && companyDataSources) {
      const filtered = allDataSources.filter((dataSource: CompanyDataSource) => {
        return !companyDataSources.some(
          (companyDataSource: CompanyDataSource) => companyDataSource?.id === dataSource?.id
        )
      })
      setFilteredDataSources(filtered)
    }
  }, [allDataSources, companyDataSources])

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedValues(values)
  }

  const handleUnlinkDataSource = async (dataSourceId: string) => {
    await deleteCompanyDataSource(companyId, dataSourceId)
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDataSources(companydatasources)
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
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDataSources(companydatasources)
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
      <DialogContent className={'max-h-screen overflow-y-scroll lg:max-w-screen-lg'}>
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
        {/* <div className="flex flex-wrap">
          {companyDataSources?.map((datasource: CompanyDataSource, index) => (
            <div key={index} className="p-1">
              <DatasourceHealth
                dataSourceId={String(datasource.id)}
                dataSourceName={datasource.sourceName}
                isDataSourceActive={datasource.isActive}
                handleUnlinkDataSource={handleUnlinkDataSource}
              />
            </div>
          ))}
        </div> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Datasource</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyDataSources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No data sources linked to this company
                </TableCell>
              </TableRow>
            ) : (
              companyDataSources.map((dataSource) => (
                <TableRow key={dataSource.id}>
                  <TableCell className="font-medium">{dataSource.sourceName}</TableCell>
                  <TableCell>{dataSource.healthStatus}</TableCell>
                  <TableCell>{dataSource.isActive === true ? 'YES' : 'NO'}</TableCell>
                  <TableCell>{dataSource.frequency}</TableCell>
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
