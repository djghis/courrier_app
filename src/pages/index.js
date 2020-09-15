// import React from "react"
// import { Link } from "gatsby"
import React, { Component } from 'react'
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import QuoteInput from "../components/quote-input"
import BookingPage from './booking-page'

// const IndexPage = (props) => (
 
//  <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <div className='quote-input'>
//       <QuoteInput  props={props} />
//     </div>
//   </Layout>
// )

// export default IndexPage



class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickUpPostcode : '',
      dropOffPostcode: '',
      size: 'small',
      quoteAccepted: false,
    }
       
  }  
  

handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  onChangeValue = event => {
    this.setState({
      size: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
        quote: 50
    })
  }

  handleQuoteStatusChange = () => {
    this.setState(
      {quoteAccepted:  true}
      )
    }
  
  render() {
    return (
      <>
       <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        { !this.state.quoteAccepted ?
        <div className='quote-input'>
          <QuoteInput  handleInputChange={this.handleInputChange} onChangeValue={this.onChangeValue} handleSubmit={this.handleSubmit} handleQuoteStatusChange={this.handleQuoteStatusChange} quote={this.state.quote} />     
        </div>
        :
        <div>
          <BookingPage  bookingDetails={this.state}/>
        </div>
        }
      </Layout> 
      </>
    )
  }
}

export default IndexPage

