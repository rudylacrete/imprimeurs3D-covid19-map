const config = {
/* firebase settings here */
}

let firebaseCache

export const getUiConfig = firebaseApp => ({
  signInFlow: 'popup',
  signInOptions: [
    firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseApp.auth.EmailAuthProvider.PROVIDER_ID,
  ],
})

const getFirebase = firebaseApp => {
  if (typeof window !== 'undefined') {
    if (firebaseCache) {
      return firebaseCache
    }

    firebaseApp.initializeApp(config)
    firebaseCache = firebaseApp
    return firebaseApp
  }

  return null;
}

export default getFirebase
