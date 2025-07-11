import {
  Box,
  Button,
  Container,
  Divider,
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Add, Delete } from "@mui/icons-material";

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [customers, setCustomers] = useState([
    { id: "0001", firstName: "Buddhika", lastName: "Bandara", email: "buddhika@gmail.com", lastLogin: "2024-10-01" },
    { id: "0002", firstName: "Yonali", lastName: "Kavindya", email: "yonali@gmail.com", lastLogin: "2024-10-01" },
    { id: "0003", firstName: "Sandali", lastName: "Hiranya", email: "sandali@gmail.com", lastLogin: "2024-10-01" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ id: "", firstName: "", lastName: "", email: "" });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleInputChange = (field, value) => {
    setNewCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCustomer = () => {
    if (newCustomer.id && newCustomer.firstName && newCustomer.lastName && newCustomer.email) {
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
    setCustomers((prev) => prev.filter((customer) => customer.id !== selectedCustomerId));
    setDeleteDialogOpen(false);
    setSelectedCustomerId(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Dependants List
          </Typography>

          <TableContainer>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>ID</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>First Name</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Last Name</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Email</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Last Login</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    hover
                    sx={{
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.firstName}</TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.lastLogin}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDeleteCustomer(customer.id)} color="error">
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
            <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="ID" value={newCustomer.id} onChange={(e) => handleInputChange("id", e.target.value)} fullWidth />
              <TextField label="First Name" value={newCustomer.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} fullWidth />
              <TextField label="Last Name" value={newCustomer.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} fullWidth />
              <TextField label="Email" value={newCustomer.email} onChange={(e) => handleInputChange("email", e.target.value)} fullWidth />
              <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleAddCustomer}>Add</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} closeAfterTransition>
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
              Are you sure you want to delete this dependant? This action cannot be undone.
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" color="error" onClick={confirmDeleteCustomer}>Delete</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Users;
