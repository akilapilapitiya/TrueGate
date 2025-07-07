import {
  Box,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  Fade,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

//mycomment - AKILA
const features = [ 
  {
    title: "Real-time CCTV Access",
    desc: "Monitor and review live or recorded surveillance footage anytime.",
  },
  {
    title: "Device Management",
    desc: "Easily manage all connected security devices from one place.",
  },
  {
    title: "Family Access Control",
    desc: "Add family members and control their access rights securely.",
  },
  {
    title: "Live Alerts & Logs",
    desc: "Get instant access logs and suspicious activity alerts.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fbeef2, #eaf7f7)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Animated */}
      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          left: "-80px",
          width: "300px",
          height: "300px",
          backgroundColor: "#ffd6e0",
          borderRadius: "40% 60% 30% 70%",
          animation: "float 8s ease-in-out infinite",
          zIndex: 0,
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-120px",
          right: "-100px",
          width: "250px",
          height: "250px",
          backgroundColor: "#c0f0ed",
          borderRadius: "60% 40% 70% 30%",
          animation: "float2 10s ease-in-out infinite",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      {/* Hero Section */}
      <Fade in={showContent} timeout={1000}>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            py: 10,
            px: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            fontWeight={700}
            color="primary.main"
            gutterBottom
          >
            Welcome to TrueGate
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
          >
            Manage your entire home security ecosystem from one powerful dashboard. Control access, view footage, and stay safe — anytime, anywhere.
          </Typography>
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
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ borderRadius: 4, px: 4 }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate("/register")}
              sx={{ borderRadius: 4, px: 4 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Fade>

      {/* Features Section */}
      <Slide in={showContent} direction="up" timeout={1200}>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            px: 3,
            py: 6,
            backgroundColor: "#ffffffdd",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            boxShadow: "0px -2px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={4}>
            Why Join TrueGate?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((f, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "#fdfdfd",
                    boxShadow: 2,
                    height: "100%",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
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

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 4,
          textAlign: "center",
          backgroundColor: "#f3f3f3",
          zIndex: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 TrueGate Inc. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Built for smarter homes & safer families.
        </Typography>
      </Box>

      {/* Floating Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes float2 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
