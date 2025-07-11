import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const boxStyle = {
    width: "100%",
    height: 200,
    backgroundColor: theme.palette.background.default,
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[8],
      backgroundColor: theme.palette.action.hover,
    },
    "&:active": {
      transform: "translateY(-2px)",
    },
  };

  const cards = [
    { label: "Review CCTV Footage", path: "/footage" },
    { label: "Review Access History", path: "/history" },
    { label: "Manage Security Devices", path: "/devices" },
    { label: "Manage Registered Users", path: "/users" },
    { label: "Update Profile Details", path: "/profile" },
    { label: "About TrueGate", path: "/about" },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "10vh",
        }}
      >
        {cards.map(({ label, path }) => (
          <Paper
            key={label}
            elevation={6}
            onClick={() => navigate(path)}
            sx={boxStyle}
          >
            <Typography
              variant="h5"
              sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
            >
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
