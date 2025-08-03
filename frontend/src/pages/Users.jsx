import { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Chip,
  alpha,
  Alert,
  Snackbar,
  Tooltip,
  Badge,
  Zoom,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Add,
  Delete,
  People,
  Search,
  PersonAdd,
  Security,
  AccessTime,
  Email,
  ArrowForward,
  MoreVert,
  Block,
  LockOpen,
  Lock,
  Refresh,
  Edit,
  Visibility,
  VisibilityOff,
  Warning,
  CheckCircle,
  Error,
  Info,
  AdminPanelSettings,
  Person,
  FilterList,
  Clear,
  Download,
  Upload,
  Settings,
  Dashboard,
  Analytics,
  Shield,
  Gavel,
} from "@mui/icons-material";
import userManagementService from "../services/userManagementService";

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  // Modal states
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Menu states
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserForMenu, setSelectedUserForMenu] = useState(null);

  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    verified: 0,
    unverified: 0,
    admins: 0,
            locked: 0
  });

  // Fetch users with filters
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        search: searchTerm,
        role: roleFilter,
        status: statusFilter
      };

      const response = await userManagementService.getUsers(params);
      setUsers(response.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, roleFilter, statusFilter]);

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await userManagementService.getDashboardSummary();
      setDashboardStats({
        total: response.summary.users.total,
        verified: response.summary.users.verified,
        unverified: response.summary.users.unverified,
        admins: response.summary.users.admins,
        locked: response.summary.users.locked
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
    fetchDashboardStats();
  }, [fetchUsers, fetchDashboardStats]);

  // Handle user actions
  const handleUserAction = async (action, user, additionalData = {}) => {
    try {
      setActionLoading(true);
      setError(null);

      let response;
      switch (action) {
        case 'delete':
          response = await userManagementService.deleteUser(user.email);
          setSuccess('User deleted successfully');
          break;
        case 'lock':
          response = await userManagementService.toggleUserLock(user.email, true);
          setSuccess('User locked successfully');
          break;
        case 'unlock':
          response = await userManagementService.toggleUserLock(user.email, false);
          setSuccess('User unlocked successfully');
          break;
        case 'reset-login-attempts':
          response = await userManagementService.resetLoginAttempts(user.email);
          setSuccess('Login attempts reset successfully');
          break;
        case 'reset-password':
          response = await userManagementService.resetUserPassword(user.email, additionalData.newPassword);
          setSuccess('Password reset successfully');
          break;
        case 'update':
          response = await userManagementService.updateUser(user.email, additionalData.updates);
          setSuccess('User updated successfully');
          break;
        default:
          throw new Error('Unknown action');
      }

      // Refresh data
      await fetchUsers();
      await fetchDashboardStats();
      
      // Close modals
      setOpenUserModal(false);
      setOpenDeleteModal(false);
      setOpenPasswordModal(false);
      setSelectedUser(null);
      setAnchorEl(null);
      setSelectedUserForMenu(null);

    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      setError(err.response?.data?.error || `Failed to ${action} user`);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle menu actions
  const handleMenuAction = (action, user) => {
    setSelectedUserForMenu(user);
    setAnchorEl(null);
    
    switch (action) {
      case 'edit':
        setSelectedUser(user);
        setOpenUserModal(true);
        break;
      case 'delete':
        setSelectedUser(user);
        setOpenDeleteModal(true);
        break;
      case 'reset-password':
        setSelectedUser(user);
        setOpenPasswordModal(true);
        break;
      case 'lock':
        handleUserAction('lock', user);
        break;
      case 'unlock':
        handleUserAction('unlock', user);
        break;
      case 'reset-login-attempts':
        handleUserAction('reset-login-attempts', user);
        break;
    }
  };

  // Get status color and icon
  const getStatusInfo = (user) => {
    if (user.locked) {
      return {
        color: theme.palette.error.main,
        icon: <Block />,
        label: 'Locked',
        bgColor: alpha(theme.palette.error.main, 0.1)
      };
    }
    if (!user.verified) {
      return {
        color: theme.palette.warning.main,
        icon: <Warning />,
        label: 'Unverified',
        bgColor: alpha(theme.palette.warning.main, 0.1)
      };
    }
    return {
      color: theme.palette.success.main,
      icon: <CheckCircle />,
      label: 'Active',
      bgColor: alpha(theme.palette.success.main, 0.1)
    };
  };

  // Get role color and icon
  const getRoleInfo = (role) => {
    if (role === 'admin') {
      return {
        color: theme.palette.primary.main,
        icon: <AdminPanelSettings />,
        label: 'Admin',
        bgColor: alpha(theme.palette.primary.main, 0.1)
      };
    }
    return {
      color: theme.palette.secondary.main,
      icon: <Person />,
      label: 'User',
      bgColor: alpha(theme.palette.secondary.main, 0.1)
    };
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Error/Success Snackbars */}
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

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                color: theme.palette.primary.main,
              }}
            >
              <People sx={{ fontSize: 40 }} />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.5rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              User Management
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 300,
                mb: 3,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Manage user accounts, permissions, and security settings
            </Typography>

            <Chip
              label={`${dashboardStats.total} Total Users`}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{ px: 2 }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Card
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                background: alpha(theme.palette.success.main, 0.05),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle sx={{ color: theme.palette.success.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {dashboardStats.verified}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Users
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                background: alpha(theme.palette.warning.main, 0.05),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Warning sx={{ color: theme.palette.warning.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {dashboardStats.unverified}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unverified Users
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                background: alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AdminPanelSettings sx={{ color: theme.palette.primary.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {dashboardStats.admins}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Administrators
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

        <Card
          elevation={0}
          sx={{
                flex: 1,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                background: alpha(theme.palette.error.main, 0.05),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                display: "flex",
                alignItems: "center",
                      justifyContent: "center",
              }}
            >
                    <Block sx={{ color: theme.palette.error.main }} />
                  </Box>
                  <Box>
              <Typography
                      variant="h4"
                fontWeight="bold"
                      color="error.main"
                    >
                      {dashboardStats.locked}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Locked Users
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Filters and Search */}
        <Card
          elevation={0}
                sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                Filters & Search
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <TextField
                  label="Search users..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                  }}
                  sx={{
                    minWidth: { xs: "100%", sm: 250 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={roleFilter}
                    label="Role"
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="verified">Verified</MenuItem>
                    <MenuItem value="unverified">Unverified</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  onClick={clearFilters}
                  startIcon={<Clear />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  onClick={fetchUsers}
                  startIcon={<Refresh />}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: 2,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? <CircularProgress size={20} /> : "Refresh"}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
                             <Typography
                 variant="h5"
                 fontWeight="bold"
                 color="text.primary"
                 sx={{
                   display: "flex",
                   alignItems: "center",
                   gap: 1,
                 }}
               >
                 <People sx={{ color: theme.palette.primary.main }} />
                 Users List
                 {users.length > 0 && (
                   <Chip
                     label={`${users.length} users`}
                     size="small"
                     variant="outlined"
                     sx={{ ml: 2 }}
                   />
                 )}
               </Typography>

               <Stack direction="row" spacing={2} alignItems="center">
                 <Typography variant="body2" color="text.secondary">
                   Showing all users
                 </Typography>
              </Stack>
            </Box>

            {loading ? (
              <Box textAlign="center" py={8}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Loading users...
                </Typography>
              </Box>
            ) : users.length === 0 ? (
              <Box textAlign="center" py={8}>
                <People
                  sx={{
                    fontSize: 60,
                    color: alpha(theme.palette.text.secondary, 0.5),
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No users found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm || roleFilter || statusFilter
                    ? "Try adjusting your filters"
                    : "No users have been registered yet"}
                </Typography>
              </Box>
            ) : (
            <TableContainer>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.8
                      )} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                    >
                        User
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                    >
                        Contact
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                        align="center"
                    >
                        Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                        align="center"
                    >
                        Role
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                      >
                        Last Login
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => {
                      const statusInfo = getStatusInfo(user);
                      const roleInfo = getRoleInfo(user.role);
                      
                      return (
                    <TableRow
                          key={user.email}
                      hover
                      sx={{
                        backgroundColor: alpha(theme.palette.grey[900], 0.05),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.05
                          ),
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              color: "#fff",
                              fontWeight: "bold",
                              width: 45,
                              height: 45,
                            }}
                          >
                                {user.firstName?.[0] || user.email[0]}
                                {user.lastName?.[0] || ''}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="600" sx={{ mb: 0.5 }}>
                                  {user.firstName && user.lastName 
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.email
                                  }
                            </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {user.loginAttempts || 0} failed attempts
                                </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography color="text.secondary">
                              {user.email}
                        </Typography>
                            {user.contactNumber && (
                              <Typography variant="caption" color="text.secondary">
                                {user.contactNumber}
                        </Typography>
                            )}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Chip
                              icon={statusInfo.icon}
                              label={statusInfo.label}
                          size="small"
                          sx={{
                                bgcolor: statusInfo.bgColor,
                                color: statusInfo.color,
                                fontWeight: "bold",
                                minWidth: 80,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ py: 2 }}>
                            <Chip
                              icon={roleInfo.icon}
                              label={roleInfo.label}
                              size="small"
                              sx={{
                                bgcolor: roleInfo.bgColor,
                                color: roleInfo.color,
                            fontWeight: "bold",
                            minWidth: 70,
                          }}
                        />
                      </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography color="text.secondary">
                              {formatDate(user.lastLogin)}
                            </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                              onClick={(e) => {
                                setSelectedUserForMenu(user);
                                setAnchorEl(e.currentTarget);
                              }}
                          sx={{
                            "&:hover": {
                              transform: "scale(1.1)",
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                              <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            )}

            
          </CardContent>
        </Card>
      </Container>

      {/* User Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        {selectedUserForMenu && (
          <>
            <MenuItem onClick={() => handleMenuAction('edit', selectedUserForMenu)}>
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit User</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={() => handleMenuAction('reset-password', selectedUserForMenu)}>
              <ListItemIcon>
                <Lock fontSize="small" />
              </ListItemIcon>
              <ListItemText>Reset Password</ListItemText>
            </MenuItem>

            <Divider />

                            {selectedUserForMenu.locked ? (
              <MenuItem onClick={() => handleMenuAction('unlock', selectedUserForMenu)}>
                <ListItemIcon>
                  <LockOpen fontSize="small" />
                </ListItemIcon>
                <ListItemText>Unlock User</ListItemText>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleMenuAction('lock', selectedUserForMenu)}>
                <ListItemIcon>
                  <Block fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lock User</ListItemText>
              </MenuItem>
            )}

            <MenuItem onClick={() => handleMenuAction('reset-login-attempts', selectedUserForMenu)}>
              <ListItemIcon>
                <Refresh fontSize="small" />
              </ListItemIcon>
              <ListItemText>Reset Login Attempts</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem 
              onClick={() => handleMenuAction('delete', selectedUserForMenu)}
              sx={{ color: theme.palette.error.main }}
            >
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete User</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Edit User Modal */}
      <Modal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        closeAfterTransition
      >
        <Fade in={openUserModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 24,
              p: 0,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                p: 3,
                color: "white",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Edit User
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Update user information and permissions
              </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
              {selectedUser && (
              <Stack spacing={3}>
                  <TextField
                    label="First Name"
                    defaultValue={selectedUser.firstName || ''}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setSelectedUser(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                  <TextField
                    label="Last Name"
                    defaultValue={selectedUser.lastName || ''}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setSelectedUser(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                <TextField
                    label="Contact Number"
                    defaultValue={selectedUser.contactNumber || ''}
                  fullWidth
                  variant="outlined"
                    onChange={(e) => setSelectedUser(prev => ({ ...prev, contactNumber: e.target.value }))}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={selectedUser.role || 'user'}
                  label="Role"
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, role: e.target.value }))}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedUser.verified || false}
                        onChange={(e) => setSelectedUser(prev => ({ ...prev, verified: e.target.checked }))}
                      />
                    }
                    label="Verified Account"
                  />

                <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
                  <Button
                    variant="outlined"
                      onClick={() => setOpenUserModal(false)}
                      disabled={actionLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                      onClick={() => handleUserAction('update', selectedUser, { 
                        updates: {
                          firstName: selectedUser.firstName,
                          lastName: selectedUser.lastName,
                          contactNumber: selectedUser.contactNumber,
                          role: selectedUser.role,
                          verified: selectedUser.verified
                        }
                      })}
                      disabled={actionLoading}
                      startIcon={actionLoading ? <CircularProgress size={20} /> : <Edit />}
                    >
                      Update User
                  </Button>
                </Box>
              </Stack>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Delete User Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Delete color="error" />
            <Typography variant="h6" fontWeight="bold">
              Delete User
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Typography>
              Are you sure you want to delete the user <strong>{selectedUser.email}</strong>? 
              This action cannot be undone and will permanently remove the user account.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDeleteModal(false)}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleUserAction('delete', selectedUser)}
            color="error"
            variant="contained"
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : <Delete />}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Modal */}
      <Dialog
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Lock />
            <Typography variant="h6" fontWeight="bold">
              Reset Password
              </Typography>
            </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Enter a new password for {selectedUser?.email}
              </Typography>
            <TextField
              label="New Password"
              type="password"
              fullWidth
                  variant="outlined"
              onChange={(e) => setSelectedUser(prev => ({ ...prev, newPassword: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenPasswordModal(false)}
            disabled={actionLoading}
          >
            Cancel
                </Button>
                <Button
            onClick={() => handleUserAction('reset-password', selectedUser, { 
              newPassword: selectedUser?.newPassword 
            })}
                  variant="contained"
            disabled={actionLoading || !selectedUser?.newPassword}
            startIcon={actionLoading ? <CircularProgress size={20} /> : <Lock />}
          >
            Reset Password
                </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
