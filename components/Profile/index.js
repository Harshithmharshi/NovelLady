import React, { useEffect, useState } from "react";

import { TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from "@material-ui/core/Snackbar";

import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { fetchUserProfileApi } from "../../actions/user_profile";
import activePage from "../../actions/active_page";
import sendAddAddressToApi from "../../actions/edit_profile";
import Footer from "../Footer";
// import Navbar from "../Header/Navbar";
import { Redirect, Link } from "react-router-dom";
import Main from "../Header";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {  
    display: "flex",
    flexDirection: "column"
  },
  profile_container: {
    width: "100%",
    maxWidth: "800px",
    margin: "50px auto",
    [theme.breakpoints.down("sm")]: {
      margin: "50px 20px",
    },
    // width: "85%",
    // margin: 0,
    // height: "90%",
    // marginTop: "50px",
    // [theme.breakpoints.down('xl')]: {
    //   marginTop: "10%",
    // },
    // [theme.breakpoints.down('md')]: {
    //   marginTop: "20%",
    // },
    // [theme.breakpoints.down('sm')]: {
    //   marginTop: "28%",
    // }
  },
  user_account: {
    textAlign: "start",
    // marginLeft: "8%"
  },

  user_account_info_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flex: 1,
    height: "100%"
  },

  sidebar: {
    flexBasis: "250px"
  },

  rightcontainer: {
    flexBasis: "100%",
    // border: "1.5px solid #c82257",
    marginLeft: "25px",
    borderRadius: "5px",
    // padding: "25px",
    paddingLeft: "25px",
    borderLeft: "1px solid #ececec",
    textAlign: "start",
    // marginBottom:'5%'
  },

  inputBox: {
    marginLeft: "30%",
    width: "45%"
  },

  labelText: {
    marginTop: 5
  },

  linkTextStyle: {
    textAlign: "start",
    color: "#212121",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
      color: "#c82257",
    }
  }
}));

