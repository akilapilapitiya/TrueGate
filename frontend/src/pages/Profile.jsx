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
  CircularProgress,
  Card,
  CardContent,
  alpha,
} from "@mui/material";
import {
  Verified as VerifiedIcon,
  Dangerous as DangerousIcon,
  Devices as DevicesIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LockReset as LockResetIcon,
  NewReleases as NewReleasesIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  AccountCircle as AccountCircleIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  ArrowForward,
  Star,
  Shield,
  CheckCircle,
} from "@mui/icons-material";
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import logoBlue from "../assets/logo-name.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDeleteAccount, userProfileUpdate } from "../services/authService";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const profileIcon = user?.gender === "male" ? maleIcon : femaleIcon;

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState(null);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

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

  const sendEmailVerification = async () => {
    setIsVerificationLoading(true);
    setVerificationMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = { success: true };

      if (!res.success) {
        setVerificationMessage(
          "Failed to send verification email. Please try again."
        );
        setIsVerificationLoading(false);
        return;
      }

      setVerificationMessage(
        "Verification email sent successfully! Please check your inbox."
      );
      setVerificationSent(true);
      setIsVerificationLoading(false);
    } catch (error) {
      setVerificationMessage(
        "An error occurred while sending the verification email."
      );
      setIsVerificationLoading(false);
    }
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

  const handleVerificationModalClose = () => {
    setVerificationMode(false);
    setVerificationMessage(null);
    setVerificationSent(false);
  };

  // Profile info cards data
  const profileInfoCards = [
    {
      icon: <PersonIcon sx={{ fontSize: 24 }} />,
      label: "Full Name",
      value: `${user?.firstName} ${user?.lastName}`,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      label: "Email Address",
      value: user?.email,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      label: "Phone Number",
      value: user?.contactNumber || "Not provided",
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      icon: <AccountCircleIcon sx={{ fontSize: 24 }} />,
      label: "Account Role",
      value: user?.role,
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 24 }} />,
      label: "Last Login",
      value: user?.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : "N/A",
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
    {
      icon: <GroupIcon sx={{ fontSize: 24 }} />,
      label: "Dependants",
      value: "3 users",
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                
                {/* Profile Avatar */}
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    mb: 3,
                  }}
                >
                  <Avatar
    src={profileIcon}
    alt="Profile"
    sx={{
      width: 150,
      height: 150,
      position: 'relative',
      top: '20px',
      border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
      mb: 2, 
    }}
  />
                  {user?.verified && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 40,
                        height: 40,
                        bgcolor: theme.palette.success.main,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `3px solid ${theme.palette.background.paper}`,
                      }}
                    >
                      <VerifiedIcon sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  )}
                </Box>

                {/* User Name */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </Typography>

                {/* Verification Status */}
                {user?.verified ? (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Email Verified"
                    color="success"
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      fontWeight: 600,
                    }}
                  />
                ) : (
                  <Chip
                    icon={<NewReleasesIcon />}
                    label="Email Not Verified"
                    color="warning"
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setVerificationMode(true)}
                  />
                )}

                {/* Action Buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <Button
                    startIcon={<EditIcon />}
                    variant="contained"
                    onClick={() => setEditMode(true)}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      boxShadow: 3,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 6,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    startIcon={<LockResetIcon />}
                    variant="outlined"
                    onClick={() => navigate("/password-reset")}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Change Password
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              {/* Profile Information Cards */}
              <Grid container spacing={3}>
                {profileInfoCards.map((info, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                        background: info.bgColor,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 10px 30px ${alpha(info.color, 0.15)}`,
                          borderColor: alpha(info.color, 0.3),
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              bgcolor: alpha(info.color, 0.1),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: info.color,
                            }}
                          >
                            {info.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontWeight: 500 }}
                            >
                              {info.label}
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              sx={{
                                color: theme.palette.text.primary,
                                wordBreak: "break-word",
                              }}
                            >
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Dashboard Summary Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Account Overview
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Manage your security devices and monitor your account status
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Device Summary Card */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 20px 40px ${alpha(
                    theme.palette.primary.main,
                    0.15
                  )}`,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <DevicesIcon
                    sx={{ fontSize: 30, color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Device Summary
                </Typography>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Shield
                      sx={{ fontSize: 20, color: theme.palette.primary.main }}
                    />
                    <Typography variant="body1">
                      <strong>20</strong> Devices Registered
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle
                      sx={{ fontSize: 20, color: theme.palette.success.main }}
                    />
                    <Typography variant="body1">
                      <strong>17</strong> Online & Active
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DangerousIcon
                      sx={{ fontSize: 20, color: theme.palette.error.main }}
                    />
                    <Typography variant="body1">
                      <strong>3</strong> Offline or Faulty
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    "&:hover": {
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate("/devices")}
                >
                  Manage Devices
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Linked Users Card */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.secondary.main,
                  0.05
                )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 20px 40px ${alpha(
                    theme.palette.secondary.main,
                    0.15
                  )}`,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <GroupIcon
                    sx={{ fontSize: 30, color: theme.palette.secondary.main }}
                  />
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Linked Users
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.6 }}
                >
                  <strong>3</strong> users are linked to this primary account
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip
                    label="Admin"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label="Member"
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                  <Chip
                    label="Guest"
                    size="small"
                    color="default"
                    variant="outlined"
                  />
                </Stack>

                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    "&:hover": {
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate("/users")}
                >
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Danger Zone */}
        <Box sx={{ mt: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.error.main,
                0.05
              )} 0%, ${alpha(theme.palette.error.main, 0.02)} 100%)`,
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: theme.palette.error.main }}
              >
                Danger Zone
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                Once you delete your account, there is no going back. Please be
                certain.
              </Typography>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="error"
                onClick={() => setDeleteMode(true)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <Divider sx={{ mx: 4 }} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="text.secondary">
            &copy; {new Date().getFullYear()} TrueGate Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Edit Modal */}
      <Modal open={editMode} onClose={() => setEditMode(false)}>
        <Fade in={editMode}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              bgcolor: theme.palette.background.paper,
              backdropFilter: "blur(12px)",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Edit Profile Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="First Name"
                value={firstNameEdit}
                onChange={(e) => setFirstNameEdit(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <TextField
                label="Last Name"
                value={lastNameEdit}
                onChange={(e) => setLastNameEdit(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <TextField
                label="Phone Number"
                value={contactEdit}
                onChange={(e) => setContactEdit(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                mt={2}
              >
                <Button
                  onClick={() => setEditMode(false)}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={updateUserInfo}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Email Verification Modal */}
      <Modal open={verificationMode} onClose={handleVerificationModalClose}>
        <Fade in={verificationMode}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              bgcolor: theme.palette.background.paper,
              backdropFilter: "blur(12px)",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <EmailIcon
                sx={{ fontSize: 40, color: theme.palette.warning.main }}
              />
            </Box>

            <Typography variant="h5" fontWeight="bold" mb={2}>
              Email Verification Required
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={1}>
              Your email <strong>{user?.email}</strong> is not verified yet.
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Click the button below to send a verification email to your
              registered email address.
            </Typography>

            {verificationMessage && (
              <Typography
                color={verificationSent ? "success.main" : "error"}
                variant="body2"
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(
                    verificationSent
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    0.1
                  ),
                }}
              >
                {verificationMessage}
              </Typography>
            )}

            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                onClick={handleVerificationModalClose}
                disabled={isVerificationLoading}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={
                  isVerificationLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <EmailIcon />
                  )
                }
                onClick={sendEmailVerification}
                disabled={isVerificationLoading || verificationSent}
                sx={{ borderRadius: 2, px: 3 }}
              >
                {isVerificationLoading
                  ? "Sending..."
                  : verificationSent
                  ? "Email Sent"
                  : "Send Verification Email"}
              </Button>
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
              width: { xs: "90%", sm: 450 },
              bgcolor: theme.palette.background.paper,
              backdropFilter: "blur(12px)",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.error.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 40, color: theme.palette.error.main }}
              />
            </Box>

            <Typography variant="h5" fontWeight="bold" mb={2} color="error">
              Delete Account
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                onClick={() => setDeleteMode(false)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={deleteUser}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Delete Account
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Profile;
