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
import {sendCartDetails} from "../../actions/send_cartDetails";


function Payment(props) {
  const [isChecked, setCheckbox] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState("cashondelivery");
  const [cartDetail, setcartDetail] = useState(JSON.parse(localStorage.getItem("CartDetails")));


  useEffect(() => {
    props.profileDispatch(localStorage.getItem("user_token"));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getAddress(localStorage.getItem("user_token"));
  }, []);

  const makePayment = (e) => {
    const prod = cartDetail;
    prod.payment_method = "cashondelivery";
    prod.address = Number(localStorage.getItem("address_id"));
    const data = Object(prod);
    // console.log(stringify(data, null, 2));
    const sendPlaceOrder = JSON.stringify(data, null, 2);
    return sendPlaceOrder;
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
  } = cartDetail;


 
    return (
      <div className="shipping-container">
        <Main />
        <div className="shipping-breadcrumb">
          <h5>
            <strong>
              كيس <span style={{ color: "#c82557" }}>{"-----"}</span> عنوان{" "}
              <span style={{ color: "#c82557" }}>{"-----"}</span>{" "}
              <span
                style={{
                  color:
                    props.location.pathname == "/payment" ? "#c82557" : "",
                }}
              >
                دفع
              </span>
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
              <p>SAR - {cart_total}</p>
              <p>الطلب الكلي</p>
            </div>
            <div className="price-details-items">
              <p>SAR - {delivery_charge}</p>
              <p>رسوم التوصيل</p>
            </div>
            <hr />
            <div className="price-details-items">
              <p>SAR - {cart_total_net_amount}</p>
              <h2>مجموع</h2>
            </div>
            <hr />
            <Button
              variant="contained"
              style={{ backgroundColor: "#C82257" }}
              size="large"
              fullWidth
              onClick={() => {
                props.placeOrderDispatch(JSON.parse(makePayment()));
                props.history.push("/orderplaced");
                // localStorage.removeItem("CartDetails")
                localStorage.removeItem("address_id");

              }}
            >
              قم بالدفع
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              width: "30vw",
              marginTop:'3%',
            }}
          >
            <input
              type="checkbox"
              value="cashondelivery"
              checked={val === "cashondelivery"}
            />{" "}
            <label style={{ paddingLeft: 10 }}>الدفع عند الاستلام (COD)</label>
          </div>
        </div>

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
  // sendCartDetails:()=>dispatch(sendCartDetails())

});

export default connect(mapStateToProps, mapDisptachToProps)(Payment);
