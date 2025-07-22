import { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";
import namedLogo from "../assets/logo-name.png";
import { userRegister } from "../services/authService";

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Refs for inputs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const dobRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // For Birthday prevent future days

  const handleGenderChange = (e) => setGender(e.target.value);

  const handleRegister = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";
    const firstname = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const dob = dobRef.current?.value || "";
    const contact = contactRef.current?.value || "";

    const result = await userRegister(
      email,
      password,
      confirmPassword,
      firstname,
      lastName,
      dob,
      contact,
      gender,
      isChecked
    );

    if (result.success) {
      // Show success message and redirect after short delay
      setErrorMessage("Registration successful! Check your email.");

      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirects to login page after 2 seconds
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          paddingTop: "64px",
          paddingBottom: 4,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: 400, md: 500 },
            height: { xs: "auto", md: "auto" },
            borderRadius: 4,
            m: 2,
            mt: 4,
            boxShadow: theme.shadows[6],
          }}
        >
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
              overflowY: "auto",
            }}
          >
            <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
              <img src={namedLogo} alt="Logo" style={{ height: 32 }} />
            </Box>

            <Typography variant="h4" fontWeight={700} mb={1} textAlign="center">
              Create Account
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              textAlign="center"
            >
              Join us and start your journey
            </Typography>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              {/* Responsive input pairs */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <TextField
                  label="First Name"
                  inputRef={firstNameRef}
                  variant="outlined"
                  size="medium"
                  required
                  fullWidth={isMobile}
                />
                <TextField
                  label="Last Name"
                  inputRef={lastNameRef}
                  variant="outlined"
                  size="medium"
                  required
                  fullWidth={isMobile}
                />
              </Box>

              <TextField
                label="Email"
                type="email"
                inputRef={emailRef}
                fullWidth
                size="medium"
                variant="outlined"
                required
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <TextField
                  label="Contact Number"
                  type="tel"
                  inputRef={contactRef}
                  variant="outlined"
                  size="medium"
                  fullWidth={isMobile}
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  inputRef={dobRef}
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ shrink: true }}
                  fullWidth={isMobile}
                  inputProps={{
                    max: today,
                  }}
                />
              </Box>

              <FormControl sx={{ mb: 1 }}>
                <FormLabel id="gender-label" sx={{ mb: 1 }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  row={!isMobile}
                  column={isMobile ? true : false}
                  aria-labelledby="gender-label"
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <TextField
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  variant="outlined"
                  size="medium"
                  required
                  fullWidth={isMobile}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  inputRef={confirmPasswordRef}
                  variant="outlined"
                  size="medium"
                  required
                  fullWidth={isMobile}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                }
                label="I agree to the terms and conditions"
              />

              {errorMessage && (
                <Typography
                  variant="body2"
                  color={
                    errorMessage.toLowerCase().includes("success")
                      ? "success.main"
                      : "error"
                  }
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
                fullWidth
              >
                Register
              </Button>

              <Typography variant="body2" mt={1} textAlign="center">
                Already have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/login")}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500, cursor: "pointer" }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Register;
