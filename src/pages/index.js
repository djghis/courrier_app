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

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLatLong = this.getLatLong.bind(this)
       
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

  async handleSubmit(event){
    event.preventDefault()
    let distance
    const pickUpLatLong = await this.getLatLong(this.state.pickUpPostcode)
    const dropOffLatLong = await this.getLatLong(this.state.dropOffPostcode)
    this.getDistanceFromLatLonInKm(pickUpLatLong.lat, pickUpLatLong.long, dropOffLatLong.lat, dropOffLatLong.long).then(data=>distance=data)
    console.log('pickUpLatLong :>> ', pickUpLatLong);
    console.log('dropOffLatLong :>> ', dropOffLatLong);
    console.log('distance :>> ', distance);
    this.setState({
        quote: 50
    })
  }

  async getLatLong(postCode){
    postCode = postCode.replace(/\s/g, '')
    let result = {}
    const url= `http://api.getthedata.com/postcode/${postCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        result.lat = data.data.latitude
        result.long = data.data.longitude 
      });
      return result
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    console.log('lat1 :>> ', lat1);
    console.log('lon1 :>> ', lon1);
    console.log('lat2 :>> ', lat2);
    console.log('lon2 :>> ', lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    console.log('dlat :>> ', dLat);
    var dLon = this.deg2rad(lon2-lon1);
    console.log('dlon :>> ', dLon);
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
      console.log('a :>> ', a);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    console.log('c :>> ', c);
    var d = R * c // Distance in km
    console.log('d :>> ', d);
    return d;
  }
  
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
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

