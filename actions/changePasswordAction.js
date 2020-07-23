import { BASE_URL } from "../constants/api";
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, } from './types';
import Axios from "axios";

const URL = `${BASE_URL}change-password/`



const changePasswordSuccess = (data) => ({type:CHANGE_PASSWORD_SUCCESS, data});

const changePasswordFail = () => ({type: CHANGE_PASSWORD_FAILURE});

const PutchangePassword = (token,data) => dispatch => {
    const change_password = JSON.stringify(data);
    const request = Axios.put(URL, change_password, {
        headers: {
            Authorization: `Token ${token}`, "Content-Type": "application/json" 
        }
    });
    request.then((response) => {
        dispatch(changePasswordSuccess(response.data))
    }).catch(err => dispatch(changePasswordFail()))
}

export default PutchangePassword;