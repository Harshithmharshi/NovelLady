import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';

//Images
import image1 from './../../images/image-01.png';
import image2 from './../../images/image-02.png';
import image3 from './../../images/image-03.png';
import image4 from './../../images/image-04.png';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: -1000
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
        marginLeft: '38px',
        paddingBottom: '50px',
        [theme.breakpoints.up('xs')]: {
            width: '75%',
        },
        zIndex: -1
    },


    rightArrow: {
        position: 'absolute',
        marginLeft: '90px',
        fontSize: '100px',
        color: '#180022'
    },

    viewAll: {
        position: 'absolute',
        marginLeft: '110px',
        marginTop: '100px',
        color: '#C82257',
        fontSize: '15px',
        fontWeight: '700',
        textDecoration: 'none',
        "&:hover": {
            color: '#C82257',
            textDecoration: 'none',
            cursor: "pointer"
        }
    },

    hoveredButtons: {
        display: 'flex',
        position: 'absolute',
        marginLeft: '30px',
        marginTop: '-45px',
        width: '250px'

    },

    prodDetails: {
        textAlign: 'justify',
        marginLeft: '55px',
        marginTop: '15px'
    },

    prodName: {
        fontSize: '16px',
        fontWeight: '400',
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            color: ' #C82257',
            textDecoration: 'none'
        }
    },

    prodPrice: {
        marginTop: '10px'
    }

}));


function Newarrivals(props) {
    const classes = useStyles();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [hover, sethover] = useState(false);
    const chevronWidth = 40;


    // console.log(props.data);

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} style={{maxWidth:'1320px', margin:'auto'}}>
                    <Typography className={classes.arrivalTitle}>new arrivals </Typography> < br />
                    <div className={classes.carousel}>
                        <ItemsCarousel
                            requestToChangeActive={setActiveItemIndex}
                            activeItemIndex={activeItemIndex}
                            numberOfCards={4}
                            chevronWidth={chevronWidth}
                            infiniteLoop={true}
                            rightChevron={
                                <div>
                                    <KeyboardArrowRightIcon className={classes.rightArrow} />
                                    <Router>
                                        <Link to="/" className={classes.viewAll} >View All</Link>
                                    </Router>
                                </div>
                            }
                        >

                            <div>
                                <img src={image1} alt="Vero Moda" className={classes.prodImage}
                                    onMouseOver={() => sethover(true)}
                                    onMouseOut={() => sethover(false)}
                                />
                                {hover ?
                                    <div className={classes.hoveredButtons}>
                                        <Button style={{ marginRight: '20px',  outline:'none', }} variant="contained" color="secondary">Add to bag</Button>
                                        <Button variant="contained" style={{  outline:'none'}}>wishlist</Button>
                                    </div>
                                    : ''
                                }

                                <div className={classes.prodDetails}>
                                    <Router>
                                        <Link to="#!" className={classes.prodName}>Mock Neck Suite</Link>
                                    </Router>
                                    <p>Women Black Solid</p>
                                    <span className={classes.prodPrice}>$109</span>
                                </div>
                            </div>


                            <div>
                                <img src={image2} alt="Vero Moda" />
                                <div className={classes.prodDetails}>
                                    <Router>
                                        <Link to="#!" className={classes.prodName}>Mock Neck Suite</Link>
                                    </Router>
                                    <p>Women egular Fit</p>
                                    <span className={classes.prodPrice}>$109</span>
                                </div>
                            </div>

                            <div>
                                <img src={image3} alt="Vero Moda" />
                                <div className={classes.prodDetails}>
                                    <Router>
                                        <Link to="#!" className={classes.prodName}>Sassafras</Link>
                                    </Router>
                                    <p>Women Black Solid</p>
                                    <span className={classes.prodPrice}>$109</span>
                                </div>
                            </div>

                            <div>
                                <img src={image4} alt="Vero Moda" />
                                <div className={classes.prodDetails}>
                                    <Router>
                                        <Link to="#!" className={classes.prodName}>Vero Moda</Link>
                                    </Router>
                                    <p>Women egular Fit</p>
                                    <span className={classes.prodPrice}>$109</span>
                                </div>
                            </div>
                        </ItemsCarousel>
                    </div>
                </Grid>

            </Grid>
        </div >
    );
};


const mapStateToProps = state => {
    return {
        data: state.data
    };
};

export default connect(mapStateToProps, null)(Newarrivals);
