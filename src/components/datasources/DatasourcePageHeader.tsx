import { WifiIcon, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  data: {
    sourceName: string
    isActive: boolean
  }
}

export const HeaderComponent: React.FC<HeaderProps> = ({ data }) => (
  <div className="mb-2 flex items-center justify-start space-x-6">
    <h1 className="text-3xl font-bold"> {data.sourceName} </h1>
    <Badge
      className={`${
        data.isActive ? 'bg-blue-500 text-blue-100 hover:bg-blue-700' : 'bg-red-500 text-red-100 hover:bg-red-700'
      }`}
    >
      {data.isActive ? <WifiIcon className="mr-2 h-5 w-5" /> : <WifiOff className="mr-2 h-5 w-5" />}
      {data.isActive ? 'Active' : 'Inactive'}
    </Badge>
  </div>
)
