import React, { useState } from "react";
import { lazy, Suspense } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Button,
  Tooltip,
  Popover,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Devices as DevicesIcon,
  Forum as ForumIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  YouTube as YouTubeIcon,
  ShoppingCart as ShoppingCartIcon,
  Cloud as CloudIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppTheme } from "../hooks/useAppTheme";
const SideBar = lazy(() => import("./SideBar"));
const ProfileCard = lazy(() => import("./ProfileCard"));
const NotificationCard = lazy(() => import("./NotificationCard"));

const Navbar = () => {
  const { isDarkMode, toggleTheme, theme } = useAppTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = "houseOwner"; // Replace with dynamic role logic
  const [user, setUser] = useState(true); // update with user state

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
    { label: "Purchase Devices", icon: <ShoppingCartIcon />, path: "/shop" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { label: "Manage Cloud Storage", icon: <CloudIcon />, path: "/cloud" },
    { label: "Setup Guides", icon: <YouTubeIcon />, path: "youtube" },
    { label: "Community Forum", icon: <ForumIcon />, path: "/community" },
    { label: "About Us", icon: <InfoIcon />, path: "/about" },
  ];

  const toggleDrawer = (state) => () => setOpen(state);

  // Notification handler
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  const isNotificationOpen = Boolean(notificationAnchorEl);

  // Profile Icon and Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };
  const isProfileOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          width: "100%",
          color: theme.palette.text.primary,
          borderRadius: "0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: { xs: 1, sm: 3 },
            gap: 1,
            borderRadius: "0",
          }}
        >
          {/* Left: Menu Icon */}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title=" Side Menu">
                <IconButton edge="start" onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{}} />
                </IconButton>
              </Tooltip>
            </Box>
          )}

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
              <>
                <Tooltip title="Notifications">
                  <IconButton size="small" onClick={handleNotificationClick}>
                    <NotificationsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Popover
                  open={isNotificationOpen}
                  anchorEl={notificationAnchorEl}
                  onClose={handleNotificationClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <NotificationCard onClose={handleNotificationClose} />
                </Popover>
              </>
            )}

            {user && (
              <>
                <Tooltip title=" User Profile">
                  <Avatar
                    onClick={handleProfileClick}
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>

                <Popover
                  open={isProfileOpen}
                  anchorEl={anchorEl}
                  onClose={handleCloseProfile}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <ProfileCard onClose={handleCloseProfile} />
                </Popover>
              </>
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
