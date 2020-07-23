import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Snackbar } from "@material-ui/core";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchUserWishListData, deleteWishListID, updateAfterRemoveWishList } from '../actions/wishlistAction';
import Footer from './Arabic_Footer'
import Header from './Arabic_Header';
import _ from 'lodash';
import { postDataToApi } from "../actions/add_to_cart.action";
import Alert from "@material-ui/lab/Alert";

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    // root: {
    //     flexGrow: 1,
    // },


    emptyWishList: {
        display: 'block',
        maxWidth: '980px',
        margin: '250px auto',
        textAlign: 'center',
        fontFamily: 'Cairo, sans-serif',
        // fontFamily: 'Cairo,sans-serif'
    },

    emptyWishListTitle: {
        fontSize: '16px',
        fontWeight: '400',
        textTransform: 'uppercase',
        paddingBottom: '35px',
        fontFamily: 'Cairo, sans-serif',
        // fontFamily: 'Cairo,sans-serif'

    },

    backtoHome: {
        border: '1px solid #3466e8',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '400',
        padding: '14.5px 51px',
        color: '#3466e8',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        textTransform: 'uppercase',
        "&:hover": {
            textDecoration: 'none',
        }

    },

    wishlistTitle: {
        float: 'right',
        position: 'relative',
        // marginTop: '13%',
        marginTop: '50px',
        marginRight: '5%',
        color: '#C82257',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '19px',
        fontFamily: 'Cairo, sans-serif',
        textAlign: 'right',
        // [theme.breakpoints.down('sm')]: {
        //     marginTop: '28%',
        // }
    },

    wishListBody: {
        float: 'right',
        marginTop: '10%',
        display: "grid",
        alignItems: "space-around",

        [theme.breakpoints.down('xl')]: {
            gridTemplateColumns: "auto auto auto auto",
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: "auto auto auto ",
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "auto auto",
        },
        marginLeft: '5%',
        marginRight: '5%',

        // width: '80%',
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // alignContent: 'space-around',
    },

    container: {
        paddingBottom: '8%',
        position: 'relative',
        textDecoration: 'none',
        textAlign: 'right',

    },

    prodDetails: {
        textDecoration: 'none',
        marginTop: '6%',
        "&:hover": {
            textDecoration: 'none',
        }
    },

    prodName: {
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        overflow: 'hidden',
        textTransform: 'capitalize',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '250px',
        fontFamily: 'Cairo, sans-serif',
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            color: ' #C82257',
            textDecoration: 'none'
        }
    },

    prodsellingPrice: {
        fontSize: '14px',
        fontWeight: '700',
        color: 'black',
        "&:hover": {
            textDecoration: 'none',

        }

    },

    prodSize: {
        fontSize: '14px',
        marginRight: '18px',
        color: 'black',
        fontFamily: 'Cairo, sans-serif',
        fontWeight: '800px'

    },

    prodDiscount: {
        marginLeft: '15px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#ff905a"
    },


    hoveredButtons: {
        position: 'absolute',
        paddingTop: '100%',
        bottom: '24.5%',
        width: '100%',
        transition: '.4s ease',
        opacity: 0,
        textDecoration: 'none',
        "&:hover": {
            opacity: 1,
            textDecoration: 'none',
        },
        // [theme.breakpoints.down('sm')]: {
        //     bottom: '30%',
        // },
        // [theme.breakpoints.up('xl')]: {
        //     bottom: '30%',
        // },
        // [theme.breakpoints.up('md')]: {
        //     bottom: '32%',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     bottom: '35.5%',
        // },

    },




    prodSizeTitle: {
        paddingTop: '4%',
        textTransform: 'capitalize',
        fontSize: '16px',
        fontWeight: '400',
    },



    hoverbtn: {
        display: 'flex',
        // padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.6)',
        // paddingLeft: '5%'
        paddingTop: "18px",
        paddingBottom: "18px",
    },

    movetoBag: {
        padding: '8px 10px',
        fontSize: '12px',
        marginLeft: '18%',
        fontWeight: 'normal',
        backgroundColor: '#C82257',
        color: 'white',
        "&:hover": {
            backgroundColor: '#C82257',
        }
    },

    deleteBtn: {
        padding: '9px 13px',
        marginLeft: '15%',
        fontSize: '16px',
        fontWeight: '400',
        color: 'black',
        border: '0.5px solid black',
        borderRadius: '3px',
        "&:hover": {
            color: 'red',
        }

    },

    prodDesc: {
        marginLeft: '15%',
        marginTop: '1px',
        fontWeight: '400',
        fontSize: '13px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'black',
        width: '200px',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'none',
        }
    },
    snackBar: {
        marginTop: "5%",
        width: "100%",
    },

    productLink: {
        textDecoration: "none",
        "&:hover": {
            opacity: 1,
            textDecoration: "none",
        },
    },


}));

