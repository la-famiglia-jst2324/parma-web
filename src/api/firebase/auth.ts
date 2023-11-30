import admin from './main'

export const validateToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    throw new Error('Token validation failed')
  }
}
