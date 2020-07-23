import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
//Images
import image1 from "./../../images/brand-mango.png";
import image2 from "./../../images/brand-levis.png";
import image3 from "./../../images/brand-shoppers-stop.png";
import image4 from "./../../images/brand-w.png";
import image5 from "./../../images/brand-splash.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  brandTitle: {
    fontWeight: "700",
    fontSize: "2rem",
    color: "#212121",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "80px",
    marginBottom: "20px",
    fontFamily: "Cairo, sans-serif"
  },

  carousel: {
    textAlign: "center",
    paddingBottom: "50px",
    paddingRight: "20px",

    [theme.breakpoints.up("xs")]: {
      width: "80%",
      marginLeft: "10%"
    }
  },

  leftArrow: {
    fontSize: "70px",
    color: "#180022",
    marginRight: "220px"
  },
  rightArrow: {
    fontSize: "70px",
    color: "#180022",
    marginLeft: "250px"
  }
}));

export default function Shopmorebrands() {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.brandTitle}>
            shop more brands
          </Typography>{" "}
          <br />
          <div className={classes.carousel}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={4}
              leftChevron={<ArrowBackIosIcon className={classes.leftArrow} />}
              rightChevron={
                <ArrowForwardIosIcon className={classes.rightArrow} />
              }
              chevronWidth={chevronWidth}
              infiniteLoop={true}
            >
              <img
                src={image1}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
              <img
                src={image2}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
              <img
                src={image3}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
              <img
                src={image4}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
              <img
                src={image5}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
              <img
                src={image2}
                alt="brands"
                width="200"
                height="160"
                style={{ paddingRight: "50px" }}
              />
            </ItemsCarousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
