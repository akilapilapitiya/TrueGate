import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  Fade,
  Slide,
  Link,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppTheme } from "../hooks/useAppTheme";

const features = [
  {
    title: "Real-time CCTV Access",
    desc: "Watch live or recorded security footage from anywhere.",
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    title: "Device Management",
    desc: "Control all connected security devices from one dashboard.",
    icon: <DevicesIcon fontSize="large" />,
  },
  {
    title: "Family Access Control",
    desc: "Securely share and manage access with your loved ones.",
    icon: <GroupIcon fontSize="large" />,
  },
  {
    title: "Live Alerts & Logs",
    desc: "Stay informed with instant alerts and activity tracking.",
    icon: <NotificationsActiveIcon fontSize="large" />,
  },
  {
    title: "Smart Scheduling",
    desc: "Automate device activity with custom schedules.",
    icon: <EventIcon fontSize="large" />,
  },
  {
    title: "Multi-Home Support",
    desc: "Manage multiple properties in one place securely.",
    icon: <HomeWorkIcon fontSize="large" />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { theme, isDarkMode, toggleTheme, colors } = useAppTheme();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <Box
      sx={{
         minHeight: "100vh",
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    background: isDarkMode
      ? "linear-gradient(135deg, rgb(27, 38, 44), rgb(15, 76, 117))"
      : "linear-gradient(135deg, rgb(50, 130, 184), rgb(187, 225, 250),rgb(15, 76, 117) )",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: theme.palette.text.primary,
    position: "relative",
      }}
    >
      {/* Theme Toggle */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
          color: isDarkMode ? "#fff" : colors.brand.primary,
        }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* Hero Section */}
      <Fade in={showContent} timeout={1000}>
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 10 },
            px: 2,
            background: "transparent",
            color: "0F4C75",
            //boxShadow: "inset 0 -10px 30px rgba(11, 32, 47, 0.88)",
          }}
        >
          <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700} gutterBottom>
            Welcome to TrueGate
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: "700px", mx: "auto", opacity: 1, }}>
            Smart, secure, and seamless - manage your entire home security from one intuitive dashboard.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{ 
                borderRadius: 4,
                 px: 4 ,
                background: "linear-gradient(135deg, #0F4C75 0%, #42a5f5 100%)",
                boxShadow: "0 4px 20px rgba(66,165,245,0.5)",
                color: theme.palette.primary.contrastText,
                }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 4,
                px: 4,
                color: isDarkMode ? "#fff" : "#2474a9",
                borderColor: "#175f8fff",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Trusted by thousands of families and growing.
          </Typography>
        </Box>
      </Fade>

      {/* Features Section */}
      <Slide in={showContent} direction="up" timeout={1200}>
        <Box sx={{ px: 3, py: 6, background: "transparent" }}>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={4}>
            Why Join TrueGate?
          </Typography>
         <Grid container spacing={4} justifyContent="center">
  {features.map((f, idx) => (
   <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: 3,
                    height: "100%",
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ mb: 1 }}>
               {React.cloneElement(f.icon, {
               sx: {
                    fontSize: 40,
                    color: isDarkMode ? colors.primary : "#2474a9ff", // adjust to any color you like
                    },
                      })}
                  </Box>

                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Slide>

      {/* CTA Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          px: 2,
          background: "transparent",
        }}
      >
        <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
          Ready to experience smarter, safer living?
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate("/register")}
          sx={{
    borderRadius: 4,
    px: 4,
    py: 1.5,
    background: "linear-gradient(135deg, #0F4C75 0%, #42a5f5 100%)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(50, 130, 184, 0.4)",
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(135deg, rgb(15, 76, 117), rgb(50, 130, 184))",
    },
  }}
          >

          Get Started Today
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          background: isDarkMode ? colors.gradients.dark : colors.gradients.light,
          color:  theme.palette.text.primary,
          px: 6,
          py: 6,
        }}
      >
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              TrueGate
            </Typography>
            <Typography variant="body2">
              Building smarter, safer homes with intelligent security solutions.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/features" color="inherit" underline="hover">
                Features
              </Link>
              <Link href="/login" color="inherit" underline="hover">
                Login
              </Link>
              <Link href="/register" color="inherit" underline="hover">
                Register
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
              <Link href="/help" color="inherit" underline="hover">
                Help Center
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <IconButton color="inherit" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4, opacity: 0.8 }}>
          <Typography variant="body2">© 2025 TrueGate Inc. All rights reserved.</Typography>
          <Typography variant="body2">Built for smarter homes & safer families.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
