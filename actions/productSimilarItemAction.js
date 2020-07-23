
import { GET_PRODUCTS_SIMILAR_ITEM } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const fetchProductSimilarItem = data => {
    return {
        type: GET_PRODUCTS_SIMILAR_ITEM,
        payload: data,
    };
};


// Get Products Detail
export const productSimilarItem = categoryId => dispatch => {
    return axios.get(`${BASE_URL}products-list/?category_id=${categoryId}`)
        .then(response => {
            dispatch(fetchProductSimilarItem(response.data));
        })
        .catch(err => {
            console.log(err)
            // window.history.back()
        }
        );
};

export const authproductSimilarItem = (token,categoryId) => dispatch => {
    return axios.get(`${BASE_URL}products-list-customer/?category_id=${categoryId}`,{
        headers: {
            'Authorization': `Token ${token}`,
          }
    })
        .then(response => {
            dispatch(fetchProductSimilarItem(response.data));
        })
        .catch(err => {
            console.log(err)
            // window.history.back()
        }
        );
};


