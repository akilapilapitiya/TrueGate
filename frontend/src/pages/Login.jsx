import { NavLink, useNavigate } from "react-router-dom";
import { checkLogInValidateData } from "../utils/Validate";
import { useRef, useState } from "react";
import { colorPallete } from "../ColorTheme";
import CustomButton from "../components/CustomButton";

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

const neonTextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
      boxShadow: "0 0 0px transparent",
      transition: "all 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#ff007f",
      boxShadow: "0 0 5px 1px rgba(255, 0, 127, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00ccff",
      boxShadow: "0 0 8px 2px rgba(0, 204, 255, 0.8)",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00ccff",
  },
  "& input:-webkit-autofill": {
    boxShadow: "0 0 0 1000px #121212 inset",
    WebkitTextFillColor: "white",
    transition: "background-color 5000s ease-in-out 0s",
  },
};


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
              sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
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
  sx={neonTextFieldStyle}
  inputRef={email}
  label="Email Address"
  type="email"
  fullWidth
  variant="outlined"
  margin="normal"
/>
              

<TextField
  sx={neonTextFieldStyle}
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
                <CustomButton
  icon={<LoginIcon />}
  type="submit"
  variant="primary"
>
  Log in
</CustomButton>

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
              <CustomButton
  icon={<AppRegistrationIcon />}
  type="button"
  variant="outline"
  onClick={() => navigate("/register")}
>
  Create a new account
</CustomButton>

              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Login;
