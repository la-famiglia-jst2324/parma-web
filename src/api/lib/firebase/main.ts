import * as admin from 'firebase-admin'
import * as serviceAccount from '../../.secrets/la-famiglia-parma-ai-firebase-adminsdk.json'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
}

export default admin
