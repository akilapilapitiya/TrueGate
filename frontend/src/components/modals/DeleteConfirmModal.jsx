import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { buttonSizes } from "../../Responsive";

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>⚠️ Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            minWidth: buttonSizes.iconButton.minWidth,
            fontSize: buttonSizes.iconButton.fontSize,
            padding: buttonSizes.iconButton.padding,
          }}
        >
          Yes, Delete
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: buttonSizes.iconButton.minWidth,
            fontSize: buttonSizes.iconButton.fontSize,
            padding: buttonSizes.iconButton.padding,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
