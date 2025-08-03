import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Tooltip,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import axiosInstance from '../services/axiosInstance';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLogs: 0,
    logsPerPage: 50
  });
  const [filters, setFilters] = useState({
    hours: 24,
    level: '',
    event: '',
    ip: '',
    riskLevel: ''
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.logsPerPage,
        ...filters
      });
      
      const response = await axiosInstance.get(`/api/admin/logs?${params}`);
      setLogs(response.data.logs);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to load security logs');
      console.error('Logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [pagination.currentPage, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, currentPage: value }));
  };

  const handleExportLogs = async (format = 'json') => {
    try {
      const params = new URLSearchParams({
        hours: filters.hours,
        format
      });
      
      const response = await axiosInstance.get(`/api/admin/export-logs?${params}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `security-logs-${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'SECURITY':
        return <SecurityIcon color="error" />;
      case 'ERROR':
        return <ErrorIcon color="error" />;
      case 'WARN':
        return <WarningIcon color="warning" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getRiskLevelChip = (riskLevel) => {
    let color = 'default';
    switch (riskLevel) {
      case 'HIGH':
        color = 'error';
        break;
      case 'MEDIUM':
        color = 'warning';
        break;
      case 'LOW':
        color = 'success';
        break;
    }
    return <Chip label={riskLevel} color={color} size="small" />;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

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
            Security Logs
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor security events and system activity
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportLogs('json')}
          >
            Export JSON
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportLogs('csv')}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchLogs}
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

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={filters.hours}
                  onChange={(e) => handleFilterChange('hours', e.target.value)}
                  label="Time Range"
                >
                  <MenuItem value={1}>Last Hour</MenuItem>
                  <MenuItem value={6}>Last 6 Hours</MenuItem>
                  <MenuItem value={24}>Last 24 Hours</MenuItem>
                  <MenuItem value={72}>Last 3 Days</MenuItem>
                  <MenuItem value={168}>Last Week</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  label="Level"
                >
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="SECURITY">Security</MenuItem>
                  <MenuItem value="ERROR">Error</MenuItem>
                  <MenuItem value="WARN">Warning</MenuItem>
                  <MenuItem value="INFO">Info</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Event Type"
                value={filters.event}
                onChange={(e) => handleFilterChange('event', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="IP Address"
                value={filters.ip}
                onChange={(e) => handleFilterChange('ip', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={filters.riskLevel}
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                  label="Risk Level"
                >
                  <MenuItem value="">All Risk Levels</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="textSecondary">
                {pagination.totalLogs} logs
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">
                    {formatTimestamp(log.timestamp)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getLevelIcon(log.level)}
                    <Typography variant="body2">
                      {log.level}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log.event}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {log.details?.ip || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {getRiskLevelChip(log.details?.riskLevel)}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedLog(log);
                        setViewDialog(true);
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* View Log Details Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            {getLevelIcon(selectedLog?.level)}
            <Typography>Log Details</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Timestamp</Typography>
                  <Typography variant="body1">{formatTimestamp(selectedLog.timestamp)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Level</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getLevelIcon(selectedLog.level)}
                    <Typography variant="body1">{selectedLog.level}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">Event</Typography>
                  <Typography variant="body1">{selectedLog.event}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">IP Address</Typography>
                  <Typography variant="body1">{selectedLog.details?.ip || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Risk Level</Typography>
                  {getRiskLevelChip(selectedLog.details?.riskLevel)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">User Agent</Typography>
                  <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                    {selectedLog.details?.userAgent || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">User ID</Typography>
                  <Typography variant="body1">{selectedLog.details?.userId || 'Anonymous'}</Typography>
                </Grid>
                {selectedLog.details?.path && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Path</Typography>
                    <Typography variant="body1">{selectedLog.details.path}</Typography>
                  </Grid>
                )}
                {selectedLog.details?.method && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Method</Typography>
                    <Typography variant="body1">{selectedLog.details.method}</Typography>
                  </Grid>
                )}
              </Grid>
              
              {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                <Accordion sx={{ mt: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Additional Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <pre style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '16px', 
                      borderRadius: '4px',
                      overflow: 'auto',
                      fontSize: '12px'
                    }}>
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </AccordionDetails>
                </Accordion>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLogs; 