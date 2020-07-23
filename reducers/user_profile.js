import {
  USER_PROFILE_FETCH_SUCCESS,
  USER_PROFILE_FETCH_START,
  USER_PROFILE_FETCH_FAILURE
} from "../constants/actionTypes";

const initialState = {
  token: localStorage.getItem("user_token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  user_profile_data: {}
};

const userProfileReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case USER_PROFILE_FETCH_START:
      newState.isLoading = true;
      break;
    case USER_PROFILE_FETCH_SUCCESS:
      newState.isLoading = false;
      newState.isAuthenticated = true;
      newState.user = action.data;
      newState.user_profile_data = { ...action.data };
      break;
    case USER_PROFILE_FETCH_FAILURE:
      localStorage.removeItem("user_token");
      newState.isLoading = false;
      newState.isAuthenticated = false;
      newState.user = null;
      // newState.token = null;
      newState.errorMessage =
        "There was a problem in fetching the user profile";
      break;
  }
  return newState;
};

export default userProfileReducer;
