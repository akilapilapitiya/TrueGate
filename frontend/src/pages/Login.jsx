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

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isRememeberChecked, setIsRememeberChecked] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignIn = async () => {
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";

    // User Login handled
    const message = userLogin(emailValue, passwordValue, isRememeberChecked);
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
          backgroundColor: theme.palette.background.default,
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: 400, md: 500 },
            height: { xs: "auto", md: 500 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 4,
            overflow: "hidden",
            m: 2,
            boxShadow: theme.shadows[6],
          }}
        >
          {/* Left Panel - Login */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                mb: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={namedLogo} alt="Logo" style={{ height: 32 }} />
              <Typography variant="h4" fontWeight={700} mb={1}>
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Welcome back! Please enter your credentials.
              </Typography>
            </Box>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                  mt: 1,
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
                  sx={{ fontWeight: 500, cursor: "pointer" }}
                >
                  Forgot password?
                </Link>
              </Box>

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
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Login
              </Button>
              <Typography variant="body2" mt={1} textAlign="center">
                Don’t have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/register")}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500, cursor: "pointer" }}
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
