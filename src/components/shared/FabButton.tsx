import * as React from "react"
import Fab from "@material-ui/core/Fab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'


import THEME from "../../theme"

const FabButton = ({ onClickHandler, index, children }) => (
  <Fab
    style={{
      position: "absolute" as any,
      marginTop: 20,
      marginLeft: 20 + index * 70,
      zIndex: 50,
      color: THEME.fabButton.color || "#059ce2",
      backgroundColor: THEME.fabButton.backgroundColor || "white",
    }}
    aria-label="Back"
    onClick={onClickHandler}
  >
    {children}
  </Fab>
)

export const BackButton = ({ onClickHandler, index = 0 }) => (
  <FabButton onClickHandler={onClickHandler} index={index}>
    <ArrowBackIcon />
  </FabButton>
)

export const LogoutButton = ({ onClickHandler, index = 0 }) => (
  <FabButton onClickHandler={onClickHandler} index={index}>
    <ExitToAppIcon />
  </FabButton>
)

export const HomeButton = ({ onClickHandler, index = 0 }) => (
  <FabButton onClickHandler={onClickHandler} index={index}>
    <HomeIcon />
  </FabButton>
)
