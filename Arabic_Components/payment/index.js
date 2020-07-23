import React, { useState, useEffect } from "react";
import stringify from "json-stringify-safe";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import _ from "lodash";

import Main from "../Arabic_Header";
import Footer from "../Arabic_Footer";
// import "./shipping.scss";
import { getAddress } from "../../reducers/address";
import { fetchAddressApi } from "../../actions/address";
import placeOrder from "../../actions/placeOrder.action";
import { fetchUserProfileApi } from "../../actions/user_profile";
import { Redirect } from "react-router-dom";

function Payment(props) {
  const [isChecked, setCheckbox] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState("cashondelivery");
  useEffect(() => {
    props.profileDispatch(localStorage.getItem("user_token"));
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getAddress(localStorage.getItem("user_token"));
  }, []);
  const makePayment = (e) => {
    const prod = props.location.state.referrer;

    prod.payment_method = "cashondelivery";
    const data = Object(prod);
    console.log(stringify(data, null, 2));
    return prod;
  };

  const toggleButton = () => {
    setToggle(!toggle);
  };
  const {
    cart_total,
    cart_total_gross_amount,
    cart_total_net_amount,
    coupon_amount,
    delivery_charge,
    tax
  } = props.location.state.referrer;
  if (props.profile.isAuthenticated) {
    return (
      <div className="shipping-container">
        <Main />
        <div className="shipping-breadcrumb">
          <h5>
            <strong>
              BAG <span style={{ color: "#c82557" }}>{"----->"}</span> ADDRESS{" "}
              <span style={{ color: "#c82557" }}>{"----->"}</span>{" "}
              <span
                style={{
                  color:
                    props.location.pathname == "/shipping" ? "#c82557" : "",
                }}
              >
                PAYMENT
              </span>
            </strong>{" "}
          </h5>
        </div>

        <div className="shipping-address-container">
          <div
            style={{
              display: "flex",
              width: "30vw",
            }}
          >
            <input
              type="checkbox"
              value="cashondelivery"
              checked={val === "cashondelivery"}
            />{" "}
            <label style={{ paddingLeft: 10 }}>Cash On Delivery (COD)</label>
          </div>

          <div className="price-details">
            <p>Price Details</p>
            <div className="price-details-items">
              <p>Bag Total</p>
              <p>SAR {cart_total_gross_amount}</p>
            </div>
            <div className="price-details-items">
              <p>Discount</p>
              <p>SAR {coupon_amount}</p>
            </div>
            <div className="price-details-items">
              <p>Tax</p>
              <p>SAR {tax}</p>
            </div>
            <div className="price-details-items">
              <p>Order Total</p>
              <p>SAR{cart_total}</p>
            </div>
            <div className="price-details-items">
              <p>Delivery Charges</p>
              <p>SAR {delivery_charge}</p>
            </div>
            <hr />
            <div className="price-details-items">
              <h2>Total</h2>
              <p>SAR{cart_total_net_amount}</p>
            </div>
            <hr />
            <Button
              variant="contained"
              // color="secondary"
              style={{ backgroundColor: "#C82257" }}
              size="large"
              fullWidth
              onClick={() => {
                props.placeOrderDispatch(makePayment());
              }}
            >
              Make Payment
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => ({
  address: state.getAddress,
  profile: state.userProfile,
});

const mapDisptachToProps = (dispatch) => ({
  getAddress: (token) => dispatch(fetchAddressApi(token)),
  placeOrderDispatch: (data) => dispatch(placeOrder(data)),
  profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Payment);
