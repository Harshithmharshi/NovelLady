
import { GET_BANNER_LIST } from './types';
import axios from 'axios';
import {BASE_URL} from '../constants/api'
const baseUrl = `${BASE_URL}banner-list/`;


export const fetchBannerData = (data) => {
  return {
    type: GET_BANNER_LIST,
    data

  }
};

export const bannerList = () => {
  return (dispatch) => {
    return axios.get(baseUrl)
      .then(response => {
        dispatch(fetchBannerData(response.data))
      })
      .catch(err =>
        console.log(err)
      );
  }
};