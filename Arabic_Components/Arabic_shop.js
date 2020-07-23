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
import Footer from "./Arabic_Footer";
import "./shop.scss";
import Products from "./Arabic_Products";
import Main from "./Arabic_Header";
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  filtertitle: {
    position: 'absolute',
    marginLeft: "3.5%",
    paddingBottom: '15px',
    fontFamily: "Cairo, sans-serif",
    fontWeight: "400",
    // float:'right'
  },

  filterBody: {
    fontFamily: "Cairo, sans-serif",
    fontWeight: "500",
    width: "50%",
    marginTop: "10%",
    marginLeft: "12%",
    zIndex: '4',
    // float:'right',
    paddingBottom: '5%',
  },

  heading: {
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "capitalize",
    float: 'right'
  },



  breadcrumbLink: {
    marginLeft: '10px',
    textTransform: "uppercase",
    fontSize: "14px",
    cursor: "pointer",
    color: "black",
    textDecoration: "none",
    letterSpacing: '1px',
    backgroundColor: "transparent",
    fontFamily: "Cairo, sans-serif",
    fontWeight: "500",
    lineHeight: "0.5",
  },

  breadcrumbs: {
    float: 'right',
    // marginTop: "25%",
    marginRight: "3.5%",
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
    marginLeft: "13px",

  },

  inputLabel: {
    position: "absolute",
    textTransform: "capitalize",
    fontFamily: "Cairo, sans-serif",
    fontSize: "14px",
    marginLeft: "-30%",
    marginTop: "2%",

  },



  inputSection: {
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
    paddingRight: '40px'
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
    marginLeft: "4%",
    float: 'left'
  },

  rootP: {
    display: "grid",
    alignItems: "stretch",
    [theme.breakpoints.down("xl")]: {
      gridTemplateColumns: "auto auto auto auto",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "auto auto auto ",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "auto auto",
    },
    paddingLeft: '5%'

  },

  container: {
    paddingBottom: "8%",
    paddingLeft: "5%",
    minWidth: "26%",
    position: "relative",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row-reverse",
    overflow: "hidden",

  },

  prodDetails: {
    float: 'right',
    textDecoration: "none",
    marginTop: "5%",
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
    float: 'right',
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    width: "120px",
    whiteSpace: "noWrap",
    fontFamily: "Cairo, sans-serif",
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
    paddingRight: "10px",
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodDiscount: {
    paddingRight: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff905a",
  },

  hoveredButtons: {
    position: "absolute",
    bottom: "21%",
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
    marginRight: '21%',
    justifyContent: 'flex-end'
  },

  prodSizeTitle: {
    paddingTop: "4%",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "48%",
    fontFamily: "Cairo, sans-serif",
    paddingBottom: '5px',
    color: "#707070",
  },

  sizeOptions: {
   
    fontSize: "12px",
    fontWeight: "normal",
    border: "1px solid #707070",
    borderRadius: "100%",
    width: "32px",
    lineHeight: "30px",
    padding: "8xp 20px",
    display: "inline-block",
    textDecoration: "none",
    color: "#707070",
    "&:hover": {
      borderColor: "#C82257",
      color: "#C82257",
      textDecoration: 'none'
    },
  },

  hoverbtn: {
    display: "flex",
    paddingTop: "18px",
    paddingBottom: "10px",
    justifyContent:'space-around',
    width:'240px'
  },

  addtobagBtn: {
    whiteSpace:'nowrap',
    // marginLeft: "23%",
    padding: "7px 10px",
    fontSize: "10px",
    fontWeight: "normal",
    backgroundColor: "#C82257",
    color: "white",
    "&:hover": {
      backgroundColor: "#C82257",
    },
  },

  wishlistBtn: {
    whiteSpace:'nowrap',
    padding: "5px 8px",
    // marginLeft: "20%",
    fontSize: "10px",
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
    marginLeft: '30px',
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

  const [showSize, setShowSize] = useState({ id: "", hide: true });
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    wishList: false,
  });
  const { vertical, horizontal, open } = state;
  const [search, setSearch] = useState(false);

  // console.log(obj, props.location)
  useEffect(() => {
    props.attribute_list();
    props.authProdList(localStorage.getItem("user_token"));
    if (!checkbox) {
      if (obj.hasOwnProperty("category_id")) {
        if (localStorage.getItem("user_token")) {
          props.productAuthData(obj.category_id);
        } else {
          props.productData(obj.category_id);
        }
      } else if (obj.hasOwnProperty("tag_id")) {
        if (localStorage.getItem("user_token")) {
          props.productAuthTagData(obj.tag_id);
        } else {
          props.productTagDispatch(obj.tag_id);
        }
      }
    }
  }, []);

  // after rendering moving the screen to top
  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  useEffect(() => {
    if (props.match.path === "/search/:id") {
      setSearch(true);
      props.searchData(props.match.params.id);
    } else {
      setSearch(false);
      props.productData(obj.category_id);
    }
  }, [props.match.params.id]);


  const { data } = props.attribute || {};
  // checkbox toggle
  const onChecked = (e, item) => {
    const { checked, name, value } = e.target;
    // if (value == item && checked) {
    //   arrVal.push(item);
    //   props.productData(obj.category_id, arrVal, price_value);
    //   setCheckbox({ ...checkbox, [name]: !checkbox });
    // } else {
    //   let ArrValue=arrVal.filter(i=>i!==item);
    //   props.productData(obj.category_id, ArrValue, price_value);
    //   setCheckbox({ ...checkbox, [name]: !checkbox });
    // }

    

    if (value == item && checked) {
      newCheckedValue.push(item);
      newCheckedValue = _.uniq(newCheckedValue);
      console.log("Checked", newCheckedValue);
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
      if (localStorage.getItem("user_token")) {
        props.productAuthData(localStorage.getItem("user_token"), obj.category_id, newCheckedValue, price_value);
      } else {
        props.productData(obj.category_id, newCheckedValue, price_value);
      }
      setCheckbox({ ...checkbox, [name]: !checkbox });
    }



  };


  useEffect(() => {
    setProductData(props.products.shopData)
  })

  // calculating discount percent
  const discountPer = (mrpPrice, selllingPrice) => {
    let discount = mrpPrice - selllingPrice;
    return discount.toFixed(1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(localStorage.getItem("user_token")){
      props.productAuthData(localStorage.getItem("user_token"), obj.category_id, newCheckedValue, price_value);
    }else{
      props.productData(obj.category_id, newCheckedValue, newValue);

    }
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
      props.productAuthTagData(obj.tag_id);

      setTimeout(() => {
        props.authProdList(localStorage.getItem("user_token"));
      }, 100);
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
    setState({ open: true, wishList: true, ...newState });
    props.authProdList(localStorage.getItem("user_token"));
  };

  // for sorting the products
  const sortBy = (e) => {
    if (typeof productData !== "undefined") {
      const { value } = e.target;
      if (value === "Price High to Low") {
        productData.sort((a, b) => a.selling_price - b.selling_price);
        setProductData({ ...productData, productData: productData });
      } else {
        productData.sort((a, b) => b.selling_price - a.selling_price);
        setProductData({ ...productData, productData: productData });
      }
    }
  };

  const regex = /\s/g;

  const title_name = typeof props.location.state.translated_name !== "undefined" ? props.location.pathname.slice(6) : '';

  return (
    <div className={classes.root}>
    <Helmet>
                <title>{` ${title_name} - Novellady`}</title>
                <meta name="keywords" content={` ${title_name}, Online shopping, online shopping sites, women apparels, women clothing, online shopping site`} />
                <meta name="description" content={` ${title_name}. Online shopping exclusive for Women. Best online fashion store.`} />
            </Helmet>
      <div>
        <Main />
      </div>


      <Grid container>
        <Grid item xs={12}>
          <div className={classes.breadcrumbs}>
            {!props.products.isShopDataLoading ?
              <Breadcrumbs>
                <div style={{ display: 'flex' }}>
                  <Typography className={classes.breadcrumbLink} to="/">
                    الصفحة الرئيسية
                  </Typography>{" "}
                  <Typography className={classes.breadcrumbLink} >
                    {" / "} {typeof props.location.state !== "undefined" ? props.location.state.translated_shop : 'بحث'} {" / "}
                  </Typography>
                  <Typography className={classes.breadcrumbLink}>
                    {typeof props.location.state !== "undefined" ? props.location.state.translated_name : props.location.pathname.substr(8) === "search" ? 'بحث' : props.location.pathname.substr(8)}
                  </Typography>
                  <Typography className={classes.breadcrumbLink}>
                    <span style={{ marginLeft: '5px', color: "#C82257" }}>
                      - {" "}
                      {
                        _.map(search ? props.search : props.products.shopData)
                          .length
                      }{" "}
                      العناصر
                    </span>
                  </Typography>
                </div>
              </Breadcrumbs>
              : ''}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <div className={classes.sortbySection}>
            <p className={classes.sortby_title}>صنف حسب</p>
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
                <option aria-label="New Arrivals" value=""  disabled selected>الوافدون الجدد</option>
                <option value="Price Low to High">السعر من الارخص للاعلى</option>
                <option value="Price High to Low">السعر الاعلى الى الادنى</option>

              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={9}>
            <div className={classes.prodLists}>
              {props.products.isShopDataLoading ?
                <div style={{ marginLeft: '25%', padding: '100px', paddingBottom: '100px' }}>
                  <CircularProgress color="secondary" />
                </div> :

                <div className={`${classes.rootP} rootP`}>
                  {_.map(search ? props.search : productData) &&
                    _.map(search ? props.search : productData)
                      .length > 0 ? (
                      _.map(
                        search ? props.search : productData || [],
                        (item) => {
                          return (
                            <div key={item.id} className={classes.container}>
                              <Link
                                to={{
                                  // `/product/${item.id}`
                                  pathname: `/product/${item.product_name.toString().replace(regex, "-")}/${item.id}/`,
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
                                        أختر الحجم
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
                                                {items.translated_size_value}
                                              </span>
                                            )
                                          }
                                        )}
                                      </div>
                                    </div>

                                    <div className={classes.hoverbtn}>
                                      {localStorage.getItem('user_token') ?
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
                                            قائمة الرغبات
                                       </Button>
                                        </Link> :
                                        <Button
                                          className={classes.wishlistBtn}
                                          variant="contained"
                                          onClick={(event) =>
                                            sendWishList(event, item.product_instance_id)
                                          }
                                          disabled={item.in_wishlist === "True" ? true : false}
                                        >
                                          {item.in_wishlist === "True" ? 'في قائمة الرغبات' : 'قائمة الرغبات'}
                                        </Button>

                                      }
                                      <Button
                                        className={classes.addtobagBtn}
                                        variant="contained"
                                        disabled={
                                          item.in_cart === "True" ? true : false
                                        }
                                        onClick={(event) =>
                                          showAddToCartSize(event, item.id)
                                        }
                                      >
                                        {item.in_cart === "True" ? 'في حقيبة' : 'أضف الى الحقيبة'}

                                      </Button>

                                      <div />
                                    </div>
                                  </div>
                                </div>
                                <div className={classes.prodDetails} style={{ marginTop: "5%", textAlign: "right", textAlignLast: 'right' }}>
                                  <Typography className={classes.prodName}>
                                    {item.translated_product_name}
                                  </Typography>
                                  <p className={classes.prodDesc}>
                                    {item.translated_product_description}
                                  </p>
                                  <div className={classes.priceSection}>
                                    <span className={classes.prodDiscount}>
                                      (
                                  {discountPer(
                                      item.mrp_price,
                                      item.selling_price
                                    )}{" "}
                                  OFF)
                                </span>

                                    <span className={classes.prodmrpPrice}>
                                      <strike>SAR {item.mrp_price}</strike>
                                    </span>

                                    <span className={classes.prodsellingPrice}>
                                      SAR {item.selling_price}
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
                        fontFamily: "Cairo, sans-serif",
                        fontWeight: "500",
                        marginLeft: '50%',
                        padding: '150px',
                        paddingBottom: '150px',
                        whiteSpace: 'nowrap'
                      }}>
                        لايوجد بيانات
                      </div>
                    )
                  }
                </div>
              }
            </div>
          </Grid>

          <Grid item xs={3} >
            <div className={classes.filtertitle}>
              <h6>
                <strong>مرشحات</strong>
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
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} IconButtonProps={{ edge: 'start' }}>
                      <Typography className={classes.heading}>
                        {obj.translated_attribute_name}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {_.map(obj.values, (item) => (
                        <FormGroup key={item.id}>
                          <div className={classes.formBody}>
                            <div className={classes.inputSection}>

                              <label className={classes.inputLabel}>
                                {item.translated_attribute_value}
                              </label>

                              <input
                                type="checkbox"
                                name={item.id}
                                value={item.id}
                                onClick={(e) => onChecked(e, item.id)}
                                style={{ marginLeft: '30%' }}
                              />

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
          message="أضيف لقائمة الأماني"
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
            تمت الإضافة إلى سلة التسوق
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
  productAuthData: (category_id, tag_id, value) =>
    dispatch(authenticatedProductData(category_id, tag_id, value)),
  productAuthTagData: (category_id, tag_id, value) =>
    dispatch(authenticatedProductTagDatas(category_id, tag_id, value)),
  searchData: (data) => dispatch(searchData(data)),
  postWishListID: (token, id) => dispatch(postWishListID(token, id)),
  authProdList: (token) => dispatch(authProdList(token)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
