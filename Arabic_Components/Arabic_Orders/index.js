import React, { useEffect, useState } from "react";

import { TextField, Button, Stepper, Step, StepLabel, Typography, } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import * as moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { fetchUserProfileApi } from "../../actions/user_profile";
import activePage from "../../actions/active_page";
import sendAddAddressToApi from "../../actions/edit_profile";
import Footer from "../Arabic_Footer";
// import Navbar from "../Header/Navbar";
import { Redirect, Link } from "react-router-dom";
import Main from "../Arabic_Header";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IMAGE1 from "../../images/image-07.png";
import fetchMyOrdersApi from "../../actions/myOrders.actions";

import TrackingOrder from "./TrackingOrder";

import { fetchTrackingOrder } from "../../actions/trackingOrderAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },

  profile_container: {
    width: "95%",
    margin: 0,
    height: "90%",
    marginTop: "51px",
    // [theme.breakpoints.down('xl')]:{
    //   marginTop: "14%",
    // },
    // [theme.breakpoints.down('md')]:{
    //   marginTop: "20%",
    // },
    // [theme.breakpoints.down('sm')]:{
    //   marginTop: "28%",
    // }
  },

  user_account: {
    textAlign: "start",
    marginLeft: "8%",
  },

  user_account_info_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
    flex: 1,
    height: "100%",
  },

  sidebar: {
    flexBasis: "25%",
  },

  rightcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #ddeeff",
    marginBottom: 15,
    padding: 5,
    textAlign: "right",
  },

  inputBox: {
    marginLeft: "30%",
    width: "45%",
  },

  labelText: {
    marginTop: 5,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  orderIdButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  orderInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },

  orderInfoBox: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "right",
  },

  orderTotal: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "right",
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

const Orders = (props) => {
  const { email, phone, first_name:name, last_name } =
    props.profile.user_profile_data.customer || {};

  const classes = useStyles();



  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone: phone || "",
    error: false,
    errors: {},
  });


  const [activeStep, setActiveStep] = React.useState(0);

  const [orderID, setID] = useState({ id: '', hide: true });



  const current_status = _.get(props.trackingOrder.order_details, 'status');


  var getStatus = _.map(props.trackingOrder.track_data_status || [], (status => {
    return status.status;
  }));


  const checkStatus = (status) => {
    return status === current_status;
  }



  useEffect(() => {
    props.myOrdersDispatch(localStorage.getItem("user_token"));
  }, []);




  const { myOrder } = props.myOrders || {};


  const handleClickOpen = (event, id) => {
    event.preventDefault();
    if (orderID.hide) {
      setID({ ...orderID, id: id, hide: false });
    }
    else {
      setID({ ...orderID, id: id, hide: true });
    }

  };



  return (
    <div className={classes.root}>
      <Main />

      <div className={classes.profile_container}>
        <div className={classes.user_account}>
          <b style={{ marginLeft: "81%" }}>الحساب</b>
          <p style={{ marginLeft: "81%" }}>{name}</p>
          <hr style={{ width: "100%" }} />
        </div>

        <div className={classes.user_account_info_container}>
          <div className={classes.sidebar}>
            <p
              style={{
                textAlign: "start",
                marginLeft: "32%",
                fontWeight: "bold",
                color: props.location.pathname == "/profile" ? "#c82257" : "",
              }}
            >
              <Link to="/profile">الملف الشخصي</Link>
            </p>
            <hr style={{ width: "68%", marginLeft: "32%" }} />
            <p
              style={{
                textAlign: "start",
                marginLeft: "32%",
                fontWeight: "bold",
                color: props.location.pathname == "/orders" ? "#c82257" : "",
              }}
            >
              <Link to="/orders"> {"طلباتي"} </Link>
            </p>

            <hr style={{ width: "68%", marginLeft: "32%" }} />

            <p
              style={{
                textAlign: "start",
                marginLeft: "32%",
                fontWeight: "bold",
                color: props.location.pathname == "/address" ? "#c82257" : "",
              }}
            >
              <Link to="/address">{"العنوان المحفوظ"}</Link>
            </p>

          </div>
          <div
            style={{
              height: "342px",
              width: "1%",
              borderRight: "2px solid #ccddee",
              flexBasis: "1%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "74%",
              marginLeft: 100,
              borderRadius: 5,
              padding: 10,
              paddingLeft: 15,
              textAlign: "start",
              flexGrow: 1,
            }}
          >
            {_.map(myOrder || []).length === 0 ?
              <Typography
                style={{ width: "60%", marginLeft: "50%",fontSize: "13px", fontFamily: "Cairo, sans-serif"}}
              >
                لا أوامر
             </Typography> : ''}

            {_.map(myOrder || [], (item) => (
              <Link
                to={{
                  pathname: `order-details/${item.id}`,
                }}
                // to={{
                //   pathname: `/order_details?order_id=${item.id}`,
                // }}
                className={classes.order_link}
              >
                <div
                  className={classes.rightcontainer}
                  key={item.tracking_client_id}
                >
                  <div className={classes.orderIdButtonContainer}>
                    <Button
                      variant="contained"
                      style={{ width: 376, backgroundColor: "#C82257" }}
                      size="large"
                    >
                      {item.tracking_client_id}
                    </Button>
                    <Button variant="outlined" onClick={(e) => handleClickOpen(e, item.id)}>
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ paddingRight: 10, color: "#C82257" }}
                        aria-hidden="true"
                      ></i>
                      {"  "}
                      Track
                    </Button>
                  </div>
                  {/*
                  { orderID.id === item.id ?
                    <div>
                      <Stepper activeStep={activeStep}>
                        {_.map(props.trackingOrder.track_data_status || [], ((label, index) => (
                          <Step key={label.order_id}>
                            <StepLabel>{label.status.toUpperCase()} </StepLabel>
                            <p style={{ fontSize: '12px' }}>{label.date.slice(0, 10)}</p>
                          </Step>
                        )))}
                      </Stepper>
                    </div>
                    : <div style={{ display: 'none' }}></div>} */}

                  {orderID.id === item.id ? <TrackingOrder open={orderID.hide} ID={orderID.id} /> : ''}

                  <hr />
                  <div className={classes.orderInfoContainer}>
                    <div className={classes.orderInfoBox}>
                      <img src={item.images} height="200px" width="132px" />
                      <div style={{ marginLeft: 10 }}>
                        <p>{item.product_name}</p>
                        <p>الكمية: {item.quantity}</p>
                      </div>
                    </div>
                    <div style={{ margin: 20 }}>
                      ريال سعودي {item.unit_price_net_amount}
                    </div>
                  </div>
                  <hr style={{ marginTop: 10, marginBottom: 10 }} />
                  <div className={classes.orderTotal}>
                    <p>
                      أمر على{" "}
                      <b>{moment(item.order_created).format("LLLL")} </b>
                    </p>
                    <p style={{ margin: 20 }}>
                      الطلب الكلي{" "}
                      <b style={{ paddingLeft: 10 }}>
                        ريال سعودي {item.unit_price_net_amount}
                      </b>
                    </p>
                  </div>
                  <hr style={{ marginTop: 10, marginBottom: 10 }} />
                </div>
              </Link>
            ))}
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
    myOrders: state.myOrders.myOrdersData,
    profile: state.userProfile,
    trackingOrder: state.trackingOrder.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
    myOrdersDispatch: (token) => dispatch(fetchMyOrdersApi(token)),
    fetchTrackingOrder: (token, id) => dispatch(fetchTrackingOrder(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
