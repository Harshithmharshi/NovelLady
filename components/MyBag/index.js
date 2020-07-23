import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IMAGE1 from "../../images/image-07.png";
import IMAGE2 from "../../images/image-09.png";
// import Navbar from "../Header/Navbar";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import { fetchUserProfileApi } from "../../actions/user_profile";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { push } from "connected-react-router";
import CircularProgress from '@material-ui/core/CircularProgress';


import "./mybag.scss";
import Main from "../Header";
import {
  fetchCartDataFromApi,
  removeItemsFromCart,
  fetchCartDataWithBagDetails,
  updateAfterRemoveCartItems,
  editItemsForCart,
  postDataToApiWithToken
} from "../../actions/add_to_cart.action";
import postCouponToServer from "../../actions/coupon.action";
import _ from "lodash";
import { Input } from "@material-ui/core";
// import { addToWishList } from "../../actions/wishlist.action";
import Footer from "../Footer";
import { postWishListID } from "../../actions/wishlistAction";

import { sendCartDetails } from "../../actions/send_cartDetails";

const useStyle = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,

  // },

  largerRoot: {
    maxWidth: "1320px",
    // margin: "auto",
    [theme.breakpoints.down("lg")]: {
      margin: "auto 20px",
    }
  },

  cart: {
    display: "flex",
    width: "100vw",
    // flexDirection:"column"
  },

  cartBreadcrumb: {
    marginTop: "50px",
    marginLeft: "10%",
    width: "100vw",
  },

  cartContainer: {
    marginTop: "130px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  leftContainer: {
    marginLeft: "-44.5%",
    justifyContent: "start",
    textAlign: "start",
  },

  rightContainer: {
    marginLeft: "15%",
    width: "52%",
    height: "620px",
    border: "1px solid grey",
    marginRight: 100,
    padding: 20,
    marginBottom: '20px',
    marginTop: '50px'
  },

  cartItemBox: {
    display: "flex",
    width: "120%",
    paddingBottom: "30px",
    marginBottom: "1rem",
    border: "1px solid grey",
  },

  cartItemBoxLeft: {
    width: "40%",
    paddingRight: 20,
    display: "flex",
  },

  cardItemBoxRight: {
    marginLeft: "1rem",
  },

  formControl: {
    // margin: theme.spacing(1),
    marginTop: "-1.3rem",
    minWidth: 40,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  rightContainerItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  emptyBagTitle: {
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "uppercase",
    paddingBottom: "30px",
    fontFamily:
      "Roboto,sans-serif",
    marginLeft: "38px",
  },

  backtoHome: {
    border: "1px solid #3466e8",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "400",
    padding: "14.5px 51px",
    color: "#3466e8",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    textTransform: "uppercase",
    marginLeft: "38px",
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
}));

