import { Box, Button, Typography, useMediaQuery, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffe1e8, #e4f1f1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating background shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          left: "-80px",
          width: "250px",
          height: "250px",
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
          bottom: "-100px",
          right: "-100px",
          width: "200px",
          height: "200px",
          backgroundColor: "#c0f0ed",
          borderRadius: "60% 40% 70% 30%",
          animation: "float2 10s ease-in-out infinite",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      <Fade in={showContent} timeout={800}>
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            404
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Oops! Looks like you've wandered into unknown territory.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 4, px: 4 }}
          >
            Back to Homepage
          </Button>
        </Box>
      </Fade>

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

export default NotFound;
