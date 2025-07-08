// Import necessary dependencies
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
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
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

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#167192" },
    background: { default: "#ffffff" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#319bae" },
    background: { default: "#0e2736" },
  },
});

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [darkMode, setDarkMode] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default, color: theme.palette.text.primary, position: "relative" }}>
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000, color: darkMode ? "#fff" : "#167192" }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Fade in={showContent} timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              px: 2,
              background: darkMode ? "linear-gradient(to right, #319bae, #186a86)" : "linear-gradient(to right, #167192, #0f4f66)",
              color: "#fff",
            }}
          >
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700} gutterBottom>
              Welcome to TrueGate
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
              Smart, secure, and seamless — manage your entire home security from one intuitive dashboard.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", mb: 2 }}>
              <Button variant="contained" size="large" sx={{ borderRadius: 4, px: 4 }} onClick={() => navigate("/login")}>Login</Button>
              <Button variant="outlined" size="large" sx={{ borderRadius: 4, px: 4, color: "#fff", borderColor: "#fff" }} onClick={() => navigate("/register")}>Register</Button>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Trusted by thousands of families and growing.
            </Typography>
          </Box>
        </Fade>

        <Slide in={showContent} direction="up" timeout={1200}>
          <Box sx={{ px: 3, py: 6, background: darkMode ? "#0e2736" : "#f5fafd" }}>
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
                      bgcolor: darkMode ? "#186a86" : "#f8fcfd",
                      boxShadow: 1,
                      height: "100%",
                      textAlign: "center",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  >
                    <Box sx={{ mb: 1, color: darkMode ? "#fff" : "#167192" }}>{f.icon}</Box>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                      {f.title}
                    </Typography>
                    <Typography variant="body2">{f.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        <Box sx={{ textAlign: "center", py: 6, px: 2, backgroundColor: darkMode ? "#1c4a5f" : "#e7f5f7" }}>
          <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
            Ready to experience smarter, safer living?
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate("/register")}>Get Started Today</Button>
        </Box>

        <Box component="footer" sx={{ background: darkMode ? "linear-gradient(to right, #186a86, #0f3e50)" : "linear-gradient(to right, #167192, #0f4f66)", color: "#ffffff", px: 6, py: 6 }}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight={700} gutterBottom>TrueGate</Typography>
              <Typography variant="body2">Building smarter, safer homes with intelligent security solutions.</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Quick Links</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/features" color="inherit" underline="hover">Features</Link>
                <Link href="/login" color="inherit" underline="hover">Login</Link>
                <Link href="/register" color="inherit" underline="hover">Register</Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Support</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="/faq" color="inherit" underline="hover">FAQ</Link>
                <Link href="/help" color="inherit" underline="hover">Help Center</Link>
                <Link href="/contact" color="inherit" underline="hover">Contact</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Follow Us</Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
                <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
                <IconButton color="inherit" href="#"><InstagramIcon /></IconButton>
                <IconButton color="inherit" href="#"><YouTubeIcon /></IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4, opacity: 0.8 }}>
            <Typography variant="body2">© 2025 TrueGate Inc. All rights reserved.</Typography>
            <Typography variant="body2">Built for smarter homes & safer families.</Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;