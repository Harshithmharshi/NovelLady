import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
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

import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1320px",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    },
    // direction: "rtl"
  },

  arrivalTitle: {
    fontWeight: "700",
    fontSize: "2rem",
    color: "#212121",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "80px",
    marginBottom: "20px",
    fontFamily: "Cairo, sans-serif",

  },

  carousel: {
    position: "relative",
    marginLeft: "80px",
    paddingBottom: "50px",
    // [theme.breakpoints.up("xs")]: {
    //   width: "82%",
    // },
    // direction: "rtl"
  },

  // leftArrow: {
  //   position: "absolute",
  //   bottom: "55%",
  //   fontSize: "100px",
  //   color: "#180022",
  //   direction: "rtl"
  // },

  leftArrow: {
    position: "absolute",
    // marginLeft: "1200%",
    float: 'left',
    textAlign: 'right',
    bottom: "50%",
    fontSize: "100px",
    color: "#180022",
    [theme.breakpoints.down("lg")]: {
      marginRight: "10%",

    },
    direction: "rtl"
  },

  viewAll: {
    whiteSpace: "nowrap",
    position: "absolute",
    // marginTop: "3%",
    marginLeft: "8%",
    color: "#C82257",
    fontSize: "15px",
    fontWeight: "700",
    textDecoration: "none",
    "&:hover": {
      color: "#C82257",
      textDecoration: "none",
      cursor: "pointer",
    },
  },

  container: {
    paddingBottom: "8%",
    position: "relative",
    textAlign: "justify",
    // float: 'right'
    // textAlignLast:'right'
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
    fontFamily: "Cairo, sans-serif",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: " #C82257",
      textDecoration: "none",
    },
  },

  prodDesc: {
    marginLeft: '48px',
    marginTop: "1px",
    fontWeight: "400",
    fontSize: "13px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "black",
    width: "200px",
    fontFamily: "Cairo, sans-serif",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },


  priceSection: {
    marginLeft: '48px',
  },

  prodsellingPrice: {
    // marginRight: "18px",
    fontSize: "14px",
    fontWeight: "700",
    color: "black",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodmrpPrice: {
    // marginRight: "8px",
    paddingRight: '8px',
    fontSize: "14px",
    marginLeft: "14px",
    color: "grey",
    "&:hover": {
      textDecoration: "none",
    },
  },

  prodDiscount: {
    // marginRight: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ff905a",
    whiteSpace: "normal",
    width: "180px",
  },

  hoveredButtons: {
    position: "absolute",
    paddingTop: "100%",
    bottom: "23%",
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
    paddingBottom: "18px",
    justifyContent: 'space-around',
    width: '240px'
  },

  sizeAvail: {
    display: "flex",
    padding: "10px 10px 20px 20px",
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
    float: 'right',
    textAlign: 'right',
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
    whiteSpace: 'nowrap',
    // marginLeft: "7%",
    padding: "5px 8px",
    fontSize: "12px",
    fontWeight: "normal",
    backgroundColor: "#C82257",
    fontFamily: "Cairo, sans-serif",
    color: "white",
    outline: "none",
    textDecoration: 'none',
    "&:hover": {
      backgroundColor: "#C82257",
      textDecoration: 'none'
    },
  },

  wishlistBtn: {
    whiteSpace: 'nowrap',

    padding: "5px 8px",
    // marginLeft: "5%",
    fontSize: "12px",
    fontWeight: "normal",
    backgroundColor: "white",
    fontFamily: "Cairo, sans-serif",
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
    fontFamily: "Cairo, sans-serif",
  },

  hideSize: {
    display: 'none'
  },




}));

function ProductCarousel(props) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 400;
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
    // setTimeout(() => {
    props.authProdList(localStorage.getItem("user_token"));
    // }, 100)
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
  const addToCart = (event, items, newState) => {
    event.preventDefault();
    setState({ open: true, wishList: false, ...newState });


    if (localStorage.getItem("user_token")) {
      const data = { product_instance_id: items, quantity: 1 };
      props.postToCart(localStorage.getItem("user_token"), data);
      // setTimeout(() => {
      props.authProdList(localStorage.getItem("user_token"));
      // }, 100);
    } else {
      localStorageItem(items);
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
  };

  const transName = (data) => {
    const name = _.map(data || [], item => {
      return _.map(item, obj => obj.translated_name)
    });
    return name[0];
  };

  const regex = /\s/g;


  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap">
        <Grid item xs={12} >
          <Typography className={classes.arrivalTitle}>
            {props.carousel_tag ? props.carousel_tag.translated_name : "New Arrivals"}
          </Typography>
          <br />

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
              leftChevron={
                <div>
                  <KeyboardArrowLeftIcon className={classes.leftArrow} />
                  {props.carousel_tag ?
                    <Link to={{
                      pathname: checkURLName(props.carousel_tag.data, checkPath(props.carousel_tag.data)).replace(regex, ''),
                      state: {
                        translated_shop: 'متجر',
                        translated_name: transName(props.carousel_tag.data)
                      }
                    }}
                      onClick={() => {
                        setTimeout(() => {
                          window.location.reload()
                        }, 10);
                      }}
                    >
                      <span className={classes.viewAll}>عرض الكل</span>
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
                            <div style={{ marginTop: '5%', backgroundColor: "#A9A9A9" }}>
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
                              <div
                                style={{
                                  backgroundColor: "rgba(255,255,255,0.9)",
                                }}
                              >
                                <div className={showSize.id === item.id && open_product ? classes.prodSizeTitle : classes.hideSize}>
                                  أختر الحجم
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
                                              sizes.product_instance_id
                                            )
                                          }
                                        >
                                          {sizes.translated_size_value}{" "}
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
                                    onClick={(event) =>
                                      showAddToCartSize(event, item.id)
                                    }
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
                          <p className={classes.prodDesc}>
                            {item.translated_product_description}
                          </p>
                        </div>

                        <div className={classes.priceSection}>
                          <span className={classes.prodDiscount}>
                            ({Discount(item.mrp_price, item.selling_price)} {" "}
                              OFF)
                            </span>
                          <span className={classes.prodmrpPrice}>
                            <strike>SAR {item.mrp_price}</strike> {" "}
                          </span>

                          <span className={classes.prodsellingPrice}>
                            SAR {item.selling_price} {" "}
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
              message="أضيف لقائمة الأماني"
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
                  تمت الإضافة إلى الحقيبة                </Alert>
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
    isCarouselLoaded: state.tags.iscarouselTagLoad,
    products: state.products.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    carouselTagDispatch: () => dispatch(carouselTag()),
    productDispatch: () => dispatch(productsData()),
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