function Profile(props) {
  const { email, phone, first_name, last_name } =
    props.profile.user_profile_data.customer || {};


  let changePasswordStatus;
  const [showSnackbar, setShowSnackBar] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const classes = useStyles();
  const [profile, setProfile] = useState({
    first_name: first_name ,
    last_name: last_name,
    phone: phone,
    error: false,
    errors: {}
  });



  const [formState, setFormState] = useState(false);
  const [open, setOpen] = React.useState(false);


  const [changepassword, setChangepassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
    error: false,
    confirm_passwordError: false,
    errors: {},
  });



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChangepassword({
      ...changepassword,
      old_password: "",
      new_password: "",
      confirm_password: "",
      error: false,
      confirm_passwordError: false,
      errors: {},
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangepassword({
      ...changepassword,
      [name]: value,
    });
  };


  useEffect(() => {
    props.activePage(props.location.pathname);
    window.scrollTo(0, 0);

    // if (localStorage.getItem("user_token")) {
    //   props.profileDispatch(localStorage.getItem("user_token"));
    // }
    // else {
    //   props.history.push("/customer/login");
    // }

  }, []);


  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };


  const formOnClick = () => {
    setFormState(!formState);
  };


  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!profile.first_name) {
      formIsValid = false;
      profile.error = true;
      errors["first_name"] = "Cannot be empty";
    }

    if (!profile.last_name) {
      formIsValid = false;
      profile.error = true;
      errors["last_name"] = "Cannot be empty";
    }


    // if (!profile.phone) {
    //   formIsValid = false;
    //   profile.error = true;
    //   errors["phone"] = "Cannot be empty";
    // } else if (!typeof profile.phone !== "undefined") {
    //   if (profile.phone.length === 12) {
    //     const val = profile.phone.slice(0, 2);
    //     if (Number(val) === 91) {
    //       formIsValid = true;
    //       profile.error = false;
    //     } else {
    //       formIsValid = false;
    //       errors["phone"] = "Please type the correct country code";
    //     }
    //   } else {
    //     formIsValid = false;
    //     errors["phone"] =
    //       "Please type a valid mobile no with your country code";
    //   }
    // } else {
    //   profile.error = false;
    //   errors["phone"] = "";
    // }

    setProfile({ ...profile, errors });
    return formIsValid;
  };


  const onClick = () => {
    let profileData = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone
    };

    console.log(profileData);

    if (handleValidation()) {
      props.sendProfileToServer(profileData, localStorage.getItem("user_token"));
      setFormState(!formState);
      props.profileDispatch(localStorage.getItem("user_token"));
      setProfile({
        ...profile,
        first_name: "",
        last_name: "",
        phone: "",
        errors: {}
      });
    }
  };



  const handlePasswordValidation = () => {
    let errors = {};
    var formIsValid = false;


    //Old Password
    if (!changepassword.old_password) {
      formIsValid = false;
      changepassword.error = true;
      errors["old_password"] = "Cannot be empty";
    } else {
      formIsValid = true;
      changepassword.error = false;
      errors["old_password"] = "";
    }


    //New Password
    if (!changepassword.new_password) {
      formIsValid = false;
      changepassword.error = true;
      errors["new_password"] = "Cannot be empty";
    } else {
      formIsValid = true;
      changepassword.error = false;
      errors["new_password"] = "";
    }

    if (!changepassword.confirm_password) {
      formIsValid = false;
      changepassword.error = true;
      errors["confirm_password"] = "Cannot be empty";
    } else {
      formIsValid = true;
      changepassword.error = false;
      errors["confirm_password"] = "";
    }

    //Confirm Password
    if (typeof changepassword.new_password !== 'undefined' && typeof changepassword.confirm_password !== 'undefined') {
      if (changepassword.new_password === changepassword.confirm_password) {
        formIsValid = true;
        changepassword.confirm_passwordError = false;
        errors["confirm_passworded"] = "";
      } else {
        changepassword.confirm_passwordError = true;
        // formIsValid = false;
        errors["confirm_passworded"] = "Password must be same";
      }
    }



    //check with old and entering password correct
    if (changePasswordStatus === "Old Password do not match") {
      changepassword.error = true;
      formIsValid = false;
      errors["old_password"] = "Please enter correct password"
    }
    else {
      changepassword.error = false;
      formIsValid = true;
      errors["old_password"] = "";
    }


    setChangepassword({ ...changepassword, errors: errors });
    return formIsValid;

  };


  const submitChangePassword = async e => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");
    const change_password = {
      old_password: changepassword.old_password,
      new_password: changepassword.new_password,
      confirm_password: changepassword.confirm_password,
    };
    await axios.put(`${BASE_URL}change-password/`, change_password, {
      headers: {
        Authorization: `Token ${token}`, 'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        changePasswordStatus = response.data.message;
      }).catch(err => { console.log(err) }
      );


    if (handlePasswordValidation() && changePasswordStatus === "Password changed successfully") {
      setOpen(false);
      setChangepassword({
        ...changepassword,
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    }
  };

  // console.log(props.profile.isAuthenticated)

  if (props.profile.isAuthenticated) {
    return (
      <div className={classes.root}>
        <Main />
        <div className={classes.profile_container}>
          <div className={classes.user_account}>
            {first_name ? (
              <b style={{ color: '#c82257', textTransform: 'capitalize' }}>{first_name} {last_name}</b>
            ) : (
              <b>Account</b>
            )}
            {/* <b>Account</b><br/>
            <b style={{ color: '#c82257', textTransform: 'capitalize' }}>{first_name}</b> */}
            <hr style={{ width: "100%" }} />
          </div>
          <div className={classes.user_account_info_container}>
            <div className={classes.sidebar}>
              <p
                style={{
                  textAlign: "start",
                  // marginLeft: "32%",
                  fontWeight: "bold",
                  color: props.location.pathname == "/profile" ? "#c82257" : ""
                }}
              >
                {"Profile"}
              </p>
              <hr style={{ width: "100%",}} />
              <p
                style={{
                  textAlign: "start",
                  // marginLeft: "32%",
                  // fontWeight: "bold",
                  

                }}
              >
                <Link to="/orders" className={classes.linkTextStyle}> {"My Orders"} </Link>
              </p>
              <hr style={{ width: "68%", marginLeft: "32%" }} />
              <p
                style={{
                  textAlign: "start",
                  // marginLeft: "32%",
                  // fontWeight: "bold"
                }}
              >
                <Link to="/address" className={classes.linkTextStyle}>{"Saved Address"}</Link>
              </p>
            </div>
            {/* <div
              style={{
                height: "480px",
                width: "1%",
                borderRight: "2px solid #ccddee",
                flexBasis: "1%"
              }}
            /> */}
            <div className={classes.rightcontainer}>
              <div style={{ paddingBottom: 10, paddingTop: 10 }}>
                <b style={{ fontSize: 18 }}>{"Profile Details"}</b>
              </div>
              <hr />
              <form noValidate>
                <label style={{ width: "120px", }}>First Name</label>
                {formState ? (
                  <TextField
                    value={profile.first_name}
                    onChange={handleProfileChange}
                    name="first_name"
                    className={classes.inputBox}
                    style={{ marginLeft: "10px"}}
                  />
                ) : (
                    <span style={{ marginLeft: "10px"}}> : {first_name}</span>
                  )}
                <br /> <br />
                <label style={{ width: "120px", }}>Last Name</label>
                {formState ? (
                  <TextField
                    value={profile.last_name}
                    onChange={handleProfileChange}
                    name="last_name"
                    className={classes.inputBox}
                    style={{ marginLeft: "10px"}}
                  />
                ) : (
                    <span style={{ marginLeft: "10px"}}> : {last_name}</span>
                  )}
                <br /> <br />
                <label style={{ width: "120px", }}>Mobile Number</label>
                {formState ? (
                  <TextField
                    // type="number"
                    // placeholder={phone}
                    value={profile.phone}
                    onChange={handleProfileChange}
                    name="phone"
                    error={profile.error}
                    fullWidth
                    // required={true}
                    disabled={true}
                    id="formatted-numberformat-input"
                    helperText={profile.errors["phone"]}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">+</InputAdornment>
                    //   )
                    // }}
                    className={classes.inputBox}
                    style={{ marginLeft: "10px"}}
                  />
                ) : (
                    <span style={{ marginLeft: "10px"}}> : {phone}</span>
                  )}
                <br />

                <Button
                  style={{ marginTop: "10px", outline: 0, backgroundColor: "#C82257", color: "#ffffff"}}
                  variant="contained"
                  size="small"
                  onClick={handleClickOpen}
                >
                  Change Password
                </Button>
                <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose} >
                  <DialogTitle style={{ textTransform: 'capitalize', fontSize: '10px' }}>
                    change password
                  </DialogTitle>
                  <DialogContent>
                    <form autoComplete="off" noValidate>
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={changepassword.old_password}
                        onChange={handlePasswordChange}
                        error={changepassword.error}
                        fullWidth
                        name="old_password"
                        label=" Old Password"
                        variant="outlined"
                        helperText={changepassword.errors["old_password"]}
                      />
                      <br />
                      <DialogTitle style={{ textTransform: 'capitalize', marginLeft: '-25px', fontSize: '10px' }}>
                        Enter new password
                    </DialogTitle>
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={changepassword.new_password}
                        onChange={handlePasswordChange}
                        error={changepassword.error}
                        fullWidth
                        name="new_password"
                        label=" New Password"
                        variant="outlined"
                        helperText={changepassword.errors["new_password"]}
                      />
                      <br /> <br />
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={changepassword.confirm_password}
                        onChange={handlePasswordChange}
                        error={changepassword.error}
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        variant="outlined"
                        helperText={changepassword.errors["confirm_password"]}
                      />
                      <TextField
                        style={{ marginTop: '-35px', marginLeft: '12px' }}
                        InputProps={{ disableUnderline: true }}
                        error={changepassword.confirm_passwordError}
                        helperText={changepassword.errors["confirm_passworded"]}
                      />
                      <br />
                    </form>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleClose}
                      color="primary"
                      onClick={(e) => submitChangePassword(e)}
                      style={{ outline: 0 }}
                    >
                      save
                   </Button>

                    <Button
                      variant="outlined"
                      // color="secondary"


                      size="large"
                      onClick={handleClose}
                      style={{ outline: 0, backgroundColor: "#C82257", }}
                    >
                      Cancel
                  </Button>
                    <br /> <br />
                  </DialogActions>
                </Dialog>

                <br /> <br />
                {!formState ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer"
                    }}
                    onClick={formOnClick}
                  >
                    <div>
                      <EditIcon style={{ fontSize: 18 }} />
                    </div>
                    <div style={{ paddingLeft: 10 }}>Edit</div>
                  </div>
                ) : (
                    <Button
                      variant="contained"
                      // fullWidth
                      style={{ backgroundColor: "#C82257", color: 'white' }}
                      size="medium"
                      onClick={onClick}
                    >
                      Submit
                    </Button>
                  )}
                {formState ? (
                  <Button
                    variant="contained"
                    // fullWidth
                    size="medium"
                    onClick={formOnClick}
                    style={{ marginLeft: "10px"}}
                  >
                    Cancel
                  </Button>
                ) : (
                    ""
                  )}
              </form>
            </div>
          </div>
        </div>


        {showSnackbar ? <Snackbar
          className={classes.snackBar}
          open={open}
          autoHideDuration={2000}
          onClose={() => setState({ open: false })}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert style={{ backgroundColor: "#C82257" }} variant="filled">
            Changed Successfully
      </Alert>
        </Snackbar> : ''}

        <div style={{ display: "flex", width: "100vw" }}>
          <Footer />
        </div>
      </div>
    );
  } else {
    return <Redirect to={{
        pathname: "/customer/login",
        state: {
          referrer: "/profile",
        },
      }} />
  }
}



const mapStateToProps = state => {
  return {
    profile: state.userProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileDispatch: token => dispatch(fetchUserProfileApi(token)),
    activePage: page => dispatch(activePage(page)),
    sendProfileToServer: (data, token) =>
      dispatch(sendAddAddressToApi(data, token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
