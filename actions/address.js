import {
    ADDRESS_ADD_START, ADDRESS_ADD_FAILURE, ADDRESS_ADD_SUCCESS,
    GET_ADDRESS_START, GET_ADDRESS_FAILURE, GET_ADDRESS_SUCCESS,
    PUT_ADDRESS_START, PUT_ADDRESS_SUCCESS, PUT_ADDRESS_FAILURE,
    DELETE_ADDRESS_START, DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE,



} from "../constants/actionTypes";
import Axios from "axios";
import { BASE_URL } from "../constants/api";


const URL = `${BASE_URL}customer/addAddress/`
const GET_URL = `${BASE_URL}customer/address/`
const PUT_URL = `${BASE_URL}customer/editAddress`
const DEL_URL = `${BASE_URL}customer/deleteAddress`

const sendAddressStart = () => ({ type: ADDRESS_ADD_START });

const sendAddressFailure = () => ({ type: ADDRESS_ADD_FAILURE })

const sendAddressSuccess = (data) => ({ type: ADDRESS_ADD_SUCCESS, data });

const fetchAddressApiStart = () => ({ type: GET_ADDRESS_START })

const fetchAddressApiFailure = () => ({ type: GET_ADDRESS_FAILURE })

const fetchAddressApiSuccess = (data) => ({ type: GET_ADDRESS_SUCCESS, data })

const putAddressStart = () => ({ type: PUT_ADDRESS_START });

const putAddressSuccess = (data) => ({ type: PUT_ADDRESS_SUCCESS, data });

const putAddressFailure = () => ({ type: PUT_ADDRESS_FAILURE });


const deleteAddressSuccess = (data) => ({ type: DELETE_ADDRESS_SUCCESS, data });

const deleteAddressFailure = () => ({ type: DELETE_ADDRESS_FAILURE });


export const updateAfterRemoveAddress = (data) => {
    return dispatch => {
        dispatch(fetchAddressApiSuccess(data))
    }
}


const sendAddresToApi = (body, token) => {
    const request = Axios.post(URL, body, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        },

    })
    console.log(URL, request);
    return dispatch => {
        dispatch(sendAddressStart());
        request.then((response) => {
            console.log(response)
            dispatch(sendAddressSuccess(response))
        })
            .catch((err) => dispatch(sendAddressFailure()))
    }
}

export const putAddressToApi = (body, token, id) => {

    const data = JSON.stringify(body);

    const request = Axios.put(`${PUT_URL}/${id}/`, body, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        },
    })
    console.log(request);
    return dispatch => {
        dispatch(putAddressStart());
        request.then(({ data }) => dispatch(putAddressSuccess(data)))
            .catch((err) => dispatch(putAddressFailure()))
    }
}

export const fetchAddressApi = (token, id = 1) => {
    const request = Axios(`${GET_URL}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    return dispatch => {
        dispatch(fetchAddressApiStart())
        request.then(({ data }) => {
            data.address.map(item => {
                dispatch(fetchAddressApiSuccess({ data: item, shipping: data.address }))

            })
        })
            .catch(err => dispatch(fetchAddressApiFailure()))
    }
}


export const deleteAddress = (token, addressID) => dispatch => {
    return Axios(`${DEL_URL}/${addressID}/`, {
        headers: { Authorization: `Token ${token}` }
    })
        .then(response => {
            console.log(response.data)
            dispatch(deleteAddressSuccess(response.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(deleteAddressFailure(err))
        }
        );
};

export default sendAddresToApi;
