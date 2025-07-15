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
  Modal,
  Fade,
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
  FiberManualRecord,
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
      sx={{
        minHeight: "100vh",
        pt: 10,
        px: { xs: 2, sm: 4 },
        pb: 8,
        background: theme.palette.mode === "dark"
          ? `
              radial-gradient(circle at 20% 30%, rgba(22, 113, 146, 0.15), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(46, 204, 113, 0.12), transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #2d534fff 100%)
            `
          : `
              radial-gradient(circle at 60% 40%, rgba(46, 204, 113, 0.15), transparent 50%),
              radial-gradient(circle at 30% 80%, rgba(52, 152, 219, 0.12), transparent 50%),
              linear-gradient(135deg, #edf4f6ff 0%, #48847af4 100%)
            `,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Security Cameras
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Monitor your property with live camera footage.
      </Typography>

      <Grid container spacing={3} my={2}>
        {["Total Cameras", "Online", "Motion Events", "Storage Used"].map((label, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                backdropFilter: "blur(6px)",
                background: theme.palette.mode === "dark" ? "#162c3caa" : "#ffffffcc",
                boxShadow: theme.palette.mode === "dark"
                  ? "0 0 12px rgba(0, 0, 0, 0.4)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">
                {label === "Total Cameras"
                  ? cameras.length
                  : label === "Online"
                  ? cameras.filter((c) => c.status === "online").length
                  : label === "Motion Events"
                  ? Math.floor(Math.random() * 10) + 5
                  : `${Math.floor(Math.random() * 50) + 20} GB`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} mt={1}>
        {cameras.map((camera) => (
          <Grid item xs={12} md={6} key={camera.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="320"
                  image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
                  alt={camera.name}
                  sx={{ objectFit: "cover" }}
                />
                {camera.status === "online" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #e53935, #e35d5b)",
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                      animation: "pulseLive 2s infinite",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <FiberManualRecord fontSize="small" /> LIVE
                  </Box>
                )}
              </Box>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">{camera.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {camera.room}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: camera.status === "online"
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
                  <IconButton><Refresh /></IconButton>
                  <IconButton><Download /></IconButton>
                  <IconButton><Share /></IconButton>
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
<Box mt={8} display="flex" justifyContent="center">
  <Box sx={{ width: "100%", maxWidth: 1000 }}>
    <Typography
      variant="h5"
      align="center"
      gutterBottom
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1.4rem", sm: "1.8rem" },
        color: theme.palette.mode === "dark" ? "#e3f2fd" : "#0d3c61",
        mb: 4,
      }}
    >
      Recent Motion Events
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[...Array(6)].map((_, i) => (
        <Grid item xs={12} sm={10} md={6} key={i}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
              borderRadius: 4,
              backdropFilter: "blur(6px)",
              background: theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #0d3c61, #023a2f)"
                : "linear-gradient(135deg, #d6f1f7, #ccebe3)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 24px rgba(0, 0, 0, 0.6)"
                  : "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 30px rgba(0,0,0,0.7)"
                    : "0 12px 30px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 140,
                height: 90,
                borderRadius: 2,
                mr: 3,
                objectFit: "cover",
              }}
              image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
              alt="motion-thumbnail"
            />

            <Box flex={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#0f172a",
                }}
                gutterBottom
              >
                Motion detected at{" "}
                {cameras[Math.floor(Math.random() * cameras.length)]?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.mode === "dark" ? "#cfd8dc" : "#546e7a",
                }}
              >
                {new Date(
                  Date.now() - Math.random() * 3600000
                ).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  textTransform: "none",
                  fontWeight: 500,
                  color: theme.palette.mode === "dark" ? "#90caf9" : "#1565c0",
                  borderColor: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1e2f3a" : "#e3f2fd",
                    borderColor:
                      theme.palette.mode === "dark" ? "#bbdefb" : "#1565c0",
                  },
                }}
              >
                View
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
</Box>
      <Modal open={!!selectedCamera} onClose={() => setSelectedCamera(null)}>
        <Fade in={!!selectedCamera}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "60%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CardMedia
              component="img"
              image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
              alt="Full Preview"
              sx={{ width: "100%", height: "auto", borderRadius: 2 }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Footage;
