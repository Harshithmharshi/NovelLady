import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Avatar, Grid, Breadcrumbs, Typography, FormControl, Select, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tab } from "@material-ui/core";

//Components
import Footer from '../Arabic_Footer'
import ProductReview from './ProductReview';
import Tabs from 'react-bootstrap/Tabs';
import ReactImageMagnify from 'react-image-magnify';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { productsDetail, authproductsDetail } from '../../actions/productDetailAction';
import Main from "../Arabic_Header";
import _ from 'lodash';
import SimilarItem from './SimilarItem';
import { postWishListID } from '../../actions/wishlistAction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Alert from '@material-ui/lab/Alert';
import { postDataToApi } from "../../actions/add_to_cart.action";
import Skeleton from '@material-ui/lab/Skeleton';
import { Discount } from '../../constants/Discount';
import { localStorageItem } from '../../constants/localStorageItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import querystring from "query-string";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    breadcrumbLink: {
        paddingLeft: '3px',
        paddingRight: '3px',
        marginTop: '1px',
        textTransform: 'uppercase',
        fontSize: '13px',
        cursor: 'pointer',
        color: 'black',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Cairo, sans-serif',
        fontWeight: '500',
    },

    ProductDetail: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: '10%'
    },

    breadcrumbs: {
        // marginTop: '13%',
        marginTop: '70px',
        marginRight: '2.5%',
        cursor: 'pointer',
        float: 'right',
    },

    prodImage: {
        marginTop: '8%',
        marginLeft: '5%',
    },

    gridImages: {
        marginTop: '8%',
        marginLeft: '8%',
        maxWidth: '100%',
        verticalAlign: 'middle',
    },

    rootAvatar: {
        display: 'flex',
    },

    product_data: {
        position: 'relative',
        marginLeft: '8%',
        marginTop: '2.5%',
        paddingRight: '5%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        textTransform: 'capitalize'
        // // width:'80%',
        // // [theme.breakpoints.down('md')]:{
        // //     marginLeft:'25%'
        // // },
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: '12%',
        //     marginTop: '10%',

        // },

    },


    prodsellingPrice: {
        marginTop: '10px',
        fontSize: '18px',
        fontWeight: 'bold'
    },

    prodmrpPrice: {
        marginTop: '10px',
        marginRight: '18px',
        fontWeight: 'normal',
        fontSize: '18px',
        // paddingLeft: '8%'
    },

    prodDiscount: {
        marginRight: '18px',
        fontSize: '18px',
        fontWeight: 'bold',
        // paddingLeft: '8%',
        color: '#C82257'
    },

    ratingBlock: {
        marginTop: '4%',
        backgroundColor: '#C82257',
        color: 'white',
        padding: '5px 10.5px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '0.25rem'
    },

    product_size: {
        display: 'flex',
        marginTop: '3%',
    },

    formControl: {
        position: 'relative',
        marginLeft: '10%',
        marginTop: '-10px',
        minWidth: 90,
        marginLeft: '5%',
    },

    sizeChart: {
        position: 'relative',
        marginLeft: '15%',
        // marginBottom:'7px',
        fontSize: '22px',
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#C82257',
        '&:hover': {
            cursor: 'pointer'
        }
    },

    productTop: {
        display: 'flex',
        marginTop: '4%',
        float: 'right'
        // [theme.breakpoints.down('sm')]: {
        //     marginTop: '5%'
        // },
        // [theme.breakpoints.between('lg', 'xl')]: {
        //     marginTop: '5%'
        // }
    },



    addtobag: {
        backgroundColor: '#C82257',
        color: '#ffffff',
        fontWeight: '400',
        textTransform: 'uppercase',
        padding: '15px 30px',
        fontSize: '16px',
        borderRadius: '5px',
        outline: 'none',
        marginLeft: '5%',
        "&:hover": {
            backgroundColor: '#C82257',
            color: 'black',
        }
    },

    wishlist: {
        marginRight: '15%',
        color: '#C82257',
        fontWeight: '400',
        textTransform: 'uppercase',
        padding: '15px 30px',
        fontSize: '16px',
        borderRadius: '5px',
        outline: 'none',
        "&:hover": {
            backgroundColor: 'white',
            color: 'black',

        },

    },

    nav_bar: {
        marginLeft: '20%',
        marginTop: '20%',
        width: '100%'
    },



    priceSection: {
        marginTop: '-1%',
        textAlign: 'right'
    },

    colorImage: {
        marginLeft: '5px',
        marginTop: '3px',
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        maxWidth: '100%',
        padding: '0.1rem'
    },

    colorTitle: {
        marginTop: '1.5%',
        fontSize: '18px',
        fontWeight: 'bold'
    },

    colorBody: {
        display: 'flex',
        padding: '0.1%',
        marginLeft: '77%'
        // marginTop: '1.5%',
    },

    sizeTitle: {
        fontSize: '18px',
        fontWeight: 'normal',
        marginTop: '1.5%',
        marginLeft: '40%'
    },

    decSection: {
        marginTop: '10%',
        marginLeft: '2%',
        textAlign: 'right',
        padding: '2%'
    },

    desc_body: {
        fontSize: '16px',
        fontWeight: '400',
    },

    reviewSection: {
        marginTop: '10%'
    },

    prodDesc: {
        fontSize: '14px',
        overflow: 'hidden',
        whiteSpace: 'normal',
    },

    square: {
        height: '110px',
        width: '100px',
    },

    smallImages: {
        border: '1px solid #EBEBEB',
        padding: '5px',
        opacity: 0.8,
        "&:hover": {
            opacity: 1
        }
    },

    sizes: {
        marginLeft: '15px',
        borderRadius: '50%',
        border: '0.5px solid grey',
        textAlign: 'center',
        cursor: 'pointer',
        // padding: '5px',
        paddingTop: '15px',
        paddingBottom: '15px',
        "&:active,&:focus": {
            backgroundColor: 'grey',
            color: 'white',
            outline: '0',
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
}));



