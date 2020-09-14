import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import QuoteInput from "../components/quote-input"

const IndexPage = (props) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
      <QuoteInput props={props} />
  </Layout>
)

export default IndexPage
