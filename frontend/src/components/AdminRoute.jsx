import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  
  // Check if user is logged in and has admin role
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        p={3}
      >
        <SecurityIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          You don't have permission to access this page. Admin privileges are required.
        </Typography>
        <Button variant="contained" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Box>
    );
  }
  
  return children;
};

export default AdminRoute; 