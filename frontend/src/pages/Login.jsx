import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";

const Login = () => {
  const navigate = useNavigate();

  const signInLogic = () => {
    console.log("Button Set");
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(131, 31, 31)",
        padding: 0,
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
          {/* Left side: Login Form */}
          <Grid item xs={12} md={6} sx={{ backgroundColor: "white", p: 4 }}>
            <img
              src={namedLogo}
              alt="Named logo"
              style={{ width: "auto", height: "40px", marginBottom: "20px" }}
            />
            <Typography variant="h5" gutterBottom>Welcome Back</Typography>
            <Typography variant="body1" gutterBottom>Please sign in to continue</Typography>

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>

            <NavLink to="/password-reset" style={{ fontSize: "14px", marginBottom: "16px", display: "inline-block" }}>
              Forgot Password?
            </NavLink>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={signInLogic}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            <NavLink onClick={() => {navigate('/register')}}>Dont Have an Account?</NavLink>
          </Grid>

          {/* Right side: Image or visual */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url('https://via.placeholder.com/600x800')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "block" },
            }}
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
