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
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";
import { checkLogInValidateData } from "../utils/Validate";

const Login = () => {
  const navigate = useNavigate();
  const [remeberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // User Refs for Input Fields
  const email = useRef();
  const password = useRef();

  const signInLogic = () => {
    console.log(email.current.value, password.current.value); //Testing

    // Validation Logic
    const message = checkLogInValidateData(
      email.current.value,
      password.current.value
    );
    if (message) {
      setErrorMessage(message); //Update Error State
      return;
    }
    // Login Logic
    // Store Update Logic
    // Rememeber Me Logic
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(161, 178, 255)",
        padding: 2,
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px" }}>
        <Grid
          container
          sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
        >
          {/* Left side: Login Form */}
          <Grid item xs={12} md={6} sx={{ backgroundColor: "white", p: 3 }}>
            <img
              src={namedLogo}
              alt="Named logo"
              style={{ width: "auto", height: "30px", marginBottom: "16px" }}
            />
            <Typography variant="h6" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
              Please sign in to continue
            </Typography>

            <Box sx={{ mt: 1 }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                inputRef={email}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                inputRef={password}
              />

              <FormGroup sx={{ mb: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={remeberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                  }}
                />
              </FormGroup>

              <NavLink
                to="/password-reset"
                style={{
                  fontSize: "14px",
                  marginBottom: "16px",
                  display: "inline-block",
                }}
              >
                Forgot Password?
              </NavLink>

              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                  {errorMessage}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                onClick={signInLogic}
                sx={{ mb: 1 }}
              >
                Sign In
              </Button>
              <NavLink
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't Have an Account?
              </NavLink>
            </Box>
          </Grid>

          {/* Right side Image Panel */}
          <Grid
            item
            xs={12}
            md={6}
            // sx={{
            //   backgroundImage: `url(${namedLogo})`,
            //   backgroundSize: "contain",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            //   display: { xs: "none", md: "block" },
            // }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
