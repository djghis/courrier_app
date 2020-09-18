import React, { Component } from 'react'
// const { resolveConfig } = require("prettier");
import {Link} from 'gatsby'


const QuoteInput = (props) => {
  
    return (
      <>
        <form onSubmit={props.handleSubmit}>
            <label>Pick-up Postcode:
                <input type="text" id="pickup" name="pickUpPostcode" value={props.pickUpPostcode}
            onChange={props.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label>
            <label>Drop-off Postcode:
                <input type="text" id="dropoff" name="dropOffPostcode" value={props.dropOffPostcode}
            onChange={props.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label><br></br>
            <div onChange={props.onChangeValue}>
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
                Get quote.
            </button>
        </form>
        { props.quote ?
        <div>
            <h1>Your quote: £{props.quote}</h1>
            <button onClick={props.handleQuoteStatusChange} >
              Continue to your booking.
            </button>
        </div>
        :
        <div></div>
        }
      </>
    )
  }



export default QuoteInput
