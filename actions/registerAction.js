import { GET_REGISTER_DATA_LOAD,GET_REGISTER_DATA, GET_REGISTER_DATA_ERROR } from "./types";
import axios from "axios";
import { BASE_URL } from "../constants/api";

const POST_URL = `${BASE_URL}customer/register/`


export const registerDataLoad = () => {
  return {
    type: GET_REGISTER_DATA_LOAD,
    
  };
};

export const registerData = data => {
  return {
    type: GET_REGISTER_DATA,
    data
  };
};


export const registerDataFail = data => {
  return {
    type: GET_REGISTER_DATA_ERROR,
    data
  };
};




export const getRegisterData = registeredData => {

  const data = JSON.stringify(registeredData);
  return dispatch => {
    dispatch(registerDataLoad());
    return axios
      .post(POST_URL, data, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem("user_token", response.data.token);
        setInterval(() => {
          localStorage.clear();
        }, 1600000);
        return dispatch(registerData(response.data.token));
      
      }).
      catch(err => {
        console.log(err)
        dispatch(registerDataFail(err));
      });
  };
};
