import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { colorPallete } from "../../ColorTheme";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const FailModal = ({ message, onClose }) => {
  return (
    <Dialog open onClose={onClose} aria-labelledby="success-dialog-title" >
      <DialogTitle id="success-dialog-title" sx={{background:colorPallete.successModalBackgroundColor, color: colorPallete.successPageNormalText, textAlign:'center', fontWeight:'bold', fontSize:'2rem'}}>ACTION FAILED <ErrorOutlineIcon sx={{ color: colorPallete.successPageNormalText, textAlign:'center', fontWeight:'bold', fontSize:'2rem'}}/></DialogTitle>
      <DialogContent dividers sx={{background:colorPallete.successModalBackgroundColor, border:'none'}}>
        <Typography sx={{color: colorPallete.successPageNormalText}}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{background:colorPallete.successModalBackgroundColor }}>
        <Button onClick={onClose} variant="contained" 
        sx={{
                            background: colorPallete.registerButtonColor,
                            color: colorPallete.registerButtonAccentColor,
                            borderColor: colorPallete.registerButtonAccentColor,
                            "&:hover": {
                              background: colorPallete.registerButtonHoverColor,
                              color: colorPallete.registerButtonHoverAccentColor,
                              borderColor: colorPallete.registerButtonHoverAccentColor,
                            },
                          }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FailModal;
