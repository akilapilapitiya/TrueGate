import React from "react";
import logoBlue from "../assets/logo-name.png"
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Stack,
  useTheme,
  Card,
  CardContent,
  Chip,
  alpha,
} from "@mui/material";
import {
  Security,
  Cloud,
  Wifi,
  Notifications,
  People,
  Storefront,
  Chat,
  YouTube,
  VerifiedUser,
  DevicesOther,
  ArrowForward,
  PlayArrow,
} from "@mui/icons-material";

const About = () => {
  const theme = useTheme();

  // Feature cards data
  const features = [
    {
      icon: <DevicesOther sx={{ fontSize: 40 }} />,
      title: "Device Centralization",
      desc: "Manage all your security cameras, motion detectors, and sensors in one unified dashboard.",
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <Cloud sx={{ fontSize: 40 }} />,
      title: "Cloud Storage",
      desc: "Automatic cloud backups of your footage for added safety and access anywhere, anytime.",
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    {
      icon: <Wifi sx={{ fontSize: 40 }} />,
      title: "WiFi Control",
      desc: "Connect and control all supported devices remotely with seamless WiFi integration.",
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      icon: <Notifications sx={{ fontSize: 40 }} />,
      title: "Smart Notifications",
      desc: "Receive real-time alerts on suspicious activity or security breaches instantly.",
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: "Dependant Management",
      desc: "Allow trusted users to monitor your property with customizable permissions and access levels.",
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40 }} />,
      title: "Data Privacy First",
      desc: "All your information is encrypted and stored with industry-leading security standards.",
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                {/* Logo Section */}
                <Box sx={{ mb: 4 }}>
                  <Box
                    component="img"
                    src={logoBlue}
                    alt="TrueGate Logo"
                    sx={{
                      height: { xs: 50, md: 60 },
                      width: "auto",
                      mb: 2,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                    }}
                  />
                  <Chip
                    label="Security Made Simple"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>

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
                  Welcome to TrueGate
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontWeight: 300,
                    mb: 4,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  Your All-in-One Security Assistant — Smart, Scalable, and Secure
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 6,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 300, md: 400 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "120%",
                      height: "120%",
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                      borderRadius: "50%",
                      zIndex: -1,
                    },
                  }}
                >
                  <Security sx={{ fontSize: { xs: 80, md: 120 }, color: theme.palette.primary.main }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
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
            Core Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Comprehensive security solutions designed to protect what matters most to you
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                    borderColor: alpha(feature.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      bgcolor: feature.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 2, color: theme.palette.text.primary }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Store & Community Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.grey[100], 0.5), py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <Storefront sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    TrueGate Store
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    Enjoy exclusive discounts and offers on latest security gadgets and upgrades tailored to your specific needs.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      "&:hover": {
                        transform: "translateX(4px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Visit Store
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 20px 40px ${alpha(theme.palette.secondary.main, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <Chat sx={{ fontSize: 30, color: theme.palette.secondary.main }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    TrueGate Community
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    Connect with others, share tips, and learn how to better secure your home or business from experienced users.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      "&:hover": {
                        transform: "translateX(4px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* YouTube Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box textAlign="center">
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.error.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <YouTube sx={{ fontSize: 50, color: theme.palette.error.main }} />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
            }}
          >
            Learn with TrueGate
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: 600,
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Watch our expert-led videos and learn how to set up your devices yourself, troubleshoot issues, and get the most out of our platform.
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<PlayArrow />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: "1.1rem",
              boxShadow: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 6,
              },
              transition: "all 0.3s ease",
            }}
          >
            Watch Tutorials
          </Button>
        </Box>
      </Container>

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

export default About;