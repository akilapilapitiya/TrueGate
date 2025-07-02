import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import namedLogo from "../assets/logo-name.png"; 
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

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
  <Box sx={{ width: "90%", maxWidth: "1200px" }}>
    <Grid container sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
      {/* Left Side - Registration Form */}
      <Grid item xs={12} md={6} sx={{ backgroundColor: "white", p: 4 }}>
        <img
          src={namedLogo}
          alt="Logo"
          style={{ width: "auto", height: "40px", marginBottom: "20px" }}
        />

        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <Typography variant="body2" gutterBottom>
          Create your account below
        </Typography>

        <Grid container spacing={2}>
          {/* First Name & Last Name */}
          <Grid item xs={6}>
            <TextField label="First Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" variant="outlined" fullWidth />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField label="Email" type="email" variant="outlined" fullWidth />
          </Grid>

          {/* Contact Number & DOB */}
          <Grid item xs={6}>
            <TextField label="Contact Number" type="tel" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup row aria-labelledby="gender-label" name="gender">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Passwords */}
          <Grid item xs={6}>
            <TextField label="Password" type="password" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Confirm Password" type="password" variant="outlined" fullWidth />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Register
            </Button>
            <NavLink to="/login">Already have an account?</NavLink>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side - Image Panel */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${namedLogo})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#fff",
          display: { xs: "none", md: "block" },
        }}
      />
    </Grid>
  </Box>
</Box>

  );
};

export default Register;
