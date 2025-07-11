import { Box, Button, Typography, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";



const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 8,
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography
          variant={isMobile ? "h3" : "h1"}
          color="primary"
          fontWeight={800}
          sx={{ letterSpacing: -1 }}
        >
          404
        </Typography>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={600}
          color="text.primary"
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 450 }}
        >
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Go to Homepage
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
