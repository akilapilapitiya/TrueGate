// Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Devices as DevicesIcon,
  Forum as ForumIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Person2 as Person2Icon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useAppTheme } from "../hooks/useAppTheme";
import SideBar from "./SideBar";

const Navbar = () => {
  const { isDarkMode, toggleTheme, theme } = useAppTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = "houseOwner"; // Replace with dynamic role logic
  const [user, setUser] = useState(null) // update with user state

  const navLinks = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    ...(role === "houseOwner"
      ? [
          { label: "User Management", icon: <PeopleIcon />, path: "/users" },
          {
            label: "Device Management",
            icon: <DevicesIcon />,
            path: "/devices",
          },
        ]
      : []),
    { label: "Community Forum", icon: <ForumIcon />, path: "/community" },
    { label: "About Us", icon: <InfoIcon />, path: "/about" },
  ];

  const toggleDrawer = (state) => () => setOpen(state);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error-page"));
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          width: "100%",
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: { xs: 1, sm: 3 },
            gap: 1,
          }}
        >
          {/* Left: Menu Icon */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>

          {/* Right: Icons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 0.5, sm: 1.5 },
              justifyContent: "flex-end",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
              <IconButton size="small" onClick={toggleTheme}>
                {isDarkMode ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            {user && (
              <IconButton size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>
            )}
            
            {user && (
              <IconButton size="small">
              <NotificationsIcon fontSize="small" />
            </IconButton>
            )}
            
            {user && (
              <IconButton size="small" onClick={() => navigate("/profile")}>
              <Person2Icon fontSize="small" />
            </IconButton>

            )}
            
            {user && (
              <Button
              onClick={handleSignOut}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                color: theme.palette.primary.main,
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              SIGN OUT
            </Button>
            )}
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer with Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          BackdropProps: {
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        }}
      >
        <SideBar navLinks={navLinks} onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
};

export default Navbar;
