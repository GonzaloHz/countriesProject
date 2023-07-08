import axios from "axios"

export const ALLCOUNTRIES = 'ALLCOUNTRIES'
export const COUNTRYNAME = 'COUNTRYNAME'


export const getAllCountries = () => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8888/countries`)
      .then(response => {
        dispatch({ 
            type: ALLCOUNTRIES,
            payload: response.data
        });
      })
      .catch(err => console.error(err))
    };
};

export const filteredByName = (name, qcontinent) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8888/countries/name?qname=${name}&qcontinent=${qcontinent}`)
      .then(response=> {
        dispatch({
          type: COUNTRYNAME,
          payload: response.data
        })
      })
  }
}