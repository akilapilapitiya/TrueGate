import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import ForumIcon from "@mui/icons-material/Forum";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import namedLogo from "../assets/logo-name-white.png";
import { useAppTheme } from "../hooks/useAppTheme";

const Navbar = () => {
  const { isDarkMode, toggleTheme, theme } = useAppTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = "houseOwner"; // Replace with dynamic role logic

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

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        pt: 3,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "left", mb: 2, px: 2 }}>
          <img src={namedLogo} alt="TrueGate Logo" style={{ height: 25 }} />
        </Box>
        <Divider sx={{ borderColor: theme.palette.divider, mb: 1 }} />
        <List>
          {navLinks.map(({ label, icon, path }) => (
            <NavLink
              key={label}
              to={path}
              style={{ textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    color: isActive
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                    bgcolor: isActive
                      ? theme.palette.action.selected
                      : "transparent",
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );

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

            <IconButton size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>

            <IconButton size="small">
              <NotificationsIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={() => navigate("/profile")}>
              <Person2Icon fontSize="small" />
            </IconButton>

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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
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
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
