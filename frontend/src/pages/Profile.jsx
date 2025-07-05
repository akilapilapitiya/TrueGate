import {
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileUpdateValidateData } from "../utils/Validate";

const Profile = () => {
  const navigate = useNavigate();

  //Temp Data#########################################################
  const gender = "male";
  const firstName = "Mahinda";
  const lastName = "Wickramasinghe";
  const email = "mahainda@gmail.com";
  const tel = "0123456789";

  const usersArray = [
    { id: "0001", name: "Namal", email: "namal@mail.com" },
    { id: "0001", name: "Kamala", email: "kamal@gmail.com" },
  ];
  // ##################################################################
  const profileIcon = gender === "male" ? maleIcon : femaleIcon;
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [firstNameEdit, setFirstNameEdit] = useState(firstName);
  const [lastNameEdit, setLastNameEdit] = useState(lastName);
  const [contactEdit, setContactEdit] = useState(tel);
  // Reset Above variables at start
  useEffect(() => {
    if (editMode) {
      setFirstNameEdit(firstName);
      setLastNameEdit(lastName);
      setContactEdit(tel);
    }
  }, [editMode]);

  const updateUserInfo = () => {
    // Trim convert the data
    const first = firstNameEdit.trim() || "";
    const last = lastNameEdit.trim() || "";
    const phone = contactEdit.trim() || "";

    //Validate info

    const message = profileUpdateValidateData(first, last, phone);

    if (message) {
      setErrorMessage(message); // Update Error State
      return;
    }

    //Otherwise update data
    setErrorMessage(null); // Clear any previous error messages
    setEditMode(false); // Close the modal
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Profile
              </Typography>

              <Box
                component="img"
                src={profileIcon}
                alt="Profile icon"
                sx={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1976d2",
                }}
              />

              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography>Email: {email}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>First Name: {firstName}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Last Name: {lastName}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Phone Number: {tel}</Typography>
              </Box>
              <Container sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/password-reset");
                  }}
                >
                  Change Password
                </Button>
                <Button variant="contained">Delete Account</Button>
              </Container>
            </Paper>
          </Grid>

          {/* Dependents Section */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                minHeight: "100%",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Dependants
              </Typography>

              {usersArray.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f0f4ff",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Name: {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                  {index < usersArray.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
              <Container sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  Manage Dependants
                </Button>
              </Container>
            </Paper>
          </Grid>
        </Grid>

        {/*Popup for Profile Editing */}
        <Modal
          open={editMode}
          onClose={() => setEditMode(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              },
            },
          }}
        >
          <Fade in={editMode}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 400 },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Edit Profile
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  defaultValue={firstName}
                  onChange={(e) => setFirstNameEdit(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  defaultValue={lastName}
                  onChange={(e) => setLastNameEdit(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue={tel}
                  onChange={(e) => setContactEdit(e.target.value)}
                />

                {errorMessage && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    {errorMessage}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <Button variant="outlined" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={updateUserInfo}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default Profile;
