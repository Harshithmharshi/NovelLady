import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, withWidth, Snackbar } from '@material-ui/core';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Discount } from '../../constants/Discount';
import { productSimilarItem, authproductSimilarItem } from '../../actions/productSimilarItemAction';
import { compose } from 'redux';

import { postWishListID } from '../../actions/wishlistAction';
import { postDataToApi } from '../../actions/add_to_cart.action';
import { authProdList, } from "../../actions/productsAction";
import { localStorageItem } from '../../constants/localStorageItem';

import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: "1320px",
        margin: "auto",
        [theme.breakpoints.down("lg")]: {
            margin: "auto 20px",
        }
    },

    arrivalTitle: {
        fontWeight: '700',
        fontSize: '2rem',
        color: '#212121',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '80px',
        marginBottom: '20px',
        fontFamily: 'Roboto, sans-serif'

    },

    carousel: {
        position: 'relative',
        marginRight: '80px',
        paddingBottom: '50px',
        // width: '82%',
    },


    // rightArrow: {
    //     position: 'absolute',
    //     marginLeft: '75%',
    //     bottom: '50%',
    //     fontSize: '100px',
    //     color: '#180022'
    // },

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

    // viewAll: {
    //     whiteSpace: 'nowrap',
    //     position: 'absolute',
    //     marginTop: '5%',
    //     marginLeft: '105%',
    //     color: '#C82257',
    //     fontSize: '15px',
    //     fontWeight: '700',
    //     textDecoration: 'none',
    //     "&:hover": {
    //         color: '#C82257',
    //         textDecoration: 'none',
    //         cursor: "pointer"
    //     }
    // },

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
        paddingBottom: '8%',
        position: 'relative',
        textAlign: 'justify'
    },

    prodName: {
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        fontFamily: 'Roboto, sans-serif',
        color: 'black',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '250px',
        fontFamily: 'Roboto, sans-serif',
        textDecoration: 'none',
        "&:hover": {
            color: ' #C82257',
            textDecoration: 'none'
        },
    },

    prodsellingPrice: {
        fontSize: '14px',
        fontWeight: '700',
        color: 'black',
        "&:hover": {
            textDecoration: 'none',
        },
    },

    prodmrpPrice: {
        fontSize: '14px',
        marginLeft: '14px',
        color: 'grey',
        "&:hover": {
            textDecoration: 'none',
        },
    },


    prodDiscount: {
        marginLeft: '14px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#ff905a",
    },



    hoveredButtons: {
        position: 'absolute',
        paddingTop: '80%',
        bottom: '24%',
        width: '240px',
        transition: '.4s ease',
        opacity: 0,
        textDecoration: 'none',
        zIndex: 999,
        "&:hover": {
            opacity: 1,
            textDecoration: 'none',
        },



    },


    sizeAvail: {
        display: 'flex',
        padding: '10px 0px 20px 20px'
    },


    prodSizeTitle: {
        width: '85%',
        // textAlign: 'center',
        paddingTop: '4%',
        textTransform: 'capitalize',
        fontSize: '16px',
        fontWeight: '400',
        color: "#707070",
        marginLeft: "2%",
    },

    sizeOptions: {
        marginLeft: '3%',
        fontSize: '12px',
        fontWeight: 'normal',
        border: '0.8px solid #707070',
        borderRadius: '100%',
        color: 'black',
        width: '32px',
        lineHeight: '30px',
        padding: '14xp 22px',
        textAlign: 'center',
        display: 'inline-block',
        textDecoration: 'none',
        color: '#707070',
        "&:hover": {
            borderColor: '#C82257',
            color: '#C82257'
        },

    },

    hoverbtn: {
        display: 'flex',
        paddingTop: '18px',
        paddingBottom: '10px',
        justifyContent: "space-evenly",
        width: '240px'

    },

    addtobagBtn: {
        // marginLeft: '7%',
        padding: '7px 10px',
        fontSize: '12px',
        fontWeight: 'normal',
        backgroundColor: '#C82257',
        color: 'white',
        outline: 'none',
        "&:hover": {
            backgroundColor: '#C82257',
        },

    },

    wishlistBtn: {
        padding: '7px 10px',
        // marginLeft: '10%',
        fontSize: '12px',
        fontWeight: 'normal',
        backgroundColor: 'white',
        border: '0.5px solid black',
        outline: 'none',
        "&:hover": {
            backgroundColor: 'white',
        },

    },

    prodDesc: {
        marginTop: '1px',
        fontWeight: '400',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'black',
        width: '200px',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'none',

        },
    },

    productLink: {
        textDecoration: 'none',
        "&:hover": {
            opacity: 1,
            textDecoration: 'none'
        }
    },

    hideSize: {
        display: 'none'
    },

}));


