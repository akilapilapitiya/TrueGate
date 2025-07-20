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
import { useDispatch, useSelector } from "react-redux";
import { profileUpdateValidateData } from "../utils/Validate";
import { userDeleteAccount, userProfileUpdate } from "../services/authService";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

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
      setContactEdit(user?.contactNumber);
    }
  }, [editMode]);

  const updateUserInfo = async () => {
    const first = firstNameEdit.trim() || "";
    const last = lastNameEdit.trim() || "";
    const phone = contactEdit.trim() || "";

    const res = await userProfileUpdate(first, last, phone, dispatch);
if (!res.success) {
  setErrorMessage(res.message);
  return;
}
    setErrorMessage(null);
    setEditMode(false);
  };

  const deleteUser = () => {
    const message = userDeleteAccount();

    if (message) {
      setDeleteMode(false);
      navigate("/error-page");
      return;
    }
    setDeleteMode(false);
    navigate("/");
  };

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, #0f172a, #1a847c)`
            : `linear-gradient(135deg, #d3e7ecff 0%, #2d6659ff 100%)`,
        py: 6,
        px: 3,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 4,
            backdropFilter: "blur(15px)",
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.3)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 20px rgba(14, 241, 214, 0.52)"
                : "0 8px 32px rgba(21, 121, 203, 0.2)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={profileIcon}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {user?.firstName + " " + user?.lastName}
                </Typography>
                {user?.emailVerified ? (
                  <Chip
                    icon={<VerifiedIcon sx={{ color: "#2ecc71" }} />}
                    label=" Email is Verified"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Chip
                    icon={<NewReleasesIcon sx={{ color: "#f39c12" }} />}
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
                <Typography variant="subtitle1">
                  Phone: {user?.contactNumber}
                </Typography>
                <Typography variant="subtitle1">Role: {user?.role}</Typography>
                <Typography variant="subtitle1">
                  Last Login:{" "}
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "N/A"}
                </Typography>

                <Typography variant="subtitle1">Dependants: 3 users</Typography>
              </Stack>
              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #3498db, #1abc9c)",
                    color: "#fff",
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  startIcon={<LockResetIcon />}
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #8e44ad, #3498db)",
                    color: "#fff",
                  }}
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
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(46,204,113,0.05))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(173, 216, 230, 0.5))",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(46,204,113,0.15)"
                      : "1px solid rgba(22,113,146,0.2)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 10px rgba(30, 94, 91, 0.46)"
                      : "0 4px 15px rgba(21,121,203,0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Device Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    <DevicesIcon sx={{ mr: 1, color: "#3498db" }} /> 20 Devices
                    Registered
                  </Typography>
                  <Typography>
                    <VerifiedIcon sx={{ mr: 1, color: "#2ecc71" }} /> 17 Online
                  </Typography>
                  <Typography>
                    <DangerousIcon sx={{ mr: 1, color: "#e67e22" }} /> 3 Offline
                    or Faulty
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(46,204,113,0.05))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(173, 216, 230, 0.5))",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(46,204,113,0.15)"
                      : "1px solid rgba(22,113,146,0.2)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 10px rgba(46,204,113,0.2)"
                      : "0 4px 15px rgba(21,121,203,0.2)",
                  transition: "all 0.3s ease",
                }}
              >
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
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(18,18,18,0.8)"
                  : "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(12px)",
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
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(18,18,18,0.8)"
                  : "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(12px)",
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
