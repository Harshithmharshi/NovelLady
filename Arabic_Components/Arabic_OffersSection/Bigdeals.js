import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { connect } from "react-redux";
import { bigDeals } from "../../actions/bigdealsAction";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1320px",
    margin: "auto",
    direction: "rtl"
  },

  dealTitle: {
    fontWeight: "700",
    fontSize: "2rem",
    color: "#212121",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "80px",
    marginBottom: "20px",
    fontFamily: "Cairo, sans-serif",
  },

  carousel: {
    padding: "20px",
    float: "center",
    width: "80%",
    margin: "0 auto",
    // [theme.breakpoints.between('xs','sm')]:{
    //     width:'130%',
    //     marginLeft:'18%',
    // },
    // [theme.breakpoints.between('sm','md')]:{
    //     width:'130%',
    //     marginLeft:'18%',
    // },
    // [theme.breakpoints.between('md','lg')]:{
    //     width:'90%',
    //     marginLeft:'15%',
    // },
    // [theme.breakpoints.between('lg','xl')]:{
    //     width:'80%',
    //     marginLeft:'10%',
    // }
  },

  leftArrow: {
    fontSize: "70px",
    color: "#180022",
    position: "absolute",
    right: "100%",
  },

  rightArrow: {
    fontSize: "70px",
    color: "#180022",
    position: "absolute",
    left: "100%",
  },
}));

function Bigdeals(props) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 20;

  useEffect(() => {
    props.bigDealsDispatch();
  }, []);

  const linkTo = (discount_type, target_name,target_id) => {
    if (discount_type === 'product') {
      return `product/${target_id}`
    } else if (discount_type === 'tag') {
      return `shop/${target_name.replace(/\s/g, '')}?tag_id=${target_id}`
    } else {
      return `shop/${target_name}?category_id=${target_id}`
    }
  };

  const linkReferrer = (discount) => {
    if (discount.hasOwnProperty("tags")) {
      return discount.tags[0];
    }else if(discount.hasOwnProperty("product")) {
        return discount.product[0];
    } else {
        return discount.category[0]
    }
  };

  let BigDeals =
    props.bigdeals_data && props.bigdeals_data.length ? (
      props.bigdeals_data.map((item) => {
        const {discount_type, target_name, target_id, background_image} = item || {};
        return (
          <div className={classes.bigDeals} key={item.id}>
            <Link
              to={{
                pathname: linkTo(discount_type, target_name, target_id),
                state: {
                  referrer: {
                    category: target_id
                  }
                }
              }}
              onClick={() => {
                setTimeout(() => {
                  window.location.reload()
                },10)
              }}
            >
              {" "}
              <img src={background_image} alt={target_name} />
            </Link>
          </div>
        );
      })
    ) : (
      <div className={classes.bigDeals}>
        <Skeleton
          animation="false"
          variant="rect"
          width={800}
          height={360}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          لا توجد صفقات كبيرة متاحة ..
        </Skeleton>
      </div>
    );

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.dealTitle}>صفقات كبيرة</Typography>{" "}
          <br />
          <div className={classes.carousel}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={
                props.width === "lg" || props.width === "xl"
                  ? 3
                  : props.width === "md"
                  ? 2
                  : 1
              }
              leftChevron={<ArrowBackIosIcon className={classes.leftArrow} />}
              rightChevron={
                <ArrowForwardIosIcon className={classes.rightArrow} />
              }
              chevronWidth={chevronWidth}
              infiniteLoop={true}
            >
              {BigDeals}
            </ItemsCarousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bigdeals_data: state.bigdeals.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bigDealsDispatch: () => dispatch(bigDeals()),
  };
};

export default withRouter(
  compose(withWidth(), connect(mapStateToProps, mapDispatchToProps))(Bigdeals)
);
