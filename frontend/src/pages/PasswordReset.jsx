import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { emailValidation, newPasswordValidateData } from "../utils/Validate";
import namedLogo from "../assets/logo-name.png";

const PasswordReset = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const referEmail = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = () => {
    const msg = emailValidation(referEmail.current.value);
    if (msg) return setErrorMessage(msg);

    setErrorMessage("");
    setStep(2);
  };

  const handleOtpSubmit = () => {
    if (otpValue.length !== 5) {
      return setErrorMessage("OTP must be 5 digits.");
    }

    setErrorMessage("");
    setStep(3);
  };

  const handlePasswordSubmit = () => {
    const msg = newPasswordValidateData(newPassword, confirmPassword);
    if (msg) return setErrorMessage(msg);

    setErrorMessage("");
    navigate("/login");
  };

  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: 400, md: 500 },
            borderRadius: 4,
            overflow: "hidden",
            m: 2,
            boxShadow: theme.shadows[6],
            p: 4,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ mb: 1 }}>
              <img src={namedLogo} alt="Logo" style={{ height: 32 }} />
            </Box>

            <Typography variant="h5" fontWeight={700} textAlign="center">
              Reset Your Password
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Enter your email and follow the steps
            </Typography>

            {/* Step 1: Email */}
            {step === 1 && (
              <>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  inputRef={referEmail}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleEmailSubmit}
                  sx={{ py: 1.3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
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
                  size="medium"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleOtpSubmit}
                  sx={{ py: 1.3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
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
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handlePasswordSubmit}
                  sx={{ py: 1.3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                >
                  Reset Password
                </Button>
              </>
            )}

            {errorMessage && (
              <Typography variant="body2" color="error" textAlign="center" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}

            <Typography variant="body2" mt={1} textAlign="center">
              Back to{" "}
              <Link
                component="button"
                onClick={() => navigate("/login")}
                underline="hover"
                color="primary"
                sx={{ fontWeight: 500, cursor: "pointer" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default PasswordReset;
