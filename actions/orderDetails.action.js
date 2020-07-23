import { ORDER_DETAILS_START, ORDER_DETAILS_FAILURE, ORDER_DETAILS_SUCCESS } from '../constants/actionTypes';
import { BASE_URL } from '../constants/api';
import Axios from 'axios';

const URL = `${BASE_URL}customer/orderDetails/`;


const orderDetailsStart = () => ({ type: ORDER_DETAILS_START });
const orderDetailsSuccess = (data) => ({ type: ORDER_DETAILS_SUCCESS, data });
const orderDetailsFailure = () => ({ type: ORDER_DETAILS_FAILURE });


const fetchOrderDetails = (id) => dispatch => {
    const token = localStorage.getItem("user_token");
    const request = Axios(`${URL}${id}/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
    dispatch(orderDetailsStart());
    request.then(({ data }) => {
        dispatch(orderDetailsSuccess(data))
    }).catch(err => {
        alert("Not Found");
        window.history.back()
    })
};

export default fetchOrderDetails;