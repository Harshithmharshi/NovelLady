/* eslint-disable default-case */
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "../constants/actionTypes";

const initialState = {};

const logInReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOGIN_START:
      newState.loadingLoginData = true;
      break;
    case LOGIN_SUCCESS:
      newState.loadingLoginData = false;
      newState.logInError=false;
      newState.logInData = action.data;
      break;
    case LOGIN_ERROR:
      // newState.logInData = action.data;
      newState.logInError=true;
      newState.loadingLoginData = false;
      newState.loadingErrorMessage =
        "There was a problem in login.Please try again";
      break;

  }
  return newState;
};

export default logInReducer;
