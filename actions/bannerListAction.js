
import { GET_BANNER_LIST, GET_BANNER_LIST_FAILURE } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const fetchBannerListData = data => {
  return {
    type: GET_BANNER_LIST,
    payload:data,
  };
};

export const fetchBannerListFail = () => {
  return {
    type: GET_BANNER_LIST_FAILURE,
  };
};


// Get Home Bannner 
export const bannerList = () => dispatch => {
  return axios.get(`${BASE_URL}banner-list/`)
    .then(response => {
      dispatch(fetchBannerListData(response.data.Banner_list));
    })
    .catch(err =>{
      console.log(err)
      dispatch(fetchBannerListFail(err))
    }
    );
};
