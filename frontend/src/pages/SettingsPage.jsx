import React, { useState } from "react";
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
        bgcolor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Settings />
        Settings
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="settings tabs"
        >
          <Tab icon={<Settings />} label="General"/>
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<DevicesIcon />} label="Devices" />
        </Tabs>
        <Divider />

        <Box p={3}>
          {tab === 0 && (
            <Grid container spacing={4} 
            sx={{display:"flex",
            flexDirection: "column",
            }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Theme
                </Typography>
                <FormControlLabel
                  control={
                    <Switch checked={isDarkMode} onChange={toggleTheme} />
                  }
                  label={isDarkMode ? "Dark Mode" : "Light Mode"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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
            <Grid container spacing={4} 
            sx={{display:"flex",
            flexDirection: "column",
            }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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

              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary">
                  Security settings content goes here.
                </Typography>
              </Grid>
            </Grid>
          )}

          {tab === 2 && (
            <Grid container spacing={4} 
            sx={{display:"flex",
            flexDirection: "column",
            }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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

              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary">
                  Notifications settings content goes here.
                </Typography>
              </Grid>
            </Grid>
          )}

          {tab === 3 && (
            <Grid container spacing={4} 
            sx={{display:"flex",
            flexDirection: "column",
            }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="h6" gutterBottom>
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
