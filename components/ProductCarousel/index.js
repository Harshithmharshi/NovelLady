import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Snackbar, Button } from "@material-ui/core";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { carouselTag } from "../../actions/tagsAction";
import { productsData, authProdList, } from "../../actions/productsAction";
import { Discount } from "../../constants/Discount";
import { postWishListID } from "../../actions/wishlistAction";
import _ from "lodash";
import withWidth from "@material-ui/core/withWidth";
import { compose } from "redux";
import { postDataToApi, postDataToApiWithToken } from "../../actions/add_to_cart.action";
import { localStorageItem } from '../../constants/localStorageItem';
import { Helmet } from "react-helmet";

import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1320px",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    }
  },

  arrivalTitle: {
    fontWeight: "700",
    fontSize: "2rem",
    color: "#212121",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "80px",
    marginBottom: "20px",
    fontFamily: "Roboto, sans-serif",

  },

  carousel: {
    position: "relative",
    marginRight: "80px",
    paddingBottom: "50px",
    // [theme.breakpoints.up("xl")]: {
    //   width: "160%",
    // },
    // [theme.breakpoints.down("lg")]: {
    //   width: "90%"
    // },

    // [theme.breakpoints.down("lg")]: {
    //   marginLeft: "10%",

    // },



  },

  rightArrow: {
    position: "absolute",
    // marginLeft: "1200%",
    float: 'right',
    textAlign: 'right',
    bottom: "50%",
    fontSize: "100px",
    color: "#180022",
    [theme.breakpoints.down("lg")]: {
      marginRight: "10%",

    },
  },


  viewAll: {
    whiteSpace: "nowrap",
    position: "absolute",
    marginTop: "5%",
    marginLeft: "50%",
    color: "#C82257",
    fontSize: "15px",
    fontWeight: "700",
    textDecoration: "none",
    "&:hover": {
      color: "#C82257",
      textDecoration: "none",
      cursor: "pointer",
    },
    [theme.breakpoints.down("lg")]: {
      marginRight: "10%",

    },
  },

  container: {
    paddingBottom: "8%",
    position: "relative",
    textAlign: "justify",

  },

  prodName: {
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    overflow: "hidden",
    textTransform: "capitalize",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "250px",
    fontFamily: "Roboto, sans-serif",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: " #C82257",
      textDecoration: "none",
    },
  },

  prodDesc: {
    marginTop: "1px",
    fontWeight: "400",
    fontSize: "13px",
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
    fontSize: "14px",
    marginLeft: "14px",
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodDiscount: {
    marginLeft: "14px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff905a",
    whiteSpace: "normal",
    width: "180px",
  },

  hoveredButtons: {
    position: "absolute",
    paddingTop: "100%",
    bottom: "24.5%",
    width: "100%",
    transition: ".4s ease",
    opacity: 0,
    textDecoration: "none",
    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  hoverbtn: {
    display: "flex",
    paddingTop: "18px",
    paddingBottom: "12px",
    justifyContent: "space-evenly",
    width: '240px'
  },

  sizeAvail: {
    display: "flex",
    padding: "10px 10px 20px 20px",
  },

  prodSizeTitle: {
    paddingTop: "4%",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "2%",
    fontFamily: "Roboto, sans-serif",
    paddingBottom: '5px',
    color: "#707070",
    // textAlign: "center",
    // width: "85%",
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
      textDecoration: 'none'
    },
  },

  addtobagBtn: {
    // marginLeft: "5px",
    padding: "7px 10px",
    fontSize: "13px",
    fontWeight: "normal",
    backgroundColor: "#C82257",
    color: "white",
    outline: "none",
    textDecoration: 'none',
    "&:hover": {
      backgroundColor: "#C82257",
      textDecoration: 'none'
    },
  },

  wishlistBtn: {
    // marginLeft: "10px",
    padding: "7px 10px",
    fontSize: "13px",
    fontWeight: "normal",
    backgroundColor: "white",
    border: "0.5px solid black",
    outline: "none",
    "&:hover": {
      backgroundColor: "white",
      textDecoration: "none"
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

  hideSize: {
    display: 'none'
  }


}));

