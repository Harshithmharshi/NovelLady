import {
  GET_MY_ORDERS_FAILURE,
  GET_MY_ORDERS_START,
  GET_MY_ORDERS_SUCCESS,
} from "../constants/actionTypes";
import axios from "axios";
import { BASE_URL } from "../constants/api";
const URL = `${BASE_URL}customer/myOrders/`;


const myOrderStart = () => ({ type: GET_MY_ORDERS_START });
const myOrderFailure = () => ({ type: GET_MY_ORDERS_FAILURE });
const myOrderSuccess = (data) => ({ type: GET_MY_ORDERS_SUCCESS, data });


const fetchMyOrdersApi = (token) => {
  const request = axios.get(`${URL}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return (dispatch) => {
    dispatch(myOrderStart());
    return request
      .then(({ data }) => {
        console.log(data);
        dispatch(myOrderSuccess(data));
      })
      .catch((err) => dispatch(myOrderFailure()));
  };
};

export default fetchMyOrdersApi;