import React, {Component} from 'react'
import AddressSuggest from './address-suggest'
import AddressInput from './address-input'
import axios from 'axios'

class AddressForm extends Component {
    constructor(props) {
      super(props);
  
      const address = this.getEmptyAddress();
      this.state = {
        'address': address,
        'query': '',
        'locationId': ''
      }
  
    }
    
    getEmptyAddress = () => {
        return {}
    }

    saySomething = (event) => {
        console.log('hello I am working')
    }

    onQuery = (evt) => {
      const query = evt.target.value;
      console.log("hello from the query on address form")
      if (!query.length > 0) {
        const address = this.getEmptyAddress();
        return this.setState({
          'address': address,
          'query': '',
          'locationId': ''
          })
      }
  
      const self = this;
      axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json', {
        'params': {
          'app_id': '{process.env.app_id}',
          'app_code': '{process.env.app_code}',
          'query': query,
          'maxresults': 1,
        }}).then(function (response) {
          const address = response.data.suggestions[0].address;
          const id = response.data.suggestions[0].locationId;
          self.setState({
            'address': address,
            'query': query,
            'locationId': id,
            });
        });
    }
  
    render() {
      return (
        <div className="container">
          <AddressSuggest
            query={this.state.query}
            onChange={this.onQuery}
            />
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            />
          </div>
        );
    }
  }

  export default AddressForm