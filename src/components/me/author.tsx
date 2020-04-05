import * as React from "react"
import { withPrefix, Link } from "gatsby"

import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import THEME from "../../theme"

interface IProps {
  title: string,
  author: {
    name: string
    image: string
    biography: string
  },
  about: string
}

export default ({ title, author, about }: IProps) => {
  return (
    <Grid
      container={true}
      justify="center"
      alignItems="center"
      direction={"column"}
    >
      <Link to="/">
        <Avatar
          style={{
            alignItems: "baseline",
            width: THEME.author.avatar.width,
            height: THEME.author.avatar.height,
          }}
          src={withPrefix(author.image)}
          alt={author.name}
        />
      </Link>
      <h1
        style={{
          color: THEME.author.title.color,
          fontSize: THEME.author.title.fontSize,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: THEME.author.desc.color,
          fontSize: THEME.author.desc.fontSize,
          maxWidth: THEME.author.desc.maxWidth,
          margin: "auto",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {about}
      </p>
    </Grid>
  )
}
