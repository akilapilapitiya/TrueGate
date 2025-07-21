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
  Container,
  alpha,
  Chip,
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
  Videocam,
  Security,
  Event,
  Storage,
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

  const statsData = [
    {
      icon: <Videocam sx={{ fontSize: 30 }} />,
      label: "Total Cameras",
      value: cameras.length,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <Security sx={{ fontSize: 30 }} />,
      label: "Online",
      value: cameras.filter((c) => c.status === "online").length,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      icon: <Event sx={{ fontSize: 30 }} />,
      label: "Motion Events",
      value: Math.floor(Math.random() * 10) + 5,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
    {
      icon: <Storage sx={{ fontSize: 30 }} />,
      label: "Storage Used",
      value: `${Math.floor(Math.random() * 50) + 20} GB`,
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
          <Box textAlign="center">
            <Chip
              label="Live Monitoring"
              color="primary"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Security Cameras
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                fontWeight: 300,
                mb: 4,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Monitor your property with live camera footage and advanced
              analytics
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 20px 40px ${alpha(stat.color, 0.15)}`,
                    borderColor: alpha(stat.color, 0.3),
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      bgcolor: stat.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.9rem" }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Camera Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {cameras.map((camera) => (
            <Grid item xs={12} md={6} key={camera.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="400"
                    image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
                    alt={camera.name}
                    sx={{ objectFit: "cover" }}
                  />
                  {camera.status === "online" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${alpha(
                          theme.palette.error.main,
                          0.8
                        )} 100%)`,
                        color: "white",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        animation: "pulseLive 2s infinite",
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.error.main,
                          0.4
                        )}`,
                      }}
                    >
                      <FiberManualRecord fontSize="small" /> LIVE
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: alpha(theme.palette.background.paper, 0.9),
                      borderRadius: "50%",
                      p: 1,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          camera.status === "online"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                        width: 20,
                        height: 20,
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {camera.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "1rem" }}
                  >
                    {camera.room}
                  </Typography>
                </CardContent>
                <Divider sx={{ mx: 3 }} />
                <CardActions sx={{ p: 3, justifyContent: "space-between" }}>
                  <Box display="flex" gap={1}>
                    <IconButton
                      onClick={() => togglePlay(camera.id)}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {playing[camera.id] ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton
                      onClick={() => toggleMute(camera.id)}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.action.hover, 0.1),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {muted[camera.id] ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.action.hover, 0.1),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Refresh />
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.action.hover, 0.1),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Download />
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.action.hover, 0.1),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Box>
                  <IconButton
                    onClick={() => setSelectedCamera(camera.id)}
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.secondary.main, 0.2),
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Fullscreen />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Motion Events Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.grey[100], 0.5),
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Recent Motion Events
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Stay informed with real-time motion detection alerts from all your
              cameras
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${alpha(
                        theme.palette.warning.main,
                        0.15
                      )}`,
                      borderColor: alpha(theme.palette.warning.main, 0.3),
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
                    alt="motion-thumbnail"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        fontSize: "1.1rem",
                      }}
                    >
                      Motion detected
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {cameras[Math.floor(Math.random() * cameras.length)]?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 2 }}
                    >
                      {new Date(
                        Date.now() - Math.random() * 3600000
                      ).toLocaleString()}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 6,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="text.secondary">
            &copy; {new Date().getFullYear()} TrueGate Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Fullscreen Modal */}
      <Modal open={!!selectedCamera} onClose={() => setSelectedCamera(null)}>
        <Fade in={!!selectedCamera}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "90%", md: "80%" },
              maxWidth: 1200,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 4,
              p: 3,
              outline: "none",
            }}
          >
            <CardMedia
              component="img"
              image="https://plus.unsplash.com/premium_photo-1750651872632-ec586bb414b5?q=80&w=1374&auto=format&fit=crop"
              alt="Full Preview"
              sx={{
                width: "100%",
                height: { xs: 300, sm: 400, md: 500 },
                borderRadius: 3,
                objectFit: "cover",
              }}
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setSelectedCamera(null)}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <style jsx global>{`
        @keyframes pulseLive {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </Box>
  );
};

export default Footage;