function SimilarItem(props) {
    const classes = useStyles();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        wishList: false
    });
    const { vertical, horizontal, open } = state;
    const [showSize, setShowSize] = useState({ id: '', hide: true });


    useEffect(() => {
        // if (typeof props.location.state === "undefined" || props.location.state === "null") {
        //     props.productSimilarItemDispatch(1);
        // } else {
        //     props.productSimilarItemDispatch(props.categoryID);
        // }
        // props.authProdList(localStorage.getItem("user_token"));
        if (localStorage.getItem("user_token")) {
            props.authproductSimilarItem(localStorage.getItem("user_token"), props.categoryID)
        } else {
            props.productSimilarItemDispatch(props.categoryID);

        }

    }, [props]);




    const showAddToCartSize = (event, id) => {
        event.preventDefault();
        if (showSize.hide) {
            setShowSize({ ...showSize, id: id, hide: false });
        }
        else {
            setShowSize({ ...showSize, id: '', hide: true });
        }
    };

    //Send to cart
    const addToCart = (event, items, newState) => {
        // event.preventDefault();
        // if (localStorage.getItem("user_token")) {
        //     props.postToCart(localStorage.getItem("user_token"), items);
        //     setTimeout(() => {
        //         props.authProdList(localStorage.getItem("user_token"));
        //     }, 100);
        //     setState({ open: true, wishList: false, ...newState });
        // }
        // else {
        //     props.history.push('/customer/login')
        // }

        event.preventDefault();
        setState({ open: true, wishList: false, ...newState });


        if (localStorage.getItem("user_token")) {
            const data = { product_instance_id: items, quantity: 1 };
            props.postToCart(localStorage.getItem("user_token"), data);
            setTimeout(() => {
                props.authProdList(localStorage.getItem("user_token"));
            }, 100);
        } else {
            localStorageItem(items);
        }


    };


    // Add WishList
    const sendWishList = (event, instanceID, newState) => {
        event.preventDefault();
        if (localStorage.getItem("user_token")) {
            let postID = {
                id: instanceID
            };
            props.postWishListID(localStorage.getItem("user_token"), postID);
            setState({ open: true, wishList: true, ...newState });
            setTimeout(() => {
                props.authProdList(localStorage.getItem("user_token"));
            }, 100);
        }
        else {
            props.history.push('/customer/login')
        }
    }


    const regex = /\s/g;


    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <Typography className={classes.arrivalTitle}>similar item</Typography>
                </Grid>
            </Grid>
            <Grid container wrap="nowrap">
                <Grid item xs={12} style={{ maxWidth: '1320px' }}>
                    <div className={classes.carousel}>
                        <ItemsCarousel
                            requestToChangeActive={setActiveItemIndex}
                            gutter={12}
                            activeItemIndex={activeItemIndex}
                            numberOfCards={props.width === 'lg' ? 4 : props.width === 'md' ? 3 : 2}
                            chevronWidth={chevronWidth}
                            infiniteLoop={true}
                            slidesToScroll={1}
                            outsideChevron={true}
                            showSlither={true}
                            rightChevron={
                                <div>
                                    <KeyboardArrowRightIcon className={classes.rightArrow} />
                                    <Router>
                                        <Link to={{
                                            pathname: `/shop/${props.category_name}?tag_id=${props.tag_id}`,
                                        }}
                                            onClick={() => {
                                                setTimeout(() => {
                                                    window.scrollTo(0, 0);
                                                    window.location.reload()
                                                }, 10);
                                            }}
                                            className={classes.viewAll} >View All</Link>
                                    </Router>
                                </div>
                            }
                        >

                            {props.product_similarItem && props.product_similarItem.length ? props.product_similarItem.map(item => {
                                if (item.id !== Number(props.productID))
                                    return (
                                        <Router forceRefresh={true}>
                                            <Link to={{
                                                // pathname: "/product/" + item.id,
                                                pathname: `/product/${item.product_name.toString().replace(regex, "-")}/${item.id}/`,

                                                state: {
                                                    category: item.category_id
                                                }
                                            }}
                                                className={classes.productLink}
                                                target="_blank"
                                            >

                                                <div key={item.product_id} className={classes.container} >
                                                    {item.product_image ? (
                                                        <img src={item.product_image} alt={item.product_name} width="240" height="360" />
                                                    ) : (
                                                            <>
                                                                <Skeleton animation="false" variant="rect" width={240} height={360} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>NovelLady</Skeleton>
                                                                <Skeleton animation="false" variant="text" width={240} height={50} />
                                                            </>
                                                        )
                                                    }

                                                    <div className={classes.hoveredButtons}>
                                                        <div style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                                                            <div className={showSize.id === item.id ? classes.prodSizeTitle : classes.hideSize}> Select size</div>
                                                            <div className={showSize.id === item.id ? classes.sizeAvail : classes.hideSize} >
                                                                {item.size_available.map(item => {
                                                                    if (item.available_stock !== 0) {
                                                                        return <span
                                                                            className={classes.sizeOptions}
                                                                            onClick={(event) =>
                                                                                addToCart(
                                                                                    event,
                                                                                    item.product_instance_id
                                                                                )}>
                                                                            {item.size_value}
                                                                        </span>
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className={classes.hoverbtn} >

                                                                <Button
                                                                    className={classes.addtobagBtn}
                                                                    variant="contained"
                                                                    onClick={(event) => showAddToCartSize(event, item.id)}

                                                                    disabled={_.some(item.size_available, { in_cart: "True" }) ? true : false}

                                                                >
                                                                    {_.some(item.size_available, { in_cart: "True" }) ? "in Bag" : "Add to bag"}


                                                                </Button>

                                                                <Button
                                                                    className={classes.wishlistBtn}
                                                                    variant="contained"
                                                                    disabled={item.in_wishlist === "True" ? true : false}
                                                                    onClick={(event) => sendWishList(event, item.product_instance_id)}>
                                                                    {item.in_wishlist === "True" ? 'In Wishlist' : 'wishlist'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginTop: '5%' }}>
                                                        <Typography className={classes.prodName}>{item.product_name}</Typography>
                                                        <p className={classes.prodDesc}>{item.product_description}</p>
                                                        <div className={classes.priceSection}>
                                                            <span className={classes.prodsellingPrice}>SAR {item.selling_price}</span>
                                                            <span className={classes.prodmrpPrice}><strike>SAR {item.mrp_price}</strike></span>
                                                            <span className={classes.prodDiscount}>({Discount(item.mrp_price, item.selling_price)} {" "} OFF)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Router>
                                    )
                            }) : <div className={classes.container} style={{ display: 'flex' }}>

                                    <div>
                                        <Skeleton animation="false" variant="rect" width={240} height={360} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>NovelLady</Skeleton>
                                        <Skeleton animation="false" variant="text" width={240} height={50} />

                                    </div>
                                    <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                                        <Skeleton animation="false" variant="rect" width={240} height={360} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>NovelLady</Skeleton>
                                        <Skeleton animation="false" variant="text" width={240} height={50} />
                                    </div>
                                    <div style={{ paddingLeft: '20%' }}>
                                        <Skeleton animation="false" variant="rect" width={240} height={360} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>NovelLady</Skeleton>
                                        <Skeleton animation="false" variant="text" width={240} height={50} />
                                    </div>
                                    <div style={{ paddingLeft: '30%' }}>
                                        <Skeleton animation="false" variant="rect" width={240} height={360} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>NovelLady</Skeleton>
                                        <Skeleton animation="false" variant="text" width={240} height={50} />
                                    </div>
                                </div>
                            }
                        </ItemsCarousel>
                    </div>
                </Grid>
            </Grid>
            {localStorage.getItem("user_token") ?
                state.wishList ?
                    <Snackbar
                        className={classes.snackBar}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        key={`${vertical},${horizontal}`}
                        open={open}
                        autoHideDuration={2000}
                        onClose={() => setState({ open: false })}
                        message="Added to Wishlist"
                    />
                    :
                    <Snackbar
                        className={classes.snackBar}
                        open={open}
                        autoHideDuration={2000}
                        onClose={() => setState({ open: false })}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        key={`${vertical},${horizontal}`}
                    >
                        <Alert style={{ backgroundColor: "#C82257" }} variant="filled" >
                            Added to Bag
                        </Alert>
                    </Snackbar>

                : ''}
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        product_similarItem: state.productsimilaritem.data

    };
};



const mapDispatchToProps = dispatch => {
    return {
        productSimilarItemDispatch: (id) => dispatch(productSimilarItem(id)),
        postWishListID: (token, id) => dispatch(postWishListID(token, id)),
        postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),
        authProdList: (token) => dispatch(authProdList(token)),
        authproductSimilarItem: (token, id) => dispatch(authproductSimilarItem(token, id)),


    };
};

export default withRouter(
    compose(
        withWidth(),
        connect(mapStateToProps, mapDispatchToProps)
    )(SimilarItem));
