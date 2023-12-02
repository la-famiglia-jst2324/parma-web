'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const pathNames = (pathname ?? '/').split('/').filter((path) => path)

  const formatBreadcrumb = (string: string) => {
    return string.replace(/-/g, ' ').replace(/^[a-z]/, (letter) => letter.toUpperCase())
  }

  const currentPageName = pathname === '/' ? 'Dashboard' : ''

  return (
    <div>
      <h1 className="text-lg font-semibold">{currentPageName}</h1>
      <div className="flex flex-row space-x-2 text-sm text-gray-500">
        {pathNames.flatMap((value, index) => {
          const last = index === pathNames.length - 1
          const first = index === 0
          const to = `/${pathNames.slice(0, index + 1).join('/')}`

          return last
            ? [<span key={to}>{formatBreadcrumb(value)}</span>]
            : [
                <Link href={to} key={to} className={`${first ? 'font-semibold text-black' : ''} hover:underline`}>
                  {formatBreadcrumb(value)}
                </Link>,
                <span key={to + index}> / </span>
              ]
        })}
      </div>
    </div>
  )
}

export default Breadcrumbs
