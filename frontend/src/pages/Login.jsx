import { NavLink, useNavigate } from "react-router-dom";
import { checkLogInValidateData } from "../utils/Validate";
import { useRef, useState } from "react";
import { colorPallete } from "../ColorTheme";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

// MUI
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Link,
  Paper,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { fontSizes } from "../Responsive";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);

  const handleLogInClick = async () => {
    setErrorMessage(null);
    setLoading(true);

    const message = checkLogInValidateData(
      email.current.value,
      password.current.value
    );
    if (message) {
      setErrorMessage(message);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      dispatch(
        addUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );

      setLoading(false);
      navigate("/landing");
    } catch (error) {
      setErrorMessage(`${error.code} - ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: colorPallete.pageBackgroundColorLogin,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        {loading ? (
          <Loading />
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mt: 6,
              backgroundColor: colorPallete.containerBackgroundColorLogin,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold", color: "white" , fontSize: fontSizes.mainHeading }}
            >
              WELCOME BACK !
            </Typography>
          <Divider sx={{ mb: 3 , borderColor:colorPallete.loginPageNormalText}} />

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogInClick();
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", 
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input:-webkit-autofill": {
                    boxShadow: "0 0 0 1000px #121212 inset", 
                    WebkitTextFillColor: "white", 
                    transition: "background 5000s ease-in-out 0s"} 
                }}
                inputRef={email}
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                  "& input:-webkit-autofill": {
                    boxShadow: "0 0 0 1000px #121212 inset", 
                    WebkitTextFillColor: "white", 
                    transition: "background 5000s ease-in-out 0s"} 
                }}
                inputRef={password}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
              />

              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                  {errorMessage}
                </Typography>
              )}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Button
                  endIcon={<LoginIcon />}
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    background: colorPallete.registerButtonColor,
                    color: colorPallete.registerButtonAccentColor,
                    borderColor: colorPallete.registerButtonAccentColor,
                    "&:hover": {
                      background: colorPallete.registerButtonHoverColor,
                      color: colorPallete.registerButtonHoverAccentColor,
                      borderColor: colorPallete.registerButtonHoverAccentColor,
                    },
                  }}
                >
                  Log in
                </Button>
                <Link
                  component={NavLink}
                  to="/resetpassword"
                  weigh="hover"
                  sx={{
                    color: colorPallete.linkColorForgotPassword,
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Forgot password?
                </Link>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Box textAlign="center">
                <Button
                  endIcon={<AppRegistrationIcon />}
                  type="button"
                  onClick={() => navigate("/register")}
                  variant="outlined"
                  sx={{
                    background: colorPallete.loginButtonColor,
                    color: colorPallete.loginButtonAccentColor,
                    borderColor: colorPallete.loginButtonAccentColor,
                    "&:hover": {
                      background: colorPallete.loginButtonHoverColor,
                      color: colorPallete.loginButtonHoverAccentColor,
                      borderColor: colorPallete.loginButtonHoverAccentColor,
                    },
                  }}
                >
                  Create a new account
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Login;
