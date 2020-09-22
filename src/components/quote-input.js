import React, { Component } from 'react'
// import {Link} from 'gatsby'
import Tippy from '@tippyjs/react'


const QuoteInput = (props) => {
    
    return (
      <>
        <form onSubmit={props.handleSubmit}>
            <div>
            <label>Pick-up Postcode:
                <input className={props.validInput.pickUpPostcode? 'red' : ''} type="text" id="pickup" name="pickUpPostcode" value={props.pickUpPostcode}
            onChange={props.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label> {props.validInput.pickUpPostcode? <span className="invalid">Invalid Postcode</span> : <span></span>}
            </div>
            <div>
            <label>Drop-off Postcode:
                <input className={props.validInput.dropOffPostcode? 'red' : ''} type="text" id="dropoff" name="dropOffPostcode" value={props.dropOffPostcode}
            onChange={props.handleInputChange} pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/>
            </label> {props.validInput.dropOffPostcode? <span className="invalid">Invalid Postcode</span> : <span></span>}
            </div>
            <br></br>
            <div onChange={props.onChangeValue}>
            <Tippy content={props.bookingDetails.dimensions.small} >
            <label>
                <input type="radio" name="size" id="small" value="small" required /> Small
            </label>
            </Tippy>
            <Tippy content={props.bookingDetails.dimensions.medium} >
            <label>
                <input type="radio" name="size" id="medium" value="medium" required /> Medium
            </label>
            </Tippy>
            <Tippy content={props.bookingDetails.dimensions.large} >
            <label>
                <input type="radio" name="size" id="large" value="large" required /> Large
            </label>
            </Tippy>
            <Tippy content={props.bookingDetails.dimensions.pallet} >
            <label>
                <input type="radio" name="size" id="pallet" value="pallet" required /> Pallet
            </label>
            </Tippy>
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
