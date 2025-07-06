import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Delete, Add, Person } from "@mui/icons-material";

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Initial customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: "Buddhika",
      lastName: "Bandara",
      email: "buddhika@gmail.com",
    },
    {
      id: 2,
      firstName: "Yonali",
      lastName: "Kavindya",
      email: "yonali@gmail.com",
    },
    {
      id: 3,
      firstName: "Sandali",
      lastName: "Peiris",
      email: "sandali@gmail.com",
    },
  ]);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Handle dialog open/close
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCustomer({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setNewCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Placeholder functions for future implementation
  const handleAddCustomer = () => {
    // Add customer logic will be implemented here
    console.log("Adding customer:", newCustomer);
    handleCloseDialog();
  };

  const handleDeleteCustomer = (customerId) => {
    // Delete customer logic will be implemented here
    console.log("Deleting customer with ID:", customerId);
  };

  // Mobile card view for smaller screens
  const MobileCustomerCard = ({ customer }) => (
    <Card sx={{ mb: 2, background: "rgb(161, 178, 255)" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {customer.email}
            </Typography>
          </Box>
          <IconButton
            onClick={() => handleDeleteCustomer(customer.id)}
            color="error"
            size="small"
          >
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Person
          sx={{ mr: 2, fontSize: 32, color: theme.palette.primary.main }}
        />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Customer Management
        </Typography>
      </Box>

      {/* Table for desktop, cards for mobile */}
      {!isMobile ? (
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell
                    sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <TableCell sx={{ fontSize: "0.95rem", fontWeight: 500 }}>
                      {customer.firstName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.95rem", fontWeight: 500 }}>
                      {customer.lastName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.95rem" }}>
                      {customer.email}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDeleteCustomer(customer.id)}
                        color="error"
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                          },
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
        </Paper>
      ) : (
        // Mobile view
        <Box>
          {customers.map((customer) => (
            <MobileCustomerCard key={customer.id} customer={customer} />
          ))}
        </Box>
      )}

      {/* Add Customer Button */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Add New Customer
        </Button>
      </Box>

      {/* Add Customer Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          Add New Customer
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={newCustomer.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={newCustomer.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCustomer}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
