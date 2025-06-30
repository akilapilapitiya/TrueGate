import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { newPasswordValidateData } from "../utils/Validate";
import { updatePassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/modals/SuccessModal";
import { colorPallete } from "../ColorTheme";

// MUI
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { fontSizes } from "../Responsive";

const PasswordReset = () => {
  const store = useSelector((state) => state.user);
  const [changeEligible, setChangeEligible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const email = useRef(null);
  const contact = useRef(null);
  const newPassword = useRef(null);
  const reNewPassword = useRef(null);

  const validateEmailInput = () => {
    if (!store) return; // External users validation not yet implemented
    if (email.current.value !== store.email) return;
    setChangeEligible(true);
  };

  const handleUpdatePassword = () => {
    const message = newPasswordValidateData(
      newPassword.current.value,
      reNewPassword.current.value
    );
    setErrorMessage(message);
    if (message) return;

    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("You must be logged in to change your password.");
      return;
    }

    updatePassword(user, newPassword.current.value)
      .then(() => {
        setChangeEligible(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          setErrorMessage("You need to re-login before changing your password.");
        } else {
          setErrorMessage("Failed to update password: " + error.message);
        }
      });
  };

  return (
    <Box
      sx={{
        background: colorPallete.pageBackgroundColorPasswordReset,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: colorPallete.containerBackgroundColorPasswordReset,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: colorPallete.passwordResetPageNormalText,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: fontSizes.mainHeading
            }}
          >
            PASSWORD RESET
          </Typography>

          <Divider
            sx={{ mb: 3, borderColor: colorPallete.passwordResetPageNormalText }}
          />

          {!changeEligible && (
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Email Address"
                fullWidth
                inputRef={email}
                sx={{
                  background: colorPallete.textFieldBackgroundColor,
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
                    transition: "background 5000s ease-in-out 0s",
                  },
                }}
              />
              {!store && (
                <TextField
                  label="Contact Number"
                  fullWidth
                  inputRef={contact}
                  sx={{
                    marginTop: 2,
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
                  }}
                />
              )}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  background: colorPallete.registerButtonColor,
                  color: colorPallete.registerButtonAccentColor,
                  borderColor: colorPallete.registerButtonAccentColor,
                  "&:hover": {
                    background: colorPallete.registerButtonHoverColor,
                    color: colorPallete.registerButtonHoverAccentColor,
                    borderColor: colorPallete.registerButtonHoverAccentColor,
                  },
                }}
                onClick={validateEmailInput}
              >
                {store ? "Confirm Email" : "Confirm Identity"}
              </Button>
            </Box>
          )}

          {changeEligible && (
            <Box sx={{ mt: 4 }}>
              <Typography sx={{color:colorPallete.passwordResetPageNormalText}}>Please enter your new password</Typography>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                inputRef={newPassword}
                sx={{
                  marginTop: 2,
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
                }}
              />
              <TextField
                label="Re-enter New Password"
                type="password"
                fullWidth
                inputRef={reNewPassword}
                sx={{
                  marginTop: 2,
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
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    mt: 4,
                    background: colorPallete.registerButtonColor,
                    color: colorPallete.registerButtonAccentColor,
                    borderColor: colorPallete.registerButtonAccentColor,
                    "&:hover": {
                      background: colorPallete.registerButtonHoverColor,
                      color: colorPallete.registerButtonHoverAccentColor,
                      borderColor: colorPallete.registerButtonHoverAccentColor,
                    },
                  }}
                onClick={handleUpdatePassword}
              >
                Reset Password
              </Button>
            </Box>
          )}

          {errorMessage && (
            <Typography color="error" sx={{ mt: 3 }}>
              {errorMessage}
            </Typography>
          )}
        </Paper>

        {showSuccessModal && (
          <SuccessModal
            message="Your password has been updated successfully!"
            onClose={() => {
              setShowSuccessModal(false);
              navigate("/profile");
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default PasswordReset;
