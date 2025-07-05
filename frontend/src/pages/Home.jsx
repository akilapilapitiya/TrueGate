import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Home Page of TrueGate
      </Typography>

      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Register
      </Button>
    </Box>
  );
};

export default Home;
