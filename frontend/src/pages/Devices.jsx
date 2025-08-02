import { useState, useEffect } from "react";
import { mockDevices } from "../data/dummyDevices";
import logoBlue from "../assets/logo-name.png";
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
 Container,
 Card,
 CardContent,
 alpha,
 Button,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 FormControl,
 InputLabel,
 Select,
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
 Add,
 DevicesOther,
 Refresh,
 Settings,
 ToggleOn,
 ToggleOff,
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
 const [openAddDialog, setOpenAddDialog] = useState(false);
 const [newDevice, setNewDevice] = useState({
   name: "",
   type: "light",
   room: "",
   status: "online",
   state: false,
 });

 const rooms = Array.from(new Set(devices.map((d) => d.room)));
 const types = Array.from(new Set(devices.map((d) => d.type)));

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

 // Toggle device status (online/offline)
 const toggleDeviceStatus = (deviceId) => {
   setDevices(prev => prev.map(device => 
     device.id === deviceId 
       ? { ...device, status: device.status === 'online' ? 'offline' : 'online' }
       : device
   ));
 };

 // Toggle device state (active/inactive)
 const toggleDeviceState = (deviceId) => {
   setDevices(prev => prev.map(device => 
     device.id === deviceId 
       ? { ...device, state: !device.state }
       : device
   ));
 };

 // Add new device
 const handleAddDevice = () => {
   if (newDevice.name && newDevice.room) {
     const device = {
       ...newDevice,
       id: Math.max(...devices.map(d => d.id)) + 1,
     };
     setDevices(prev => [...prev, device]);
     setNewDevice({
       name: "",
       type: "light",
       room: "",
       status: "online",
       state: false,
     });
     setOpenAddDialog(false);
   }
 };

 // Refresh devices (reset to original mock data)
 const handleRefresh = () => {
   setDevices(mockDevices);
   setSearchTerm("");
   setRoomFilter("all");
   setTypeFilter("all");
 };

 // Device statistics
 const deviceStats = [
   {
     icon: <DevicesOther sx={{ fontSize: 40 }} />,
     title: "Total Devices",
     count: devices.length,
     color: theme.palette.primary.main,
     bgColor: alpha(theme.palette.primary.main, 0.1),
   },
   {
     icon: <PowerIcon sx={{ fontSize: 40 }} />,
     title: "Online",
     count: devices.filter(d => d.status === 'online').length,
     color: theme.palette.success.main,
     bgColor: alpha(theme.palette.success.main, 0.1),
   },
   {
     icon: <Settings sx={{ fontSize: 40 }} />,
     title: "Active",
     count: devices.filter(d => d.state).length,
     color: theme.palette.info.main,
     bgColor: alpha(theme.palette.info.main, 0.1),
   },
 ];

 return (
   <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
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
         <Grid container spacing={4} alignItems="center">
           <Grid item xs={12} md={8}>
             <Box>
               {/* Logo Section */}
               <Box sx={{ mb: 4 }}>
                 <Box
                   component="img"
                   src={logoBlue}
                   alt="TrueGate Logo"
                   sx={{
                     height: { xs: 40, md: 50 },
                     width: "auto",
                     mb: 2,
                     filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                   }}
                 />
                 <Chip
                   label="Device Management"
                   color="primary"
                   variant="outlined"
                   size="small"
                 />
               </Box>

               <Typography
                 variant="h2"
                 sx={{
                   fontWeight: 800,
                   fontSize: { xs: "2rem", md: "3rem" },
                   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                   backgroundClip: "text",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                   mb: 2,
                 }}
               >
                 My Devices
               </Typography>
               <Typography
                 variant="h6"
                 color="text.secondary"
                 sx={{
                   fontWeight: 300,
                   mb: 4,
                   fontSize: { xs: "1rem", md: "1.2rem" },
                 }}
               >
                 Manage and monitor all your smart home devices in one place
               </Typography>

               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                 <Button
                   variant="contained"
                   startIcon={<Add />}
                   onClick={() => setOpenAddDialog(true)}
                   sx={{
                     px: 3,
                     py: 1,
                     borderRadius: 3,
                     fontSize: "0.9rem",
                     boxShadow: 3,
                     "&:hover": {
                       transform: "translateY(-2px)",
                       boxShadow: 6,
                     },
                     transition: "all 0.3s ease",
                   }}
                 >
                   Add Device
                 </Button>
                 <Button
                   variant="outlined"
                   startIcon={<Refresh />}
                   onClick={handleRefresh}
                   sx={{
                     px: 3,
                     py: 1,
                     borderRadius: 3,
                     fontSize: "0.9rem",
                     "&:hover": {
                       transform: "translateY(-2px)",
                     },
                     transition: "all 0.3s ease",
                   }}
                 >
                   Refresh
                 </Button>
               </Box>
             </Box>
           </Grid>
           <Grid item xs={12} md={4}>
             <Grid container spacing={2}>
               {deviceStats.map((stat, index) => (
                 <Grid item xs={4} md={12} key={index}>
                   <Card
                     elevation={0}
                     sx={{
                       borderRadius: 3,
                       border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                       background: stat.bgColor,
                       transition: "all 0.3s ease",
                       "&:hover": {
                         transform: "translateY(-4px)",
                         boxShadow: `0 20px 40px ${alpha(stat.color, 0.15)}`,
                       },
                     }}
                   >
                     <CardContent sx={{ p: 2, textAlign: "center" }}>
                       <Box
                         sx={{
                           width: 50,
                           height: 50,
                           borderRadius: 2,
                           bgcolor: alpha(stat.color, 0.2),
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           mx: "auto",
                           mb: 1,
                           color: stat.color,
                         }}
                       >
                         {stat.icon}
                       </Box>
                       <Typography variant="h4" fontWeight="bold" color={stat.color}>
                         {stat.count}
                       </Typography>
                       <Typography variant="body2" color="text.secondary">
                         {stat.title}
                       </Typography>
                     </CardContent>
                   </Card>
                 </Grid>
               ))}
             </Grid>
           </Grid>
         </Grid>
       </Container>
     </Box>

     {/* Filters Section */}
     <Container maxWidth="lg" sx={{ py: 4 }}>
       <Card
         elevation={0}
         sx={{
           borderRadius: 4,
           border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
           mb: 4,
           background: alpha(theme.palette.background.paper, 0.8),
           backdropFilter: "blur(20px)",
         }}
       >
         <CardContent sx={{ p: 3 }}>
           <Grid container spacing={3} alignItems="center">
             <Grid item xs={12} sm={4}>
               <TextField
                 fullWidth
                 size="small"
                 label="Search devices"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 InputProps={{
                   endAdornment: (
                     <InputAdornment position="end">
                       <SearchIcon color="action" />
                     </InputAdornment>
                   ),
                 }}
                 sx={{
                   "& .MuiOutlinedInput-root": {
                     borderRadius: 3,
                     backgroundColor: alpha(theme.palette.background.paper, 0.8),
                   },
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
                 sx={{
                   "& .MuiOutlinedInput-root": {
                     borderRadius: 3,
                     backgroundColor: alpha(theme.palette.background.paper, 0.8),
                   },
                 }}
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
                 sx={{
                   "& .MuiOutlinedInput-root": {
                     borderRadius: 3,
                     backgroundColor: alpha(theme.palette.background.paper, 0.8),
                   },
                 }}
               >
                 <MenuItem value="all">All Types</MenuItem>
                 {types.map((type) => (
                   <MenuItem key={type} value={type}>
                     {type.charAt(0).toUpperCase() + type.slice(1)}
                   </MenuItem>
                 ))}
               </TextField>
             </Grid>
             <Grid item xs={12} sm={2} textAlign="center">
               <ToggleButtonGroup
                 size="small"
                 value={view}
                 exclusive
                 onChange={(_, val) => val && setView(val)}
                 sx={{
                   "& .MuiToggleButton-root": {
                     borderRadius: 2,
                     border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                     "&:hover": {
                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
                     },
                   },
                 }}
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
         </CardContent>
       </Card>

       {/* Devices Display */}
       {filteredDevices.length === 0 ? (
         <Card
           elevation={0}
           sx={{
             borderRadius: 4,
             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
             textAlign: "center",
             py: 6,
           }}
         >
           <CardContent>
             <DevicesOther sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
             <Typography variant="h6" color="text.secondary" gutterBottom>
               No devices found
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Try adjusting your search or filters to find your devices.
             </Typography>
           </CardContent>
         </Card>
       ) : view === "grid" ? (
         <Grid container spacing={3}>
           {filteredDevices.map((device) => (
             <Grid item xs={12} sm={6} md={4} key={device.id}>
               <Card
                 elevation={0}
                 sx={{
                   height: "100%",
                   borderRadius: 4,
                   border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                   transition: "all 0.3s ease",
                   "&:hover": {
                     transform: "translateY(-8px)",
                     boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                     borderColor: alpha(theme.palette.primary.main, 0.3),
                   },
                 }}
               >
                 <CardContent sx={{ p: 3 }}>
                   <Box
                     sx={{
                       width: 60,
                       height: 60,
                       borderRadius: 3,
                       bgcolor: alpha(theme.palette.primary.main, 0.1),
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       mb: 2,
                       color: theme.palette.primary.main,
                     }}
                   >
                     {iconMap[device.type]}
                   </Box>
                   <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                     {device.name}
                   </Typography>
                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                     {device.room} • {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                   </Typography>
                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
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
                       sx={{ borderRadius: 2 }}
                       onClick={() => toggleDeviceStatus(device.id)}
                       clickable
                     />
                     <Chip
                       label={device.state ? "Active" : "Inactive"}
                       color={device.state ? "primary" : "default"}
                       size="small"
                       sx={{ borderRadius: 2 }}
                       onClick={() => toggleDeviceState(device.id)}
                       clickable
                     />
                   </Box>
                   <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
                     <IconButton 
                       size="small" 
                       onClick={() => toggleDeviceStatus(device.id)}
                       color={device.status === "online" ? "success" : "default"}
                     >
                       {device.status === "online" ? <ToggleOn /> : <ToggleOff />}
                     </IconButton>
                     <IconButton 
                       size="small" 
                       onClick={() => toggleDeviceState(device.id)}
                       color={device.state ? "primary" : "default"}
                     >
                       {device.state ? <ToggleOn /> : <ToggleOff />}
                     </IconButton>
                   </Box>
                 </CardContent>
               </Card>
             </Grid>
           ))}
         </Grid>
       ) : (
         <Grid container spacing={2}>
           {filteredDevices.map((device) => (
             <Grid item xs={12} key={device.id}>
               <Card
                 elevation={0}
                 sx={{
                   borderRadius: 4,
                   border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                   transition: "all 0.3s ease",
                   "&:hover": {
                     transform: "translateX(8px)",
                     boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                     borderColor: alpha(theme.palette.primary.main, 0.3),
                   },
                 }}
               >
                 <CardContent sx={{ p: 3 }}>
                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                       <Box
                         sx={{
                           width: 50,
                           height: 50,
                           borderRadius: 2,
                           bgcolor: alpha(theme.palette.primary.main, 0.1),
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           color: theme.palette.primary.main,
                         }}
                       >
                         {iconMap[device.type]}
                       </Box>
                       <Box>
                         <Typography variant="h6" fontWeight="bold">
                           {device.name}
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                           {device.room} • {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                         </Typography>
                       </Box>
                     </Box>
                     <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
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
                         sx={{ borderRadius: 2 }}
                         onClick={() => toggleDeviceStatus(device.id)}
                         clickable
                       />
                       <Chip
                         label={device.state ? "Active" : "Inactive"}
                         color={device.state ? "primary" : "default"}
                         size="small"
                         sx={{ borderRadius: 2 }}
                         onClick={() => toggleDeviceState(device.id)}
                         clickable
                       />
                       <IconButton 
                         size="small" 
                         onClick={() => toggleDeviceStatus(device.id)}
                         color={device.status === "online" ? "success" : "default"}
                       >
                         {device.status === "online" ? <ToggleOn /> : <ToggleOff />}
                       </IconButton>
                       <IconButton 
                         size="small" 
                         onClick={() => toggleDeviceState(device.id)}
                         color={device.state ? "primary" : "default"}
                       >
                         {device.state ? <ToggleOn /> : <ToggleOff />}
                       </IconButton>
                     </Box>
                   </Box>
                 </CardContent>
               </Card>
             </Grid>
           ))}
         </Grid>
       )}
     </Container>

     {/* Add Device Dialog */}
     <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
       <DialogTitle>Add New Device</DialogTitle>
       <DialogContent sx={{ pt: 2 }}>
         <Grid container spacing={2}>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Device Name"
               value={newDevice.name}
               onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
               sx={{ mb: 2 }}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Room"
               value={newDevice.room}
               onChange={(e) => setNewDevice(prev => ({ ...prev, room: e.target.value }))}
               sx={{ mb: 2 }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <FormControl fullWidth sx={{ mb: 2 }}>
               <InputLabel>Device Type</InputLabel>
               <Select
                 value={newDevice.type}
                 label="Device Type"
                 onChange={(e) => setNewDevice(prev => ({ ...prev, type: e.target.value }))}
               >
                 <MenuItem value="light">Light</MenuItem>
                 <MenuItem value="lock">Lock</MenuItem>
                 <MenuItem value="camera">Camera</MenuItem>
                 <MenuItem value="sensor">Sensor</MenuItem>
                 <MenuItem value="switch">Switch</MenuItem>
               </Select>
             </FormControl>
           </Grid>
           <Grid item xs={12} sm={6}>
             <FormControl fullWidth sx={{ mb: 2 }}>
               <InputLabel>Status</InputLabel>
               <Select
                 value={newDevice.status}
                 label="Status"
                 onChange={(e) => setNewDevice(prev => ({ ...prev, status: e.target.value }))}
               >
                 <MenuItem value="online">Online</MenuItem>
                 <MenuItem value="offline">Offline</MenuItem>
               </Select>
             </FormControl>
           </Grid>
         </Grid>
       </DialogContent>
       <DialogActions>
         <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
         <Button onClick={handleAddDevice} variant="contained" disabled={!newDevice.name || !newDevice.room}>
           Add Device
         </Button>
       </DialogActions>
     </Dialog>

     <Divider sx={{ mx: 4 }} />

     {/* Footer */}
     <Box sx={{ py: 4 }}>
       <Container maxWidth="lg">
         <Typography variant="body2" align="center" color="text.secondary">
           &copy; {new Date().getFullYear()} TrueGate Inc. All rights reserved.
         </Typography>
       </Container>
     </Box>
   </Box>
 );
};

export default Devices;