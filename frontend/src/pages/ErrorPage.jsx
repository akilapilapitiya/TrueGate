import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Error Page
      </Typography>
    </Box>
  );
};

export default ErrorPage;
