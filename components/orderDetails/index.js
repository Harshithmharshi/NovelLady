import React, { Component, useEffect } from "react";
import Main from "../Header";
import Footer from "../Footer";
import "./orderDetails.scss";
import fetchOrderDetails from "../../actions/orderDetails.action";
import querystring from "query-string";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {

    flexGrow: 1,

  },

  orderTotal: {
    display: "flex",
    justifyContent: "space-between",
  },

  order_link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
  },



}));


function OrderDetails(props) {

  const classes = useStyles();
  const qs = querystring.parse(props.location.search);

  useEffect(() => {

    // props.orderDetailsDispatch(qs.order_id);

    props.orderDetailsDispatch(props.match.params.id);
    window.scrollTo(0, 0);

  }, []);


  const {
    color_value,
    seller_name,
    selling_price,
    product_name,
    status,
    size_value,
    image,
    shipping_address,
    product_id,
    total_discount,
    total_tax,
    delivery_charge,
    unit_price_net_amount,
    mrp_price
  } = props.orderDetailsData || {};


  const {
    country,
    first_name,
    last_name,
    phone,
    postal_code,
    street_address_1,
    street_address_2,
    city,

  } = shipping_address || {};
  const regex = /\s/g;



  return (
    <div>
      <Main />
      {props.isLoadingOrderDetails ?
        <div style={{  padding: '100px', paddingBottom: '100px' }}>
          <CircularProgress color="secondary" />
        </div>
        :
        <Link
          to={{
            pathname: `/product/${typeof product_name !== "undefined" ? product_name.toString().replace(regex, "-") : product_name}/${product_id}/`,
          }}
          target="_blank"

          className={classes.order_link}
        >
          <div
            style={{
              marginTop: "70px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <div className="delivery-address-container">
              {/*Map function to go here */}
              <p>
                <b>Delivery Address</b>
              </p>
              <p>{first_name} {last_name}</p>
              <p>{street_address_1}</p>
              <p>{street_address_2}</p>
              <p>{city}</p>
              <p> {country} - {postal_code}</p>
              <br />
              <p>
                <b>Phone number:</b>
              </p>
              <p>{phone}</p>
            </div>
            <div className={"product-item-container"}>
              <div className="product-image-container">
                <img src={image} height={250} width={180} />
              </div>
              <div className="product-info-container">
                <b style={{ textTransform: 'capitalize', }}>{product_name}</b>
                <p style={{marginTop: '20px'}}><span style={{paddingRight:'20px'}}><b>Size</b> : {size_value}</span> | <span style={{ paddingLeft: "15px" }}><b>Color</b> : {color_value}</span></p>
                <p><b>Seller Name</b> : {seller_name}</p>
                <p><b>MRP </b> : SAR{" "}{mrp_price}</p>
                <p><b>Item Discount </b>: {total_discount}</p>
                <p><b>Tax </b>: {total_tax}</p>
                <p><b>Delivery Charge </b> : SAR {" "} {delivery_charge}</p>
                <p><b>Total </b>: SAR {" "}{unit_price_net_amount}</p>
                {/* <p>Order Status: {status}</p> */}
              </div>
            </div>
          </div>
        </Link>
      }
      <Footer />
    </div>
  );

}

const mapStateToProps = ({ orderDetails: { orderDetailsData, isLoadingOrderDetails } }) => ({
  orderDetailsData: orderDetailsData,
  isLoadingOrderDetails: isLoadingOrderDetails

});

const mapDispatchToProps = (dispatch) => ({
  orderDetailsDispatch: (id) => dispatch(fetchOrderDetails(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
);
