import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    // Sign out logic here
    onClose(); // Close popup
  };

  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: 240,
        maxWidth: 300,
        p: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
  <Avatar
    alt={user?.displayName || "User"}
    sx={{
      width: 48,
      height: 48,
      bgcolor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      border: `2px solid ${theme.palette.primary.light}`,
      fontWeight: 600,
      fontSize: 16,
    }}
  >
    {user?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </Avatar>
  <Box>
    <Typography fontWeight={600}>
      {user?.displayName || "User"}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {user?.email || ""}
    </Typography>
  </Box>
</Box>

      <Divider sx={{ mb: 1 }} />

      <List disablePadding>
  <ListItemButton
    onClick={() => {
      navigate("/profile");
      onClose();
    }}
  >
    <ListItemText primary="Profile" /> 
  </ListItemButton>
  <ListItemButton
    onClick={() => {
      navigate("/settings");
      onClose();
    }}
  >
    <ListItemText primary="Settings" /> 
  </ListItemButton>
</List>

      <Button
        fullWidth
        variant="outlined"
        color="error"
        onClick={handleSignOut}
        sx={{ mt: 2, textTransform: "none", fontWeight: 500 }}
      >
        Sign Out
      </Button>
    </Paper>
  );
};

export default ProfileCard;
