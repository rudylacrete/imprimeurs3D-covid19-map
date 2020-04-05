import * as React from 'react'

export interface IFirebaseContext {
  firebase: any,
  authenticated: Boolean
}

const FirebaseContext: React.Context<IFirebaseContext> = React.createContext(null)

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebaseContext => <Component {...props} {...firebaseContext} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
