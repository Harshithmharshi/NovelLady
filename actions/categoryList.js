import axios from "axios";

import {
  CATEGORY_LIST_START,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE
} from "../../src/constants/actionTypes";
import { BASE_URL } from "../constants/api";

const URL = `${BASE_URL}category-list/`;

export const fetchCategoryListData = payload => {
  return {
    data: payload,
    type: CATEGORY_LIST_SUCCESS
  };
};

export const fetchCategoryListStart = () => {
  return {
    type: CATEGORY_LIST_START
  };
};

export const fetchCategoryListFail = () => {
  return {
    type: CATEGORY_LIST_FAILURE
  };
};

export const fetchCategoryListApiData = () => {
  const request = axios(URL);
  return dispatch => {
    dispatch(fetchCategoryListStart);
    return request
      .then(({ data }) => {
        dispatch(fetchCategoryListData(data.Category_list));
      })
      .catch(err => {
        dispatch(fetchCategoryListFail());
      });
  };
};
