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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import {
  History,
  Search,
  FilterList,
  Download,
  Security,
  AccessTime,
  Person,
  LocationOn,
  CheckCircle,
  Cancel,
  Warning,
  CalendarToday,
  Visibility,
} from "@mui/icons-material";

const AccessHistory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [accessLogs, setAccessLogs] = useState([
    {
      id: "LOG001",
      userId: "0001",
      userName: "Buddhika Bandara",
      userRole: "Admin",
      action: "System Armed",
      location: "Main Entrance",
      timestamp: "2024-10-01 09:15:30",
      status: "Success",
      device: "Mobile App",
      ipAddress: "192.168.1.105",
    },
    {
      id: "LOG002",
      userId: "0002",
      userName: "Yonali Kavindya",
      userRole: "User",
      action: "Door Unlock",
      location: "Front Door",
      timestamp: "2024-10-01 08:45:22",
      status: "Success",
      device: "Keypad",
      ipAddress: "192.168.1.102",
    },
    {
      id: "LOG003",
      userId: "0003",
      userName: "Sandali Hiranya",
      userRole: "User",
      action: "System Disarm",
      location: "Back Door",
      timestamp: "2024-10-01 07:30:15",
      status: "Failed",
      device: "Mobile App",
      ipAddress: "192.168.1.108",
    },
    {
      id: "LOG004",
      userId: "0001",
      userName: "Buddhika Bandara",
      userRole: "Admin",
      action: "Camera Access",
      location: "Living Room",
      timestamp: "2024-09-30 22:18:45",
      status: "Success",
      device: "Web Portal",
      ipAddress: "192.168.1.105",
    },
    {
      id: "LOG005",
      userId: "0002",
      userName: "Yonali Kavindya",
      userRole: "User",
      action: "Door Lock",
      location: "Main Entrance",
      timestamp: "2024-09-30 21:45:12",
      status: "Success",
      device: "Mobile App",
      ipAddress: "192.168.1.102",
    },
    {
      id: "LOG006",
      userId: "Unknown",
      userName: "Unknown User",
      userRole: "Unknown",
      action: "Access Attempt",
      location: "Front Door",
      timestamp: "2024-09-30 15:22:33",
      status: "Failed",
      device: "Keypad",
      ipAddress: "Unknown",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDetailsModalOpen(true);
  };

  const filteredLogs = accessLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || log.status === statusFilter;
    const matchesAction = actionFilter === "All" || log.action === actionFilter;

    return matchesSearch && matchesStatus && matchesAction;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return theme.palette.success.main;
      case "Failed":
        return theme.palette.error.main;
      case "Warning":
        return theme.palette.warning.main;
      default:
        return theme.palette.grey.main;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case "Failed":
        return <Cancel sx={{ fontSize: 16 }} />;
      case "Warning":
        return <Warning sx={{ fontSize: 16 }} />;
      default:
        return <Security sx={{ fontSize: 16 }} />;
    }
  };

  const getActionColor = (action) => {
    if (action.includes("Arm") || action.includes("Lock")) {
      return theme.palette.success.main;
    } else if (action.includes("Disarm") || action.includes("Unlock")) {
      return theme.palette.warning.main;
    } else if (action.includes("Camera") || action.includes("Access")) {
      return theme.palette.info.main;
    }
    return theme.palette.primary.main;
  };

  const uniqueActions = [...new Set(accessLogs.map((log) => log.action))];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 12, md: 6 },
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
              <History sx={{ fontSize: 40 }} />
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
              Access History
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
              Monitor and review all security system access events and
              activities
            </Typography>

            <Chip
              label={`${accessLogs.length} Total Access Events`}
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
                      {
                        accessLogs.filter((log) => log.status === "Success")
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Successful Access
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
                    <Cancel sx={{ color: theme.palette.error.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="error.main"
                    >
                      {
                        accessLogs.filter((log) => log.status === "Failed")
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Failed Attempts
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
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                background: alpha(theme.palette.info.main, 0.05),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarToday sx={{ color: theme.palette.info.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="info.main"
                    >
                      {new Date().getDate()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Today's Events
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Main Table Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header Actions */}
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
                <History sx={{ color: theme.palette.primary.main }} />
                Access Events Log
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
              >
                <TextField
                  label="Search logs..."
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
                    minWidth: { xs: "100%", sm: 200 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="All">All Status</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                    <MenuItem value="Warning">Warning</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={actionFilter}
                    label="Action"
                    onChange={(e) => setActionFilter(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="All">All Actions</MenuItem>
                    {uniqueActions.map((action) => (
                      <MenuItem key={action} value={action}>
                        {action}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  startIcon={<Download />}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Export
                </Button>
              </Stack>
            </Box>

            {/* Table */}
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
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime sx={{ fontSize: 18 }} />
                        <span>Timestamp</span>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Person sx={{ fontSize: 18 }} />
                        <span>User</span>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Security sx={{ fontSize: 18 }} />
                        <span>Action</span>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 2,
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOn sx={{ fontSize: 18 }} />
                        <span>Location</span>
                      </Stack>
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
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.map((log, index) => (
                    <TableRow
                      key={log.id}
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
                        <Typography variant="body2" fontWeight="600">
                          {new Date(log.timestamp).toLocaleString("en-LK", {
                            timeZone: "Asia/Colombo",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(log.timestamp).toLocaleTimeString("en-LK", {
                            timeZone: "Asia/Colombo",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              color: "#fff",
                              fontWeight: "bold",
                              width: 35,
                              height: 35,
                            }}
                          >
                            {log.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="600" sx={{ mb: 0.5 }}>
                              {log.userName}
                            </Typography>
                            <Chip
                              label={log.userRole}
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  theme.palette.secondary.main,
                                  0.1
                                ),
                                color: theme.palette.secondary.main,
                                fontWeight: "bold",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={log.action}
                          size="small"
                          sx={{
                            bgcolor: alpha(getActionColor(log.action), 0.1),
                            color: getActionColor(log.action),
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography color="text.secondary">
                          {log.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          via {log.device}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Chip
                          icon={getStatusIcon(log.status)}
                          label={log.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(getStatusColor(log.status), 0.1),
                            color: getStatusColor(log.status),
                            fontWeight: "bold",
                            minWidth: 70,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                          onClick={() => handleViewDetails(log)}
                          color="primary"
                          sx={{
                            "&:hover": {
                              transform: "scale(1.1)",
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredLogs.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                }}
              >
                <History
                  sx={{
                    fontSize: 60,
                    color: alpha(theme.palette.text.secondary, 0.5),
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No access logs found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm ||
                  statusFilter !== "All" ||
                  actionFilter !== "All"
                    ? "Try adjusting your search or filter criteria"
                    : "Access events will appear here as they occur"}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Details Modal */}
      <Modal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        closeAfterTransition
      >
        <Fade in={detailsModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 600 },
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 24,
              p: 0,
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                p: 3,
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Visibility />
                Access Event Details
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Complete information about this security access event
              </Typography>
            </Box>

            {/* Modal Content */}
            {selectedLog && (
              <Box sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      Event Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Event ID:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.id}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Timestamp:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.timestamp}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="600">
                          {new Date(selectedLog.timestamp).toLocaleString(
                            "en-LK",
                            {
                              timeZone: "Asia/Colombo",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </Typography>

                        <Chip
                          label={selectedLog.action}
                          size="small"
                          sx={{
                            bgcolor: alpha(
                              getActionColor(selectedLog.action),
                              0.1
                            ),
                            color: getActionColor(selectedLog.action),
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Status:
                        </Typography>
                        <Chip
                          icon={getStatusIcon(selectedLog.status)}
                          label={selectedLog.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(
                              getStatusColor(selectedLog.status),
                              0.1
                            ),
                            color: getStatusColor(selectedLog.status),
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      User Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          User ID:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.userId}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Name:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.userName}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Role:
                        </Typography>
                        <Chip
                          label={selectedLog.userRole}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      Technical Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Location:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.location}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Device:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.device}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          IP Address:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {selectedLog.ipAddress}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box display="flex" justifyContent="flex-end" pt={2}>
                    <Button
                      variant="contained"
                      onClick={() => setDetailsModalOpen(false)}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AccessHistory;
