import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'
import { useEffect, useState } from 'react'

// Dynamically import SwaggerUI with SSR disabled
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

const ApiDocs = () => {
  const [spec, setSpec] = useState(null)

  useEffect(() => {
    // Ensure the specification is fetched on the client-side only
    if (typeof window !== 'undefined') {
      fetch('/api/docs')
        .then((response) => response.json())
        .then(setSpec)
    }
  }, [])

  return <div>{spec && <SwaggerUI spec={spec} />}</div>
}

export default ApiDocs
