import React, { Component } from 'react'
import PlacesAutocomplete from './google-autocomplete'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     pickUp: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postcode: this.props.bookingDetails.pickUpPostcode,
      city: '',
      date: '', 
      },
     customerDetails: {
      name: '',
      phoneNumber: '',
      emailAddress: '',
     },
     dropOff: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postcode: this.props.bookingDetails.dropOffPostcode,
      city: '',
      date: '', 
      },
     recipient: {
        name: '',
        phoneNumber: '',
        emailAddress: '',
      },
     details: {
        size: this.props.bookingDetails.size,
        weight: 0,
        comment: '',
        referenceNumber: '',
        fragile: false,
      }
    }
  }

 
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    const section = target.getAttribute('section')
    this.setState(prevState => ({
      ...prevState,
      [section]: {
          ...prevState[section],
          [name]: value
      }
  }))
  }

  getAddressLine = (arr) => {
    let line = arr.shift()
    return line ? line : ""
  }

  handlePickupSelect = (address, postcode) => {
    let addressArray = address.split(", ");
    console.log('addressArray :>> ', addressArray);
    addressArray.pop()
    let city = addressArray.pop()
    let address1 = this.getAddressLine(addressArray)
    let address2 = this.getAddressLine(addressArray)
    let address3 = this.getAddressLine(addressArray)
    let address4 = this.getAddressLine(addressArray)
    
   this.setState(prevState => ({
     ...prevState,
     pickUp: {
         ...prevState['pickUp'],
         address1: address1,
         address2: address2,
         address3: address3,
         address4: address4,
         city: city,
         postcode: postcode
     }
    }))
  }

  // changePostcode = (postcode, pickOrDrop)  => {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     [pickOrDrop]: {
  //         ...prevState[pickOrDrop],
  //         postcode: postcode,
  //     }
  //    }))
  // }

  handleDropOffSelect = (address, postcode) => {
    let addressArray = address.split(", ");
    console.log('addressArray :>> ', addressArray);
    addressArray.pop()
    let city = addressArray.pop()
    let address1 = this.getAddressLine(addressArray)
    let address2 = this.getAddressLine(addressArray)
    let address3 = this.getAddressLine(addressArray)
    let address4 = this.getAddressLine(addressArray)
    this.setState(prevState => ({
     ...prevState,
     dropOff: {
         ...prevState['dropOff'],
         address1: address1,
         address2: address2,
         address3: address3,
         address4: address4,
         city: city,
         postcode: postcode
     }
    }))
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

  handleFragileChange = (event) => {
    let details = this.state.details
    details.fragile = !details.fragile
    this.setState({details: details})
  }
  

  

  render() {
    // const dimensions = `max size: Small: ${this.props.bookingDetails.dimensions.small} \n \n  Medium: ${this.props.bookingDetails.dimensions.medium}  \n \n  Large: ${this.props.bookingDetails.dimensions.large}  \n \n  Pallet: ${this.props.bookingDetails.dimensions.pallet}`
      const dimensions =  <div>
      <p className="dimensions-popup">Max Size: </p>
      <p className="dimensions-popup">Small: {this.props.bookingDetails.dimensions.small}</p>
      <p className="dimensions-popup">Medium: {this.props.bookingDetails.dimensions.medium}</p>
      <p className="dimensions-popup">Large: {this.props.bookingDetails.dimensions.large}</p>
      <p className="dimensions-popup">Pallet: {this.props.bookingDetails.dimensions.pallet}</p>
    </div>
   
    return (
      <>
      <form onSubmit={this.handleSubmit} className="booking-form">
        <div className="inputs">
        <div className="pickup-input">
          <h2>Pick up Details</h2>
            <h3>Customer Details</h3>
              <label>Name:
                  <input type="text" id="name" name="name" section="customerDetails" value={this.state.customerDetails.name}
                  onChange={this.handleInputChange} required />
              </label><br/>
              <label>Phone Number:
                  <input type="tel" id="phoneNumber" name="phoneNumber" section="customerDetails" value={this.state.customerDetails.phoneNumber}
                  onChange={this.handleInputChange} required   />
              </label><br/>
              <label>Email address:
                  <input type="email" id="emailAddress" name="emailAddress" section="customerDetails" value={this.state.customerDetails.emailAddress}
                  onChange={this.handleInputChange} required  />
              </label><br/>

              <PlacesAutocomplete handleAddressSelect={this.handlePickupSelect} className="google-input"/>

              <label>Address line 1:
                  <input type="text" id="address1" name="address1" section="pickUp" value={this.state.pickUp.address1}
                  onChange={this.handleInputChange} required />
              </label><br/>
              <label>Address line 2:
                  <input type="text" id="address2" name="address2" section="pickUp" value={this.state.pickUp.address2}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>Address line 3:
                  <input type="text" id="address3" name="address3" section="pickUp" value={this.state.pickUp.address3}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>Address line 4:
                  <input type="text" id="address4" name="address4" section="pickUp" value={this.state.pickUp.address4}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>City:
                  <input type="text" id="city" name="city" section="pickUp" value={this.state.pickUp.city}
                  onChange={this.handleInputChange} required  />
              </label><br/>
              <label>Postcode:
                  <input type="text" id="postcode" name="postcode" section="pickUp" className={!this.props.validInput(this.state.pickUp.postcode)? 'red' : ''}  value={this.state.pickUp.postcode}
              onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" required />
              </label><br/>
              <label>date:
                  <input type="date" id="date" name="date" section="pickUp" value={this.state.pickUp.date}
                  onChange={this.handleInputChange}  required />
              </label><br/>
        </div>
        <div className="dropoff-input">
            <h2>Drop Off details</h2>
            <h3>Recipient Details</h3>
              <label>Name:
                  <input type="text" id="name" name="name" section="recipient" value={this.state.recipient.name}
                  onChange={this.handleInputChange}  required />
              </label><br/>
              <label>Phone Number:
                  <input type="tel" id="phoneNumber" name="phoneNumber" section="recipient" value={this.state.recipient.phoneNumber}
                  onChange={this.handleInputChange}  required  />
              </label><br/>
              <label>Email address:
                  <input type="email" id="emailAddress" name="emailAddress" section="recipient" value={this.state.recipient.emailAddress}
                  onChange={this.handleInputChange} />
              </label><br/>
            
            <PlacesAutocomplete handleAddressSelect={this.handleDropOffSelect} className="google-input"/>
              <label>Address line 1:
                  <input type="text" id="address1DropOff" name="address1" section="dropOff" value={this.state.dropOff.address1}
                  onChange={this.handleInputChange} required  />
              </label><br/>
              <label>Address line 2:
                  <input type="text" id="address2DropOff" name="address2" section="dropOff" value={this.state.dropOff.address2}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>Address line 3:
                  <input type="text" id="address3DropOff" name="address3" section="dropOff" value={this.state.dropOff.address3}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>Address line 4:
                  <input type="text" id="address4DropOff" name="address4" section="dropOff" value={this.state.dropOff.address4}
                  onChange={this.handleInputChange} />
              </label><br/>
              <label>City:
                  <input type="text" id="city" name="cityDropOff" section="dropOff" value={this.state.dropOff.city}
                  onChange={this.handleInputChange} required  />
              </label><br/>
              <label>Postcode:
                  <input type="text" id="dropOffPostcode" name="postcode" section="dropOff" className={!this.props.validInput(this.state.dropOff.postcode)? 'red' : ''} value={this.state.dropOff.postcode}
                  onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" required />
              </label><br/>
        </div>
        </div>
        <div className="details-input">
            <h3>Parcel Details</h3>
              <label>Size:
                  <Tippy content={dimensions}>
                    <span>
                      &#9432;
                    </span>
                  </Tippy>
                  <select id="size" name="size" section="details" onChange={this.handleInputChange} defaultValue={this.state.details.size}>
                    <option title={this.props.bookingDetails.dimensions.small} value ="small">small</option>
                    <option title={this.props.bookingDetails.dimensions.medium} value ="medium">medium</option>
                    <option title={this.props.bookingDetails.dimensions.large} value ="large">large</option>
                    <option title={this.props.bookingDetails.dimensions.pallet} value ="pallet">pallet</option>
                  </select>
              </label><br/>
              <label>Weight:
                  <input type="number" id="weight" name="weight" section="details" value={this.state.details.weight}
                  onChange={this.handleInputChange}  required /><span>kg</span>
              </label><br/>
              <label>Fragile:
                  <input type="checkbox" id="fragile" name="fragile" section="details" value={this.state.details.fragile}
                  onChange={this.handleFragileChange} />
              </label>  <br/> 
                  <textarea type="text" id="comment" name="comment" section="details" value={this.state.details.comment}
                  onChange={this.handleInputChange} placeholder="please tell us anything the driver needs to know." />     
              <button type="submit">
                  Book your delivery.
              </button>
        </div>
      </form>
        
      </>
    )
  }
}

export default BookingPage
