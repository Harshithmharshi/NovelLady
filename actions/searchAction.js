
import { GET_SEACRH_DATA, GET_SEACRH_DATA_FAILURE } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";



const filterString = (value) => `&filter[]=${value}`;

const filterArray = (data) => {
  let string = "";
  for (let i in data) {
    string += filterString(data[i]);
  }
  return string.toString();
};

export const fetchSearchData = (data) => {
  return {
    type: GET_SEACRH_DATA,
    payload: data,
  };
};

export const fetchSearchDataFail = () => {
  return {
    type: GET_SEACRH_DATA_FAILURE,
  };
};
export const searchData = (data,attributeID,priceValue) => (dispatch) => {
  const search_Data=data.replace(/%20/g, " ");
  return axios
    .get(`${BASE_URL}search_list/?name=${search_Data}${filterArray(attributeID)}`)
    .then((response) => {
      if (typeof priceValue !== "undefined" && priceValue.length > 0) {
        const data = response.data.Product_details
          .filter((item) => {
            console.log(item);
            if (item.selling_price >= priceValue[0] && item.selling_price <= priceValue[1]) {
              console.log(item);
              return item;
            }
          });
          console.log(data);
        dispatch(fetchSearchData(data));
      } else {
        dispatch(fetchSearchData(response.data.Product_details));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchSearchDataFail(err));
    });
};