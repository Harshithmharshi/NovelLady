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
import Footer from "../Footer";
// import Navbar from "../Header/Navbar";
import { Redirect, Link, NavLink } from "react-router-dom";
import Main from "../Header";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IMAGE1 from "../../images/image-07.png";
import fetchMyOrdersApi from "../../actions/myOrders.actions";

import TrackingOrder from "./TrackingOrder";

import { fetchTrackingOrder } from "../../actions/trackingOrderAction";
 import { Discount } from "../../constants/Discount";

 import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,

  },

  mainContent1320: {
    maxWidth: "1320px",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    }
  },

  profile_container: {
    width: "85%",
    margin: 0,
    height: "90%",
    marginTop: "50px",
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
    // marginLeft: "8%",
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

  rightcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #ddeeff",
    marginBottom: 15,
    padding: 5,
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

  linkTextStyle: {
    textAlign: "start",
    color: "#212121",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
      color: "#c82257",
    }
  },


  sidebar: {
    flexBasis: "250px",
  },

  sideName: {
    textAlign: "start",
    //  marginLeft: "32%",
    fontWeight: "bold",
  },


}));

const Orders = (props) => {
  const { email, phone, first_name: name, last_name } =
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



  // const current_status = _.get(props.trackingOrder.order_details, 'status');


  // var getStatus = _.map(props.trackingOrder.track_data_status || [], (status => {
  //   return status.status;
  // }));


  // const checkStatus = (status) => {
  //   return status === current_status;
  // }

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
    <>
      <div className={classes.root}>
        <Main />
      </div>

      <Grid container className={classes.mainContent1320}>
        <Grid item xs={12}>

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
            <hr style={{ width: "100%" }} />

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
                <hr style={{ width: "100" }} />
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
                <hr style={{ width: "100%" }} />
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

              {props.isLoadingMyOrders ? 
                <div style={{ marginLeft: '25%', padding: '100px', paddingBottom: '100px' }}>
                    <CircularProgress color="secondary" />
                </div> 
              :
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "74%",
                  marginLeft: 10,
                  borderRadius: 5,
                  padding: 10,
                  paddingLeft: 15,
                  textAlign: "start",
                  flexGrow: 1,
                }}
              >
                {_.map(myOrder || []).length === 0 ?
                  <Typography
                    style={{ width: "60%", marginLeft: "50%", }}
                  >
                    No Orders
             </Typography> : ''}

                {_.map(myOrder || [], (item) => (
                  <Link
                    to={{
                      pathname: `order-details/${item.id}/`,
                    }}
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
                          <div style={{ marginLeft: 10,textTransform:'capitalize' }}>
                            <p>{item.product_name}</p>
                            <p>Qty: {item.quantity}</p>
                          
                          <span>SAR {item.selling_price}</span>
                          <span style={{paddingLeft:'20px'}}><strike> SAR {item.mrp_price}</strike> </span> 
                          <span style={{color:'green',paddingLeft:'20px'}}>Saved {Discount(item.selling_price, item.mrp_price)}</span><br/>
                          <div style={{marginTop: 20}} >Status : {item.status}</div>
                          </div>
                        </div>
                        {/* <div style={{ margin: 20 }}>
                          SAR {item.unit_price_net_amount}
                        </div>  */}
                       
                      </div>
                      <hr style={{ marginTop: 10, marginBottom: 10 }} />
                      <div className={classes.orderTotal} style={{ margin: 30 }}>
                        <p>
                          Ordered on{" "}
                          <b>{moment(item.order_created).format("LLLL")} </b>
                        </p>
                        <p >
                          Order Total{" "}
                          <b style={{ paddingLeft: 10 }}>
                            SAR {item.unit_price_net_amount}
                          </b>
                        </p>
                      </div>
                      <hr style={{ marginTop: 10, marginBottom: 10 }} />
                    </div>
                  </Link>
                ))}
              </div>
              }
            </div>
          </div>
        </Grid>
      </Grid>





      <div style={{ display: "flex", }}>
        <Footer />
      </div>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.myOrders.myOrdersData,
    profile: state.userProfile,
    trackingOrder: state.trackingOrder.data,
    isLoadingMyOrders: state.myOrders.isLoadingMyOrders
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
