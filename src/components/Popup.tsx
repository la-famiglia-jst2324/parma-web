import { Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { PopupType } from '@/types/popup'

export const Popup = ({ text, title, popupType }: { text: string; title: string; popupType: PopupType }) => {
  return (
    <div className="fixed bottom-0 right-0 m-6 w-96">
      <Callout title={title} icon={CheckCircleIcon} color={popupType === PopupType.ERROR ? 'red' : 'teal'}>
        {text}
      </Callout>
    </div>
  )
}
