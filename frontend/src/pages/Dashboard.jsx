import { lazy, Suspense } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

//  Import icons
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const SecurityShop = lazy(() => import("./SecurityShop"));

const Dashboard = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const boxStyle = {
    width: "100%",
    height: 200,
    position: "relative", 
    backdropFilter: "blur(10px)",
    borderRadius: 4,
    padding: 2,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
    background: theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(46, 204, 113, 0.05))"
      : "linear-gradient(135deg, rgba(183, 233, 221, 0.7), rgba(245, 245, 245, 0.85))",
    border: theme.palette.mode === "dark"
      ? "1px solid rgba(46, 204, 113, 0.2)"
      : "1px solid rgba(180, 220, 245, 0.6)",
    boxShadow: theme.palette.mode === "dark"
      ? "0 0 20px rgba(46, 204, 113, 0.05)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",

    "&:hover": {
      transform: "translateY(-4px)",
      border: "1px solid transparent",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: 6,
      background: theme.palette.mode === "dark"
        ? "linear-gradient(130deg, #0d6161ff, #0a6c7b9e, #032b46ff)"
        : "linear-gradient(130deg, #a8d4cbff, #b8d9f0ff, #c1e9d3ff)",
      zIndex: -1,
      filter: "blur(2px)",
      backgroundSize: "300% 300%",
      opacity: 0,
      transition: "opacity 0.5s ease-in-out",
      animation: "shineBorder 4s linear infinite",
    },

    "&:hover::before": {
      opacity: 1,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 6,
      background: !isDarkMode
        ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 80%)"
        : "none",
      animation: !isDarkMode ? "pulseAlt 8s ease-in-out infinite" : "none",
      zIndex: -2,
    },

    "@keyframes shineBorder": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },

    "@keyframes pulseAlt": {
      "0%, 100%": { transform: "scale(1)", opacity: 0.3 },
      "50%": { transform: "scale(1.1)", opacity: 0.6 },
    },

    "&:active": {
      transform: "translateY(-2px)",
    },
  };

  const cardIcons = {
    "Review CCTV Footage": <SecurityIcon fontSize="large" />,
    "Review Access History": <HistoryIcon fontSize="large" />,
    "Manage Security Devices": <DevicesIcon fontSize="large" />,
    "Manage Registered Users": <GroupIcon fontSize="large" />,
    "Update Profile Details": <PersonIcon fontSize="large" />,
    "About TrueGate": <InfoIcon fontSize="large" />,
  };

  const cards = [
    { label: "Review CCTV Footage", path: "/footage" },
    { label: "Review Access History", path: "/history" },
    { label: "Update Profile Details", path: "/profile" },
    { label: "About TrueGate", path: "/about" },
  ];

  if (user?.role === "admin") {
    cards.splice(
      2,
      0,
      { label: "Manage Security Devices", path: "/devices" },
      { label: "Manage Registered Users", path: "/users" }
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        background: theme.palette.mode === "dark"
          ? `
              radial-gradient(circle at 20% 30%, rgba(22, 113, 146, 0.15), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(46, 204, 113, 0.12), transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1a847cff 100%)
            `
          : `
              radial-gradient(circle at 60% 40%, rgba(46, 204, 113, 0.15), transparent 50%),
              radial-gradient(circle at 30% 80%, rgba(52, 152, 219, 0.12), transparent 50%),
              linear-gradient(135deg, #9ebce9ff 0%, #bee6e8ff 30%)
            `,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          background: isDarkMode
            ? "rgba(22,113,146,0.25)"
            : "rgba(46,204,113,0.2)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 12s ease-in-out infinite",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 20,
          right: 30,
          width: 180,
          height: 180,
          background: isDarkMode
            ? "rgba(52,152,219,0.2)"
            : "rgba(155,89,182,0.15)",
          borderRadius: "50%",
          filter: "blur(100px)",
          animation: "pulseAlt 16s ease-in-out infinite",
          zIndex: 0,
        },
        "@keyframes pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.4 },
          "50%": { transform: "scale(1.2)", opacity: 0.8 },
        },
        "@keyframes pulseAlt": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.3 },
          "50%": { transform: "scale(1.1)", opacity: 0.6 },
        },
        zIndex: 1,
      }}
    >
      {/* Dashboard Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "10vh",
        }}
      >
        {cards.map(({ label, path }) => (
          <Paper
            key={label}
            elevation={6}
            onClick={() => navigate(path)}
            sx={boxStyle}
          >
            {/* Icon */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isDarkMode
                  ? "rgba(46,204,113,0.1)"
                  : "rgba(255,255,255,0.6)",
                borderRadius: "50%",
                width: 60,
                height: 60,
                color: isDarkMode ? "#2ecc71" : "#0ca78dff",
                boxShadow: isDarkMode
                  ? "none"
                  : "inset 0 0 10px rgba(0,0,0,0.1)",
                backdropFilter: !isDarkMode ? "blur(3px)" : "none",
              }}
            >
              {cardIcons[label]}
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? theme.palette.text.primary : "#015353ff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Security Shop */}
      {user?.role === "admin" && (
        <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
          <Suspense fallback={<LoadingSpinner />}>
            <SecurityShop />
          </Suspense>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

