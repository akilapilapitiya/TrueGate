import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const boxStyle = {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.37)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    padding: 2,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.62)",
      backgroundColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:active": {
      transform: "translateY(-2px)",
    },
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "rgb(255, 255, 255)",
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        margin: 0,
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
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "10vh",
        }}
      >
        <Paper
          elevation={6}
          onClick={() => {
            navigate("/footage");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Review CCTV Footage
          </Typography>
        </Paper>

        <Paper
          elevation={6}
          onClick={() => {
            navigate("/history");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Review Access History
          </Typography>
        </Paper>

        <Paper
          elevation={6}
          onClick={() => {
            navigate("/devices");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Manage Security Equipment
          </Typography>
        </Paper>

        <Paper
          elevation={6}
          onClick={() => {
            navigate("/users");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Manage Registered Users
          </Typography>
        </Paper>

        <Paper
          elevation={6}
          onClick={() => {
            navigate("/profile");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Change Profile Details
          </Typography>
        </Paper>

        <Paper
          elevation={6}
          onClick={() => {
            navigate("/about");
          }}
          sx={boxStyle}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            About TrueGate
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
