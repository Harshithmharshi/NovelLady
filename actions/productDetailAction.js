
import { GET_PRODUCTS_DETAIL, GET_PRODUCTS_DETAIL_LOADING } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const fetchProductDetailLoad = () => {
    return {
        type: GET_PRODUCTS_DETAIL_LOADING
    };
};

export const fetchProductDetail = data => {
    return {
        type: GET_PRODUCTS_DETAIL,
        payload: data,
    };
};


// Get Products Detail
export const productsDetail = id => dispatch => {
    dispatch(fetchProductDetailLoad())
    return axios.get(`${BASE_URL}product-details/${id}/`)
        .then(response => {
            dispatch(fetchProductDetail(response.data.Product_details));
        })

        .catch(err => {
            alert("Not Found");
            window.history.back();
        }
        );
};


export const colorproductsDetail = (id,colorID) => dispatch => {
    dispatch(fetchProductDetailLoad())
    return axios.get(`${BASE_URL}product-details/${id}/?instance_id=${colorID}`)
        .then(response => {
            dispatch(fetchProductDetail(response.data.Product_details));
        })

        .catch(err => {
            alert("Not Found");
            window.history.back();
        }
        );


};



export const colorauthproductsDetail = (token, id, colorID) => dispatch => {
    dispatch(fetchProductDetailLoad())

    return axios.get(`${BASE_URL}product-details-customer/${id}/?instance_id=${colorID}`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
        .then(response => {
            console.log(response.data.Product_details);
            dispatch(fetchProductDetail(response.data.Product_details));
        })
        .catch(err => {
            alert("Not Found");
            window.history.back();
        }
        );
};


export const authproductsDetail = (token, id) => dispatch => {
    dispatch(fetchProductDetailLoad())

    return axios.get(`${BASE_URL}product-details-customer/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
        .then(response => {
            console.log(response.data.Product_details);
            dispatch(fetchProductDetail(response.data.Product_details));
        })
        .catch(err => {
            alert("Not Found");
            window.history.back();
        }
        );
};


