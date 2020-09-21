import React, { Component } from 'react'
import PlacesAutocomplete from '../components/google-autocomplete'
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
        size: this.props.size,
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
    return (
      <>
      <form onSubmit={this.handleSubmit}>
          <h3>Customer Details</h3>
            <label>Name:
                <input type="text" id="name" name="name" section="customerDetails" value={this.state.customerDetails.name}
                onChange={this.handleInputChange} required />
            </label>
            <label>Phone Number:
                <input type="tel" id="phoneNumber" name="phoneNumber" section="customerDetails" value={this.state.customerDetails.phoneNumber}
                onChange={this.handleInputChange} required   />
            </label>
            <label>Email address:
                <input type="email" id="emailAddress" name="emailAddress" section="customerDetails" value={this.state.customerDetails.emailAddress}
                onChange={this.handleInputChange} required  />
            </label>
          
          <h3>Pick up Details</h3>
            <PlacesAutocomplete />
            <label>Address line 1:
                <input type="text" id="address1" name="address1" section="pickUp" value={this.state.pickUp.Address1}
                onChange={this.handleInputChange} required />
            </label>
            <label>Address line 2:
                <input type="text" id="address2" name="address2" section="pickUp" value={this.state.pickUp.Address2}
                onChange={this.handleInputChange} />
            </label>
            <label>Address line 3:
                <input type="text" id="address3" name="address3" section="pickUp" value={this.state.pickUp.Address3}
                onChange={this.handleInputChange} />
            </label>
            <label>Address line 4:
                <input type="text" id="address4" name="address4" section="pickUp" value={this.state.pickUp.Address4}
                onChange={this.handleInputChange} />
            </label>
            <label>City:
                <input type="text" id="city" name="city" section="pickUp" value={this.state.pickUp.city}
                onChange={this.handleInputChange} required  />
            </label>
            <label>Pick-up Postcode:
                <input type="text" id="pickup" name="postcode" section="pickUp" value={this.props.bookingDetails.pickUpPostcode}
            onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" required />
            </label>
            <label>date:
                <input type="date" id="date" name="date" section="pickUp" value={this.state.pickUp.date}
                onChange={this.handleInputChange}  required />
            </label>
            <h3>Drop Off details</h3>
              <label>Address line 1:
                  <input type="text" id="address1DropOff" name="address1" section="dropOff" value={this.state.dropOff.Address1}
                  onChange={this.handleInputChange} required  />
              </label>
              <label>Address line 2:
                  <input type="text" id="address2DropOff" name="address2" section="dropOff" value={this.state.dropOff.Address2}
                  onChange={this.handleInputChange} />
              </label>
              <label>Address line 3:
                  <input type="text" id="address3DropOff" name="address3" section="dropOff" value={this.state.dropOff.Address3}
                  onChange={this.handleInputChange} />
              </label>
              <label>Address line 4:
                  <input type="text" id="address4DropOff" name="address4" section="dropOff" value={this.state.dropOff.Address4}
                  onChange={this.handleInputChange} />
              </label>
              <label>City:
                  <input type="text" id="city" name="cityDropOff" section="dropOff" value={this.state.dropOff.city}
                  onChange={this.handleInputChange} required  />
              </label>
              <label>Drop off Postcode:
                  <input type="text" id="dropOffDropOff" name="postcode" section="dropOff" value={this.props.bookingDetails.dropOffPostcode}
                  onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" required />
              </label>

            <h3>Recipient Details</h3>
              <label>Name:
                  <input type="text" id="name" name="name" section="recipient" value={this.state.recipient.name}
                  onChange={this.handleInputChange}  required />
              </label>
              <label>Phone Number:
                  <input type="tel" id="phoneNumber" name="phoneNumber" section="recipient" value={this.state.recipient.phoneNumber}
                  onChange={this.handleInputChange}  required  />
              </label>
              <label>Email address:
                  <input type="email" id="emailAddress" name="emailAddress" section="recipient" value={this.state.recipient.emailAddress}
                  onChange={this.handleInputChange} />
              </label>
          

            <h3>Parcel Details</h3>
            
              <label>Size: <Tippy content=" max size: Small: 56x67x45cm  Medium: 452366   Large: 4536  Pallet: 1000x1200x1500 "><span>
            &#9432;</span></Tippy>
            
                  <select id="size" name="size" section="details" onChange={this.handleInputChange} defaultValue={this.state.details.size}>
                    <option title="Parcel must be no more than 56x67x45cm" value ="small">small</option>
                     <option value ="medium">medium</option>
                    <option value ="large">large</option>
                    <option value ="pallet">pallet</option>
                  </select>
              </label>
              <label>Weight:
                  <input type="number" id="weight" name="weight" section="details" value={this.state.details.weight}
                  onChange={this.handleInputChange}  required /><span>kg</span>
              </label>
              <label>Fragile:
                  <input type="checkbox" id="fragile" name="fragile" section="details" value={this.state.details.fragile}
                  onChange={this.handleFragileChange} />
              </label>
              {/* <label>Comments: */}
                  <textarea type="text" id="comment" name="comment" section="details" value={this.state.details.comment}
                  onChange={this.handleInputChange} placeholder="please tell us anything the driver needs to know." />
              {/* </label> */}


            
            <button type="submit">
                Book your delivery.
            </button>
        </form>
        
      </>
    )
  }
}

export default BookingPage
