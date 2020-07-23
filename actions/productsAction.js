import { GET_PRODUCTS_LIST, GET_PRODUCTS_LIST_FAILURE,
  GET_LISTING_PRODUCTS_LIST,GET_LISTING_PRODUCTS_LIST_FAIL,GET_LISTING_PRODUCTS_LIST_LOAD,GET_PRODUCTS_LIST_LOAD } from "./types";

import {
  FETCH_SHOP_PRODUCT_DATA_FAILURE,
  FETCH_SHOP_PRODUCT_DATA_START,
  FETCH_SHOP_PRODUCT_DATA_SUCCESS,
} from "../constants/actionTypes";
import axios from "axios";
import { BASE_URL } from "../constants/api";



export const fetchProductDataLoad = () => {
  return {
    type: GET_PRODUCTS_LIST_LOAD,
  };
};


export const fetchProductListingDataLoad = () => {
  return {
    type: GET_LISTING_PRODUCTS_LIST_LOAD,
  };
};

export const fetchProductListingData = (data) => {
  return {
    type: GET_LISTING_PRODUCTS_LIST,
    payload: data,
  };
};


export const fetchProductListingDataFail = (data) => {
  return {
    type: GET_LISTING_PRODUCTS_LIST_FAIL,
   
  };
};

export const fetchProductData = (data) => {
  return {
    type: GET_PRODUCTS_LIST,
    payload: data,
  };
};


export const fetchProductDataFail = () => {
  return {
    type: GET_PRODUCTS_LIST_FAILURE,
  };
};

//Get Shop Page Products Data

const fetchShopProductDataStart = () => ({
  type: FETCH_SHOP_PRODUCT_DATA_START,
});
const fetchShopProductDataSuccess = (data) => ({
  type: FETCH_SHOP_PRODUCT_DATA_SUCCESS,
  data,
});

const fetchShopProductDataFailure = (err) => ({
  type: FETCH_SHOP_PRODUCT_DATA_FAILURE,
});


