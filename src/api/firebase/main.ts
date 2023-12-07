import { existsSync, readFileSync } from 'fs'
import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  const certFilePath = '../../.secrets/la-famiglia-parma-ai-firebase-adminsdk.json'
  let certString = null
  if (existsSync(certFilePath)) {
    certString = readFileSync(certFilePath, 'utf8')
  } else {
    certString = process.env.FIREBASE_ADMINSDK_CERTIFICATE
  }
  if (!certString) {
    throw new Error('FIREBASE_ADMINSDK_CERTIFICATE not found')
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(certString)),
    storageBucket: 'gs://la-famiglia-parma-ai-staging.appspot.com'
  })
}

export default admin
