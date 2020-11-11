import React, { Component } from 'react'
// import { Link } from "gatsby"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import QuoteInput from "../components/quote-input"
import BookingPage from '../components/booking-page'


class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickUpPostcode : '',
      dropOffPostcode: '',
      size: '',
      quoteAccepted: false,
      prices: {
        small: 15,
        medium: 20,
        large: 25,
        pallet: 65,
      },
      dimensions: {
        small: 'Max size 35x45x60cm, 15kg',
        medium: 'Max size 45x60x56cm, 20kg',
        large: 'Max size 75x70x100cm, 35kg',
        pallet: 'Max size 1200x1000x2000cm, 350kg'
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

    postData = async (data) => {
      console.log('Post data')
      console.log('data :>> ', data);
      // Default options are marked with *
      const response = await fetch("https://b4luwwa3s7.execute-api.eu-west-1.amazonaws.com/dev/deliveries", {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
      })
      return response
    }

    handleBookingSubmit = (data) => {
      console.log('handleBookingSubmit')
      this.postData(data)
      .then(payload => {
        console.log('Booking Posted')
      })
    }
    
  render() {
    return (
      <>
       <Layout>
        <SEO title="Home" />
        { !this.state.quoteAccepted ?
        <div className='quote-input'>
          <QuoteInput  handleInputChange={this.handleInputChange} onChangeValue={this.onChangeValue} handleSubmit={this.handleSubmit} handleQuoteStatusChange={this.handleQuoteStatusChange} quote={this.state.quote} validInput={this.state.validInput} bookingDetails={this.state} />     
        </div>
        :
        <div>
          <BookingPage  bookingDetails={this.state} validInput={this.checkValidPostcode} handleBookingSubmit={this.handleBookingSubmit}/>
        </div>
        }
      </Layout> 
      </>
    )
  }
}

export default IndexPage

