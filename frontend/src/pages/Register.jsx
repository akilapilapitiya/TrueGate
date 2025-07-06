import {
  Box,
  Button,
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
import registerBg from "../assets/register-bg.png"; 
import namedLogo from "../assets/logo-name.png";
import { NavLink, useNavigate } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

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
    const selectedGenderInput = gender.current.querySelector('input[type="radio"]:checked');
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
        backgroundImage: `url(${registerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(12px)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={namedLogo}
          alt="Logo"
          style={{ width: "120px", marginBottom: "24px" }}
        />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Create New Account
        </Typography>
        <Typography variant="body2" gutterBottom sx={{color: "#167192", mb: 2 }}>
          Secure your smart world with TrueGate
        </Typography>

        <Box sx={{ mt: 1, width: "100%" }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                size="small"
                inputRef={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                size="small"
                inputRef={lastName}
              />
            </Grid>
          </Grid>

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

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                type="tel"
                variant="outlined"
                fullWidth
                size="small"
                inputRef={contact}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                inputRef={password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            size="medium"
            sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
            onClick={RegisterLogic}
          >
            Register
          </Button>

          <Typography variant="body2" align="center">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
