import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;
