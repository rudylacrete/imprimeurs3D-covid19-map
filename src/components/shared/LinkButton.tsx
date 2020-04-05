import * as React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import THEME from "../../theme"

interface IPropsBtn {
  text: string,
  link: string
}

export default (props: IPropsBtn) => (
  <div style={{ textAlign: "right" }}>
    <Link to={props.link} style={{ textDecoration: "none" }}>
      <Button
        variant="outlined"
        style={{
          marginRight: 30,
          marginTop: 30,
          float: 'right',
          color: THEME.index.aboutButton.color,
          borderColor: THEME.index.aboutButton.borderColor,
          backgroundColor: THEME.index.aboutButton.backgroundColor,
          textTransform: "none",
          width: THEME.index.aboutButton.width,
        }}
      >
        {props.text}
      </Button>
    </Link>
  </div>
)
