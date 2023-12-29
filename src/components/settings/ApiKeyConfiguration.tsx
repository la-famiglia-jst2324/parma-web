import React from 'react'
import { Button } from '@tremor/react' // Assuming you have a Button component

interface ApiKeyConfigurationProps {
  serviceName: string
  onConfigure: () => void // You can modify this as needed, e.g., to handle the actual configuration logic
}

const ApiKeyConfiguration: React.FC<ApiKeyConfigurationProps> = ({ serviceName, onConfigure }) => {
  return (
    <div>
      <div className="pt-6 font-bold">
        <h3>{serviceName}</h3>
      </div>
      <div>
        <div className="flex">
          <div>
            <h4 className="flex" style={{ textAlign: 'left' }}>
              Configure API key for {serviceName.toLowerCase()}
            </h4>
          </div>
          <div className="absolute right-8 w-[180px] p-2">
            <Button onClick={onConfigure}>Configure</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyConfiguration
