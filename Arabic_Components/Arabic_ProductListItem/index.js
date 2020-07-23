
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Grid, Typography, Button } from '@material-ui/core';


import { connect } from 'react-redux';

import { listingTag } from '../../actions/tagsAction';
import { productsData } from '../../actions/productsAction';
import Products from '../Arabic_Products';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    ListTitle: {
        fontWeight: '700',
        fontSize: '2rem',
        color: '#212121',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '80px',
        marginBottom: '20px',
        fontFamily: 'Cairo, sans-serif'
    },


    prodLists: {
        textAlign:'justify',
        marginLeft:'10%',
        marginRight:'2%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'space-around'
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
                <Typography className={classes.ListTitle}>{props.listing_tag ? props.listing_tag.translated_name : 'Hot Collections'} </Typography> < br />
            </Grid>
                <Grid container item xs={12} direction="row-reverse">
                    <div className={classes.prodLists}>
                    {props.listing_tag ? 
                        <Products listingID={props.listing_tag.listingID}/>
                        : <Products listingID={1}/>
}
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
