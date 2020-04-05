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
      firebase: getFirebase(),
      authenticated: false
    }
  }

  componentDidMount() {
    this.state.firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({ authenticated: false })
      } else {
        this.setState({ authenticated: true })
      }
    })
  }

  render() {
    return <FirebaseContext.Provider value={this.state}>
      {this.props.children}
    </FirebaseContext.Provider>
  }
}

export const WithAuth = ({children}) => (
  <FirebaseContext.Consumer>
    {({authenticated}) => authenticated ? children : <SignIn />}
  </FirebaseContext.Consumer>
)

export default AuthContext
