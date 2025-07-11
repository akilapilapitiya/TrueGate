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
  IconButton,
} from "@mui/material";
import { Settings, DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SettingsPage = () => {
  const [tab, setTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 6 },
        bgcolor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2} display="flex" alignItems="center" gap={1}>
        <Settings /> Settings
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" />
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Devices" />
        </Tabs>
        <Divider />

        <Box p={3}>
          {tab === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Theme
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      color="primary"
                    />
                  }
                  label={darkMode ? "Dark Mode" : "Light Mode"}
                />
                <IconButton>
                  {darkMode ? <DarkMode /> : <LightMode />}
                </IconButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Language
                </Typography>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
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
            <Typography variant="body1" color="text.secondary">
              Security settings content goes here.
            </Typography>
          )}

          {tab === 2 && (
            <Typography variant="body1" color="text.secondary">
              Notifications settings content goes here.
            </Typography>
          )}

          {tab === 3 && (
            <Typography variant="body1" color="text.secondary">
              Device settings content goes here.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
