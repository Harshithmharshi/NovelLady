import React, { useState, useEffect } from "react";
import stringify from "json-stringify-safe";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Main from "../Arabic_Header";
import Footer from "../Arabic_Footer";
import "./shipping.scss";
import { getAddress } from "../../reducers/address";
import { fetchAddressApi } from "../../actions/address";
import placeOrder from "../../actions/placeOrder.action";
import { fetchUserProfileApi } from "../../actions/user_profile";
import { Redirect, Link } from "react-router-dom";
import sendAddAddressToApi from "../../actions/address";
import {sendCartDetails} from "../../actions/send_cartDetails";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  profile_container: {
    width: "85%",
    margin: 0,
    height: "90%",
    [theme.breakpoints.down("xl")]: {
      marginTop: "14%",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "28%",
    },
  },

  user_account: {
    textAlign: "start",
    marginLeft: "8%",
    justifyContent: "space-between",
    display: "flex",
  },

  user_account_info_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flex: 1,
    height: "100%",
  },

  sidebar: {
    flexBasis: "25%",
  },

  sideName: {
    textAlign: "start",
    marginLeft: "32%",
    fontWeight: "bold",
  },

  rightcontainer: {
    flexBasis: "74%",
    border: "1px solid #ddeeff",
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    textAlign: "start",
  },

  labelText: {
    marginTop: 5,
  },

  productLink: {
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

}));
function ShippingAddress(props) {
  const classes = useStyles();
  const [isChecked, setCheckbox] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [addresForm, setAddressForm] = useState(false);
  const [data, setData] = useState([]);
  const [cartDetail, setcartDetail] = useState(JSON.parse(localStorage.getItem("CartDetails")));
  const [showCheckbox, setshowCheckbox] = useState({id:'',checkboxClicked:false});


  useEffect(() => {
    // props.profileDispatch(localStorage.getItem("user_token"));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getAddress(localStorage.getItem("user_token"));
  }, []);

  useEffect(() => {
    setData(shipping);
    // props.getAddress(localStorage.getItem("user_token"));

  })

  const { email, phone } = props.profile.user_profile_data.customer || {};

  const [address, setAddress] = useState({
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
    default_address: false,
  });


  const reloadPage = () => {
      setTimeout(function() {
          document.location.reload()
        }, 1000);
    }


  const checkBox = (e, item) => {
    const { value, name, checked } = e.target;
    if (value == item && checked) {
      setCheckbox({ ...isChecked, [name]: !isChecked });
    }

  if (checked) {
    setshowCheckbox({ ...showCheckbox, id: item, hide: false });
    setToggle(true);
  }
  else {
    setshowCheckbox({ ...showCheckbox, id: '', hide: true });
    setToggle(false);
  }

  localStorage.setItem("address_id",item)

  };


  const makePayment = () => {
    const prod =cartDetail;
    if (isChecked) {
      const keys = Object.keys(isChecked);
      // prod.address = Number(keys[0]);
      prod.address = showCheckbox.id;
      const data = Object(prod);
      return prod;
    }
  };


  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const toggleButton = () => {
    setToggle(!toggle);
  };

  const onPressAddressButton = () => {
    setAddressForm(!addresForm);
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
  let { shipping } = props.address.addressData || {};


  const onClick = () => {
    let profileData = {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: `+${address.phone}`,
      company_name: address.company_name,
      country_area: address.country_area,
      country: address.country,
      city: address.city,
      city_area: address.city_area,
      is_active: address.is_active,
      default_address: address.default_address,
      street_address_1: address.street_address_1,
      street_address_2: address.street_address_2,
      postal_code: address.postal_code,
      default_address: false,
    };
    const data = JSON.stringify(profileData);

    if (handleValidation()) {
      props.postAddress(data, localStorage.getItem("user_token"));
      setTimeout(() => {
        props.getAddress(localStorage.getItem("user_token"));
      },10)
      setAddressForm(!addresForm);
      // setFormState(!formState);
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
        errors: {},
      });
    }
    reloadPage ();
  };

  const {
    cart_total,
    cart_total_gross_amount,
    cart_total_net_amount,
    coupon_amount,
    delivery_charge,
    tax
  } = cartDetail;

    return (
      <div className="shipping-container">
        <Main />
        <div className="shipping-breadcrumb">
          <h5>
            <strong>
              <span>كيس</span> <span style={{ color: "#c82557" }}>-----</span>{" "}
              <span
                style={{
                  color:
                    props.location.pathname == "/shipping" ? "#c82557" : "",
                }}
              >
                عنوان
              </span>{" "}
              <span style={{ color: "#c82557" }}>-----</span> دفع
            </strong>{" "}
          </h5>
        </div>

        <div className="shipping-address-container">


          <div className="price-details">

            <p style={{marginLeft:'86%'}}>تفاصيل السعر</p>
            <div className="price-details-items">
              <p>SAR - {cart_total_gross_amount}</p>
              <p>إجمالي الحقيبة</p>
            </div>
            <div className="price-details-items">
              <p>SAR - {coupon_amount}</p>
              <p>خصم</p>
            </div>
            <div className="price-details-items">
              <p>SAR - {tax}</p>
              <p>ضريبة</p>
            </div>
            <div className="price-details-items">
              <p>SAR -  {cart_total}</p>
              <p>الطلب الكلي</p>
            </div>
            <div className="price-details-items">
              <p>SAR -  {delivery_charge}</p>
              <p>رسوم التوصيل</p>
            </div>
            <hr />
            <div className="price-details-items">
              <p>SAR -  {cart_total_net_amount}</p>
              <h2>مجموع</h2>
            </div>
            <hr />
            {toggle ? (
              <Link
                to={{
                  pathname: "/payment",
                  state: {
                    referrer: makePayment(),
                  },
                }}
                className={classes.productLink}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#C82257" }}
                  size="large"
                  fullWidth
                >
                  قم بالدفع
                </Button>
              </Link>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "#C82257" }}
                size="large"
                fullWidth
                disabled
              >
                حدد العنوان
              </Button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "30vw",
              marginRight: "9.1%"
            }}
          >
            <Button
              variant="outlined"
              style={{ backgroundColor: "#C82257", marginTop: 20,marginBottom:20 }}
              size="large"
              onClick={onPressAddressButton}
            >
              + أضف عنوانا جديدا
            </Button>
            {_.filter(data || [], (item) => item.is_active).map((item) => (
              <div
                className="shipping-address"
                key={item.id}
                style={{
                  border: toggle ? "1.5px solid #c82257" : "1px solid black",
                  textAlign: "right",
                }}
                // onClick={() => toggleButton()}
              >
              <span style={{ marginRight: 10 }}>
                {item.first_name} {item.last_name}
              </span>
              {/*<span style={{ float: 'left', color:'green' }}>
                {item.default_address == true ? 'العنوان الافتراضي' : ''}
              </span>*/}

                <input
                  type="checkbox"
                  value={item.id}
                  name={item.id}
                  onChange={(e) => {
                    checkBox(e, item.id);
                  }}
                  checked={showCheckbox.id===item.id}

                />

                <br />
                <div style={{ marginRight: "25%" }}>
                  <p>
                    {item.street_address_1}, {item.street_address_2},
                  </p>
                  <p>
                    {item.company_name},{item.city},
                  </p>
                  <p>
                    {item.country} - {item.postal_code}
                  </p>
                  <p>Mobile: {item.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={addresForm}
          onClose={onPressAddressButton}
        >
          <DialogTitle style={{ textAlign: "right" }}>
            أضف عنوانا جديدا
          </DialogTitle>
          <DialogContent style={{ padding: 20 }}>
            <div
              style={{
                display: "grid",
                alignItems: "flex-start",
                padding: 20,
                border: "1.5px solid grey",
                marginTop: 10,
                marginLeft: "8%",
              }}
            >
              <label style={{ textAlign: "right" }}>الاسم الاول</label>
              <TextField
                required
                value={address.name}
                placeholder={"اكتب اسمك الأول"}
                onChange={handleProfileChange}
                name="first_name"
                fullWidth
                className={classes.inputBox}
                error={address.error}
                helperText={address.errors["first_name"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />
              <br />
              <label style={{ textAlign: "right" }}>الكنية</label>
              <TextField
                value={address.dob}
                onChange={handleProfileChange}
                placeholder={"اكتب اسمك الأخير"}
                name="last_name"
                fullWidth
                className={classes.inputBox}
                error={address.error}
                helperText={address.errors["last_name"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />{" "}
              <br />
              <label style={{ textAlign: "right" }}>هاتف</label>
              <TextField
                type="number"
                value={address.phone}
                onChange={handleProfileChange}
                // placeholder={"911234567890"}
                error={address.error}
                fullWidth
                required={true}
                name="phone"
                id="formatted-numberformat-input"
                helperText={address.errors["phone"]}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">+</InputAdornment>
                  ),
                }}
                className={classes.inputBox}
                variant="outlined"
              />
              <br />
              <label style={{ textAlign: "right" }}>عنوان الشارع</label>
              <TextField
                type="text"
                placeholder={"اكتب عنوان الشارع الخاص بك"}
                value={address.street_address_1}
                onChange={handleProfileChange}
                name="street_address_1"
                error={address.error}
                fullWidth
                className={classes.inputBox}
                required={true}
                helperText={address.errors["street_address_1"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />
              <br />
              <label style={{ textAlign: "right" }}>عنوان الشارع 2</label>
              <TextField
                type="text"
                placeholder={"اكتب عنوان شارعك 2"}
                value={address.street_address_2}
                onChange={handleProfileChange}
                name="street_address_2"
                error={address.error}
                fullWidth
                required={true}
                className={classes.inputBox}
                helperText={address.errors["street_address_2"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />
              <br />
              <label style={{ textAlign: "right" }}>مدينة</label>
              <TextField
                type="text"
                placeholder={"اكتب مدينتك"}
                value={address.city}
                onChange={handleProfileChange}
                name="city"
                error={address.error}
                fullWidth
                required={true}
                className={classes.inputBox}
                helperText={address.errors["city"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />
              <br />
              <label style={{ textAlign: "right" }}>الكود البريدى</label>
              <TextField
                type="number"
                placeholder={"اكتب الرمز البريدي الخاص بك"}
                value={address.postal_code}
                onChange={handleProfileChange}
                name="postal_code"
                error={address.error}
                fullWidth
                required={true}
                className={classes.inputBox}
                helperText={address.errors["postal_code"]}
                variant="outlined"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              />
              <br />
              <label style={{ textAlign: "right" }}>بلد</label>
              <Select
                native
                name="country"
                value={address.country}
                className={classes.inputBox}
                helperText={address.errors["country"]}
                onChange={handleProfileChange}
                required={true}
                error={address.error}
                // inputProps={{min: 0, style: { textAlign: 'right', marginLeft: "80%" }}}
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
                onClick={onPressAddressButton}
                style={{ marginTop: 20 }}
              >
                إلغاء
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    );

}

const mapStateToProps = (state) => ({
  address: state.getAddress,
  profile: state.userProfile,
  // getCartDetails:state.getCartDetails.data
});

const mapDisptachToProps = (dispatch) => ({
  getAddress: (token) => dispatch(fetchAddressApi(token)),
  placeOrderDispatch: (data) => dispatch(placeOrder(data)),
  profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
  postAddress: (data, token) => dispatch(sendAddAddressToApi(data, token)),
  // sendCartDetails:()=>dispatch(sendCartDetails())
});

export default connect(mapStateToProps, mapDisptachToProps)(ShippingAddress);
