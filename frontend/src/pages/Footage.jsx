import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Refresh,
  Download,
  Share,
  WarningAmber,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { mockFootage } from "../data/dummyFootage";

const Footage = () => {
  const theme = useTheme();
  const [playing, setPlaying] = useState({});
  const [muted, setMuted] = useState({});
  const [selectedCamera, setSelectedCamera] = useState(null);

  const cameras = mockFootage.filter((device) => device.type === "camera");

  const togglePlay = (id) => {
    setPlaying((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMute = (id) => {
    setMuted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
      p={4}
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      sx={{ minHeight: "100vh", pt: 10 }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Security Cameras
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Monitor your property with live camera footage.
      </Typography>

      <Grid container spacing={3} my={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">{cameras.length}</Typography>
            <Typography variant="caption" color="text.secondary">
              Total Cameras
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">
              {cameras.filter((c) => c.status === "online").length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Online
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">
              {Math.floor(Math.random() * 10) + 5}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Motion Events
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">
              {Math.floor(Math.random() * 50) + 20} GB
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Storage Used
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {cameras.map((camera) => (
          <Grid item xs={12} md={6} key={camera.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={camera.name}
              />
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{camera.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {camera.room}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor:
                        camera.status === "online"
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      width: 14,
                      height: 14,
                    }}
                  />
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Box>
                  <IconButton onClick={() => togglePlay(camera.id)}>
                    {playing[camera.id] ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <IconButton onClick={() => toggleMute(camera.id)}>
                    {muted[camera.id] ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>
                  <IconButton>
                    <Refresh />
                  </IconButton>
                  <IconButton>
                    <Download />
                  </IconButton>
                  <IconButton>
                    <Share />
                  </IconButton>
                </Box>
                <IconButton onClick={() => setSelectedCamera(camera.id)}>
                  <Fullscreen />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Motion Events */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Recent Motion Events
        </Typography>
        <Grid container spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 60, borderRadius: 1, mr: 2 }}
                  image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="motion-thumbnail"
                />
                <Box>
                  <Typography fontWeight="500">
                    Motion detected at{" "}
                    {cameras[Math.floor(Math.random() * cameras.length)]?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(
                      Date.now() - Math.random() * 3600000
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Button size="small">View</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Footage;
