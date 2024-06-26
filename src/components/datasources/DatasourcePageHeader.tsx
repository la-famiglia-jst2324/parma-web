import { WifiIcon, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  data: {
    sourceName: string
    isActive: boolean
  }
}

export const HeaderComponent: React.FC<HeaderProps> = ({ data }) => (
  <div className="mb-2 flex flex-col items-center justify-start space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
    <h1 className="text-2xl font-bold sm:text-3xl"> {data.sourceName} </h1>
    <Badge
      className={`${
        data.isActive ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-red-700 text-white hover:bg-red-800'
      } `}
    >
      {data.isActive ? <WifiIcon className="mr-2 h-5 w-5" /> : <WifiOff className="mr-2 h-5 w-5" />}
      {data.isActive ? 'Active' : 'Inactive'}
    </Badge>
  </div>
)
