import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Grid, Select, FormControl, TextField, Button,
    Dialog, DialogActions, DialogContent, Typography,
} from "@material-ui/core";
//icons
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import { AddReview, getReviewDetails, customerReviewDetails, EditReview } from '../../actions/productReviewAction';
import _ from 'lodash';

// import FileBase64 from 'react-file-base64';

// // const base64 = require('base-64');
// const utf8 = require('utf8');
const Moment = require('moment');
const imageToBase64 = require('image-to-base64');

// const base64Img = require('base64-img');

var base64 = require('file-base64');

// var base64Img = require('base64-img');

var fs = require('fs');

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        // position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        outline: 'none',
        float:'left'
    },

});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    reviewTitle: {
        fontWeight: '600',
        fontSize: '40px',
        color: '#212121',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '10%',
        marginBottom: '3%'
    },

    sortBy_section: {
        display: 'flex',
        marginTop: '3%',
        float:'left',
        marginLeft: '5%',
    },

    sortby_title: {
        fontSize: '18px',
        fontWeight: 'normal',
        textTransform: 'capitalize',
    },

    formControl: {
        marginTop: '-5%',
        paddingLeft: '8%',
        height: '20px'
    },

    ratingBlock: {
        backgroundColor: '#C82257',
        color: 'white',
        padding: '5px 10.5px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '0.25rem',
    },
    reviewBody: {
        textAlign: 'right',
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: 'normal',
        width: '85%'
    },

    image_captured: {
        border: '0.5px solid grey',
        width: '60px',
        height: '70px',
        borderRadius: '5px',
    },

    review_section: {
        marginLeft: '5%',
        textAlign: 'right',
    },

    review_name: {
        marginTop: '1%',
        fontSize: '16px',
        fontWeight: '400',
        color: 'grey',
        marginRight:'4%',
    },

    line: {
        backgroundColor: 'grey',
        height: '0.5px',
        width: '96%',
        marginTop: '1%',
        marginBottom: '1%'
    },

    colorBody: {
        display: 'flex',
        marginTop: '3%',
    },



    createReview: {
        display: 'block',
        padding: '5px',
        textAlign: 'right',
        // width: '80%',
        // textTransform: 'capitalize'
    },

    reviewInput: {
        padding: '10px',
    }


}));

