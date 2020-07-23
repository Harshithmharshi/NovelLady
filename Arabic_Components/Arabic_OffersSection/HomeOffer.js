import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchHomeOfferApiData } from "../../actions/home_offer";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "1320px",
    margin: "auto",
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: "2rem",
    color: "#212121",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "40px",
    marginBottom: "30px",
    fontFamily: "Cairo, sans-serif"
  },
  shopLink: {
    backgroundColor: "#000000",
    color: "#ffffff",
    position: "absolute",
    left: "50%",
    marginLeft: "-120px",
    textAlign: "center",
    fontSize: "1.3rem",
    fontWeight: "700",
    padding: "20px 65px",
    borderRadius: "500px",
    marginTop: "-150px",
    textTransform: "uppercase",
    fontFamily: "Cairo, sans-serif",
    [theme.breakpoints.down("md")]: {
      marginTop: "-85px",
      padding: "10px 32px"
    }
  },
  imagegrp: {
    [theme.breakpoints.up("xs")]: {
      right: "5%"
    }
  }
}));

function CenteredGrid(props) {
  const classes = useStyles();
  useEffect(() => {
    props.offers();
  }, []);

  const checkUrl = () => {
    if (typeof props.offersM !== 'undefined') {
      const link = props.offersM.map(item => item.target_link);
      return link.toString()
    }
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>
          عروض لا يمكنك تفويتها
          </Typography>
          <br />
          <div className={classes.imagegrp}>
            {props.offersM && props.offersM.map(item => (
              <div
                key={item.offer_image_url}
                
              >
                {props.offersM.length > 0 ?
                  <img
                    width={"88%"}
                    style={{ backgroundSize: "cover" }}
                    key={item.offer_image_url}
                    src={item.offer_image_url}
                    alt="Offers you cannot miss"
                  />
                  :
                  <Skeleton variant="rect" width="88%" height="200" />
                }
              </div>
            ))

            }
          </div>
          <Link to={checkUrl()} className={classes.shopLink}>
          تسوق الآن
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    offersM: state.homeOffer.homeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    offers: () => dispatch(fetchHomeOfferApiData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CenteredGrid);
