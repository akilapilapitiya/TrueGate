import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import namedLogo from "../assets/logo-name.png";
import loginBg from "../assets/login-bg.png";
import { checkLogInValidateData } from "../utils/Validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // User Refs for Input Fields
  const email = useRef();
  const password = useRef();

  const signInLogic = () => {
    // Validation Logic
    const message = checkLogInValidateData(
      email.current.value,
      password.current.value
    );
    if (message) {
      setErrorMessage(message); //Update Error State
      return;
    }
    // Login Logic #FIREBASE #####################################################
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + errorMessage);
      });

    // Store Update Logic
    // #########################################################################
    // Rememeber Me Logic
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
       {/* Glass Blur Overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 1,
        }}
      />

      {/* Login Card */}
      <Box
        sx={{
          zIndex: 2,
          width: "90%",
          maxWidth: "400px",
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(15px)",
        }}
      >
        <img
          src={namedLogo}
          alt="Logo"
          style={{ width: "120px", marginBottom: "24px" }}
        />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" mb={2}>
          Please sign in to continue
        </Typography>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          inputRef={email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          inputRef={password}
        />

        <FormGroup sx={{ width: "100%", mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
        </FormGroup>

        <NavLink
          to="/password-reset"
          style={{
            fontSize: "14px",
            marginBottom: "16px",
            alignSelf: "flex-start",
          }}
        >
          Forgot Password?
        </NavLink>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={signInLogic}
          sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Sign In
        </Button>

        <Typography variant="body2">
          Don’t have an account?{" "}
          <NavLink to="/register" style={{ color: "#1976d2" }}>
            Create Account
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;