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
} from "@mui/material";
import { useState } from "react";
import { Add, Delete } from "@mui/icons-material";

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
    },
    {
      id: "0002",
      firstName: "Yonali",
      lastName: "Kavindya",
      email: "yonali@gmail.com",
      lastLogin: "2024-10-01",
    },
    {
      id: "0003",
      firstName: "Sandali",
      lastName: "Hiranya",
      email: "sandali@gmail.com",
      lastLogin: "2024-10-01",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
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
      setCustomers((prev) => [...prev, newCustomer]);
      setOpenDialog(false);
      setNewCustomer({ id: "", firstName: "", lastName: "", email: "" });
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

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: theme.palette.mode === "dark"
          ? `linear-gradient(to right, #254f61ff, #203a43, #2c5364)`
          : `linear-gradient(to right, #f5f7fa, #c3cfe2)`,
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #17343cff, #162853ff)"
              : "linear-gradient(135deg, #9cc6e1ff, #daf0f1ff)",
          }}
        >
          <Typography
             variant="h3"
             sx={{
               fontWeight: 800,
               background: theme.palette.mode === "dark"
                 ? "linear-gradient(90deg, #69eacf, #38b6ff)"
                 : "linear-gradient(90deg, #004e92, #000428)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               letterSpacing: 1.5,
             }}
             gutterBottom
           >
            Dependants List
          </Typography>

          <Box mb={3} display="flex" justifyContent="flex-end">
           <TextField
  label="Search"
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    backgroundColor: theme.palette.mode === "dark" ? "#071e38ff" : "#bbdce9ff",  // ✅ background
    color: theme.palette.text.primary,                                      // ✅ text color
    input: {
      color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,                            // ✅ border color
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  }}
/>

          </Box>

          <TableContainer>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow
                  sx={{
                    background: theme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #1e4844ff, #0a4a60ff)"
                      : "linear-gradient(90deg, #6297edff, #8af0e9ff)",
                  }}
                >
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Last Login</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    hover
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "#3077bd95"
                            : "#e3f2fd",
                      },
                    }}
                  >
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.secondary.main,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          {customer.firstName[0]}
                          {customer.lastName[0]}
                        </Avatar>
                        <Typography fontWeight="500">
                          {customer.firstName} {customer.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.lastLogin}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDeleteCustomer(customer.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="center">
            <Button
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{
                background: "linear-gradient(90deg, #43cea2, #185a9d)",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: 3,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #32a88f, #114d91)",
                },
              }}
            >
              Add New Dependant
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Add Modal */}
      <Modal open={openDialog} onClose={() => setOpenDialog(false)} closeAfterTransition>
        <Fade in={openDialog}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Add New Dependant
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="ID"
                value={newCustomer.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
                fullWidth
              />
              <TextField
                label="First Name"
                value={newCustomer.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={newCustomer.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                value={newCustomer.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                fullWidth
              />
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAddCustomer}>
                  Add
                </Button>
              </Box>
            </Stack>
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
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Delete Dependant
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Are you sure you want to delete this dependant? This action cannot
              be undone.
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                variant="outlined"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={confirmDeleteCustomer}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Users;