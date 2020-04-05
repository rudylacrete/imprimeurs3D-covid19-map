import * as React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { IFirebaseContext, withFirebase } from "../FirebaseContext"
import { getUiConfig } from '../../firebase'

const signIn = (props: IFirebaseContext) => (
  <StyledFirebaseAuth
    uiConfig={getUiConfig(props.firebase)}
    firebaseAuth={props.firebase.auth()}
  />
)

export default withFirebase(signIn)
