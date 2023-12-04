import { ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export const GoBackButton = ({ url }: { url: string }) => {
  return (
    <div>
      <Link href={url} passHref>
        <div className="flex cursor-pointer flex-col items-center">
          <ArrowLeftIcon className="mb-1 h-5 w-5" data-testid="arrow-left-icon" />
        </div>
      </Link>
    </div>
  )
}
