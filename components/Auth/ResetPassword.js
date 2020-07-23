import React, { useState, useEffect } from "react";
import { makeStyles, jssPreset } from "@material-ui/core/styles";
import { Paper, TextField, Button, Grid } from "@material-ui/core";
import Footer from "../Footer";
import Main from "../Header";
import axios from 'axios';
import { BASE_URL } from "../../constants/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    cardBody: {
        display: "flex",
        marginTop: "210px",
    },

    cardBodyReset: {
        textAlign: "center",
        boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.125)",
        borderRadius: "0.25rem",
        width: "40%",
        height: "2%",
        marginLeft: "28%",
    },


    ResetHeader: {
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: "26px",
        fontWeight: "400px",
        marginTop: "20px",
        marginBottom: "10px",
    },



    loginWithEmail: {
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: "25px",
        fontSize: "12px",
        fontWeight: "normal",
    },

    loginForm: {
        width: "80%",
        textAlign: "center",
        marginLeft: "10%",
    },


    formField: {
        paddingBottom: "20px",
    },

}));

let ResetPasswordStatus = '';

function ResetPassword(props) {
    const classes = useStyles();



    const [resetPassword, setReset] = useState({
        new_password: "",
        confirm_password: "",
        error: false,
        errors: {},
    });
    const [message, setMessage] = useState(false);
    const [OTPStatus, setOTPStatus] = useState({ status: false, email: '' });


    useEffect(() => {
        axios.get(`${BASE_URL}otp-verify/?otp=${props.match.params.id}`)
            .then((response) => {
                setOTPStatus({ ...OTPStatus, status: response.data.message.status, email: response.data.message.email })
            }).catch((err) => { console.log(err) })
    }, [])




    const handleResetPasswordChange = (e) => {
        const { name, value } = e.target;
        setReset({
            ...resetPassword,
            [name]: value,
        });
    };



    const handleResetPasswordValidation = () => {
        let errors = {};
        let formIsValid = true;

        //Password
        if (!resetPassword.new_password) {
            formIsValid = false;
            resetPassword.error = true;
            errors["new_password"] = "Cannot be empty";
        }

        //Confirm Password
        if (!resetPassword.confirm_password) {
            formIsValid = false;
            resetPassword.error = true;
            errors["confirm_password"] = "Cannot be empty";
        }

        // Password must be same
        if (typeof resetPassword.new_password !== "undefined" && typeof resetPassword.confirm_password !== "undefined") {
            if (resetPassword.new_password === resetPassword.confirm_password) {
                resetPassword.error = false;
                errors["confirm_password"] = "";
            } else {
                resetPassword.error = true;
                formIsValid = false;
                errors["confirm_password"] = "Password must be same";
            }
        }

        setReset({ ...resetPassword, errors });
        return formIsValid;
    };


    const submitResetPassword = async (e) => {
        e.preventDefault();

        const reset_password = {
            email: OTPStatus.email,
            new_password: resetPassword.new_password,
            confirm_password: resetPassword.confirm_password,
        };

        if (handleResetPasswordValidation()) {
            const ResetPassword = JSON.stringify(reset_password);
            await axios.post(`${BASE_URL}reset-password/${props.match.params.id}/`, ResetPassword, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    ResetPasswordStatus = response.data.Message;
                }).catch(err => console.log(err));

            setMessage(true)
            setReset({
                ...resetPassword,
                new_password: "",
                confirm_password: "",
                error: false,
                errors: {}
            });

            setTimeout(() => {
                if (ResetPasswordStatus === "Password has been successfully reset. Login with the new password.") {
                    props.history.push("/customer/login");
                }
            }, 3000);
        }
    };



    const gotoLogin = () => {
        props.history.push("/customer/login/");
    }




    return (
        <div className={classes.root}>
            <Main />
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.cardBody}>

                        <Paper className={classes.cardBodyReset} variant="elevation">
                            <h3 className={classes.ResetHeader}>
                                <i className="fas fa-sign-in-alt"></i> Reset Password
                            </h3>
                            {OTPStatus.status ? <>
                                <p style={{ paddingBottom: '10px' }}>for <br /> {OTPStatus.email}</p>


                                <div className={classes.loginForm}>
                                    {!message ? <>
                                        <TextField
                                            type="password"
                                            className={classes.formField}
                                            value={resetPassword.new_password || ""}
                                            onChange={handleResetPasswordChange}
                                            error={resetPassword.error}
                                            fullWidth
                                            required={true}
                                            name="new_password"
                                            label="New Password"
                                            variant="outlined"
                                            helperText={resetPassword.errors["new_password"]}

                                        />
                                        <br />
                                        <TextField
                                            type="password"
                                            className={classes.formField}
                                            value={resetPassword.confirm_password || ""}
                                            onChange={handleResetPasswordChange}
                                            error={resetPassword.error}
                                            fullWidth
                                            required={true}
                                            name="confirm_password"
                                            label="Confirm Password"
                                            variant="outlined"
                                            helperText={resetPassword.errors["confirm_password"]}
                                        />
                                        <br />
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            onClick={submitResetPassword}
                                            style={{ marginBottom: '5%',backgroundColor: "#C82257" }}
                                        >
                                            RESET PASSWORD
                                    </Button>
                                    </>
                                        :
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            style={{ marginBottom: '5%', marginTop: '3%' }}
                                            color="primary"
                                        >
                                            {ResetPasswordStatus}
                                        </Button>

                                    }
                                </div>
                            </>
                                :
                                <div style={{ marginTop: '5.5%' }}>
                                    <p style={{ fontFamily: "Roboto, sans-serif",fontWeight:'400'}}>This reset link has been expired. Please try the forgot password again.</p>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        style={{ marginBottom: '5%', marginTop: '3%' }}
                                        color="primary"
                                        onClick={gotoLogin}
                                    >
                                        forgot password
                                        </Button>
                                </div>

                            }

                        </Paper>
                    </div>

                </Grid>
            </Grid>
            <Footer />
        </div>
    );

}


export default ResetPassword;
