import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import namedLogo from "../assets/logo-name.png";
import React from "react";
import { NavLink } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";

const Login = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", margin: "0 10%", background: "red" }}
      >
        <Grid
          size={6}
          sx={{ background: "rgb(192, 171, 171)", height: "100%" }}
        >
          {/* Logo  */}
          <img
            src={namedLogo}
            alt="Named logo"
            style={{ width: "auto", height: "5vh", padding: "20px" }}
          />

          <Typography>Welcome Back</Typography>
          <Typography>Please enter your details</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Email"
              variant="outlined"
            />

            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
            />
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>
            <Box>
              <Typography variant="body1" color="initial">
                Forgot password ?
              </Typography>
            </Box>
          </Box>
          <Button>Sign in</Button>
          <Typography>Register Now</Typography>
        </Grid>

        <Grid size={6}>Hello there</Grid>
      </Grid>
    </Box>
  );
};

export default Login;
