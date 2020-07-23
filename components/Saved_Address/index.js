import React, { useEffect, useState } from "react";

import { TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { fetchUserProfileApi } from "../../actions/user_profile";
import activePage from "../../actions/active_page";
import sendAddAddressToApi from "../../actions/edit_profile";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Footer from "../Footer";
import { Redirect, Link, withRouter, NavLink } from "react-router-dom";
import sendAddresToApi, {
  fetchAddressApi,
  putAddressToApi,
  deleteAddress,

} from "../../actions/address";
import Main from "../Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  profile_container: {
    width: "100%",
    maxWidth: "1320px",
    margin: "50px auto",
    [theme.breakpoints.down("lg")]: {
      margin: "50px 20px",
    },
    // width: "85%",
    // margin: 0,
    // height: "90%",
    // [theme.breakpoints.down('xl')]: {
    //   marginTop: "4%",
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
    // marginLeft: "8%",
    // justifyContent: "space-between",
    // display: "flex",
  },

  user_account_info_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flex: 1,
    height: "100%",
  },

  sidebar: {
    flexBasis: "250px",
  },

  sideName: {
    textAlign: "start",
  //  marginLeft: "32%",
    fontWeight: "bold",
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


  labelText: {
    marginTop: 5,
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

const SavedAddress = (props) => {
  const { email, phone, first_name: name, last_name } = props.profile.user_profile_data.customer || {};
  // const data_address = props.address.addressData ||[].map(item => item);
  // const {first_name} = data_address;
  // console.log(data_address, first_name)
  // const { data } = props.address.addressData || {};

  // const {
  //   first_name,
  //   last_name,
  //   street_address_1,
  //   street_address_2,
  //   country,
  //   country_area,
  //   city,
  //   city_area,
  //   company_name,
  //   postal_code,
  //   id,
  //   default_address
  // } = data || {};




  const classes = useStyles();

  const [address, setAddress] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    street_address_1: "",
    street_address_2: "",
    country: "",
    city: "",
    company_name: "",
    is_active: true,
    postal_code: "",
    error: false,
    errors: {},
    default_address: false
  });


  const [formState, setFormState] = useState(false);
  const [formPostState, setFormPostState] = useState(false);
  const [formPutState, setFormPutState] = useState(false);
  const [val, setVal] = useState([]);

  let { shipping } = props.address.addressData || {};


  useEffect(() => {
    props.activePage(props.location.pathname);
    props.getAddress(localStorage.getItem("user_token"));
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    setVal(shipping);
  }, [shipping]);

  // const handleChange = (event) => {
  //   setAddress({ ...address, default_address: true });
  // };


  const reloadPage = () => {
    setTimeout(function () {
      document.location.reload()
    }, 1000);
  }



  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };



  const formOnClick = () => {
    window.scrollTo(0, 0);
    setFormPostState(!formPostState);
    setFormState(!formState);
  };


  const formOnClickEdit = (event, data) => {
    event.preventDefault();

    window.scrollTo(0, 0);
    setFormPutState(!formPutState);
    setFormState(!formState);

    console.log("formPutState", formPutState);
    console.log("data", data);

    setAddress({
      ...address,
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: (data.phone).substr(1),
      company_name: data.company_name,
      country: data.country,
      city: data.city,
      street_address_1: data.street_address_1,
      street_address_2: data.street_address_2,
      postal_code: data.postal_code,
      default_address: data.default_address,
    });



  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;


    if (!address.first_name) {
      formIsValid = false;
      address.error = true;
      errors["first_name"] = "Cannot be empty";
    }

    if (!address.country) {
      formIsValid = false;
      address.error = true;
      errors["country"] = "Cannot be empty";
    }

    if (typeof address.country !== "undefined") {
      if (address.country.length === 2) {
        address.error = false;
        errors["country"] = "";
      } else {
        address.error = true;
        formIsValid = false;
        errors["country"] = "Please enter the country code";
      }
    }


    if (!address.street_address_1) {
      formIsValid = false;
      address.error = true;
      errors["street_address_1"] = "Cannot be empty";
    }

    if (!address.street_address_2) {
      formIsValid = false;
      address.error = true;
      errors["street_address_2"] = "Cannot be empty";
    }

    if (!address.street_address_1) {
      formIsValid = false;
      address.error = true;
      errors["street_address_1"] = "Cannot be empty";
    }

    if (!address.postal_code) {
      formIsValid = false;
      address.error = true;
      errors["postal_code"] = "Cannot be empty";
    }

    // if (!address.company_name) {
    //   formIsValid = false;
    //   address.error = true;
    //   errors["company_name"] = "Cannot be empty";
    // }

    if (!address.last_name) {
      formIsValid = false;
      address.error = true;
      errors["last_name"] = "Cannot be empty";
    }

    // if (!address.country_area) {
    //   formIsValid = false;
    //   address.error = true;
    //   errors["country_area"] = "Cannot be empty";
    // }

    if (!address.city) {
      formIsValid = false;
      address.error = true;
      errors["city"] = "Cannot be empty";
    }


    // if (!address.city_area) {
    //   formIsValid = false;
    //   address.error = true;
    //   errors["city_area"] = "Cannot be empty";
    // }


    if (!address.phone) {
      formIsValid = false;
      address.error = true;
      errors["phone"] = "Cannot be empty";
    } else if (!typeof address.phone !== "undefined") {
      if (address.phone.length === 12) {
        const val = address.phone.slice(0, 2);
        if (Number(val) === 91) {
          formIsValid = true;
          address.error = false;
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
      address.error = false;
      errors["phone"] = "";
    }

    setAddress({ ...address, errors });
    return formIsValid;

  };

  const onClick = () => {

    let profileData = {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: `+${address.phone}`,
      company_name: address.company_name,

      country: address.country,
      city: address.city,
      is_active: address.is_active,
      default_address: address.default_address,
      street_address_1: address.street_address_1,
      street_address_2: address.street_address_2,
      postal_code: address.postal_code,
    };

    console.log("profileData", profileData);


    if (handleValidation() && formPostState) {
      props.sendAddress(profileData, localStorage.getItem("user_token"));
      setTimeout(() => {
        props.getAddress(localStorage.getItem("user_token"));
      }, 10)
      setFormState(!formState);
      setAddress({
        ...address,
        first_name: "",
        last_name: "",
        phone: "",
        company_name: "",
        country: "",
        city: "",
        street_address_1: "",
        street_address_2: "",
        postal_code: "",
        default_address: false,
        errors: {},
      });

    } else if (handleValidation() && formPutState) {


      let editAddress = {
        ...address,
        phone: `+${address.phone}`
      };

      console.log("editAddress", editAddress);
      console.log('data.id', editAddress.id);

      props.putAddress(editAddress, localStorage.getItem("user_token"), editAddress.id);

      setTimeout(() => {
        props.getAddress(localStorage.getItem("user_token"));
      }, 10)
      setFormState(!formState);
      setAddress({
        ...address,
        first_name: "",
        last_name: "",
        phone: "",
        company_name: "",
        country: "",
        city: "",
        street_address_1: "",
        street_address_2: "",
        postal_code: "",
        default_address: false,
        errors: {},
      });
    }

    reloadPage();
  };



  const deleteSavedAddress = (e, id) => {
    e.preventDefault();
    props.deleteAddress(localStorage.getItem("user_token"), id);
    reloadPage();
  }


  const makeDefault = (e, item) => {
    let makeDefaultData = {
      ...item,
      default_address: true,
    };

    console.log('makedefault', makeDefaultData);
    props.putAddress(makeDefaultData, localStorage.getItem("user_token"), item.id);
    setTimeout(() => {
      props.getAddress(localStorage.getItem("user_token"));
    }, 10);
    reloadPage();
  };


  return (
    <div className={classes.root}>
      <Main />

      <div className={classes.profile_container}>
        <div className={classes.user_account}>
          <div>
            {name ? (
              <b style={{ color: '#c82257', textTransform: 'capitalize' }}>{name} {last_name}</b>
            ) : (
              <b>Account</b>
            )}
          </div>
          {/* <div>
            <b>Account</b>
            <p>{name}</p>
          </div> */}
          {/* <div style={{ float: 'left', marginTop: '1%', marginRight: '34%' }}><span style={{ fontSize: '25px', whiteSpace: 'nowrap' }}>Saved Addresses</span></div> */}
          
        </div>
        <hr style={{ width: "100%"}} />
        <div className={classes.user_account_info_container}>
          <div className={classes.sidebar}>
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/profile" ? "#c82257" : ' #212121', }}
            >
              <NavLink
                to="/profile"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.linkTextStyle}
              >
                Profile
              </NavLink>
            </p>
            <hr style={{ width: "100"}} />
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/orders" ? "#c82257" : ' #212121', }}
            >
              <NavLink
                to="/orders"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.linkTextStyle}
              >
                {" "}
                {"My Orders"}{" "}
              </NavLink>
            </p>
            <hr style={{ width: "100%"}} />
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/address" ? "#c82257" : "", }}
            >
              <NavLink
                to="/address"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.linkTextStyle}
              >
                {"Saved Address"}
              </NavLink>
            </p>
          </div>


          {/* <div
            style={{
              height: formState ? "542px" : "373px",
              width: "1%",
              borderRight: "2px solid #ccddee",
              flexBasis: "1%",
              marginBottom: '50px'
            }}
          /> */}
          <div className={classes.rightcontainer}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ paddingBottom: 10, paddingTop: 10}}>
                <b style={{ fontSize: 18 }}>
                  {!formState && !formPutState
                    ? "DEFAULT ADDRESS"
                    : formPutState
                      ? "Edit Address"
                      : "Add a new Address"}
                </b>
              </div>

              <div>
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "#C82257", whiteSpace: 'nowrap', color: 'white' }}
                  onClick={formOnClick}>
                  Add a new address
                </Button>
              </div>
            
            </div>

            <hr />


            <form noValidate>
              <div>
                {!formState ? _.map(val, (item) => {
                  if (item.default_address === true) {
                    return <>
                      <p>
                        {" "}
                        <b>{item.first_name} {item.last_name}</b><br />
                        {item.street_address_1}<br />
                        {item.street_address_2}<br />
                        {item.city} <br />
                        {item.country} - {item.postal_code}
                      </p>
                      <p>Mobile : {item.phone}</p>

                      <Button
                        variant="outlined"
                        style={{ backgroundColor: "#C82257", color: 'white'}}
                        onClick={(e) => deleteSavedAddress(e, item.id)}
                      >
                        Delete
                      </Button>
                      <br />
                      <br />
                    </>
                  }
                }
                ) : (
                    <div style={{ display: 'grid', maxWidth: '500px' }}>
                      <label>First Name</label>
                      <TextField
                        required
                        value={address.first_name}
                        placeholder="Type your first name"
                        onChange={handleProfileChange}
                        name="first_name"
                        fullWidth
                        className={classes.inputBox}
                        error={address.error}
                        helperText={address.errors["first_name"]}
                        variant="outlined"
                      />
                      <br />


                      <label>Last Name</label>
                      <TextField
                        value={address.last_name}
                        onChange={handleProfileChange}
                        placeholder="Type your last name"
                        name="last_name"
                        fullWidth
                        className={classes.inputBox}

                        error={address.error}
                        helperText={address.errors["last_name"]}
                        variant="outlined"
                      />{" "}
                      <br />

                      <label>Phone</label>
                      <TextField
                        type="number"
                        value={`${address.phone}`}
                        onChange={handleProfileChange}
                        placeholder="911234567890"
                        error={address.error}
                        fullWidth
                        required={true}
                        name="phone"
                        id="formatted-numberformat-input"
                        helperText={address.errors["phone"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">+</InputAdornment>
                          ),
                        }}
                        className={classes.inputBox}
                        variant="outlined"
                      />

                      <br />


                      <label>Street Address</label>
                      <TextField
                        type="text"
                        placeholder="Type your street address"
                        value={address.street_address_1}
                        onChange={handleProfileChange}
                        name="street_address_1"
                        error={address.error}
                        fullWidth
                        className={classes.inputBox}
                        required={true}
                        helperText={address.errors["street_address_1"]}
                        variant="outlined"
                      />
                      <br />

                      <label>Street Address 2</label>
                      <TextField
                        type="text"
                        placeholder="Type your street address 2"
                        value={address.street_address_2}
                        onChange={handleProfileChange}
                        name="street_address_2"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}
                        helperText={address.errors["street_address_2"]}
                        variant="outlined"

                      />
                      <br />

                      <label>Company Name</label>
                      <TextField
                        type="text"
                        placeholder="Type your company name"
                        value={address.company_name}
                        onChange={handleProfileChange}
                        name="company_name"
                        fullWidth
                        className={classes.inputBox}
                        variant="outlined"
                      />

                      <br />

                      <label>City</label>
                      <TextField
                        type="text"
                        placeholder="Type your city"
                        value={address.city}
                        onChange={handleProfileChange}
                        name="city"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}

                        helperText={address.errors["city"]}
                        variant="outlined"
                      />
                      <br />


                      <label>Postal Code</label>
                      <TextField
                        type="number"
                        placeholder="Type your postal code"
                        value={address.postal_code}
                        onChange={handleProfileChange}
                        name="postal_code"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}
                        helperText={address.errors["postal_code"]}
                        variant="outlined"
                      />
                      <br />

                      <InputLabel htmlFor="filled-age-native-simple">Country</InputLabel>
                      <Select
                        native
                        name="country"
                        value={address.country}
                        onChange={handleProfileChange}
                        required={true}
                        error={address.error}
                      >
                        <option aria-label="None" value="" />
                        <option value={"SA"}>SA</option>
                        <option value={"IN"}>IN</option>
                      </Select>
                      {/* <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={address.default_address}
                            onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="Make this as my default address"
                      /> */}
                      <br />
                      <div style={{ display: 'flex'}}>
                      <Button
                        variant="contained"
                        // fullWidth
                        size="medium"
                        onClick={onClick}
                        style={{ marginTop: 15, backgroundColor: "#C82257", color: 'white', width: '150px'}}
                      >
                        Submit
                    </Button>

                      <Button
                        variant="contained"
                        // fullWidth
                        size="medium"
                        onClick={formOnClick}
                        style={{ marginTop: 15, width: '100px', marginLeft: '20px'}}
                      >
                        Cancel
                    </Button>
                    </div>

                    </div>
                  )}
              </div>
            </form>
            
            {/* Other addresses */}
            <div style={{ marginBottom: "2%", marginTop: "2%", whiteSpace: 'nowrap' }}><b>YOUR ADDRESSES</b></div>
            <p>Please select an address as default!</p>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={44}>
                <Grid container >
                  {_.map(val, (item) => {
                    const {
                      first_name,
                      last_name,
                      city,
                      postal_code,
                      country,
                      phone,
                      street_address_1,
                      street_address_2,
                      is_active,
                      default_address,
                      id
                    } = item;
                    if (default_address === false) {
                      return (<>
                        <Grid key={id} item style={{ width: "50%", marginTop: "10px" }}>
                          <div className={classes.rightcontainer} >
                            <p>
                            <b>{item.first_name} {item.last_name}</b><br></br>
                            {street_address_1}<br></br>
                            {street_address_2}<br></br>
                            {city}<br></br>
                            {country} {postal_code}
                            </p>
                            <p>Mobile:- {phone}</p>
                            <span style={{ color: "#C82257", cursor: "pointer", marginTop: "10px", border: '0.5px solid #ececec', padding: '5px 10px', borderRadius: '10px' }} onClick={(e) => makeDefault(e, item)}>Make as default</span>
                            <br />
                            <br />

                            <Button
                              variant="outlined"
                              style={{ backgroundColor: "#C82257", marginBottom: 20 }}
                              onClick={(e) => { formOnClickEdit(e, item) }}

                            >
                              <EditIcon style={{ fontSize: 18 }} /> Edit
                              </Button>

                            <Button
                              variant="outlined"
                              style={{ backgroundColor: "#C82257", marginLeft: 20, marginBottom: 20 }}
                              onClick={(e) => deleteSavedAddress(e, id)}
                            >
                              Delete
                              </Button>
                          </div>
                        </Grid>
                        <br />
                      </>
                      );
                    }
                  })}
                </Grid>
              </Grid>
            </Grid>

          </div>
        </div>

        
      </div>

      <div style={{ display: "flex", width: "100vw" }}>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userProfile,
    address: state.getAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
    activePage: (page) => dispatch(activePage(page)),
    sendAddress: (data, token) => dispatch(sendAddresToApi(data, token)),
    getAddress: (token) => dispatch(fetchAddressApi(token)),
    putAddress: (data, token, id) => dispatch(putAddressToApi(data, token, id)),
    deleteAddress: (token, id) => dispatch(deleteAddress(token, id)),


  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SavedAddress)
);
