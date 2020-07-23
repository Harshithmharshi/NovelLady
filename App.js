import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";


import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from './components/Header';
import Offers from './components/OffersSection/HomeOffer';
import Footer from './components/Footer';
import Bigdeals from './components/OffersSection/Bigdeals';
import ProductListItem from './components/ProductListItem';
import Login from './components/Auth/Login';

import Stylegallery from "./components/StyleGallery";
import Brands from "./components/Brands";
import ProductDetail from "./components/Products/ProductDetail";
import WishList from "./components/WishList";
import Shop from "./components/shop";

import Profile from "./components/Profile";
import PrivateRoute from "./common/privateRoute";
import store, { history } from "./store";
import Orders from "./components/Orders";
import MyBag from "./components/MyBag";
import SavedAddress from "./components/Saved_Address";
import ShippingAddress from "./components/ShippingAddress";
import Payment from './components/payment';
import OrderDetails from "./components/orderDetails";
import ResetPassword from "./components/Auth/ResetPassword";
import Orderplaced from "./components/Orderplaced";
import ProductCarousel from "./components/ProductCarousel";

// const ProductCarousel = lazy(() => import('./components/ProductCarousel'));


function App() {

  return (
    <div className="App">
      <Suspense fallback={<></>}>
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
            <Route exact path="/cart" component={MyBag} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/wishlist" component={WishList} />
            <PrivateRoute exact path="/orders" component={Orders} />
            <PrivateRoute exact path="/address" component={SavedAddress} />
            <PrivateRoute exact path="/shipping" component={ShippingAddress} />
            <PrivateRoute exact path="/order-details/:id" component={OrderDetails} />
            <PrivateRoute exact path="/orderplaced" component={Orderplaced} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/customer/login" component={Login} />
            <Route path='/product/:product_name/:id' component={ProductDetail} />

            <Route exact path="/shop/:id" component={Shop} />
            <Route exact path="/search/:id" component={Shop} />
            <Route exact path="/reset-password/:id" component={ResetPassword} />
            <Route path="*" render={() => <Redirect to='/' />} />

          </Switch>
        </ConnectedRouter>
      </Suspense>
    </div>
  );
}

export default App;

