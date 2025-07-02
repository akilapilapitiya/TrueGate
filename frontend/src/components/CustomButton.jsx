import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const styles = {
  primary: {
    backgroundColor: '#ff007f',
    color: '#ffffff',
    border: '1px solid #ff007f',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#ff007f',
      borderColor: '#ff007f',
    },
  },
  danger: {
    backgroundColor: '#ff1744',
    color: '#ffffff',
    border: '1px solid #ff1744',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#ff1744',
      borderColor: '#ff1744',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff',
    '&:hover': {
      backgroundColor: '#ffffff22',
    },
  },
  secondary: {
    backgroundColor: '#302b63',
    color: '#ffffff',
    border: '1px solid #302b63',
    '&:hover': {
      backgroundColor: '#3f3b75',
    },
  },
};

export default function CustomButton({
  children,
  variant = 'primary',
  icon = null,
  ...props
}) {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 2,
        fontWeight: 'bold',
        px: 3,
        py: 1,
        textTransform: 'none',
        ...styles[variant],
      }}
      endIcon={icon}
      {...props}
    >
      {children}
    </Button>
  );
}

