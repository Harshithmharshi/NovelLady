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
import { connect } from "react-redux";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Main from "../Header";
import Footer from "../Footer";
import "./shipping.scss";
import { getAddress } from "../../reducers/address";
import { fetchAddressApi } from "../../actions/address";
import placeOrder from "../../actions/placeOrder.action";
import { fetchUserProfileApi } from "../../actions/user_profile";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Redirect, Link } from "react-router-dom";
import sendAddAddressToApi from "../../actions/address";
import { sendCartDetails } from "../../actions/send_cartDetails";
import {
  fetchCartDataFromApi,
  fetchCartDataWithBagDetails,

} from "../../actions/add_to_cart.action";

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
  const [cartDetail, setCartDetail] = useState(JSON.parse(localStorage.getItem("CartDetails")))
  const [showCheckbox, setshowCheckbox] = useState({ id: '', checkboxClicked: false });

  let { shipping } = props.address.addressData || {};


  // useEffect(() => {
  //   // props.profileDispatch(localStorage.getItem("user_token"));
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getAddress(localStorage.getItem("user_token"));
    props.getCartDispatch();
  }, []);


  useEffect(() => {
    setData(shipping);
    // props.getAddress(localStorage.getItem("user_token"))
  });

  const { email, phone } = props.profile.user_profile_data.customer || {};

  const reloadPage = () => {
    setTimeout(function () {
      document.location.reload()
    }, 1000);
  }


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

    localStorage.setItem("address_id", item)

  };


  const makePayment = () => {
    const prod = cartDetail;


    if (isChecked) {
      const keys = Object.keys(isChecked);
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
      // country_area: address.country_area,
      country: address.country,
      city: address.city,
      // city_area: address.city_area,
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
      }, 10)
      setAddressForm(!addresForm);
      // setFormState(!formState);
      setAddress({
        ...address,
        first_name: "",
        last_name: "",
        phone: "",
        company_name: "",
        country: "",
        // country_area: "",
        city: "",
        // city_area: "",
        street_address_1: "",
        street_address_2: "",
        postal_code: "",
        errors: {},
      });
    }
    reloadPage();

  };


  const {
    cart_total,
    cart_total_gross_amount,
    cart_total_net_amount,
    coupon_amount,
    delivery_charge,
    tax,
    total_delivery_charge
  } = cartDetail;



  return (
    <div className="eng_shipping-container">
      <Main />
      <div className="eng_shipping-breadcrumb">
        <h5>
          <strong>
            <span>BAG</span> <span style={{ color: "#c82557" }}>-----</span>{" "}
            <span
              style={{
                color:
                  props.location.pathname == "/shipping" ? "#c82557" : "",
              }}
            >
              ADDRESS
              </span>{" "}
            <span style={{ color: "#c82557" }}>-----</span> PAYMENT
            </strong>{" "}
        </h5>
      </div>

      <div className="eng_shipping-address-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "30vw",
          }}
        >


          <Button
            variant="outlined"
            style={{ backgroundColor: "#C82257", marginTop: 20, marginBottom: 20 }}
            size="large"
            onClick={onPressAddressButton}
          >
            + Add a new Address
            </Button>


          {_.filter(data || [], (item) => item.is_active).map((item) => (
            <div
              className="eng_shipping-address"
              key={item.id}
              style={{
                border: toggle ? "1.5px solid #c82257" : "1px solid black",
              }}
            // onClick={() => toggleButton()}
            >

              <input
                type="checkbox"
                value={item.id}
                name={item.id}
                onChange={(e) => {
                  checkBox(e, item.id);
                }}
                checked={showCheckbox.id === item.id}
              />

              <span style={{ paddingLeft: 10 }}>
                {item.first_name} {item.last_name}
              </span>
              {/* <span style={{ float: 'right', color:'green' }}>
                {item.default_address == true ? 'Default address' : ''}
              </span> */}
              <br />
              <div style={{ marginLeft: "12%" }}>
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

        <div className="eng_price-details">
          <p>Price Details</p>
          <div className="eng_price-details-items">
            <p>Bag Total</p>
            <p>SAR {cart_total_gross_amount}</p>
          </div>
          <div className="eng_price-details-items">
            <p>Discount</p>
            <p>SAR {coupon_amount}</p>
          </div>
          <div className="eng_price-details-items">
            <p>Tax</p>
            <p>SAR {tax}</p>
          </div>
          <div className="eng_price-details-items">
            <p>Order Total</p>
            <p>SAR{cart_total}</p>
          </div>
          <div className="eng_price-details-items">
            <p>Delivery Charges</p>
            <p>SAR {total_delivery_charge}</p>
          </div>
          <hr />
          <div className="eng_price-details-items">
            <h2>Total</h2>
            <p>SAR{cart_total_net_amount.toFixed(2)}</p>
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
                Make Payment
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
                Select Address
              </Button>
            )}
        </div>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={addresForm}
        onClose={onPressAddressButton}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Add a new Address
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
            <label style={{ textAlign: "left" }}>First Name</label>
            <TextField
              required
              value={address.name}
              placeholder={"Type your first name"}
              onChange={handleProfileChange}
              name="first_name"
              fullWidth
              className={classes.inputBox}
              error={address.error}
              helperText={address.errors["first_name"]}
              variant="outlined"
            />
            <br />
            <label style={{ textAlign: "left" }}>Last Name</label>
            <TextField
              value={address.dob}
              onChange={handleProfileChange}
              placeholder={"Type your last name"}
              name="last_name"
              fullWidth
              className={classes.inputBox}
              error={address.error}
              helperText={address.errors["last_name"]}
              variant="outlined"
            />{" "}
            <br />
            <label style={{ textAlign: "left" }}>Phone</label>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+</InputAdornment>
                ),
              }}
              className={classes.inputBox}
              variant="outlined"
            />
            <br />
            <label style={{ textAlign: "left" }}>Street Address</label>
            <TextField
              type="text"
              placeholder={"Type your street address"}
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
            <label style={{ textAlign: "left" }}>Street Address 2</label>
            <TextField
              type="text"
              placeholder={"Type your street address 2"}
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
            <label style={{ textAlign: "left" }}>Company Name</label>
            <TextField
              type="text"
              placeholder={"Type your company name"}
              value={address.company_name}
              onChange={handleProfileChange}
              name="company_name"
              error={address.error}
              fullWidth
              required={true}
              className={classes.inputBox}
              helperText={address.errors["company_name"]}
              variant="outlined"
            />
            <br />
            <label style={{ textAlign: "left" }}>City</label>
            <TextField
              type="text"
              placeholder={"Type your city"}
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
            <label style={{ textAlign: "left" }}>Postal Code</label>
            <TextField
              type="number"
              placeholder={"Type your postal code"}
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
            <br />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={onClick}
              style={{ marginTop: 15, backgroundColor: "#C82257" }}
            >
              Submit
              </Button>
            <br />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={onPressAddressButton}
              style={{ marginTop: 20 }}
            >
              Cancel
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
  getCartDetail: state.getCartDetail.data,
  getCart: state.getCart,

});

const mapDisptachToProps = (dispatch) => ({
  getAddress: (token) => dispatch(fetchAddressApi(token)),
  placeOrderDispatch: (data) => dispatch(placeOrder(data)),
  profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
  postAddress: (data, token) => dispatch(sendAddAddressToApi(data, token)),
  getCartDispatch: () => dispatch(fetchCartDataFromApi()),

  sendCartDetails: () => dispatch(sendCartDetails()),


});

export default connect(mapStateToProps, mapDisptachToProps)(ShippingAddress);
