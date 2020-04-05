import * as React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { IFirebaseContext, withFirebase } from "../FirebaseContext"
import { uiConfig } from '../../firebase'

const signIn = (props: IFirebaseContext) => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={props.firebase.auth()}
  />
)

export default withFirebase(signIn)
