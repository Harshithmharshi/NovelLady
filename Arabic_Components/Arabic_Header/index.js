import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Grid, Typography, Button, InputBase, Dialog } from "@material-ui/core";
import { bannerList } from "../../actions/bannerListAction";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { BrowserRouter, Link, withRouter, Redirect } from "react-router-dom";
import {
  MenuItem,
  Grow,
  Popper,
  ClickAwayListener,
  MenuList,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";

// Images
import logo from "./../../../src/images/nl-logo-white@2x.png";
import wishlist from "./../../../src/images/heart@2x.png";
import customerSupport from "./../../../src/images/customer-service@2x.png";
import language from "./../../../src/images/globe@2x.png";
import mybag from "./../../../src/images/shopping-bag-icon.svg";
import profile from "./../../../src/images/profile-icon.svg";
import seasonSale from "./../../../src/images/top-offer-banner-ar.png";
import { fetchCategoryListApiData } from "../../actions/categoryList";
import { fetchUserProfileApi } from "../../actions/user_profile";
import Skeleton from "@material-ui/lab/Skeleton";
import _ from "lodash";
import { searchData } from "../../actions/searchAction";
import Shop from "../Arabic_shop";
import { browserHistory } from 'react-router';

const jwt = require('jsonwebtoken');


const useStyles = makeStyles((theme) => ({


  root: {
    flexGrow: 1,

  },

  NavBar: {
    position: "absolute",
    height: "100px",
    width: "100%",
    backgroundColor: "#C82257",

  },

  centered: {
    position: "absolute",
    top: "60%",
    right: "5%",
  },

  typoH1: {
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#240C33",
    fontSize: "3.7rem",
    fontFamily: "Cairo, sans-serif",
    marginBottom: "0.5rem",
  },

  typoPara: {
    fontSize: "19px",
    lineHeight: "24px",
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },

  btn: {
    fontWeight: "400",
    fontSize: "20px",
    textTransform: "uppercase",
    border: "1px solid #240C33",
    padding: "8px 18px",
    borderRadius: "500px",
    color: "#ffffff",
  },

  NovelLady_logo: {
    position: "relative",
    // top: 0,
    // marginBottom: '55px',
    // marginRight: '20px',
    // marginLeft: '83%'
    marginTop: '-43px',
    marginRight: '50px',
    float: 'right',
    // zIndex: '1'
  },


  searchBar: {
    position: "absolute",
    top: 21,
    borderRadius: theme.shape.borderRadius,
    // display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",

    // [theme.breakpoints.up("xs")]: {
    //   left: "25%",
    // },
    // [theme.breakpoints.down("md")]: {
    //   left: "29%",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   left: "34%",
    // },
  },


  Htmlinput: {
    textAlign: 'right',
    border: "1px solid black",
    borderRadius: "500px",
    paddingRight: '50px',
    padding: "10px",
    fontSize: '18px',
    color: 'black',
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Cairo, sans-serif",
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      outline: 0
    },
    width: "45%",



    // [theme.breakpoints.up("xs")]: {
    //   width: "650px",
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "430px",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   width: "230px",
    // },
  },

  topIcons: {
    // position: "absolute",
    marginTop: "30px",
    marginLeft: "30px",
    zIndex: '1000',
    [theme.breakpoints.up("xs")]: {
      right: "0.5%",
      marginLeft: '2px'
      // paddingRight: "3px",
    },
  },

  topNavLink: {
    backgroundColor: '#240C33',
    fontSize: '13px',
    fontFamily: "Cairo, sans-serif",
    position: 'relative',
    width: '100%',
    height: '50%',
    marginTop: '85px',
    zIndex: '500',
    whiteSpace: "normal",
    float: 'right'
    // "&:first-child": {
    //   paddingRight: "22px",
    // },

  },


  navLink: {
    float: 'right',
    marginLeft: '20px',
    marginRight: '50px',
    paddingTop: "20px",
    color: 'white',
    textDecoration: "none",
    fontFamily: "Cairo, sans-serif",
    color: 'white',
    fontSize: "1rem",
    fontWeight: "400",
    "&:hover": {
      color: 'white',
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: '10px'
    }
  },


  subNavLink: {
    padding: '2px',
    textAlign: 'center',
    color: 'black',
    textDecoration: "none",
    fontFamily: "Cairo, sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
    "&:hover": {
      color: 'black',
      textDecoration: "none",
    },
  },


  icons: {
    display: "block",
    fontFamily: "Cairo, sans-serif",
    color: "#240C33",
    fontSize: "15px",
    float: "right",
    paddingLeft: "30px",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
    },
    "&:hover": {
      color: "#C82257",
    },
  },




  productLink: {
    textDecoration: "none",
    display: "block",
    fontFamily: "Cairo, sans-serif",
    color: "#240C33",
    fontSize: "15px",
    float: "left",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      paddingRight: "10px",
    },
    "&:hover": {
      color: "#C82257",
      textDecoration: "none",
    },
  },


  seasonSale: {
    cursor: 'pointer',
    backgroundColor: '#C7BC36',
    textTransform: 'uppercase',
    color: 'white',
  },

  seasonType: {
    paddingLeft: '35px',
    fontFamily: "Cairo, sans-serif",
    fontSize: "20px",
    letterSpacing: '1px'
  },





}));

