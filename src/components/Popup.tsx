import { CheckCircleIcon } from '@heroicons/react/outline'
import { Callout } from '@tremor/react'
import { PopupENUM } from '@/types/popup'

export const Popup = ({ text, title, popupType }: { text: string; title: string; popupType: PopupENUM }) => {
  return (
    <div className="fixed bottom-0 right-0 m-6 w-96">
      <Callout title={title} icon={CheckCircleIcon} color={popupType === PopupENUM.ERROR ? 'red' : 'teal'}>
        {text}
      </Callout>
    </div>
  )
}
