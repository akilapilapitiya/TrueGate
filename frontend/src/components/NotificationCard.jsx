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
  Avatar,
  ListItemAvatar,
  Chip,
} from "@mui/material";
import {
  NotificationsActive,
  LocalShipping,
  Security,
  Circle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Enhanced notifications with icons, timestamps, and read status
  const notifications = [
    {
      id: 1,
      message: "New message from Alice",
      timestamp: "2 min ago",
      icon: <NotificationsActive />,
      unread: true,
      color: theme.palette.primary.main,
    },
    {
      id: 2,
      message: "Your order #1234 has shipped",
      timestamp: "1 hour ago",
      icon: <LocalShipping />,
      unread: true,
      color: theme.palette.success.main,
    },
    {
      id: 3,
      message: "Password will expire in 3 days",
      timestamp: "3 hours ago",
      icon: <Security />,
      unread: false,
      color: theme.palette.warning.main,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Paper
      elevation={4}
      sx={{
        width: 320, // Fixed width instead of min/max
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" fontWeight={600}>
          Notifications
        </Typography>
        {unreadCount > 0 && (
          <Chip
            label={unreadCount}
            size="small"
            color="primary"
            sx={{
              height: 20,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          />
        )}
      </Box>
      
      <Divider sx={{ mb: 1 }} />
      
      <List dense disablePadding sx={{ maxHeight: 300, overflow: 'auto' }}>
        {notifications.map((notif, index) => (
          <ListItem 
            key={notif.id} 
            divider={index < notifications.length - 1}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              position: 'relative',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: `${notif.color}15`, // 15% opacity
                  color: notif.color,
                }}
              >
                {notif.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: notif.unread ? 600 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flexGrow: 1,
                    }}
                  >
                    {notif.message}
                  </Typography>
                  {notif.unread && (
                    <Circle 
                      sx={{ 
                        fontSize: 8, 
                        color: theme.palette.primary.main,
                        flexShrink: 0,
                      }} 
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  {notif.timestamp}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {notifications.length === 0 && (
        <Box 
          textAlign="center" 
          py={3}
          sx={{ color: theme.palette.text.secondary }}
        >
          <Typography variant="body2">
            No new notifications
          </Typography>
        </Box>
      )}
      
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
          sx={{ 
            fontWeight: 500, 
            cursor: "pointer",
            padding: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            transition: 'background-color 0.2s ease',
          }}
        >
          View All Notifications
        </Link>
      </Box>
    </Paper>
  );
};

export default NotificationCard;