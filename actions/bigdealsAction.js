
import { GET_BIG_DEALS, GET_BIG_DEALS_FAILURE } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const fetchBigDealsData = data => {
    return {
        type: GET_BIG_DEALS,
        payload: data
    };
};

export const fetchBigDealsDataFail = () => {
    return {
        type: GET_BIG_DEALS_FAILURE,
    };
};




// Get Big Deals
export const bigDeals = () => dispatch => {
        return axios.get(`${BASE_URL}big-deals-list/`)
        .then(response => {
            dispatch(fetchBigDealsData(response.data))
        })
        .catch(err => {
            console.log(err)
            fetchBigDealsDataFail(err)
        }
        );
};
