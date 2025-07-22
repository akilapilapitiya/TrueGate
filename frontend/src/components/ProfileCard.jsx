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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../services/authService";

const ProfileCard = ({ onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const initials = (user?.firstName && user?.lastName)
    ? (user.firstName + " " + user.lastName)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleSignOut = () => {
    try {
      userSignOut(dispatch); // Your own service handles state & storage
      onClose(); // Close popover
      navigate("/login");
    } catch (err) {
      console.error("Sign-out error:", err);
      navigate("/error-page");
    }
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
          alt={user?.firstName || "User"}
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
          {initials}
        </Avatar>
        <Box>
          <Typography fontWeight={600}>
            {(user?.firstName + " " +user?.lastName) || "User"}
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
