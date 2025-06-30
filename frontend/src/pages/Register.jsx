import { NavLink, useNavigate } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../utils/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { colorPallete } from "../ColorTheme";

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { fontSizes } from "../Responsive";

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
            sx={{ textAlign: "center", fontWeight: "bold", color:colorPallete.registerPageNormalText, fontSize: fontSizes.mainHeading}}
          >
            CREATE A NEW ACCOUNT
          </Typography>
          <Divider sx={{ mb: 3 , borderColor:colorPallete.registerPageNormalText}} />

          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputRef={firstName}
                  label="First Name"
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={surName}
                  label="Surname"
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputRef={email}
                  label="Email Address"
                  type="email"
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputRef={dob}
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputRef={password}
                  label="Password"
                  type="password"
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputRef={rePassword}
                  label="Re-enter Password"
                  type="password"
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputRef={contact}
                  label="Contact Number"
                  type="tel"
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12} sx={{color:"#ffff"}}>
                <FormControl fullWidth >
                  <FormLabel sx={{color:"#ffff"}}>Gender</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      control={<Radio inputRef={genderMale} defaultChecked sx={{color:"#ffff", '&.Mui-checked': {
            color: colorPallete.selectorActiveColor,
          }}}/>}
                      value="male"
                      label="Male"
                    />
                    <FormControlLabel
                      control={<Radio inputRef={genderFemale} sx={{color:"#ffff", '&.Mui-checked': {
            color: colorPallete.selectorActiveColor, 
          }}}/>}
                      value="female"
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{color:"#ffff"}}>
                <FormControl fullWidth>
                  <FormLabel sx={{color:"#ffff"}}>User Mode</FormLabel>
                  <RadioGroup row >
                    <FormControlLabel
                      control={<Radio inputRef={modeAdmin} sx={{color:"#ffff", '&.Mui-checked': {
            color: colorPallete.selectorActiveColor, 
          }}}/>}
                      value="admin"
                      label="Administrator"
                    />
                    <FormControlLabel
                      control={<Radio inputRef={modeClient} defaultChecked sx={{color:"#ffff", '&.Mui-checked': {
            color: colorPallete.selectorActiveColor, 
          }}}/>}
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

            <Box
              sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Button
                startIcon={<PersonAddIcon />}
                onClick={handleSignUpClick}
                variant="contained"
                sx={{
                  backgroundColor: colorPallete.buttonBackgroundColorLogin,
                  color: colorPallete.buttonTextColorLogin,
                  borderColor: colorPallete.buttonBorderColorLogin,
                  "&:hover": {
                    backgroundColor:
                      colorPallete.buttonHoverBackgroundColorLogin,
                    color: colorPallete.buttonHoverTextColorLogin,
                    borderColor: colorPallete.buttonHoverBorderColorLogin,
                  },
                  "&:active": {
                    backgroundColor:
                      colorPallete.buttonActiveBackgroundColorLogin,
                    color: colorPallete.buttonActiveTextColorLogin,
                    borderColor: colorPallete.buttonActiveBorderColorLogin,
                  },
                }}
              >
                Sign Up
              </Button>
              <Button
                component={NavLink}
                to="/login"
                variant="text"
                sx={{
                  backgroundColor: colorPallete.buttonBackgroundColorRegister,
                  color: colorPallete.buttonTextColorRegister,
                  borderColor: colorPallete.buttonBorderColorRegister,
                  "&:hover": {
                    backgroundColor:
                      colorPallete.buttonHoverBackgroundColorRegister,
                    color: colorPallete.buttonHoverTextColorRegister,
                    borderColor: colorPallete.buttonHoverBorderColorRegister,
                  },
                  "&:active": {
                    backgroundColor:
                      colorPallete.buttonActiveBackgroundColorRegister,
                    color: colorPallete.buttonActiveTextColorRegister,
                    borderColor: colorPallete.buttonActiveBorderColorRegister,
                  },
                }}
              >
                Already have an account?
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
