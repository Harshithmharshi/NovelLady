import React, { useEffect, useState } from "react";

import { TextField, Button, Collapse } from "@material-ui/core";
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
import Footer from "../Arabic_Footer";
import { Redirect, Link, withRouter, NavLink } from "react-router-dom";
import sendAddresToApi, {
  fetchAddressApi,
  putAddressToApi,
  deleteAddress,

} from "../../actions/address";
import Main from "../Arabic_Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  profile_container: {
    width: "95%",
    margin: 0,
    height: "90%",
    [theme.breakpoints.down('xl')]: {
      marginTop: "4%",
    },
    [theme.breakpoints.down('md')]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: "28%",
    }
  },

  user_account: {
    textAlign: "start",
    // marginLeft: "8%",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    display: "flex",
  },

  user_account_info_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
    flex: 1,
    height: "100%",
    marginLeft: "98px",
    "&:hover": {
      textDecoration: 'none'
    }
  },

  sidebar: {
    flexBasis: "25%",
    marginRight: '50px'
  },

  sideName: {
    textAlign: "start",
    marginLeft: "32%",
    fontWeight: "bold",
  },


  rightcontainer: {
    flexBasis: "74%",
    border: "1px solid #ddeeff",
    marginLeft: 100,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    textAlign: "right",
  },


  labelText: {
    marginTop: 5,
  },

  prodLink: {
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'none'
    }
  }

}));

