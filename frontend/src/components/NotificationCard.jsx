import {
  Box,
  Typography,
  Paper,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Dummy notifications
  const notifications = [
    "New message from Alice",
    "Your order #1234 has shipped",
    "Password will expire in 3 days",
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: 280,
        maxWidth: 350,
        p: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" mb={1}>
        Notifications
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List dense disablePadding>
        {notifications.map((notif, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={notif} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box textAlign="center">
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/notifications");
            onClose();
          }}
          underline="hover"
          color="primary"
          sx={{ fontWeight: 500, cursor: "pointer" }}
        >
          View All Notifications
        </Link>
      </Box>
    </Paper>
  );
};

export default NotificationCard;
