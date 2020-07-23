import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Main from "../components/Header";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { fetchUserProfileApi } from "../actions/user_profile";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    OrderBody: {
        marginTop: "20px",
        textAlign: 'justify',
        fontFamily: 'Roboto, sans-serif',
        padding: '100px',
        marginLeft: '150px',
        fontWeight: '500'


    },

    shopAgain: {
        marginTop: "40px",
        border: '1px solid #3466e8',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '400',
        color: '#3466e8',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        padding: '14.5px 51px',
        fontWeight: '500',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        "&:hover": {
            textDecoration: 'none',
        }

    },


    orderPlacedTitle: {
        marginTop: "30px",
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'green',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontFamily: 'Roboto, sans-serif',
    },


    mainContent1320: {
        maxWidth: "1320px",
        margin: "auto",
        [theme.breakpoints.down("lg")]: {
            margin: "auto 20px",
        }
    },

}));

function Orderplaced(props) {
    const classes = useStyles();
    const { first_name } =
        props.profile.user_profile_data.customer || {};


    return (
        <>
            <div className={classes.root}>
                <Main />
            </div>
            <div className={classes.mainContent1320}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.OrderBody} >
                            <div>Hi {first_name}</div>
                            <div className={classes.orderPlacedTitle}><span style={{ marginRight: '20px' }}><CheckCircleOutlineIcon /></span>Order Successfully Placed.</div>
                            <div style={{ marginTop: "30px", marginBottom: '30px' }}>Thank you for shopping with NovelLady</div>
                            <Link to="/" className={classes.shopAgain}>shop more</Link>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div>
                <Footer />
            </div>


        </>
    );

}


const mapStateToProps = state => {
    return {
        profile: state.userProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profileDispatch: token => dispatch(fetchUserProfileApi(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderplaced);