const SavedAddress = (props) => {
  const { email, phone, first_name: name } = props.profile.user_profile_data.customer || {};
  // const data_address = props.address.addressData ||[].map(item => item);
  // const {first_name} = data_address;
  // console.log(data_address, first_name)
  const { data } = props.address.addressData || {};

  const {
    first_name,
    last_name,
    street_address_1,
    street_address_2,
    country,
    country_area,
    city,
    city_area,
    company_name,
    postal_code,
    id,
    default_address
  } = data || {};

  let { shipping } = props.address.addressData || {};



  const classes = useStyles();

  const [address, setAddress] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    street_address_1: "",
    street_address_2: "",
    country: "",
    country_area: "",
    city: "",
    city_area: "",
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


  useEffect(() => {
    props.activePage(props.location.pathname);
    props.getAddress(localStorage.getItem("user_token"));
    window.scrollTo(0, 0);
  }, []);

  const reloadPage = () => {
    setTimeout(function () {
      document.location.reload()
    }, 2000);
  }



  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };


  useEffect(() => {
    setVal(shipping);
  },[shipping]);

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
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: (data.phone).substr(1),
      company_name: " ",
      country: data.country,
      country_area: " ",
      city: data.city,
      city_area: " ",
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

    if (!address.company_name) {
      formIsValid = false;
      address.error = true;
      errors["company_name"] = "Cannot be empty";
    }

    if (!address.last_name) {
      formIsValid = false;
      address.error = true;
      errors["last_name"] = "Cannot be empty";
    }

    if (!address.country_area) {
      formIsValid = false;
      address.error = true;
      errors["country_area"] = "Cannot be empty";
    }

    if (!address.city) {
      formIsValid = false;
      address.error = true;
      errors["city"] = "Cannot be empty";
    }


    if (!address.city_area) {
      formIsValid = false;
      address.error = true;
      errors["city_area"] = "Cannot be empty";
    }


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
      first_name: address.first_name || first_name,
      last_name: address.last_name || last_name,
      phone: `+${address.phone}` || phone,
      company_name: " ",
      country_area: " ",
      country: address.country || country,
      city: address.city || city,
      city_area: " ",
      is_active: address.is_active,
      default_address: address.default_address,
      street_address_1: address.street_address_1 || street_address_1,
      street_address_2: address.street_address_2 || street_address_2,
      postal_code: address.postal_code || postal_code,
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
        country_area: "",
        city: "",
        city_area: "",
        street_address_1: "",
        street_address_2: "",
        postal_code: "",
        default_address: "",
        errors: {},
      });


      // props.profileDispatch(localStorage.getItem("user_token"));
    } else if (handleValidation() && formPutState) {

      // const { id } = props.address.addressData || {};

      console.log(address);
      let editAddress = {
        ...address,
        phone: `+${address.phone}`
      };
      console.log("editAddress", editAddress);
      console.log('data.id', data.id);

      props.putAddress(editAddress, localStorage.getItem("user_token"), data.id);
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
        country_area: "",
        city: "",
        city_area: "",
        street_address_1: "",
        street_address_2: "",
        postal_code: "",
        default_address: "",
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
            <b style={{ textTransform: 'capitalize', marginRight: '2%' }}>الحساب</b>
            <p style={{ color: '#c82257', textTransform: 'capitalize', marginRight: '2%' }}>{name}</p>
          </div>
          <div style={{ float: 'right', marginTop: '1%', marginLeft: '50%' }}>
            <span style={{ fontSize: '25px', whiteSpace: 'nowrap' }}>العناوين المحفوظة</span>
            <div>&nbsp;</div>
            <Button
              variant="outlined"
              style={{ backgroundColor: "#C82257", whiteSpace: 'nowrap', paddingRight: '10px' }}
              onClick={formOnClick}>
              أضف عنوانا جديدا
            </Button>
          </div>
          <div style={{ marginTop: '2%' }}>
          </div>
        </div>
        <hr style={{ width: "100%", marginLeft: "8%" }} />
        <div className={classes.user_account_info_container}>
          <div className={classes.sidebar}>
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/profile" ? "#c82257" : ' #212529', }}
            >
              <NavLink
                to="/profile"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.prodLink}
              >
                الملف الشخصي
              </NavLink>
            </p>
            <hr style={{ width: "68%", marginLeft: "32%" }} />
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/orders" ? "#c82257" : ' #212529', }}
            >
              <NavLink
                to="/orders"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.prodLink}

              >
                {" "}
                {"طلباتي"}{" "}
              </NavLink>
            </p>
            <hr style={{ width: "68%", marginLeft: "32%" }} />
            <p className={classes.sideName}
              style={{ color: props.location.pathname == "/address" ? "#c82257" : "", }}
            >
              <NavLink
                to="/address"
                activeStyle={{
                  color: "#c82257",
                }}
                className={classes.prodLink}

              >
                {"العنوان المحفوظ"}
              </NavLink>
            </p>
          </div>

          <div
            style={{
              height: formState ? "542px" : "373px",
              width: "1%",
              borderRight: "2px solid #ccddee",
              flexBasis: "1%",
            }}
          />


          <div className={classes.rightcontainer}>
            <div style={{ paddingBottom: 10, paddingTop: 10 }}>
              <b style={{ fontSize: 18 }}>
                {!formState && !formPutState
                  ? "العنوان الافتراضي"
                  : formPutState
                    ? "تعديل العنوان"
                    : "أضف عنوانا جديدا"}
              </b>
            </div>

            <hr />


            <form noValidate>
              <div>
                {!formState ? _.map(val, (item) => {
                  if (item.default_address == true) {
                    return <>
                      <p>يرجى تحديد عنوان كافتراضي</p>
                      <p>
                        {" "}
                        {item.first_name} {item.last_name}
                      </p>
                      <p>{item.street_address_1}</p>
                      <p>{item.street_address_2}</p>
                      <p>{item.city}</p>
                      <p>
                        {item.country} - {item.postal_code}
                      </p>
                      <p>Mobile : {item.phone}</p>

                      <Button
                        variant="outlined"
                        style={{ backgroundColor: "#C82257", marginLeft: 20 }}
                        onClick={(e) => deleteSavedAddress(e, item.id)}
                      >
                        حذف
                    </Button>


                      <br />
                      <br />
                    </>
                  }
                }
                ) : (
                    <div style={{ display: 'grid' }}>
                      <label>الاسم الاول</label>
                      <TextField
                        required
                        value={address.first_name}
                        placeholder="اكتب اسمك الأول"
                        onChange={handleProfileChange}
                        name="first_name"
                        fullWidth
                        className={classes.inputBox}
                        style={{ textAlign: 'center' }}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}

                        error={address.error}
                        helperText={address.errors["first_name"]}
                        variant="outlined"
                      />
                      <br />


                      <label>الكنية</label>
                      <TextField
                        value={address.last_name}
                        onChange={handleProfileChange}
                        placeholder="اكتب اسمك الأخير"
                        name="last_name"
                        fullWidth
                        className={classes.inputBox}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}

                        error={address.error}
                        helperText={address.errors["last_name"]}
                        variant="outlined"
                      />{" "}
                      <br />

                      <label>هاتف</label>
                      <TextField
                        value={`${address.phone}`}
                        onChange={handleProfileChange}
                        error={address.error}
                        fullWidth
                        required={true}
                        name="phone"
                        id="formatted-numberformat-input"
                        helperText={address.errors["phone"]}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">+</InputAdornment>
                          ),
                        }}
                        className={classes.inputBox}
                        variant="outlined"
                      />
                      <br />

                      <label>عنوان الشارع</label>
                      <TextField
                        type="text"
                        placeholder="اكتب عنوان الشارع الخاص بك"
                        value={address.street_address_1}
                        onChange={handleProfileChange}
                        name="street_address_1"
                        error={address.error}
                        fullWidth
                        className={classes.inputBox}
                        required={true}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}

                        helperText={address.errors["street_address_1"]}
                        variant="outlined"
                      />
                      <br />

                      <label>عنوان الشارع 2</label>
                      <TextField
                        type="text"
                        placeholder="اكتب عنوان شارعك 2"
                        value={address.street_address_2}
                        onChange={handleProfileChange}
                        name="street_address_2"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}

                        helperText={address.errors["street_address_2"]}
                        variant="outlined"


                      />
                      <br />
                      <label>اسم الشركة</label>
                      <TextField
                        type="text"
                        placeholder="اكتب اسم شركتك"
                        value={address.company_name}
                        onChange={handleProfileChange}
                        name="company_name"
                        fullWidth
                        className={classes.inputBox}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        variant="outlined"
                      />

                      <br />


                      <label>مدينة</label>
                      <TextField
                        type="text"
                        placeholder="اكتب مدينتك"
                        value={address.city}
                        onChange={handleProfileChange}
                        name="city"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        helperText={address.errors["city"]}
                        variant="outlined"
                      />
                      <br />


                      <label>الكود البريدى</label>
                      <TextField
                        type="number"
                        placeholder="اكتب الرمز البريدي الخاص بك"
                        value={address.postal_code}
                        onChange={handleProfileChange}
                        name="postal_code"
                        error={address.error}
                        fullWidth
                        required={true}
                        className={classes.inputBox}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}

                        helperText={address.errors["postal_code"]}
                        variant="outlined"
                      />
                      <br />

                      <InputLabel htmlFor="filled-age-native-simple">بلد</InputLabel>
                      <Select
                        native
                        name="country"
                        value={address.country}
                        onChange={handleProfileChange}
                        required={true}
                        error={address.error}
                        inputProps={{ min: 0, style: { textAlign: 'right', marginLeft: "80%" } }}
                      >
                        <option aria-label="None" value="" />
                        <option value={"SA"}>SA</option>
                        <option value={"IN"}>IN</option>
                      </Select>
                      <br />
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={onClick}
                        style={{ marginTop: 15, backgroundColor: "#C82257" }}
                      >
                        إرسال
                    </Button>

                      <br />
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={formOnClick}
                        style={{ marginTop: 20 }}
                      >
                        إلغاء
                    </Button>

                    </div>

                  )}
              </div>
            </form>
          </div>
        </div>
        <div></div>
        <div
          style={{ width: "84%", marginBottom: "2%", marginTop: "2%", marginLeft: "30px", paddingRight: "90px" }}
        ><div style={{ float: "right", marginBottom: "2%", marginTop: "2%", whiteSpace: 'nowrap' }}><b>عناوين أخرى</b></div>

          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={44}>
              <Grid container direction="row-reverse">
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
                  if (is_active && default_address == false) {
                    return (<>
                      <Grid key={id} item style={{ width: "50%", marginTop: "3%" }}>
                        <div className={classes.rightcontainer} addId={id} >
                          <p>
                            {first_name} {last_name}
                          </p>
                          <p>{street_address_1}</p>
                          <p>{street_address_2}</p>
                          <p>{city}</p>
                          <p>
                            {country} {postal_code}
                          </p>
                          <p>Mobile:- {phone}</p>
                          <span style={{ color: "#C82257", cursor: "pointer", marginTop: "5%", border: '0.5px solid black', padding: '10px', borderRadius: '10px'  }} onClick={(e) => makeDefault(e, item)}>جعله كافتراضي</span>
                          <br />
                          <br />

                          <Button
                            variant="outlined"

                            style={{ backgroundColor: "#C82257" }}
                            onClick={(e) => { formOnClickEdit(e, item) }}
                            addId={id}
                          >
                            <EditIcon style={{ fontSize: 18 }} /> تعديل
                            </Button>

                          <Button
                            variant="outlined"
                            style={{ backgroundColor: "#C82257", marginLeft: 20 }}
                            onClick={(e) => deleteSavedAddress(e, id)}
                          >
                            حذف
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
