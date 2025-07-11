import React, { useState, useEffect } from "react";
import { mockDevices } from "../data/dummyDevices";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Chip,
  useTheme,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  Lightbulb as LightbulbIcon,
  Lock as LockIcon,
  CameraAlt as CameraIcon,
  Sensors as SensorsIcon,
  Power as PowerIcon,
} from "@mui/icons-material";


const iconMap = {
  light: <LightbulbIcon />,
  lock: <LockIcon />,
  camera: <CameraIcon />,
  sensor: <SensorsIcon />,
  switch: <PowerIcon />,
};

const Devices = () => {
  const theme = useTheme();
  const [devices, setDevices] = useState(mockDevices);
  const [filteredDevices, setFilteredDevices] = useState(mockDevices);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState("list");

  const rooms = Array.from(new Set(mockDevices.map((d) => d.room)));
  const types = Array.from(new Set(mockDevices.map((d) => d.type)));

  useEffect(() => {
    let filtered = devices;

    if (searchTerm) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roomFilter !== "all") {
      filtered = filtered.filter((d) => d.room === roomFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((d) => d.type === typeFilter);
    }

    setFilteredDevices(filtered);
  }, [searchTerm, roomFilter, typeFilter, devices]);

  return (
    <Box p={3} sx={{ backgroundColor: theme.palette.background.default,
      pt:10,
      minHeight: "100vh",
     }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          My Devices
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and monitor your smart home devices
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon fontSize="small" />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              select
              label="Filter by Room"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              <MenuItem value="all">All Rooms</MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room} value={room}>
                  {room}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              select
              label="Filter by Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2} textAlign="right">
            <ToggleButtonGroup
              size="small"
              value={view}
              exclusive
              onChange={(_, val) => val && setView(val)}
            >
              <ToggleButton value="grid">
                <GridIcon />
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>

      {/* Devices */}
      {filteredDevices.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: "center" }}>
          <Typography variant="h6">No devices found.</Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters.
          </Typography>
        </Paper>
      ) : view === "grid" ? (
        <Grid container spacing={3}>
          {filteredDevices.map((device) => (
            <Grid item xs={12} sm={6} md={4} key={device.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  backgroundColor: theme.palette.background.paper,
                }}
                elevation={3}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton>{iconMap[device.type]}</IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {device.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {device.room} • {device.type}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Chip
                    label={device.status}
                    color={
                      device.status === "online"
                        ? "success"
                        : device.status === "offline"
                        ? "error"
                        : "default"
                    }
                    size="small"
                  />
                  <Chip
                    label={device.state ? "On" : "Off"}
                    color={device.state ? "primary" : "default"}
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container direction="column" spacing={2}>
          {filteredDevices.map((device) => (
            <Grid item key={device.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.background.paper,
                }}
                elevation={2}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  {iconMap[device.type]}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {device.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {device.room} • {device.type}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={1}>
                  <Chip
                    label={device.status}
                    color={
                      device.status === "online"
                        ? "success"
                        : device.status === "offline"
                        ? "error"
                        : "default"
                    }
                    size="small"
                  />
                  <Chip
                    label={device.state ? "On" : "Off"}
                    color={device.state ? "primary" : "default"}
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Devices;
