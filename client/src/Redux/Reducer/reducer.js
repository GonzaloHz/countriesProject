import {ALLCOUNTRIES, COUNTRYNAME} from "../Actions/actions"

const initialState = {
    countries: {},
    countriesCopy: {},
    countriesCopy2: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALLCOUNTRIES:
            return {
                ...state,
                countries: action.payload.Countries,
                countriesCopy: action.payload.Countries,
                countriesCopy2: action.payload.Countries
            }
        case COUNTRYNAME:
            console.log(action.payload)
            return{
                ...state,
                countries: action.payload.country
            }
        default:
            return {
                ...state
            };
    }
  };
  
  export default rootReducer;