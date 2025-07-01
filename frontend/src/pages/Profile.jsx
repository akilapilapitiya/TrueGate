import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUpdateValidateData } from "../utils/Validate";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/Firebase";
import Loading from "../components/Loading";
import { addUser } from "../utils/UserSlice";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import { deleteUser } from "firebase/auth";
import SuccessModal from "../components/modals/SuccessModal";
import { colorPallete } from "../ColorTheme";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";

// MUI
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { buttonSizes, fontSizes } from "../Responsive";

const Profile = () => {
  const store = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    contact: "",
  });

  useEffect(() => {
    if (!store) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setFormData({
        firstName: store.firstName || "",
        surName: store.surName || "",
        contact: store.contact || "",
      });
    }
  }, [store, navigate]);

  if (!store) return <Loading />;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const { firstName, surName, contact } = formData;

    const message = profileUpdateValidateData(firstName, surName, contact);
    setErrorMessage(message);
    if (message) return;

    try {
      const userDocRef = doc(db, "users", store.uid);
      await updateDoc(userDocRef, { firstName, surName, contact });

      dispatch(
        addUser({
          ...store,
          firstName,
          surName,
          contact,
        })
      );
      setEditMode(false);
    } catch (error) {
      setErrorMessage("Failed to update profile: " + error.message);
    }
  };

  const handleProfileDelete = () => {
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("No authenticated user found.");
      return;
    }

    deleteUser(user)
      .then(() => {
        dispatch(addUser(null));
        setShowSuccessModal(true);
      })
      .catch((error) => {
        setErrorMessage("Failed to delete user: " + error.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: colorPallete.pageBackgroundColorProfile,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ mt: 6, display: "flex", flexDirection: "column" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: colorPallete.containerBackgroundColorProfile,
            maxWidth: "600px",
          }}
        >
          {editMode ? (
            <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: colorPallete.profilePageNormalText,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: fontSizes.mainHeading,
                }}
              >
                EDIT PROFILE
              </Typography>
              <Divider
                sx={{ mb: 3, borderColor: colorPallete.loginPageNormalText }}
              />

              <Box
                component="form"
                onSubmit={handleSaveChanges}
                sx={{ mt: 2 }}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      id="firstName"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                          transition: "background 5000s ease-in-out 0s",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Surname"
                      id="surName"
                      fullWidth
                      value={formData.surName}
                      onChange={handleInputChange}
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
                          transition: "background 5000s ease-in-out 0s",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Contact Number"
                      id="contact"
                      fullWidth
                      value={formData.contact}
                      onChange={handleInputChange}
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
                          transition: "background 5000s ease-in-out 0s",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {errorMessage && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Typography>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: colorPallete.registerButtonColor,
                      color: colorPallete.registerButtonAccentColor,
                      borderColor: colorPallete.registerButtonAccentColor,
                      minWidth: buttonSizes.subButton.minWidth,
                      fontSize: buttonSizes.subButton.fontSize,
                      padding: buttonSizes.subButton.padding,
                      "&:hover": {
                        background: colorPallete.registerButtonHoverColor,
                        color: colorPallete.registerButtonHoverAccentColor,
                        borderColor:
                          colorPallete.registerButtonHoverAccentColor,
                      },
                    }}
                  >
                    Save Information
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                    sx={{
                      background: colorPallete.loginButtonColor,
                      color: colorPallete.loginButtonAccentColor,
                      borderColor: colorPallete.loginButtonAccentColor,
                      minWidth: buttonSizes.subButton.minWidth,
                      fontSize: buttonSizes.subButton.fontSize,
                      padding: buttonSizes.subButton.padding,
                      "&:hover": {
                        background: colorPallete.loginButtonHoverColor,
                        color: colorPallete.loginButtonHoverAccentColor,
                        borderColor: colorPallete.loginButtonHoverAccentColor,
                      },
                    }}
                  >
                    Return to View Mode
                  </Button>
                </Stack>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  background: "darkblue",
                  height: "15vh",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: colorPallete.profilePageNormalText,
                    fontWeight: "bold",
                    fontSize: fontSizes.mainHeading,
                  }}
                >
                  truegate.live
                </Typography>
              </Box>
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                {store.gender === "male" ? (
                  <FaceIcon
                    sx={{
                      fontSize: "17vh",
                      color: colorPallete.profilePageNormalText,
                    }}
                  />
                ) : (
                  <Face3Icon
                    sx={{
                      fontSize: "17vh",
                      color: colorPallete.profilePageNormalText,
                    }}
                  />
                )}
                <Container
                  sx={{
                    pt: 2,
                    pl: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontWeight: "bold",
                      fontSize: fontSizes.mainHeading,
                    }}
                  >
                    {store.firstName + " " + store.surName}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 3,
                      color: colorPallete.profilePageNormalText,
                      background: colorPallete.profileModeIconColor,
                      width: "fit-content",
                      pl: 1,
                      pr: 1,
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    {store.mode === "admin" ? "Administrator" : "User"}
                  </Typography>
                </Container>
              </Container>
              <Grid container spacing={5} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    <strong>Email:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.sentence,
                    }}
                  >
                    <i>{store.email}</i>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    <strong>Contact:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.sentence,
                    }}
                  >
                    {store.contact}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    <strong>Enrolled On:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.sentence,
                    }}
                  >
                    20-10-2020
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    <strong>Last Login:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colorPallete.profilePageNormalText,
                      fontSize: fontSizes.sentence,
                    }}
                  >
                    21-6-2025
                  </Typography>
                </Grid>
              </Grid>

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setEditMode(true)}
                  sx={{
                    width: "10vw",
                    background: colorPallete.updateButtonColor,
                    color: colorPallete.updateButtonAccentColor,
                    borderColor: colorPallete.updateButtonAccentColor,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.updateButtonHoverColor,
                      color: colorPallete.updateButtonHoverAccentColor,
                      borderColor: colorPallete.updateButtonHoverAccentColor,
                    },
                  }}
                >
                  Update Info
                </Button>
                <Button
                  sx={{
                    width: "10vw",
                    background: colorPallete.changePasswordButtonColor,
                    color: colorPallete.changePasswordButtonAccentColor,
                    borderColor: colorPallete.changePasswordButtonAccentColor,
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                    "&:hover": {
                      background: colorPallete.changePasswordButtonHoverColor,
                      color: colorPallete.changePasswordButtonHoverAccentColor,
                      borderColor:
                        colorPallete.changePasswordButtonHoverAccentColor,
                    },
                  }}
                  onClick={() => navigate("/resetpassword")}
                >
                  Change Password
                </Button>
                <Button
                  sx={{
                    width: "10vw",
                    minWidth: buttonSizes.subButton.minWidth,
                    fontSize: buttonSizes.subButton.fontSize,
                    padding: buttonSizes.subButton.padding,
                  }}
                  variant="contained"
                  color="error"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </Stack>
            </>
          )}
        </Paper>

        {showDeleteModal && (
          <DeleteConfirmModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleProfileDelete}
          />
        )}

        {showSuccessModal && (
          <SuccessModal
            message="Your account has been deleted successfully!"
            onClose={() => {
              setShowSuccessModal(false);
              navigate("/login");
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default Profile;