function ProductCarousel(props) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 20;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    wishList: false,
  });
  const [showSize, setShowSize] = useState({ id: '', hide: true });
  const { vertical, horizontal, open } = state;
  const [open_product, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [disabled, setDisabled] = useState({ id: '', hide: true });


  useEffect(() => {
    props.carouselTagDispatch();
    if (localStorage.getItem("user_token")) {
      props.authProdList(localStorage.getItem("user_token"));
    } else {
      props.productDispatch();
    }
  }, []);


  //Send to WishList
  const sendWishList = (event, instanceID, newState) => {
    event.preventDefault();
    let postID = {
      id: instanceID,
    };
    props.postWishListID(localStorage.getItem("user_token"), postID);
    props.authProdList(localStorage.getItem("user_token"));
    setState({ open: true, wishList: true, ...newState });
  };


  // Show size for add to bag
  const showAddToCartSize = (event, id) => {
    event.preventDefault();
    setOpen((prevOpen) => !prevOpen);
    if (showSize.hide) {
      setShowSize({ ...showSize, id: id, hide: false });
    }
    else {
      setShowSize({ ...showSize, id: '', hide: true });
    }


  };


  //Send to cart
  const addToCart = (event, productID, items, newState) => {
    event.preventDefault();
    setState({ open: true, wishList: false, ...newState });
    if (localStorage.getItem("user_token")) {
      const data = { product_instance_id: items, quantity: 1 };
      props.postToCart(localStorage.getItem("user_token"), data);
      props.authProdList(localStorage.getItem("user_token"));
    } else {

      localStorageItem(items);

      if (disabled.hide) {
        setDisabled({ ...disabled, id: productID, hide: false });
      }
      else {
        setDisabled({ ...disabled, id: '', hide: true });
      }

    }

  };

  const checkPath = (data) => {
    const id = _.map(data || [], item => {
      return _.map(item, obj => obj.id)
    })
    return id;
  }

  const checkURLName = (data, tag_id) => {
    const name = _.map(data || [], item => {
      return _.map(item, obj => obj.name)
    })
    return `/shop/${name}?tag_id=${tag_id}`;
  }

  const checkBreadcrumb = (data) => {
    const name = _.map(data || [], item => {
      return _.map(item, obj => obj.name)
    })
    return name[0]
  }

  const regex = /\s/g;



  return (
    <div className={classes.root}>
    <Helmet>
        <title>Online Shopping exclusive for Women - Novellady</title>
        <meta name="keywords"
          content="online shopping, online shopping sites, women apparels, women clothing, online shopping site" />
        <meta name="description" content="Online shopping exclusive for Women. Best online fashion store." />
      </Helmet>
      
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.arrivalTitle}>
            {props.carousel_tag ? props.carousel_tag.name : "New Arrivals"}
          </Typography>
          <br />
        </Grid>
      </Grid>

      <Grid container wrap="nowrap" >
        <Grid item xs={12} style={{ maxWidth: '1320px' }}>
          <div className={classes.carousel}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={
                props.width === "lg" || props.width === 'xl' ? 4 : props.width === "md" ? 3 : 2
              }
              chevronWidth={chevronWidth}
              infiniteLoop={true}
              alwaysShowChevrons={true}
              slidesToScroll={1}
              outsideChevron={true}
              rightChevron={
                <div>
                  <KeyboardArrowRightIcon className={classes.rightArrow} />
                  {props.carousel_tag ?
                    <Link to={{
                      pathname: checkURLName(props.carousel_tag.data, checkPath(props.carousel_tag.data)).replace(regex, ''),
                    }}
                    onClick={() => {
                      setTimeout(() => {
                        window.location.reload()
                      }, 10);
                    }}
                    >
                      <span className={classes.viewAll}>View All</span>
                    </Link>
                    : ''}
                </div>
              }
            >




              {props.products && props.products.length ? (
                props.products.map((item) => {
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
                        {item.product_image ?
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            width="240"
                            height="360"
                          />
                          :
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

                        }

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
                                  Out of stock
                                </Typography>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div className={classes.hoveredButtons}>
                              <div
                                style={{
                                  backgroundColor: "rgba(255,255,255,0.9)",
                                }}
                              >
                                <div className={showSize.id === item.id && open_product ? classes.prodSizeTitle : classes.hideSize}>
                                  Select size
                                  </div>
                                <div className={showSize.id === item.id && open_product ? classes.sizeAvail : classes.hideSize}>
                                  {item.size_available.map((sizes) => {
                                    if (item.available_stock !== 0) {
                                      return (
                                        <span
                                          className={classes.sizeOptions}
                                          onClick={(event) =>
                                            addToCart(
                                              event,
                                              item.id,
                                              sizes.product_instance_id
                                            )
                                          }
                                        >
                                          {sizes.size_value}{" "}
                                        </span>
                                      );
                                    }
                                  }
                                  )}


                                  {/* {item.size_available.map((item) => {
                                    if (localStorage.getItem('user_token')) {
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
                                            {item.size_value}{" "}
                                          </span>
                                        );
                                      }
                                    }
                                    else {
                                      return (
                                        <Link
                                          to={{
                                            pathname: '/customer/login',
                                            state: {
                                              referrer: '/cart',
                                            }
                                          }}
                                          key={item.id}
                                          className={classes.sizeOptions}
                                        >
                                          {item.size_value}{" "}
                                        </Link>
                                      )
                                    }
                                  })} */}
                                </div>


                                <div className={classes.hoverbtn}>
                                  <Button
                                    className={classes.addtobagBtn}
                                    variant="contained"
                                    onClick={(event) =>
                                      showAddToCartSize(event, item.id)
                                    }
                                    disabled={  _.some(item.size_available, { in_cart: "True" }) ? true : false}

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
                                </div>
                              </div>
                            </div>
                          )}
                        <div style={{ marginTop: "5%" }}>
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
                              ({Discount(item.mrp_price, item.selling_price)} {" "}
                              OFF)
                            </span>
                          </div>
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
                    <div style={{ paddingLeft: "30%" }}>
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
            </ItemsCarousel>
          </div>


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
            : (
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
            )}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    carousel_tag: state.tags.carouselTag,
    products: state.products.data,
    isLoading: state.products.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    carouselTagDispatch: () => dispatch(carouselTag()),
    productDispatch: (id) => dispatch(productsData(id)),
    postWishListID: (token, id) => dispatch(postWishListID(token, id)),
    postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),
    authProdList: (token) => dispatch(authProdList(token)),
    postDataToApiWithToken: (data) => dispatch(postDataToApiWithToken(data))
  };
};

export default withRouter(
  compose(
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
  )(ProductCarousel)
);
