
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Grid, Typography, Button } from '@material-ui/core';


import { connect } from 'react-redux';

import { listingTag } from '../../actions/tagsAction';
import { productsData } from '../../actions/productsAction';
import Products from '../Products';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: "1320px",
        margin: "auto",
        [theme.breakpoints.down("lg")]: {
            margin: "auto 20px",
        }
    },

    ListTitle: {
        fontWeight: '700',
        fontSize: '2rem',
        color: '#212121',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '80px',
        marginBottom: '20px',
        fontFamily: 'Roboto, sans-serif'
    },


    prodLists: {
        textAlign: 'justify',
        // marginLeft: '2%',
        // marginRight: '10%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        alignContent: 'space-between'
    },



}));



function ProductListItem(props) {
    const classes = useStyles();


    useEffect(() => {
        props.listingTagDispatch();
    }, []);


    return (
        <Grid container className={classes.root} >
            <Grid item xs={12}>
                <Typography className={classes.ListTitle}>{props.listing_tag ? props.listing_tag.name : 'Hot Collections'} </Typography> < br />
            </Grid>
            <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div className={classes.prodLists}>
                    <Products />
                </div>
            </Grid>
        </Grid>
    )
}



const mapStateToProps = state => {
    return {
        listing_tag: state.tags.lisitingTag,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        listingTagDispatch: () => dispatch(listingTag()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
