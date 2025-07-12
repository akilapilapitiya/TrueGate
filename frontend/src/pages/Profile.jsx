import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
  Avatar,
  useTheme,
  Fade,
  Stack,
} from "@mui/material";
import {
  Verified as VerifiedIcon,
  Dangerous as DangerousIcon,
  Devices as DevicesIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LockReset as LockResetIcon,
  NewReleases as NewReleasesIcon,
} from "@mui/icons-material";
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileUpdateValidateData } from "../utils/Validate";
import { userProfileUpdate } from "../services/authService";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const profileIcon = user?.gender === "male" ? maleIcon : femaleIcon;

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [firstNameEdit, setFirstNameEdit] = useState(user?.firstName);
  const [lastNameEdit, setLastNameEdit] = useState(user?.lastName);
  const [contactEdit, setContactEdit] = useState(user?.phone);

  useEffect(() => {
    if (editMode) {
      setFirstNameEdit(user?.firstName);
      setLastNameEdit(user?.lastName);
      setContactEdit(user?.phone);
    }
  }, [editMode]);

  const updateUserInfo = () => {
    const first = firstNameEdit.trim() || "";
    const last = lastNameEdit.trim() || "";
    const phone = contactEdit.trim() || "";

    const message = userProfileUpdate(first, last, phone);
    if (message) {
      setErrorMessage(message);
      return;
    }
    setErrorMessage(null);
    setEditMode(false);
  };

  const deleteUser = () => {
    setDeleteMode(false);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, py: 6, px: 3 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ borderRadius: 3, p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={profileIcon}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {user?.displayName}
                </Typography>
                {user?.emailVerified ? (
                  <Chip
                    icon={<VerifiedIcon />}
                    label=" Email is Verified"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Chip
                    icon={<NewReleasesIcon />}
                    label="Email is Not Verified"
                    color="warning"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  Email: {user?.email}
                </Typography>
                <Typography variant="subtitle1">
                  First Name: {user?.firstName}
                </Typography>
                <Typography variant="subtitle1">
                  Last Name: {user?.lastName}
                </Typography>
                <Typography variant="subtitle1">Phone: 0771234567</Typography>
                <Typography variant="subtitle1">Role: {user?.role}</Typography>
                <Typography variant="subtitle1">
                  Account Created: 2023-06-01
                </Typography>
                <Typography variant="subtitle1">
                  Last Login: 2025-07-10 09:12 AM
                </Typography>
                <Typography variant="subtitle1">Dependants: 3 users</Typography>
              </Stack>
              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  startIcon={<LockResetIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/password-reset")}
                >
                  Change Password
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteMode(true)}
                >
                  Delete
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Device Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    <DevicesIcon sx={{ mr: 1 }} /> 20 Devices Registered
                  </Typography>
                  <Typography>
                    <VerifiedIcon sx={{ mr: 1 }} color="success" /> 17 Online
                  </Typography>
                  <Typography>
                    <DangerousIcon sx={{ mr: 1 }} color="warning" /> 3 Offline
                    or Faulty
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Linked Users
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    3 Users are linked to this primary account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Roles: Member, Guest, Admin
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Edit Modal */}
      <Modal open={editMode} onClose={() => setEditMode(false)}>
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
            <Stack spacing={2}>
              <TextField
                label="First Name"
                value={firstNameEdit}
                onChange={(e) => setFirstNameEdit(e.target.value)}
              />
              <TextField
                label="Last Name"
                value={lastNameEdit}
                onChange={(e) => setLastNameEdit(e.target.value)}
              />
              <TextField
                label="Phone"
                value={contactEdit}
                onChange={(e) => setContactEdit(e.target.value)}
              />
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button variant="contained" onClick={updateUserInfo}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteMode} onClose={() => setDeleteMode(false)}>
        <Fade in={deleteMode}>
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
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Delete Account
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button onClick={() => setDeleteMode(false)}>Cancel</Button>
              <Button variant="contained" color="error" onClick={deleteUser}>
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Profile;
