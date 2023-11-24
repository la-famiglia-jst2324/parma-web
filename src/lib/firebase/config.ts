/**
 * These dictionaries are used to configure the Firebase Client SDK. They
 * have to deliver to the client and are therefore not considered secrets!
 */

export const firebaseConfigProd = {
  apiKey: 'AIzaSyCful8nS8aiGScwuIpeq05QBSqUNwiOw80',
  authDomain: 'la-famiglia-parma-ai.firebaseapp.com',
  projectId: 'la-famiglia-parma-ai',
  storageBucket: 'la-famiglia-parma-ai.appspot.com',
  messagingSenderId: '447443547509',
  appId: '1:447443547509:web:ac85ae5bfe95010fd3cf3c',
  measurementId: 'G-DYDWHZ7CTY'
}

const firebaseConfigStaging = {
  apiKey: 'AIzaSyD3RMASKAUHpSBB7e-XVTzfbcNq7bW2VMs',
  authDomain: 'la-famiglia-parma-ai-staging.firebaseapp.com',
  projectId: 'la-famiglia-parma-ai-staging',
  storageBucket: 'la-famiglia-parma-ai-staging.appspot.com',
  messagingSenderId: '415876983122',
  appId: '1:415876983122:web:f5408f6df8e9a91075328b',
  measurementId: 'G-PEKBZ820P3'
}

export const firebaseConfig = process.env.NEXT_PUBLIC_ENV === 'production' ? firebaseConfigProd : firebaseConfigStaging
