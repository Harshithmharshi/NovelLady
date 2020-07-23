import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Footer from "../Arabic_Components/Arabic_Footer";
import { Link } from "react-router-dom";
import Main from "../Arabic_Components/Arabic_Header";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    OrderBody: {
        float:'right',
        marginTop: "20px",
        textAlign: 'justify',
        fontFamily: "Cairo, sans-serif",
        padding: '100px',
        marginLeft: '150px',
        fontWeight:'500'


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
        fontWeight:'500',
        fontFamily: "Cairo, sans-serif",
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
        fontWeight:'500',
        fontFamily: "Cairo, sans-serif",
    },

}));

function Orderplaced(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Main />

            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.OrderBody} >
                        <div>مرحبًا العميل</div>
                        <div className={classes.orderPlacedTitle}>تم تقديم الطلب بنجاح.<span style={{ marginLeft: '20px' }}><CheckCircleOutlineIcon /></span></div>
                        <div style={{ marginTop: "30px",marginBottom: '30px'}}>شكرًا لك على التسوق مع NovelLady</div>
                        <Link to="/" className={classes.shopAgain}>تسوق أكثر</Link>
                    </div>
                </Grid>
            </Grid>
            <div>
                <Footer />
            </div>

        </div>
    );

}


export default Orderplaced;
