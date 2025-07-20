import { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";
import { userLogin } from "../services/authService";
import { useDispatch } from "react-redux";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isRememeberChecked, setIsRememeberChecked] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignIn = async () => {
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";

    const message = userLogin(emailValue, passwordValue, isRememeberChecked, dispatch);
    if (message) {
      setErrorMessage(message);
      return;
    }
    navigate("/dashboard");
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
          background: theme.palette.mode === "dark"
           ? "linear-gradient(to right, #1e656eff, #0e2346ff)"
          : "linear-gradient(to right, #9ebce9ff, #bee6e8ff)",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 500,
            height: "auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: theme.shadows[12],
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #132c45ff, #212d30ff)"
              : "linear-gradient(135deg, #c2e0f1ff, #ebf6f6ff)",
          }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={namedLogo} alt="Logo" style={{ height: 36, marginBottom: 12 }} />
            <Typography
              variant="h4"
              fontWeight={800}
              mb={1}
              sx={{
                background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sign In
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
              textAlign="center"
            >
              Welcome back! Enter your login details to access your account.
            </Typography>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <TextField
                label="Email"
                inputRef={emailRef}
                type="email"
                fullWidth
                size="medium"
                variant="outlined"
                required
              />
              <TextField
                label="Password"
                type="password"
                inputRef={passwordRef}
                fullWidth
                size="medium"
                variant="outlined"
                required
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRememeberChecked}
                      onChange={(e) => setIsRememeberChecked(e.target.checked)}
                    />
                  }
                  label="Remember me"
                  sx={{ m: 0 }}
                />

                <Link
                  component="button"
                  onClick={() => navigate("/password-reset")}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Forgot password?
                </Link>
              </Box>

              {errorMessage && (
                <Typography variant="body2" color="error" textAlign="center">
                  {errorMessage}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                }}
              >
                Login
              </Button>

              <Typography variant="body2" mt={2} textAlign="center">
                Don’t have an account?{' '}
                <Link
                  component="button"
                  onClick={() => navigate("/register")}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  Create one
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Login;