// Get Products
export const productsData = () => (dispatch) => {
  dispatch(fetchProductDataLoad());
  axios.get(`${BASE_URL}carousel-tag/`)
    .then((response) => {
      return axios.get(`${BASE_URL}products-list/?tag_id=${response.data.Carousel_tag["0"].id}`);
    })
    .then((response) => {
      dispatch(fetchProductData(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchProductDataFail(err));
    });
}


export const productsListingData = () => (dispatch) => {
  dispatch(fetchProductListingDataLoad());

  axios.get(`${BASE_URL}listing-tag/`)
    .then((response) => {
      return axios.get(`${BASE_URL}products-list/?tag_id=${response.data.Listing_tag["0"].id}`);
    })
    .then((response) => {
      dispatch(fetchProductListingData(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchProductListingDataFail(err));
    });
}




const filterString = (value) => `&filter[]=${value}`;

const filterArray = (data) => {
  let string = "";
  for (let i in data) {
    string += filterString(data[i]);
  }
  return string.toString();
};


export const productsDatas = (category_id, tag_id, value) => (
  dispatch
) => {

  // console.log(
  //   `${BASE_URL}products-list/?category_id=${category_id}${filterArray(tag_id)}`
  // );

  // console.log(`${category_id} - ${tag_id}- ${value}`)

  dispatch(fetchShopProductDataStart());
  if (category_id === "all") {
    return axios
      .get(`${BASE_URL}products-list/?all${filterArray(tag_id)}`)
      .then((response) => {
        if (typeof value !== "undefined" && value.length > 0) {
          const data = response.data
            .filter((item) => {
              if (item.selling_price >= value[0] && item.selling_price <= value[1]) {
                return item;
              }
            });
          dispatch(fetchShopProductDataSuccess(data));
        } else {
          dispatch(fetchShopProductDataSuccess(response.data));
        }
      })
      .catch((err) => dispatch(fetchShopProductDataFailure(err)))
  } else {
    // console.log(`${BASE_URL}products-list/?category_id=${category_id}${filterArray(
    //   tag_id
    // )}`)
    return axios
      .get(
        `${BASE_URL}products-list/?category_id=${category_id}${filterArray(
          tag_id
        )}`
      )
      .then((response) => {
        if (typeof value !== "undefined" && value.length > 0) {
          const data = response.data
            .filter((item) => {
              if (item.selling_price >= value[0] && item.selling_price <= value[1]) {
                return item;
              }
            });
          dispatch(fetchShopProductDataSuccess(data));
        } else {
          const data = response.data.filter(item => item.category_id == category_id);
          dispatch(fetchShopProductDataSuccess(data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchShopProductDataFailure(err));
      })
  }

};


export const authenticatedProductData = (token, category_id, tag_id, value) => dispatch => {
  dispatch(fetchShopProductDataStart());
  if (category_id === "all") {
    return axios
      .get(`${BASE_URL}products-list-customer/?all${filterArray(tag_id)}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response) => {
        if (typeof value !== "undefined" && value.length > 0) {
          const data = response.data
            .filter((item) => {
              if (item.selling_price >= value[0] && item.selling_price <= value[1]) {
                return item;
              }
            });
          dispatch(fetchShopProductDataSuccess(data));
        } else {
          dispatch(fetchShopProductDataSuccess(response.data));
        }
      })
      .catch((err) => dispatch(fetchShopProductDataFailure(err)))
  } else {
    return axios.get(
      `${BASE_URL}products-list-customer/?category_id=${category_id}${filterArray(
        tag_id
      )}`
      , {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response) => {
        if (typeof value !== "undefined" && value.length > 0) {
          const data = response.data
            .filter((item) => {
              if (item.selling_price >= value[0] && item.selling_price <= value[1]) {
                return item;
              }
            });
          dispatch(fetchShopProductDataSuccess(data));
        } else {
          const data = response.data.filter(item => item.category_id == category_id);
          dispatch(fetchShopProductDataSuccess(data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchShopProductDataFailure(err));
      })
  }

};



export const productTagDatas = (category_id, tag_id, value) => (
  dispatch
) => {
  console.log(
    `${BASE_URL}products-list/?tag_id=${category_id}${filterArray(tag_id)}`
  );
  dispatch(fetchShopProductDataStart());
  axios
    .get(
      `${BASE_URL}products-list/?tag_id=${category_id}${filterArray(tag_id)}`
    )
    .then((response) => {

      if (typeof value !== "undefined" && value.length > 0) {
        const data = response.data
          .filter((item) => {
            if (item.selling_price >= value[0] && item.selling_price < value[1]) {
              return item;
            }
          });
        dispatch(fetchShopProductDataSuccess(data));
      } else {
        dispatch(fetchShopProductDataSuccess(response.data));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchShopProductDataFailure(err));
    });
};


// export const authenticatedProductData = (
//   category_id,
//   tag_id,
//   value
// ) => (dispatch) => {
//   const token = localStorage.getItem("user_token");
//   dispatch(fetchShopProductDataStart());
//   category_id === "all"
//     ? axios
//         .get(`${BASE_URL}products-list-customer/?all/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//             // 'Cache-Control': 'no-cache ,must-revalidate, no-store',
//           },
//         })
//         .then((response) => {
//           dispatch(fetchShopProductDataSuccess(response.data));
//         })
//         .catch((err) => dispatch(fetchShopProductDataFailure(err)))
//     : axios
//         .get(`${BASE_URL}products-list-customer/?category_id=${category_id}`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         })
//         .then((response) => {
//           dispatch(fetchShopProductDataSuccess(response.data));
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(fetchShopProductDataFailure(err));
//         });
// };



export const authenticatedProductTagDatas = (token,
  category_id,
  tag_id,
  value
) => (dispatch) => {
  // const token = localStorage.getItem("user_token");
  dispatch(fetchShopProductDataStart());
  axios
    .get(`${BASE_URL}products-list-customer/?tag_id=${category_id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      dispatch(fetchShopProductDataSuccess(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchShopProductDataFailure(err));
    });
};



export const authProdList = (token) => dispatch => {
  axios.get(`${BASE_URL}carousel-tag/`)
    .then((response) => {
      return axios.get(`${BASE_URL}products-list-customer/?tag_id=${response.data.Carousel_tag["0"].id}`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
    })
    .then((response) => {
      dispatch(fetchProductData(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchProductDataFail(err));
    });
}


export const authProdListing = (token) => dispatch => {
  axios.get(`${BASE_URL}listing-tag/`)
    .then((response) => {
      return axios.get(`${BASE_URL}products-list-customer/?tag_id=${response.data.Listing_tag["0"].id}`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
    })
    .then((response) => {
      dispatch(fetchProductListingData(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(fetchProductListingDataFail(err));
    });
}

