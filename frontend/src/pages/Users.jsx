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
} from "@mui/material";
import { useState } from "react";
import {
  Add,
  Delete,
  People,
  Search,
  PersonAdd,
  Security,
  AccessTime,
  Email,
  Badge,
  ArrowForward,
} from "@mui/icons-material";

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [customers, setCustomers] = useState([
    {
      id: "0001",
      firstName: "Buddhika",
      lastName: "Bandara",
      email: "buddhika@gmail.com",
      lastLogin: "2024-10-01",
      status: "Active",
      role: "Admin",
    },
    {
      id: "0002",
      firstName: "Yonali",
      lastName: "Kavindya",
      email: "yonali@gmail.com",
      lastLogin: "2024-10-01",
      status: "Active",
      role: "User",
    },
    {
      id: "0003",
      firstName: "Sandali",
      lastName: "Hiranya",
      email: "sandali@gmail.com",
      lastLogin: "2024-10-01",
      status: "Inactive",
      role: "User",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleInputChange = (field, value) => {
    setNewCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCustomer = () => {
    if (
      newCustomer.id &&
      newCustomer.firstName &&
      newCustomer.lastName &&
      newCustomer.email
    ) {
      const customerWithDefaults = {
        ...newCustomer,
        lastLogin: new Date().toISOString().split("T")[0],
        status: "Active",
      };
      setCustomers((prev) => [...prev, customerWithDefaults]);
      setOpenDialog(false);
      setNewCustomer({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "User",
      });
    }
  };

  const handleDeleteCustomer = (id) => {
    setSelectedCustomerId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCustomer = () => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== selectedCustomerId)
    );
    setDeleteDialogOpen(false);
    setSelectedCustomerId(null);
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "Active"
      ? theme.palette.success.main
      : theme.palette.warning.main;
  };

  const getRoleColor = (role) => {
    return role === "Admin"
      ? theme.palette.primary.main
      : theme.palette.secondary.main;
  };

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
              Dependants Management
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
              Manage trusted users and control access to your security system
            </Typography>

            <Chip
              label={`${customers.length} Total Dependants`}
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
                    <Security sx={{ color: theme.palette.success.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {customers.filter((c) => c.status === "Active").length}
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
                    <AccessTime sx={{ color: theme.palette.warning.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {customers.filter((c) => c.status === "Inactive").length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inactive Users
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
                    <Badge sx={{ color: theme.palette.primary.main }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {customers.filter((c) => c.role === "Admin").length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Administrators
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
                <People sx={{ color: theme.palette.primary.main }} />
                Dependants List
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Search dependants..."
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

                <Button
                  startIcon={<PersonAdd />}
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: 2,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add Dependant
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
                        <Badge sx={{ fontSize: 18 }} />
                        <span>ID</span>
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
                        <People sx={{ fontSize: 18 }} />
                        <span>Dependant</span>
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
                        <Email sx={{ fontSize: 18 }} />
                        <span>Contact</span>
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
                        <AccessTime sx={{ fontSize: 18 }} />
                        <span>Last Login</span>
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
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Security sx={{ fontSize: 18 }} />
                        <span>Status</span>
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
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCustomers.map((customer, index) => (
                    <TableRow
                      key={customer.id}
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
                        <Chip
                          label={customer.id}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>
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
                            {customer.firstName[0]}
                            {customer.lastName[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="600" sx={{ mb: 0.5 }}>
                              {customer.firstName} {customer.lastName}
                            </Typography>
                            <Chip
                              label={customer.role}
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  getRoleColor(customer.role),
                                  0.1
                                ),
                                color: getRoleColor(customer.role),
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography color="text.secondary">
                          {customer.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography color="text.secondary">
                          {customer.lastLogin}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Chip
                          label={customer.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(
                              getStatusColor(customer.status),
                              0.1
                            ),
                            color: getStatusColor(customer.status),
                            fontWeight: "bold",
                            minWidth: 70,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                          onClick={() => handleDeleteCustomer(customer.id)}
                          color="error"
                          sx={{
                            "&:hover": {
                              transform: "scale(1.1)",
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredCustomers.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                }}
              >
                <People
                  sx={{
                    fontSize: 60,
                    color: alpha(theme.palette.text.secondary, 0.5),
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No dependants found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Add your first dependant to get started"}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Add Modal */}
      <Modal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        closeAfterTransition
      >
        <Fade in={openDialog}>
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
                <PersonAdd />
                Add New Dependant
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Grant access to trusted individuals for your security system
              </Typography>
            </Box>

            {/* Modal Content */}
            <Box sx={{ p: 4 }}>
              <Stack spacing={3}>
                <TextField
                  label="Dependant ID"
                  value={newCustomer.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="First Name"
                    value={newCustomer.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    value={newCustomer.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Stack>
                <TextField
                  label="Email Address"
                  value={newCustomer.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  fullWidth
                  type="email"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  label="Role"
                  value={newCustomer.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  fullWidth
                  select
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </TextField>

                <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenDialog(false)}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddCustomer}
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
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
                    Add Dependant
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        closeAfterTransition
      >
        <Fade in={deleteDialogOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
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
                background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                p: 3,
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Delete />
                Remove Dependant
              </Typography>
            </Box>

            {/* Modal Content */}
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Delete
                  sx={{ fontSize: 40, color: theme.palette.error.main }}
                />
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Confirm Removal
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Are you sure you want to remove this dependant? They will lose
                access to your security system immediately. This action cannot
                be undone.
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => setDeleteDialogOpen(false)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Keep Dependant
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={confirmDeleteCustomer}
                  sx={{
                    borderRadius: 2,
                    px: 3,
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
                  Remove Access
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Users;
