import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { compose } from 'redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import './stylegallery.scss';
import { connect } from "react-redux";
import { fetchCategoryListApiData } from "../../actions/categoryList";
import withWidth from '@material-ui/core/withWidth';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  galleryTitle: {
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
    position: "relative",
    marginLeft: "18%",
    paddingBottom: "50px",
    [theme.breakpoints.up("xs")]: {
      width: "82%",
    },
  },

  leftArrow: {
    position: "absolute",
    bottom: "50%",
    fontSize: "100px",
    color: "#180022",
    [theme.breakpoints.down("md")]: {
      marginLeft: "27px"
    }
  },

  viewAll: {
    whiteSpace: "nowrap",
    position: "absolute",
    // marginTop: "3%",
    marginLeft: "8%",
    color: "#C82257",
    fontSize: "15px",
    fontWeight: "700",
    textDecoration: "none",
    "&:hover": {
      color: "#C82257",
      textDecoration: "none",
      cursor: "pointer",
    },
  },

  prodTitle: {
    position: "absolute",
    fontSize: "14px",
    fontWeight: "normal",
    backgroundColor: "black",
    padding: "20px",
    fontFamily: 'Cairo, sans-serif',
    fontWeight: '400',
    // marginLeft: "9px",
    marginTop: "-3px",
    width: 240,
    textAlign: 'center',
    top: 310,
    // width: "94%"
    // [theme.breakpoints.up("xs")]: {
    //   width: "74%"
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "63%",
    //   marginLeft: "3px",
    //   paddingRight: "33px"
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "75%",
    //   marginLeft: "3px",
    //   paddingRight: "26px"
    // },

    // [theme.breakpoints.up("lg")]: {
    //   width: "72%",
    //   marginLeft: "23px",
    //   paddingRight: "14px"
    // },
    // [theme.breakpoints.between("lg", "xl")]: {
    //   width: "79%",
    //   marginLeft: "6px",
    //   paddingRight: "21px"
    // },
    // [theme.breakpoints.up("xl")]: {
    //   width: "64%",
    //   marginLeft: "83px",
    //   paddingRight: "0px"
    // },
    // [theme.breakpoints.up("xs")]: {
    //   width: "74%"
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "62%",
    //   marginLeft: "31px",
    //   paddingRight: "33px"
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "71%",
    //   marginLeft: "16px",
    //   paddingRight: "26px"
    // },
    // [theme.breakpoints.between("md","lg")]: {
    //   width: "67.4%",
    //   marginLeft: "24px",
    //   paddingRight: "26px"
    // },
    // [theme.breakpoints.up("lg")]: {
    //   width: "76.4%",
    //   marginLeft: "7px",
    //   paddingRight: "26px"
    // },
  },

  prodLink: {
    textDecoration: "none",
    color: "white"
  },

  image: {
    height: "362px",
    width: "240px",
    // [theme.breakpoints.down("md")]: {
    //   height: "362px",
    //   width: "151px"
    // },
    // [theme.breakpoints.up("md")]: {
    //   height: "362px",
    //   width: "200px"
    // },
    // [theme.breakpoints.up("lg")]: {
    //   height: "362px",
    //   width: "240px"
    // },
    // [theme.breakpoints.up("xl")]: {
    //   height: "362px",
    //   width: "340px"
    // }
  }
}));

function Stylegallery(props) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 400;
  const all = 'all';

  useEffect(() => {
    props.categoryDispatch();
  }, []);

  const regex = /\s/g;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>

          <Typography className={classes.galleryTitle}>
            معرض ستايل{" "}
          </Typography>{" "}
          <br />

          <div className={classes.carousel} >
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={
                props.width === "lg" || props.width === 'xl' ? 4 : props.width === "md" ? 3 : 2
              }
              chevronWidth={chevronWidth}
              infiniteLoop={true}
              alwaysShowChevrons={true}
              slidesToScroll={1}
              outsideChevron={true}
              leftChevron={
                <div>
                  <KeyboardArrowLeftIcon className={classes.leftArrow} />

                  <Link to={{
                    pathname: `shop/${all}?category_id=${all}`,
                    state: {
                      referrer: 'all',
                      breadcumrb_name: 'All',
                      translated_shop: 'متجر',
                      translated_name: 'الكل'
                    }
                  }}
                    onClick={() => {
                      setTimeout(() => {
                        window.location.reload()
                      }, 10)
                    }}
                    className={classes.viewAll}>
                    عرض الكل
                    </Link>

                </div>
              }
            >

              {props.category && props.category.length ?
                props.category.map(item => (
                  <Link to={{
                    pathname: `/shop/${item.name
                      .toString()
                      .replace(regex, "")}?category_id=${item.id}`,
                  }}
                    onClick={() => {
                      setTimeout(() => {
                        window.location.reload()
                      }, 10)
                    }}
                    className={classes.prodLink}>

                    <div key={item.id} className={classes.container} style={{ overflow: "hidden", position: 'relative', textAlign: 'justify' }}>
                      <img
                        className={classes.image}
                        src={item.background_image}
                        alt={item.description}
                      />
                      <div className={`${classes.prodTitle} prodTitle`} >
                        {item.translated_name}
                      </div>
                    </div>

                  </Link>))
                :
                <div className={classes.container} style={{ display: "flex" }}>
                  <div>
                    <Skeleton
                      animation="false"
                      variant="rect"
                      width={240}
                      height={360}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      NovelLady
                    </Skeleton>
                    <Skeleton
                      animation="false"
                      variant="text"
                      width={240}
                      height={50}
                    />
                  </div>
                  <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <Skeleton
                      animation="false"
                      variant="rect"
                      width={240}
                      height={360}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      NovelLady
                    </Skeleton>
                    <Skeleton
                      animation="false"
                      variant="text"
                      width={240}
                      height={50}
                    />
                  </div>
                  <div style={{ paddingLeft: "20%" }}>
                    <Skeleton
                      animation="false"
                      variant="rect"
                      width={240}
                      height={360}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      NovelLady
                    </Skeleton>
                    <Skeleton
                      animation="false"
                      variant="text"
                      width={240}
                      height={50}
                    />
                  </div>
                  <div style={{ paddingLeft: "30%" }}>
                    <Skeleton
                      animation="false"
                      variant="rect"
                      width={240}
                      height={360}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      NovelLady
                    </Skeleton>
                    <Skeleton
                      animation="false"
                      variant="text"
                      width={240}
                      height={50}
                    />
                  </div>
                </div>

              }
            </ItemsCarousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    category: state.categoryData.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryDispatch: () => dispatch(fetchCategoryListApiData())
  };
};

export default withRouter(
  compose(
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
  )(Stylegallery));;


