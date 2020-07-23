
import {
  GET_CAROUSEL_TAG_START,
  GET_LISTING_TAG_START,
  GET_CAROUSEL_TAG,
  GET_CAROUSEL_TAG_FAILURE,
  GET_LISTING_TAG,
  GET_LISTING_TAG_FAILURE
} from './types';

import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const fetchCarouselTagDataStart = () => {
  return {
    type: GET_CAROUSEL_TAG_START,
  };
}; 


export const fetchListinTagDataStart = () => {
  return {
    type: GET_LISTING_TAG_START,
  };
}; 


export const fetchCarouselTagData = data => {
  return {
    type: GET_CAROUSEL_TAG,
    payload:data
  };
};


export const fetchCarouselTagFail = () => {
  return {
    type: GET_CAROUSEL_TAG_FAILURE,
  };
};


export const fetchListinTagData = data => {
  return {
    type: GET_LISTING_TAG,
    payload:data,
  };
};

export const fetchListinTagDataFail = () => {
  return {
    type: GET_LISTING_TAG_FAILURE,
  };
};



// Get Carousel Tag 
export const carouselTag = () => dispatch => {
  dispatch(fetchCarouselTagDataStart());
  return axios.get(`${BASE_URL}carousel-tag/`)
    .then(response => {
      dispatch(fetchCarouselTagData({name:response.data.Carousel_tag["0"].name, data:response.data}))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchCarouselTagFail())
    }
    );
};

// Get Listing Tag 
export const listingTag = () => dispatch => {
  dispatch(fetchListinTagDataStart());

  return axios.get(`${BASE_URL}listing-tag/`)
    .then(response => {
      dispatch(fetchListinTagData({name:response.data.Listing_tag["0"].name}))
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchListinTagDataFail())
    }
    );
};