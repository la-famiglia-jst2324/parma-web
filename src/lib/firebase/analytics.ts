import { getAnalytics } from 'firebase/analytics'
import { firebaseApp } from './main'

export const analytics = getAnalytics(firebaseApp)
