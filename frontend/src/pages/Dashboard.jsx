import { lazy, Suspense } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Card,
  CardContent,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

// Import icons
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EqualizerIcon from "@mui/icons-material/Equalizer";

const SecurityShop = lazy(() => import("./SecurityShop"));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const cardIcons = {
    "Review CCTV Footage": <SecurityIcon sx={{ fontSize: 40 }} />,
    "Review Access History": <HistoryIcon sx={{ fontSize: 40 }} />,
    "Manage Security Devices": <DevicesIcon sx={{ fontSize: 40 }} />,
    "Manage Registered Users": <GroupIcon sx={{ fontSize: 40 }} />,
    "Update Profile Details": <PersonIcon sx={{ fontSize: 40 }} />,
    "API Performance": <EqualizerIcon sx={{ fontSize: 40 }} />,
    "About TrueGate": <InfoIcon sx={{ fontSize: 40 }} />,
  };

  const cardColors = {
    "Review CCTV Footage": {
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    "Review Access History": {
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    "Manage Security Devices": {
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    "Manage Registered Users": {
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
    "Update Profile Details": {
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
    },
    "About TrueGate": {
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
    "API Performance": {
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
    },
  };

  let cards = [];

  if (user?.role === "admin") {
    cards = [
      { label: "Manage Registered Users", path: "/users" },
      { label: "API Performance", path: "/api-performance" },
      { label: "About TrueGate", path: "/about" },
    ];
  } else {
    cards = [
      { label: "Review CCTV Footage", path: "/footage" },
      { label: "Review Access History", path: "/history" },
      { label: "Update Profile Details", path: "/profile" },
      { label: "About TrueGate", path: "/about" },
      { label: "Manage Security Devices", path: "/devices" },
    ];
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "30%",
            height: "30%",
            background: `radial-gradient(circle, ${alpha(
              theme.palette.primary.main,
              0.08
            )} 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "float 20s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: "40%",
            height: "40%",
            background: `radial-gradient(circle, ${alpha(
              theme.palette.secondary.main,
              0.06
            )} 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "float 25s ease-in-out infinite reverse",
          },
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "33%": { transform: "translate(30px, -30px) scale(1.1)" },
            "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          },
        }}
      />

      {/* Header Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Box
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <DashboardIcon
                sx={{ fontSize: 40, color: theme.palette.primary.main }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Dashboard
              </Typography>
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 300,
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Your security command center
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Dashboard Cards Section */}
      <Container
        maxWidth="1400px"
        sx={{
          px: { xs: 2, md: 4 },
          pb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 4 }}
          sx={{ justifyContent: "center" }}
        >
          {cards.map(({ label, path }) => {
            // Safe fallback for missing cardColors
            const cardColor = cardColors[label] || {
              color: theme.palette.text.primary,
              bgColor: alpha(theme.palette.text.primary, 0.1),
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3.5}
                xl={3}
                key={label}
                sx={{
                  maxWidth: { lg: "320px", xl: "300px" },
                  display: "flex",
                }}
              >
                <Card
                  elevation={0}
                  onClick={() => navigate(path)}
                  sx={{
                    height: { xs: 200, md: 240 },
                    width: "100%",
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: theme.palette.background.paper,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${alpha(cardColor.color, 0.15)}`,
                      borderColor: alpha(cardColor.color, 0.3),
                      "& .card-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                        background: `linear-gradient(135deg, ${cardColor.color}, ${alpha(
                          cardColor.color,
                          0.8
                        )})`,
                        color: "white",
                        boxShadow: `0 8px 20px ${alpha(cardColor.color, 0.3)}`,
                      },
                      "&::before": {
                        opacity: 1,
                      },
                    },
                    "&:active": {
                      transform: "translateY(-4px)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${alpha(
                        cardColor.color,
                        0.02
                      )}, ${alpha(cardColor.color, 0.05)})`,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 0,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      className="card-icon"
                      sx={{
                        width: { xs: 70, md: 80 },
                        height: { xs: 70, md: 80 },
                        borderRadius: 3,
                        bgcolor: cardColor.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: { xs: 2, md: 3 },
                        color: cardColor.color,
                        transition:
                          "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        boxShadow: `0 4px 12px ${alpha(cardColor.color, 0.1)}`,
                      }}
                    >
                      {cardIcons[label]}
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        mb: { xs: 1, md: 1.5 },
                        color: theme.palette.text.primary,
                        fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                        lineHeight: 1.3,
                      }}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.4,
                        fontSize: { xs: "0.8rem", md: "0.85rem" },
                        textAlign: "center",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {label === "Review CCTV Footage" &&
                        "Monitor cameras and review recorded footage"}
                      {label === "Review Access History" &&
                        "Check access logs and entry records"}
                      {label === "Manage Security Devices" &&
                        "Configure and control security devices"}
                      {label === "Manage Registered Users" &&
                        "Manage user permissions and access"}
                      {label === "Update Profile Details" &&
                        "Edit personal information and settings"}
                      {label === "About TrueGate" &&
                        "Learn about TrueGate security platform"}
                      {label === "API Performance" &&
                        "Monitor and analyze API performance metrics"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Security Shop Section */}
      {user?.role === "user" && (
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            py: { xs: 4, md: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                Security Shop
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 500, mx: "auto" }}
              >
                Discover and manage security products for your organization
              </Typography>
            </Box>
            <Suspense fallback={<LoadingSpinner />}>
              <SecurityShop />
            </Suspense>
          </Container>
        </Box>
      )}

      {/* Footer Stats */}
      <Box
        sx={{
          py: 3,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            Last login: {new Date().toLocaleDateString()} •{" "}
            Status:{" "}
            <Box
              component="span"
              sx={{ color: theme.palette.success.main, fontWeight: 500 }}
            >
              Active
            </Box>{" "}
            • TrueGate Security Dashboard
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
