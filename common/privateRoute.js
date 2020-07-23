import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserProfileApi } from "../actions/user_profile";
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ component: Component, auth, auth_user, ...rest }) => {


  useEffect(() => {
    auth_user(localStorage.getItem("user_token"));
  }, []);



  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <p style={{ marginTop: '20%' }}><CircularProgress color="secondary" /></p>;
        } else if (
          !auth.isAuthenticated &&
          props.location.pathname !== "/profile"
        ) {
          return (
            <Redirect
              exact
              to={{
                pathname: "/customer/login",
                state: {
                  referrer: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({ auth: state.userProfile });

const mapDispatchToProps = (dispatch) => ({
  auth_user: (token) => dispatch(fetchUserProfileApi(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
