import React from "react";
import { Box, CircularProgress, Typography, keyframes } from "@mui/material";
import { colorPallete } from "../ColorTheme";

// Define keyframe animation for bouncing dots
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <CircularProgress
        size={90}
        thickness={5}
        sx={{
          color: "#ffffff",
          animationDuration: "2s",
        }}
      />

      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          letterSpacing: 1,
        }}
      >
        <Typography
          component="span"
          sx={{
            color: "#ffffff",
            marginRight: "8px",
          }}
        >
          Loading
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
