import {ALLACTIVITIES, ALLCOUNTRIES, COUNTRYNAME, GETCOUNTRYBYID} from "../Actions/actions"

const initialState = {
    countries: {},
    countriesCopy: {},
    countriesCopy2: {},
    activities: {},
    countryById: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALLCOUNTRIES:
            return {
                ...state,
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
        case GETCOUNTRYBYID:
            return {
                ...state,
                countryById: action.payload.country
            }
        default:
            return {
                ...state
            };
    }
  };
  
  export default rootReducer;