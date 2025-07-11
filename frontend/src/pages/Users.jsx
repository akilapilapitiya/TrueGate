import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  Backdrop,
  Fade,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useState } from "react";
import { Add, Delete } from "@mui/icons-material";

const Users = () => {
  const [customers, setCustomers] = useState([
    {
      id: "0001",
      firstName: "Buddhika",
      lastName: "Bandara",
      email: "buddhika@gmail.com",
    },
    {
      id: "0002",
      firstName: "Yonali",
      lastName: "Kavindya",
      email: "yonali@gmail.com",
    },
    {
      id: "0003",
      firstName: "Sandali",
      lastName: "Peiris",
      email: "sandali@gmail.com",
    },
  ]);

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
    }
    setOpenDialog(false);
    setNewCustomer({ id: "", firstName: "", lastName: "", email: "" });
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

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Dependants List
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>First Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Last Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { backgroundColor: "#f0f4ff" },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.firstName}</TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
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

          <Divider />

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add New Dependant
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Add Customer Modal */}
      <Modal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="ID"
                value={newCustomer.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
              />
              <TextField
                fullWidth
                label="First Name"
                value={newCustomer.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={newCustomer.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />

              <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAddCustomer}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
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

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
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
