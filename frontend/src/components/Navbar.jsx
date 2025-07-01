import { NavLink, useLocation, useNavigate } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { colorPallete } from "../ColorTheme";
import { buttonSizes } from "../Responsive";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        background: colorPallete.navbarBackgroundColor,
        height: "12vh",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {user ? (
          <>
            <IconButton onClick={() => navigate("/landing")}>
              <Box
                component="img"
                src={namedLogo}
                alt="logo"
                sx={{ height: 40 }}
              />
            </IconButton>

            {user.mode === "admin" && location.pathname !== "/landing" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  component={NavLink}
                  startIcon={<BarChartIcon />}
                  to="/dashboard"
                  variant="outlined"
                  sx={{
                    background: colorPallete.navbarLinkButton,
                    color: colorPallete.navbarLinkButtonAccent,
                    borderColor: colorPallete.navbarLinkButtonAccent,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.navbarLinkButtonAccent,
                      color: colorPallete.navbarLinkButton,
                      borderColor: colorPallete.navbarLinkButton,
                    },
                  }}
                >
                  API Dashboard
                </Button>
                <Button
                  startIcon={<PeopleIcon />}
                  component={NavLink}
                  to="/manage"
                  variant="outlined"
                  sx={{
                    background: colorPallete.navbarLinkButton,
                    color: colorPallete.navbarLinkButtonAccent,
                    borderColor: colorPallete.navbarLinkButtonAccent,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.navbarLinkButtonAccent,
                      color: colorPallete.navbarLinkButton,
                      borderColor: colorPallete.navbarLinkButton,
                    },
                  }}
                >
                  Manage Users
                </Button>
              </Box>
            )}

            <Stack direction="row" spacing={2} alignItems="center">
              {location.pathname !== "/profile" && (
                <Button
                  sx={{
                    background: colorPallete.navbarProfileNameButton,
                    color: colorPallete.navbarProfileNameButtonAccent,
                    borderColor: colorPallete.navbarProfileNameButtonAccent,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.navbarProfileNameButtonAccent,
                      color: colorPallete.navbarProfileNameButton,
                      borderColor: colorPallete.navbarProfileNameButton,
                    },
                  }}
                  onClick={() => navigate("/profile")}
                  variant="outlined"
                >
                  <Typography>{user.firstName}</Typography>
                </Button>
              )}
              <Button
                endIcon={<LogoutIcon />}
                onClick={handleSignOut}
                variant="contained"
                color="error"
                sx={{
                  minWidth: buttonSizes.subButton.minWidth,
                  fontSize: buttonSizes.subButton.fontSize,
                  padding: buttonSizes.subButton.padding,
                }}
              >
                Logout
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Box
              component="img"
              src={namedLogo}
              alt="logo"
              sx={{ height: 40 }}
            />
            <Stack direction="row" spacing={2}>
              {location.pathname !== "/register" && (
                <Button
                  onClick={() => navigate("/register")}
                  variant="contained"
                  sx={{
                    background: colorPallete.loginButtonColor,
                    color: colorPallete.loginButtonAccentColor,
                    borderColor: colorPallete.loginButtonAccentColor,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.loginButtonHoverColor,
                      color: colorPallete.loginButtonHoverAccentColor,
                      borderColor: colorPallete.loginButtonHoverAccentColor,
                    },
                  }}
                >
                  Get Started
                </Button>
              )}
              {location.pathname !== "/login" && (
                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  sx={{
                    background: colorPallete.registerButtonColor,
                    color: colorPallete.registerButtonAccentColor,
                    borderColor: colorPallete.registerButtonAccentColor,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.registerButtonHoverColor,
                      color: colorPallete.registerButtonHoverAccentColor,
                      borderColor: colorPallete.registerButtonHoverAccentColor,
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Stack>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
