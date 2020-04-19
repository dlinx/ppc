import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface Props {
  message: string;
  dialogStatus: boolean;
  onClose: (result: boolean) => void;
}
const ConfirmDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.dialogStatus}
      onClose={() => props.onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onClose(true)} color="secondary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
