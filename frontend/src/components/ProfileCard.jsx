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
        width: 280, // Fixed width instead of min/max
        p: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        position: 'relative', // Ensure proper positioning context
        zIndex: 1300, // High z-index to appear above other elements
        // Prevent the card from going outside viewport
        maxHeight: '90vh',
        overflow: 'auto',
        // Add a small arrow pointer
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -8,
          right: 20,
          width: 16,
          height: 16,
          backgroundColor: theme.palette.background.paper,
          transform: 'rotate(45deg)',
          borderLeft: `1px solid ${theme.palette.divider}`,
          borderTop: `1px solid ${theme.palette.divider}`,
          zIndex: -1,
        },
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
            flexShrink: 0, // Prevent avatar from shrinking
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography 
            fontWeight={600}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {(user?.firstName + " " + user?.lastName) || "User"}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
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
          sx={{
            borderRadius: 1,
            mb: 0.5,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/settings");
            onClose();
          }}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
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
        sx={{ 
          mt: 2, 
          textTransform: "none", 
          fontWeight: 500,
          borderRadius: 2,
        }}
      >
        Sign Out
      </Button>
    </Paper>
  );
};

export default ProfileCard;