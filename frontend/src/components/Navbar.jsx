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
import { useTheme } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import namedLogo from "../assets/logo-name-white.png";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const role = "client"; // e.g., "houseOwner", "tenant", "admin"

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
        bgcolor: "#3a4a60",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        pt: 3,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "left", mb: 2, px: 2 }}>
          <img src={namedLogo} alt="TrueGate Logo" style={{ height: 25 }} />
        </Box>
        <Divider sx={{ borderColor: "#2A2A40", mb: 1 }} />
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
                    color: isActive ? "#FFFFFF" : "#B0BEC5",
                    bgcolor: isActive ? "#5f687f" : "transparent",
                    "&:hover": {
                      bgcolor: "#2E2E3E",
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
          bgcolor: "transparent",
          width: "100%",
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
              <MenuIcon sx={{ color: "#06aff1" }} />
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
            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
              <IconButton size="small" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? (
                  <DarkModeIcon fontSize="small" />
                ) : (
                  <LightModeIcon fontSize="small" />
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
                color: "#06aff1",
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              SIGN OUT
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer with blurred backdrop */}
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
