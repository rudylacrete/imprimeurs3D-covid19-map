import * as firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const config = {
/* firebase conf here */
}

let firebaseCache

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseApp.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache
  }

  firebaseApp.initializeApp(config)
  firebaseCache = firebaseApp
  return firebaseApp
}

export default getFirebase
