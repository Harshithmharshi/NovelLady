import {
  HOME_OFFER_FAILURE,
  HOME_OFFER_START,
  HOME_OFFER_SUCCESS
} from "../../src/constants/actionTypes";
import { BASE_URL } from "../constants/api";
import axios from "axios";
const URL = `${BASE_URL}home-offer/`;

export const fetchHomeOfferData = payload => {
  return {
    type: HOME_OFFER_SUCCESS,
    data: payload
  };
};

export const fetchHomeOfferStart = () => {
  return {
    type: HOME_OFFER_START
  };
};

export const fetchHomeOfferFail = () => {
  return {
    type: HOME_OFFER_FAILURE
  };
};

export const fetchHomeOfferApiData = () => {
  const request = axios(URL);
  return dispatch => {
    dispatch(fetchHomeOfferStart());
    return setTimeout(() => {
      request.then(({ data }) => {
        dispatch(fetchHomeOfferData(data.Offer_list));
      });
    }, 100);
  };
};
