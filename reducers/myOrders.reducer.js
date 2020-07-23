import {
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_START,
  GET_MY_ORDERS_FAILURE,
} from "../constants/actionTypes";

const initialState = {};

const myOrdersReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_MY_ORDERS_START:
      newState.isLoadingMyOrders = true;
      break;
    case GET_MY_ORDERS_SUCCESS:
      newState.isLoadingMyOrders = false;
      newState.myOrdersData = action.data;
      break;
    case GET_MY_ORDERS_FAILURE:
      newState.isLoadingMyOrders = false;
      break;
  }
  return newState;
};

export default myOrdersReducer;