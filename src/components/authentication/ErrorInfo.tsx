import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Callout } from '@tremor/react'

export default function ErrorInfo({ msg }: { msg: string }) {
  return (
    <div className="mx-auto flex max-w-xs items-center justify-center overflow-auto">
      <div className="w-full">
        <Callout title="Oops! Something went wrong" color="red" icon={ExclamationCircleIcon}>
          {msg}
        </Callout>
      </div>
    </div>
  )
}
