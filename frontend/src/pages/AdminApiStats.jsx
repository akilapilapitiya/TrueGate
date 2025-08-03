import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Api as ApiIcon,
  Speed as SpeedIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import axiosInstance from '../services/axiosInstance';

const AdminApiStats = () => {
  const [apiStats, setApiStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(24);

  const fetchApiStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/admin/api-stats?hours=${timeRange}`);
      setApiStats(response.data.apiStats);
      setError(null);
    } catch (err) {
      setError('Failed to load API statistics');
      console.error('API stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiStats();
  }, [timeRange]);

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
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

  const TopListCard = ({ title, data, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box>
          {Object.entries(data || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([key, value], index) => (
              <Box key={key} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ 
                  maxWidth: '70%', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {key}
                </Typography>
                <Chip 
                  label={value} 
                  size="small" 
                  color={color}
                  sx={{ minWidth: '40px' }}
                />
              </Box>
            ))}
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
            API Analytics
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor API usage and performance metrics
          </Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value={1}>Last Hour</MenuItem>
              <MenuItem value={6}>Last 6 Hours</MenuItem>
              <MenuItem value={24}>Last 24 Hours</MenuItem>
              <MenuItem value={72}>Last 3 Days</MenuItem>
              <MenuItem value={168}>Last Week</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchApiStats}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {apiStats && (
        <>
          {/* Main Statistics */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Requests"
                value={apiStats.totalRequests}
                icon={<ApiIcon />}
                color="#1976d2"
                subtitle="API calls"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Success Rate"
                value={`${apiStats.successRate}%`}
                icon={<CheckCircleIcon />}
                color="#2e7d32"
                subtitle="Successful requests"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Error Rate"
                value={`${apiStats.errorRate}%`}
                icon={<ErrorIcon />}
                color="#d32f2f"
                subtitle="Failed requests"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Performance"
                value="Good"
                icon={<SpeedIcon />}
                color="#ed6c02"
                subtitle="System health"
              />
            </Grid>
          </Grid>

          {/* Charts and Lists */}
          <Grid container spacing={3}>
            {/* Request Methods */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Requests by Method
                  </Typography>
                  <Box>
                    {Object.entries(apiStats.requestsByMethod || {})
                      .sort(([,a], [,b]) => b - a)
                      .map(([method, count]) => (
                        <Box key={method} mb={2}>
                          <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2">
                              {method}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {count} requests
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(count / apiStats.totalRequests) * 100}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Top IPs */}
            <Grid item xs={12} md={6}>
              <TopListCard
                title="Top IP Addresses"
                data={apiStats.topIPs}
                color="primary"
              />
            </Grid>

            {/* Top User Agents */}
            <Grid item xs={12} md={6}>
              <TopListCard
                title="Top User Agents"
                data={apiStats.topUserAgents}
                color="secondary"
              />
            </Grid>

            {/* Top Paths */}
            <Grid item xs={12} md={6}>
              <TopListCard
                title="Most Requested Paths"
                data={apiStats.requestsByPath}
                color="info"
              />
            </Grid>
          </Grid>

          {/* Detailed Statistics */}
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main">
                          {apiStats.successRate}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Success Rate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="error.main">
                          {apiStats.errorRate}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Error Rate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary.main">
                          {apiStats.totalRequests}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Requests
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

export default AdminApiStats; 