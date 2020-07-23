import {
  POST_ADD_TO_CART_FAILURE,
  POST_ADD_TO_CART_START,
  POST_ADD_TO_CART_SUCCESS,
  GET_CART_START,
  GET_CART_FAILURE,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_START,
  EDIT_CART_ITEM_START,
  EDIT_CART_ITEM_SUCCESS,
  EDIT_CART_ITEM_FAILURE
} from "../constants/actionTypes";
import axios from "axios";

import { BASE_URL } from "../constants/api";

const POST_URL = `${BASE_URL}customer/addToCart/`;

const GET_URL = `${BASE_URL}customer/myCart/`;

const DELETE_ITEM_URL = `${BASE_URL}customer/deleteCart`;

const EDIT_URL = `${BASE_URL}customer/editCart/`;  

const POST_WITHOUT_TOKEN_URL =`${BASE_URL}customer/cartWithoutToken/`;

const postDataToApiStart = () => ({ type: POST_ADD_TO_CART_START });

const postDataToApiFailure = () => ({ type: POST_ADD_TO_CART_FAILURE });

const postDataToApiSuccess = (data) => ({
  type: POST_ADD_TO_CART_SUCCESS,
  data,
});

const fetchCartApiStart = () => ({ type: GET_CART_START });

const fetchcartApiSuccess = (data) => ({ type: GET_CART_SUCCESS, data });

const fetchcartApiFailure = () => ({ type: GET_CART_FAILURE });

const removeItemsFromCartStart = () => ({type: REMOVE_CART_ITEM_START});

const removeItemsFromCartSuccess = (data) => ({type: REMOVE_CART_ITEM_SUCCESS, data});

const removeItemsFromCartFailure = () => ({type: REMOVE_CART_ITEM_FAILURE});

const editItemsForCartStart = () => ({type: EDIT_CART_ITEM_START});

const editItemsForCartSuccess = (data) => ({type: EDIT_CART_ITEM_SUCCESS, data});

const editItemsForCartFailure = () => ({type: EDIT_CART_ITEM_FAILURE});


export const postDataToApi = (token, data, quantity = 1) => {
  // const data = { product_instance_id: size, quantity };
  // console.log(data)
  const request = axios.post(`${POST_URL}`, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return (dispatch) => {
    dispatch(postDataToApiStart());
    return request
      .then((response) => {
        console.log(response.data);
        dispatch(postDataToApiSuccess(response.data));
      })
      .catch((err) => {
        dispatch(postDataToApiFailure());
      });
  };
};

export const fetchCartDataFromApi = () => {
  const token = localStorage.getItem("user_token");
  const request = axios(GET_URL, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (dispatch) => {
    dispatch(fetchCartApiStart());
    return request
      .then((response) => {
        const quantity = response.data.mycart.map(item => item.quantity).reduce((a, b) => a + b);
        const price = response.data.mycart.map(item => item.quantity * item.product_selling_price);
        
        dispatch(fetchcartApiSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchcartApiFailure());
      });
  };
};

export const updateAfterRemoveCartItems = (data) => {
  return dispatch => {
    dispatch(fetchcartApiSuccess(data))
  }
}

export const fetchCartDataWithBagDetails = (data) => {
  const token = localStorage.getItem("user_token");
  const request = axios(GET_URL, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return dispatch => {
    dispatch(fetchcartApiSuccess(data))
  }
}

export const removeItemsFromCart = (id) => {
  const token = localStorage.getItem ("user_token");
  const request = axios(`${DELETE_ITEM_URL}/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return dispatch => {
    dispatch(removeItemsFromCartStart())
    return request.then(response => {
      dispatch(removeItemsFromCartSuccess(response.data))
    }).catch((err) => {
      dispatch(removeItemsFromCartFailure())
    })
  }
}


export const editItemsForCart = (id, quantity) => {
  const token = localStorage.getItem ("user_token");
  const request = axios.put(`${EDIT_URL}${id}/`, {"quantity": quantity},{
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return dispatch => {
    dispatch(editItemsForCartStart());
    return request.then(response => {
      dispatch(editItemsForCartSuccess(response.data));
    }).catch(err => {
      dispatch(editItemsForCartFailure())
    })
  }
}



export const postDataToApiWithToken = (data) => {
  const request = axios.post(`${POST_WITHOUT_TOKEN_URL}`, data);
  return (dispatch) => {
    dispatch(fetchCartApiStart());
    return request
      .then((response) => {
        dispatch(fetchcartApiSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchcartApiFailure());
      });
  };
};
