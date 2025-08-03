import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
  LinearProgress,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Paper,
  Button,
  Menu,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Cloud,
  CloudUpload,
  CloudDownload,
  Folder,
  InsertDriveFile,
  VideoFile,
  AudioFile,
  Image,
  PictureAsPdf,
  Description,
  Archive,
  MoreVert,
  Add,
  Delete,
  Edit,
  Share,
  Download,
  Security,
  Storage,
  Speed,
  Sync,
  CloudDone,
  Warning,
  TrendingUp,
  Refresh,
  Upload,
  FolderOpen,
} from "@mui/icons-material";
import { useState } from "react";

const CloudManage = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [newFolderDialog, setNewFolderDialog] = useState(false);

  // Storage metrics
  const storageMetrics = [
    {
      title: "Total Storage",
      value: "2TB",
      used: "1.2TB",
      percentage: 60,
      icon: <Storage sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      title: "Files Uploaded",
      value: "847",
      change: "+23 today",
      icon: <CloudUpload sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      title: "Sync Status",
      value: "Active",
      change: "Last sync: 2m ago",
      icon: <Sync sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    {
      title: "Security Level",
      value: "High",
      change: "256-bit encryption",
      icon: <Security sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
    },
  ];

  // File types data
  const fileTypes = [
    { type: "Videos", count: "234", size: "456GB", color: theme.palette.error.main },
    { type: "Images", count: "1,247", size: "298GB", color: theme.palette.warning.main },
    { type: "Documents", count: "156", size: "45GB", color: theme.palette.info.main },
    { type: "Audio", count: "89", size: "67GB", color: theme.palette.success.main },
    { type: "Archives", count: "34", size: "123GB", color: theme.palette.secondary.main },
  ];

  // Recent files
  const recentFiles = [
    {
      name: "Security_Camera_Footage_2024.mp4",
      type: "video",
      size: "1.2GB",
      modified: "2 hours ago",
      shared: false,
    },
    {
      name: "Motion_Detection_Log.pdf",
      type: "pdf",
      size: "2.4MB",
      modified: "5 hours ago",
      shared: true,
    },
    {
      name: "Device_Configuration.json",
      type: "document",
      size: "156KB",
      modified: "1 day ago",
      shared: false,
    },
    {
      name: "Backup_Settings",
      type: "folder",
      size: "234MB",
      modified: "2 days ago",
      shared: false,
    },
    {
      name: "Alert_Notification.wav",
      type: "audio",
      size: "1.8MB",
      modified: "3 days ago",
      shared: true,
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "video":
        return <VideoFile sx={{ color: theme.palette.error.main }} />;
      case "pdf":
        return <PictureAsPdf sx={{ color: theme.palette.error.main }} />;
      case "document":
        return <Description sx={{ color: theme.palette.info.main }} />;
      case "folder":
        return <Folder sx={{ color: theme.palette.warning.main }} />;
      case "audio":
        return <AudioFile sx={{ color: theme.palette.success.main }} />;
      case "image":
        return <Image sx={{ color: theme.palette.secondary.main }} />;
      case "archive":
        return <Archive sx={{ color: theme.palette.grey[600] }} />;
      default:
        return <InsertDriveFile sx={{ color: theme.palette.grey[600] }} />;
    }
  };

  const handleMenuClick = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: { xs: 4, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Cloud Storage Management
              </Typography>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <Chip
                  label="Cloud Active"
                  color="success"
                  variant="outlined"
                  size="small"
                  icon={<CloudDone />}
                />
                <Typography variant="body2" color="text.secondary">
                  Last backup: 15 minutes ago
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <IconButton
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <Refresh color="primary" />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => setUploadDialog(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Upload Files
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Storage Metrics Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          {storageMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 24px ${alpha(metric.color, 0.15)}`,
                    borderColor: alpha(metric.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: metric.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: metric.color,
                      }}
                    >
                      {metric.icon}
                    </Box>
                    {metric.title === "Total Storage" && (
                      <Chip
                        label={`${metric.percentage}%`}
                        size="small"
                        color={metric.percentage > 80 ? "error" : "primary"}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 0.5, color: theme.palette.text.primary }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {metric.title}
                  </Typography>
                  {metric.percentage && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                        {metric.used} used of {metric.value}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={metric.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: alpha(metric.color, 0.1),
                          "& .MuiLinearProgress-bar": {
                            bgcolor: metric.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                  )}
                  {metric.change && (
                    <Typography variant="caption" color="text.secondary">
                      {metric.change}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* File Management Section */}
      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* File Types Overview */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Storage by File Type
                </Typography>
                <Box>
                  {fileTypes.map((fileType, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {fileType.type}
                        </Typography>
                        <Box textAlign="right">
                          <Typography variant="body2" fontWeight="bold">
                            {fileType.count} files
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {fileType.size}
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.random() * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: alpha(fileType.color, 0.1),
                          "& .MuiLinearProgress-bar": {
                            bgcolor: fileType.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Files */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Recent Files
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FolderOpen />}
                    sx={{ textTransform: "none" }}
                  >
                    Browse All
                  </Button>
                </Box>
                <List sx={{ p: 0 }}>
                  {recentFiles.map((file, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: "transparent",
                            }}
                          >
                            {getFileIcon(file.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography
                                variant="body2"
                                fontWeight="medium"
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: 200,
                                }}
                              >
                                {file.name}
                              </Typography>
                              {file.shared && (
                                <Chip
                                  label="Shared"
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: "0.7rem" }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {file.size} • {file.modified}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, file)}
                          >
                            <MoreVert />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < recentFiles.length - 1 && (
                        <Divider sx={{ ml: 7 }} />
                      )}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Quick Actions Summary */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.grey[100], 0.5),
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CloudUpload
                  sx={{
                    fontSize: 32,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  2.4GB
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Uploaded Today
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CloudDownload
                  sx={{
                    fontSize: 32,
                    color: theme.palette.success.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  847MB
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Downloaded Today
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Share
                  sx={{
                    fontSize: 32,
                    color: theme.palette.info.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  23
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Files Shared
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Speed
                  sx={{
                    fontSize: 32,
                    color: theme.palette.warning.main,
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  1.2GB/s
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Transfer Speed
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          boxShadow: 4,
        }}
        onClick={() => setNewFolderDialog(true)}
      >
        <Add />
      </Fab>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} fontSize="small" />
          Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} fontSize="small" />
          Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Rename
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              cursor: "pointer",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag & drop files here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialog} onClose={() => setNewFolderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewFolderDialog(false)}>Cancel</Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="text.secondary">
            &copy; {new Date().getFullYear()} TrueGate Cloud Storage. Secure and reliable cloud management.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default CloudManage;