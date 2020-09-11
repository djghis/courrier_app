import React, { Component } from 'react'
// const { resolveConfig } = require("prettier");
import {Link} from 'gatsby'



class QuoteInput extends Component {
    state = {
        pickUpPostcode : '',
        dropOffPostcode: '',
        size: 'small',
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

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
            <label>Pick-up Postcode:
                <input type="text" id="pickup" name="pickUpPostcode" value={this.state.pickUpPostcode}
            onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label>
            <label>Drop-off Postcode:
                <input type="text" id="dropoff" name="dropOffPostcode" value={this.state.dropOffPostcode}
            onChange={this.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label><br></br>
            <div onChange={this.onChangeValue}>
            <label>
                <input type="radio" name="size" id="small" value="small" required /> Small
            </label>
            <label>
                <input type="radio" name="size" id="medium" value="medium" required /> Medium
            </label><label>
                <input type="radio" name="size" id="large" value="large" required /> Large
            </label><label>
                <input type="radio" name="size" id="pallet" value="pallet" required /> Pallet
            </label>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
        { this.state.quote ?
        <div>
            <h1>Your quote: £{this.state.quote}</h1>
            <Link to="/booking-page">Continue with your booking</Link>
        </div>
        :
        <div></div>
        }
      </>
    )
  }
}

export default QuoteInput
