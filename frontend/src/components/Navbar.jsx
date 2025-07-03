import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import ForumIcon from "@mui/icons-material/Forum";
import InfoIcon from "@mui/icons-material/Info";
import namedLogo from "../assets/logo-name.png";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error-page");
      });
  };

  return (
    <div>
      {/* AppBar (Top Bar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          background: "transparent",
          border: "none",
          boxShadow: "none",
          width: "100vw",
        }}
      >
        <Toolbar sx={{ width: "100vw" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              px: 2,
            }}
          >
            {/* Left: Menu Button */}
            <Box>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon sx={{ color: "blue" }} />
              </IconButton>
            </Box>

            {/* Right: Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </Button>
              <Button>
                <SettingsIcon />
              </Button>
              <Button>
                <NotificationsIcon />
              </Button>
              <Button onClick={() => navigate("/profile")}>
                <Person2Icon />
              </Button>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            background: "blue",
            height: "100vh",
            pt: 8,
          }}
        >
          <IconButton>
            <img
              src={namedLogo}
              alt="TrueGate Logo"
              style={{ width: "auto", height: 40 }}
            />
          </IconButton>

          <Divider sx={{ borderColor: "white" }} />

          <List>
            <Container>
              <ListItem>
                <NavLink to={"/dashboard"} onClick={() => setOpen(false)}>
                  <DashboardIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" color="initial">
                    DASHBOARD
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem button>
                <NavLink to={"/users"} onClick={() => setOpen(false)}>
                  <PeopleIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" color="initial">
                    USER MANAGEMENT
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to={"/devices"} onClick={() => setOpen(false)}>
                  <DevicesIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" color="initial">
                    DEVICE MANAGEMENT
                  </Typography>
                </NavLink>
              </ListItem>
            </Container>

            <Divider sx={{ borderColor: "white" }} />

            <Container>
              <ListItem button onClick={() => console.log("Forum Clicked")}>
                <NavLink to={"/community"} onClick={() => setOpen(false)}>
                  <ForumIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" color="initial">
                    COMMUNITY FORUM
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem button onClick={() => console.log("About Clicked")}>
                <NavLink to={"/about"} onClick={() => setOpen(false)}>
                  <InfoIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" color="initial">
                    ABOUT US
                  </Typography>
                </NavLink>
              </ListItem>
            </Container>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
