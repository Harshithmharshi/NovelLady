import React, { Component, useEffect } from "react";
import Main from "../Arabic_Header";
import Footer from "../Arabic_Footer";
import "./orderDetails.scss";
import fetchOrderDetails from "../../actions/orderDetails.action";
import querystring from "query-string";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

function OrderDetails(props) {


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
  } = props.orderDetailsData || {};

  const {
    city,
    city_area,
    country,
    first_name,
    last_name,
    phone,
    postal_code,
    street_address_1,
    street_address_2,
  } = shipping_address || {};

   if (localStorage.getItem("user_token")) {
    // if(!props.isLoadingOrderDetails) {
      return (
        <div>
          <Main />

          <div
            style={{
              marginTop: "15%",
              display: "flex",
              justifyContent: "space-between",
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
              <p>{city_area}</p>
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
                <p>{product_name}</p>
                <p>Color: {color_value}</p>
                <p>Size: {size_value}</p>
                <p>Price: {selling_price}</p>
                <p>Seller: {seller_name}</p>
                <p>Order Status: {status}</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
        return <Redirect to="/" />

          // <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: '20%'}}>
          //   <CircularProgress color="secondary" />
          // </div>
        
    }
    
  
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
