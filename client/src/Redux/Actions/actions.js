import axios from "axios"
import dotenv from 'dotenv'

export const ALLCOUNTRIES = 'ALLCOUNTRIES'
export const COUNTRYNAME = 'COUNTRYNAME'
export const ALLACTIVITIES = 'ALLACTIVITIES'
export const GETCOUNTRYBYID = 'GETCOUNTRYBYID'
export const ADDACTIVITY = 'ADDACTIVITY'

dotenv.config()

const {
  REACT_APP_BACKEND_URL
} = process.env;

export const getAllCountries = (qOffset, qLimit) => {
    return async function (dispatch) {
      return axios.get(`${REACT_APP_BACKEND_URL}countries?qOffset=${qOffset}&qLimit=${qLimit}`)
      .then(response => {
        dispatch({ 
            type: ALLCOUNTRIES,
            payload: response.data
        });
      })
      .catch(err => console.error(err))
    };
};

export const filteredByName = (name, qcontinent, qactivity, qNameOrPop, qOrder, qOffset, qLimit) => {
    return async function (dispatch) {
      return axios.get(`${REACT_APP_BACKEND_URL}countries/name?qname=${name}&qcontinent=${qcontinent}&qActivityName=${qactivity}&qNameOrPoP=${qNameOrPop}&qOrder=${qOrder}&qOffset=${qOffset}&qLimit=${qLimit}`)
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
    return axios.get(REACT_APP_BACKEND_URL+'activities/')
    .then(response => {
      dispatch({
        type: ALLACTIVITIES,
        payload: response.data
      })
    })
  }
}

export const getCountryById = (idCountry) => {
  return async function(dispatch) {
    return axios.get(`${REACT_APP_BACKEND_URL}countries/${idCountry}`)
    .then(response => {
      dispatch({
        type: GETCOUNTRYBYID,
        payload: response.data
      })
    })
  }
}

export const addOneActivity = (inputActivity) => {
  return async function(dispatch) {
    return axios.post(REACT_APP_BACKEND_URL+'activities/', inputActivity)
    .then(response => {
      dispatch({
        type: ADDACTIVITY,
        payload: response.data
      })
    })
  }
}

export const deleteOneActivity = (id) => {
  return async function() {
    return axios.delete(`${REACT_APP_BACKEND_URL}activities/${id}`)
  }
}