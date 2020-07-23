import { GET_USER_WISHLIST_LOAD,GET_USER_WISHLIST, POST_WISHLIST_ID, POST_WISHLIST_ID_FAIL, GET_USER_WISHLIST_FAIL, DELETE_WISHLIST_ID, DELETE_WISHLIST_ID_FAIL } from "./types";
import axios from "axios";
import { BASE_URL } from "../constants/api";



export const fetchUserWishListLoad = () => {
    return {
        type: GET_USER_WISHLIST_LOAD
    };
};

export const fetchUserWishList = data => {
    return {
        type: GET_USER_WISHLIST,
        payload: data,
    };
};

export const fetchUserWishListFail = () => {
    return {
        type: GET_USER_WISHLIST_FAIL
    };
};


export const postUserWishListID = data => {
    return {
        type: POST_WISHLIST_ID,
        payload: data,
    };
};

export const postUserWishListIDFail = () => {
    return {
        type: POST_WISHLIST_ID_FAIL
    };
};

export const deleteUserWishListID = data => {
    return {
        type: DELETE_WISHLIST_ID,
        payload: data,
    };
};

export const updateAfterRemoveWishList = (data) => {
    return dispatch => {
      dispatch(fetchUserWishList(data))
    }
  }

export const deleteUserWishListIDFail = () => {
    return {
        type: DELETE_WISHLIST_ID_FAIL
    };
};


export const fetchUserWishListData = token => dispatch => {
    dispatch(fetchUserWishListLoad());

    return axios.get(`${BASE_URL}wish-list/`, {
        headers: { Authorization: `Token ${token}` }
    })
        .then(response => {
            dispatch(fetchUserWishList(response.data.wishlist));
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchUserWishListFail(err))
        }
        );
};

export const postWishListID = (token, instanceID) => dispatch => {
    const postID = JSON.stringify(instanceID);
    return axios.post(`${BASE_URL}wish-list/`, postID, {
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" }
    })
        .then(response => {
            dispatch(postUserWishListID(response.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(postUserWishListIDFail(err))
        }
        );
};


export const deleteWishListID = (token, instanceID) => dispatch => {
    return axios.delete(`${BASE_URL}wish-list/?id=${instanceID}`, {
        headers: { Authorization: `Token ${token}`, 'content-type': 'application/json' }
    })
        .then(response => {
            dispatch(deleteUserWishListID(response.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(deleteUserWishListIDFail(err))
        }
        );
};