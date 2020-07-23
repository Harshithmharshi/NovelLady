import { ORDER_DETAILS_START, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE } from "../constants/actionTypes";


const initialState = {};

const orderDetailsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ORDER_DETAILS_START:
            newState.isLoadingOrderDetails = true;
            break;
        case ORDER_DETAILS_SUCCESS:
            newState.isLoadingOrderDetails = false;
            newState.orderDetailsData = action.data;
            break;
        case ORDER_DETAILS_FAILURE:
            newState.isLoadingOrderDetails = false;
            newState.orderDetailsLoadingErrorMessage = `There was some error while fetching the order details data.`
            break;
    }
    return newState;
}

export default orderDetailsReducer;