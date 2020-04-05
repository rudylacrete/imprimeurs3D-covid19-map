import * as React from 'react'
import FirebaseContext, { IFirebaseContext, withFirebase} from '../FirebaseContext'
import getFirebase from '../../firebase'
import SignIn from '../signIn/signIn'

interface IAuthProps {
  children?: any,
}

class AuthContext extends React.Component<IAuthProps, IFirebaseContext> {
  constructor(props) {
    super(props)
    this.state = {
      firebase: null,
      authenticated: false
    }
  }

  componentDidMount() {
    // we dynamically import firebase libs to stay compatible
    // with SSR and production build process
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const firestore = import('firebase/firestore');
    Promise.all([app, auth, firestore]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({firebase})
      this.state.firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.setState({ authenticated: false })
        } else {
          this.setState({ authenticated: true })
        }
      })
    })
  }

  render() {
    return (
    <FirebaseContext.Provider value={this.state}>
      {this.props.children}
    </FirebaseContext.Provider>
    )
  }
}

const authComponentManager = ({firebase, authenticated, children}) => {
  if(firebase) {
    if(authenticated) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div style={{textAlign: 'center'}}>Merci de vous identifier</div>
          <SignIn />
        </React.Fragment>
      )
    }
  }
}

export const WithAuth = ({children}) => (
  <FirebaseContext.Consumer>
    {(context) => authComponentManager({...context, children})}
  </FirebaseContext.Consumer>
)

export default AuthContext
