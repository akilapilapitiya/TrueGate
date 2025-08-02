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
} from "@mui/material";
import { forgotPassword } from "../services/authService";
import { emailValidation } from "../utils/Validate";
import namedLogo from "../assets/logo-name.png";

const PasswordReset = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const referEmail = useRef();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    const email = referEmail.current.value.trim();
    const msg = emailValidation(email);
    if (msg) return setErrorMessage(msg);

    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);

    if (res.success || res.message?.includes("reset email")) {
      setErrorMessage("");
      setStep(2);
    } else if (res.message === "CSRF token invalid") {
      setErrorMessage("Session expired. Please refresh the page and try again.");
    } else if (res.error === "User not found") {
      setErrorMessage("We couldn't find an account with that email.");
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
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

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Enter your email and follow the steps
            </Typography>

            {/* Step 1: Email Input */}
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
                  disabled={loading}
                  sx={{
                    py: 1.3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Sending..." : "Submit Email"}
                </Button>
              </>
            )}

            {/* Step 2: Email Sent Message */}
            {step === 2 && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 2 }}
              >
                If an account with this email exists, a password reset link has
                been sent. <br />
                Please check your inbox.
              </Typography>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                sx={{ mt: 1 }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default PasswordReset;
