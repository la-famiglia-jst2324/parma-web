import { getAnalytics, isSupported } from 'firebase/analytics'
import { firebaseApp } from './main'

// only initialize analytics if run in browser
const analytics = isSupported().then((v) => {
  return v ? getAnalytics(firebaseApp) : null
})

export { analytics }
