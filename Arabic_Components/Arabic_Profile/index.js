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
import Footer from "../Arabic_Footer";
// import Navbar from "../Header/Navbar";
import { Redirect, Link } from "react-router-dom";
import Main from "../Arabic_Header";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  profile_container: {
    width: "95%",
    margin: 0,
    height: "90%",
    marginTop: "50px",
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
    marginLeft: "8%"
  },

  user_account_info_container: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
    flex: 1,
    height: "100%"
  },

  sidebar: {
    flexBasis: "18%"
  },

  rightcontainer: {
    flexBasis: "74%",
    border: "1.5px solid #ddeeff",
    marginLeft: 140,
    borderRadius: 5,
    padding: 10,
    // paddingLeft: 15,
    textAlign: "right",
    marginBottom: '5%'
  },

  inputBox: {
    // marginLeft: "30%",
    width: "30%"
  },

  labelText: {
    marginTop: 5
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
    first_name: first_name || '',
    last_name: last_name || '',
    phone: phone || '',
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


    if (!profile.phone) {
      formIsValid = false;
      profile.error = true;
      errors["phone"] = "Cannot be empty";
    } else if (!typeof profile.phone !== "undefined") {
      if (profile.phone.length === 12) {
        const val = profile.phone.slice(0, 2);
        if (Number(val) === 91) {
          formIsValid = true;
          profile.error = false;
        } else {
          formIsValid = false;
          errors["phone"] = "Please type the correct country code";
        }
      } else {
        formIsValid = false;
        errors["phone"] =
          "Please type a valid mobile no with your country code";
      }
    } else {
      profile.error = false;
      errors["phone"] = "";
    }
    setProfile({ ...profile, errors });
    return formIsValid;
  };


  const onClick = (newState) => {
    let profileData = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: `+${profile.phone}`
    };


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


  if (props.profile.isAuthenticated) {
    return (
      <div className={classes.root}>
        <Main />
        <div className={classes.profile_container}>
          <div className={classes.user_account}>
            <b style={{ textTransform: 'capitalize', marginLeft: '88%' }}>الحساب</b><br />
            <b style={{ color: '#c82257', textTransform: 'capitalize', marginLeft: '88%' }}>{first_name}</b>
            <hr style={{ width: "100%" }} />
          </div>
          <div className={classes.user_account_info_container}>
            <div className={classes.sidebar}>
              <p
                style={{
                  textAlign: "start",
                  marginLeft: "32%",
                  fontWeight: "bold",
                  color: props.location.pathname == "/profile" ? "#c82257" : ""
                }}
              >
                {"الملف الشخصي"}
              </p>
              <hr style={{ width: "68%", marginLeft: "32%", }} />
              <p
                style={{
                  textAlign: "start",
                  marginLeft: "32%",
                  fontWeight: "bold",
                  color: ' #212529'

                }}
              >
                <Link to="/orders"> {"طلباتي"} </Link>
              </p>
              <hr style={{ width: "68%", marginLeft: "32%" }} />
              <p
                style={{
                  textAlign: "start",
                  marginLeft: "32%",
                  fontWeight: "bold"
                }}
              >
                <Link to="/address">{"العنوان المحفوظ"}</Link>
              </p>
            </div>
            <div
              style={{
                height: "400px",
                width: "1%",
                borderRight: "2px solid #ccddee",
                flexBasis: "1%"
              }}
            />
            <div className={classes.rightcontainer}>
              <div style={{ paddingBottom: 10, paddingTop: 10 }}>
                <b style={{ fontSize: 18 }}>{"تفاصيل الملف الشخصي"}</b>
              </div>
              <hr />
              <form noValidate>

                {formState ? (
                  <TextField
                    value={profile.first_name}
                    onChange={handleProfileChange}
                    name="first_name"
                    className={classes.inputBox}
                    // style={{ marginLeft: "33.5%" }}
                    inputProps={{ min: 0, style: { textAlign: 'right',marginLeft: "33.5%" } }}
                  />
                ) : (
                    <span>{first_name}</span>
                  )}
                <label style={{ marginLeft: "20%" }}>الاسم الاول</label>
                <br /> <br />

                {formState ? (
                  <TextField
                    value={profile.last_name}
                    onChange={handleProfileChange}
                    name="last_name"
                    className={classes.inputBox}
                    style={{ marginLeft: "34%" }}
                    inputProps={{ min: 0, style: { textAlign: 'right',marginLeft: "33.5%" } }}
                  />
                ) : (
                    <span>{last_name}</span>
                  )}
                <label style={{ marginLeft: "22.5%" }}>الكنية</label>
                <br /> <br />

                {formState ? (
                  <TextField
                    type="number"
                    // placeholder={phone}
                    value={profile.phone}
                    onChange={handleProfileChange}
                    name="phone"
                    error={profile.error}
                    fullWidth
                    required={true}
                    id="formatted-numberformat-input"
                    helperText={profile.errors["phone"]}
                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+</InputAdornment>
                      )
                    }}
                    className={classes.inputBox}
                    style={{ marginLeft: "29.5%" }}
                  />
                ) : (
                    <span style={{ marginLeft: "27%" }}>{phone}</span>
                  )}
                <label style={{ marginLeft: "14.5%" }}>رقم الهاتف المحمول</label>
                <br /> <br />

                <Button
                  style={{ marginTop: "30px", outline: 0, backgroundColor: "#C82257" }}
                  variant="outlined"
                  size="large"
                  onClick={handleClickOpen}
                >
                  غير كلمة السر
             </Button>
                <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose} float={'right'}>
                  <DialogTitle style={{ textTransform: 'capitalize', fontSize: '10px', marginLeft: '77%' }}>
                    غير كلمة السر
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
                        label=" كلمة المرور القديمة"
                        variant="outlined"
                        helperText={changepassword.errors["old_password"]}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                      />
                      <br />
                      <DialogTitle style={{ textTransform: 'capitalize', marginLeft: '73%', fontSize: '10px' }}>
                        أدخل كلمة المرور الجديدة
                    </DialogTitle>
                      <TextField
                        className={classes.formField}
                        type="password"
                        value={changepassword.new_password}
                        onChange={handlePasswordChange}
                        error={changepassword.error}
                        fullWidth
                        name="new_password"
                        label=" كلمة سر جديدة"
                        variant="outlined"
                        helperText={changepassword.errors["new_password"]}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                        label="تأكيد كلمة المرور"
                        variant="outlined"
                        helperText={changepassword.errors["confirm_password"]}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                      />
                      <TextField
                        style={{ marginTop: '-35px', marginLeft: '12px' }}
                        InputProps={{ disableUnderline: true }}
                        error={changepassword.confirm_passwordError}
                        helperText={changepassword.errors["confirm_passworded"]}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                      حفظ
                   </Button>

                    <Button
                      variant="outlined"

                      size="large"
                      onClick={handleClose}
                      style={{ outline: 0, backgroundColor: "#C82257" }}
                    >
                      إلغاء
                  </Button>
                    <br /> <br />
                  </DialogActions>
                </Dialog>

                <br /> <br />
                {!formState ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      cursor: "pointer"
                    }}
                    onClick={formOnClick}
                  >
                    <div>
                      <EditIcon style={{ fontSize: 18 }} />
                    </div>
                    <div style={{ paddingLeft: 10 }}>تعديل</div>
                  </div>
                ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      style={{ backgroundColor: "#C82257" }}
                      size="large"
                      onClick={onClick}
                    >
                      إرسال
                    </Button>
                  )}
                <br />
                {formState ? (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={formOnClick}
                    style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    إلغاء
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
            تم التغيير بنجاح
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
