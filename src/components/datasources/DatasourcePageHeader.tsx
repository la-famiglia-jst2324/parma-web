import { WifiIcon } from '@heroicons/react/20/solid'

interface HeaderProps {
  data: {
    sourceName: string
    isActive: boolean
  }
}

export const HeaderComponent: React.FC<HeaderProps> = ({ data }) => (
  <div className="mb-2 flex items-center justify-start space-x-6">
    <h1 className="text-4xl font-bold"> {data.sourceName} </h1>
    <div
      className={`inline-flex items-center rounded-full px-2 py-1 text-sm ${
        data.isActive ? 'bg-blue-200 text-blue-700' : 'bg-red-200 text-red-700'
      }`}
    >
      <WifiIcon className="mr-2 h-5 w-5" />
      {data.isActive ? 'Active' : 'Inactive'}
    </div>
  </div>
)
