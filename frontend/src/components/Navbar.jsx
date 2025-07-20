import React, { useState, lazy, Suspense } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Tooltip,
  Popover,
  Avatar,
  Chip,
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
  NewReleases as NewReleasesIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppTheme } from "../hooks/useAppTheme";
import { useSelector } from "react-redux";

// Lazy-loaded components
const SideBar = lazy(() => import("./Sidebar"));
const ProfileCard = lazy(() => import("./ProfileCard"));
const NotificationCard = lazy(() => import("./NotificationCard"));

const Navbar = () => {
  const { isDarkMode, toggleTheme, theme } = useAppTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Check login status
  const { user } = useSelector((store) => store.user);
  const isLoggedIn = user && Object.keys(user).length > 0;


  // Sidebar links
  const navLinks = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    ...(user?.role === "admin"
      ? [
          { label: "User Management", icon: <PeopleIcon />, path: "/users" },
          { label: "Device Management", icon: <DevicesIcon />, path: "/devices" },
        ]
      : []),
    { label: "Purchase Devices", icon: <ShoppingCartIcon />, path: "/shop" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { label: "Manage Cloud Storage", icon: <CloudIcon />, path: "/cloud" },
    { label: "Setup Guides", icon: <YouTubeIcon />, path: "/youtube" },
    { label: "Community Forum", icon: <ForumIcon />, path: "/community" },
    { label: "About Us", icon: <InfoIcon />, path: "/about" },
  ];

  // Drawer handlers
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Notifications
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const handleNotificationClick = (e) => setNotificationAnchor(e.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const isNotificationOpen = Boolean(notificationAnchor);

  // Profile
  const [profileAnchor, setProfileAnchor] = useState(null);
  const handleProfileClick = (e) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);
  const isProfileOpen = Boolean(profileAnchor);

  // Avatar 
  const initials = (user?.firstName && user?.lastName)
    ? (user.firstName + " " + user.lastName)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          color: theme.palette.text.primary,
          borderRadius: 0,
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
          {/* Menu Icon */}
          {isLoggedIn && (
            <Tooltip title="Side Menu">
              <IconButton edge="start" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Right Icons */}
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
            {/* Email not verified Chip */}
            {isLoggedIn && user?.emailVerified === false && (
              <Tooltip title="Email is not verified. Please check your inbox.">
                <Chip
                  icon={<NewReleasesIcon />}
                  label="Email Not Verified"
                  color="warning"
                  variant="outlined"
                  sx={{ mt: 1, cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                />
              </Tooltip>
            )}

            {/* Theme toggle */}
            <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton size="small" onClick={toggleTheme}>
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            {isLoggedIn && (
              <>
                <Tooltip title="Notifications">
                  <IconButton size="small" onClick={handleNotificationClick}>
                    <NotificationsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Popover
                  open={isNotificationOpen}
                  anchorEl={notificationAnchor}
                  onClose={handleNotificationClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{ sx: { mt: 1, borderRadius: 2, boxShadow: theme.shadows[4] } }}
                >
                  <Suspense fallback={<Box p={2}>Loading...</Box>}>
                    <NotificationCard onClose={handleNotificationClose} />
                  </Suspense>
                </Popover>
              </>
            )}

            {/* User Avatar */}
            {isLoggedIn && (
              <>
                <Tooltip title="User Profile">
                  <Avatar
          alt={user?.firstName || "User"}
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            border: `2px solid ${theme.palette.primary.light}`,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {initials}
        </Avatar>
                </Tooltip>
                <Popover
                  open={isProfileOpen}
                  anchorEl={profileAnchor}
                  onClose={handleProfileClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{ sx: { mt: 1, borderRadius: 2, boxShadow: theme.shadows[4] } }}
                >
                  <Suspense fallback={<Box p={2}>Loading...</Box>}>
                    <ProfileCard onClose={handleProfileClose} />
                  </Suspense>
                </Popover>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
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
        <Suspense fallback={<Box p={2}>Loading Sidebar...</Box>}>
          <SideBar navLinks={navLinks} onClose={toggleDrawer(false)} />
        </Suspense>
      </Drawer>
    </>
  );
};

export default Navbar;
