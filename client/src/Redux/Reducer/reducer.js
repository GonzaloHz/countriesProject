import {ALLACTIVITIES, ALLCOUNTRIES, COUNTRYNAME} from "../Actions/actions"

const initialState = {
    countries: {},
    countriesCopy: {},
    countriesCopy2: {},
    activities: {}
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
            return {
                ...state,
                countries: action.payload.country
            }
        case ALLACTIVITIES:
            return {
                ...state,
                activities: action.payload.activities
            }
        default:
            return {
                ...state
            };
    }
  };
  
  export default rootReducer;