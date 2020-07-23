import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS
} from "../constants/actionTypes";
import { BASE_URL } from "../constants/api";

const POST_URL = `${BASE_URL}customer/login/`

export const loginData = data => {
  return {
    type: LOGIN_SUCCESS,
    data
  };
};


export const loginDataFail = data => {
  return {
    type: LOGIN_ERROR,
    data
  };
};



export const loginDataStart = () => {
  return {
    type: LOGIN_START
  };
};

export const getLoginData = loggedInData => {
  const data = JSON.stringify(loggedInData);
  return dispatch => {
    dispatch(loginDataStart());
    return axios
      .post(POST_URL, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
       
        console.log(response.data);
        localStorage.setItem("user_token", response.data.token);
        dispatch(loginData(response.data.token));
        setInterval(() => {
          localStorage.clear();
        }, 1600000)
      })
      .catch(err => {
        dispatch(loginDataFail(err));
      });
  };
};
