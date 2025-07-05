import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import namedLogo from "../assets/logo-name.png";
import { useRef, useState } from "react";
import { emailValidation, newPasswordValidateData } from "../utils/Validate";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const referEmail = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password

  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Email validation
  const handleEmailSubmit = () => {
    const msg = emailValidation(referEmail.current.value);
    if (msg) return setErrorMessage(msg);

    setErrorMessage("");
    setStep(2);
  };

  // Step 2: OTP validation
  const handleOtpSubmit = () => {
    if (otpValue.length !== 5) {
      return setErrorMessage("OTP must be 5 digits.");
    }

    setErrorMessage("");
    setStep(3);
  };

  // Step 3: Password validation
  const handlePasswordSubmit = () => {
    const msg = newPasswordValidateData(newPassword, confirmPassword);
    if (msg) return setErrorMessage(msg);

    // Password reset logic (call backend here if needed)
    setErrorMessage("");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(161, 178, 255)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "800px",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} md={6} sx={{ p: 3 }}>
          <img
            src={namedLogo}
            alt="Logo"
            style={{ height: "30px", marginBottom: "16px" }}
          />
          <Typography variant="h6" gutterBottom>
            Reset Your Password
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
            Enter your email and follow the steps
          </Typography>

          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                inputRef={referEmail}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={handleEmailSubmit}
                sx={{ mb: 2 }}
              >
                Submit Email
              </Button>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                size="small"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={handleOtpSubmit}
                sx={{ mb: 2 }}
              >
                Confirm OTP
              </Button>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                fullWidth
                size="small"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={handlePasswordSubmit}
                sx={{ mb: 2 }}
              >
                Reset Password
              </Button>
            </>
          )}

          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PasswordReset;
