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
      prices: {
        small: 15,
        medium: 20,
        large: 25,
        pallet: 65,
      },
      validInput: {
        pickUpPostcode: false,
        dropOffPostcode: false
      }
    }
       
  }  
  

handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    if (value.length>1){
      console.log(value)
      if (!this.checkValidPostcode(event.target.value)){
        console.log('invalid postcode')
        this.setState(prevState => ({
          ...prevState,
          validInput: {
              ...prevState.validInput,
              [name]: true
          }
      }))
    } else {
      console.log('valid postcode')
        this.setState(prevState => ({
          ...prevState,
          validInput: {
              ...prevState.validInput,
              [name]: false
          }
      }))
    }
    this.setState({
      [name]: value,
    })
  }
}

  onChangeValue = event => {
    this.setState({
      size: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.checkValidPostcode(this.state.pickUpPostcode) && this.checkValidPostcode(this.state.dropOffPostcode)) {
      const quote = this.getQuote(this.state.size)
    this.setState({
        quote: quote
    })
    } else {
      this.setState({quote: 'invalid postcode'})
    }
  }

  getQuote = (size) => {
    return this.state.prices[size]
  }

  checkValidPostcode = (postcode) => {
    const x = postcode[1]
    let postcodeStart;
    if (x >= '0' && x <= '9') {
      postcodeStart = postcode[0].toUpperCase()
    } else {
      postcodeStart = postcode.slice(0,2).toUpperCase()
    }
    const validPostcode = ["BR", "CM","CR","DA","E","EC","EN","GU","HA","HP","IG","KT","N","NW","RM","SE","SL","SM","SS","SW","TN","TW","UB","W","WC","WD"]
    return validPostcode.includes(postcodeStart)
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
          <QuoteInput  handleInputChange={this.handleInputChange} onChangeValue={this.onChangeValue} handleSubmit={this.handleSubmit} handleQuoteStatusChange={this.handleQuoteStatusChange} quote={this.state.quote} validInput={this.state.validInput} />     
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

