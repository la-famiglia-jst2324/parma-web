import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Callout } from '@tremor/react'

export default function SuccessInfo({ msg }: { msg: string }) {
  return (
    <div className="mx-auto flex max-w-xs items-center justify-center overflow-auto">
      <div className="w-full">
        <Callout title="Please check your email" icon={CheckCircleIcon} color="teal">
          {msg}
        </Callout>
      </div>
    </div>
  )
}
