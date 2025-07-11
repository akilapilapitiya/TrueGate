import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";
import namedLogoLight from "..//assets/logo-name-white.png";
import { useAppTheme } from "../hooks/useAppTheme";

const SideBar = ({ navLinks, onClose }) => {
  const { theme, isDarkMode } = useAppTheme();

  return (
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
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2, px: 2 }}>
          {isDarkMode ? (
            <img
              src={namedLogoLight}
              alt="TrueGate Logo"
              style={{ height: 25 }}
            />
          ) : (
            <img src={namedLogo} alt="TrueGate Logo" style={{ height: 25 }} />
          )}
        </Box>
        <Divider sx={{ borderColor: theme.palette.divider, mb: 1 }} />
        <List>
          {navLinks.map(({ label, icon, path }) => (
            <NavLink
              key={label}
              to={path}
              style={{ textDecoration: "none" }}
              onClick={onClose}
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
};

export default SideBar;