function ProductDetail(props) {
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        wishList: false,
    });
    const [iswishList, setiswishList] = useState(false);
    const [isaddtoBag, setisaddtoBag] = useState(false);

    const { vertical, horizontal, open } = state;
    const [thumbImage, setThumbImage] = useState('');
    const qs = querystring.parse(props.location.search);
    const obj = { ...qs };



    useEffect(() => {
        window.scrollTo(0, 0);

        if (obj.hasOwnProperty("instance_id")) {
            if (localStorage.getItem("user_token")) {
                props.colorauthproductDetailDispatch(localStorage.getItem("user_token"), props.match.params.id, props.location.search.slice(13, -1));
            }
            else {
                props.colorproductDetailDispatch(props.match.params.id, props.location.search.slice(13, -1));
            }
        } else if (localStorage.getItem("user_token")) {
            props.authproductDetailDispatch(localStorage.getItem("user_token"), props.match.params.id);
        } else {
            props.productDetailDispatch(props.match.params.id);
        }
    }, []);


    const FullImages = _.get(props.products_details.images, 'images[0].images');
    const similarImages = _.toArray(_.get(props.products_details.images, 'images')).map(item => {
        return item.images;
    });
    const SimilarImagesView = _.drop(similarImages);
    const availableStock = _.get(props.products_details.ProductStock, 'stock');
    const arrayStock = [];
    for (let i = 1; i <= availableStock; i++) {
        arrayStock.push(i)
    };
    const currentImage = (imgSrc) => {
        setThumbImage(imgSrc);
    };



    useEffect(() => {
        setThumbImage(FullImages);
    }, [FullImages])





    const imageProps = {
        smallImage: {
            alt: '',
            src: thumbImage,
            width: 400,
            height: 600

        },
        largeImage: {
            src: thumbImage,
            width: 1200,
            height: 1800
        },
        enlargedImageContainerStyle: { zIndex: 99, }
    };

    const classes = useStyles();
    const [size, setSize] = useState('');
    const [qty, setQty] = useState('');
    const [popopen, setOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState('sm');





    // const handleQtyChange = event => {
    //     setQty(event.target.value);
    //     alert(qty)
    // };



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Send to WishList
    const sendWishList = (event, instanceID, newState) => {
        event.preventDefault();
        if (localStorage.getItem("user_token")) {
            let postID = {
                id: instanceID
            };
            props.postWishListID(localStorage.getItem("user_token"), postID);
            props.authproductDetailDispatch(localStorage.getItem("user_token"), props.match.params.id);

            setState({ open: true, wishList: true, ...newState });
            setiswishList(true)
        }
        else {
            props.history.push('/customer/login');

        }


        // let postID = {
        //     id: instanceID
        // };
        // props.postWishListID(localStorage.getItem("user_token"), postID);
        // props.authproductDetailDispatch(localStorage.getItem("user_token"), props.match.params.id);

        // setState({ open: true, wishList: true, ...newState });
        // setiswishList(true)


    };

    // Select the size to send cart
    const selectSize = sizeID => {
        setSize(sizeID);
    }

    // send to Cart
    const addToCart = (event, newState) => {
        // event.preventDefault();
        // if (localStorage.getItem("user_token")) {
        //     if (!size) {
        //         alert("Please select the size");
        //     }
        //     else {
        //         props.postToCart(localStorage.getItem("user_token"), size);
        //         setState({ open: true, wishList: false, addtoBag: true, ...newState });
        //         setisaddtoBag(true);
        //     }

        // } else {
        //     props.history.push("/customer/login");
        // }

        event.preventDefault();
        if (!size) {
            alert("Please select the size");
        }
        else {
            if (localStorage.getItem("user_token")) {
                const data = { product_instance_id: size, quantity: 1 };
                props.postToCart(localStorage.getItem("user_token"), data);
                props.authproductDetailDispatch(localStorage.getItem("user_token"), props.match.params.id);
            }
            else {
                console.log(size);
                localStorageItem(size);
            }
            setState({ open: true, wishList: false, addtoBag: true, ...newState });
            setisaddtoBag(true);
        }
    };


    const regex = /\s/g;

    
    const product_name = typeof props.products_details.translated_product_name !== "undefined" ? props.products_details.translated_product_name : '';
    const category_name = typeof props.products_details.translated_category_name !== "undefined" ? props.products_details.translated_category_name : '';
    const tag_name = typeof props.products_details.tag ? _.map(props.products_details.tag, item => {
        return item.translated_tag_name
    }) : '';



    return (
        <div className={classes.root}>

            <Helmet>
                <title>{`${product_name} - ${category_name} - ${tag_name} - Novellady`}</title>
                <meta name="keywords" content={`${product_name}, ${category_name}, ${tag_name}, Online shopping, online shopping sites, women apparels, women clothing, online shopping site`} />
                <meta name="description" content={`${product_name}, ${category_name}, ${tag_name}. Online shopping exclusive for Women. Best online fashion store.`} />
            </Helmet>


            <Grid container>
                <Grid item xs={12}>
                    <Main />
                </Grid>
            </Grid>



            <Grid container direction="row-reverse">
                <Grid item xs={12}>
                    <div className={classes.breadcrumbs}>
                        <Breadcrumbs >
                            <Typography className={classes.breadcrumbLink} style={{ color: '#C82257' }}>
                                {props.products_details.translated_product_name}
                            </Typography>
                            <Typography className={classes.breadcrumbLink}>
                                {props.products_details.translated_category_name}
                            </Typography>
                            <Typography className={classes.breadcrumbLink}>
                                الصفحة الرئيسية
                             </Typography>
                        </Breadcrumbs>
                    </div>
                </Grid>
            </Grid>

            {props.isLoading ?
                <div style={{ marginLeft: '5%', padding: '100px', paddingBottom: '100px' }}>
                    <CircularProgress color="secondary" />
                </div> :


                <Grid item xs={12}>
                    <div className={classes.ProductDetail}>
                        <div className={classes.rootAvatar}>
                            <div className={classes.prodImage}>
                                <ReactImageMagnify
                                    {...imageProps}
                                />
                            </div>
                            <div className={classes.gridImages}>
                                <div className={classes.smallImages}>
                                    {SimilarImagesView.map(item => {
                                        return <Avatar variant="square" className={classes.square}>
                                            <img src={item} alt={props.products_details.translated_product_name} style={{ marginTop: '10%', }} height="120" width="100" onMouseEnter={() => currentImage(item)} />
                                        </Avatar>
                                    })}
                                </div>
                            </div>
                        </div>


                        <div className={classes.product_data}>
                            {props.products_details ? <h5 style={{ whiteSpace: 'normal' }}><strong>{props.products_details.translated_product_name}</strong></h5>
                                : <Skeleton variant="text" />}
                            {props.products_details ? <p className={classes.prodDesc}>{props.products_details.translated_product_description}</p>

                                : <Skeleton variant="rect" width={210} height={118} />}
                            <div className={classes.priceSection}>
                                <span className={classes.prodsellingPrice}>ريال سعودي {props.products_details.selling_price}</span>
                                <span className={classes.prodmrpPrice}><strike> ريال سعودي {props.products_details.mrp_price}</strike></span>
                                <span className={classes.prodDiscount}>({Discount(props.products_details.mrp_price, props.products_details.selling_price)} {" "} إيقاف)</span>

                            </div>
                            <p style={{ marginTop: '1.5%' }}><span className={classes.ratingBlock}>{props.products_details.product_rating} <i className="fas fa-star"></i></span></p>
                            <div className={classes.product_size}>
                                <h5 onClick={handleClickOpen} className={classes.sizeChart}>
                                    <small>حجم الرسم البياني</small>
                                </h5>
                                <h4 className={classes.sizeTitle} ><strong>أختر الحجم</strong></h4>
                                <Dialog
                                    fullWidth={true}
                                    maxWidth={maxWidth}
                                    open={popopen}
                                    onClose={handleClose}
                                >
                                    <DialogTitle id="max-width-dialog-title" style={{ textAlign: 'right' }}>حجم الرسم البياني</DialogTitle>
                                    <DialogContent >
                                        <form className={classes.form}>
                                            <TableContainer>
                                                <Table className={classes.table}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell ></TableCell>
                                                            <TableCell ></TableCell>
                                                            <TableCell ></TableCell>
                                                            <TableCell ></TableCell>
                                                            <TableCell ></TableCell>
                                                            <TableCell ></TableCell>
                                                            <TableCell> *بالبوصة</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell >XS</TableCell>
                                                            <TableCell >S</TableCell>
                                                            <TableCell >M</TableCell>
                                                            <TableCell >L</TableCell>
                                                            <TableCell >XL</TableCell>
                                                            <TableCell >XXL</TableCell>
                                                            <TableCell>بحجم</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>
                                                                كتف
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>
                                                                إفلاس
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>15</TableCell>
                                                            <TableCell>
                                                                الطول
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </form>
                                    </DialogContent>
                                    <div style={{ marginBottom: '2%', marginLeft: '3%' }}>
                                        <Button onClick={handleClose} color="primary" >
                                            قريب
                                        </Button>
                                    </div>
                                </Dialog>
                            </div>

                            <div className={classes.colorBody}>
                                {_.toArray(props.products_details.size_available).map((sizeItem, index) => {
                                    if (sizeItem.available_stock !== 0)
                                        return <div className={classes.image_captured}>
                                            <Button className={classes.sizes} onClick={() => selectSize(sizeItem.product_instance_id)}>{sizeItem.translated_size_value}</Button>
                                        </div>
                                })}

                            </div>

                            <div className={classes.colorTitle}>اللون</div>
                            <div className={classes.colorBody}>
                                {_.toArray(props.products_details.color_available).map((colorItem, index) => {
                                    if (colorItem.available_stock !== 0)
                                        return <div className={classes.image_captured} key={index}>
                                            <Link
                                                to={{
                                                    pathname: `/product/${props.products_details.product_name.toString().replace(regex, "-")}/${props.products_details.product_id}/?instance_id=${colorItem.product_instance_id}/`,
                                                }}
                                                target="_blank"
                                            >
                                                <img src={colorItem.image} alt={props.products_details.product_name} width='65' height='75' className={classes.colorImage} />
                                            </Link>
                                        </div>
                                })}
                            </div>
                            {/* {availableStock === 0 ? ''
                            : <div className={classes.productTop}>
                                <h4 className={classes.sizeTitle}><strong>Qty</strong></h4>
                                <FormControl required size="small" variant="outlined" className={classes.formControl}>

                                    <Select
                                        style={{ height: '40px', width: '70px', fontSize: '16px' }}
                                        native
                                        autoWidth={true}
                                        value={qty}
                                        onChange={handleQtyChange}
                                    >
                                        {arrayStock.map(i => {
                                            return <option value={i}>{i}</option>
                                        })}

                                    </Select>
                                </FormControl>
                            </div>
                        } */}

                            <div className={classes.productTop}>
                                {localStorage.getItem("user_token") ?
                                    <Button
                                        variant="outlined"
                                        className={classes.wishlist}
                                        disabled={props.products_details.in_wishlist === "True" ? true : false}
                                        onClick={(event) => sendWishList(event, props.products_details.product_instance_id)}>

                                        {props.products_details.in_wishlist === "True" ? 'قائمة الرغبات ' : 'في قائمة الرغبات'}

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
                                            variant="outlined"
                                            className={classes.wishlist}>
                                            قائمة الرغبات
                                         </Button>
                                    </Link>

                                }


                                {availableStock === 0 ?
                                    <Button variant="contained" style={{ fontSize: '18px', fontWeight: 'bold' }} disabled>
                                        إنتهى من المخزن
                                    </Button>
                                    :
                                    <Button variant="contained" className={classes.addtobag} disabled={props.products_details.in_cart === "True" ? true : false} onClick={(event) => addToCart(event)}>
                                        {props.products_details.in_cart === "True" ? 'أضف الى الحقيبة' : 'في الحقيبة'}
                                    </Button>
                                }

                            </div>
                        </div>
                    </div>


                    <div className={classes.decSection}>
                        <Tabs defaultActiveKey="Description" style={{ marginLeft: '86%' }}>
                            <Tab eventKey="Return Policy" title="سياسة العائدات">
                                <span className={classes.desc_body}>نص سياسة الإرجاع</span>
                            </Tab>
                            <Tab eventKey="Description" title="وصف" >
                                <span className={classes.desc_body}>{props.products_details.translated_product_description}</span>
                            </Tab>
                        </Tabs>
                    </div>
                </Grid>
            }


            {state.wishList ?
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
                    message="أضيف لقائمة الأماني"
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
                        تمت الإضافة إلى الحقيبة                                </Alert>
                </Snackbar>


            }

            <Grid item xs={12}>
                <ProductReview />
                {/* <SimilarItem categoryID={props.products_details.category_id}  /> */}
                <SimilarItem categoryID={props.products_details.category_id} productID={props.match.params.id} />
                <Footer />
            </Grid>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        products_details: state.productdetail.data,
        isLoading: state.productdetail.isLoading,

    };
};



const mapDispatchToProps = dispatch => {
    return {
        productDetailDispatch: (id) => dispatch(productsDetail(id)),
        authproductDetailDispatch: (token, id) => dispatch(authproductsDetail(token, id)),
        postWishListID: (token, id) => dispatch(postWishListID(token, id)),
        postToCart: (token, size_id) => dispatch(postDataToApi(token, size_id)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));
