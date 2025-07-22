import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import {
  Settings,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Language as LanguageIcon,
  AccessTime as AccessTimeIcon,
  PrivacyTip as PrivacyTipIcon,
  Storage as StorageIcon,
  Lock as LockIcon,
  WidthFull,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useAppTheme } from "../hooks/useAppTheme";

const SettingsPage = () => {
  // Correctly destructure inside component
  const { isDarkMode, toggleTheme, theme } = useAppTheme();

  const [tab, setTab] = useState(0);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  // Dummy toggle states for fill-in toggles (non-functional)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoLockDoors, setAutoLockDoors] = useState(true);
  const [motionRecording, setMotionRecording] = useState(true);
  const [nightVision, setNightVision] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [cloudBackup, setCloudBackup] = useState(true);

  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        pt: 10,
        px: { xs: 2, sm: 4, md: 8 },
        background: theme.palette.mode === "dark"
          ? "linear-gradient(to right, #1e656eff, #0e2346ff)"
          : "linear-gradient(to right, #9ebce9ff, #bee6e8ff)",
        color: muiTheme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="800"
        mb={3}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          letterSpacing: 1.2,
          background: isDarkMode
            ? "linear-gradient(90deg, #7ddaff, #38b6ff)"
            : "linear-gradient(90deg, #004e92, #4286f4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <Settings fontSize="large" />
        Settings
      </Typography>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: isDarkMode
            ? "linear-gradient(135deg, #182a36ff, #345064ff)"
            : "linear-gradient(135deg, #eaf6ff, #d9f2f2)",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            ".MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              color: isDarkMode ? "#b0bec5" : "#37474f",
            },
            ".Mui-selected": {
              color: isDarkMode ? "#00e5ff" : "#0077c2",
            },
          }}
        >
          <Tab icon={<Settings />} label="General" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<DevicesIcon />} label="Devices" />
        </Tabs>

        <Divider />

        <Box p={4}>
          {tab === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1, letterSpacing: 0.5 }}
                >
                  Theme
                </Typography>
                <FormControlLabel
                  control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
                  label={isDarkMode ? "Dark Mode" : "Light Mode"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1, letterSpacing: 0.5 }}
                >
                  Preferred Language
                </Typography>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="ar">Arabic</MenuItem>
                  <MenuItem value="gm">German</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1, letterSpacing: 0.5 }}
                >
                  Timezone
                </Typography>
                <Select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">Eastern Standard Time</MenuItem>
                  <MenuItem value="PST">Pacific Standard Time</MenuItem>
                </Select>
              </Grid>
            </Grid>
          )}

          {tab === 1 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Two-Factor Authentication
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={twoFactorAuth}
                      onChange={() => setTwoFactorAuth((prev) => !prev)}
                    />
                  }
                  label="Enable 2FA"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Privacy Mode
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={privacyMode}
                      onChange={() => setPrivacyMode((prev) => !prev)}
                    />
                  }
                  label="Enable Privacy Mode"
                />
              </Grid>
            </Grid>
          )}

          {tab === 2 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled((prev) => !prev)}
                    />
                  }
                  label="Enable Notifications"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Email Alerts
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailAlerts}
                      onChange={() => setEmailAlerts((prev) => !prev)}
                    />
                  }
                  label="Receive Email Alerts"
                />
              </Grid>
            </Grid>
          )}

          {tab === 3 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Auto-Lock Doors
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoLockDoors}
                      onChange={() => setAutoLockDoors((prev) => !prev)}
                    />
                  }
                  label="Enable Auto-Lock"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Motion Recording
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={motionRecording}
                      onChange={() => setMotionRecording((prev) => !prev)}
                    />
                  }
                  label="Enable Motion Recording"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Night Vision
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={nightVision}
                      onChange={() => setNightVision((prev) => !prev)}
                    />
                  }
                  label="Enable Night Vision"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Cloud Backup
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={cloudBackup}
                      onChange={() => setCloudBackup((prev) => !prev)}
                    />
                  }
                  label="Enable Cloud Backup"
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;