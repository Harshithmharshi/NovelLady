import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Images
import appstore from "./../../images/appstore-icon.svg";
import returnwithin30days from "./../../images/30-days-return-icon.png";
import delivery from "./../../images/delivery-icon-footer.png";

import { connect } from "react-redux";
import { fetchCategoryListApiData } from "../../actions/categoryList";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "Cairo, sans-serif",
    whiteSpace: 'norwrap',
    backgroundColor: "#C82257"
  },

  footer: {
    backgroundColor: "#C82257",
    padding: "50px 0px 70px 0px",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "right",
    maxWidth: "1320px",
    margin: "auto"
  },

  footerLink: {
    fontFamily: "Cairo, sans-serif",
    paddingBottom: "8px",
    color: "#ffffff",
    textAlign: "right",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "normal",
    // lineHeight: "2.5rem",
    lineHeight: "1.5rem",

    display: "block",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.4rem !important"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5rem"
    },
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none"
    },
    dir: "rtl"

  },

  footerHeader: {
    fontFamily: "Cairo, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "uppercase",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px"
    }
  },
  shoppingList: {
    fontFamily: "Cairo, sans-serif",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5%",
      marginRight: "1%"
    }
  },

  iconLink: {
    fontsize: "22px",
    paddingLeft: "20px",
    fontWeight: "500"
  },

  icons: {
    paddingRight: "30px",
    [theme.breakpoints.down("sm")]: {
      width: 30
    }
  },

  iconsPara: {
    textAlign: "right",
    fontFamily: "Cairo, sans-serif",
    fontSize: "0.9rem",
    fontWeight: "normal",
    // lineHeight: "2.5rem",
    lineHeight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.4rem !important"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5rem"
    },
  },

  footerHeaderH3: {
    fontFamily: "Cairo, sans-serif",
    dir: "rtl",
    textAlign: "right",
    fontSize: "1rem",
    fontWeight: "400",
    textTransform: "uppercase",
    marginTop: "10px",
    fontFamily: "Cairo, sans-serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px"
    }
  },

  footerList: {
    fontFamily: "Cairo, sans-serif",
    marginTop: "20px",
    textAlign: "right",
    // position: "absolute",
    width: "max-content",
  },

  formList: {
    marginTop: "35px",
    fontFamily: "Cairo, sans-serif",
    [theme.breakpoints.down("sm")]: {
      marginLeft: -40
    }
  },

  footerEmail: {
    fontFamily: "Cairo, sans-serif",
    marginTop: "15px",
    border: "1px solid rgba(36,12,51,0.35)",
    borderRadius: "500px",
    backgroundColor: "#b19cd9",
    fontSize: "14px",
    padding: "10px",
    color: "#ffffff",
    "&:active": {
      border: "1px solid rgba(36,12,51,0.35)",
      borderRadius: "500px",
      backgroundColor: "yellow"
    },
    "&::placeholder": {
      color: "#ffffff"
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%"
    }
  },

  footerBtn: {
    backgroundColor: "#16071F",
    border: "none",
    color: "#ffffff",
    textTransform: "uppercase",
    fontWeight: "700",
    padding: "12px 35px",
    marginTop: "15px",
    borderRadius: "500px",
    marginLeft: "-30px",
    zIndex: "99",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
      marginLeft: -25,
      paddingLeft: 26
    }
  },

  followSocialMedia: {
    fontFamily: "Cairo, sans-serif",
    textTransform: "uppercase",
    marginTop: "20px",
    fontSize: "1rem",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      marginRight: "90px",
      fontSize: 14
    }
  },

  appStore: {
    display: "inline-block",
    position: "relative",
    marginRight: "77px"
  },

  appLink: {
    fontFamily: "Cairo, sans-serif",
    position: "absolute",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "70px"
    }
  },

  socialMediaIconList: {

    paddingRight: "30px",
    display: "flex",
  },

  socialMediaIcon: {

    paddingTop: "10px",
    // paddingRight: "40px",
    color: "white !important",
    "&:hover": {
      cursor: "pointer",
      color: "#b19cd9"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
      paddingRight: 28
    }
  },

  subscribe: {
    textTransform: "uppercase",
    marginTop: "40px",
    fontFamily: "Cairo, sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".6rem",
      marginLeft: -55,
      letterSpacing: 0.4
    }
  },

  languages: {
    fontFamily: "Cairo, sans-serif",
    marginRight: "180px",
    marginTop: "25px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "100px"
    }
  },

  languageSelect: {
    display: "inline-block",
    textDecoration: "none",
    marginTop: "10px",
    color: "white"
  },

  copyrightFooter: {
    fontFamily: "Cairo, sans-serif",
    paddingTop: "30px",
    paddingBottom: "30px",
    // backgroundColor: "#180022",

    backgroundColor: "#240C33",

    display: "flex",
    justifyContent: "center",
    color: "white"
  },

  appstore_image: {
    width: "120px",
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      marginTop: "-5px"
    }
  },

  playstore_img: {
    width: "146px",
    [theme.breakpoints.down("sm")]: {
      width: "100px"
    }
  },


}));

