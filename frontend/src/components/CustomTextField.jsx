import React from "react";
import { TextField } from "@mui/material";

const neonStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
      boxShadow: "0 0 0px transparent",
      transition: "all 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#ff007f",
      boxShadow: "0 0 5px 1px rgba(255, 0, 127, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00ccff",
      boxShadow: "0 0 8px 2px rgba(0, 204, 255, 0.8)",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00ccff",
  },
  "& input:-webkit-autofill": {
    boxShadow: "0 0 0 1000px #121212 inset",
    WebkitTextFillColor: "white",
    transition: "background-color 5000s ease-in-out 0s",
  },
};

export default function CustomTextField(props) {
  return <TextField {...props} sx={{ ...neonStyle, ...props.sx }} />;
}
