import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { colorPallete } from "../ColorTheme";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: colorPallete.pageBackgroundColorError,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "background.paper",
          px: 3,
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for does not exist or an unexpected error has
          occurred.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            size="large"
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
