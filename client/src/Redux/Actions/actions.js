import axios from "axios"

export const ALLCOUNTRIES = 'ALLCOUNTRIES'
export const COUNTRYNAME = 'COUNTRYNAME'
export const ALLACTIVITIES = 'ALLACTIVITIES'


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

export const filteredByName = (name, qcontinent, qactivity) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8888/countries/name?qname=${name}&qcontinent=${qcontinent}&qActivityName=${qactivity}`)
      .then(response => {
        dispatch({
          type: COUNTRYNAME,
          payload: response.data
        })
      })
  }
}

export const getAllActivities = () => {
  return async function(dispatch) {
    return axios.get('http://localhost:8888/activities/')
    .then(response => {
      dispatch({
        type: ALLACTIVITIES,
        payload: response.data
      })
    })
  }
}