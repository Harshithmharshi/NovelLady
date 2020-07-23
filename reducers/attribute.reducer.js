import { GET_ATTRIBUTE_LIST_SUCCESS, GET_ATTRIBUTE_LIST_FAILURE, GET_ATTRIBUTE_LIST_START } from "../constants/actionTypes";

const initialState = {};

export const attributeReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ATTRIBUTE_LIST_START:
      newState.isLoadingAttributeList = true;
      break;
    case GET_ATTRIBUTE_LIST_SUCCESS:
      newState.isLoadingAttributeList = false;
      newState.attributData = action.data;
      break;
    case GET_ATTRIBUTE_LIST_FAILURE:
      newState.attributeErrorMessage = `There was an error while fetching the attribute list`;
      break;
  }
  return newState;
};
