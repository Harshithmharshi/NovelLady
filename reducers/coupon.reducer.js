import { POST_COUPON_START, POST_COUPON_FAILURE, POST_COUPON_SUCCESS } from "../constants/actionTypes";

const initialState = {

};

const  couponReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case POST_COUPON_START:
            newState.isCouponLoading = true;
            break;
        case POST_COUPON_SUCCESS:
            newState.isCouponLoading = false;
            newState.data = action.data;
            break;
        case POST_COUPON_FAILURE:
            newState.isCouponLoading = false;
            newState.couponFetchErrorMessage = 'There was some error while appying the token';
            break;
    }
    return newState;
}

export default couponReducer;