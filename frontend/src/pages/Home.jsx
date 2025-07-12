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
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 1000,
          color: "white",
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          width: 56,
          height: 56,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.25)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(22, 113, 146, 0.3)',
          },
        }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* Hero Section - Completely Redesigned */}
      <Fade in={showContent} timeout={1000}>
        <Box
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: isDarkMode ? 
              'radial-gradient(circle at 30% 20%, rgba(22, 113, 146, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(46, 204, 113, 0.3) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)' :
              'radial-gradient(circle at 30% 20%, rgba(22, 113, 146, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(46, 204, 113, 0.4) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(22, 113, 146, 0.85) 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDarkMode ?
                'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(22, 113, 146, 0.1) 50%, rgba(46, 204, 113, 0.05) 100%)' :
                'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(22, 113, 146, 0.6) 50%, rgba(46, 204, 113, 0.3) 100%)',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(22, 113, 146, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 80% 70%, rgba(46, 204, 113, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 40% 80%, rgba(52, 152, 219, 0.08) 0%, transparent 30%)
              `,
              animation: 'float 20s ease-in-out infinite',
              zIndex: 2,
            },
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(1deg)' },
            },
          }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 3,
              textAlign: 'center',
              px: { xs: 3, md: 6 },
              py: { xs: 8, md: 12 },
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            {/* Animated Background Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, rgba(22, 113, 146, 0.3), rgba(46, 204, 113, 0.2))',
                borderRadius: '50%',
                filter: 'blur(1px)',
                animation: 'pulse 4s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
                  '50%': { transform: 'scale(1.2)', opacity: 0.8 },
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.3), rgba(155, 89, 182, 0.2))',
                borderRadius: '50%',
                filter: 'blur(1px)',
                animation: 'pulse 6s ease-in-out infinite 2s',
              }}
            />

            {/* Main Content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 4,
              }}
            >
              {/* Brand Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1,
                  mb: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
              >
                <SecurityIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Next-Gen Security Platform
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography 
                variant={isMobile ? "h3" : "h1"} 
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: 'white',
                  textShadow: '2px 2px 20px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Welcome to{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(135deg, rgba(46, 204, 113, 1) 0%, rgba(52, 152, 219, 1) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.8) 0%, rgba(52, 152, 219, 0.8) 100%)',
                      borderRadius: '2px',
                    },
                  }}
                >
                  TrueGate
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography 
                variant={isMobile ? "h6" : "h5"}
                sx={{ 
                  mb: 6,
                  maxWidth: "800px", 
                  mx: "auto",
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                }}
              >
                The future of home security is here. Experience{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    color: 'rgba(46, 204, 113, 1)',
                    fontWeight: 600,
                  }}
                >
                  intelligent monitoring
                </Box>
                , seamless control, and unparalleled protection — all from one revolutionary platform.
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mb: 6,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{ 
                    borderRadius: '50px',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, rgba(46, 204, 113, 1) 0%, rgba(52, 152, 219, 1) 100%)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(46, 204, 113, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 48px rgba(46, 204, 113, 0.6)',
                      background: 'linear-gradient(135deg, rgba(52, 152, 219, 1) 0%, rgba(46, 204, 113, 1) 100%)',
                    },
                  }}
                >
                  Access Dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/register")}
                  sx={{
                    borderRadius: '50px',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 48px rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
              </Box>

              {/* Stats/Trust Indicators */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: { xs: 4, md: 8 },
                  flexWrap: 'wrap',
                  mt: 4,
                }}
              >
                {[
                  { number: '50K+', label: 'Secure Homes' },
                  { number: '99.9%', label: 'Uptime' },
                  { number: '24/7', label: 'Monitoring' },
                ].map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: 'rgba(46, 204, 113, 1)',
                        mb: 0.5,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Features Section */}
      <Slide in={showContent} direction="up" timeout={1200}>
        <Box sx={{ px: 3, py: 6, background: theme.palette.background.default }}>
          <Typography 
            variant="h5" 
            fontWeight={600} 
            textAlign="center" 
            mb={4}
            sx={{ color: theme.palette.text.primary }}
          >
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
                    boxShadow: isDarkMode ? 
                      `0 4px 12px rgba(76, 175, 80, 0.1)` : 
                      `0 4px 12px rgba(34, 139, 34, 0.1)`,
                    height: "100%",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    border: `1px solid ${isDarkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(34, 139, 34, 0.1)'}`,
                    background: isDarkMode ? 
                      colors.gradients.card : 
                      'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 252, 248, 0.9) 100%)',
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDarkMode ? 
                        `0 8px 24px rgba(76, 175, 80, 0.2)` : 
                        `0 8px 24px rgba(34, 139, 34, 0.2)`,
                      borderColor: colors.brand.primary,
                    },
                  }}
                >
                  <Box sx={{ 
                    mb: 2, 
                    color: colors.brand.primary,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: isDarkMode ? 
                      'rgba(76, 175, 80, 0.1)' : 
                      'rgba(34, 139, 34, 0.1)',
                    mx: 'auto',
                  }}>
                    {f.icon}
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight={600} 
                    sx={{ 
                      mb: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: theme.palette.text.secondary }}
                  >
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
          backgroundColor: isDarkMode ? 
            'rgba(76, 175, 80, 0.1)' : 
            'rgba(34, 139, 34, 0.05)',
          borderTop: `1px solid ${isDarkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(34, 139, 34, 0.1)'}`,
          borderBottom: `1px solid ${isDarkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(34, 139, 34, 0.1)'}`,
        }}
      >
        <Typography 
          variant="h6" 
          fontWeight={500} 
          sx={{ 
            mb: 2,
            color: theme.palette.text.primary,
          }}
        >
          Ready to experience smarter, safer living?
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate("/register")}
          sx={{
            bgcolor: colors.brand.primary,
            color: theme.palette.primary.contrastText,
            borderRadius: 4,
            px: 4,
            py: 1.5,
            boxShadow: `0 4px 12px rgba(34, 139, 34, 0.3)`,
            '&:hover': {
              bgcolor: colors.brand.tertiary,
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px rgba(34, 139, 34, 0.4)`,
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
          background: isDarkMode ? colors.gradients.darkBg : colors.gradients.primary,
          color: theme.palette.primary.contrastText,
          px: 6,
          py: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode ? 
              'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(22, 113, 146, 0.3) 100%)' :
              'linear-gradient(135deg, rgba(22, 113, 146, 0.95) 0%, rgba(46, 204, 113, 0.2) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={3}>
              <Typography 
                variant="h6" 
                fontWeight={700} 
                gutterBottom
                sx={{ color: theme.palette.primary.contrastText }}
              >
                TrueGate
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: theme.palette.primary.contrastText,
                  opacity: 0.9,
                }}
              >
                Building smarter, safer homes with intelligent security solutions.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                gutterBottom
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link 
                  href="/" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Home
                </Link>
                <Link 
                  href="/features" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Features
                </Link>
                <Link 
                  href="/login" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                gutterBottom
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Support
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link 
                  href="/faq" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  FAQ
                </Link>
                <Link 
                  href="/help" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Help Center
                </Link>
                <Link 
                  href="/contact" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                  underline="hover"
                >
                  Contact
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                gutterBottom
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  href="#"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  href="#"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  href="#"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                  href="#"
                >
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography 
              variant="body2"
              sx={{ 
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
              }}
            >
              © 2025 TrueGate Inc. All rights reserved.
            </Typography>
            <Typography 
              variant="body2"
              sx={{ 
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
              }}
            >
              Built for smarter homes & safer families.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
