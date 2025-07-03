import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import namedLogo from "../assets/logo-name.png";
import { useRef, useState } from "react";
import { emailValidation } from "../utils/Validate";

const PasswordReset = () => {

  const email = useRef();
  const [errorMessage, setErrorMessage] = useState(false);
  const [emailValid, setEmailValid] = useState(true)

  const passwordCheckSequence =() =>{
    //Check email to be valid
    const message = emailValidation(email);
    if (message) {
      setErrorMessage(message);
      return false;
    }

    // Search email, if valid wait for server

    
  }
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
        <Grid sx={{ backgroundColor: "white", p: 3, xs: "12", md: "6" }}>
          <img
            src={namedLogo}
            alt="Logo"
            style={{ width: "auto", height: "30px", marginBottom: "16px" }}
          />
          <Typography variant="h6" gutterBottom>
            Reset Your Password
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* Email Address Row */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid sx={{ xs: 12 }}>
                {!emailValid && (
                  <>
                  <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  inputRef={email}
                />
                <Button onClick={passwordCheckSequence}>Submit</Button>
                  </>
                  
                )}
                {emailValid && (
                  <>
                  <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  size="small"
                  inputRef={email}
                />
                <Button onClick={passwordCheckSequence}>Confirm OTP</Button>
                  </>
                  
                )}
                

                {errorMessage && (
                                <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                                  {errorMessage}
                                </Typography>)}


              </Grid>
              
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default PasswordReset;

//Stopped at OTP Checking, didn't validate otp
