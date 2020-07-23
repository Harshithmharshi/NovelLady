import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

//  import data from './hotCollectionReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import data from "./bannerReducer";
import categoryListReducer from "./caegoryListReducer";
import homeOfferReducer from "./home_offer";
import logInReducer from "./login_auth";
import registerReducer from "./registerReducer";
import userProfileReducer from "./user_profile";
import activePageReducer from "./active_page";
import auth from "./auth";
import addressReducer, { getAddress, putAddress,deleteAddress } from "./address";
import bannerReducer from "./bannerReducer";
import tagsReducer from "./tagsReducer";
import bigdealsReducer from "./bigdealsReducer";
import productsReducer, { shopProductReducer,productsListingReducer } from "./productsReducer";
import ProductDetailReducer from "./productsDetailReducer";
import { attributeReducer } from "./attribute.reducer";
import myOrdersReducer from "./myOrders.reducer";
import addToCartReducerPost, { getCartReducer, removeItemReducer, editItemReducer } from "./add_to_cart.reducers";
// import { wishListReducer } from "./wishlist.reducer";
import placeOrderReducer from './placeOrder.reducer';
import  searchReducer  from "./searchReducer";


import productSimilarItemReducer from './productSimilarItemReducer';
import wishlistReducer from "./wishlistReducer";
import reviewReducer,{getReviewDetails,getCustomerReviewDetails,getEditReviewDetails} from "./reviewReducer";
import couponReducer from "./coupon.reducer";
import orderDetailsReducer from "./orderDetails.reducer";
import trackingorderReducer from "./trackingorderReducer";
import sendCartDetails from "./sendCartDetails"

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ['editCart']
// }


const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  data: data,
  bigdeals: bigdealsReducer,
  banner: bannerReducer,
  products: productsReducer,
  tags: tagsReducer,
  bigdeals: bigdealsReducer,
  productdetail: ProductDetailReducer,
  productsimilaritem: productSimilarItemReducer,
  addreview:reviewReducer,
  wishlist: wishlistReducer,
  categoryData: categoryListReducer,
  homeOffer: homeOfferReducer,
  logIn: logInReducer,
  registerData:registerReducer,
  userProfile: userProfileReducer,
  activePage: activePageReducer,
  auth: auth,
  addressAdd: addressReducer,
  getAddress,
  putAddress,
  getReviewDetails,
  getCustomerReviewDetails,
  getEditReviewDetails,
  attribute: attributeReducer,
  myOrders: myOrdersReducer,
  postCart: addToCartReducerPost,
  getCart: getCartReducer,
  removeItem: removeItemReducer,
  editCart: editItemReducer,
  // addWishlist: wishListReducer,
  shopProduct: shopProductReducer,
  coupon: couponReducer,
  placeOrder: placeOrderReducer,
  search:searchReducer,
  orderDetails: orderDetailsReducer,
  trackingOrder:trackingorderReducer,
  getCartDetail:sendCartDetails,
  lisitingProduct:productsListingReducer
});

export default rootReducer;