function WishList(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        wishList: false,
    });
    const { vertical, horizontal, open } = state;
    const [wishlistData, setwishListData] = useState("");


    useEffect(() => {
        props.wishListDispatch(localStorage.getItem("user_token"));
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        setwishListData(_.uniqBy(props.wishList, 'product.product_id'))
    }, [props.wishList]);


    // Delete the WishList data
    const deleteWishList = (event, instanceID, newState) => {
        event.preventDefault();
        let deleteWishListData = wishlistData.filter((item) => item.product.instance_id !== instanceID);
        props.updateAfterRemoveWishList(deleteWishListData);
        props.deleteWishListID(localStorage.getItem("user_token"), instanceID);
        setState({ open: true, wishList: true, ...newState });
    };

    // Move to bag
    const movetoBag = (event, instanceID, newState) => {
        event.preventDefault();
        let movetoBagData = wishlistData.filter((item) => item.product.instance_id !== instanceID);
        props.updateAfterRemoveWishList(movetoBagData);
        const data = { product_instance_id: instanceID, quantity: 1 };

        props.postToCart(localStorage.getItem("user_token"), data);
        props.deleteWishListID(localStorage.getItem("user_token"), instanceID);
        setState({ open: true, wishList: false, ...newState });
    };


    return (
        <div className={classes.root}>
            <div >
                <Header />
            </div>
            <Grid container >
                <Grid item xs={12} direction="row-reverse">
                    {wishlistData.length === 0 ?
                        <div className={classes.emptyWishList} style={{ marginLeft: '15%', marginTop: '120px' }}>
                            <div className={classes.emptyWishListTitle}>قائمة رغباتك فارغة</div>
                            <Link to="/" className={classes.backtoHome}>ابدأ في الإضافة</Link>
                        </div>
                        : <div >
                            <div className={classes.wishlistTitle}>
                                قائمة امنياتي <span style={{ color: 'black' }}>- {wishlistData.length} العناصر</span>
                            </div>

                            {props.isloading ?
                                <div style={{ marginLeft: '2%', padding: '150px', paddingBottom: '150px' }}>
                                    <CircularProgress color="secondary" />
                                </div>

                                :
                                <div className={classes.wishListBody}>


                                    {wishlistData && wishlistData.length ? wishlistData.map((item, id) => {
                                        const images = _.get(item.product, 'images[0].images');
                                        return (
                                            <Link
                                                to={{
                                                    pathname: "/product/" + item.product.product_id,
                                                }}
                                                className={classes.productLink}
                                                target="_blank"
                                            >

                                                <div key={item.product.product_id} className={classes.container}>
                                                    <div>
                                                        <img src={images} alt={item.product.product_name} width="240" height="360" />
                                                        <div className={classes.hoveredButtons}>
                                                            <div className={classes.hoverbtn} >
                                                                <span onClick={(event) => deleteWishList(event, item.product.instance_id)} className={classes.deleteBtn}><i className="fas fa-trash-alt"></i></span>

                                                                <Button className={classes.movetoBag} variant="contained" onClick={(event) => movetoBag(event, item.product.instance_id)}>انتقل إلى الحقيبة</Button>
                                                            </div>
                                                        </div>
                                                        <div className={classes.prodDetails}>
                                                            <Typography className={classes.prodName}>{item.product.translated_product_name}</Typography>
                                                            <p className={classes.prodDesc}>{item.product.translated_product_description}</p>
                                                            <div className={classes.priceSection}>
                                                                <span className={classes.prodSize}>{item.product.translated_product_Size}</span>
                                                                <span className={classes.prodsellingPrice}>SAR  {item.product.selling_price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )

                                    }) : ''}
                                </div>
                            }
                        </div>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Footer />
            </Grid>

            {localStorage.getItem("user_token") ? (
                state.wishList ? (
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
                        message="تم الحذف"
                    />
                ) : (
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
              تمت الإضافة إلى الحقيبة                            </Alert>
                        </Snackbar>
                    )
            ) : (
                    ""
                )}
        </div>
    );

}




const mapStateToProps = state => {
    return {
        wishList: state.wishlist.data,
        isUserLogin: state.wishlist.isUserLogin,
        isloading: state.wishlist.isloading
    };
};



const mapDispatchToProps = dispatch => {
    return {
        wishListDispatch: token => dispatch(fetchUserWishListData(token)),
        deleteWishListID: (token, id) => dispatch(deleteWishListID(token, id)),
        postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),
        updateAfterRemoveWishList: (data) => dispatch(updateAfterRemoveWishList(data)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WishList));
