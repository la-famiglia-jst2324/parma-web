import { existsSync, readFileSync } from 'fs'

export const PROJECT_ID = '447443547509'

const certFilePath = '../../../src/api/.secrets/la-famiglia-parma-ai-secret-manager.json'

export const getGcpCertificate = () => {
  let certString = null
  if (existsSync(certFilePath)) {
    certString = readFileSync(certFilePath, 'utf8')
  } else {
    certString = process.env.GCP_SECRET_MANAGER_CERTIFICATE
  }
  if (!certString) {
    throw new Error('GCP_SECRET_MANAGER_CERTIFICATE not found')
  }
  return certString
}
