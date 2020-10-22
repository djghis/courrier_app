import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import powered_by_google_on_white from '../images/powered_by_google_on_white.png'


const PlacesAutocomplete = ({handleAddressSelect}) => {
  
  // const LatLng = (51.5, -0.1);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      
      // strictbounds: true,
      //   location:{lat: "51.5", lng:" -0.1"},
      // radius: 30000,
    componentRestrictions: {  //works for uk only
      country: 'UK',
    }
    
      // componentRestrictions {
      //   location: (51.5, -0.1),
      //   radius: 30000
      // },
  },
    debounce: 900,

});

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
    getPostcode(description)
      
    

   // Get latitude and longitude via utility functions
    // getGeocode({ address: description })
    //   .then((results) => getLatLng(results[0]))
    //   .then(({ lat, lng }) => {
    //     console.log("📍 Coordinates: ", { lat, lng });
    //   })
    //   .catch((error) => {
    //     console.log("😱 Error: ", error);
    //   });
     
  };

  

  const getPostcode = async (parameter) => {
    getGeocode({address: parameter})
    // By default we use the "long_name" value from API response, you can tell the utility to use "short_name"
    // by setting the second parameter to "true"
    .then((results) => getZipCode(results[0], false))
    .then((zipCode) => {
        console.log("ZIP Code: ", zipCode);
        handleAddressSelect(parameter, zipCode)
    
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <>  
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
        
        </>
      );
    });

  return (
    
    <div ref={ref} className="google-input">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where is Pickup?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}
      <img src={powered_by_google_on_white} alt="Google logo" />
      </ul> }
        </div>
  );
};


export default PlacesAutocomplete