import { BASE_URL } from "../constants/api";
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_START, PLACE_ORDER_FAILURE } from "../constants/actionTypes";
import Axios from "axios";

const URL = `${BASE_URL}customer/placeOrder/`;

const placeOrderStart = () => ({ type: PLACE_ORDER_START });
const placeOrderSuccess = (data) => ({ type: PLACE_ORDER_SUCCESS, data });
const placeOrderFailure = () => ({ type: PLACE_ORDER_FAILURE });

const placeOrder = (data) => {
    const token = localStorage.getItem("user_token");
    const PlaceOrderData = JSON.stringify(data);

    return dispatch => {
        dispatch(placeOrderStart());
        return Axios.post(URL, data, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            dispatch(placeOrderSuccess((response.data)));
        }).catch(err => {
            console.log(err)
            placeOrderFailure()
        })
    }

}

export default placeOrder;