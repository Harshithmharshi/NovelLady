import {
  ADD_REVIEW, ADD_REVIEW_FAIL,
  GET_REVIEW, GET_REVIEW_FAIL,
  EDIT_REVIEW, EDIT_REVIEW_FAIL,
  CUSTOMER_REVIEW, CUSTOMER_REVIEW_FAIL
} from './types';
import axios from 'axios'
import { BASE_URL } from "../constants/api";

export const addReview = data => {
  return {
    type: ADD_REVIEW,
    payload: data
  }
}

export const addReviewFail = () => {
  return {
    type: ADD_REVIEW_FAIL
  }
};

export const getReview = data => {
  return {
    type: GET_REVIEW,
    payload: data
  }
}

export const getReviewFail = () => {
  return {
    type: GET_REVIEW_FAIL
  }
};


export const getCustomerReview = data => {
  return {
    type: CUSTOMER_REVIEW,
    payload: data
  }
}

export const getCustomerReviewFail = () => {
  return {
    type: CUSTOMER_REVIEW_FAIL
  }
};


export const editReview = data => {
  return {
    type: EDIT_REVIEW,
    payload: data
  }
}

export const editReviewFail = () => {
  return {
    type: EDIT_REVIEW_FAIL
  }
};




export const AddReview = (token, reviewdata) => dispatch => {
  const add_review = JSON.stringify(reviewdata);

  return axios.post(`${BASE_URL}addReviews/`, add_review, {
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
  })
    .then(response => {
      console.log("Added Review Response : ", response.data)
      dispatch(addReview(response.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(addReviewFail(err))
    }
    )
};


export const getReviewDetails = id => dispatch => {
  return axios.get(`${BASE_URL}reviews/?product_id=${id}`)
    .then(response => {

      dispatch(getReview(response.data));


    })
    .catch(err => {
      console.log(err)
      dispatch(getReviewFail(err))
    }
    );
};


export const customerReviewDetails = (token, id) => dispatch => {
  return axios.get(`${BASE_URL}customerReview/?product_id=${id}`, {
    headers: { Authorization: `Token  ${token}`, 'Content-Type': 'application/json' }
  })
    .then(response => {

      dispatch(getCustomerReview(response.data));


    })
    .catch(err => {
      dispatch(getCustomerReviewFail(err))
    }
    );
};


export const EditReview = (token, Editdata, id) => dispatch => {
  const edit_review = JSON.stringify(Editdata);

  return axios.put(`${BASE_URL}editReviews/${id}/`, edit_review, {
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
  })
    .then(response => {
      dispatch(editReview(response.data))
    })
    .catch(err => {
      console.log(err)
      dispatch(editReviewFail(err))
    }
    )
};