function Header(props) {
  const classes = useStyles();
  const anchorRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [Navopen, setNavOpen] = React.useState(false);
  const [NavID, setNavID] = useState({ id: "", hide: true });
  const [searchValue, setSearchValue] = useState("");


  const decoded = jwt.decode(localStorage.getItem("user_token"));


  useEffect(() => {
    props.bannerList();
    props.categoryDispatch();
    window.scrollTo(0, 0);
  }, []);


  const regex = /\s/g;

  const handleClick = (newPlacement, id) => (event) => {
    setAnchorEl(event.currentTarget);
    // setNavOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    if (NavID.hide) {
      setNavID({ ...NavID, id: id, hide: false });
    } else {
      setNavID({ ...NavID, id: id, hide: true });
    }
    setNavOpen(true);
  };



  const handleToggle = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleLanguageToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setLanguageOpen(true);
  };


  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return false;
    }
    setOpen(false);
    setLanguageOpen(false);
    setNavOpen(false);
  };

  const handleBar = () => {
    const USER_TOKEN = localStorage.getItem("user_token");
    console.log(USER_TOKEN);
    props.profileDispatch(USER_TOKEN);
  };

  const handleLogOutSession = () => {
    localStorage.removeItem("user_token");
    window.location.reload();
    window.location.replace("/");
  };

  
  const shopNow = (target) => {
    setTimeout(()=>{
      window.location.reload();
      props.history.push(target);
    },1000)
  };


  const branchData =
    props.banner &&
    props.banner.map((item) => {
      return (
        <Grid item xs={12}>
        <Link
          to={{
            pathname: `/${item.target}`
          }}
          target="_blank"
        >
         <div>
          <img
            src={item.image_url}
            alt="Novellady - It's a girl thing"
            width="100%"
            style={{ height: '40%' }}
            className={classes.bannerImage}
            onClick={() => {
                shopNow(item.target);
              }}
            />
            </div>
          
        </Link>
          {/* <Grid item xs={6}>
            <div className={classes.centered}>
              <Typography variant="h1" className={classes.typoH1}>
                {item.text}
              </Typography>
              <Typography className={classes.typoPara}>
                {item.description}
              </Typography>
              <Button
                className={classes.btn}
                onClick={() => {
                  shopNow(item.target);
                }}
              >
                Shop Now
              </Button>
            </div>
          </Grid> */}
        </Grid>
      );
    });


  const handleChange = (e) => {
    setSearchValue(e.target.value);
    return props.history.push(`/search/${e.target.value}`);
  };



  const gotoShopPage = (e) => {
    return props.history.push(`/search/search`);
  };


  const seasonSaleopen = () => {
    return props.history.push(`/shop/FreshIn?category_id=13`);
  }




  const gotoEnglish = () => {
    window.location.reload();
    localStorage.setItem("English", true);
    localStorage.removeItem("Arabic");
  }




  return (
    <div className={classes.root}>


      {/* SEASON OFFER */}
      {props.location.pathname === "/" ?
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.seasonSale} >
              <img src={seasonSale} onClick={seasonSaleopen} width="100%" />
              {/* <span className={classes.startSymbol} />
            <span className={classes.seasonType}>End of season sale</span>
            <span className={classes.seasonType}><strong>get 50% off</strong></span>
            <span className={classes.seasonType}>use code <strong>eos50</strong></span>
            <span className={classes.endSymbol} /> */}
            </div>
          </Grid>
        </Grid> : ''}

      {/* HEADER SECTION */}
      <Grid container>
        <div className={classes.NavBar}>
          <div>
            <div>
              <Grid container >
                <Grid
                  item
                  // xs={3}
                  // sm={3}
                  container
                  justify="flex-start"
                // direction="row-reverse"
                >
                  <div className={classes.topIcons}>
                    <div className={classes.icons}>
                      <img
                        src={customerSupport}
                        alt="customerSupport"
                        height="28"
                        width="30"
                      />
                    </div>

                    {/* Language */}
                    <div
                      className={classes.icons}
                      onMouseLeave={handleClose}
                    >
                      <img
                        src={language}
                        alt="language"
                        height="28"
                        width="30"
                        aria-haspopup="true"
                        onMouseEnter={handleLanguageToggle}

                      />

                      <Popper
                        open={languageOpen}
                        anchorEl={anchorEl}
                        role={undefined}
                        transition
                        disablePortal


                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                              marginTop: "20px",
                              padding: "0px 15px 0px 15px",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>

                                <MenuList
                                // autoFocusItem={languageOpen}
                                // id="menu-list-grow"
                                >
                                  <MenuItem >
                                    <Button style={{ cursor: 'text', color: "#C82257", fontSize: '16px', textTransform: 'uppercase' }}>  عربى
                                    </Button>
                                  </MenuItem>
                                  <MenuItem onMouseLeave={handleClose}>
                                    <span onClick={gotoEnglish}>English</span>
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>

                    {/*  WishList */}
                    <div className={classes.icons}>
                      <Link to="/wishlist" className={classes.productLink}>
                        {" "}
                        <img
                          src={wishlist}
                          alt="Wishlist"
                          height="28"
                          width="30"
                        />
                        <br />
                      </Link>{" "}
                    </div>

                    {/*  Cart */}
                    <div className={classes.icons}>
                      <Link to="/cart" className={classes.productLink}>
                        {" "}
                        <img src={mybag} alt="My Bag" height="28" width="30" />
                        <br />
                      </Link>
                    </div>


                    {/*  Profile */}
                    <div className={classes.icons} onMouseLeave={handleClose}>
                      <img
                        src={profile}
                        alt="Profile"
                        height="28"
                        width="30"
                        ref={anchorRef}
                        aria-haspopup="true"
                        onMouseEnter={handleToggle}

                      />

                      {!localStorage.getItem("user_token") ? (
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                          disablePortal
                          placement="bottom-end"
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                                marginTop: "20px",
                                // marginRight:'20px',
                                padding: "0px 15px 0px 15px",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                  >
                                    <Link
                                      to={{
                                        pathname: "/customer/login",
                                        state: {
                                          referrer: "/profile",
                                        },
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      <MenuItem >
                                        <span style={{ color: "#C82257", textTransform: 'uppercase', fontSize: '16px', fontWeight: '400', fontFamily: "Cairo, sans-serif", }}>سجل / تسجيل الدخول</span>
                                      </MenuItem>
                                    </Link>
                                    <hr style={{ marginTop: '1px', marginBottom: '1px' }} />


                                    <Link
                                      to={{
                                        pathname: "/orders",
                                        state: {
                                          id: localStorage.getItem(
                                            "user_token"
                                          ),
                                        },
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      <MenuItem >
                                        طلباتي
                                      </MenuItem>
                                    </Link>


                                    <Link
                                      to={{
                                        pathname: "/profile",
                                        state: {
                                          id: localStorage.getItem(
                                            "user_token"
                                          ),
                                        },
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      <MenuItem >
                                        ملفي
                                      </MenuItem>
                                    </Link>


                                    <Link
                                      to={{
                                        pathname: "/address",
                                        state: {
                                          id: localStorage.getItem(
                                            "user_token"
                                          ),
                                        },
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      {" "}
                                      <MenuItem onMouseLeave={handleClose}>
                                        العنوان المحفوظ
                                      </MenuItem>
                                    </Link>

                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      ) : (
                          <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                            placement="bottom-end"
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === "left"
                                      ? "center top"
                                      : "center left",
                                  marginTop: "20px",

                                  padding: "0px 10px 0px 10px",

                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                      autoFocusItem={open}
                                      id="menu-list-grow"
                                    >
                                      <div style={{ textAlign: "justify", padding: '10px', }}>
                                        <span style={{ fontSize: "18px", color: "#C82257", fontFamily: "Cairo, sans-serif", textTransform: 'capitalize' }}>
                                          {decoded.first_name ? decoded.first_name : 'Customer Name'}
                                        </span>
                                        <br />
                                        <span style={{ fontSize: "15px", color: 'black', fontFamily: "Cairo, sans-serif", }}>
                                          {decoded.email ? decoded.email : 'Email'}
                                        </span>
                                      </div>

                                      <hr style={{ marginTop: '1px', marginBottom: '1px' }} />
                                      <Link
                                        to={{
                                          pathname: "/orders",
                                          state: {
                                            id: localStorage.getItem(
                                              "user_token"
                                            ),
                                          },
                                        }}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {" "}
                                        <MenuItem onClick={handleClose}>
                                          طلباتي
                                      </MenuItem>
                                      </Link>

                                      <Link
                                        to={{
                                          pathname: "/profile",
                                          state: {
                                            id: localStorage.getItem(
                                              "user_token"
                                            ),
                                          },
                                        }}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {" "}


                                        <MenuItem onClick={handleClose}>
                                          ملفي
                                      </MenuItem>
                                      </Link>



                                      <Link
                                        to={{
                                          pathname: "/address",
                                          state: {
                                            id: localStorage.getItem(
                                              "user_token"
                                            ),
                                          },
                                        }}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {" "}
                                        <MenuItem onClick={handleClose}>
                                          العنوان المحفوظ
                                      </MenuItem>
                                      </Link>
                                      <hr style={{ marginTop: '1px', marginBottom: '1px' }} />

                                      <MenuItem onClick={handleLogOutSession}>
                                        تسجيل خروج
                                    </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        )}
                    </div>
                  </div>
                </Grid>




                <div className={classes.searchBar}>
                  <i className="fa fa-search" style={{ fontSize: "21px", marginTop: '12px', marginLeft: '42.4%', position: 'absolute' }}></i>
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات والعلامات التجارية والمزيد"
                    className={classes.Htmlinput}
                    onChange={handleChange}
                    value={searchValue}
                    name="search"
                    type="text"
                    onClick={gotoShopPage}
                  />


                </div>




                <Grid item xs={12}>
                  <Link to="/">
                    <div className={classes.NovelLady_logo}>
                      <img
                        src={logo}
                        alt="Novellady Logo"
                        height="63"
                        width="209"
                      />
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Grid>


      <Grid container direction="row-reverse">
        <Grid item xs={12}>
          <div className={classes.topNavLink} onMouseLeave={handleClose}>
            {props.category.map((item) => {
              if (item.subCategory.length > 0) {
                return (
                  <>
                    <span
                      aria-haspopup="true"
                      onMouseEnter={handleClick("bottom", item.id)}
                      className={classes.navLink}
                    >
                      {item.translated_name} <i style={{ fontSize: '18px', marginLeft: '1px' }} className="fa">&#xf0d7;</i> {" "}
                    </span>

                    {NavID.id === item.id ? (
                      <Popper
                        open={Navopen}
                        anchorEl={anchorEl}
                        role={undefined}
                        transition
                        disablePortal


                      >
                        {({ TransitionProps }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                            }}

                          >
                            <>

                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                  // autoFocusItem={Navopen}
                                  // id="menu-list-grow"
                                  >
                                    {_.map(item.subCategory, (subC) => {
                                      return (
                                        <MenuItem
                                        >
                                          <Link
                                            to={{
                                              pathname: `/shop/${subC.name
                                                .toString()
                                                .replace(
                                                  regex,
                                                  ""
                                                )}?category_id=${
                                                subC.id
                                                }`,

                                              state: {
                                                translated_shop: 'متجر',
                                                translated_name: subC.translated_name
                                              },
                                            }}

                                            className={classes.subNavLink}
                                            onClick={() =>
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 100)
                                            }

                                          >
                                            {subC.translated_name}
                                          </Link>
                                        </MenuItem>
                                      );
                                    })}

                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </>
                          </Grow>
                        )}
                      </Popper>
                    ) : (
                        ""
                      )}
                  </>
                );
              } else {
                return (
                  <Link
                    to={{
                      pathname: `/shop/${item.name
                        .toString()
                        .replace(regex, "")}?category_id=${item.id}`,
                      state: {
                        translated_shop: 'متجر',
                        translated_name: item.translated_name
                      },

                    }}
                    key={item.id}
                    className={classes.navLink}

                    onClick={() =>
                      setTimeout(() => {
                        window.location.reload();
                      }, 100)
                    }
                  >
                    {item.translated_name.toString()}
                  </Link>
                );
              }
            })}
          </div>
        </Grid>
      </Grid>



      {props.location.pathname === "/" ? (
        props.banner ? (
          <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            interval={3000}
            autoPlay={true}
          >
            {branchData}
          </Carousel>
        ) : (
            <Skeleton
              animation="false"
              variant="rect"
              width="100%"
              height={550}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )
      ) : (
          ""
        )}

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    banner: state.banner.data,
    category: state.categoryData.data,
    profile: state.userProfile,
    search: state.search.data,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bannerList: () => dispatch(bannerList()),
    categoryDispatch: () => dispatch(fetchCategoryListApiData()),
    profileDispatch: (token) => dispatch(fetchUserProfileApi(token)),
    searchData: (data) => dispatch(searchData(data)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