function ProductReview(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [createreview, setReview] = useState({
        product_id: '',
        review_image: null,
        title: '',
        description: '',
        rating: '',
        id: '',
        error: false,
        errors: {},
    });
    const [reviewData, setReviewData] = useState('');
    const [isEdit, setEdit] = useState(false);


    useEffect(() => {
        setReviewData(props.getReview.reviews);
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            props.reviewDetailDispatch(props.match.params.id);
            // props.reviewDetailDispatch(props.location.state.id);
            props.customerReviewDispatch(localStorage.getItem("user_token"), props.match.params.id);
            // props.customerReviewDispatch(localStorage.getItem("user_token"), props.location.state.id);
            setReviewData(props.getReview.reviews);
        }, 1000);
        return () => clearInterval(interval);
    }, [props.getReview.reviews]);




    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        let fileImages = _.toArray(e.target.files).map(img => {
            const imageName = img.name;


            const type = img.type;

            // const bytes = utf8.encode(imageName);
            // const encoded = base64.encode(bytes);



            // console.log(encoded)

            // console.log(`data:${type};base64,${encoded}`);
            // return {
            //     images: `data:${type};base64,${encoded}`
            // }
        });

        setReview({
            ...createreview,
            [name]: value,
            product_id: props.match.params.id,
            review_image: fileImages
        });
    };



    const handleClickOpen = () => {
        // if (!localStorage.getItem("user_token")) {
        //     props.history.push('/customer/login');
        // }
        // else {
        //     setOpen(true);
        // }

        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };




    const handleReviewData = () => {
        let errors = {};
        let formIsValid = true;

        if (!createreview.title || !createreview.description || !createreview.rating) {
            formIsValid = false;
            createreview.error = true;
            errors["title"] = "Cannot be empty";
            errors["description"] = "Cannot be empty";
            errors["rating"] = "Cannot be empty";
        } else {
            createreview.error = false;
            formIsValid = true;
            errors["title"] = "";
            errors["description"] = "";
            errors["rating"] = "";
        }
        setReview({ ...createreview, errors: errors });
        return formIsValid;
    };



    const submitReview = (event) => {
        event.preventDefault();
        let add_review = {
            product_id: props.match.params.id,
            review_image: createreview.review_image,
            title: createreview.title,
            description: createreview.description,
            rating: createreview.rating,

        };

        if (handleReviewData() && !isEdit) {
            props.AddReviewDispatch(localStorage.getItem("user_token"), add_review);
            setReview({
                ...createreview,
                product_id: '',
                review_image: '',
                title: '',
                description: '',
                rating: '',

            });
            setOpen(false);
            // document.getElementById('createReview').style.visibility = "hidden";

        }
        else if (handleReviewData() && isEdit) {
            props.EditReviewDispatch(localStorage.getItem("user_token"), createreview, createreview.id);
            setReview({
                ...createreview,
                product_id: '',
                review_image: '',
                title: '',
                description: '',
                rating: '',

            });
            setOpen(false);

        }
        else {
            setOpen(true);
        }
    }

    const handleEdit = (event, data) => {
        event.preventDefault();
        setEdit(!isEdit);
        setReview({
            ...createreview,
            id: data.id,
            review_image: data.review_image,
            title: data.title,
            description: data.description,
            rating: data.rating,
            errors: {}
        });
        setOpen(true);
    }





    const handleChange = (event) => {
        const sortBy = event.target.value;
        if (sortBy === 'Oldest') {
            const oldReviews = _.toArray(reviewData).sort((a, b) => new Moment(b.review_date).format('YYYYMMDD') - new Moment(a.review_date).format('YYYYMMDD'));
            setReviewData(oldReviews);
        } else if (sortBy === 'Most Recent') {
            const RecentReviews = _.toArray(reviewData).sort((a, b) => new Moment(a.review_date).format('YYYYMMDD') - new Moment(b.review_date).format('YYYYMMDD'));
            setReviewData(RecentReviews);
        } else {
            setReviewData(reviewData)
        }
    }


    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} >
                    <h1 className={classes.reviewTitle}>آراء العملاء</h1>
                    <h4 style={{ textAlign: 'center' }}> {props.getReview.avg_rating} متوسط ​​تقييم <i className="fas fa-star nlColour" style={{ color: '#C82257' }}></i></h4>
                    <div className={classes.sortBy_section}>
                        <p className={classes.sortby_title}>صنف حسب</p>
                        <FormControl required variant="outlined" className={classes.formControl}>
                            <Select
                                native
                                autoWidth={true}
                                style={{ color: '#C82257' }}
                                onChange={handleChange}
                            >
                                <option value="Most Recent" >الأحدث</option>
                                <option value="Oldest">الأقدم</option>
                            </Select>
                        </FormControl>
                    </div>

                    {props.customerReview && props.customerReview.length ? '' :
                        <div className={classes.createReview} style={{ marginRight: '3%', marginTop:'9%' }} id="createReview">
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>راجع هذا المنتج</h4>
                            <p style={{ fontSize: '14px' }}>مشاركة أفكارك مع زبائن آخرين</p>

                            {/* {localStorage.getItem("user_token") ?
                                <Button
                                    onClick={() => handleClickOpen()}
                                    style={{ fontSize: '14px', textTransform: 'capitalize', marginBottom: '3%' }}
                                    variant="contained"
                                    color="primary"
                                >Write a Product Review
                                </Button>
                                :
                                <Link
                                    to={{
                                        pathname: '/customer/login',
                                        state: {
                                            referrer: '/review',
                                        }
                                    }}
                                >
                                    <Button
                                        onClick={() => handleClickOpen()}
                                        style={{ fontSize: '14px', textTransform: 'capitalize', marginBottom: '3%' }}
                                        variant="contained"
                                        color="primary"
                                    >Write a Product Review
                                    </Button>
                                </Link>
                            }
                        </div>
                    } */}

                            {localStorage.getItem("user_token") ?
                                <Button
                                    onClick={() => handleClickOpen()}
                                    style={{ fontSize: '14px', textTransform: 'capitalize', marginBottom: '3%' }}
                                    variant="contained"
                                    color="primary"
                                >اكتب مراجعة للمنتج
                                </Button>
                                : ''}
                        </div>
                        }





                    <Dialog fullWidth={true}
                        maxWidth={'md'} onClose={handleClose} open={open} >
                        <DialogTitle id="customized-dialog-title"  onClose={handleClose}>
                            <div className={classes.createReview} style={{float:'right',fontSize: '22px', fontWeight: '500', paddingBottom: '10px',  }}>إنشاء مراجعة</div>
                        </DialogTitle>

                        <DialogContent dividers>
                            <form className={classes.createReview} noValidate autoComplete="off">
                                <label style={{ float: "right" }}>تقييم عام</label><br />
                                <FormControl fullWidth variant="outlined" style={{float:'right'}}>
                                    <Select
                                        fullWidth
                                        native
                                        value={createreview.rating || ""}
                                        name="rating"
                                        onChange={handleReviewChange}
                                        error={createreview.error}
                                        inputProps={{min: 0, style: { textAlign: 'right'}}}
                                    >
                                        <option value="" disabled>
                                            حدد القيمة
                                        </option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                                <label style={{ float: "right" }}>أضف عنوانًا</label>
                                <br />
                                <TextField
                                    fullWidth
                                    placeholder="ما هو أهم شيء يجب معرفته"
                                    variant="outlined"
                                    value={createreview.title}
                                    name="title"
                                    onChange={handleReviewChange}
                                    required={true}
                                    helperText={createreview.errors["title"]}
                                    error={createreview.error}
                                    inputProps={{min: 0, style: { textAlign: 'right'}}}
                                />
                                <br />
                                <br />
                                <label style={{ float: "right" }}>اكتب مراجعتك</label>
                                <br />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows="4"
                                    variant="outlined"
                                    value={createreview.description}
                                    name="description"
                                    onChange={handleReviewChange}
                                    required={true}
                                    helperText={createreview.errors["description"]}
                                    error={createreview.error}
                                    inputProps={{min: 0, style: { textAlign: 'right'}}}

                                />
                                <br />
                                <br />
                                {/* <label>Add a photo</label>
                                <br />
                                <input
                                    type="file"
                                    multiple

                                    onChange={handleReviewChange}
                                />

                                <br />
                                <br /> */}

                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                style={{marginRight:'85%', width: '15%', fontSize: '18px', fontWeight: '300',backgroundColor: "#C82257" }}
                                variant="contained"
                                onClick={submitReview}>
                                إرسال
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {localStorage.getItem('user_token') && props.customerReview && props.customerReview.length && props.customerReview['0'].status === 'Approved' ?
                        props.customerReview.map((item, index) => {
                            return (<div className={classes.review_section} key={index}>
                                <p ><span className={classes.ratingBlock}><span style={{ paddingRight: '5px' }}>{item.rating}</span><i className="fas fa-star"></i></span><span style={{ marginLeft: '2%', textTransform: 'capitalize' }}>{item.title}
                                    {item.status === 'Approved' ? <>
                                        <IconButton aria-label="edit" style={{ marginLeft: '1%', outline: 'none' }}>
                                            <CreateIcon fontSize="small" onClick={(event) => handleEdit(event, item)} />
                                        </IconButton>
                                    </> : ''}  </span></p>

                                <p className={classes.reviewBody}>{item.description}</p>
                                <div className={classes.colorBody}>
                                    {item.review_image.map(images => {
                                        return (<div className={classes.image_captured}>
                                            <img src={images.images} alt="file" width='65' height='80' style={{ marginLeft: '10px', }} />
                                        </div>)
                                    })}
                                </div>
                                <p className={classes.review_name}><span style={{ textTransform: 'capitalize' }}>{item.user_name.slice(0, item.user_name.indexOf("@"))}</span> على {item.review_date}</p>
                                <div className={classes.line}></div>
                            </div>

                            )
                        }) : ''}

                    {_.toArray(reviewData).map((item, index) => {
                        return (<div style={{ paddingBottom: '20px', }} key={index}>
                            <div className={classes.review_section}>
                                <p ><span className={classes.ratingBlock}><span style={{ paddingRight: '5px' }}>{item.rating}</span><i className="fas fa-star"></i></span><span style={{ marginLeft: '2%', textTransform: 'capitalize', marginRight:'4%' }}>{item.title}</span></p>
                                <p className={classes.reviewBody}>{item.description}</p>
                                <div className={classes.colorBody}>
                                    {item.review_image.map(images => {
                                        return (<div className={classes.image_captured}>
                                            <img src={images.images} alt="file" width='65' height='80' style={{ padding: '2px', }} />
                                        </div>)
                                    })}
                                </div>
                                <p className={classes.review_name}><span style={{ textTransform: 'capitalize' }}>{item.user_name.slice(0, item.user_name.indexOf("@"))}</span> على {item.review_date}</p>
                                <div className={classes.line}></div>
                            </div>
                        </div>
                        )
                    })}


                </Grid>
            </Grid>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        addreview: state.addreview.data,
        editreview: state.getEditReviewDetails.data,
        isUserLogin: state.addreview.isUserLogin,
        getReview: state.getReviewDetails.data,
        customerReview: state.getCustomerReviewDetails.data
    };
};


const mapDispatchToProps = dispatch => {
    return {
        AddReviewDispatch: (token, data) => dispatch(AddReview(token, data)),
        reviewDetailDispatch: (id) => dispatch(getReviewDetails(id)),
        customerReviewDispatch: (token, id) => dispatch(customerReviewDetails(token, id)),
        EditReviewDispatch: (token, data, id) => dispatch(EditReview(token, data, id)),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductReview));
