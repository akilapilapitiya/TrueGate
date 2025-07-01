import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { colorPallete } from "../../ColorTheme";
import DoneIcon from "@mui/icons-material/Done";

const SuccessModal = ({ message, onClose }) => {
  return (
    <Dialog open onClose={onClose} aria-labelledby="success-dialog-title">
      <DialogTitle
        id="success-dialog-title"
        sx={{
          background: colorPallete.successModalBackgroundColor,
          color: colorPallete.successPageNormalText,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        CHANAGE DONE{" "}
        <DoneIcon
          sx={{
            color: colorPallete.successPageNormalText,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        />
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: colorPallete.successModalBackgroundColor,
          border: "none",
        }}
      >
        <Typography sx={{ color: colorPallete.successPageNormalText }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ background: colorPallete.successModalBackgroundColor }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: colorPallete.registerButtonColor,
            color: colorPallete.registerButtonAccentColor,
            borderColor: colorPallete.registerButtonAccentColor,
            minWidth: buttonSizes.subButton.minWidth,
            fontSize: buttonSizes.subButton.fontSize,
            padding: buttonSizes.subButton.padding,
            "&:hover": {
              background: colorPallete.registerButtonHoverColor,
              color: colorPallete.registerButtonHoverAccentColor,
              borderColor: colorPallete.registerButtonHoverAccentColor,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
