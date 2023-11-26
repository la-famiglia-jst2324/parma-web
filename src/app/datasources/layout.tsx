import 'react'
import './datasources.css'

export default function DatasourcesLayout({ children }: { children: React.ReactNode }) {
  return <div data-testid="datasources-layout">{children}</div>
}
