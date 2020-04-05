import * as React from "react"
import Layout from "../components/layouts/index-layout"
import Map from '../components/map/map'

class Index extends React.Component {
  render() {
    return (
      <Layout requireAuth={false}>
        <Map />
      </Layout>
    )
  }
}

export default Index
