import {
  ADD_ADDRESS_START,
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_SUCCESS
} from "../constants/actionTypes";
import Axios from "axios";
import { BASE_URL } from "../constants/api";

const URL = `${BASE_URL}customer/profile/`;

const sendAddAddressStart = () => {
  return {
    type: ADD_ADDRESS_START
  };
};

const sendAddAddressFailure = () => {
  return {
    type: ADD_ADDRESS_FAILURE
  };
};

const sendAddAddressSuccess = data => {
  return {
    type: ADD_ADDRESS_SUCCESS,
    data
  };
};

const sendAddAddressToApi = (data, token) => {
  const request = Axios.put(URL, data, {
    headers: { Authorization: `Token ${token}` }
  });
  return dispatch => {
    return request.then(response => {
      console.log(response.data);
      dispatch(sendAddAddressSuccess(response.data));
    });
  };
};

export default sendAddAddressToApi;
