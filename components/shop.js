import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Breadcrumbs,
  Typography,
  FormControl,
  Select,
  Button,
  Snackbar,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FormGroup from "@material-ui/core/FormGroup";
import moment from "moment";
//Components
import Footer from "./Footer";
import "./shop.scss";
import Products from "./Products";
import Main from "./Header";
import { fetchAttributeListApi } from "../actions/attribute.action";
import {
  withRouter,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import {
  productsDatas,
  productsFilterData,
  productTagDatas,
  authenticatedProductData,
  authenticatedProductTagDatas,
} from "../actions/productsAction";
import { useState } from "react";
import { postDataToApi } from "../actions/add_to_cart.action";
import { postWishListID } from "../actions/wishlistAction";
import { authProdList } from "../actions/productsAction";
import querystring from "query-string";
import Skeleton from "@material-ui/lab/Skeleton";
import { searchData } from "../actions/searchAction";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';
import { localStorageItem } from "../constants/localStorageItem";
import { Helmet } from "react-helmet";
import MetaTags from 'react-meta-tags';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  mainContent1320: {
    maxWidth: "1320px",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    }
  },

  filtertitle: {
    position: 'absolute',
    // marginLeft: "3.5%",
    paddingBottom: '15px',
    fontFamily: "Roboto, sans-serif",
    fontWeight: "400",
  },

  filterBody: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    width: "80%",
    marginTop: "10%",
    // marginLeft: "12%",
    zIndex: '4',
    paddingBottom: '5%',
  },

  heading: {
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "capitalize",

    // padding: "6px 10px",
    // marginRight: "20px",
  },



  breadcrumbLink: {
    textTransform: "uppercase",
    fontSize: "14px",
    cursor: "pointer",
    color: "black",
    textDecoration: "none",
    letterSpacing: '1px',
    backgroundColor: "transparent",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    lineHeight: "0.5",
  },

  breadcrumbs: {
    // marginTop: "25%",
    // marginLeft: "3.5%",
    marginTop: "50px",
    // [theme.breakpoints.down('xl')]: {
    //   marginTop: "14%",
    // },
    // [theme.breakpoints.down('md')]: {
    //   marginTop: "20%",
    // },
    // [theme.breakpoints.down('sm')]: {
    //   marginTop: "28%",
    // }
  },

  prodLists: {
    // position: "relative",
    // marginLeft: "25%",
    paddingBottom: "5%",
    // marginRight: "5%",
    marginTop: "3%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-around",
  },

  formBody: {
    marginTop: "-10px",
    // marginLeft: "13px",
  },

  inputLabel: {
    position: "absolute",
    textTransform: "capitalize",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    marginLeft: "10px",
    marginTop: "2%",
  },

  inputCheckbox: {
    position: "absolute",
  },

  inputSection: {
    marginLeft: "4px",
    paddingBottom: "10px",
    zIndex: "1",
    textTransform: "capitalize",
  },

  FilterHeader: {
    fontSize: "12px",
    fontWeight: "bold",
  },

  FilterSection: {
    paddingBottom: "15px",
  },

  sortby_title: {
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "capitalize",
  },

  formControl: {
    marginTop: "-5%",
    paddingLeft: "8%",
  },

  sortbySection: {
    display: "flex",
    // marginLeft: "75%",
    float: 'right',
  },

  rootP: {
    display: "grid",
    alignItems: "stretch",
    [theme.breakpoints.down("xl")]: {
      gridTemplateColumns: "auto auto auto auto",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "auto auto auto",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "auto auto",
    },
  },

  container: {
    paddingBottom: "20px",
    minWidth: "26%",
    position: "relative",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    textAlign: "justify",
    marginRight: "10px",
    width: "230px",
  },

  prodDetails: {
    textDecoration: "none",
    textAlign: "justify",
    // marginLeft: "12%",
    marginTop: "10px",
    width: "230px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodName: {
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    width: "120px",
    whiteSpace: "noWrap",
    fontFamily: "Roboto, sans-serif",
    color: "black",
    textDecoration: "none",
    textTransform: "capitalize",
    "&:hover": {
      color: " #C82257",
      textDecoration: "none",
    },
  },

  prodsellingPrice: {
    fontSize: "14px",
    fontWeight: "700",
    color: "black",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodmrpPrice: {
    fontSize: "14px",
    // marginLeft: "12px",
    paddingLeft: "10px",
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodDiscount: {
    // marginLeft: "12px",
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff905a",
  },

  hoveredButtons: {
    position: "absolute",
    bottom: "109px",
    paddingTop: "20rem",
    width: "100%",
    transition: ".4s ease",
    opacity: 0,
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  prodImage: {
    height: "340px",
    width: "280px",
    padding: "0px 30px",
    backgroundColor: "transparent",
    textDecoration: "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    "&:hover": {
      textDecoration: "none",
    },
  },

  sizeAvail: {
    display: "flex",
    padding: "10px 0px 20px 20px",
  },

  prodSizeTitle: {
    paddingTop: "4%",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "400",
    color: "#707070",
    marginLeft: "2%",
    // marginLeft: "35%",
  },

  sizeOptions: {
    marginLeft: "5%",
    fontSize: "12px",
    fontWeight: "normal",
    border: "1px solid #707070",
    borderRadius: "50%",
    width: "30px",
    lineHeight: "30px",
    padding: "8xp 20px",
    // padding: "3px 4px",
    textAlign: "center",
    display: "inline-block",
    textDecoration: "none",
    color: "#707070",
    "&:hover": {
      borderColor: "#C82257",
      color: "#C82257",
      textDecoration: "none",
    },
  },

  hoverbtn: {
    display: "flex",
    paddingTop: "18px",
    paddingBottom: "10px",
    justifyContent: "space-evenly",
    width: '240px'
  },

  addtobagBtn: {
    // marginLeft: "16px",
    padding: "7px 10px",
    fontSize: "12px",
    fontWeight: "normal",
    backgroundColor: "#C82257",
    color: "white",
    "&:hover": {
      backgroundColor: "#C82257",
    },
  },

  wishlistBtn: {
    padding: "5px 8px",
    // marginLeft: "15px",
    fontSize: "12px",
    fontWeight: "normal",
    backgroundColor: "white",
    border: "0.5px solid black",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  prodDesc: {
    marginTop: "1px",
    fontWeight: "400",
    fontSize: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "black",
    width: "200px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },

  productLink: {
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  hideSize: {
    display: "none",
  },

}));

const valuetext = (value) => value;

let arrVal = [];
let arrValEmpty = [];
let newCheckedValue = [];


function ProductDetail(props) {
  const classes = useStyles();
  const [checkbox, setCheckbox] = useState(false);
  const [price_value, setValue] = React.useState([0, 10000]);
  const [hoverOptions, setHoverOptions] = React.useState(false);
  const [hoverSizeOptions, setHoverSizeOptions] = React.useState(false);
  const [productData, setProductData] = React.useState([]);
  const [addBtnBool, setAddBtnBool] = React.useState(false);
  const qs = querystring.parse(props.location.search);
  const obj = { ...qs };
  const [checkValue, setCheckValue] = useState([]);

  const [showSize, setShowSize] = useState({ id: "", hide: true });
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    wishList: false,
  });
  const { vertical, horizontal, open } = state;
  const [search, setSearch] = useState(false);
  const { data } = props.attribute || {};


  // console.log(obj, props.location)
  useEffect(() => {
    window.scrollTo(0, 0);
    props.attribute_list();
    props.authProdList(localStorage.getItem("user_token"));
    if (!checkbox) {
      if (obj.hasOwnProperty("category_id")) {
        if (localStorage.getItem("user_token")) {
          props.productAuthData(localStorage.getItem("user_token"), obj.category_id);
        } else {
          props.productData(obj.category_id);
        }
      } else if (obj.hasOwnProperty("tag_id")) {
        if (localStorage.getItem("user_token")) {
          props.productAuthTagData(localStorage.getItem("user_token"), obj.tag_id);
        } else {
          props.productTagDispatch(obj.tag_id);
        }
      }
    }
  }, []);


  useEffect(() => {
    if (props.match.path === "/search/:id") {
      setSearch(true);
      props.searchData(props.match.params.id);
    } else {
      setSearch(false);
      setProductData(props.products.shopData)
    }
  }, [props.match.params.id]);


  useEffect(() => {
    if (props.match.path === "/search/:id") {
      setProductData(props.search);
    }
    else {
      setProductData(props.products.shopData)
    }
  });

  // checkbox toggle
  const onChecked = (e, item) => {
    const { checked, name, value } = e.target;

    if (value == item && checked) {
      newCheckedValue.push(item);
      newCheckedValue = _.uniq(newCheckedValue);
      console.log("Checked", newCheckedValue);
      console.log(price_value);
      props.searchData(props.match.params.id, newCheckedValue, price_value);
      if (localStorage.getItem("user_token")) {
        props.productAuthData(localStorage.getItem("user_token"), obj.category_id, newCheckedValue, price_value);
      } else {
        props.productData(obj.category_id, newCheckedValue, price_value);
      }
      setCheckbox({ ...checkbox, [name]: !checkbox });
    } else {
      console.log("Unchecked item", item);
      newCheckedValue = _.filter(newCheckedValue, function (i) {
        return i !== item;
      });
      console.log("UnChecked", newCheckedValue);
      props.searchData(props.match.params.id, newCheckedValue, price_value);

      if (localStorage.getItem("user_token")) {
        props.productAuthData(localStorage.getItem("user_token"), obj.category_id, newCheckedValue, price_value);
      } else {
        props.productData(obj.category_id, newCheckedValue, price_value);
      }
      setCheckbox({ ...checkbox, [name]: !checkbox });
    }



    // if (value == item && checked) {
    //   arrVal.push(item);
    //   props.productData(obj.category_id, arrVal, price_value);
    //   setCheckbox({ ...checkbox, [name]: !checkbox });
    //   return value;
    // } else {
    //   console.log(arrVal.filter(i => i === item));
    //   console.log(item);
    //   arrVal.filter(i => i !== item);
    //   // arrVal.pop(item);
    //   props.productData(obj.category_id, arrVal, price_value);
    //   setCheckbox({ ...checkbox, [name]: !checkbox });
    // }
  };



  // calculating discount percent
  const discountPer = (mrpPrice, selllingPrice) => {
    let discount = mrpPrice - selllingPrice;
    return discount.toFixed(1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (localStorage.getItem("user_token")) {
      props.productAuthData(localStorage.getItem("user_token"), obj.category_id, newCheckedValue, price_value);

    } else {
      props.productData(obj.category_id, newCheckedValue, newValue);
    }
    props.searchData(props.match.params.id, newCheckedValue, newValue);

  };

  // onclick apply button
  // const onButtonClick = (e) => {
  //   e.preventDefault();
  //   const ids = Object.keys(checkbox);
  //   if (obj.hasOwnProperty("tag_id")) {
  //     props.productTagDispatch(obj.tag_id, ids, value);
  //     setCheckbox(false);
  //   } else {
  //     props.productData(obj.category_id, ids, value);
  //     setCheckbox(false);
  //   }
  // };

  // Show size for add to bag
  const showAddToCartSize = (event, id) => {
    event.preventDefault();
    if (showSize.hide) {
      setShowSize({ ...showSize, id: id, hide: false });
    } else {
      setShowSize({ ...showSize, id: "", hide: true });
    }
  };

  // adding the products to cart
  const addToCart = (event, instanceID, newState) => {
    event.preventDefault();
    // props.postToCart(localStorage.getItem("user_token"), instanceID);
    // setState({ open: true, wishList: false, ...newState });
    // props.productAuthTagData(obj.tag_id);


    setState({ open: true, wishList: false, ...newState });


    if (localStorage.getItem("user_token")) {
      const data = { product_instance_id: instanceID, quantity: 1 };
      props.postToCart(localStorage.getItem("user_token"), data);
      props.productAuthTagData(localStorage.getItem("user_token"), obj.tag_id);
      props.productAuthData(localStorage.getItem("user_token"), obj.category_id);
      props.authProdList(localStorage.getItem("user_token"));
    } else {
      localStorageItem(instanceID);
    }

  };

  //Send to WishList
  const sendWishList = (event, instanceID, newState) => {
    event.preventDefault();
    let postID = {
      id: instanceID,
    };
    props.postWishListID(localStorage.getItem("user_token"), postID);
    props.productAuthData(localStorage.getItem("user_token"), obj.category_id);
    props.authProdList(localStorage.getItem("user_token"));
    setState({ open: true, wishList: true, ...newState });
    props.authProdList(localStorage.getItem("user_token"));


  };

  // for sorting the products
  const sortBy = (e) => {
    if (typeof productData !== "undefined") {
      const { value } = e.target;
      if (value === "Price Low to High") {
        console.log(productData);
        productData.sort((a, b) => a.selling_price - b.selling_price);
        setProductData({ ...productData, productData: productData });
      } else {
        productData.sort((a, b) => b.selling_price - a.selling_price);
        setProductData({ ...productData, productData: productData });
      }
    }
  };

  const regex = /\s/g;

  const title_name = typeof props.location.pathname !== "undefined" ? props.location.pathname.slice(6).charAt(0).toUpperCase() + props.location.pathname.slice(7) : 'Online shopping exclusive for Women. Best online fashion store.';
  
  return (
    <div className={classes.root}>

      <Helmet>
         <title>{` ${title_name} - Novellady`}</title>
         <meta itemprop="name"  property="og:title" name="keywords" content={` ${title_name}, Online shopping, online shopping sites, women apparels, women clothing, online shopping site`} />
         <meta property="og:description" name="description" content={` ${title_name}. Online shopping exclusive for Women. Best online fashion store.`} />
       </Helmet>

      {/* <MetaTags>
        <title>{` ${title_name} - Novellady`}</title>
        <meta name="description" content={` ${title_name}. Online shopping exclusive for Women. Best online fashion store.`} />
        <meta property="og:title" content={` ${title_name} - Novellady`} />
      </MetaTags> */}


      <div>
        <Main />
      </div>


      <Grid container className={classes.mainContent1320}>
        <Grid item xs={12}>
          <div className={classes.breadcrumbs}>
            <Breadcrumbs>
              <Typography className={classes.breadcrumbLink} to="/">
                Home
              </Typography>
              <Typography className={classes.breadcrumbLink}>
                <div>
                  <span>
                    {props.products.isShopDataLoading
                      ? props.location.pathname
                        .replace("/", "")
                        .substr(-1, props.location.pathname.indexOf("?"))
                      : props.location.pathname.replace("/", "") ||
                      "Fashion Wear"}
                    <span style={{ color: "#C82257" }}>
                      {" "}
                      -{" "}
                      {
                        _.map(search ? props.search : props.products.shopData)
                          .length
                      }{" "}
                      items
                    </span>
                  </span>
                </div>
              </Typography>
            </Breadcrumbs>
          </div>
        </Grid>
      </Grid>

      <Grid container className={classes.mainContent1320}>
        <Grid item xs={12}>
          <div className={classes.sortbySection}>
            <p className={classes.sortby_title}>sort by</p>
            <FormControl
              required
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                native
                autoWidth={true}
                style={{ color: "#C82257" }}
                onChange={(e) => sortBy(e)}

              >
                <option aria-label="New Arrivals" value="" disabled selected >New Arrivals</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>

              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container className={classes.mainContent1320}>
          <Grid item xs={3}>
            <div className={classes.filtertitle}>
              <h6>
                <strong>Filters</strong>
              </h6>
            </div>

            <div className={classes.filterBody}>
              <div className={classes.FilterSection}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography id="range-slider" className={classes.heading}>
                      price
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Slider
                      min={0}
                      max={10000}
                      style={{ width: "70%" }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={valuetext}
                      value={price_value}
                      onChange={handleChange}
                      step={1000}
                      marks
                    />
                    <br />
                    <p>SR 0 - SR 10000</p>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div className={classes.FilterSection}>
                {_.map(data, (obj) => (
                  <ExpansionPanel
                    id={obj.id}
                    key={obj.id}
                    style={{ marginBottom: 20 }}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        {obj.attributes_name}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {_.map(obj.values, (item) => (
                        <FormGroup key={item.id}>
                          <div className={classes.formBody}>
                            <div className={classes.inputSection}>
                              <input
                                type="checkbox"
                                name={item.id}
                                value={item.id}
                                // checked={checkbox}
                                onClick={(e) => onChecked(e, item.id)}
                                style={{ marginLeft: "-80%" }}
                              />
                              <label className={classes.inputLabel}>
                                {item.value}
                              </label>
                              <br />
                            </div>
                          </div>
                        </FormGroup>
                      ))}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </div>
              {/* <Button
                onClick={(e) => onButtonClick(e)}
                variant="contained"
                color="secondary"
                style={{
                  width: "100%",
                  height: "3rem",
                  backgroundColor: "#C82257",
                  // zIndex: "3",
                }}
              >
                Apply
              </Button> */}
            </div>
          </Grid>




          <Grid item xs={9}>

            <div className={classes.prodLists}>

              {props.products.isShopDataLoading ?
                <div style={{ marginLeft: '25%', padding: '100px', paddingBottom: '100px' }}>
                  <CircularProgress color="secondary" />
                </div> :

                <div className={`${classes.rootP} rootP`}>
                  {_.map(productData) && _.map(productData).length > 0 ? (
                    _.map(productData || [],
                      (item) => {
                        return (
                          <div key={item.id} className={classes.container}>
                            <Link
                              to={{
                                // pathname: "/product/" + item.id,
                                pathname: `/product/${typeof item.product_name !== "undefined" ? item.product_name.toString().replace(regex, "-") : item.product_name}/${item.id}/`,

                              }}
                              className={classes.productLink}
                              target="_blank"
                            >
                              {item.product_images ? (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  width="240"
                                  height="360"
                                // className={classes.prodImage}
                                />
                              ) : (
                                  <img
                                    src={item.product_image}
                                    alt={item.product_name}
                                    width="240"
                                    height="360"
                                  // className={classes.prodImage}
                                  />
                                )}
                              <div className={classes.hoveredButtons}>
                                <div
                                  style={{
                                    backgroundColor: "rgba(255,255,255,0.9)",
                                  }}
                                >
                                  <div>
                                    <div
                                      className={
                                        showSize.id === item.id
                                          ? classes.prodSizeTitle
                                          : classes.hideSize
                                      }
                                    >
                                      Select size
                                  </div>
                                    <div
                                      className={
                                        showSize.id === item.id
                                          ? classes.sizeAvail
                                          : classes.hideSize
                                      }
                                    >
                                      {_.map(
                                        item.size_available || [],
                                        (items) => {

                                          return (
                                            <span
                                              key={items.id}
                                              className={classes.sizeOptions}

                                              onClick={(event) => {
                                                addToCart(
                                                  event,
                                                  items.product_instance_id
                                                );
                                              }}
                                            >
                                              {items.size_value}
                                            </span>
                                          )
                                        }
                                      )}
                                    </div>
                                  </div>

                                  <div className={classes.hoverbtn}>
                                    <Button
                                      className={classes.addtobagBtn}
                                      variant="contained"

                                      onClick={(event) =>
                                        showAddToCartSize(event, item.id)
                                      }
                                      disabled={_.some(item.size_available, { in_cart: "True" }) ? true : false}

                                    >
                                      {_.some(item.size_available, { in_cart: "True" }) ? "in Bag" : "Add to bag"}

                                    </Button>


                                    {localStorage.getItem('user_token') ?
                                      <Button
                                        className={classes.wishlistBtn}
                                        variant="contained"
                                        onClick={(event) =>
                                          sendWishList(event, item.product_instance_id)
                                        }
                                        disabled={item.in_wishlist === "True" ? true : false}
                                      >
                                        {item.in_wishlist === "True" ? 'In Wishlist' : 'wishlist'}
                                      </Button>
                                      :
                                      <Link
                                        to={{
                                          pathname: '/customer/login',
                                          state: {
                                            referrer: '/wishlist',
                                          }
                                        }}
                                        className={classes.productLink}
                                      >
                                        <Button
                                          className={classes.wishlistBtn}
                                          variant="contained"
                                        >
                                          wishlist
                                       </Button>
                                      </Link>

                                    }

                                    <div />
                                  </div>
                                </div>
                              </div>
                              <div className={classes.prodDetails}>
                                <Typography className={classes.prodName}>
                                  {item.product_name}
                                </Typography>
                                <p className={classes.prodDesc}>
                                  {item.product_description}
                                </p>
                                <div className={classes.priceSection}>
                                  <span className={classes.prodsellingPrice}>
                                    SAR {item.selling_price}
                                  </span>
                                  <span className={classes.prodmrpPrice}>
                                    <strike>SAR {item.mrp_price}</strike>
                                  </span>
                                  <span className={classes.prodDiscount}>
                                    (
                                  {discountPer(
                                    item.mrp_price,
                                    item.selling_price
                                  )}{" "}
                                  OFF)
                                </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    )
                  ) : (

                      <div style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "500",
                        marginLeft: '50%',
                        padding: '150px',
                        paddingBottom: '150px',
                        whiteSpace: 'nowrap'
                      }}>
                        No Data
                      </div>


                    )
                  }

                </div>


              }
            </div>
          </Grid>
        </Grid>
      </div>



      <Grid container>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>


      {state.wishList ?
        <Snackbar
          className={classes.snackBar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          key={`${vertical},${horizontal}`}
          open={open}
          autoHideDuration={2000}
          onClose={() => setState({ open: false })}
          message="Added to Wishlist"
        />
        :
        <Snackbar
          className={classes.snackBar}
          open={open}
          autoHideDuration={2000}
          onClose={() => setState({ open: false })}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          key={`${vertical},${horizontal}`}
        >
          <Alert style={{ backgroundColor: "#C82257" }} variant="filled">
            Added to Bag
            </Alert>
        </Snackbar>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  attribute: state.attribute.attributData,
  products: state.shopProduct,
  search: state.search.data,
});

const mapDispatchToProps = (dispatch) => ({
  attribute_list: () => dispatch(fetchAttributeListApi()),
  // productData: (id) => dispatch(productsData(id)),
  productData: (category_id, tag_id, value) =>
    dispatch(productsDatas(category_id, tag_id, value)),
  productTagDispatch: (tag, tag_id, value) =>
    dispatch(productTagDatas(tag, tag_id, value)),
  postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),
  productAuthData: (token, category_id, tag_id, value) =>
    dispatch(authenticatedProductData(token, category_id, tag_id, value)),
  productAuthTagData: (token, category_id, tag_id, value) =>
    dispatch(authenticatedProductTagDatas(token, category_id, tag_id, value)),
  searchData: (data, attributeID, priceValue) => dispatch(searchData(data, attributeID, priceValue)),
  postWishListID: (token, id) => dispatch(postWishListID(token, id)),
  authProdList: (token) => dispatch(authProdList(token)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
