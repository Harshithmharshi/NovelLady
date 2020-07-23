import {
  POST_ADD_TO_CART_START,
  POST_ADD_TO_CART_FAILURE,
  POST_ADD_TO_CART_SUCCESS,
  GET_CART_START,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REMOVE_CART_ITEM_START,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  EDIT_CART_ITEM_START,
  EDIT_CART_ITEM_FAILURE,
  EDIT_CART_ITEM_SUCCESS
} from "../constants/actionTypes";

const initialState = {};

const addToCartReducerPost = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case POST_ADD_TO_CART_START:
      newState.isaddToCartPostLoading = true;
      break;
    case POST_ADD_TO_CART_SUCCESS:
      newState.isaddToCartPostLoading = false;
      newState.data = action.data;
      break;
    case POST_ADD_TO_CART_FAILURE:
      newState.isaddToCartPostLoading = false;
      newState.errorMessage = "There are some error while posting the data";
      break;
  }
  return newState;
};

export const getCartReducer = (state = initialState, action) => {
  let newState = {...state};
  switch(action.type) {
    case GET_CART_START:
      newState.isLoadingFetchCartStart = true;
      break;
    case GET_CART_SUCCESS:
      newState.isLoadingFetchCartStart =  false;
      newState.getCartData = action.data;
      break;
    case GET_CART_FAILURE:
      newState.isLoadingFetchCartStart = false;
      newState.getErrorMessage = `There was some error while fetching the data`;
      break;
  }
  return newState;
}

export const removeItemReducer = (state = initialState, action) => {
  let newState = {...state};
  switch(action.type) {
    case REMOVE_CART_ITEM_START:
      newState.isRemoveItemFromCartStart = true;
      break;
    case REMOVE_CART_ITEM_SUCCESS:
      newState.isRemoveItemFromCartStart = false;
      newState.removeItemsMessage = action.data;
      break;
    case REMOVE_CART_ITEM_FAILURE:
      newState.isRemoveItemFromCartStart = false;
      newState.deleteErrorMessage = `There was an error while deleting the data.`
      break;
  }
  return newState;
}

export const editItemReducer = (state = initialState, action) => {
  let newState = {...state};
  switch(action.type) {
    case EDIT_CART_ITEM_START:
      newState.isEditCartLoading = true;
      break;
    case EDIT_CART_ITEM_SUCCESS:
      newState.isEditCartLoading = false;
      newState.editCartMessage = action.data;
      break;
    case EDIT_CART_ITEM_FAILURE:
      newState.isEditCartLoading = false;
      break;
  }
  return newState;
}

export default addToCartReducerPost;
