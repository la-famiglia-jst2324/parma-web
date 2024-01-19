import React from 'react'
import type { CalloutProps } from '@tremor/react'
import { Callout } from '@tremor/react'

interface PopupProps {
  showPopup: boolean
  title: string
  icon: React.ComponentType
  color: CalloutProps['color']
  description: string
}

const CompanyPopup: React.FC<PopupProps> = ({ showPopup, title, icon, color, description }) => {
  return (
    <div className={`fixed bottom-0 right-0 m-6 w-96 ${showPopup ? '' : 'hidden'}`}>
      {showPopup && (
        <Callout title={title} icon={icon} color={color}>
          {description}
        </Callout>
      )}
    </div>
  )
}

export default CompanyPopup
