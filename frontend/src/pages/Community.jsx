import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  InputAdornment,
  Badge,
} from "@mui/material";
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Search,
  People,
  Chat,
  Forum,
  Notifications,
  Security,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { onlineUsers, getUserStats, searchUsers } from "../data/OnlineUser";

const Community = () => {
  const theme = useTheme();
  const { user } = useSelector((store) => store.user);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Current user initials
  const userInitials =
    user?.firstName && user?.lastName
      ? (user.firstName + " " + user.lastName)
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "U";

  // Get filtered users based on search
  const filteredUsers = searchUsers(searchQuery);

  // Dummy chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sandali Hiranya",
      senderInitials: "SH",
      content: " Hey ! Welcome to the TrueGate help! ",
      timestamp: "10:30 AM",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender:
        `${user?.firstName || "You"} ${user?.lastName || ""}`.trim() || "You",
      senderInitials: userInitials,
      content:
        "I am having some issues with the camera feed. It keeps disconnecting.",
      timestamp: "10:40 AM",
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: "Sandali Hiranya",
      senderInitials: "SH",
      content:
        "Okay lets troubleshoot that. Can you check if the camera is powered on and connected to the network?",
      timestamp: "10:42 AM",
      isCurrentUser: false,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender:
          `${user?.firstName || "You"} ${user?.lastName || ""}`.trim() || "You",
        senderInitials: userInitials,
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return theme.palette.success.main;
      case "away":
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[400];
    }
  };

  const communityStats = [
    {
      icon: <People />,
      label: "Active Users",
      value: "1,247",
      color: theme.palette.primary.main,
    },
    {
      icon: <Chat />,
      label: "Messages Today",
      value: "3,891",
      color: theme.palette.info.main,
    },
    {
      icon: <Security />,
      label: "Security Tips",
      value: "156",
      color: theme.palette.success.main,
    },
    {
      icon: <Forum />,
      label: "Discussions",
      value: "89",
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 2, md: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          flexShrink: 0,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 } }}>
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "2rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              TrueGate Community
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Connect, Share, and Learn with Fellow Security Enthusiasts
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Chat Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 1, md: 2 },
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%", overflow: "hidden" }}>
          {/* Online Users Sidebar */}
          <Grid item xs={12} md={3} sx={{ height: "100%", display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: { xs: "200px", md: "100%" },
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1, md: 2 },
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(
                    theme.palette.divider,
                    0.1
                  )}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  <People
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                      fontSize: { xs: "1rem", md: "1.5rem" },
                    }}
                  />
                  Online Users
                </Typography>
                <TextField
                  size="small"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    mt: 1,
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                }}
              >
                <List disablePadding>
                  {filteredUsers.map((user) => (
                    <ListItem
                      key={user.id}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          variant="dot"
                          sx={{
                            "& .MuiBadge-badge": {
                              bgcolor: getStatusColor(user.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: { xs: 32, md: 40 },
                              height: { xs: 32, md: 40 },
                              bgcolor: theme.palette.secondary.main,
                              fontSize: { xs: "0.7rem", md: "0.9rem" },
                              fontWeight: 600,
                            }}
                          >
                            {user.initials}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight="medium"
                            sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                          >
                            {user.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Chip
                              label={user.role}
                              size="small"
                              variant="outlined"
                              sx={{
                                height: { xs: 16, md: 18 },
                                fontSize: { xs: "0.6rem", md: "0.7rem" },
                                mb: 0.5,
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ fontSize: { xs: "0.6rem", md: "0.75rem" } }}
                            >
                              {user.lastSeen}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Chat Area */}
          <Grid item xs={12} md={9} sx={{ height: "100%", display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: { xs: "calc(100vh - 300px)", md: "100%" },
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Chat Header */}
              <Box
                sx={{
                  p: { xs: 1.5, md: 2 },
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(
                    theme.palette.divider,
                    0.1
                  )}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  <Chat
                    sx={{
                      mr: 1,
                      verticalAlign: "middle",
                      fontSize: { xs: "1rem", md: "1.5rem" },
                    }}
                  />
                  General Discussion
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                >
                  Sandali is currently typing...
                </Typography>
              </Box>

              {/* Messages Area */}
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                  p: { xs: 1, md: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1, md: 2 },
                }}
              >
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: { xs: 1, md: 2 },
                      flexDirection: msg.isCurrentUser ? "row-reverse" : "row",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 28, md: 36 },
                        height: { xs: 28, md: 36 },
                        bgcolor: msg.isCurrentUser
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                        fontSize: { xs: "0.7rem", md: "0.8rem" },
                        fontWeight: 600,
                      }}
                    >
                      {msg.senderInitials}
                    </Avatar>
                    <Box sx={{ maxWidth: { xs: "75%", md: "70%" } }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          textAlign: msg.isCurrentUser ? "right" : "left",
                          display: "block",
                          mb: 0.5,
                          fontSize: { xs: "0.65rem", md: "0.75rem" },
                        }}
                      >
                        {msg.sender} • {msg.timestamp}
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{
                          p: { xs: 1, md: 1.5 },
                          borderRadius: 2,
                          bgcolor: msg.isCurrentUser
                            ? theme.palette.primary.main
                            : alpha(theme.palette.grey[100], 0.8),
                          color: msg.isCurrentUser
                            ? theme.palette.getContrastText(
                                theme.palette.primary.main
                              )
                            : theme.palette.text.primary,
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.1
                          )}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.4,
                            fontSize: { xs: "0.8rem", md: "0.875rem" },
                          }}
                        >
                          {msg.content}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box
                sx={{
                  p: { xs: 1, md: 2 },
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  bgcolor: alpha(theme.palette.grey[50], 0.5),
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 0.5, md: 1 },
                    alignItems: "flex-end",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" color="primary">
                            <EmojiEmotions fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <AttachFile fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    sx={{
                      minWidth: { xs: 40, md: 48 },
                      height: { xs: 36, md: 40 },
                      borderRadius: 3,
                      "&:hover": {
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Send fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Community;
