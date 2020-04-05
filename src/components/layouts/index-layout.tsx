import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Responsive from "react-responsive"
import { Helmet } from 'react-helmet'

import Author from "../me/author"
import LinkButton from "../shared/LinkButton"
import SocialNetworks from "../me/social-networks"
import CallToActionButton from "../me/calltoaction-button"
import THEME from "../../theme"

import AuthContext, { WithAuth } from './authContext'

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IDataProps {
  site: {
    siteMetadata: {
      title: string,
      author: {
        name: string
        image: string
        biography: string
      }
      networks: string[],
      about: string
    }
  }
}
interface IIndexProps {
  data: IDataProps
  styles: {
    paddingTop: number
    paddingBottom: number
  }
  children: React.ReactNode
}

interface IHeaderArea {
  data: IDataProps
  styles: {
    paddingTop: number
    paddingBottom: number
  }
}

interface ILayoutProps {
  children: any,
  requireAuth?: Boolean
}

const HeaderArea = ({ data, styles }: IHeaderArea) => (
  <div
    style={{
      backgroundImage: THEME.index.header.backgroundImage,
    }}
  >
    <LinkButton text="S'enregistrer" link="/register" />
    <div
      style={{
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
      }}
    >
      <Author {...data.site.siteMetadata} />
      <SocialNetworks networks={data.site.siteMetadata.networks} />
      <CallToActionButton />
    </div>
  </div>
)

const ContentArea = ({ children }: { children: React.ReactNode }) => (
  <div
    id={"children"}
    style={{
      flexGrow: 1,
      margin: "0 auto",
      padding: 10,
      paddingTop: 10,
    }}
  >
    {children}
  </div>
)

const IndexLayout = ({ data, styles, children }: IIndexProps) => (
  <div style={{ backgroundColor: THEME.index.layout.backgroundColor }}>
    <HeaderArea data={data} styles={styles} />
    <ContentArea children={children} />
  </div>
)

/*
      IndexLayoutWrapper
*/
export default ({ children, requireAuth = false }: ILayoutProps) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
              image
              biography
            }
            networks
            about
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: IDataProps) => (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data.site.siteMetadata.title}</title>
          <link rel="canonical" href="http://imprimeurs3d-map.rudylacrete.fr" />
        </Helmet>
        <AuthContext>
          <Default>
            <IndexLayout
              data={data}
              styles={{ paddingTop: 75, paddingBottom: 75 }}
            >
              {requireAuth ? <WithAuth>{children}</WithAuth> : children}
            </IndexLayout>
          </Default>
          <Mobile>
            <IndexLayout
              data={data}
              styles={{ paddingTop: 50, paddingBottom: 50 }}
            >
              {children}
            </IndexLayout>
          </Mobile>
        </AuthContext>
      </>
    )}
  />
)
