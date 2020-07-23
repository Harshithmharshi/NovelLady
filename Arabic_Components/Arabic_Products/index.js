import React, { useState, useEffect } from "react";
import { Snackbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { productsListingData, authProdListing } from "../../actions/productsAction";
import { Discount } from "../../constants/Discount";

import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { postWishListID } from "../../actions/wishlistAction";
import Skeleton from "@material-ui/lab/Skeleton";
import _ from "lodash";
import Alert from "@material-ui/lab/Alert";
import { postDataToApi } from "../../actions/add_to_cart.action";

import { localStorageItem } from '../../constants/localStorageItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  container: {
    position: "relative",
    textAlign: "right",
    marginRight: '10%'
  },


  prodName: {
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "250px",
    fontFamily: "Cairo, sans-serif",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: " #C82257",
      textDecoration: "none",
    },
  },

  prodDesc: {
    fontFamily: "Cairo, sans-serif",
    marginLeft: '48px',
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

  prodsellingPrice: {
    fontSize: "14px",
    fontWeight: "700",
    color: "black",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodmrpPrice: {
    marginRight: '5px',
    fontSize: "14px",
    marginLeft: "14px",
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },




  sizeOptions: {
    fontFamily: "Cairo, sans-serif",
    marginLeft: "2%",
    fontSize: "12px",
    fontWeight: "normal",
    border: "1px solid #707070",
    borderRadius: "100%",
    width: "30px",
    lineHeight: "30px",
    padding: "3px 4px",
    textAlign: "center",
    display: "inline-block",
    textDecoration: "none",
    color: "#707070",
    "&:hover": {
      borderColor: "#C82257",
      color: "#C82257",
    },
  },

  hoveredButtons: {
    position: "absolute",
    paddingTop: "80%",
    bottom: "20%",
    width: "110%",
    transition: ".4s ease",
    opacity: 0,
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  sizeAvail: {
    display: "flex",
    padding: "10px 10px 10px 20px",
  },

  prodSizeTitle: {
    fontFamily: "Cairo, sans-serif",
    paddingTop: "4%",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "2%",
    color: "#707070",
  },

  sizeOptions: {
    marginLeft: "2%",
    fontSize: "12px",
    fontWeight: "normal",
    border: "1px solid #707070",
    borderRadius: "100%",
    width: "32px",
    lineHeight: "30px",
    padding: "8xp 20px",
    textAlign: "center",
    display: "inline-block",
    textDecoration: "none",
    color: "#707070",
    "&:hover": {
      borderColor: "#C82257",
      color: "#C82257",
    },
  },

  hoverbtn: {
    display: "flex",
    paddingTop: "18px",
    paddingBottom: "10px",
    justifyContent: 'space-around',
    width: '240px'
  },


  addtobagBtn: {
    whiteSpace: 'nowrap',
    padding: "5px 8px",
    fontSize: "10px",
    fontWeight: "normal",
    // marginLeft: "8%",
    fontFamily: "Cairo, sans-serif",
    backgroundColor: "#C82257",
    color: "white",
    whiteSpace: 'nowrap',
    "&:hover": {
      backgroundColor: "#C82257",
    },
  },

  wishlistBtn: {
    whiteSpace: 'nowrap',
    padding: "5px 8px",
    // marginLeft: "5%",
    fontSize: "10px",
    fontWeight: "normal",
    fontFamily: "Cairo, sans-serif",
    backgroundColor: "white",
    border: "0.5px solid black",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  productLink: {
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  snackBar: {
    marginTop: "5%",
    width: "100%",
  },

  productLink: {
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  prodDiscount: {
    // marginLeft: "14px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff905a",
  },

  hideSize: {
    display: "none",
  },

  priceSection: {
    textAlign: 'right'
  }

}));

function Products(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    wishList: false,
  });
  const { vertical, horizontal, open } = state;
  const [showSize, setShowSize] = useState({ id: "", hide: true });


  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      props.authProdListing(localStorage.getItem("user_token"));
    } else {
      props.productsListingData();
    }
  }, []);

  // Send to WishList
  const sendWishList = (event, instanceID, newState) => {
    event.preventDefault();
    if (localStorage.getItem("user_token")) {
      let postID = {
        id: instanceID,
      };
      props.postWishListID(localStorage.getItem("user_token"), postID);
      setState({ open: true, wishList: true, ...newState });
    } else {
      props.history.push("/customer/login");
    }
  };

  // Send to cart
  const addToCart = (event, items, newState) => {
    event.preventDefault();
    // if (localStorage.getItem("user_token")) {
    //   props.postToCart(localStorage.getItem("user_token"), items);
    //   setState({ open: true, wishList: false, ...newState });
    // } else {
    //   props.history.push("/customer/login");
    // }
    setState({ open: true, wishList: false, ...newState });


    if (localStorage.getItem("user_token")) {
      const data = { product_instance_id: items, quantity: 1 };
      props.postToCart(localStorage.getItem("user_token"), data);
      setTimeout(() => {
        props.authProdListing(localStorage.getItem("user_token"));
      }, 100);
    } else {
      localStorageItem(items);
    }
  };

  // Show sizes for add to bag
  const showAddToCartSize = (event, id) => {
    event.preventDefault();
    if (showSize.hide) {
      setShowSize({ ...showSize, id: id, hide: false });
    } else {
      setShowSize({ ...showSize, id: "", hide: true });
    }
  };

  const regex = /\s/g;

  return (
    <>
      {props.lisitingProduct && props.lisitingProduct.length ? (
        props.lisitingProduct.map((item) => {
          return (
            <Link
              to={{
                // pathname: "/product/" + item.id,

                pathname: `/product/${item.product_name.toString().replace(regex, "-")}/${item.id}/`,
                state: {
                  category: item.category_id,
                },
              }}
              className={classes.productLink}
              target="_blank"
            >
              <div key={item.id} className={classes.container}>
                {props.lisitingProduct ? (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    width="240"
                    height="360"
                    style={{ paddingTop: "15%" }}
                  />
                ) : (
                    <Skeleton variant="rect" width={210} height={118} />
                  )}
                {item.product_stock === 0 ? (
                  <div
                    style={{
                      position: "relative",
                      width: "240px",
                      marginTop: "-25%",
                    }}
                  >
                    <div style={{ backgroundColor: "#A9A9A9" }}>
                      <div
                        style={{
                          padding: "10%",
                          color: "black",
                          textTransform: "capitalize",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="contained">
                          إنتهى من المخزن

                        </Typography>
                      </div>
                    </div>
                  </div>
                ) : (
                    <div className={classes.hoveredButtons}>
                      <div style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                        {showSize ? (
                          <>
                            <div
                              className={
                                showSize.id === item.id
                                  ? classes.prodSizeTitle
                                  : classes.hideSize
                              }
                            >
                              {" "}
                              أختر الحجم
                          </div>
                            <div
                              className={
                                showSize.id === item.id
                                  ? classes.sizeAvail
                                  : classes.hideSize
                              }
                            >
                              {item.size_available.map((item) => {
                                if (item.available_stock !== 0) {
                                  return (
                                    <span
                                      className={classes.sizeOptions}
                                      onClick={(event) =>
                                        addToCart(
                                          event,
                                          item.product_instance_id
                                        )
                                      }
                                    >
                                      {item.translated_size_value}{" "}
                                    </span>
                                  );
                                }


                              })}
                            </div>
                          </>
                        ) : (
                            ""
                          )}
                        <div className={classes.hoverbtn}>
                          {localStorage.getItem('user_token') ?
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
                                قائمة الرغبات
                              </Button>
                            </Link>
                          }

                          <Button
                            className={classes.addtobagBtn}
                            variant="contained"
                            onClick={(event) => showAddToCartSize(event, item.id)}
                            disabled={_.some(item.size_available, { in_cart: "True" }) ? true : false}
                          >

                            {_.some(item.size_available, { in_cart: "True" }) ? 'في حقيبة' : 'أضف الى الحقيبة'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                <div style={{ marginTop: "5%", textAlign: "justify", textAlignLast: 'right' }}>
                  <Typography className={classes.prodName}>
                    {item.translated_product_name}
                  </Typography>
                  <p className={classes.prodDesc}>{item.translated_product_description}</p>
                </div>

                <div className={classes.priceSection}>
                  <span className={classes.prodDiscount}>
                    ({Discount(item.mrp_price, item.selling_price)} {" "} OFF)
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
          );
        })
      ) : (
          <div className={classes.container} style={{ display: "flex" }}>
            <div>
              <Skeleton
                animation="false"
                variant="rect"
                width={240}
                height={360}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                NovelLady
            </Skeleton>
              <Skeleton
                animation="false"
                variant="text"
                width={240}
                height={50}
              />
            </div>
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
              <Skeleton
                animation="false"
                variant="rect"
                width={240}
                height={360}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                NovelLady
            </Skeleton>
              <Skeleton
                animation="false"
                variant="text"
                width={240}
                height={50}
              />
            </div>
            <div style={{ paddingLeft: "20%" }}>
              <Skeleton
                animation="false"
                variant="rect"
                width={240}
                height={360}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                NovelLady
            </Skeleton>
              <Skeleton
                animation="false"
                variant="text"
                width={240}
                height={50}
              />
            </div>
          </div>
        )}

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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    lisitingProduct: state.lisitingProduct.data,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsListingData: () => dispatch(productsListingData()),
    postWishListID: (token, id) => dispatch(postWishListID(token, id)),
    postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),
    authProdListing: (token) => dispatch( authProdListing(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
