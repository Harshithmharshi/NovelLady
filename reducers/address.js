/* eslint-disable default-case */
import {
  ADDRESS_ADD_START,
  ADDRESS_ADD_SUCCESS,
  ADDRESS_ADD_FAILURE,
  GET_ADDRESS_START,
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_SUCCESS,
  PUT_ADDRESS_START,
  PUT_ADDRESS_SUCCESS,
  PUT_ADDRESS_FAILURE,
  DELETE_ADDRESS_START,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE
} from "../constants/actionTypes";

const initialState = {
  data: []
};

const addressReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADDRESS_ADD_START:
      newState.isLoading = true;
      break; 
    case ADDRESS_ADD_SUCCESS:
      newState.isLoading = false;
      newState.data = action.data;
      break;
    case ADDRESS_ADD_FAILURE:
      newState.isLoading = false;
      newState.error = "Some Error While Sending the Data";
  }
  return newState;
};

export const getAddress = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ADDRESS_START:
      newState.isLoadingAddress = true;
      break;
    case GET_ADDRESS_SUCCESS:
      newState.isLoadingAddress = false;
      newState.addressData = action.data;
      break;
    case GET_ADDRESS_FAILURE:
      newState.isLoadingAddress = false;
      newState.getAddressError = `Some Error While fetching the address`;
      break;
  }
  return newState;
};

export const putAddress = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case PUT_ADDRESS_START:
      newState.isLoadingPutAddress = true;
      break;
    case PUT_ADDRESS_SUCCESS:
      newState.isLoadingPutAddress = false;
      newState.addressPutData = action.data;
      break;
    case PUT_ADDRESS_FAILURE:
      newState.isLoadingPutAddress = false;
      newState.getAddressError = `Some Error While fetching the address`;
      break;
  }
  return newState;
};


export const deleteAddress = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case DELETE_ADDRESS_START:
      newState.isLoadingPutAddress = true;
      break;
    case DELETE_ADDRESS_SUCCESS:
      newState.isLoadingPutAddress = false;
      newState.addressPutData = action.data;
      break;
    case DELETE_ADDRESS_FAILURE:
      newState.isLoadingPutAddress = false;
      newState.getAddressError = `Some Error While fetching the address`;
      break;
  }
  return newState;
};



export default addressReducer;
