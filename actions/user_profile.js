import { BASE_URL } from "../constants/api";
import {
  USER_PROFILE_FETCH_FAILURE,
  USER_PROFILE_FETCH_START,
  USER_PROFILE_FETCH_SUCCESS
} from "../constants/actionTypes";
import Axios from "axios";

const URL = `${BASE_URL}customer/profile/`;

export const fetchUserProfileStart = () => {
  return {
    type: USER_PROFILE_FETCH_START
  };
};

export const fetchUserProfilefailure = () => {
  return {
    type: USER_PROFILE_FETCH_FAILURE
  };
};

export const fetchUserProfileSuccess = data => {
  return {
    type: USER_PROFILE_FETCH_SUCCESS,
    data
  };
};

export const fetchUserProfileApi = token => {
  const request = Axios.get(`${URL}`, {
    headers: { Authorization: `Token ${token}` }
  });
  return dispatch => {
    dispatch(fetchUserProfileStart());
    return request
      .then(({ data }) => {
        dispatch(fetchUserProfileSuccess(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchUserProfilefailure());
      });
  };
};
