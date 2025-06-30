
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Paper,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { auth, db } from "../utils/Firebase";
import { checkSignUpValidateData } from "../utils/Validate";
import { colorPallete } from "../ColorTheme";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const email = useRef(null);
  const firstName = useRef(null);
  const surName = useRef(null);
  const dob = useRef(null);
  const contact = useRef(null);
  const password = useRef(null);
  const rePassword = useRef(null);
  const genderMale = useRef(null);
  const genderFemale = useRef(null);
  const modeAdmin = useRef(null);
  const modeClient = useRef(null);

  const handleSignUpClick = () => {
    const gender = genderMale.current?.checked
      ? "male"
      : genderFemale.current?.checked
      ? "female"
      : null;

    const mode = modeAdmin.current?.checked
      ? "admin"
      : modeClient.current?.checked
      ? "client"
      : null;

    const dobDate = dob.current?.value ? new Date(dob.current.value) : null;

    const message = checkSignUpValidateData(
      email.current?.value || "",
      password.current?.value || "",
      rePassword.current?.value || "",
      firstName.current?.value || "",
      surName.current?.value || "",
      dob.current?.value || "",
      contact.current?.value || "",
      gender,
      mode
    );

    if (message) {
      setErrorMessage(message);
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: firstName.current.value,
          phoneNumber: contact.current.value,
        })
          .then(() => {
            setDoc(doc(db, "users", user.uid), {
              firstName: firstName.current.value,
              surName: surName.current.value,
              dob: dobDate ? dobDate.toISOString() : null,
              gender,
              mode,
              contact: contact.current.value,
              email: email.current.value,
            })
              .then(() => navigate("/landing"))
              .catch((error) =>
                setErrorMessage("Failed to save user data: " + error.message)
              );
          })
          .catch((error) =>
            setErrorMessage("Profile update failed: " + error.message)
          );
      })
      .catch((error) => setErrorMessage(error.code + " - " + error.message));
  };

  return (
    <Box
      sx={{
        background: colorPallete.pageBackgroundColorRegister,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            mt: 6,
            p: 4,
            backgroundColor: colorPallete.containerBackgroundColorRegister,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: colorPallete.registerPageNormalText,
            }}
          >
            CREATE A NEW ACCOUNT
          </Typography>
          <Divider sx={{ mb: 3, borderColor: colorPallete.registerPageNormalText }} />

          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              <Grid item xs={12}><CustomTextField inputRef={firstName} label="First Name" fullWidth /></Grid>
              <Grid item xs={12}><CustomTextField inputRef={surName} label="Surname" fullWidth /></Grid>
              <Grid item xs={12}><CustomTextField inputRef={email} label="Email Address" type="email" fullWidth /></Grid>
              <Grid item xs={12}><CustomTextField inputRef={dob} label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth /></Grid>
              <Grid item xs={6}><CustomTextField inputRef={password} label="Password" type="password" fullWidth /></Grid>
              <Grid item xs={6}><CustomTextField inputRef={rePassword} label="Re-enter Password" type="password" fullWidth /></Grid>
              <Grid item xs={12}><CustomTextField inputRef={contact} label="Contact Number" type="tel" fullWidth /></Grid>

              <Grid item xs={12} sx={{ color: "#fff" }}>
                <FormControl fullWidth>
                  <FormLabel sx={{ color: "#fff" }}>Gender</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      control={<Radio inputRef={genderMale} defaultChecked sx={{ color: "#fff", '&.Mui-checked': { color: colorPallete.selectorActiveColor } }} />}
                      value="male"
                      label="Male"
                    />
                    <FormControlLabel
                      control={<Radio inputRef={genderFemale} sx={{ color: "#fff", '&.Mui-checked': { color: colorPallete.selectorActiveColor } }} />}
                      value="female"
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ color: "#fff" }}>
                <FormControl fullWidth>
                  <FormLabel sx={{ color: "#fff" }}>User Mode</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      control={<Radio inputRef={modeAdmin} sx={{ color: "#fff", '&.Mui-checked': { color: colorPallete.selectorActiveColor } }} />}
                      value="admin"
                      label="Administrator"
                    />
                    <FormControlLabel
                      control={<Radio inputRef={modeClient} defaultChecked sx={{ color: "#fff", '&.Mui-checked': { color: colorPallete.selectorActiveColor } }} />}
                      value="client"
                      label="Client"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}

            <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomButton icon={<PersonAddIcon />} variant="primary" onClick={handleSignUpClick}>
                Sign Up
              </CustomButton>

              <CustomButton component={NavLink} to="/login" variant="outline">
                Already have an account?
              </CustomButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
