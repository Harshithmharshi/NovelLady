import { BASE_URL } from "../constants/api";
import { POST_COUPON_START, POST_COUPON_FAILURE, POST_COUPON_SUCCESS } from "../constants/actionTypes";
import Axios from "axios";


const URL = `${BASE_URL}customer/checkCoupon/`;


const postCouponStart = () => ({type: POST_COUPON_START});
const postCouponSuccess = (data) => ({type:POST_COUPON_SUCCESS, data});
const postCouponFailure = () => ({type: POST_COUPON_FAILURE});

const postCouponToServer = (coupon) => dispatch => {
    const token = localStorage.getItem("user_token");
    const data = {coupon: coupon}
    const request = Axios.post(URL, data, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
    dispatch(postCouponStart());
    request.then((response) => {
        dispatch(postCouponSuccess(response.data))
    }).catch(err => dispatch(postCouponFailure()))
}

export default postCouponToServer;