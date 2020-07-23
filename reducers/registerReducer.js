/* eslint-disable default-case */
import {
  GET_REGISTER_DATA
  , GET_REGISTER_DATA_LOAD,
  GET_REGISTER_DATA_ERROR
} from "../constants/actionTypes";

const initialState = {};

const registerReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_REGISTER_DATA_LOAD:
      newState.isRegisterLoad = true;
      break;
    case GET_REGISTER_DATA:
      newState.registerData = action.data;
      newState.isRegisterLoad = false;
      break;
      case GET_REGISTER_DATA_ERROR:
      // newState.logInData = action.data;
     
      newState.isRegisterLoad = false;
      newState.loadingErrorMessage =
        "There was a problem in login.Please try again";
      break;
  }
  return newState;
};

export default registerReducer;
