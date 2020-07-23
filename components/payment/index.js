import React, { useState, useEffect } from "react";
import stringify from "json-stringify-safe";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';

import Main from "../Header";
import Footer from "../Footer";
// import "./shipping.scss";
import { getAddress } from "../../reducers/address";
import { fetchAddressApi } from "../../actions/address";
import placeOrder from "../../actions/placeOrder.action";
import { fetchUserProfileApi } from "../../actions/user_profile";
import { Redirect } from "react-router-dom";
import { productSimilarItem } from "../../actions/productSimilarItemAction";
// import {sendCartDetails} from "../../actions/send_cartDetails";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({

  largerRoot: {
    maxWidth: "1320px",
    // margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    }
  },

  

}));


function Payment(props) {
  const classes = useStyles();

  const [isChecked, setCheckbox] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState("cashondelivery");

  const [cartDetail, setcartDetail] = useState(JSON.parse(localStorage.getItem("CartDetails")));
  const [gotoOrder, setOrder] = useState(false);


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
    tax,
    total_delivery_charge
  } = cartDetail;


  const sendPlaceOrderPayemnt = async () => {
    props.placeOrderDispatch(JSON.parse(makePayment()));
    localStorage.removeItem("address_id");
    props.history.push("/orderplaced");
  }



  return (
    <>
      <div className="shipping-container">
        <Main />
      </div>
      <div className={classes.largerRoot}>
        <div className="eng_shipping-breadcrumb" style={{ paddingBottom: '20px' }}>
          <h5>
            <strong>
              BAG <span style={{ color: "#c82557" }}>{"-----"}</span> ADDRESS{" "}
              <span style={{ color: "#c82557" }}>{"-----"}</span>{" "}
              <span
                style={{
                  color:
                    props.location.pathname == "/payment" ? "#c82557" : "",
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

          {/* {gotoOrder ?  props.history.push("/orderplaced") : <CircularProgress color="secondary" style={{ marginTop: '20%' }} />} */}

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
              <p>SAR{Number(cart_total).toFixed(2)}</p>
            </div>
            <div className="price-details-items">
              <p>Delivery Charges</p>
              <p>SAR {total_delivery_charge}</p>
            </div>
            <hr />
            <div className="price-details-items">
              <h2>Total</h2>
              <p>SAR{Number(cart_total_net_amount).toFixed(2)}</p>
            </div>
            <hr />
            <Button
              variant="contained"
              style={{ backgroundColor: "#C82257" }}
              size="large"
              fullWidth
              onClick={sendPlaceOrderPayemnt}
            >
              Make Payment
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  address: state.getAddress,
  profile: state.userProfile,
  isOrderPlaced: state.placeOrder.isOrderPlaced
  // getCartDetails:state.getCartDetails.data

});

const mapDisptachToProps = (dispatch) => ({
  getAddress: (token) => dispatch(fetchAddressApi(token)),
  placeOrderDispatch: (data) => dispatch(placeOrder(data)),
  profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
  // sendCartDetails:(data)=>dispatch(sendCartDetails(data))
});

export default connect(mapStateToProps, mapDisptachToProps)(Payment);
