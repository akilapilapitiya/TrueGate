import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h3"> Page Not Found</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        RETURN GO TO HOME PAGE
      </Button>
    </Box>
  );
};

export default NotFound;
