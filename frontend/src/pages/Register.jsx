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
import { NavLink, useNavigate } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { uid } from "chart.js/helpers";

const Register = () => {
  // Declare refs here
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const contact = useRef();
  const dob = useRef();
  const gender = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterLogic = () => {
    // To get Gender selected value:
    const selectedGenderInput = gender.current.querySelector(
      'input[type="radio"]:checked'
    );
    const genderValue = selectedGenderInput ? selectedGenderInput.value : null;

    //Validation Logic
    const message = checkSignUpValidateData(
      email.current.value,
      password.current.value,
      confirmPassword.current.value,
      firstName.current.value,
      lastName.current.value,
      dob.current.value,
      contact.current.value,
      genderValue
    );
    if (message) {
      setErrorMessage(message);
      return false;
    }

    // registration logic #FIREBASE
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: firstName.current.value + " " + lastName.current.value,
        })
          .then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
              })
            );
            navigate("/dashboard");
          })
          .catch((error) => {
            // An error occurred
            setErrorMessage(error.code + error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + errorMessage);
      });
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
          <Grid sx={{ backgroundColor: "white", p: 3, xs: "12", md: "6" }}>
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
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={firstName}
                  />
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={lastName}
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
                  inputRef={email}
                />
              </Box>

              {/* Contact Number & DOB */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={contact}
                  />
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    inputRef={dob}
                  />
                </Grid>
              </Grid>

              {/* Gender */}
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth ref={gender}>
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
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={password}
                  />
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputRef={confirmPassword}
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
            sx={{ xs: 12, md: 6 }}
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