function Footer(props) {
  const classes = useStyles();
  const regex = /\s/g;

  useEffect(() => {
    props.categoryDispatch();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={12}>
          <div className={classes.footer}>
            <Router>
              <div style={{ float: 'left', marginRight: '100px', marginLeft: '20px' }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      src={returnwithin30days}
                      alt="30 days return icon"
                      className={classes.icons}
                    />
                  </div>
                  <div >
                    <Typography className={classes.iconsPara}> العودة في غضون 30 يوما من تلقي طلبك</Typography>
                  </div>
                </div>

                <div style={{ display: "flex", marginTop: '50px' }}>
                  <div>
                    <img
                      src={delivery}
                      alt="free delivery icon"
                      className={classes.icons}
                    />
                  </div>
                  <div>
                    <Typography className={classes.iconsPara} >احصل على توصيل مجاني لكل طلب يزيد عن 99 دولارًا</Typography>
                  </div>
                </div>
              </div>


              <div className={classes.downloadlink} style={{ marginRight: '20%' }}>
                <h4 className={classes.footerHeader}>احصل على تطبيق Novel Lady الآن</h4>
                <div className={classes.appStore}>
                  <Link to="/">
                    <img
                      alt="Get it on Google Play"
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className={classes.playstore_img}
                    />
                  </Link>
                  <Link to="/" className={classes.appLink}>
                    <img
                      alt="Get it on App Store"
                      src={appstore}
                      className={classes.appstore_image}
                    />
                  </Link>
                </div>
                <h3 className={classes.followSocialMedia}>اتبعنا</h3>
                <div className={classes.socialMediaIconList}>
                  <i className="fab fa-twitter" style={{ fontSize: "1.6rem", paddingRight: 50 }}></i>
                  <i className="fab fa-facebook-square" style={{ fontSize: "1.6rem", paddingRight: 50 }}></i>
                  <i className="fab fa-instagram" style={{ fontSize: "1.6rem", paddingRight: 50 }}></i>
                </div>
                {/* <h3 className={classes.subscribe}>
                  Subscribe for Novel Lady News
                </h3> */}
              </div>


              <div className={classes.usefulList} style={{ marginRight: '15%', }}>
                <h4 className={classes.footerHeaderH3}>روابط مفيدة</h4>
                <div className={classes.footerList}>
                  <Link to="/" className={classes.footerLink}>
                  اتصل بنا
                  </Link>
                  <Link to="/" className={classes.footerLink}>
                  التعليمات
                  </Link>
                  <Link to="/" className={classes.footerLink}>
                  ر & ج
                  </Link>
                  <Link to="/" className={classes.footerLink}>
                  تتبع الطلبات
                  </Link>
                  <Link to="/" className={classes.footerLink}>
                  الشحن
                  </Link>
                  <Link to="/" className={classes.footerLink}>
                  عائدات
                  </Link>
                </div>


              </div>
              {/* <div className={classes.formList}>
                  <form
                    action="#!"
                    method="post"
                    encType="multipart/form-data"
                    id="footerSubscription"
                  >
                    <input
                      type="email"
                      className={classes.footerEmail}
                      name="emailId"
                      placeholder="Your email id"
                    />
                    <button type="submit" className={classes.footerBtn}>
                      Subscribe
                    </button>
                  </form>
                </div> */}
              {/* <div className={classes.languages}>
                  <Router>
                    <Link to="/" className={classes.languageSelect}>
                      English
                    </Link>{" "}
                    /{" "}
                    <Link to="/" className={classes.languageSelect}>
                      عربى
                    </Link>
                  </Router>
                </div> */}

              <div className={classes.shoppingList} style={{ marginRight: '10%', height: '20%', }}>
                <h4 className={classes.footerHeaderH3}>Shopping</h4>
                <div className={classes.footerList}>
                  {props.category.map(item => (
                    <Link
                      key={item.id}
                      to={{
                        pathname: `/shop/${item.name.toString().replace(regex, '')}?category_id=${item.id}`,
                      }}
                      onClick={() => {
                        setTimeout(() => {
                          window.location.reload()
                        }, 10)
                      }}
                      className={classes.footerLink}
                    >
                      {item.translated_name}
                    </Link>
                  ))}
                </div>
              </div>

            </Router>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.footer} style={{ paddingTop: (props.category.length / 2), marginTop: 0 }} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.copyrightFooter}>
          <div>&copy; 2020 رواية سيدة. كل الحقوق محفوظة</div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