function MyBag(props) {
  const classes = useStyle();
  const [coupon, setCoupon] = useState("");
  const [data, setData] = useState([]);
  const [checkCoupon, setCheckCoupon] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      props.getCartDispatch();
    } else {
      props.postDataToApiWithToken(JSON.parse(localStorage.getItem("Cart_Details")));
    }
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    setData(props.getCart.getCartData);

  },[props.getCart.getCartData]);


  const { mycart } = data || {};

  // for incrementing the quantity
  const inputChange = (id) => {
    let product_array = data;
    let req_obj = product_array.mycart.find((e) => e.id === id);
    if (
      req_obj.warhouse_stock > 0 &&
      req_obj.quantity < req_obj.warhouse_stock
    ) {
      req_obj.quantity = req_obj.quantity + 1;
      req_obj.applied_id = req_obj.main_warhouse_id;
      req_obj.applied_stock = "ware_house";
      req_obj.applied_delivery_charge = req_obj.main_warhouse_delivery_charge;
    } else {
      req_obj.quantity = req_obj.quantity + 1;
      req_obj.applied_id = req_obj.seller_id;
      req_obj.applied_stock = "seller";
      req_obj.applied_delivery_charge = req_obj.seller_delivery_charge;
    }
    let newProduct_array = product_array.mycart.map((e) =>
      e.id === req_obj.id ? req_obj : e
    );
    let total_bag = newProduct_array.map(
      (e) => e.product_selling_price * e.quantity
    );
    let total_tax = newProduct_array.map((e) => e.tax * e.quantity);

    var total_bag_final = _.sum(total_bag);
    var total_bag_tax = _.sum(total_tax);

    let Obj = { ...data };

    Obj.mycart = newProduct_array;
    // Obj.cart_grand_tot_amount = total_bag_final;
    // Obj.grand_total_tax = total_bag_tax;

    console.log("added_cart", req_obj.quantity);
    props.editCart(id, req_obj.quantity);
    props.getCartDispatchQty(Obj);
  };

  // for decrementing the quantity
  const inputSubChange = (id) => {
    let product_array = data;
    // console.log(product_array.mycart)
    let req_obj = product_array.mycart.find((e) => e.id === id);
    // console.log(req_obj, "hello");
    if (req_obj.quantity > 1) {
      req_obj.quantity = req_obj.quantity - 1;
    }

    let newProduct_array = product_array.mycart.map((e) =>
      e.id === req_obj.id ? req_obj : e
    );

    let total_bag = newProduct_array.map(
      (e) => e.product_selling_price * e.quantity
    );

    let total_tax = newProduct_array.map((e) => e.tax * e.quantity);

    var total_bag_final = _.sum(total_bag);
    var total_bag_tax = _.sum(total_tax);
    console.log("add_sum", total_bag_final);

    let Obj = { ...data };

    Obj.mycart = newProduct_array;
    // Obj.cart_grand_tot_amount = total_bag_final;
    // Obj.grand_total_tax = total_bag_tax;

    console.log("decrement_cart", req_obj.quantity);
    props.editCart(id, req_obj.quantity);
    props.getCartDispatchQty(Obj);
  };

  // for removing the item

  const removingItem = (id) => {

    if (!localStorage.getItem('user_token')) {
      const locItems = JSON.parse(localStorage.getItem("Cart_Details")).mycart.filter(item => {
        return item.product_instance_id !== id
      });
      if (locItems.length > 0) {
        const sendCart = { "mycart": Object.values(locItems) }
        localStorage.setItem("Cart_Details", JSON.stringify(sendCart));

      } else {
        localStorage.removeItem("Cart_Details")
      }
    }

    let array_filter = data.mycart.filter((item) => item.id !== id);
    let total_bag = array_filter.map(
      (item) => item.product_selling_price * item.quantity
    );
    let total_tax = array_filter.map((item) => item.tax * item.quantity);
    let obj = { ...data };
    obj.mycart = array_filter;
    obj.cart_grand_tot_amount = _.sum(total_bag);
    obj.grand_total_tax = _.sum(total_tax);
    props.updateCartData(obj);
    props.removeItemsFromCartDispatch(id);
    if (data.mycart.length == 0) {
      window.location.reload();
    }
    // window.location.reload()
  };


  // for checking the price
  const checkPrice = () => {
    if (typeof mycart !== "undefined") {
      const price = mycart
        .map((item) => item.quantity * item.product_selling_price)
        .reduce((a = 0, b = 0) => a + b, 0);
      const discount = mycart.map((item) => item.discount);
      return Number(price);
    }
  };

  // for checking the discount
  const checkDiscount = () => {
    if (typeof props.getCoupon.data !== "undefined") {
      console.log(props.getCoupon.data.amount);
      return props.getCoupon.data.amount;
    }
    return 0;
  };

  // for checking the tax
  const checkTax = () => {
    // console.log(mycart)
    if (typeof mycart !== "undefined") {
        const tax = mycart
        .map((item) => item.tax * item.quantity)
        .reduce((a = 0, b = 0) => a + b, 0);
      return Number(tax);
    }
  };

  
  // for checking the delivery charges
  const checkDeliveryCharges = () => {
    if (typeof mycart !== "undefined") {

      const DeliveryCharges = _.map(mycart,(item)=>{ 
       if (typeof item.main_warhouse_delivery_charge !=="undefined" || typeof item.main_warhouse_delivery_charge !=="object"){
       return (item.seller_delivery_charge * item.quantity)
       }  else{
      return  (item.main_warhouse_delivery_charge * item.quantity)
       }
      }).reduce((a , b ) => a + b, 0);

      return Number(DeliveryCharges);
    }
  };






  // for checking size and color
  const checkSizeAndColor = (value, product_instance, attribute_instance) => {
    if (typeof mycart !== "undefined") {
      if (product_instance === attribute_instance) {
        return value;
      }
    }
  };

  // for adding the item to the wishlist
  const addToWishLists = (id, instanceID) => {
    let array_filter = data.mycart.filter((item) => item.id !== id);
    let total_bag = array_filter.map(
      (item) => item.product_selling_price * item.quantity
    );
    let total_tax = array_filter.map((item) => item.tax * item.quantity);
    let obj = { ...data };
    obj.mycart = array_filter;
    obj.cart_grand_tot_amount = _.sum(total_bag);
    obj.grand_total_tax = _.sum(total_tax);
    console.log("updated cart", obj);
    props.updateCartData(obj);
    // props.moveToWishlist(id);
    props.removeItemsFromCartDispatch(id);

    let postID = {
      id: instanceID,
    };
    props.postWishListID(localStorage.getItem("user_token"), postID);
  };

  // calculating order total of the cart
  const orderTotal = () => checkPrice() - checkDiscount();


  // calcultaing the coupon value
  const applyCoupon = () => {
    console.log(coupon.trim().toUpperCase());
    props.applyCoupon(coupon.trim().toUpperCase());
    setCheckCoupon(true);
    checkDiscount();
  };

  // console.log(props.location, props.location.pathname == '/cart')
  // items needs to be send via location state
  const sendWithItemInformation = () => {
    let prod_data = data || {};
    const { mycart } = prod_data;

    for (let i in mycart) {
      // console.log(mycart[i].warhouse_stock, mycart[i].quantity)
      if (mycart[i].warhouse_stock > mycart[i].quantity) {
        mycart[i].applied_delivery_charge =
          mycart[i].main_warhouse_delivery_charge;
        mycart[i].applied_stock = "ware_house";
        mycart[i].applied_id = mycart[i].main_warhouse_id;
      } else {
        mycart[i].applied_delivery_charge = mycart[i].seller_delivery_charge;
        mycart[i].applied_stock = "seller";
        mycart[i].applied_id = mycart[i].seller_id;
      }
    }
    return prod_data.mycart;
  };

  

  // for placing the order

  const placeOrder = () => {
    // console.log(mycart);
    if (typeof mycart !== "undefined") {
      const order = {};
      order.mycart = sendWithItemInformation();
      order.cart_total_gross_amount = checkPrice();
      order.cart_total_net_amount =
        orderTotal() + checkDeliveryCharges() + checkTax();
      order.tax = checkTax();
      // order.cart_total = orderTotal() + checkTax();
      order.cart_total = Number(orderTotal()).toFixed(2);
      order.coupon_code = coupon.toUpperCase();
      order.coupon_amount = checkDiscount();
      order.total_delivery_charge = checkDeliveryCharges();
      order.commission = mycart["0"].commission
      // setCoupon('');
      return order;
    }
  };

  const sendcartDetail = () => {
    // props.sendCartDetails(placeOrder());
    localStorage.setItem("CartDetails", JSON.stringify(placeOrder()));
  }


  return (
    <>
      <div lassName={classes.root}>
        <Main />

      </div>

      <div className={classes.largerRoot}>

        {props.getCart.isLoadingFetchCartStart ?
          <div style={{ marginLeft: '2%', padding: '150px', paddingBottom: '150px' }}>
            <CircularProgress color="secondary" />
          </div>
          :
          <>
            <div className={`${classes.cart}`}>

              {`${_.map(mycart || []).length}` > 0 ? (
                <div
                  className={`${classes.cartBreadcrumb} cartBreadcrumb`}
                // style={{
                //   marginTop: `${_.map(mycart || []).length}` === 0 ? "10%" : "5%",
                // }}
                >
                  <h5>
                    <strong>
                      <span
                        style={{
                          color: props.location.pathname == "/cart" ? "#c82557" : "",
                        }}
                      >
                        BAG
                </span>{" "}
                      <span style={{ color: "#c82557" }}>-----</span> ADDRESS{" "}
                      <span style={{ color: "#c82557" }}>-----</span> PAYMENT
              </strong>{" "}
                  </h5>
                </div>
              ) : (
                  ""
                )}

              {`${_.map(mycart || []).length}` > 0 ? (
                <div className={`${classes.cartContainer} cartContainer`}>
                  <div className={`${classes.leftContainer} leftContainer`}>
                    <h5
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2%",
                      }}
                      className={"cart-length"}
                    >
                      <strong>
                        My Shopping Bag ({_.map(mycart || []).length}{" "}
                        {`${_.map(mycart || []).length}` <= 1 ? "item" : "items"})
                </strong>

                      <span style={{ marginRight: "1rem", fontWeight: "bold" }}>
                        SAR {checkPrice()}
                      </span>
                    </h5>

                    {mycart || [].length > 0
                      ? _.map(mycart || [], (item) => {
                        return (
                          <div
                            className={`${classes.cartItemBox} cartItemBox`}
                            key={item.id}
                          >
                            <div
                              className={`${classes.cartItemBoxLeft} cartItemBoxLeft`}
                            >
                              <img
                                // key={i}
                                className={"image-style"}
                                src={item.images}
                                style={{ height: "200px", width: "8rem" }}
                              />
                            </div>
                            <div
                              className={`${classes.cartItemBoxRight} cartItemBoxRight`}
                            >
                              <p
                                className={"product-name para"}
                                style={{
                                  marginLeft: "-1rem",
                                  marginTop: "1rem",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>{item.product_name}</span>
                                <span
                                  style={{
                                    textAlign: "right",
                                    marginLeft: "1rem",
                                    paddingRight: "1rem",
                                  }}
                                >
                                  {item.product_selling_price * item.quantity}
                                </span>
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                                className={"size-color"}
                              >
                                <span
                                  style={{
                                    marginLeft: "-1rem",
                                    paddingRight: "1rem",
                                  }}
                                  className={"size-color"}
                                >
                                  Size{" "}
                                  <span style={{ marginLeft: "1rem" }}>
                                    {item.available_size
                                      .filter(
                                        (items, i) =>
                                          items.size_value ===
                                          checkSizeAndColor(
                                            items.size_value,
                                            item.product_instance_id,
                                            items.product_instance_id
                                          )
                                      )
                                      .map((item) => item.size_value)}
                                  </span>
                                </span>

                                <span
                                  style={{
                                    marginLeft: "4rem",
                                    paddingRight: ".8rem",
                                    textTransform: "capitalize",
                                  }}
                                  className={"size-color"}
                                >
                                  Colour{" "}
                                  <span style={{ textTransform: "capitalize" }}>
                                    {item.available_color
                                      .filter(
                                        (items) =>
                                          items.color_value ===
                                          checkSizeAndColor(
                                            items.color_value,
                                            item.product_instance_id,
                                            items.product_instance_id
                                          )
                                      )
                                      .map((item) => item.color_value)}
                                  </span>
                                </span>
                              </div>
                              <br />
                              <br />
                              <span
                                style={{ marginLeft: "-1rem" }}
                                className={"quantity"}
                              >
                                Qty
                          </span>
                              <span
                                style={{ paddingLeft: "2rem", cursor: "pointer" }}
                                onClick={() => inputSubChange(item.id)}
                              >
                                {`${item.quantity}` == 1 ? "" : "-"}
                              </span>
                              <span style={{ paddingLeft: "2rem" }}>
                                {item.quantity}
                              </span>
                              <span
                                style={{ cursor: "pointer", paddingLeft: "2rem" }}
                                onClick={() => inputChange(item.id)}
                              >
                                +
                          </span>
                              <br /> <br />
                              <div>
                                <Button
                                  style={{ marginLeft: "-1.5rem" }}
                                  onClick={() => {
                                    removingItem(item.id)

                                  }}
                                  className="cart-button"
                                >
                                  <DeleteIcon className="svg-icon" /> REMOVE
                            </Button>


                                {localStorage.getItem("user_token") ?
                                  <Button
                                    style={{ marginLeft: "2rem" }}
                                    className="cart-button-wishlist"
                                    onClick={() =>
                                      addToWishLists(
                                        item.id,
                                        item.product_instance_id
                                      )
                                    }
                                  >
                                    <FavoriteIcon className="svg-icon" /> MOVE TO
                              WISHLIST
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
                                      style={{ marginLeft: "2rem" }}
                                      className="cart-button-wishlist"
                                    >
                                      MOVE TO
                                      WISHLIST
                                         </Button>
                                  </Link>

                                }

                              </div>
                            </div>
                          </div>
                        );
                      })
                      : ""}
                  </div>

                  {/* Price Details  */}

                  <div className={`${classes.rightContainer} rightContainer`}>
                    <div style={{ margin: 1 }}>
                      <p
                        className="para"
                        style={{ fontSize: "1.3rem", textAlign: "left" }}
                      >
                        Price Details
                </p>
                      <div className={classes.rightContainerItem}>
                        <p className="para">Bag Total</p>
                        <p className="para">SAR {checkPrice().toFixed(2)}</p>
                      </div>
                      <div className={classes.rightContainerItem}>
                        <p className="para">Discount</p>
                        <p className="para">
                          SAR {checkCoupon ? checkDiscount().toFixed(2) : 0}
                        </p>
                      </div>
                      <div className={classes.rightContainerItem}>
                        <p className="para">Tax</p>
                        <p className="para">SAR {Number(checkTax()).toFixed(2)}</p>
                      </div>
                      <div className={classes.rightContainerItem}>
                        <p className="para">Order Total</p>
                        <p className="para">SAR {(orderTotal() + checkTax()).toFixed(2)}</p>
                      </div>
                      <div className={classes.rightContainerItem}>
                        <p className="para">Delivery Charges</p>
                        <p className="para">{typeof(checkDeliveryCharges())!=="undefined" ? Number(checkDeliveryCharges()).toFixed(2) : 0 }</p>
                      </div>
                      <hr />
                      <div className={classes.rightContainerItem}>
                        <p style={{ fontWeight: "bold" }} className="para">
                          Total
                  </p>
                        <p style={{ fontWeight: "bold" }} className="para">
                          SAR {Number(orderTotal() + checkDeliveryCharges() + checkTax()).toFixed(2)}
                        </p>
                      </div>

                      <div className={classes.rightContainerItem}>
                        <Input
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="APPLY A COUPON"
                          className={"cart-coupon-input"}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          className="cart-apply-coupon"
                          onClick={() => applyCoupon()}
                          style={{ backgroundColor: "#C82257" }}
                        >
                          Apply Coupon
                  </Button>
                      </div>
                      <br />

                      <Link
                        to={{
                          pathname: "/shipping",
                          state: {
                            referrer: placeOrder(),
                            pathname: '/shipping'
                          },
                        }}
                        className="place-order-link"
                      >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#C82257" }}
                          size="large"
                          fullWidth
                          className="cart-place-order"
                          onClick={sendcartDetail}

                        >
                          Place Order
                  </Button>
                      </Link>

                    </div>
                  </div>
                </div>
              ) : (
                  <div
                    style={{

                      textAlign: "center",
                      height: "55vh",
                      marginTop: "8%",
                      marginLeft: "38%",
                    }}
                  >
                    <div style={{ marginTop: "2%" }}>
                      <div className={classes.emptyBagTitle}>your bag is empty</div>
                      <Link to="/" className={classes.backtoHome}>
                        start shopping
              </Link>
                      {/* <Link to="/shop/all" className="place-order-link-shopping">START SHOPPING</Link> */}
                    </div>
                  </div>
                )}
            </div>
          </>
        }
      </div>



      <div>
        <Footer />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  profile: state.userProfile,
  getCart: state.getCart,
  getCoupon: state.coupon,
});

const mapDispatchToProps = (dispatch) => ({
  profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
  getCartDispatch: () => dispatch(fetchCartDataFromApi()),
  removeItemsFromCartDispatch: (id) => dispatch(removeItemsFromCart(id)),
  getCartDispatchQty: (data) => dispatch(fetchCartDataWithBagDetails(data)),
  updateCartData: (data) => dispatch(updateAfterRemoveCartItems(data)),
  editCart: (id, quantity) => dispatch(editItemsForCart(id, quantity)),
  applyCoupon: (coupon) => dispatch(postCouponToServer(coupon)),
  postWishListID: (token, id) => dispatch(postWishListID(token, id)),
  postDataToApiWithToken: (data) => dispatch(postDataToApiWithToken(data)),
  sendCartDetails: (data) => dispatch(sendCartDetails(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBag));
