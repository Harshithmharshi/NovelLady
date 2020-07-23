import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Grid, Snackbar } from "@material-ui/core";
import PropTypes from "prop-types";
import Footer from "../Arabic_Footer";
// import Navbar from "./Header/Navbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import FacebookIcon from "@material-ui/icons/Facebook";
import { getLoginData } from "../../actions/loginAction";
import { getRegisterData } from "../../actions/registerAction";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../Arabic_Header";
import ForgotPassword from "./ForgotPassword";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';
import { postDataToApi } from "../../actions/add_to_cart.action";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  cardBody: {
    display: "flex",
    marginTop: "50px",
    flexDirection: 'row-reverse',
    marginRight: '70px'
  },

  cardBodyLogin: {
    textAlign: "center",
    boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.125)",
    borderRadius: "0.25rem",
    width: "40%",
    height: "2%",
    marginLeft: "9%",
  },

  cardBodySignup: {
    textAlign: "center",
    boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.125)",
    borderRadius: "0.25rem",
    width: "42%",
    height: "200%",
    marginBottom: '20px',
    marginLeft: "3.2rem",
    [theme.breakpoints.up("xs")]: {
      width: "42%",
    },
  },

  loginHeader: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "26px",
    fontWeight: "400px",
    marginTop: "20px",
  },

  loginWithSocialMedia: {
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "35px",
    fontSize: "12px",
    fontWeight: "normal",
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

  singupForm: {
    width: "80%",
    marginLeft: "10%",
  },
  FacebookBtn: {
    textTransform: "capitalize",
    backgroundColor: "#1877f2",
    color: "white",
    width: "116%",
    transition:
      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    "&:hover": {
      backgroundColor: "#1877f2",
      color: "black",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  signInBtn: {
    textTransform: "capitalize",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  formField: {
    paddingBottom: "15px",
  },

  socialMediaBtn: {
    display: "flex",
    justifyContent: "space-around",
  },

  forgetPassword: {
    marginLeft: "4%",
    marginTop: ".5rem",
    fontWeight: "normal",
    fontSize: "14px",
    "&:hover": {
      cursor: 'pointer'
    }
  },

  formatNumber: {
    marginRight: "350px",
    marginTop: "0px",
    fontWeight: "normal",
    fontSize: "12px",
  },
}));

function Login(props) {
  const classes = useStyles();

  const [login, setLogin] = useState({
    loginEmailAddress: "",
    loginPassword: "",
    error: false,
    errors: {},
  });

  const [signup, setSignup] = useState({
    signupEmailAddress: "",
    signupPassword: "",
    signupcPassword: "",
    mobilenumber: "",
    error: false,
    errors: {},
  });

  const [open, setOpen] = useState(false);


  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { snackOpen } = state;

  useEffect((newState) => {
    if (!props.logIn && props.logInError) {
      setState({ snackOpen: true, ...newState });
    }
    else {
      setState({ snackOpen: false, ...newState });
    }
  }, [props])


  const handleClickOpen = () => {
    setOpen(!open);
  };


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };



  const handleLoginValidation = () => {
    let errors = {};
    let formIsValid = true;

    //Email
    if (!login.loginEmailAddress) {
      formIsValid = false;
      login.error = true;
      errors["loginEmailAddress"] = "Cannot be empty";
    } else if (typeof login.loginEmailAddress !== "undefined") {
      let lastAtPos = login.loginEmailAddress.lastIndexOf("@");
      let lastDotPos = login.loginEmailAddress.lastIndexOf(".");

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && login.loginEmailAddress.indexOf("@@") === -1 && lastDotPos > 2 && login.loginEmailAddress.length - lastDotPos > 2
      )
      ) {
        formIsValid = false;
        login.error = true;
        errors["loginEmailAddress"] = "Email is not valid";
      } else {
        login.error = false;
        errors["loginEmailAddress"] = "";
      }
    }

    //Password
    if (!login.loginPassword) {
      formIsValid = false;
      login.error = true;
      errors["loginPassword"] = "Cannot be empty";
    } else {
      login.error = false;
      errors["loginPassword"] = "";
    }

    setLogin({ ...login, errors: errors });
    return formIsValid;
  };



  const handleSignupValidation = () => {
    let errors = {};
    let formIsValid = true;

    //User Name
    // if (!signup.username) {
    //   formIsValid = false;
    //   signup.error = true;
    //   errors["username"] = "Cannot be empty";
    // } else {
    //   formIsValid = false;
    //   signup.error = false;
    //   errors["username"] = "";
    // }

    //Email
    if (!signup.signupEmailAddress) {
      formIsValid = false;
      signup.error = true;
      errors["signupEmailAddress"] = "Cannot be empty";
    }

    if (typeof signup.signupEmailAddress !== "undefined") {
      let lastAtPos = signup.signupEmailAddress.lastIndexOf("@");
      let lastDotPos = signup.signupEmailAddress.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          signup.signupEmailAddress.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          signup.signupEmailAddress.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        signup.error = true;
        errors["signupEmailAddress"] = "Email is not valid";
      } else {
        signup.error = false;
        errors["signupEmailAddress"] = "";
      }
    }

    //Password
    if (!signup.signupPassword) {
      formIsValid = false;
      signup.error = true;
      errors["signupPassword"] = "Cannot be empty";
    } else {
      signup.error = false;
      errors["signupPassword"] = "";
    }

    if (!signup.signupcPassword) {
      formIsValid = false;
      signup.error = true;
      errors["signupcPassword"] = "Cannot be empty";
    } else {
      signup.error = false;
      errors["signupcPassword"] = "";
    }

    //Confirm Password
    if (
      typeof signup.signupPassword !== "undefined" &&
      typeof signup.signupcPassword !== "undefined"
    ) {
      if (signup.signupPassword === signup.signupcPassword) {
        formIsValid = true;
        signup.error = false;
        errors["signupcPassword"] = "";
      } else {
        signup.error = true;
        formIsValid = false;
        errors["signupcPassword"] = "Password must be same";
      }
    }

    //MobileNumber
    if (!signup.mobilenumber) {
      formIsValid = false;
      signup.error = true;
      errors["mobilenumber"] = "Cannot be empty";
    } else if (!typeof signup.mobilenumber !== "undefined") {
      if (signup.mobilenumber.length === 12) {
        const val = signup.mobilenumber.slice(0, 2);
        if (Number(val) === 91) {
          formIsValid = true;
          signup.error = false;
        } else {
          formIsValid = false;
          errors["mobilenumber"] = "Please type the correct country code";
        }
      } else {
        formIsValid = false;
        errors["mobilenumber"] =
          "Please type the country code before the mobile number";
      }
    } else {
      signup.error = false;
      errors["mobilenumber"] = "";
    }


    setSignup({ ...signup, errors: errors });
    return formIsValid;
  };



  const submitLogin = async (e) => {
    e.preventDefault();

    let login_data = {
      email: login.loginEmailAddress,
      password: login.loginPassword,
    };

    if (handleLoginValidation()) {
      props.getLoginData(login_data);
      setLogin({
        ...login,
        username: "",
        loginEmailAddress: "",
        loginPassword: "",
      });
    }
  };

  const submitSignup = (e) => {
    e.preventDefault();

    let signup_data = {
      email: signup.signupEmailAddress,
      password: signup.signupPassword,
      cpassword: signup.signupcPassword,
      username: signup.username,
      phone: `+${signup.mobilenumber}`,
    };

    if (handleSignupValidation()) {
      props.getRegisterData(signup_data);
      setSignup({
        ...signup,
        username: "",
        signupEmailAddress: "",
        signupPassword: "",
        signupcPassword: "",
        mobilenumber: "",
      });
    }

  };

  // var token = localStorage.getItem("user_token");
  // var decoded = jwt.decode(token);
  // console.log(decoded);


  if (localStorage.getItem("user_token") && localStorage.getItem("Cart_Details") && localStorage.getItem("Cart_Details").length > 0) {
    const locItems = JSON.parse(localStorage.getItem("Cart_Details"));
    locItems.mycart.map(item => {
      return props.postDataToApi(localStorage.getItem("user_token"), item)
    });
    localStorage.removeItem("Cart_Details")
  }


  if (localStorage.getItem("user_token") &&
    props.location.state.referrer.pathname === "/wishlist"
  ) {
    return <Redirect to="/wishlist" />;
  } else if (localStorage.getItem("user_token") &&
    props.location.state.referrer.pathname === "/cart"
  ) {
    return <Redirect to="/cart" />;
  } else if (
    localStorage.getItem("user_token") &&
    props.location.state.referrer === "/profile"
  ) {
    return <Redirect to="/profile" />;
  } else if (
    localStorage.getItem("user_token") &&
    props.location.state.referrer.pathname === "/orders"
  ) {
    return <Redirect to="/orders" />;
  } else if (
    localStorage.getItem("user_token") &&
    props.location.state.referrer.pathname === "/address"
  ) {
    return <Redirect to="/address" />;
  }
  else if (
    localStorage.getItem("user_token") &&
    props.location.state.referrer.pathname === "/shipping"
  ) {
    return <Redirect to="/shipping" />;
  } else if (
    localStorage.getItem("user_token") &&
    props.location.state.referrer === "/shop"
  ) {
    return <Redirect to="/shop" />;
  }
  else if (localStorage.getItem("user_token")) {
    return <Redirect to="/" />;
  }
  else {
    return (
      <div className={classes.root}>
        <Main />

        {props.loadingLoginData || props.isRegisterLoad ?
          <div style={{ marginLeft: '2%', padding: '150px', paddingBottom: '150px' }}>
            <CircularProgress color="secondary" />
          </div>
          :
          <Grid container >
            <Grid item xs={12} >
              <div className={classes.cardBody}>
                <Paper className={classes.cardBodyLogin} variant="elevation">
                  <h3 className={classes.loginHeader}>
                    <i className="fas fa-sign-in-alt"></i> تسجيل الدخول
                </h3>
                  <h6 className={classes.loginWithSocialMedia}>تسجيل الدخول باستخدام البريد الإلكتروني</h6>
                  {/*     <div className={classes.socialMediaBtn}>
                  <div className={classes.socialMedia}>
                    <Button
                      className={classes.FacebookBtn}
                      variant="contained"
                      href="#contained-buttons"
                      startIcon={<FacebookIcon />}
                    >
                      Login with facebook
                    </Button>
                  </div>
                  <div className={classes.socialMedia}>
                    <Button
                      className={classes.signInBtn}
                      variant="contained"
                      startIcon={
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          width="20px"
                          alt="google-singIn"
                        />
                      }
                    >
                      sign in
                    </Button>
                    </div>
                    </div>
                    <h6 className={classes.loginWithEmail}>or use email</h6>
                    */}


                  <div className={classes.loginForm}>
                    <form autoComplete="off" noValidate>
                      <TextField
                        type="email"
                        className={classes.formField}
                        value={login.loginEmailAddress || ""}
                        onChange={handleLoginChange}
                        error={login.error}
                        fullWidth
                        required={true}
                        name="loginEmailAddress"
                        label="عنوان البريد الالكترونى"
                        variant="outlined"
                        helperText={login.errors["loginEmailAddress"]}
                      />
                      <br />
                      <TextField
                        type="password"
                        className={classes.formField}
                        value={login.loginPassword || ""}
                        onChange={handleLoginChange}
                        error={login.error}
                        fullWidth
                        required={true}
                        name="loginPassword"
                        label="كلمه السر"
                        variant="outlined"
                        helperText={login.errors["loginPassword"]}
                      />

                      <br />
                      <Button
                        variant="contained"
                        fullWidth
                        style={{ backgroundColor: "#C82257", color: 'white' }}
                        size="large"
                        onClick={submitLogin}
                      >
                        تسجيل الدخول
                    </Button>
                    </form>
                  </div>
                  <h6 className={classes.forgetPassword} onClick={handleClickOpen}>نسيت كلمة المرور؟</h6>
                  {open ? <ForgotPassword getBack={handleClickOpen} open={open} /> : ''}

                </Paper>

                <Paper className={classes.cardBodySignup} variant="elevation">
                  <h3 className={classes.loginHeader}>
                    <i
                      className="fas fa-user-plus"
                      style={{ paddingRight: "5px" }}
                    ></i>
                سجل
                </h3>
                  <div className={classes.singupForm}>
                    <form autoComplete="off" noValidate>
                      <TextField
                        type="email"
                        className={classes.formField}
                        value={signup.signupEmailAddress || ""}
                        onChange={handleSignupChange}
                        error={signup.error}
                        fullWidth
                        required={true}
                        name="signupEmailAddress"
                        label="عنوان البريد الالكترونى"
                        variant="outlined"
                        helperText={signup.errors["signupEmailAddress"]}
                      />
                      <br />
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={signup.signupPassword || ""}
                        onChange={handleSignupChange}
                        error={signup.error}
                        fullWidth
                        required={true}
                        name="signupPassword"
                        label="كلمه السر"
                        variant="outlined"
                        helperText={signup.errors["signupPassword"]}
                      />
                      <br />
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={signup.signupcPassword || ""}
                        onChange={handleSignupChange}
                        error={signup.error}
                        fullWidth
                        required={true}
                        name="signupcPassword"
                        label="تأكيد كلمة المرور"
                        variant="outlined"
                        helperText={signup.errors["signupcPassword"]}
                      />
                      <br />
                      <TextField
                        type="number"
                        className={classes.formField}
                        value={signup.mobilenumber || ""}
                        onChange={handleSignupChange}
                        error={signup.error}
                        fullWidth
                        required={true}
                        name="mobilenumber"
                        label="رقم الهاتف المحمول"
                        variant="outlined"
                        id="formatted-numberformat-input"
                        helperText={signup.errors["mobilenumber"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">+</InputAdornment>
                          ),
                        }}
                      />
                      <br />
                      <h6 className={classes.formatNumber}>
                        شكل: +911234567890
                    </h6>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={submitSignup}
                        style={{ marginBottom: '5%', backgroundColor: "#C82257", color: 'white' }}
                      >
                        سجل
                    </Button>
                    </form>
                  </div>
                </Paper>
              </div>
            </Grid>
          </Grid>
        }

        {props.logInError ?
          <Snackbar
            className={classes.snackBar}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={state.snackOpen}
            autoHideDuration={2000}
            onClose={() => setState({ ...state, snackOpen: false })}
          >
            <Alert
              onClose={() => setState({ ...state, snackOpen: false })}
              severity="error"
              variant="filled">
              Incorrect Email / Password
            </Alert>
          </Snackbar>
          :
          ''}
        <div style={{ paddingTop: '20px' }}>

          <Footer />
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  logIn: state.logIn.logInData,
  logInError: state.logIn.logInError,
  loadingLoginData: state.logIn.loadingLoginData,
  registerData: state.registerData.registerData,
  isRegisterLoad: state.registerData.isRegisterLoad
});

export default connect(mapStateToProps, { getLoginData, getRegisterData, postDataToApi })(
  Login
);
