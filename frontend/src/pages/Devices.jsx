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

const Devices = () => {
  const [devices, setDevices] = useState([
    {
      id: "D001",
      name: "CCTV Front Gate",
      type: "Camera",
      location: "Entrance",
      status: "Active",
    },
    {
      id: "D002",
      name: "Main Door Lock",
      type: "Smart Lock",
      location: "Main Door",
      status: "Active",
    },
    {
      id: "D003",
      name: "Garage Motion Sensor",
      type: "Sensor",
      location: "Garage",
      status: "Inactive",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newDevice, setNewDevice] = useState({
    id: "",
    name: "",
    type: "",
    location: "",
    status: "",
  });

  const handleInputChange = (field, value) => {
    setNewDevice((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDevice = () => {
    if (
      newDevice.id &&
      newDevice.name &&
      newDevice.type &&
      newDevice.location &&
      newDevice.status
    ) {
      setDevices((prev) => [...prev, newDevice]);
    }
    setOpenDialog(false);
    setNewDevice({ id: "", name: "", type: "", location: "", status: "" });
  };

  const handleDeleteDevice = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
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
            Installed Security Devices
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Device Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { backgroundColor: "#f0f4ff" },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell>{device.id}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>{device.status}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDeleteDevice(device.id)}
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
              Add New Device
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Add Device Modal */}
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
              Add New Device
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Device ID"
                value={newDevice.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
              />
              <TextField
                fullWidth
                label="Device Name"
                value={newDevice.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Type"
                value={newDevice.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              />
              <TextField
                fullWidth
                label="Location"
                value={newDevice.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
              <TextField
                fullWidth
                label="Status"
                value={newDevice.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />

              <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAddDevice}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Devices;
