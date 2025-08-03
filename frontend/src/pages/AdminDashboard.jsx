import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  HealthAndSafety as HealthIcon,
  Api as ApiIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardSummary = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/admin/dashboard');
      setSummary(response.data.summary);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
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
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                {trend > 0 ? (
                  <TrendingUpIcon color="success" fontSize="small" />
                ) : (
                  <TrendingDownIcon color="error" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color={trend > 0 ? 'success.main' : 'error.main'}
                  ml={0.5}
                >
                  {Math.abs(trend)}%
                </Typography>
              </Box>
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

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            mx: 'auto',
            mb: 2
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const SystemStatusCard = () => {
    if (!summary) return null;

    const memoryUsage = parseFloat(summary.system.memoryUsage);
    const isHealthy = memoryUsage < 80;
    const uptimeHours = Math.floor(summary.system.uptime / 3600);

    return (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">System Status</Typography>
            <Chip
              icon={isHealthy ? <CheckCircleIcon /> : <WarningIcon />}
              label={isHealthy ? 'Healthy' : 'Warning'}
              color={isHealthy ? 'success' : 'warning'}
              size="small"
            />
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Memory Usage
              </Typography>
              <Typography variant="h6">
                {memoryUsage}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Uptime
              </Typography>
              <Typography variant="h6">
                {uptimeHours}h
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={fetchDashboardSummary}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor system health, user activity, and security events
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchDashboardSummary}
        >
          Refresh
        </Button>
      </Box>

      {summary && (
        <>
          {/* Statistics Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Users"
                value={summary.users.total}
                icon={<PeopleIcon />}
                color="#1976d2"
                subtitle="Registered users"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Verified Users"
                value={summary.users.verified}
                icon={<CheckCircleIcon />}
                color="#2e7d32"
                subtitle="Email verified"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Security Events"
                value={summary.security.totalEvents}
                icon={<SecurityIcon />}
                color="#ed6c02"
                subtitle="Last 24 hours"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="High Risk Events"
                value={summary.security.highRiskEvents}
                icon={<WarningIcon />}
                color="#d32f2f"
                subtitle="Requires attention"
              />
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Typography variant="h5" gutterBottom mb={3}>
            Quick Actions
          </Typography>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="User Management"
                description="View and manage user accounts"
                icon={<PeopleIcon />}
                color="#1976d2"
                onClick={() => navigate('/admin/users')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Security Logs"
                description="Monitor security events and threats"
                icon={<SecurityIcon />}
                color="#ed6c02"
                onClick={() => navigate('/admin/logs')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="API Analytics"
                description="View API usage statistics"
                icon={<ApiIcon />}
                color="#9c27b0"
                onClick={() => navigate('/admin/api-stats')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="System Health"
                description="Monitor system performance"
                icon={<HealthIcon />}
                color="#2e7d32"
                onClick={() => navigate('/admin/health')}
              />
            </Grid>
          </Grid>

          {/* System Status and Recent Activity */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SystemStatusCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Recent Events</Typography>
                      <Chip label={summary.security.recentEvents} size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Medium Risk</Typography>
                      <Chip 
                        label={summary.security.mediumRiskEvents} 
                        size="small" 
                        color="warning" 
                      />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="body2">Low Risk</Typography>
                      <Chip 
                        label={summary.security.lowRiskEvents} 
                        size="small" 
                        color="success" 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard; 