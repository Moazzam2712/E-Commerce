import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as LinkTag } from "react-router-dom";

import {
  Badge,
  Box,
  Button,
  InputBase,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/Items";
import CategoriesList from "./CategoriesList";
import { useAuth } from "../auth/AuthContext";

export const RLink = styled(LinkTag)({
  textDecoration: "none",
  color: "inherit",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "# 0183c1",
});

const StyledButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "20%",
  borderRadius: theme.shape.borderRadius,
}));
const SignInButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#E67E22",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#D35400",
  },
});
const NavButtons = styled(Button)({
  color: "#FFF",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "80%",
  },
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "90%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledList = styled(List)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  width: "15%",
});

const Header = () => {
  const { cartItems } = useSelector((store) => store.cartItems);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [catAnchorEl, setCatAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEL] = useState(null);

  const { isLoggedIn, logout } = useAuth();

  const handleClick = (event) => {
    setCatAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/signIn";
    logout();
  };

  const handleCloseCat = (category) => {
    setCatAnchorEl(null);
    dispatch(itemActions.selectCategory(category.toLowerCase()));
  };
  const handleCloseMenu = () => {
    setMenuAnchorEL(null);
  };
  const handleHome = () => {
    dispatch(itemActions.setHome());
  };
  const handleClickMenu = (event) => {
    setMenuAnchorEL(event.currentTarget);
  };

  const handleSearch = (e) => {
    dispatch(itemActions.searchItems(e.target.value));
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <LinkTag to={"/"}>
          <Box
            component="img"
            onClick={handleHome}
            sx={{
              height: 40,
              width: 40,
              display: { md: "block", lg: "none" },

              borderRadius: "50%",
            }}
            alt="The house from the offer."
            src="https://i.pinimg.com/originals/df/70/fc/df70fc7f957c5811ff783ad0efdd4966.jpg"
          />
        </LinkTag>
        <Typography
          variant="h5"
          color="#FFFFFF"
          to="/"
          fontWeight={900}
          component={LinkTag}
          onClick={handleHome}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            textDecoration: "none",
            cursor: "pointer",
            fontWeight: 900,
            letterSpacing: "2px",
          }}
        >
          ShoppersCart
        </Typography>

        <Box width="35%">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search For Product"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e)}
            />
          </Search>
        </Box>

        <StyledList
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          <Typography component={RLink} to="/about">
            About Us
          </Typography>
          <Typography component={RLink} to="mailto:xyz">
            Contact
          </Typography>
        </StyledList>
        <Typography component={RLink} onClick={handleClick}>
          Categories
        </Typography>
        <CategoriesList catAnchorEl={catAnchorEl} handleCloseCat={handleCloseCat} />

        <StyledButtonGroup
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          {isLoggedIn ? (
            <NavButtons onClick={handleLogout}>LogOut</NavButtons>
          ) : (
            <SignInButton startIcon={<LoginIcon />} variant="text">
              <RLink to="/signIn">Sign In</RLink>
            </SignInButton>
          )}
        </StyledButtonGroup>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Badge
            component={RLink}
            to="/cart"
            badgeContent={cartItems.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </Badge>

       
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Box display={"flex"}>
            
            <MenuIcon onClick={handleClickMenu}/>
            <Menu
                    id="menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={handleCloseMenu}
          
            >
              <MenuItem>
                <RLink to="/about">About Us</RLink>
              </MenuItem>

              <MenuItem>
                <RLink to="mailto:vsvs">Contact</RLink>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem>
                  <RLink to={"/signIn"}>Sign In</RLink>
                </MenuItem>
                
              )}
            
            </Menu>
          </Box>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
