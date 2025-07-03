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
import React, { useRef, useState } from "react";
import namedLogo from "../assets/logo-name.png";
import { NavLink } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";

const Register = () => {
  // Declare refs here
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);


  const RegisterLogic = () => {
    // To get Gender selected value:
    const selectedGenderInput = genderRef.current.querySelector(
      'input[type="radio"]:checked'
    );
    const genderValue = selectedGenderInput ? selectedGenderInput.value : null;
    

    // Testing 
    console.log(
      firstNameRef.current.value,
      lastNameRef.current.value,
      emailRef.current.value,
      contactRef.current.value,
      dobRef.current.value,
      genderValue,
      passwordRef.current.value,
      confirmPasswordRef.current.value,
      genderValue
    );

    //Validation Logic
    const message = checkSignUpValidateData(
      emailRef.current.value,
      passwordRef.current.value,
      confirmPasswordRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value,
      dobRef.current.value,
      contactRef.current.value,
      genderValue,
    )
    if (message) {
      setErrorMessage(message);
      return false
    }

    // registration logic
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
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Left Side - Registration Form */}
          <Grid item xs={12} md={6} sx={{ backgroundColor: "white", p: 3 }}>
            <img
              src={namedLogo}
              alt="Logo"
              style={{ width: "auto", height: "30px", marginBottom: "16px" }}
            />

            <Typography variant="h6" gutterBottom>
              Register
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
              Create your account below
            </Typography>

            <Box sx={{ mt: 1 }}>
              {/* First Name & Last Name */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={firstNameRef}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={lastNameRef}
                  />
                </Grid>
              </Grid>

              {/* Email */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  inputRef={emailRef}
                />
              </Box>

              {/* Contact Number & DOB */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={contactRef}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    inputRef={dobRef}
                  />
                </Grid>
              </Grid>

              {/* Gender */}
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth ref={genderRef}>
                  <FormLabel id="gender-label" sx={{ fontSize: "0.875rem" }}>
                    Gender
                  </FormLabel>
                  <RadioGroup row aria-labelledby="gender-label" name="gender">
                    <FormControlLabel
                      value="female"
                      control={<Radio size="small" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio size="small" />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Passwords */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={confirmPasswordRef}
                  />
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                  {errorMessage}
                </Typography>
              )}

              {/* Submit */}
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                  onClick={RegisterLogic}
                >
                  Register
                </Button>
                <NavLink to="/login">Already have an account?</NavLink>
              </Box>
            </Box>
          </Grid>

          {/* Right Side Image Panel */}
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

export default Register;
