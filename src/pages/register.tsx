import * as React from "react"
import Card from "@material-ui/core/Card"
import { HomeButton, LogoutButton } from "../components/shared/FabButton"
import { Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  DialogActions } from "@material-ui/core"
import MapCoordinateSelect from '../components/map/mapCoordinateSelect'
import { withFirebase, IFirebaseContext } from '../components/FirebaseContext'
import AuthContext, { WithAuth } from '../components/layouts/authContext'
import { navigate } from "gatsby"
import { Helmet } from 'react-helmet'


import THEME from "../theme"

const ContentArea = withFirebase(({firebase}: IFirebaseContext) => {
  const [coordinates, setCoordinates] = React.useState(null)
  const [name, setName] = React.useState('')
  const [ready, setReady] = React.useState(false)
  const [isAlreadyRegistered, setIsAlreadyRegistered] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitResult, setSubmitResult] = React.useState(null)

  let firstCall = true
  const ensureNotRegisteredOnMap = async () => {
    // prevent to call again firebase because this hook
    // will also be called anytime react update the component DOM
    if(!firstCall) return;
    firstCall = false
    const userUid = firebase.auth().currentUser.uid
    const snapshot = await firebase
      .firestore()
      .collection('makers')
      .where('userUid', '==', userUid)
      .get()
    if(snapshot.size == 0) setIsAlreadyRegistered(false)
    setReady(true)
  }
  React.useEffect(() => {
    // we can't move the code here because react don't want us to return a promise
    ensureNotRegisteredOnMap()
  })

  const coordinateChange = (newCoordinates) => {
    setCoordinates(newCoordinates)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!isAlreadyRegistered && ready && name && name.length && coordinates) {
      setIsSubmitting(true)
      try {
        const docRef = await firebase
          .firestore()
          .collection('makers')
          .add({
            name,
            lat: coordinates.lat,
            lng: coordinates.lng,
            userUid: firebase.auth().currentUser.uid
          })
        setIsSubmitting(false)
        setSubmitResult("\
          Coordonnées enregistrées. Merci."
        )
      } catch(e) {
        console.error('An error occured', e)
        setIsSubmitting(false)
        setSubmitResult("\
          Une erreur est survenue.\
          Merci de contacter l'administrateur de l'application."
        )
      }
    }
  }

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const MyDialog = () => {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleRedirect = () => {
      navigate('/')
    }
  
    return <Dialog
        open={isSubmitting || submitResult != null}
        TransitionComponent={Transition}
        keepMounted
        disableBackdropClick={!submitResult}
        disableEscapeKeyDown={!submitResult}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Enregistrement en cours"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {submitResult == null ? "Validation en cours ..." : submitResult}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedirect} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
  }

  if(!ready) {
    return <div style={{textAlign: "center"}}>Loading ...</div>
  } else {
    return <div>
      <h1
        style={{
          marginBottom: 30,
          marginTop: 0,
          marginLeft: 30,
          marginRight: 30,
          textAlign: "center",
        }}
      >
        S'enregistrer
      </h1>
      {isAlreadyRegistered ?
        <div>Désolé vous avez déjà enregistré un point sur cette carte!</div>
      :
        <div>
          <form onSubmit={handleSubmit}>
            <TextField required={true} name="name" label="Nom" helperText="Nom affiché sur la carte (min. 3 car)" onChange={nameChange}/>
            <MapCoordinateSelect onCoordinateChange={coordinateChange} />
            <Button type="submit" disabled={coordinates === null || name.length < 3 || isSubmitting}>Submit</Button>
          </form>
          <MyDialog />
        </div>
      }
    </div>
  }
})

const HeaderArea = withFirebase(({firebase, authenticated}) => {
  const goHome = () => navigate('/')
  const logout = () => firebase.auth().signOut()

  return <>
    <HomeButton onClickHandler={goHome} />
    {authenticated && <LogoutButton onClickHandler={logout} index={1} />}
  </>
})

const RegisterForm = () => (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>S'enregistrer</title>
        <link rel="canonical" href="http://imprimeurs3d-map.rudylacrete.fr" />
      </Helmet>
      <AuthContext>
        <div
          style={{
            backgroundColor: THEME.aboutPage.layout.backgroundColor,
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              maxWidth: THEME.aboutPage.layout.cardMaxWidth,
              margin: "0 auto",
              paddingTop: 40,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 40,
            }}
          >
            <HeaderArea />
            <Card style={{ padding: 50 }}>
              <WithAuth>
                <ContentArea />
              </WithAuth>
            </Card>
          </div>
        </div>
    </AuthContext>
  </>
)

export default RegisterForm
