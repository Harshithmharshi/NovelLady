import React, { useEffect } from "react";
import "./Arabic_App.css";

import Header from './Arabic_Components/Arabic_Header';
import ProductCarousel from './Arabic_Components/Arabic_ProductCarousel';
import Offers from './Arabic_Components/Arabic_OffersSection/HomeOffer';
import Footer from './Arabic_Components/Arabic_Footer';
import Bigdeals from './Arabic_Components/Arabic_OffersSection/Bigdeals';
import ProductListItem from './Arabic_Components/Arabic_ProductListItem';
import Login from './Arabic_Components/Arabic_Auth/Login';

import Stylegallery from "./Arabic_Components/Arabic_StyleGallery";
import Brands from "./Arabic_Components/Arabic_Brands";
import ProductDetail from "./Arabic_Components/Arabic_Products/ProductDetail";
import WishList from "./Arabic_Components/Arabic_WishList";
import Shop from "./Arabic_Components/Arabic_shop";
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";

import Profile from "./Arabic_Components/Arabic_Profile";
import PrivateRoute from "./common/privateRoute";
import store,{history} from "./store";
import Orders from "./Arabic_Components/Arabic_Orders";
import MyBag from "./Arabic_Components/Arabic_MyBag";
import SavedAddress from "./Arabic_Components/Arabic_Saved_Address";
import ShippingAddress from "./Arabic_Components/Arabic_ShippingAddress";
import Payment from './Arabic_Components/Arabic_payment';
import OrderDetails from "./Arabic_Components/Arabic_orderDetails";
import ResetPassword from "./Arabic_Components/Arabic_Auth/ResetPassword";
import Orderplaced from "./Arabic_Components/Arabic_Orderplaced";



function App() {

  return (
    <div className="Arabic_App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/">
          <Header />
          <ProductCarousel />
          <Offers />
          <Bigdeals />
          <ProductListItem />
          <Stylegallery />
          {/* <Brands /> */}
          <Footer />
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/cart" component={MyBag} />
          <PrivateRoute exact path="/wishlist" component={WishList} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/address" component={SavedAddress} />
          <PrivateRoute exact path="/shipping" component={ShippingAddress} />
          <PrivateRoute exact path="/orderplaced" component={Orderplaced} />

          <Route exact path="/order-details/:id" component={OrderDetails} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/customer/login" component={Login} />
          <Route path='/product/:id' component={ProductDetail} />
          <Route exact path="/shop/:id" component={Shop} />
          <Route exact path="/search/:id" component={Shop} />
          <Route exact path="/reset-password/:id" component={ResetPassword} />
          <Route path="*"  render={() => <Redirect to='/' />}  />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;

