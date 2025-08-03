import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Computer as ComputerIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import axiosInstance from '../services/axiosInstance';

const AdminHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/admin/health');
      setHealth(response.data.health);
      setError(null);
    } catch (err) {
      setError('Failed to load system health');
      console.error('Health error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getSystemStatus = (memoryUsage) => {
    if (memoryUsage < 70) return { status: 'Healthy', color: 'success', icon: <CheckCircleIcon /> };
    if (memoryUsage < 90) return { status: 'Warning', color: 'warning', icon: <WarningIcon /> };
    return { status: 'Critical', color: 'error', icon: <ErrorIcon /> };
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            System Health
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor system performance and resource usage
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchHealth}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {health && (
        <>
          {/* System Status */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="System Status"
                value={getSystemStatus(parseFloat(health.system.memory.usage)).status}
                icon={getSystemStatus(parseFloat(health.system.memory.usage)).icon}
                color={getSystemStatus(parseFloat(health.system.memory.usage)).color === 'success' ? '#2e7d32' : 
                       getSystemStatus(parseFloat(health.system.memory.usage)).color === 'warning' ? '#ed6c02' : '#d32f2f'}
                subtitle="Overall health"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Memory Usage"
                value={`${health.system.memory.usage}%`}
                icon={<MemoryIcon />}
                color="#1976d2"
                subtitle="RAM utilization"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Uptime"
                value={formatUptime(health.system.uptime)}
                icon={<TimerIcon />}
                color="#9c27b0"
                subtitle="System running time"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="CPU Cores"
                value={health.system.cpu.cores}
                icon={<ComputerIcon />}
                color="#ed6c02"
                subtitle="Available cores"
              />
            </Grid>
          </Grid>

          {/* Memory Details */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Memory Information
                  </Typography>
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Total Memory</Typography>
                      <Typography variant="body2">{formatBytes(health.system.memory.total)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Used Memory</Typography>
                      <Typography variant="body2">{formatBytes(health.system.memory.used)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="body2">Free Memory</Typography>
                      <Typography variant="body2">{formatBytes(health.system.memory.free)}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={parseFloat(health.system.memory.usage)}
                      sx={{ height: 10, borderRadius: 5 }}
                      color={parseFloat(health.system.memory.usage) > 90 ? 'error' : 
                             parseFloat(health.system.memory.usage) > 70 ? 'warning' : 'success'}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <ComputerIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Platform"
                        secondary={health.system.platform}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <StorageIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Architecture"
                        secondary={health.system.arch}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SpeedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Node Version"
                        secondary={health.system.nodeVersion}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TimerIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Process Uptime"
                        secondary={formatUptime(health.process.uptime)}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* CPU Load and Process Info */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    CPU Load Average
                  </Typography>
                  <Box>
                    {health.system.cpu.loadAverage.map((load, index) => (
                      <Box key={index} mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body2">
                            {index === 0 ? '1 minute' : index === 1 ? '5 minutes' : '15 minutes'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {load.toFixed(2)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((load / health.system.cpu.cores) * 100, 100)}
                          sx={{ height: 8, borderRadius: 4 }}
                          color={load > health.system.cpu.cores * 0.8 ? 'error' : 
                                 load > health.system.cpu.cores * 0.6 ? 'warning' : 'success'}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Process Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Process ID"
                        secondary={health.process.pid}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MemoryIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="RSS Memory"
                        secondary={formatBytes(health.process.memory.rss)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <StorageIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Heap Used"
                        secondary={formatBytes(health.process.memory.heapUsed)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SpeedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Heap Total"
                        secondary={formatBytes(health.process.memory.heapTotal)}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Logs Information */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Logs Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary.main">
                          {health.logs.securityLogs}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Security Logs (Last Hour)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="secondary.main">
                          {health.logs.totalLogs}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Logs (Last Hour)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="info.main">
                          {new Date(health.timestamp).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Last Updated
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main">
                          Active
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          System Status
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminHealth; 