import { useState, useEffect } from "react";
import { mockDevices } from "../data/dummyDevices";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  useTheme,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
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
    <Box
      p={3}
      sx={{
        background: theme.palette.mode === "dark"
          ? "linear-gradient(to right, #1e656eff, #0e2346ff)"
          : "linear-gradient(to right, #9ebce9ff, #bee6e8ff)",
        minHeight: "100vh",
        pt: 10,
      }}
    >
      <Box mb={6} textAlign="center">
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
    My Devices
  </Typography>

  <Typography
    variant="h6"
    sx={{
      color: theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.7)"
        : "rgba(0, 0, 0, 0.6)",
      fontWeight: 400,
      fontSize: { xs: "0.9rem", sm: "1rem" },
      letterSpacing: 0.5,
    }}
  >
    Manage and monitor your smart home devices
  </Typography>
</Box>


     <Paper
  elevation={theme.palette.mode === "light" ? 4 : 0}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3,
    backgroundColor: "transparent",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 8px 16px rgba(0, 0, 0, 0.1)"
        : "none",
    border:
      theme.palette.mode === "dark"
        ? "1px solid rgba(255, 255, 255, 0.05)"
        : "none",
    backdropFilter: theme.palette.mode === "dark" ? "blur(4px)" : "none",
  }}
>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: theme.palette.background.paper,
                borderRadius: 2,
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
              sx={{ background: theme.palette.background.paper, borderRadius: 2 }}
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
              sx={{ background: theme.palette.background.paper, borderRadius: 2 }}
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

      {filteredDevices.length === 0 ? (
        <Paper
  elevation={0}
  sx={{
    p: 2,
    mb: 3,
    backgroundColor: "transparent", 
    boxShadow: "none",              
  }}
>
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
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  backgroundColor: theme.palette.background.paper,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
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
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #203448ff, #114851ff)"
                : "linear-gradient(135deg, #dfe4e5ff, #d2e8f1ff)",

                  transition: "background 0.3s",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "#03242dff"
                        : "#9dd7e2ff",
                  },
                }}
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
