import { PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from "../constants/actionTypes";


const initialState = {};

const placeOrderReducer = (state=initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case PLACE_ORDER_START:
            newState.isPlaceOrderLoading = true;
            break;
        case PLACE_ORDER_SUCCESS:
            newState.isPlaceOrderLoading = false;
            newState.isOrderPlaced = true;
            newState.placeOrderData = action.data;
            break;
        case PLACE_ORDER_FAILURE:
            newState.isPlaceOrderLoading = false;
            newState.isOrderPlaced = false;
            newState.placeOrderErrorMessage = 'There was some error while placing the order.'
            break;
    }
    return newState;
}

export default placeOrderReducer;