import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LoginIcon from "@mui/icons-material/Login";
import {
  Badge,
  Collapse,
  Divider,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MobileFriendlySharpIcon from "@mui/icons-material/MobileFriendlySharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { LaptopChromebook } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

export default function Header() {
  const { carts } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Drawer Products
  const [stateDrawer, setStateDrawer] = React.useState({
    top: false,
  });
  const toggleDrawer = (anchor, open) => () => {
    setOpen(true);
    setStateDrawer({ ...stateDrawer, [anchor]: open });
  };

  // handle open collapse
  const titleList = [
    {
      id: 1,
      title: "Điện thoại",
      children: [
        { id: 2, title: "Apple" },
        { id: 3, title: "Samsung" },
        { id: 4, title: "Oppo" },
      ],
    },
    {
      id: 5,
      title: "Máy tính",
      children: [
        { id: 6, title: "Asus" },
        { id: 7, title: "Acer" },
      ],
    },
  ];

  const [open, setOpen] = useState(true);
  const [titleFilter, setTitleFilter] = useState("");

  const handleClick = (title) => {
    setOpen(true);
    setTitleFilter(title);
  };
  const handleFilterTitle = (title, brand) => {
    toggleDrawer("top", true);
    if (title == "Điện thoại") {
      navigate(`/product/mobile/${brand}`);
    } else if (title == "Máy tính") {
      navigate(`/product/laptop/${brand}`);
    }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <List>
            <Link
              to="/product/mobile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                onMouseEnter={() => handleClick(titleList[0].title)}
                sx={{
                  backgroundColor: "inherit",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                <ListItemIcon>
                  <MobileFriendlySharpIcon />
                </ListItemIcon>
                <ListItemText primary={titleList[0].title} />
                {titleList[0].children ? <ArrowForwardIosSharpIcon /> : <></>}
              </ListItem>
            </Link>
            <Divider variant="middle" component="li" />
            <Link
              to="/product/laptop"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                onMouseEnter={() => handleClick(titleList[1].title)}
                sx={{
                  backgroundColor: "inherit", // Default background
                  "&:hover": {
                    backgroundColor: "lightgrey", // Background color on hover
                  },
                }}
              >
                <ListItemIcon>
                  <LaptopChromebook />
                </ListItemIcon>
                <ListItemText primary={titleList[1].title} />
                {titleList[1].children ? <ArrowForwardIosSharpIcon /> : <></>}
              </ListItem>
            </Link>
          </List>
          <Link to="/product">
            <Button
              endIcon={<DoubleArrowIcon />}
              sx={{
                color: "black",
                "&:hover": {
                  color: "var(--orange)",
                },
              }}
            >
              Xem tất cả
            </Button>
          </Link>
        </Grid>
        <Grid item xs={9} sx={{ border: "1px solid #fff" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {titleList.map(
                (item) =>
                  item.children &&
                  item.children.map((child) =>
                    item.title === titleFilter ? (
                      <ListItem
                        sx={{ pl: 4 }}
                        key={child.id}
                        onClick={() =>
                          handleFilterTitle(item.title, child.title)
                        }
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ) : (
                      <></>
                    )
                  )
              )}
            </List>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  );

  // handle search bar
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value) {
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchText("");
    setSuggestions([]);
  };

  return (
    <AppBar position="fixed" sx={{ background: "var(--black)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                width: "120px",
                height: "50px",
              }}
            >
              <img
                src={require("../../img/logo.png")}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "100%",
                }}
              />
            </Box>
          </Link>
          {
            // PHONE SCREEN
          }
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: "60px",
                height: "30px",
                marginRight: "10px",
              }}
            >
              <img
                src={require("../../img/logo.png")}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "100%",
                }}
              />
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link
                to="/product"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Sản phẩm</Typography>
                </MenuItem>
              </Link>
              <Link
                to="/warranty"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Bảo hành</Typography>
                </MenuItem>
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Liên hệ</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "relative",
            }}
          >
            <React.Fragment>
              <Button
                onClick={toggleDrawer("top", true)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                  transition: "1s",
                  "&:hover": {
                    backgroundColor: "var(--orange)",
                    textDecoration: "underline",
                  },
                  "& span": {
                    display: "inline-block",
                  },
                }}
              >
                <MenuIcon fontSize="medium" sx={{ marginRight: "5px" }} />
                <span>Danh mục sản phẩm</span>
              </Button>
              <Link
                to="/warranty"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 10px",
                    transition: "1s",
                    "&:hover": {
                      backgroundColor: "var(--orange)",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Bảo hành
                </Button>
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 10px",
                    transition: "1s",
                    "&:hover": {
                      backgroundColor: "var(--orange)",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Liên hệ
                </Button>
              </Link>
              <SwipeableDrawer
                anchor={"top"}
                open={stateDrawer["top"]}
                onClose={toggleDrawer("top", false)}
                onOpen={toggleDrawer("top", true)}
              >
                {list("top")}
              </SwipeableDrawer>
            </React.Fragment>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                position: "relative",
                display: "flex", // Thêm dòng này để đảm bảo icon và input được căn chỉnh cùng hàng
                alignItems: "center", // Căn giữa icon và input theo trục dọc
                borderRadius: 1,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
                margin: "5px 5px",
                minWidth: 300,
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  padding: "0 16px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  color: "inherit",
                  flexGrow: 1,
                }}
                value={searchText}
                onChange={handleInputChange}
              />
              {suggestions.length > 0 && (
                <List
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,

                    zIndex: 1,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: 1,
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((product) => (
                    <ListItem
                      key={product.id}
                      color=""
                      onClick={() => handleSuggestionClick(product.id)}
                      sx={{
                        "&:hover": {
                          opacity: 0.8,
                        },
                        backgroundColor: "var(--black)",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={require(`../../img/product/${product.image}.png`)}
                          alt={product.name}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={product.name} color="#000" />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
            <Tooltip>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                sx={{ padding: "2px", margin: "0 5px" }}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ padding: "2px", margin: "0 5px" }}
                >
                  <Badge badgeContent={carts ? carts.length : 0} color="error">
                    <ShoppingCartIcon color="#fff" />
                  </Badge>
                </IconButton>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="outline"
                  sx={{
                    // marginLeft: "10px",
                    border: "1px solid var(--orange)",
                    borderRadius: "20px",
                    "&:hover": {
                      background: "var(--orange)",
                      opacity: 0.9,
                    },
                    textTransform: "none"
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </Tooltip>
          </Box>
          {
            // search bar for mobile
          }
          <Box
            sx={{
              position: "relative",
              display: { xs: "flex", md: "none" },
              alignItems: "center", // Căn giữa icon và input theo trục dọc
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },

              maxWidth: 200,
              flexGrow: 0,
              height: "30px",
            }}
          >
            <Box
              sx={{
                padding: "0 2px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "inherit",
                flexGrow: 1, // Đảm bảo input chiếm toàn bộ không gian còn lại
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {suggestions.length > 0 && (
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,

                  zIndex: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {suggestions.map((product) => (
                  <ListItem
                    key={product.id}
                    color=""
                    onClick={() => handleSuggestionClick(product.id)}
                    sx={{
                      "&:hover": {
                        opacity: 0.8,
                      },
                      backgroundColor: "var(--black)",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={require(`../../img/product/${product.image}.png`)}
                        alt={product.name}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={product.name} color="#000" />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ padding: "6px" }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{ padding: "6px" }}
              >
                <Badge badgeContent={carts ? carts.length : 0} color="error">
                  <ShoppingCartIcon color="#fff" />
                </Badge>
              </IconButton>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton
                size="large"
                aria-label="show 4 login"
                color="inherit"
                sx={{ padding: "6px" }}
              >
                <LoginIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
