import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
  LinearProgress,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Speed,
  Timeline,
  Security,
  Cloud,
  Memory,
  Storage,
  NetworkCheck,
  Api,
  CheckCircle,
  Warning,
  Error,
  Refresh,
  MoreVert,
  Computer,
  DataUsage,
  Timer,
  SignalCellularAlt,
} from "@mui/icons-material";

const Performance = () => {
  const theme = useTheme();

  // Main KPI metrics
  const mainMetrics = [
    {
      title: "API Response Time",
      value: "127ms",
      change: "-12%",
      trend: "up",
      icon: <Speed sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      title: "Uptime",
      value: "99.98%",
      change: "+0.02%",
      trend: "up",
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      title: "Total Requests",
      value: "847.2K",
      change: "+18%",
      trend: "up",
      icon: <Api sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    {
      title: "Error Rate",
      value: "0.12%",
      change: "-5%",
      trend: "down",
      icon: <Error sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
  ];

  // System metrics
  const systemMetrics = [
    {
      name: "CPU Usage",
      value: 67,
      icon: <Computer />,
      color: theme.palette.warning.main,
      status: "good",
    },
    {
      name: "Memory Usage",
      value: 84,
      icon: <Memory />,
      color: theme.palette.error.main,
      status: "critical",
    },
    {
      name: "Storage",
      value: 42,
      icon: <Storage />,
      color: theme.palette.success.main,
      status: "excellent",
    },
    {
      name: "Network I/O",
      value: 56,
      icon: <NetworkCheck />,
      color: theme.palette.info.main,
      status: "good",
    },
  ];

  // Recent API calls
  const recentCalls = [
    {
      endpoint: "/api/v1/users",
      method: "GET",
      status: 200,
      responseTime: "89ms",
      timestamp: "2 min ago",
    },
    {
      endpoint: "/api/v1/auth/login",
      method: "POST",
      status: 200,
      responseTime: "156ms",
      timestamp: "3 min ago",
    },
    {
      endpoint: "/api/v1/devices",
      method: "GET",
      status: 500,
      responseTime: "2.1s",
      timestamp: "5 min ago",
    },
    {
      endpoint: "/api/v1/notifications",
      method: "POST",
      status: 201,
      responseTime: "234ms",
      timestamp: "8 min ago",
    },
    {
      endpoint: "/api/v1/security/events",
      method: "GET",
      status: 200,
      responseTime: "67ms",
      timestamp: "12 min ago",
    },
  ];

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return theme.palette.success.main;
    if (status >= 400 && status < 500) return theme.palette.warning.main;
    if (status >= 500) return theme.palette.error.main;
    return theme.palette.grey[500];
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "excellent":
        return <Chip label="Excellent" size="small" color="success" />;
      case "good":
        return <Chip label="Good" size="small" color="primary" />;
      case "critical":
        return <Chip label="Critical" size="small" color="error" />;
      default:
        return <Chip label="Normal" size="small" />;
    }
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 4, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  pt: 4,
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                API Performance Dashboard
              </Typography>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <Chip
                  label="Live Monitoring"
                  color="success"
                  variant="outlined"
                  size="small"
                  icon={<SignalCellularAlt />}
                />
                <Typography variant="body2" color="text.secondary">
                  Last updated: 30 seconds ago
                </Typography>
              </Box>
            </Box>
            <IconButton
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  transform: "rotate(180deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Refresh color="primary" />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Main Metrics Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          {mainMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 24px ${alpha(metric.color, 0.15)}`,
                    borderColor: alpha(metric.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: metric.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: metric.color,
                      }}
                    >
                      {metric.icon}
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {metric.trend === "up" ? (
                        <TrendingUp
                          sx={{
                            fontSize: 16,
                            color:
                              metric.title === "Error Rate"
                                ? theme.palette.error.main
                                : theme.palette.success.main,
                          }}
                        />
                      ) : (
                        <TrendingDown
                          sx={{
                            fontSize: 16,
                            color:
                              metric.title === "Error Rate"
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                          }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            metric.title === "Error Rate"
                              ? metric.trend === "down"
                                ? theme.palette.success.main
                                : theme.palette.error.main
                              : metric.trend === "up"
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                          fontWeight: 600,
                        }}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 0.5, color: theme.palette.text.primary }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* System Metrics & Recent Activity */}
      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* System Metrics */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" fontWeight="bold">
                    System Performance
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box>
                  {systemMetrics.map((metric, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: alpha(metric.color, 0.1),
                              color: metric.color,
                            }}
                          >
                            {metric.icon}
                          </Avatar>
                          <Typography variant="body2" fontWeight="medium">
                            {metric.name}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" fontWeight="bold">
                            {metric.value}%
                          </Typography>
                          {getStatusChip(metric.status)}
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={metric.value}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: alpha(metric.color, 0.1),
                          "& .MuiLinearProgress-bar": {
                            bgcolor: metric.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent API Calls */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Recent API Calls
                  </Typography>
                  <Chip
                    label={`${recentCalls.length} calls`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <List sx={{ p: 0 }}>
                  {recentCalls.map((call, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor: alpha(getStatusColor(call.status), 0.1),
                              color: getStatusColor(call.status),
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                            }}
                          >
                            {call.status}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              flexWrap="wrap"
                              gap={1}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="medium"
                                sx={{
                                  fontFamily: "monospace",
                                  fontSize: "0.85rem",
                                }}
                              >
                                {call.method} {call.endpoint}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {call.timestamp}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              Response time: {call.responseTime}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < recentCalls.length - 1 && (
                        <Divider sx={{ ml: 7 }} />
                      )}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Performance Summary Cards */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.grey[100], 0.5),
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <DataUsage
                  sx={{
                    fontSize: 32,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  12.4 GB
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Data Transferred Today
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Timer
                  sx={{
                    fontSize: 32,
                    color: theme.palette.success.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  99.2%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  SLA Compliance
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Security
                  sx={{
                    fontSize: 32,
                    color: theme.palette.info.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  847
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Security Events
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Timeline
                  sx={{
                    fontSize: 32,
                    color: theme.palette.warning.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  156ms
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg Response Time
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="text.secondary">
            &copy; {new Date().getFullYear()} TrueGate API Dashboard. Real-time monitoring and analytics.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Performance;