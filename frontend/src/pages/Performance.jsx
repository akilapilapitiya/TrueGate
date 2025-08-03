import { useState, useEffect, useCallback } from "react";
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
  Alert,
  CircularProgress,
  Snackbar,
  Tooltip,
  Badge,
  Fade,
  Zoom,
  Slide,
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
  Dashboard,
  Analytics,
  Monitor,
  Settings,
  Info,
  PlayArrow,
  Pause,
  Stop,
  FiberManualRecord,
  RadioButtonUnchecked,
  RadioButtonChecked,
} from "@mui/icons-material";
import performanceService from "../services/performanceService";

const Performance = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    metrics: null,
    recentCalls: [],
    health: null
  });
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [dataFlow, setDataFlow] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch performance data
  const fetchPerformanceData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setConnectionStatus('connecting');
      const data = await performanceService.refreshAllData();
      setPerformanceData(data);
      setLastUpdated(new Date());
      setConnectionStatus('connected');
      setDataFlow(true);
      setUpdateCount(prev => prev + 1);
      setTimeout(() => setDataFlow(false), 2000);
    } catch (err) {
      console.error('Error fetching performance data:', err);
      setError(err.response?.data?.error || 'Failed to fetch performance data');
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchPerformanceData();
  }, [fetchPerformanceData]);

  // Auto-refresh every 10 seconds for real-time updates
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchPerformanceData, 10000);
    return () => clearInterval(interval);
  }, [fetchPerformanceData, autoRefresh]);

  // Calculate trend based on previous data
  const getTrendIndicator = (currentValue, previousValue) => {
    if (!previousValue) return 'stable';
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  // Main KPI metrics with enhanced styling
  const mainMetrics = performanceData.metrics ? [
    {
      title: "API Response Time",
      value: performanceData.metrics.mainMetrics?.apiResponseTime || "0ms",
      change: "-12%",
      trend: "up",
      icon: <Speed sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
    },
    {
      title: "Uptime",
      value: performanceData.metrics.mainMetrics?.uptime || "0%",
      change: "+0.02%",
      trend: "up",
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
    },
    {
      title: "Total Requests",
      value: performanceData.metrics.mainMetrics?.totalRequests || "0K",
      change: "+18%",
      trend: "up",
      icon: <Api sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
    },
    {
      title: "Error Rate",
      value: performanceData.metrics.mainMetrics?.errorRate || "0%",
      change: "-5%",
      trend: "down",
      icon: <Error sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
    },
  ] : [];

  // System metrics with enhanced details
  const systemMetrics = performanceData.metrics ? [
    {
      name: "CPU Usage",
      value: performanceData.metrics.systemMetrics?.cpu || 0,
      icon: <Computer />,
      color: theme.palette.warning.main,
      status: performanceData.metrics.systemMetrics?.cpu > 80 ? "critical" : 
             performanceData.metrics.systemMetrics?.cpu > 60 ? "warning" : "good",
      details: `${performanceData.metrics.systemMetrics?.cpuCount || 0} cores, Load: ${performanceData.metrics.systemMetrics?.loadAverage?.[0]?.toFixed(2) || 0}`,
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
    },
    {
      name: "Memory Usage",
      value: performanceData.metrics.systemMetrics?.memory || 0,
      icon: <Memory />,
      color: theme.palette.error.main,
      status: performanceData.metrics.systemMetrics?.memory > 85 ? "critical" : 
             performanceData.metrics.systemMetrics?.memory > 70 ? "warning" : "good",
      details: `${performanceData.metrics.systemMetrics?.usedMemory || 0}GB / ${performanceData.metrics.systemMetrics?.totalMemory || 0}GB`,
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
    },
    {
      name: "Disk Usage",
      value: performanceData.metrics.systemMetrics?.storage || 0,
      icon: <Storage />,
      color: theme.palette.success.main,
      status: performanceData.metrics.systemMetrics?.storage > 85 ? "critical" : 
             performanceData.metrics.systemMetrics?.storage > 70 ? "warning" : "excellent",
      details: performanceData.metrics.systemMetrics?.diskUsage ? 
        `${performanceData.metrics.systemMetrics.diskUsage.used}GB / ${performanceData.metrics.systemMetrics.diskUsage.total}GB used (${performanceData.metrics.systemMetrics.diskUsage.filesystem})` :
        `Real disk usage from system`,
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
    },
    {
      name: "Network I/O",
      value: performanceData.metrics.systemMetrics?.network || 0,
      icon: <NetworkCheck />,
      color: theme.palette.info.main,
      status: performanceData.metrics.systemMetrics?.network > 70 ? "critical" : 
             performanceData.metrics.systemMetrics?.network > 50 ? "warning" : "good",
      details: performanceData.metrics.systemMetrics?.networkUsage ? 
        `${performanceData.metrics.systemMetrics.networkUsage.interface} (${performanceData.metrics.systemMetrics.networkUsage.totalTransferred}MB transferred)` :
        `Real network activity from system`,
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
    },
  ] : [];

  // Recent API calls
  const recentCalls = performanceData.recentCalls || [];

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return theme.palette.success.main;
    if (status >= 400 && status < 500) return theme.palette.warning.main;
    if (status >= 500) return theme.palette.error.main;
    return theme.palette.grey[500];
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "excellent":
        return <Chip label="Excellent" size="small" color="success" variant="filled" />;
      case "good":
        return <Chip label="Good" size="small" color="primary" variant="filled" />;
      case "warning":
        return <Chip label="Warning" size="small" color="warning" variant="filled" />;
      case "critical":
        return <Chip label="Critical" size="small" color="error" variant="filled" />;
      default:
        return <Chip label="Normal" size="small" variant="outlined" />;
    }
  };

  // Calculate overall system health
  const getSystemHealthStatus = () => {
    if (!performanceData.metrics?.systemMetrics) return 'unknown';
    
    const { cpu, memory, storage, network } = performanceData.metrics.systemMetrics;
    const criticalCount = [cpu, memory, storage, network].filter(val => val > 80).length;
    const warningCount = [cpu, memory, storage, network].filter(val => val > 60 && val <= 80).length;
    
    if (criticalCount > 0) return 'critical';
    if (warningCount > 1) return 'warning';
    return 'healthy';
  };

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 1)} 0%, ${alpha(theme.palette.background.paper, 0.5)} 100%)`
    }}>
      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Loading Overlay */}
      {loading && !performanceData.metrics && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
          }}
        >
          <Fade in={loading}>
            <Box textAlign="center">
              <CircularProgress size={80} thickness={4} />
              <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
                Loading Performance Data...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Gathering real-time system metrics
              </Typography>
            </Box>
          </Fade>
        </Box>
      )}

      {/* Enhanced Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          py: { xs: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main} 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
            gap={3}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                >
                  <Dashboard sx={{ fontSize: 28 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 0.5,
                    }}
                  >
                    API Performance Dashboard
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Real-time monitoring and analytics for your API infrastructure
                  </Typography>
                </Box>
              </Box>

              {/* Status Indicators */}
              <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: connectionStatus === 'connected' ? theme.palette.success.main : 
                               connectionStatus === 'connecting' ? theme.palette.warning.main : 
                               theme.palette.error.main,
                      animation: connectionStatus === 'connecting' ? 'pulse 1s infinite' : 'none',
                      boxShadow: connectionStatus === 'connected' ? `0 0 8px ${alpha(theme.palette.success.main, 0.5)}` : 'none',
                    }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {connectionStatus === 'connected' ? 'Connected' : 
                     connectionStatus === 'connecting' ? 'Connecting...' : 'Connection Error'}
                  </Typography>
                </Box>

                <Chip
                  label={loading ? "Updating..." : "Live Monitoring"}
                  color={loading ? "warning" : "success"}
                  variant="filled"
                  size="small"
                  icon={loading ? <CircularProgress size={16} /> : <SignalCellularAlt />}
                  sx={{ fontWeight: 600 }}
                />

                {performanceData.health && (
                  <Chip
                    label={performanceData.health.status}
                    size="small"
                    color={performanceData.health.status === 'healthy' ? 'success' : 
                           performanceData.health.status === 'warning' ? 'warning' : 'error'}
                    variant="filled"
                    icon={<RadioButtonChecked />}
                  />
                )}

                <Typography variant="body2" color="text.secondary">
                  Last updated: {lastUpdated ? `${Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s ago` : 'Never'}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Updates: {updateCount}
                </Typography>
              </Box>
            </Box>

            {/* Control Panel */}
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title={autoRefresh ? "Pause auto-refresh" : "Resume auto-refresh"}>
                <IconButton
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: autoRefresh ? theme.palette.primary.main : theme.palette.grey[500],
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  {autoRefresh ? <Pause /> : <PlayArrow />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Refresh data">
                <IconButton
                  onClick={fetchPerformanceData}
                  disabled={loading}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      transform: "rotate(180deg)",
                    },
                    transition: "all 0.3s ease",
                    animation: loading ? "pulse 2s infinite" : "none",
                  }}
                >
                  {loading ? <CircularProgress size={20} /> : <Refresh />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Data Flow Indicator */}
      {dataFlow && (
        <Slide direction="down" in={dataFlow} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              zIndex: 1000,
              animation: 'slideIn 2s ease-in-out',
              '@keyframes slideIn': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' },
              },
            }}
          />
        </Slide>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {!performanceData.metrics && !loading ? (
          <Box textAlign="center" py={12}>
            <Zoom in={true}>
              <Box>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: alpha(theme.palette.grey[300], 0.5),
                    color: theme.palette.grey[500],
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <Analytics sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
                  No Performance Data Available
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                  Performance monitoring data will appear here once API calls are made to your endpoints.
                </Typography>
              </Box>
            </Zoom>
          </Box>
        ) : (
          <>
            {/* Main KPI Cards */}
            <Grid container spacing={3} mb={6}>
              {mainMetrics.map((metric, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        background: metric.gradient,
                        transition: "all 0.3s ease",
                        position: 'relative',
                        overflow: 'hidden',
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 20px 40px ${alpha(metric.color, 0.15)}`,
                          borderColor: alpha(metric.color, 0.3),
                        },
                        "&::before": {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${metric.color}, ${alpha(metric.color, 0.7)})`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          mb={3}
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2,
                              bgcolor: alpha(metric.color, 0.1),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: metric.color,
                              border: `1px solid ${alpha(metric.color, 0.2)}`,
                            }}
                          >
                            {metric.icon}
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            {metric.trend === "up" ? (
                              <TrendingUp
                                sx={{
                                  fontSize: 18,
                                  color: metric.title === "Error Rate" ? theme.palette.error.main : theme.palette.success.main,
                                }}
                              />
                            ) : (
                              <TrendingDown
                                sx={{
                                  fontSize: 18,
                                  color: metric.title === "Error Rate" ? theme.palette.success.main : theme.palette.error.main,
                                }}
                              />
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                color: metric.title === "Error Rate"
                                  ? metric.trend === "down" ? theme.palette.success.main : theme.palette.error.main
                                  : metric.trend === "up" ? theme.palette.success.main : theme.palette.error.main,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                              }}
                            >
                              {metric.change}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="h3"
                          fontWeight="bold"
                          sx={{ mb: 1, color: theme.palette.text.primary }}
                        >
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {metric.title}
                        </Typography>
                        
                        {/* Loading indicator */}
                        {loading && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: theme.palette.warning.main,
                              animation: 'blink 1s infinite',
                              '@keyframes blink': {
                                '0%, 50%': { opacity: 1 },
                                '51%, 100%': { opacity: 0.3 },
                              },
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>

            {/* System Metrics & Recent Activity */}
            <Grid container spacing={4}>
              {/* System Metrics */}
              <Grid item xs={12} lg={7}>
                <Fade in={true} timeout={800}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      height: "100%",
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.5)} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                            }}
                          >
                            <Monitor />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              System Performance
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Real-time system metrics
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={getSystemHealthStatus()}
                          size="small"
                          color={getSystemHealthStatus() === 'healthy' ? 'success' : 
                                 getSystemHealthStatus() === 'warning' ? 'warning' : 'error'}
                          variant="filled"
                          icon={<FiberManualRecord />}
                        />
                      </Box>

                      <Box>
                        {systemMetrics.map((metric, index) => (
                          <Box key={index} sx={{ mb: 4 }}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={2}
                            >
                              <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: alpha(metric.color, 0.1),
                                    color: metric.color,
                                    border: `1px solid ${alpha(metric.color, 0.2)}`,
                                  }}
                                >
                                  {metric.icon}
                                </Avatar>
                                <Box>
                                  <Typography variant="body1" fontWeight="bold">
                                    {metric.name}
                                  </Typography>
                                  {metric.details && (
                                    <Typography variant="caption" color="text.secondary">
                                      {metric.details}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="h6" fontWeight="bold" color={metric.color}>
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
                                  background: `linear-gradient(90deg, ${metric.color}, ${alpha(metric.color, 0.7)})`,
                                },
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>

              {/* Recent API Calls */}
              <Grid item xs={12} lg={5}>
                <Fade in={true} timeout={1000}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      height: "100%",
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.5)} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: alpha(theme.palette.info.main, 0.1),
                              color: theme.palette.info.main,
                            }}
                          >
                            <Api />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              Recent API Calls
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Latest endpoint activity
                            </Typography>
                          </Box>
                        </Box>
                        <Badge badgeContent={recentCalls.length} color="primary">
                          <Chip
                            label="Live"
                            size="small"
                            variant="filled"
                            color="primary"
                            icon={<RadioButtonChecked />}
                          />
                        </Badge>
                      </Box>

                      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                        {recentCalls.length === 0 ? (
                          <Box textAlign="center" py={4}>
                            <Typography variant="body2" color="text.secondary">
                              No recent API calls detected
                            </Typography>
                          </Box>
                        ) : (
                          <List sx={{ p: 0 }}>
                            {recentCalls.map((call, index) => (
                              <Box key={index}>
                                <ListItem 
                                  sx={{ 
                                    px: 0, 
                                    py: 2,
                                    borderRadius: 1,
                                    mb: 1,
                                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: alpha(theme.palette.background.paper, 0.8),
                                      transform: 'translateX(4px)',
                                    }
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: alpha(getStatusColor(call.status), 0.1),
                                        color: getStatusColor(call.status),
                                        fontSize: "0.75rem",
                                        fontWeight: "bold",
                                        border: `2px solid ${alpha(getStatusColor(call.status), 0.2)}`,
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
                                          fontWeight="bold"
                                          sx={{
                                            fontFamily: "monospace",
                                            fontSize: "0.9rem",
                                            color: theme.palette.text.primary,
                                          }}
                                        >
                                          {call.method} {call.endpoint}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                          {call.timestamp}
                                        </Typography>
                                      </Box>
                                    }
                                    secondary={
                                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                        Response time: {call.responseTime}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                {index < recentCalls.length - 1 && (
                                  <Divider sx={{ ml: 7, opacity: 0.3 }} />
                                )}
                              </Box>
                            ))}
                          </List>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            </Grid>

            {/* Performance Summary Cards */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
                Performance Summary
              </Typography>
              <Grid container spacing={3}>
                {performanceData.metrics && [
                  {
                    title: "Data Transferred",
                    value: performanceData.metrics?.summary?.dataTransferred || "0 GB",
                    icon: <DataUsage />,
                    color: theme.palette.primary.main,
                  },
                  {
                    title: "SLA Compliance",
                    value: performanceData.metrics?.summary?.slaCompliance || "0%",
                    icon: <Timer />,
                    color: theme.palette.success.main,
                  },
                  {
                    title: "Security Events",
                    value: performanceData.metrics?.summary?.securityEvents || 0,
                    icon: <Security />,
                    color: theme.palette.info.main,
                  },
                  {
                    title: "Avg Response Time",
                    value: performanceData.metrics?.summary?.avgResponseTime || "0ms",
                    icon: <Timeline />,
                    color: theme.palette.warning.main,
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 3,
                          textAlign: "center",
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          background: `linear-gradient(135deg, ${alpha(item.color, 0.05)} 0%, ${alpha(item.color, 0.02)} 100%)`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 12px 24px ${alpha(item.color, 0.15)}`,
                            borderColor: alpha(item.color, 0.3),
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: alpha(item.color, 0.1),
                            color: item.color,
                            mx: 'auto',
                            mb: 2,
                            border: `2px solid ${alpha(item.color, 0.2)}`,
                          }}
                        >
                          {item.icon}
                        </Avatar>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                          {item.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {item.title}
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>

      {/* Enhanced Footer */}
      <Box sx={{ py: 6, mt: 8, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              &copy; {new Date().getFullYear()} TrueGate API Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Real-time monitoring and analytics • Built with React & Node.js
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Performance;