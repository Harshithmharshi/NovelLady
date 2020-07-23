import axios from "axios";
import {
  GET_ATTRIBUTE_LIST_START,
  GET_ATTRIBUTE_LIST_SUCCESS,
  GET_ATTRIBUTE_LIST_FAILURE,
} from "../constants/actionTypes";
import { BASE_URL } from "../constants/api";
const GET_LIST_URL = `${BASE_URL}attribute-list/`;

const fetchAttributeListStart = () => ({ type: GET_ATTRIBUTE_LIST_START });
const fetchAttributeListSuccess = (data) => ({
  type: GET_ATTRIBUTE_LIST_SUCCESS,
  data,
});
const fetchAttributeListFailure = () => ({ type: GET_ATTRIBUTE_LIST_FAILURE });

export const fetchAttributeListApi = () => {
  const request = axios(GET_LIST_URL);
  return (dispatch) => {
    dispatch(fetchAttributeListStart());
    request
      .then(({ data }) => {
        const size = data
          .filter((item) => item.attributes_name == "Size")
          .map((item) => item.values);
        const color = data
          .filter((item) => item.attributes_name == "color")
          .map((item) => item.values);
        const sleeve = data
          .filter((item) => item.attributes_name == "Sleeve Length")
          .map((item) => item.values);
        dispatch(fetchAttributeListSuccess({ data}));
      })
      .catch((err) => dispatch(fetchAttributeListFailure()));
  };
};
