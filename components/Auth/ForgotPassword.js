import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, } from "@material-ui/core";
import axios from 'axios';
import { BASE_URL } from "../../constants/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { supportsGoWithoutReloadUsingHash } from "history/DOMUtils";

let forgotPasswordStatus = '';


function ForgotPassword(props) {
    const [open, setOpen] = useState(false);
    const [forgotPassword, setforgotPassword] = useState({
        email: '',
        error: false,
        errors: {},
        isLoading:false
    });
    const [message, setMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        setOpen(props.open);
        window.scrollTo(0, 0);
    }, []);


    const handleClose = () => {
        setOpen(false);
    };


    const handleforgotPassword = (e) => {
        const { name, value } = e.target;
        setforgotPassword({
            ...forgotPassword,
            [name]: value,
        });
    };


    const handleForgotPwdValidation = () => {
        let errors = {};
        let formIsValid = true;

        //Email
        if (!forgotPassword.email) {
            formIsValid = false;
            forgotPassword.error = true;
            errors["forgotPassword"] = "Cannot be empty";

        } else if (typeof forgotPassword.email !== "undefined") {
            let lastAtPos = forgotPassword.email.lastIndexOf("@");
            let lastDotPos = forgotPassword.email.lastIndexOf(".");

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && forgotPassword.email.indexOf("@@") === -1 && lastDotPos > 2 && forgotPassword.email.length - lastDotPos > 2
            )
            ) {
                formIsValid = false;
                forgotPassword.error = true;
                errors["forgotPassword"] = "Email is not valid";
            } else {
                forgotPassword.error = false;
                errors["forgotPassword"] = "";
            }
        }
        setforgotPassword({ ...forgotPassword, errors: errors });
        return formIsValid;
    };


    const CheckforgotPassword = async (e) => {
        e.preventDefault();

        if (handleForgotPwdValidation()) {
            const forgot_password = {
                email: forgotPassword.email,
            };


            await axios.post(`${BASE_URL}forgot-password/`, forgot_password, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    forgotPasswordStatus = response.data.message;
                    setforgotPassword({
                        ...forgotPassword,
                        isLoading: true
                    });
                }).catch(err => console.log(err));

            setIsLoading(true)
            setMessage(true);
            setforgotPassword({
                ...forgotPassword,
                email: "",
                
            });

        }

    };



    return (
        <div >
            <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose}>
                <DialogTitle >Forgot Password</DialogTitle>
                {!message   ? <>
                    <DialogContent style={{ padding: '20px' }} >
                        <TextField
                            autoFocus
                            id="email"
                            label="Registered Email Address"
                            type="email"
                            name="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleforgotPassword}
                            error={forgotPassword.error}
                            helperText={forgotPassword.errors["forgotPassword"]}
                        />
                    </DialogContent>
                    <DialogActions style={{ padding: '20px' }}>
                        <Button variant="contained" color="primary" onClick={CheckforgotPassword}>
                            Send Reset Link
                         </Button>
                    </DialogActions>
                </>
                    :
                    <>

                        <DialogContent>
                            {forgotPassword.isLoading ? <CircularProgress color="secondary" /> : <p style={{ fontFamily: "Roboto, sans-serif",fontWeight:'400'}}>{forgotPasswordStatus}</p>}

                        </DialogContent>
                        <DialogActions style={{ padding: '20px' }}>
                            <Button
                                size="large"
                                variant="contained"
                                style={{ backgroundColor: "#C82257" }}
                                onClick={handleClose}>
                                OK
                            </Button>
                        </DialogActions>
                    </>
                }

            </Dialog>

        </div>
    );

}
export default ForgotPassword;
